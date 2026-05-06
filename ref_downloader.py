import requests
import json
import os
import time

WIKI_REF_DIR = "src/data/wiki_refs"
TARGET_REF_DIR = "src/data/target_refs"

# 브라우저 스타일의 User-Agent (403 방어용)
BROWSER_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,ko;q=0.8"
}

def download_image(url, breed_id):
    if not url: return False
    
    ext = ".jpg"
    if ".png" in url.lower(): ext = ".png"
    target_path = os.path.join(TARGET_REF_DIR, f"{breed_id}{ext}")

    try:
        response = requests.get(url, headers=BROWSER_HEADERS, timeout=30)
        if response.status_code == 200:
            with open(target_path, "wb") as f:
                f.write(response.content)
            print(f"    [OK] {breed_id} ({len(response.content) // 1024} KB)")
            return True
        else:
            print(f"    [FAIL] {breed_id}: {response.status_code}")
            return False
    except Exception as e:
        print(f"    [ERROR] {breed_id}: {e}")
        return False

def get_original_wiki_url(thumb_url):
    if not thumb_url or "/thumb/" not in thumb_url:
        return thumb_url
    try:
        parts = thumb_url.replace("/thumb/", "/").split("/")
        # 마지막 썸네일 파일명 부분 제거 (예: 330px-...)
        return "/".join(parts[:-1])
    except:
        return thumb_url

def main():
    if not os.path.exists(TARGET_REF_DIR):
        os.makedirs(TARGET_REF_DIR)

    ref_files = [f for f in os.listdir(WIKI_REF_DIR) if f.endswith(".json")]
    print(f"Starting High-Res Reference Capture for {len(ref_files)} breeds...")

    for ref_file in ref_files:
        breed_id = ref_file.replace(".json", "")
        with open(os.path.join(WIKI_REF_DIR, ref_file), "r", encoding="utf-8") as f:
            ref_data = json.load(f)
        
        thumb_url = ref_data.get("image_url")
        if not thumb_url: continue
        
        print(f"-> {breed_id}")
        
        original_url = get_original_wiki_url(thumb_url)
        # 원본 시도 -> 실패 시 썸네일 시도
        if not download_image(original_url, breed_id):
            download_image(thumb_url, breed_id)
        
        time.sleep(0.5)

if __name__ == "__main__":
    main()
