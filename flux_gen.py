import requests
import json
import time
import os
import sys
import re
from PIL import Image
import io

COMFY_URL = "http://127.0.0.1:8188"
BREEDS_DIR = "src/data/breeds"
TARGET_REF_DIR = "src/data/target_refs"
OUTPUT_DIR = "public/images/Nyan"

def log(msg):
    print(msg)
    sys.stdout.flush()

def clean_prompt(text):
    # Midjourney 파라미터(--ar, --v, --tile 등) 및 불필요한 슬래시 제거
    cleaned = re.sub(r'--[a-z]+\s+\S+', '', text)
    cleaned = re.sub(r'--[a-v]+', '', cleaned)
    return cleaned.strip()

def load_workflow():
    with open("workflow_api.json", "r", encoding="utf-8") as f:
        return json.load(f)

def upload_image(image_path):
    log(f"    [Action] Uploading high-res reference: {image_path}")
    with open(image_path, "rb") as f:
        files = {"image": (os.path.basename(image_path), f)}
        res = requests.post(f"{COMFY_URL}/upload/image", files=files).json()
        return res.get('name')

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

def find_ref_image(breed_id):
    for ext in [".jpg", ".png", ".jpeg"]:
        path = os.path.join(TARGET_REF_DIR, f"{breed_id}{ext}")
        if os.path.exists(path): return path
    return None

def generate_and_wait(prompt, filename, ref_image_path, negative_prompt="", index=0):
    full_path = os.path.join(OUTPUT_DIR, filename)
    log(f"-> T2I RESTORATION: {filename}")
    
    # T2I를 위해 참조 이미지를 로드하되, Denoise를 1.0으로 주어 완전히 무시하게 함
    server_ref_name = upload_image(ref_image_path)
    if not server_ref_name: return False
    
    workflow = load_workflow()
    
    # 3. 순정 박물관 프롬프트 (MJ 파라미터만 정제)
    full_prompt = clean_prompt(prompt)
    
    workflow["6"]["inputs"]["text"] = full_prompt
    workflow["10"]["inputs"]["image"] = server_ref_name
    
    # 순정 부정 프롬프트
    full_neg = f"blurry, low quality, {negative_prompt}, illustration, drawing, painting, cartoon, doll, human"
    workflow["7"]["inputs"]["text"] = full_neg
    
    # T2I 모드 강제: Denoise 1.0 (참조 이미지 무시, 프롬프트 100% 반영)
    workflow["3"]["inputs"]["seed"] = int(time.time() * 1000)
    workflow["3"]["inputs"]["denoise"] = 1.0 

    prompt_id = queue_prompt(workflow)
    if not prompt_id: return False
    
    while True:
        history = get_history(prompt_id)
        if history:
            images = history['outputs']['9']['images']
            for img in images:
                image_data = get_image(img['filename'], img['subfolder'], img['type'])
                img_obj = Image.open(io.BytesIO(image_data))
                if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)
                img_obj.save(full_path, "PNG", optimize=True, compress_level=9)
                log(f"    [Saved] {full_path}")
            break
        time.sleep(2)
    return True

def main():
    # 랙돌(Ragdoll) 오리지널 방식(T2I) 1장 생성
    breed_id = "ragdoll"
    json_path = os.path.join(BREEDS_DIR, f"{breed_id}.json")
    with open(json_path, "r", encoding="utf-8") as f:
        breed = json.load(f)

    ref_image = find_ref_image(breed_id) # latent 크기 결정을 위해 로드만 수행
    log(f"\n=== T2I ORIGINAL MUSEUM MODE: {breed_id.upper()} ===")
    
    p = breed.get("image_master_prompt")
    generate_and_wait(p, f"{breed_id}_original_t2i.png", ref_image, breed.get("negative_prompt", ""))

if __name__ == "__main__":
    main()
