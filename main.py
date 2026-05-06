import json
import urllib.request
import urllib.parse
import uuid
import os
import time
from PIL import Image
import io

# ==========================================
# nyan - High-End Image Generation Engine (RTX 5080)
# ==========================================

# 1. ComfyUI 서버 설정
SERVER_ADDRESS = "127.0.0.1:8188"
CLIENT_ID = str(uuid.uuid4())
OUTPUT_DIR = "public/images/Nyan"
ORIGINALS_DIR = "C:/AI/Antigravity/Nyan_originals"

# 출력 디렉토리 확인
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def queue_prompt(prompt):
    p = {"prompt": prompt, "client_id": CLIENT_ID}
    data = json.dumps(p).encode('utf-8')
    req = urllib.request.Request(f"http://{SERVER_ADDRESS}/prompt", data=data)
    return json.loads(urllib.request.urlopen(req).read())

def get_history(prompt_id):
    with urllib.request.urlopen(f"http://{SERVER_ADDRESS}/history/{prompt_id}") as response:
        return json.loads(response.read())

def get_image(filename, subfolder, folder_type):
    data = {"filename": filename, "subfolder": subfolder, "type": folder_type}
    url_values = urllib.parse.urlencode(data)
    with urllib.request.urlopen(f"http://{SERVER_ADDRESS}/view?{url_values}") as response:
        return response.read()

# 2. Flux.1 브리드 렌더링 워크플로우 (Museum Standard)
def generate_breed_image(breed_id, prompt_text, suffix="master"):
    # 사용자님의 Flux.1 체크포인트 및 워크플로우 구조에 맞춘 JSON
    # (실제 ComfyUI 'Save API Format'에서 추출한 맵핑 구조 사용)
    
    workflow = {
        "3": {
            "inputs": {
                "seed": int(time.time() % 1000000),
                "steps": 25,
                "cfg": 1, 
                "sampler_name": "euler",
                "scheduler": "simple",
                "denoise": 1,
                "model": ["4", 0],
                "positive": ["6", 0],
                "negative": ["7", 0],
                "latent_image": ["5", 0]
            },
            "class_type": "KSampler"
        },
        "4": {
            "inputs": {"ckpt_name": "flux1-dev.safetensors"},
            "class_type": "CheckpointLoaderSimple"
        },
        "5": {
            "inputs": {"width": 1024, "height": 1280, "batch_size": 1},
            "class_type": "EmptyLatentImage"
        },
        "6": {
            "inputs": {"text": prompt_text, "clip": ["4", 1]},
            "class_type": "CLIPTextEncode"
        },
        "7": {
            "inputs": {"text": "text, watermark, low quality, blurry, deformed", "clip": ["4", 1]},
            "class_type": "CLIPTextEncode"
        },
        "8": {
            "inputs": {"samples": ["3", 0], "vae": ["4", 2]},
            "class_type": "VAEDecode"
        },
        "9": {
            "inputs": {"filename_prefix": f"Nyan_{breed_id}_{suffix}", "images": ["8", 0]},
            "class_type": "SaveImage"
        }
    }
    
    print(f"🐾 [{breed_id}] {suffix} 이미지 생성 시작...")
    print(f"📝 Prompt: {prompt_text[:100]}...")
    
    try:
        enqueue_res = queue_prompt(workflow)
        prompt_id = enqueue_res['prompt_id']
        
        # 완료 대기 (Simple Polling)
        while True:
            history = get_history(prompt_id)
            if prompt_id in history:
                break
            time.sleep(1)
        
        # 이미지 결과 저장
        output_images = history[prompt_id]['outputs']['9']['images']
        for img_info in output_images:
            image_data = get_image(img_info['filename'], img_info['subfolder'], img_info['type'])
            
            # 폴더 생성
            webp_breed_dir = os.path.join(OUTPUT_DIR, breed_id)
            orig_breed_dir = os.path.join(ORIGINALS_DIR, breed_id)
            if not os.path.exists(webp_breed_dir): os.makedirs(webp_breed_dir)
            if not os.path.exists(orig_breed_dir): os.makedirs(orig_breed_dir)
            
            png_path = os.path.join(orig_breed_dir, f"{breed_id}_{suffix}.png")
            webp_path = os.path.join(webp_breed_dir, f"{breed_id}_{suffix}.webp")
            
            # PIL을 이용한 분리 저장
            img_obj = Image.open(io.BytesIO(image_data))
            img_obj.save(png_path, "PNG", optimize=True)
            img_obj.save(webp_path, "WEBP", quality=85)
            
            print(f"✅ 저장 완료 (Master): {png_path}")
            print(f"✅ 저장 완료 (WebP): {webp_path}")
            
    except Exception as e:
        print(f"❌ 에러 발생: {e}")

# 3. 데이터 폴더 스캔 및 일괄 생성
def run_batch():
    breed_dir = "src/data/breeds"
    files = [f for f in os.listdir(breed_dir) if f.endsWith(".json")]
    
    for filename in files:
        with open(os.path.join(breed_dir, filename), "r", encoding="utf-8") as f:
            data = json.load(f)
            
            # Master / Macro / Fullbody 순차 생성
            if "image_master_prompt" in data:
                generate_breed_image(data["id"], data["image_master_prompt"], "master")
            # if "image_macro_prompt" in data:
            #     generate_breed_image(data["id"], data["image_macro_prompt"], "macro")

if __name__ == "__main__":
    print("🚀 nyan Local 5080 Rendering Engine Start")
    run_batch()
