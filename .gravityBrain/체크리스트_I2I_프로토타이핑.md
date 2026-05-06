# 🔍 체크리스트: Image-to-Image (I2I) 기반 박물관급 에셋 프로토타이핑

## 1단계: 초기화 및 엔진 수정
- [ ] `public/images/Nyan/` 폴더 내 기존 파일 전체 삭제 (사용자 백업 완료)
- [ ] `flux_gen.py` 로직 수정: `color_variants` 무시 로직 추가
- [ ] `flux_gen.py` 로직 수정: 테스트를 위해 정확히 3개 품종(예: Ragdoll, Siamese, Munchkin 등)만 실행하도록 Limit 설정

## 2단계: I2I 최적화 프롬프트 전략 수립
- [ ] "원본 레퍼런스의 골격/패턴 유지 + 블랙 스튜디오 조명 + 초고화질"을 결합한 마스터 프롬프트 체계 정리
- [ ] (필요 시) `workflow_api.json`에 LoadImage 노드 또는 ControlNet/IP-Adapter가 연결되어 있는지 확인 및 Python에서 해당 노드에 `target_refs/` 이미지 경로를 주입하도록 세팅

## 3단계: 프로토타입 생성 및 컨펌
- [ ] 3개 품종에 대해 총 12장(품종당 Master, Fullbody, Macro, Frontal) 생성 파이프라인 가동
- [ ] 생성 완료 후 사용자에게 보고하여 '정답률' 및 '예술적 스타일(블랙 스튜디오)' 적용 여부 최종 컨펌 받기
