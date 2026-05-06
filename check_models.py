import requests
import json

COMFY_URL = "http://127.0.0.1:8188"

# 체크포인트 목록 확인
print("=== Checkpoints (models/checkpoints/) ===")
try:
    r = requests.get(f"{COMFY_URL}/object_info/CheckpointLoaderSimple", timeout=10)
    data = r.json()
    ckpts = data.get("CheckpointLoaderSimple", {}).get("input", {}).get("required", {}).get("ckpt_name", [[]])[0]
    for c in ckpts:
        print(f"  - {c}")
    print(f"\n총 {len(ckpts)}개 체크포인트")
except Exception as e:
    print(f"에러: {e}")

# UNET 목록 확인
print("\n=== UNET Models (models/unet/) ===")
try:
    r = requests.get(f"{COMFY_URL}/object_info/UNETLoader", timeout=10)
    data = r.json()
    unets = data.get("UNETLoader", {}).get("input", {}).get("required", {}).get("unet_name", [[]])[0]
    for u in unets:
        print(f"  - {u}")
    print(f"\n총 {len(unets)}개 UNET")
except Exception as e:
    print(f"에러: {e}")

# CLIP 목록 확인
print("\n=== CLIP Models (models/clip/) ===")
try:
    r = requests.get(f"{COMFY_URL}/object_info/CLIPLoader", timeout=10)
    data = r.json()
    clips = data.get("CLIPLoader", {}).get("input", {}).get("required", {}).get("clip_name", [[]])[0]
    for c in clips:
        print(f"  - {c}")
    print(f"\n총 {len(clips)}개 CLIP")
except Exception as e:
    print(f"에러: {e}")

# VAE 목록 확인
print("\n=== VAE Models (models/vae/) ===")
try:
    r = requests.get(f"{COMFY_URL}/object_info/VAELoader", timeout=10)
    data = r.json()
    vaes = data.get("VAELoader", {}).get("input", {}).get("required", {}).get("vae_name", [[]])[0]
    for v in vaes:
        print(f"  - {v}")
    print(f"\n총 {len(vaes)}개 VAE")
except Exception as e:
    print(f"에러: {e}")
