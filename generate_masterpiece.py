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
            "inputs": { "width": 1024, "height": 1024, "batch_size": 1 },
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

def generate_image(prompt, negative, filename, ref_image_path, breed_id):
    # 품종별 폴더 생성
    breed_dir = os.path.join(OUTPUT_DIR, breed_id)
    if not os.path.exists(breed_dir): os.makedirs(breed_dir)
    
    png_path = os.path.join(breed_dir, filename)
    webp_path = png_path.replace(".png", ".webp")
    
    # T2I 모드 vs IP-Adapter 모드 분기
    if ref_image_path:
        log(f"-> GENERATING WITH IP-ADAPTER: {filename}")
        server_ref_name = upload_image(ref_image_path)
        if not server_ref_name: return False
    else:
        log(f"-> GENERATING T2I (no reference): {filename}")
        server_ref_name = None
        
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
                    
                    # 마스터 PNG 저장
                    img_obj.save(png_path, "PNG", optimize=True, compress_level=9)
                    # 웹 최적화 WebP 저장
                    img_obj.save(webp_path, "WEBP", quality=85)
                    
                    log(f"    [Saved Master] {os.path.basename(png_path)}")
                    log(f"    [Saved WebP] {os.path.basename(webp_path)}")
                return True
            else:
                log(f"    [Error] Generation failed.")
                return False
        time.sleep(1) 
    return False

def main():
    # 상위 30종 우선순위 리스트 (누락분만 체크)
    TOP_30_PRIORITY = [
        "munchkin", "ragdoll", "maine-coon", "persian", "exotic-shorthair",
        "devon-rex", "british-shorthair", "abyssinian", "siberian", "sphynx",
        "russian-blue", "bengal", "scottish-fold", "siamese", "norwegian-forest-cat",
        "birman", "oriental-shorthair", "cornish-rex", "burmese", "tonkinese",
        "ocicat", "selkirk-rex", "chartreux", "japanese-bobtail", "korat",
        "somali", "turkish-angora", "havana-brown", "american-shorthair", "manx"
    ]
    
    BREED_DATA_DIR = "src/data/breeds"
    IMG_ROOT = "public/images/Nyan"
    
    all_json_ids = [f.replace(".json", "") for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    
    # 큐 구성: 오직 상위 30종만 타겟팅
    generation_queue = []
    for pid in TOP_30_PRIORITY:
        if pid in all_json_ids:
            generation_queue.append(pid)

    for actual_id in generation_queue:
        is_priority = True # 이제 모든 타겟이 우선순위임
        
        # [조건부 스킵] 상위 30종인 경우에만 8종 에셋 존재 시 건너뜀
        if is_priority:
            breed_img_dir = os.path.join(IMG_ROOT, actual_id)
            if os.path.exists(breed_img_dir):
                existing_webps = [f for f in os.listdir(breed_img_dir) if f.endswith(".webp")]
                if len(existing_webps) >= 8:
                    log(f"    [Skip] Priority breed {actual_id} is already complete. Skipping.")
                    continue
        else:
            # 30위 밖의 품종은 데이터 보강을 반영하기 위해 '무조건 재생성' 모드
            log(f"    [Force] Non-priority breed {actual_id} will be (re)generated with updated data.")

        # JSON 데이터 로드
        json_path = os.path.join(BREED_DATA_DIR, f"{actual_id}.json")
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                breed_data = json.load(f)
            breed_name = breed_data.get("name_en", actual_id)
            appearance_detail = breed_data.get("appearance_en", "accurate anatomical features of the breed")
        except Exception:
            log(f"    [Warning] Failed to load JSON for {actual_id}. Skipping.")
            continue
            
        log(f"\n>>> [Master Generation] Processing {breed_name} ({actual_id})...")

        # 참조 이미지 경로
        TARGET_REF_DIR = "src/data/target_refs"
        ref_image_path = None
        for ext in [".jpg", ".png", ".jpeg"]:
            p = os.path.join(TARGET_REF_DIR, f"{actual_id}{ext}")
            if os.path.exists(p):
                ref_image_path = p
                break
        
        # 8종 에셋 구도 정의
        compositions = {
            "hero": "elegant sitting pose, front view, looking at camera, sitting on a large grey concrete pedestal, museum masterpiece",
            "full_body_front": "elegant sitting pose, front view, showing full body and sturdy build, standing on a clean dark grey studio floor",
            "full_body_side": "strict side profile view, looking straight ahead, complete body visible from the side, standing on a clean dark grey studio floor",
            "strict_profile": "extreme close up of a strict lateral profile view of the head and face, looking straight ahead at a 90 degree angle, no background",
            "face_portrait": "extreme close up portrait of the face, expressive eyes, sweet expression, characteristic facial features, sharp focus",
            "eye_macro": "extreme macro photography of a single eye only, iris fills the entire frame, hyper-detailed iris patterns, sharp reflection",
            "coat_texture": "extreme macro photography of the unique fur texture and pattern up close, showing hair fibers",
            "variant_full_body": "elegant full body view of a different color variant of this breed, showing diversity, sitting on a concrete pedestal"
        }

        for comp_id, pose in compositions.items():
            # 상위 30종인 경우에만 개별 파일 존재 체크 (나머지는 덮어쓰기)
            if is_priority:
                webp_path = os.path.join(IMG_ROOT, actual_id, f"{actual_id}_{comp_id}.webp")
                if os.path.exists(webp_path):
                    continue

            output_filename = f"{actual_id}_{comp_id}.png"

            master_prompt = (
                f"An ultra-sharp, professional museum-grade studio photograph of a {breed_name} cat. "
                f"Pose: {pose}. "
                f"Physical Traits: {appearance_detail}. "
                "Deep solid black background. Extreme razor-sharp focus, intricate micro-details. "
                "Sony A7R V, 100mm macro lens, 8k resolution, cinematic lighting."
            )
            
            negative_prompt = "blurry, out of focus, low resolution, plastic, cartoon, illustration, dog, human, flower, messy background"

            log(f"    -> Generating {comp_id}...")
            try:
                generate_image(master_prompt, negative_prompt, output_filename, ref_image_path, actual_id)
            except Exception as e:
                log(f"    [Error] Failed generating {comp_id}: {e}")
                continue
        
        log(f">>> [Complete] Assets for {breed_name} processed.\n")

if __name__ == "__main__":
    main()