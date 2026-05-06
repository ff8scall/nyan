import json
import os

BREED_DATA_DIR = "src/data/breeds"

# 수집된 데이터 매핑 (외형 중심)
BREED_INFO = {
    "american-bobtail": {
        "app_en": "Natural short tail (1/3 to 1/2 length), sturdy rectangular body, 'wild' look with a dense double coat.",
        "app_ko": "자연적으로 짧은 꼬리(정상 길이의 1/3~1/2)와 직사각형의 튼튼한 몸집이 특징입니다. 이중모의 빽빽한 털 덕분에 야생적인 분위기를 풍깁니다.",
        "sum_ko": "'야생의 외모를 가진 순둥이'로 불리며, 강아지처럼 영리하고 집사를 잘 따르는 짧은 꼬리 고양이입니다."
    },
    "american-wirehair": {
        "app_en": "Unique 'steel wool' coat texture, dense and coarse crimped hair, muscular build similar to American Shorthair.",
        "app_ko": "철수세미나 양모처럼 거칠고 꼬불꼬불한 독특한 털 질감이 상징입니다. 근육질의 튼튼한 체형을 가졌으며 수염까지 곱슬거리는 경우가 많습니다.",
        "sum_ko": "미국 뉴욕에서 발견된 돌연변이에서 시작된 품종으로, 특유의 거칠고 탄력 있는 곱슬털이 매력적인 개성파 고양이입니다."
    },
    "australian-mist": {
        "app_en": "Moderate foreign type with a spotted or marbled coat, large lustrous green eyes, and a glossy short coat.",
        "app_ko": "스포티드(점박이) 또는 마블 무늬가 안개처럼 부드럽게 퍼진 코트가 특징입니다. 크고 빛나는 초록색 눈과 근육질의 균형 잡힌 몸매를 가졌습니다.",
        "sum_ko": "호주에서 탄생한 유일한 품종으로, 온순한 성격과 안개처럼 은은한 무늬 덕분에 가정용 반려묘로 최적화된 고양이입니다."
    },
    "balinese": {
        "app_en": "Elegant lithe body, essentially a longhaired Siamese with a distinctive plumed tail and deep blue eyes.",
        "app_ko": "샴 고양이의 장모종 버전으로, 우아하고 날씬한 몸매와 화려하고 풍성한 깃털 같은 꼬리가 특징입니다. 깊고 푸른 사파이어색 눈을 가졌습니다.",
        "sum_ko": "샴의 영리함과 장모종의 화려함을 동시에 갖춘 품종으로, 발레리나처럼 우아한 움직임 때문에 '발리니즈'라는 이름을 얻었습니다."
    },
    "bombay": {
        "app_en": "Miniature black panther appearance, muscular body, jet-black glossy coat, and bright copper or gold eyes.",
        "app_ko": "'거실 위의 작은 흑표범'으로 불리는 칠흑 같은 검은 털과 구리색 혹은 금색의 둥근 눈이 상징입니다. 새틴처럼 매끄럽고 윤기 나는 짧은 털이 몸에 밀착되어 있습니다.",
        "sum_ko": "흑표범을 닮은 외모와 달리 매우 사교적이고 애교가 많아 '벨크로 고양이'라는 별명이 있을 정도로 집사 곁을 떠나지 않습니다."
    },
    "burmilla": {
        "app_en": "Sparkling silver-white coat with shading, green eyes with distinctive 'eyeliner' outlines, elegant foreign build.",
        "app_ko": "은색 바탕에 은은하게 들어간 쉐이딩(Shading) 코트와 선명한 아이라인을 그린 듯한 초록색 눈이 특징입니다. 버미즈의 체격과 페르시안의 우아함이 조화를 이룹니다.",
        "sum_ko": "버미즈와 페르시안의 우연한 만남으로 탄생한 '은빛 보석' 같은 고양이로, 반짝이는 털과 차분한 성격이 매력적입니다."
    },
    "chausie": {
        "app_en": "Exotic predatory look, long-legged athletic body, small angular head, and grizzled or ticked tabby coat.",
        "app_ko": "정글 고양이와의 교배로 태어난 야생적인 외모와 긴 다리, 탄탄한 근육질 몸매가 특징입니다. 귀 끝의 장식털(Tuft)과 강인한 턱선이 맹수 같은 인상을 줍니다.",
        "sum_ko": "야생의 본능과 집고양이의 다정함을 모두 갖춘 활동적인 품종으로, 엄청난 도약력과 지능을 자랑합니다."
    },
    "cymric": {
        "app_en": "Longhair version of Manx, tailless or short stump, round 'bear-like' appearance with a dense double coat.",
        "app_ko": "맹크스의 장모종 버전으로, 꼬리가 없거나 아주 짧은 것이 특징입니다. 둥글둥글한 얼굴과 곰 같은 실루엣, 그리고 아주 빽빽하고 부드러운 이중모를 가졌습니다.",
        "sum_ko": "꼬리 대신 토끼처럼 깡충거리는 뒷다리 걸음걸이가 매력적인 품종으로, 장모종 특유의 풍성함과 맹크스의 다정함을 가졌습니다."
    },
    "egyptian-mau": {
        "app_en": "Natural spotted coat, distinctive gooseberry green eyes, athletic and graceful build, fast runner with skin flap.",
        "app_ko": "인위적 교배 없이 자연적으로 발생한 점박이 무늬와 '구즈베리' 빛의 초록색 눈이 상징입니다. 뒷다리 사이에 피부 플랩이 있어 고양이 중 가장 빠른 속도로 달릴 수 있습니다.",
        "sum_ko": "고대 이집트 벽화 속 고양이의 직계 후손으로, 신비로운 점박이 무늬와 엄청난 순발력을 가진 살아있는 역사입니다."
    },
    "himalayan": {
        "app_en": "Persian body type (cobby) with Siamese pointed colors and blue eyes, long thick silky fur.",
        "app_ko": "페르시안의 둥글고 단단한 체격과 샴의 포인트 컬러 및 푸른 눈이 결합된 형태입니다. 아주 길고 화려한 비단 같은 털과 낮은 코가 특징입니다.",
        "sum_ko": "페르시안의 우아함과 샴의 색채미를 동시에 즐길 수 있는 품종으로, 매우 조용하고 온순한 전형적인 무릎 고양이입니다."
    },
    "korean-shorthair": {
        "app_en": "Native Korean domestic cat, diverse patterns (cheese, tuxedo, mackerel), medium sturdy build, active and healthy.",
        "app_ko": "한국 토종 고양이로 고등어, 치즈, 턱시도 등 매우 다양한 무늬를 가집니다. 특정 표준은 없지만 대체로 근육질에 영리하며 한국 환경에 최적화된 강한 생존력을 보입니다.",
        "sum_ko": "우리 곁에서 가장 친숙하게 만날 수 있는 '코숏'으로, 개성 넘치는 무늬와 강한 면역력, 그리고 영리한 눈치로 사랑받는 한국의 고양이입니다."
    },
    "laperm": {
        "app_en": "Unique curly or wavy 'Gypsy Shag' coat, springy texture standing away from body, wedge-shaped head.",
        "app_ko": "전신이 파마를 한 듯 뽀글뽀글한 곱슬털로 덮여 있는 '히피 고양이'입니다. 털이 몸에서 떠 있어 공기처럼 가벼운 느낌을 주며 알레르기 유발이 적은 편입니다.",
        "sum_ko": "농장에서 우연히 발견된 곱슬털 고양이에서 유래했으며, 부드러운 성격과 독특한 질감의 코트 덕분에 만지는 재미가 있는 품종입니다."
    },
    "nebelung": {
        "app_en": "Solid blue coat with a silver sheen, semi-long silky fur, elegant foreign-type body, and vivid green eyes.",
        "app_ko": "러시안 블루의 장모종 버전으로, 은빛 광택이 도는 짙은 청색 털과 신비로운 초록색 눈이 특징입니다. 안개처럼 몽환적인 분위기를 풍기는 긴 털과 날렵한 몸매를 가졌습니다.",
        "sum_ko": "'안개의 피조물'이라는 이름답게 우아하고 신비로운 분위기를 자아내며, 집사에게만 마음을 여는 일편단심 성격의 고양이입니다."
    },
    "peterbald": {
        "app_en": "Hairless or minimal velvet coat, long tapering oriental lines, extra-large flared ears, slender and graceful.",
        "app_ko": "털이 없거나 아주 미세한 솜털로 덮여 있으며, 샴처럼 길고 가느다란 오리엔탈 체형과 커다란 귀가 상징입니다. 우아한 선과 독특한 피부 질감이 특징입니다.",
        "sum_ko": "러시아에서 탄생한 우아한 무모종으로, 털 날림이 거의 없고 지능이 매우 높으며 집사와 대화하는 것을 즐기는 다정한 품종입니다."
    },
    "pixie-bob": {
        "app_en": "Resembles North American Bobcat, short tail, heavy hooded eyes, and polydactyl (extra toes) often present.",
        "app_ko": "북미의 야생 살쾡이(밥캣)를 쏙 빼닮은 외모와 짧은 꼬리, 그리고 무거운 눈꺼풀이 특징입니다. 발가락이 더 많은 '다지증'이 공식적으로 허용되는 유일한 품종입니다.",
        "sum_ko": "야생적인 겉모습과 달리 '가족 바보'라고 불릴 정도로 헌신적이고 조용한 성격을 가진 반전 매력의 고양이입니다."
    },
    "ragamuffin": {
        "app_en": "Large rectangular body, sweet expression with walnut eyes, exceptionally soft rabbit-like fur.",
        "app_ko": "래그돌에서 파생된 품종으로 더욱 크고 단단한 몸집과 토끼 털처럼 부드러운 긴 털을 가졌습니다. 커다란 호두 모양의 눈과 항상 웃는 듯한 표정이 상징입니다.",
        "sum_ko": "어떤 색상이든 허용되는 화려한 외모와 인형처럼 순한 성격을 가졌으며, 아이들이나 다른 동물과도 완벽하게 어울리는 최고의 가정묘입니다."
    },
    "savannah": {
        "app_en": "Serval hybrid, exceptionally tall and lean, large ears, hooded eyes, and distinctive spotted pattern.",
        "app_ko": "아프리카 서벌과의 교배로 태어나 고양이 중 가장 키가 크고 날씬합니다. 커다란 귀와 눈가의 눈물 자국(Tear streak), 그리고 화려한 스포티드 무늬가 야생 그 자체입니다.",
        "sum_ko": "압도적인 크기와 카리스마 넘치는 외모로 '고양이계의 슈퍼모델'이라 불리며, 강아지처럼 산책이 가능할 정도의 활동량과 지능을 가졌습니다."
    },
    "singapura": {
        "app_en": "Smallest recognized breed, sepia agouti ticked coat, exceptionally large eyes and ears relative to body.",
        "app_ko": "세계에서 가장 작은 고양이로 알려져 있으며, 몸에 비해 거대한 눈과 귀가 만화 캐릭터 같은 귀여움을 줍니다. 금색 바탕의 틱(Ticked) 무늬 코트가 단 하나만 허용됩니다.",
        "sum_ko": "싱가포르 하수구에서 발견된 작은 고양이에서 시작된 기적의 품종으로, 작은 몸집에 넘치는 에너지와 호기심을 가진 사랑스러운 동반자입니다."
    },
    "snowshoe": {
        "app_en": "Pointed color with four white 'mittens', inverted V-shape on face, bright blue eyes, muscular medium build.",
        "app_ko": "샴의 포인트 컬러에 네 발에 흰 장화를 신은 듯한 무늬와 얼굴의 역 'V'자 무늬가 특징입니다. 근육질의 탄탄한 몸매와 아름다운 파란 눈을 가졌습니다.",
        "sum_ko": "샴과 아메리칸 쇼트헤어의 장점만 결합된 품종으로, 톡톡 튀는 외모만큼이나 사교적이고 수다스러운 성격의 소유자입니다."
    },
    "sokoke": {
        "app_en": "Lean and athletic with 'tree bark' tabby pattern, very short glossy coat, and a distinctive 'tip-toe' gait.",
        "app_ko": "나무껍질을 닮은 독특한 마블 무늬(우드브레인 패턴)와 매우 짧고 매끄러운 털이 특징입니다. 뒷다리가 길어 마치 까치발로 걷는 듯한 독특한 걸음걸이를 보입니다.",
        "sum_ko": "케냐의 숲에서 발견된 희귀 품종으로, 야생의 날렵함과 집고양이의 영리함을 동시에 가졌으며 물을 두려워하지 않는 용감한 고양이입니다."
    },
    "toyger": {
        "app_en": "Miniature tiger look, modified mackerel tabby with circular stripes, muscular body, and glittery soft coat.",
        "app_ko": "'거실용 호랑이'를 목표로 개량되어 몸 전체를 감싸는 둥근 줄무늬(로제트)와 근육질 체형이 완벽한 호랑이의 축소판입니다. 털에서 금빛 광택(Glitter)이 납니다.",
        "sum_ko": "호랑이의 야성미를 집 안에서 즐길 수 있도록 만들어진 예술적인 품종으로, 외모와 달리 매우 침착하고 친화력이 뛰어난 신사입니다."
    },
    "turkish-van": {
        "app_en": "Large muscular 'swimming cat', cashmere-like texture coat, color only on head and tail (Van pattern).",
        "app_ko": "머리와 꼬리에만 무늬가 있고 몸은 하얀 '반(Van)' 패턴이 상징입니다. 방수 기능이 있는 캐시미어 같은 털을 가졌으며, 고양이 중 드물게 물놀이를 즐기는 것으로 유명합니다.",
        "sum_ko": "터키 반 호수 근처에서 유래한 '수영하는 고양이'로, 강인한 체력과 독특한 무늬, 그리고 물에 대한 두려움이 없는 용맹한 품종입니다."
    }
}

def fill_details():
    for breed_id, info in BREED_INFO.items():
        filepath = os.path.join(BREED_DATA_DIR, f"{breed_id}.json")
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # 데이터 업데이트
            data["appearance_en"] = info["app_en"]
            data["appearance_ko"] = info["app_ko"]
            data["summary_ko"] = info["sum_ko"]
            
            # 성격 및 케어 정보도 수집된 내용을 바탕으로 자연스럽게 보강 (기존 데이터 유지하며 보완)
            if "personality_ko" not in data or not data["personality_ko"]:
                data["personality_ko"] = f"{data.get('name_ko', breed_id)} 특유의 영리함과 매력을 가진 품종입니다."

            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Updated: {breed_id}")
        else:
            print(f"File not found: {breed_id}.json")

if __name__ == "__main__":
    fill_details()
