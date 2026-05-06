# I2I (Image-to-Image) 프롬프트 및 파라미터 교정 작업

## 1. MASC 분석 결과 반영 내역
- **현상**: 실제 고양이 사진을 레퍼런스로 주었으나, 3마리의 새끼 고양이가 나오는 등 원본과 무관한 이미지(검은 배경 상실, 구도 붕괴)가 출력됨.
- **원인 분석**:
  1. **Denoise 수치 과다 (0.75)**: 원본 사진의 형태를 유지하기에는 노이즈 제거율이 너무 높아 원본을 25%만 반영하고 AI가 완전히 새로 그림. (I2I 목적 상실)
  2. **프롬프트 오염**: `breed.json`의 프롬프트 내 Midjourney 전용 파라미터(`--ar 1:1 --v 6.1`)가 포함된 상태로 접두/접미사가 결합되어, ComfyUI(Flux/SD)의 CLIP 텍스트 인코더가 뒤쪽의 '검은 배경(solid deep black studio background)' 지시를 무시하거나 오인함.
  3. **피사체 수량 모호성**: 다중 객체가 등장하지 않도록 `single cat, one subject` 강제 필요.

## 2. 작업 체크리스트 (TODO)
- [ ] `flux_gen.py`의 Denoise 수치 하향 조정 (`0.75` -> `0.35` ~ `0.45` 수준으로 테스트 후 결정)
- [ ] `flux_gen.py` 프롬프트 정제 로직 추가 (Midjourney 파라미터 `--ar`, `--v` 등 정규식으로 제거)
- [ ] 단일 피사체(`single cat, only one cat`) 강조를 위한 Negative Prompt 및 Style Prefix 보강
- [ ] `ragdoll`, `siamese`, `munchkin` 등 타겟 종으로 테스트 생성 후, 원본 디테일 유지 및 검은 배경 적용 확인
- [ ] 완료 후 `MEMORY.md` 갱신
