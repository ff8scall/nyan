import requests
import json
import time
import os
import sys
from PIL import Image
import io

COMFY_URL = "http://127.0.0.1:8188"
OUTPUT_DIR = "public/images/Nyan"

def log(msg):
    print(msg)
    sys.stdout.flush()

def queue_prompt(prompt_workflow):
    p = {"prompt": prompt_workflow}
    data = json.dumps(p).encode('utf-8')
    res = requests.post(f"{COMFY_URL}/prompt", data=data).json()
    if 'prompt_id' not in res:
        log(f"    [Error] ComfyUI Rejection: {res}")
        return None
    return res['prompt_id']

def get_history(prompt_id):
    res = requests.get(f"{COMFY_URL}/history/{prompt_id}").json()
    return res.get(prompt_id)

def get_image(filename, subfolder, folder_type):
    data = {"filename": filename, "subfolder": subfolder, "type": folder_type}
    res = requests.get(f"{COMFY_URL}/view", params=data)
    return res.content

def build_workflow(prompt_text, negative_text, ref_image_name=None):
    """
    참조 이미지가 ComfyUI 서버에 존재할 때만 IP-Adapter 노드를 생성합니다. (v3 수정본)
    """
    # 1. 기본 뼈대 (Dev 체크포인트 방식)
    workflow = {
        "1": {
            "inputs": { "ckpt_name": "flux1-dev-fp8.safetensors" },
            "class_type": "CheckpointLoaderSimple"
        },
        "4": {
            "inputs": { "width": 1024, "height": 1280, "batch_size": 1 },
            "class_type": "EmptyLatentImage"
        },
        "5": {
            "inputs": { "text": prompt_text, "clip": ["1", 1] },
            "class_type": "CLIPTextEncode"
        },
        "6": {
            "inputs": { "text": negative_text, "clip": ["1", 1] },
            "class_type": "CLIPTextEncode"
        },
        "8": {
            "inputs": { "samples": ["7", 0], "vae": ["1", 2] },
            "class_type": "VAEDecode"
        },
        "9": {
            "inputs": { "filename_prefix": "fixed_masterpiece", "images": ["8", 0] },
            "class_type": "SaveImage"
        }
    }

    # 기본 모델 입력 (IP-Adapter가 없을 때)
    sampler_model_input = ["1", 0]

    # 2. 참조 이미지 파일명이 유효할 때만 IP-Adapter 노드 추가
    if ref_image_name and ref_image_name.strip():
        log(f"    [Mode] IP-Adapter 활성화 (참조 이미지: {ref_image_name})")
        workflow["10"] = { "inputs": { "image": ref_image_name, "upload": "image" }, "class_type": "LoadImage" }
        workflow["11"] = { "inputs": { "clip_name": "clip_vision_h.safetensors" }, "class_type": "CLIPVisionLoader" }
        workflow["13"] = { "inputs": { "ipadapter_file": "ip-adapter_sdxl_vit-h.safetensors" }, "class_type": "IPAdapterModelLoader" }
        workflow["12"] = {
            "inputs": {
                "weight": 0.25,  # 참조 이미지 영향 감소, 프롬프트 우선
                "weight_type": "ease in-out",
                "combine_embeds": "concat",
                "embeds_scaling": "V only", # 서버 필수 파라미터
                "start_at": 0.0,            # 서버 필수 파라미터
                "end_at": 1.0,              # 서버 필수 파라미터
                "model": ["1", 0],
                "ipadapter": ["13", 0],
                "image": ["10", 0],
                "clip_vision": ["11", 0]
            },
            "class_type": "IPAdapterAdvanced"
        }
        sampler_model_input = ["12", 0]
    else:
        log("    [Mode] 순수 텍스트 기반 생성 (T2I)")

    # 3. KSampler 설정 (Dev 모델 - steps 10으로 테스트 시간 단축)
    workflow["7"] = {
        "inputs": {
            "seed": int(time.time() * 1000) % 1125899906842624,
            "steps": 40,
            "cfg": 1.0,
            "sampler_name": "euler",
            "scheduler": "simple",
            "denoise": 1.0,
            "model": sampler_model_input,
            "positive": ["5", 0],
            "negative": ["6", 0],
            "latent_image": ["4", 0]
        },
        "class_type": "KSampler"
    }
    
    return workflow

