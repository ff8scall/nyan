# High-End 2D Image Prompting Guide (CAT-AI-PEDIA)

## 1. 로컬 AI 환경 실행 (User Environment)
사용자의 로컬 RTX 5080 환경에서 ComfyUI(또는 WebUI)를 실행하는 명령어입니다. 
이미지 생성을 시작하기 전 터미널에서 아래 명령을 실행하세요.
```bash
call .\venv\Scripts\activate.bat
python main.py --highvram
```

## 2. 시각적 통일성 (Visual Consistency) 규칙
CAT-AI-PEDIA의 모든 고양이 이미지는 "고급스러운 갤러리/박물관" 느낌을 유지해야 합니다.
- **배경 (Background)**: 완전한 검은색이거나 매우 어두운 차콜색의 미니멀 스튜디오 배경 (Deep dark studio background).
- **조명 (Lighting)**: 피사체의 털 질감과 눈동자를 강조하는 드라마틱한 스포트라이트 및 시네마틱 라이팅 (Cinematic rim lighting, dramatic spotlight).
- **질감 (Texture)**: 일렉트론 현미경으로 보는 듯한 8K급 디테일, 털 한 올 한 올이 분리되어 보이는 극강의 선명도 (Electron microscope level texture, ultra-sharp 8k resolution).
- **구도 (Composition)**: 프레임 정중앙에 위치하며, 품종의 체형을 알 수 있는 우아한 포즈 (Center-framed, elegant full-body or portrait).

## 3. Flux.1 전용 마스터 프롬프트 템플릿 (자연어 기반)
Flux.1은 기존 Stable Diffusion의 '단어 나열(태그)' 방식보다 **'상세한 문장 형태(자연어 묘사)'**를 훨씬 더 잘 이해합니다. 따라서 LLM에게 프롬프트 작성을 요청할 때 아래의 규칙을 사용합니다.

```text
너는 이제부터 '고양이 유전학 전문가'이자 세계 최고의 '하이엔드 반려동물 전문 사진작가'야.
우리의 목표는 'CAT-AI-PEDIA' 웹사이트의 빈 액자에 들어갈 '생물학적 고증이 완벽하게 반영된 8K 마스터피스'를 만드는 거야.
사용자는 RTX 5080과 Flux.1 [dev] 모델을 사용하고 있어.

내가 특정 고양이 품종을 제시하면, Flux.1이 완벽하게 이해할 수 있도록 '상세하고 유려한 영어 문장(Descriptive sentences)'으로 프롬프트를 작성해줘. 단순히 단어를 나열하지 말고, 마치 소설을 쓰듯 장면을 묘사해.

작성 규칙:
1. (Subject & Setting): "A breathtaking, hyper-realistic 8K photograph of an adult [품종명] cat sitting elegantly in a pitch-black minimalist studio..." 형태로 시작할 것.
2. (Biometric Details): 해당 품종만이 가진 유전적/생물학적 특징 (귀의 크기와 각도, 주둥이 모양, 눈의 색깔과 형태, 털의 질감과 패턴, 체형 등)을 정교한 문장으로 묘사. (예: "Its large, lynx-tipped ears stand tall, complementing a strong, square muzzle.")
3. (Texture & Lighting): 일렉트론 현미경 느낌의 질감, 털 한 올까지 보이는 극강의 선명도, 피사체를 돋보이게 하는 시네마틱 림 라이팅(Rim lighting)을 묘사할 것.
4. (Negative Prompt): Flux.1용 네거티브 (ugly, deformed, asymmetric ears, extra toes, cartoon, 3d render, plastic texture 등).

결과물은 Flux.1에 바로 붙여넣을 수 있는 영문 프롬프트 단락(Paragraph)과 네거티브 프롬프트를 제공해줘. 그리고 왜 이 묘사가 생물학적으로 중요한지 한국어로 짧게 설명해줘.
```

## 4. 품질 검사(QA) 및 기술 지원 지침
- **업스케일링 문의**: "RTX 5080을 쓰고 있어. Flux.1 [dev] 모델로 8K까지 업스케일하고 싶은데, VRAM 효율을 높이면서 디테일이 깨지지 않는 Ultimate SD Upscale 노드 설정값이랑 추천하는 Upscaler 모델 알려줘."
- **품질 개선 문의**: "세포막이나 털의 경계선이 뭉개져 보여. 어떤 키워드를 강조해야 더 날카로운(Sharp) 8K 느낌이 날까? 어떤 Post-processing 노드를 추가해야 할까?"
