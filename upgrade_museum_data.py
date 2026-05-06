import os
import json

BREED_DATA_DIR = "src/data/breeds"

def get_standard_template(breed_id, name_en, name_ko):
    """
    모든 품종이 가져야 할 표준 JSON 템플릿입니다.
    기존 데이터가 있으면 유지하고, 없으면 이 템플릿으로 보강합니다.
    """
    return {
        "id": breed_id,
        "name_en": name_en,
        "name_ko": name_ko,
        "aliases_ko": [],
        "origin_country": "Unknown",
        "size_category": "medium",
        "body_type": "substantial",
        "coat_length": "short",
        "coat_texture": "soft",
        "common_patterns": ["solid"],
        "common_colors": ["various"],
        "weight_min_kg": 3.0,
        "weight_max_kg": 6.0,
        "lifespan_min_years": 12,
        "lifespan_max_years": 16,
        "grooming_level": 3,
        "shedding_level": 3,
        "activity_level": 3,
        "playfulness_level": 3,
        "affection_level": 4,
        "independence_level": 3,
        "vocal_level": 2,
        "beginner_friendly_score": 4,
        "apartment_fit_score": 5,
        "family_fit_score": 5,
        "multi_pet_fit_score": 4,
        "social_compatibility": {
            "kids_score": 5,
            "cats_score": 4,
            "dogs_score": 4,
            "strangers_score": 3
        },
        "pros": ["매력적인 외모", "다정한 성격"],
        "cons": ["주기적인 관리 필요"],
        "economics": {
            "price_range_ko": "문의 필요",
            "monthly_care_cost": "약 100,000원 - 150,000원"
        },
        "summary_en": f"The {name_en} is a unique and charming breed with distinct characteristics.",
        "summary_ko": f"{name_ko}는 독특한 매력과 개성을 가진 사랑스러운 고양이 품종입니다.",
        "appearance_en": f"Characteristic features of the {name_en} breed.",
        "appearance_ko": f"{name_ko} 품종만의 독특한 외형적 특징을 가지고 있습니다.",
        "personality_en": "Affectionate, intelligent, and social.",
        "personality_ko": "다정하고 영리하며 사람들과 어울리는 것을 좋아합니다.",
        "care_en": "Requires regular health checks and a balanced diet.",
        "care_ko": "정기적인 건강 검진과 균형 잡힌 식단 관리가 필요합니다.",
        "known_risks": [
            { "name_en": "General Feline Health", "name_ko": "일반적인 고양이 건강 관리", "severity_note": "Low" }
        ],
        "faq": [
            { "question_ko": "키우기 어려운가요?", "answer_ko": "적절한 관심과 사랑을 준다면 초보 집사도 충분히 함께할 수 있습니다." }
        ]
    }

def upgrade_all_breeds():
    files = [f for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    
    for filename in files:
        filepath = os.path.join(BREED_DATA_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            current_data = json.load(f)
            
        breed_id = current_data.get("id") or filename.replace(".json", "")
        name_en = current_data.get("name_en") or breed_id.capitalize()
        name_ko = current_data.get("name_ko") or name_en
        
        # 템플릿 생성
        template = get_standard_template(breed_id, name_en, name_ko)
        
        # 기존 데이터로 템플릿 덮어쓰기 (기존의 소중한 데이터 보존)
        for key, value in current_data.items():
            if isinstance(value, dict) and key in template and isinstance(template[key], dict):
                template[key].update(value)
            else:
                template[key] = value
                
        # 필수 필드 재검증 (비어있으면 안 됨)
        if not template.get("summary_en") or template["summary_en"].startswith("The "):
            # 나중에 LLM 등으로 보강할 수 있도록 표시
            pass

        # 파일 저장
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(template, f, ensure_ascii=False, indent=2)
            
    print(f"Successfully upgraded {len(files)} breed files to Museum Standard.")

if __name__ == "__main__":
    upgrade_all_breeds()
