import os
import json

BREED_DATA_DIR = "src/data/breeds"

def fix_json_paths():
    files = [f for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    
    for filename in files:
        # 래그돌은 이미 완벽하므로 건너뜁니다 (또는 원하면 포함 가능)
        if filename == "ragdoll.json":
            continue
            
        filepath = os.path.join(BREED_DATA_DIR, filename)
        breed_id = filename.replace(".json", "")
        
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # 8종 마스터 패키지 경로로 업데이트
        data["image_master_path"] = f"/images/Nyan/{breed_id}/{breed_id}_hero.webp"
        data["image_frontal_path"] = f"/images/Nyan/{breed_id}/{breed_id}_face_portrait.webp"
        data["image_fullbody_path"] = f"/images/Nyan/{breed_id}/{breed_id}_full_body_front.webp"
        data["image_fullbody_side_path"] = f"/images/Nyan/{breed_id}/{breed_id}_full_body_side.webp"
        data["image_strict_profile_path"] = f"/images/Nyan/{breed_id}/{breed_id}_strict_profile.webp"
        data["image_eye_macro_path"] = f"/images/Nyan/{breed_id}/{breed_id}_eye_macro.webp"
        data["image_coat_texture_path"] = f"/images/Nyan/{breed_id}/{breed_id}_coat_texture.webp"
        data["image_variant_path"] = f"/images/Nyan/{breed_id}/{breed_id}_variant_full_body.webp"
        
        # 구형 데이터 필드 제거 (선택 사항 - 시스템 클린업)
        if "color_variants" in data:
            del data["color_variants"]
        if "image_master_prompt" in data:
            del data["image_master_prompt"]
        if "image_macro_prompt" in data:
            del data["image_macro_prompt"]
        if "image_fullbody_prompt" in data:
            del data["image_fullbody_prompt"]
        if "image_frontal_prompt" in data:
            del data["image_frontal_prompt"]

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        print(f"Fixed paths for: {breed_id}")

if __name__ == "__main__":
    fix_json_paths()
