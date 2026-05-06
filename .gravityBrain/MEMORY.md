# Memory & Context

## 현재 상태 (Current Status)
- **8종 마스터 패키지 시스템 완공**: 래그돌(Ragdoll)을 필두로 Hero, Morphology, Macro, Variant 등 품종별 8종의 고화질 에셋 파이프라인 구축 완료.
- **WebP 최적화 엔진 가동**: 생성된 PNG를 웹 최적화용 WebP로 자동 변환하여 페이지 로딩 성능을 박물관 수준으로 상향 평준화.
- **데이터 중심 UI 리팩토링**: 몸무게, 수명, 유전병 등 방대한 스펙 데이터를 통합한 고밀도 레이아웃(`ClientPage.tsx`) 안착.

## ✅ 작업 현황 (Work Progress)
- [x] 래그돌(Ragdoll) 8종 마스터 에셋 생성 및 최적화 완료.
- [x] `ClientPage.tsx` 레이아웃 결함(공백, 크롭) 수선 및 데이터 연동 완료.
- [x] `generate_masterpiece.py`를 전 품종 자동 배치 가동용으로 고도화.

## 🚀 진행 중인 작업 (In Progress)
- **전 품종(29종) 리마스터 배치 실행**: 래그돌을 제외한 나머지 모든 품종에 대해 8종 마스터 패키지 자동 생성 및 WebP 최적화 중.
- **지식 자산화**: 생성된 에셋과 데이터의 유기적 결합을 위한 JSON 데이터 정제 작업 병행.

## 단기 목표 (Short-term Goals)
1. 백그라운드에서 진행 중인 29종 품종의 8종 패키지(총 232장) 생성 완료 여부 모니터링.
2. 생성 완료된 품종들의 UI 렌더링 무결성 및 데이터 매핑 전수 검사.
3. 전 품종 리마스터링 완료 후 최종 시스템 안정화 및 지식 전수 문서 마감.

## 🏆 최초 인정 버전 (First Approved Version - v1)
- **날짜**: 2026-05-06
- **특징**: "Ultra-Sharp Museum Grade" - 극상의 선명도와 박물관 도감 미학의 완벽한 조화.
- **핵심 설정**:
  - **Prompt**: `An ultra-sharp, professional museum-grade studio photograph of a {breed} cat. The cat is sitting elegantly on a large grey concrete pedestal. Deep solid black background. Extreme razor-sharp focus on the cat's eyes and face, intricate micro-details of every single hair and whisker. Dramatic professional studio lighting, high contrast, vivid and crisp textures. Shot on 100mm macro lens, 8k resolution, ultra-detailed, cinematic masterpiece.`
  - **Negative**: `blurry, bokeh, out of focus, soft focus, fuzzy, low resolution, oversaturated, plastic, cartoon, illustration, human, dog, flower`
  - **Steps**: 40
  - **CFG**: 1.0

# 🧠 Antigravity Memory Sync (2026-05-06)

## 📌 현재 진행 상황 (Current Status)
- **상위 30종 마스터피스 완성**: 맨크스(Manx)를 포함한 상위 30종의 8종 에셋 패키지 생성이 완료됨.
- **52종 전 품종 데이터 보강**: `personality_ko`, `care_ko`, `known_risks`, `economics` 등 박물관급 표준 규격으로 52종 전 품종 데이터 주입 완료.
- **파이프라인 구축**: `generate_rest_of_catalog.py` (나머지 22종 재생성용) 준비 완료.

## 🎯 단기 목표 (Next Steps)
1. **나머지 카탈로그 재생성**: `generate_rest_of_catalog.py`의 주석을 해제하고 실행하여 30위 밖 품종들의 이미지를 최신 데이터 기반으로 전면 갱신.
2. **UI 최종 검수**: 상세 페이지에서 보강된 데이터들이 레이아웃에 맞게 잘 렌더링되는지 전 품종 전수 확인.
3. **SEO 최적화**: 보강된 데이터를 바탕으로 각 품종 페이지의 메타 태그 및 키워드 연동 확인.
