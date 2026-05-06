import requests
import json
import time
import os
import sys
from PIL import Image
import io

COMFY_URL = "http://127.0.0.1:8188"
OUTPUT_DIR = "public/images/Nyan"
ORIGINALS_DIR = "C:/AI/Antigravity/Nyan_originals"

def log(msg):
    print(msg)
    sys.stdout.flush()

# (기존 generate_masterpiece.py의 핵심 함수들 복사)
def queue_prompt(prompt_workflow):
    p = {"prompt": prompt_workflow}
    data = json.dumps(p).encode('utf-8')
    res = requests.post(f"{COMFY_URL}/prompt", data=data).json()
    return res.get('prompt_id')

def get_history(prompt_id):
    res = requests.get(f"{COMFY_URL}/history/{prompt_id}").json()
    return res.get(prompt_id)

def get_image(filename, subfolder, folder_type):
    data = {"filename": filename, "subfolder": subfolder, "type": folder_type}
    res = requests.get(f"{COMFY_URL}/view", params=data)
    return res.content

def build_workflow(prompt_text, negative_text, ref_image_name=None):
    workflow = {
        "1": { "inputs": { "ckpt_name": "flux1-dev-fp8.safetensors" }, "class_type": "CheckpointLoaderSimple" },
        "4": { "inputs": { "width": 1024, "height": 1024, "batch_size": 1 }, "class_type": "EmptyLatentImage" },
        "5": { "inputs": { "text": prompt_text, "clip": ["1", 1] }, "class_type": "CLIPTextEncode" },
        "6": { "inputs": { "text": negative_text, "clip": ["1", 1] }, "class_type": "CLIPTextEncode" },
        "7": {
            "inputs": {
                "seed": int(time.time() * 1000) % 1125899906842624,
                "steps": 40, "cfg": 1.0, "sampler_name": "euler", "scheduler": "simple", "denoise": 1.0,
                "model": ["1", 0], "positive": ["5", 0], "negative": ["6", 0], "latent_image": ["4", 0]
            },
            "class_type": "KSampler"
        },
        "8": { "inputs": { "samples": ["7", 0], "vae": ["1", 2] }, "class_type": "VAEDecode" },
        "9": { "inputs": { "filename_prefix": "manx_special", "images": ["8", 0] }, "class_type": "SaveImage" }
    }
    return workflow

def generate_image(prompt, negative, filename, breed_id):
    # 폴더 준비
    webp_breed_dir = os.path.join(OUTPUT_DIR, breed_id)
    orig_breed_dir = os.path.join(ORIGINALS_DIR, breed_id)
    
    if not os.path.exists(webp_breed_dir): os.makedirs(webp_breed_dir)
    if not os.path.exists(orig_breed_dir): os.makedirs(orig_breed_dir)
    
    png_path = os.path.join(orig_breed_dir, filename)
    webp_path = os.path.join(webp_breed_dir, filename.replace(".png", ".webp"))
    
    workflow = build_workflow(prompt, negative)
    prompt_id = queue_prompt(workflow)
    if not prompt_id: return False
    
    while True:
        history = get_history(prompt_id)
        if history and 'outputs' in history:
            images = history['outputs']['9']['images']
            for img in images:
                image_data = get_image(img['filename'], img['subfolder'], img['type'])
                img_obj = Image.open(io.BytesIO(image_data))
                
                # 마스터 PNG 저장 (외부)
                img_obj.save(png_path, "PNG", optimize=True)
                # 웹 최적화 WebP 저장 (내부)
                img_obj.save(webp_path, "WEBP", quality=85)
                
                log(f"    [Saved Master] {png_path}")
                log(f"    [Saved WebP] {webp_path}")
            return True
        time.sleep(2)

def main():
    actual_id = "manx"
    # 보강된 데이터 직접 주입 (안전성 확보)
    breed_name = "Manx"
    appearance_detail = "Taillessness is the most distinguishing feature. Round head, sturdy body with hind legs longer than front legs, hopping gait."
    
    compositions = {
        "hero": "elegant sitting pose, showing no tail, sitting on a large grey concrete pedestal, museum masterpiece",
        "full_body_front": "front view, showing round head and sturdy build, standing on studio floor",
        "full_body_side": "strict side profile view, clearly showing the absence of a tail (tailless), hopping silhouette",
        "strict_profile": "extreme close up of head profile, looking straight ahead, no background",
        "face_portrait": "extreme close up portrait, round expressive eyes, sharp focus",
        "eye_macro": "extreme macro of a single eye, hyper-detailed iris",
        "coat_texture": "extreme macro of the dense double coat texture",
        "variant_full_body": "another view of a different color manx, showing diversity, sitting on pedestal"
    }

    log(f"\n>>> [Manx Special Edition] Starting 8-Asset Generation...")
    
    for comp_id, pose in compositions.items():
        output_filename = f"{actual_id}_{comp_id}.png"
        master_prompt = (
            f"An ultra-sharp, professional museum-grade photograph of a {breed_name} cat. "
            f"Pose: {pose}. Physical Traits: {appearance_detail}. "
            "Deep solid black background. Sony A7R V, 100mm macro lens, cinematic lighting."
        )
        negative_prompt = "tail, long tail, blurry, low resolution, plastic, cartoon, dog, human"
        
        log(f"    -> Generating {comp_id}...")
        generate_image(master_prompt, negative_prompt, output_filename, actual_id)
    
    log(f"\n>>> [Success] Manx Master Package Complete! All 30 Breeds are now done.")

if __name__ == "__main__":
    main()
