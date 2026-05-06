import os

TOP_30_PRIORITY = [
    "munchkin", "ragdoll", "maine-coon", "persian", "exotic-shorthair",
    "devon-rex", "british-shorthair", "abyssinian", "siberian", "sphynx",
    "russian-blue", "bengal", "scottish-fold", "siamese", "norwegian-forest-cat",
    "birman", "oriental-shorthair", "cornish-rex", "burmese", "tonkinese",
    "ocicat", "selkirk-rex", "chartreux", "japanese-bobtail", "korat",
    "somali", "turkish-angora", "havana-brown", "american-shorthair", "manx"
]

IMG_ROOT = "public/images/Nyan"

def count_remaining():
    missing_breeds = []
    completed_count = 0
    
    for breed_id in TOP_30_PRIORITY:
        breed_dir = os.path.join(IMG_ROOT, breed_id)
        if os.path.exists(breed_dir):
            # webp 파일 개수 체크
            webps = [f for f in os.listdir(breed_dir) if f.endswith(".webp")]
            if len(webps) >= 8:
                completed_count += 1
            else:
                missing_breeds.append(f"{breed_id} ({len(webps)}/8)")
        else:
            missing_breeds.append(f"{breed_id} (0/8)")
            
    print(f"--- Top 30 Status ---")
    print(f"Completed: {completed_count}/30")
    print(f"Remaining: {len(missing_breeds)}/30")
    if missing_breeds:
        print(f"List of remaining: {', '.join(missing_breeds)}")

if __name__ == "__main__":
    count_remaining()
