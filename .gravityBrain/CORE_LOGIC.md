# 🧠 CORE_LOGIC (Museum Archive & SEO Optimization)

## 1. 설계 의도 (Design Intent)
박물관급 고양이 도감으로서 **정보의 권위성(Authority)**과 **시각적 완성도(Aesthetics)**를 동시에 달성하는 것을 목표로 합니다. 특히 검색 엔진(Google/Bing)과 AI 챗봇(Copilot)이 데이터를 가장 효율적으로 수집할 수 있는 기술적 토대를 구축했습니다.

## 2. 핵심 로직 및 알고리즘

### A. 박물관급 아카이브 레이아웃 로직 (ClientPage.tsx)
- **수평 그리드 시스템**: 케어 지수, 경제성, 사회성 데이터를 3개 열로 배치하여 시각적 평형을 유지합니다.
- **다국어 매핑 엔진**: dictionaries.ts를 통해 원산지(Country), 체형(BodyType) 등의 코드 데이터를 실시간으로 국문/영문 명칭으로 치환합니다.
- **동적 이미지 로드**: 8개 표준 에셋(Master, Frontal, Profile 등)을 우선 로드하며, 에셋 누락 시 플레이스홀더로 자동 대체하는 폴백 로직을 포함합니다.

### B. 통합 SEO 최적화 로직 (SEO Master)
- **구조화 데이터 자동 생성 (JSON-LD)**:
  - Article: 품종 정보를 지식 콘텐츠로 마킹.
  - FAQPage: 품종별 자주 묻는 질문을 검색 결과에 직접 노출 유도.
  - BreadcrumbList: 사이트 계층 구조를 검색 엔진에 명시.
- **다국어 타겟팅 (Hreflang)**: 영문/국문 페이지 간의 관계를 명시하여 전 세계 사용자에게 적절한 언어 버전을 제안합니다.
- **이미지 맥락 텍스트화**: AI 수집기를 위해 모든 이미지에 품종명과 구도 정보를 포함한 상세한 Alt 텍스트를 동적으로 생성합니다.

### C. 동적 인프라 생성 로직 (Next.js Infra)
- **Sitemap.ts**: 모든 품종 ID와 다국어 경로를 조합하여 실시간 사이트맵을 생성합니다.
- **RSS Route**: 최신 아카이브 업데이트 소식을 XML 규격으로 배포하여 콘텐츠 신디케이션을 지원합니다.
- **Robots.txt**: 검색 봇의 수집 범위를 제어하고 사이트맵 위치를 고지합니다.
- **Official Authority Integration**: CFA/TICA의 공식 표준 데이터를 `official_recognition` 객체로 구조화하여 정보의 권위성(Authority)을 확보하고, 시각적 배지(Badges)와 딥링크를 통해 신뢰도를 높입니다.

## 3. 데이터 흐름 상세 (Data Flow Detail)

### 🧩 SEO 및 데이터 렌더링 시퀀스
`mermaid
sequenceDiagram
    participant D as Breed JSON
    participant S as Next.js Server
    participant G as Search Engine
    participant C as Client Browser

    D->>S: 1. 품종 데이터 로드
    S->>S: 2. JSON-LD 및 메타데이터 생성
    S->>G: 3. 사이트맵/헤더 정보 전달 (SEO 최적화)
    S->>C: 4. HTML & 하이드레이션 에셋 전달
    C->>C: 5. i18n 사전을 통한 UI 라벨링
    C->>C: 6. 박물관급 그리드 레이아웃 렌더링
`

## 4. 예외 처리 전략
- **SEO 폴백**: process.env.NEXT_PUBLIC_BASE_URL이 없을 경우 로컬 호스트로 폴백하여 빌드 중단을 방지하되, 배포 시 경고를 출력합니다.
- **타입 안정성**: expert_sources 등 외부 데이터 연동 시 인터페이스 불일치로 인한 빌드 에러를 방지하기 위해 엄격한 타입 체크와 핫픽스 로직을 적용했습니다.

## 5. 의존성 및 환경
- **Next.js 15+**: App Router 및 Metadata API 활용.
- **Schema.org**: 최신 검색 엔진 구조화 데이터 표준 준수.
- **Vercel**: 환경 변수 기반의 글로벌 배포 시스템.
