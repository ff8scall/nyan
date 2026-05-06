import os
import json

BREED_DATA_DIR = "src/data/breeds"
IMAGE_DIR = "public/images/Nyan"

def verify():
    files = [f for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    print(f"Checking {len(files)} breeds...")
    
    missing_fields = []
    missing_images = []
    
    v2_fields = [
        "origin_history_ko", "grooming_tips_ko", "recommended_items",
        "vet_disclaimer_ko", "expert_sources", "schema_data", "image_alts_ko"
    ]
    
    for filename in files:
        breed_id = filename.replace(".json", "")
        filepath = os.path.join(BREED_DATA_DIR, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 1. Check V2 Fields
        for field in v2_fields:
            if field not in data:
                missing_fields.append(f"{breed_id}: {field}")
        
        # 2. Check Images
        img_breed_dir = os.path.join(IMAGE_DIR, breed_id)
        if not os.path.exists(img_breed_dir):
            missing_images.append(f"{breed_id}: Folder missing")
        else:
            webps = [f for f in os.listdir(img_breed_dir) if f.endswith(".webp")]
            if len(webps) < 8:
                missing_images.append(f"{breed_id}: Only {len(webps)}/8 webps")
                
    if not missing_fields and not missing_images:
        print("[SUCCESS] ALL DATA INTEGRITY CHECKS PASSED!")
    else:
        if missing_fields:
            print("\n[MISSING FIELDS]:")
            for m in missing_fields[:10]: print(m)
        if missing_images:
            print("\n[MISSING IMAGES]:")
            for m in missing_images[:10]: print(m)
            
if __name__ == "__main__":
    verify()
