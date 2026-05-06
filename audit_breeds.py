import os
import json

TOP_30_BREEDS = [
    "munchkin", "ragdoll", "maine-coon", "persian", "exotic-shorthair",
    "devon-rex", "british-shorthair", "abyssinian", "siberian", "sphynx",
    "russian-blue", "bengal", "scottish-fold", "siamese", "norwegian-forest",
    "birman", "oriental-shorthair", "cornish-rex", "burmese", "tonkinese",
    "ocicat", "selkirk-rex", "chartreux", "japanese-bobtail", "korat",
    "somali", "turkish-angora", "havana-brown", "american-shorthair", "manx"
]

IMG_ROOT = "public/images/Nyan"

def check_missing_assets():
    missing = []
    for breed in TOP_30_BREEDS:
        breed_dir = os.path.join(IMG_ROOT, breed)
        if not os.path.exists(breed_dir):
            missing.append(breed)
            continue
            
        # 8종 에셋 중 하나라도 비어있는지 체크
        files = os.listdir(breed_dir)
        webp_files = [f for f in files if f.endswith(".webp")]
        if len(webp_files) < 8:
            missing.append(breed)
            
    print(json.dumps(missing))

if __name__ == "__main__":
    check_missing_assets()
