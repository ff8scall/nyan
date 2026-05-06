# Checklist: 다국어 품종 마이그레이션 완결 (Remaining 25)

## 🎯 Task Goal
- **목표**: 52개 품종 중 남은 25개 품종의 다국어화(_en, _ko 분리) 및 스키마 최적화 완료.
- **기준**: `BreedData` 스키마 준수, 박물관급 에디토리얼 가이드 준수, SEO 메타데이터 포함.

## 🟢 마이그레이션 대상 (25)
- [x] oriental-shorthair.json
- [x] korean-shorthair.json
- [x] maine-coon.json
- [x] munchkin.json
- [x] norwegian-forest-cat.json
- [x] persian.json
- [x] peterbald.json
- [x] pixie-bob.json
- [x] ragamuffin.json
- [x] ragdoll.json
- [x] russian-blue.json
- [x] savannah.json
- [x] scottish-fold.json
- [x] selkirk-rex.json
- [x] siamese.json
- [x] siberian.json
- [x] singapura.json
- [x] snowshoe.json
- [x] sokoke.json
- [x] somali.json
- [x] sphynx.json
- [x] tonkinese.json
- [x] toyger.json
- [x] turkish-angora.json
- [x] turkish-van.json

## 🛠 작업 절차 (Per File)
1. **데이터 로드**: 원본 JSON 파일 읽기.
2. **스키마 변환**: `name` -> `name_ko`, `name_en` 등으로 필드 분리 및 번역.
3. **콘텐츠 보강**: FAQ(질문/답변), 메타데이터(제목/설명) 보강.
4. **검증**: `Language Bleeding` (영문 페이지에 한글 노출 등) 방지를 위한 필드 체크.
5. **저장**: 파일 업데이트.

## 🐛 레거시 버그 수정 (Legacy Bug Fixes)
- [x] **bombay.json**: 영문 필드 누락 및 언어 혼용 버그 수정 완료.
- [x] **birman.json**: 구형 스키마 및 placeholders 제거 완료.
- [x] **australian-mist.json**: 영문 메타데이터 및 FAQ 누락 수정 완료.
- [x] **SEO 타이틀 최적화**: 영문 타이틀 70자 초과 이슈 해결 (52종 전수 55자 이내로 압축 완료).
- [x] **전수 조사**: 52종 전 품종에 대해 `"title_ko":`, `"question_en":` 필드 존재 확인 완료.

## 🏁 최종 검수 항목
- [x] 52종 전 품종 `/ko/breeds/[id]` 및 `/en/breeds/[id]` 정상 렌더링 확인 (수동 샘플링).
- [ ] Sitemap.xml 및 RSS 피드 갱신 확인.
- [ ] `recommended_items` 커머스 링크 유효성 검사.
