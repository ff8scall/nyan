import os
import json

BREED_DATA_DIR = "src/data/breeds"

def get_v2_additions(breed_id, name_ko):
    """
    V2로 업그레이드하기 위한 추가 데이터 필드들을 생성합니다.
    """
    return {
        "origin_history_ko": f"{name_ko} 품종은 오랜 역사를 가진 품종으로, 그 기원은 신비로운 전설과 기록에 기반합니다. 박물관급 도감으로서 우리는 이들의 고유한 혈통 보존 역사를 존중합니다.",
        "grooming_tips_ko": f"{name_ko}의 아름다운 외형을 유지하기 위해서는 주기적인 빗질과 세심한 눈/귀 관리가 필요합니다. 품종 특성에 맞는 전용 샴푸와 브러쉬 사용을 권장합니다.",
        "recommended_items": [
            {"item_name": "전용 슬리커 브러쉬", "reason": "죽은 털 제거 및 모질 관리"},
            {"item_name": "대형 스크래쳐", "reason": "스트레스 해소 및 발톱 관리"}
        ],
        "vet_disclaimer_ko": "본 가이드의 정보는 품종 일반의 특성을 설명하며, 개별 고양이의 건강 상태에 따라 차이가 있을 수 있습니다. 의학적 결정은 반드시 전문 수의사와 상의하십시오.",
        "image_alts_ko": {
            "hero": f"박물관 기단 위에 우아하게 앉아 있는 {name_ko} 고양이의 전신 모습",
            "face_portrait": f"{name_ko} 고양이의 특징적인 얼굴 이목구비가 강조된 초근접 초상화",
            "full_body_front": f"{name_ko} 고양이의 당당한 체격과 정면 모습을 보여주는 전신 사진",
            "full_body_side": f"{name_ko} 고양이의 우아한 실루엣을 확인할 수 있는 측면 전신 사진",
            "strict_profile": f"{name_ko} 품종 표준을 보여주는 완벽한 측면 두상 프로필",
            "eye_macro": f"{name_ko} 고양이 특유의 신비로운 눈동자와 홍채 패턴 매크로 촬영",
            "coat_texture": f"{name_ko} 고양이의 부드럽고 독특한 모질 질감을 보여주는 초근접 사진",
            "variant_full_body": f"{name_ko} 고양이의 다양한 모색 변종을 보여주는 전신 모습"
        },
        "expert_sources": [
            {"source_name": "CFA (The Cat Fanciers' Association)", "url": "https://cfa.org"},
            {"source_name": "TICA (The International Cat Association)", "url": "https://tica.org"}
        ],
        "schema_data": {
            "@context": "https://schema.org",
            "@type": "BiologicalEntity",
            "name": name_ko,
            "taxonRank": "Breed",
            "description": f"{name_ko} 고양이에 대한 박물관급 상세 정보"
        }
    }

def upgrade_to_v2():
    if not os.path.exists(BREED_DATA_DIR):
        print("Breed data directory not found.")
        return

    files = [f for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    
    for filename in files:
        filepath = os.path.join(BREED_DATA_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        breed_id = data.get("id", filename.replace(".json", ""))
        name_ko = data.get("name_ko", breed_id)
        
        # V2 필드 추가 (기존에 없으면 추가)
        v2_fields = get_v2_additions(breed_id, name_ko)
        
        for key, value in v2_fields.items():
            if key not in data:
                data[key] = value
                
        # meta_tags 업데이트 (SEO 강화)
        if "meta_tags" in data:
            current_title = data["meta_tags"].get("title", "")
            if "박물관급 도감" not in current_title:
                data["meta_tags"]["title"] = f"{name_ko} 고양이 백과: {current_title} | nyan 박물관"
        
        # 파일 저장
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
    print(f"Successfully upgraded {len(files)} breeds to Data V2 Standard.")

if __name__ == "__main__":
    upgrade_to_v2()
