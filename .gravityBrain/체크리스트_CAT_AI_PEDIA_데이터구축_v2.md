# 🏛️ nyan 프리미엄 데이터 구축 체크리스트 v3

> 최종 업데이트: 2026-05-05

---

## 📊 현재 전체 현황 (자동 감사 결과)

| 품종 | SEO 필드 | 경제성 | 사회성 | 프롬프트 | 이미지 파일 |
|------|---------|--------|--------|---------|------------|
| ragdoll | ✅ | ✅ | ✅ | ✅ | ✅ |
| british-shorthair | ✅ | ✅ | ✅ | ✅ | ❌ |
| maine-coon | ✅ | ✅ | ✅ | ✅ | ❌ |
| persian | ✅ | ✅ | ✅ | ✅ | ❌ |
| norwegian-forest-cat | ✅ | ✅ | ✅ | ✅ | ❌ |
| siamese | ✅ | ✅ | ✅ | ✅ | ❌ |
| russian-blue | ✅ | ✅ | ✅ | ✅ | ❌ |
| bengal | ✅ | ✅ | ✅ | ✅ | ❌ |
| scottish-fold | ✅ | ✅ | ✅ | ✅ | ❌ |
| abyssinian | ✅ | ✅ | ✅ | ✅ | ❌ |
| sphynx | ✅ | ✅ | ✅ | ✅ | ❌ |
| american-shorthair | ✅ | ✅ | ✅ | ✅ | ✅ |
| munchkin | ✅ | ✅ | ✅ | ✅ | ❌ |
| siberian | ✅ | ✅ | ✅ | ✅ | ❌ |
| exotic-shorthair | ✅ | ✅ | ✅ | ✅ | ❌ |
| turkish-angora | ✅ | ✅ | ✅ | ✅ | ❌ |
| devon-rex | ✅ | ✅ | ✅ | ✅ | ❌ |
| birman | ✅ | ✅ | ✅ | ✅ | ❌ |
| cornish-rex | ✅ | ✅ | ✅ | ✅ | ❌ |
| turkish-van | ✅ | ✅ | ✅ | ✅ | ❌ |
| **burmese** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **chartreux** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **himalayan** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **korean-shorthair** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **savannah** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **tonkinese** | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## ✅ Phase 1: 완료된 작업

- [x] **Schema 확정**: pros/cons, economics, social_compatibility, meta_tags, faq 필드 추가
- [x] **UI 연동**: ClientPage.tsx를 새 스키마에 맞게 전면 리빌딩 (이미지 fallback 포함)
- [x] **데이터 완성 (20종)**: ragdoll, british-shorthair, maine-coon, persian, norwegian-forest-cat, siamese, russian-blue, bengal, scottish-fold, abyssinian, sphynx, american-shorthair, munchkin, siberian, exotic-shorthair, turkish-angora, devon-rex, birman, cornish-rex, turkish-van
- [x] **이미지 파일 존재**: ragdoll ✅, american-shorthair ✅ (나머지는 ComfyUI 대기 중)
- [x] **로컬 렌더링 파이프라인**: `flux_gen.py` 완성 (WebSocket + 자동저장)
- [x] **PyTorch 업그레이드**: 2.12 나이틀리 + CUDA 12.8 (RTX 5080 sm_120 지원)
- [x] **커서 효과 제거**: globals.css에서 `cursor: none` 삭제

---

## 🔴 Phase 2: 즉시 해결 필요

### 2-1. ComfyUI 서버 기동
- [ ] ComfyUI `venv` 환경 PyTorch 2.12 정상 작동 확인
- [ ] `127.0.0.1:8188` 접속 확인
- [ ] `workflow_api.json` (Save API Format) 준비

### 2-2. 이미지 자동 생성 실행
- [ ] `python flux_gen.py` 실행 → 20종 `_master.webp` 순차 생성
- [ ] `public/images/Nyan/` 폴더에 이미지 적재 확인
- [ ] 브라우저에서 실제 이미지 배치 검수

---

## 🟡 Phase 3: 미완성 품종 데이터 구축 (6종)

- [ ] **burmese** (버마) - SEO 스키마 전면 작성
- [ ] **chartreux** (샤르트뢰) - SEO 스키마 전면 작성
- [ ] **himalayan** (히말라얀) - SEO 스키마 전면 작성
- [ ] **korean-shorthair** (코리안 숏헤어) - SEO 스키마 전면 작성
- [ ] **savannah** (사바나) - SEO 스키마 전면 작성
- [ ] **tonkinese** (통키니즈) - SEO 스키마 전면 작성

---

## 🔵 Phase 4: 21~50위 신규 구축 (24종 추가 예정)

| 순위 | 품종 | 상태 |
|------|------|------|
| 21 | Bombay (봄베이) | ❌ 미시작 |
| 22 | Ragamuffin (래거머핀) | ❌ 미시작 |
| 23 | Oriental Shorthair (오리엔탈 숏헤어) | ❌ 미시작 |
| 24 | Burmilla (버밀라) | ❌ 미시작 |
| 25 | Selkirk Rex (셀커크 렉스) | ❌ 미시작 |
| 26 | Egyptian Mau (이집션 마우) | ❌ 미시작 |
| 27 | Balinese (발리니즈) | ❌ 미시작 |
| 28 | Somali (소말리) | ❌ 미시작 |
| 29 | Singapura (싱가푸라) | ❌ 미시작 |
| 30 | Ocicat (오시캣) | ❌ 미시작 |
| 31-50 | (추가 품종) | ❌ 미시작 |

---

## ⚠️ 핵심 준수 사항
- **[이미지 생성]**: 에이전트가 직접 절대 생성 금지. 오직 사용자 로컬 RTX 5080 + ComfyUI API만 사용.
- **[파일 경로]**: `public/images/Nyan/{breed_id}_master.webp`
- **[프롬프트]**: 자연어 기반, 공통 스타일 프리픽스 + 품종별 특징 조합
- **[배경]**: Pitch-black background, Cinematic rim lighting 고정