def upload_image(image_path):
    """
    로컬의 참조 이미지를 ComfyUI 서버의 input 폴더로 업로드합니다.
    """
    log(f"    [Action] Uploading reference photo: {image_path}")
    with open(image_path, "rb") as f:
        files = {"image": (os.path.basename(image_path), f)}
        res = requests.post(f"{COMFY_URL}/upload/image", files=files).json()
        return res.get('name')

def generate_image(prompt, negative, filename, ref_image_path):
    full_path = os.path.join(OUTPUT_DIR, filename)
    
    # T2I 모드 vs IP-Adapter 모드 분기
    if ref_image_path:
        log(f"-> GENERATING WITH IP-ADAPTER: {filename}")
        # 1. 이미지 서버 업로드 및 서버 측 파일명 획득
        server_ref_name = upload_image(ref_image_path)
        if not server_ref_name:
            log("    [Error] Image upload failed.")
            return False
    else:
        log(f"-> GENERATING T2I (no reference): {filename}")
        server_ref_name = None
        
    # 2. 워크플로우 구성 (업로드된 파일명 사용)
    workflow = build_workflow(prompt, negative, server_ref_name)
    prompt_id = queue_prompt(workflow)
    if not prompt_id: return False
    
    while True:
        history = get_history(prompt_id)
        if history:
            if 'outputs' in history and '9' in history['outputs']:
                images = history['outputs']['9']['images']
                for img in images:
                    image_data = get_image(img['filename'], img['subfolder'], img['type'])
                    img_obj = Image.open(io.BytesIO(image_data))
                    if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)
                    img_obj.save(full_path, "PNG", optimize=True, compress_level=9)
                    log(f"    [Saved] {full_path}")
                return True
            else:
                log(f"    [Error] Generation failed or output node '9' missing.")
                log(f"    [History Detail] {json.dumps(history, indent=2)}")
                return False
        time.sleep(1) 
    return False

def main():
    # 생성 대상 품종 목록 (단일 테스트)
    target_breeds = ["Abyssinian"]
    
    for breed in target_breeds:
        breed_id = breed.lower().replace(" ", "-")
        
        # 참조 이미지 경로 (로컬 폴더에서 자동 검색)
        TARGET_REF_DIR = "src/data/target_refs"
        ref_image_path = None
        for ext in [".jpg", ".png", ".jpeg"]:
            path = os.path.join(TARGET_REF_DIR, f"{breed_id}{ext}")
            if os.path.exists(path):
                ref_image_path = path
                break
                
        if not ref_image_path:
            log(f"    [Skip] Reference image for {breed} not found in {TARGET_REF_DIR}")
            continue
        
        # [ULTRA SHARP] 극상의 선명도와 디테일 (Steps 40 & Macro Focus)
        master_prompt = (
            f"An ultra-sharp, professional museum-grade studio photograph of a {breed} cat. "
            "The cat is sitting elegantly on a large grey concrete pedestal. "
            "Deep solid black background. "
            "Extreme razor-sharp focus on the cat's eyes and face, intricate micro-details of every single hair and whisker. "
            "Dramatic professional studio lighting, high contrast, vivid and crisp textures. "
            "Shot on 100mm macro lens, 8k resolution, ultra-detailed, cinematic masterpiece."
        )
        
        # 부정 프롬프트: 모든 종류의 흐림(blur) 현상을 강력하게 차단
        negative_prompt = "blurry, bokeh, out of focus, soft focus, fuzzy, low resolution, oversaturated, plastic, cartoon, illustration, human, dog, flower"
        
        # [Ultra-Sharp Test] 선명도 한계 테스트
        output_filename = f"{breed_id}_ultra_sharp_test.png"
        log(f"\n>>> [Ultra-Sharp Test] Generating for {breed} (Steps: 40, CFG: 1.0)...")
        generate_image(master_prompt, negative_prompt, output_filename, None)
        log(f">>> [Test Done] Result saved as: {output_filename}\n")

if __name__ == "__main__":
    main()