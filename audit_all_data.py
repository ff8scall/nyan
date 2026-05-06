import os
import json

BREED_DATA_DIR = "src/data/breeds"

def audit_all_json():
    files = [f for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    report = {
        "total_files": len(files),
        "missing_appearance": [],
        "missing_summary": [],
        "old_path_format": [],
        "incomplete_fields": []
    }
    
    for filename in files:
        filepath = os.path.join(BREED_DATA_DIR, filename)
        breed_id = filename.replace(".json", "")
        
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except Exception as e:
                report["incomplete_fields"].append(f"{breed_id} (JSON ERROR: {e})")
                continue
            
            # 1. 외형 데이터 체크
            if not data.get("appearance_en") or len(data.get("appearance_en", "")) < 10:
                report["missing_appearance"].append(f"{breed_id} (EN)")
            if not data.get("appearance_ko") or len(data.get("appearance_ko", "")) < 10:
                report["missing_appearance"].append(f"{breed_id} (KO)")
                
            # 2. 요약 데이터 체크
            if not data.get("summary_ko") or len(data.get("summary_ko", "")) < 5:
                report["missing_summary"].append(breed_id)
                
            # 3. 경로 포맷 체크
            master_path = data.get("image_master_path", "")
            if f"/images/Nyan/{breed_id}/{breed_id}_hero.webp" not in master_path:
                report["old_path_format"].append(breed_id)

    # 최종 리포트 출력
    print(json.dumps(report, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    audit_all_json()
