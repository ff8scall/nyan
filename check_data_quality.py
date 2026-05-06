import os
import json

BREED_DATA_DIR = "src/data/breeds"

def check_data_quality():
    files = [f for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    poor_quality = []
    
    for filename in files:
        filepath = os.path.join(BREED_DATA_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # 데이터 품질 체크 (Origin이 Unknown이거나 설명이 너무 짧은 경우)
        if data.get("origin_country") == "Unknown" or len(data.get("personality_ko", "")) < 35:
            poor_quality.append(data.get("id"))
            
    print(f"Total breeds: {len(files)}")
    print(f"Poor quality breeds: {len(poor_quality)}")
    print(f"List: {', '.join(poor_quality)}")

if __name__ == "__main__":
    check_data_quality()
