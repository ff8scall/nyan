import requests
import json
import os
import time

# 위키백과 API 엔드포인트
WIKI_API_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/"
BREEDS_DATA_DIR = "src/data/breeds"
WIKI_REF_DIR = "src/data/wiki_refs"

def fetch_wiki_summary(breed_name_en):
    # 위키백과 슬러그 형식으로 변환 (공백을 _로)
    slug = breed_name_en.replace(" ", "_")
    headers = {
        "User-Agent": "NyanBot/1.0 (https://github.com/nyan-project; nyan@example.com)"
    }
    try:
        response = requests.get(WIKI_API_URL + slug, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            # 동음이의어 페이지인 경우 (요약이 너무 짧거나 'may refer to' 포함)
            if "may refer to" in data.get("extract", "").lower() or len(data.get("extract", "")) < 100:
                return None
            return {
                "summary": data.get("extract"),
                "image_url": data.get("thumbnail", {}).get("source"),
                "wiki_url": data.get("content_urls", {}).get("desktop", {}).get("page"),
                "display_title": data.get("displaytitle")
            }
        else:
            return None
    except Exception:
        return None

def main():
    if not os.path.exists(WIKI_REF_DIR):
        os.makedirs(WIKI_REF_DIR)

    breed_files = [f for f in os.listdir(BREEDS_DATA_DIR) if f.endswith(".json")]
    
    for breed_file in breed_files:
        with open(os.path.join(BREEDS_DATA_DIR, breed_file), "r", encoding="utf-8") as f:
            breed_data = json.load(f)
        
        breed_id = breed_data["id"]
        breed_name_en = breed_data["name_en"]
        
        ref_path = os.path.join(WIKI_REF_DIR, f"{breed_id}.json")
        
        # 이미 데이터가 있고, 'refer to'가 없는 정상 데이터라면 스킵
        if os.path.exists(ref_path):
            with open(ref_path, "r", encoding="utf-8") as f:
                existing = json.load(f)
            if "may refer to" not in existing.get("summary", "").lower() and len(existing.get("summary", "")) > 100:
                continue

        # 1차 시도: 품종명 그대로
        print(f"Retrying/Fetching: {breed_name_en}...")
        wiki_ref = fetch_wiki_summary(breed_name_en)
        
        # 2차 시도: "[Breed] cat"으로 시도
        if not wiki_ref:
            print(f"  Attempting with 'cat' suffix for {breed_name_en}...")
            wiki_ref = fetch_wiki_summary(f"{breed_name_en} cat")
            
        if wiki_ref:
            with open(ref_path, "w", encoding="utf-8") as f:
                json.dump(wiki_ref, f, indent=2, ensure_ascii=False)
            print(f"  Success for {breed_id}")
        
        time.sleep(0.5)

if __name__ == "__main__":
    main()
