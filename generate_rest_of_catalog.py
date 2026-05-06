import requests
import json
import time
import os
import sys
from PIL import Image
import io

COMFY_URL = "http://127.0.0.1:8188"
OUTPUT_DIR = "public/images/Nyan"

# 상위 30종 (제외 대상)
TOP_30_LIST = [
    "munchkin", "ragdoll", "maine-coon", "persian", "exotic-shorthair",
    "devon-rex", "british-shorthair", "abyssinian", "siberian", "sphynx",
    "russian-blue", "bengal", "scottish-fold", "siamese", "norwegian-forest-cat",
    "birman", "oriental-shorthair", "cornish-rex", "burmese", "tonkinese",
    "ocicat", "selkirk-rex", "chartreux", "japanese-bobtail", "korat",
    "somali", "turkish-angora", "havana-brown", "american-shorthair", "manx"
]

def log(msg):
    print(msg)
    sys.stdout.flush()

def queue_prompt(prompt_workflow):
    p = {"prompt": prompt_workflow}
    data = json.dumps(p).encode('utf-8')
    try:
        res = requests.post(f"{COMFY_URL}/prompt", data=data).json()
        return res.get('prompt_id')
    except:
        return None

def get_history(prompt_id):
    try:
        res = requests.get(f"{COMFY_URL}/history/{prompt_id}").json()
        return res.get(prompt_id)
    except:
        return None

def get_image(filename, subfolder, folder_type):
    data = {"filename": filename, "subfolder": subfolder, "type": folder_type}
    res = requests.get(f"{COMFY_URL}/view", params=data)
    return res.content

def build_workflow(prompt_text, negative_text):
    # 순수 T2I 워크플로우 (가장 안정적)
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
        "9": { "inputs": { "filename_prefix": "rest_catalog_t2i", "images": ["8", 0] }, "class_type": "SaveImage" }
    }
    return workflow

def generate_image(prompt, negative, filename, breed_id):
    breed_dir = os.path.join(OUTPUT_DIR, breed_id)
    if not os.path.exists(breed_dir): os.makedirs(breed_dir)
    png_path = os.path.join(breed_dir, filename)
    webp_path = png_path.replace(".png", ".webp")
    
    workflow = build_workflow(prompt, negative)
    prompt_id = queue_prompt(workflow)
    if not prompt_id:
        log("    [Error] Could not connect to ComfyUI server.")
        return False
    
    while True:
        history = get_history(prompt_id)
        if history and 'outputs' in history:
            images = history['outputs']['9']['images']
            for img in images:
                image_data = get_image(img['filename'], img['subfolder'], img['type'])
                img_obj = Image.open(io.BytesIO(image_data))
                img_obj.save(png_path, "PNG", optimize=True)
                img_obj.save(webp_path, "WEBP", quality=85)
                log(f"    [Saved] {os.path.basename(webp_path)}")
            return True
        time.sleep(3)

def main():
    BREED_DATA_DIR = "src/data/breeds"
    all_json_ids = [f.replace(".json", "") for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    rest_breeds = [bid for bid in all_json_ids if bid not in TOP_30_LIST]

    log(f"\n>>> [Rest Catalog T2I Edition] Ready for {len(rest_breeds)} breeds...")
    
    compositions = {
        "hero": "elegant sitting pose, front view, looking at camera, sitting on a large grey concrete pedestal, museum masterpiece",
        "full_body_front": "elegant sitting pose, front view, showing full body, standing on studio floor",
        "full_body_side": "strict side profile view, looking straight ahead, complete body visible from side",
        "strict_profile": "extreme close up of a strict lateral profile view of the head and face, looking straight ahead at a 90 degree angle",
        "face_portrait": "extreme close up portrait of the face, expressive eyes, characteristic features",
        "eye_macro": "extreme macro photography of a single eye only, iris patterns",
        "coat_texture": "extreme macro photography of the unique fur texture and pattern up close",
        "variant_full_body": "elegant full body view of a different color variant, showing diversity"
    }

    for breed_id in rest_breeds:
        json_path = os.path.join(BREED_DATA_DIR, f"{breed_id}.json")
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            breed_name = data.get("name_en", breed_id)
            appearance = data.get("appearance_en", "accurate breed characteristics")
            
            log(f"--- Ready to process: {breed_name} ({breed_id}) ---")

            for comp_id, pose in compositions.items():
                output_filename = f"{breed_id}_{comp_id}.png"
                master_prompt = (
                    f"An ultra-sharp, professional museum-grade photograph of a {breed_name} cat. "
                    f"Pose: {pose}. Physical Traits: {appearance}. "
                    "Deep solid black background. Sony A7R V, 100mm macro lens, cinematic lighting."
                )
                negative_prompt = "blurry, low resolution, plastic, cartoon, dog, human, messy background"
                
                # log(f"    -> Ready to generate {comp_id}...")
                # generate_image(master_prompt, negative_prompt, output_filename, breed_id) # 이따가 주석 풀고 실행!
        except:
            continue

    log("\n>>> Pure T2I Script ready. No IP-Adapter. No complexity. Ready to run!")

if __name__ == "__main__":
    main()
