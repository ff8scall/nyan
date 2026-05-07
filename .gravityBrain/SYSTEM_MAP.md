# 🗺️ SYSTEM_MAP (nyan - Museum-Grade Cat Encyclopedia)

## 1. 프로젝트 개요 (Overview)
- **목표**: 52종의 고양이 품종에 대한 박물관급 초실사 도감 서비스 제공.
- **핵심 가치**: 박물관급 미학(Aesthetic), 고도의 전문 데이터, 최첨단 SEO 최적화.

## 2. 기술 스택 (Tech Stack)
- **Frontend**: Next.js 15 (App Router), TypeScript, Vanilla CSS.
- **State/Data**: Static JSON-based Data Layer + **i18n Translation Dictionary**.
- **SEO & Infra**: JSON-LD (Schema.org), Hreflang, RSS/Sitemap, Vercel.
- **AI Pipeline**: ComfyUI (Local API), FLUX.1 [dev], Python Automation.

## 3. 디렉토리 구조 (Directory Structure)

### 📂 src/ (Core Application)
- app/[lang]/breeds/[slug]/: 품종 상세 페이지 (다국어 지원).
  - page.tsx: 서버 사이드 메타데이터 및 JSON-LD 생성.
  - ClientPage.tsx: 박물관급 UI 렌더링 및 인터랙션 처리.
- app/sitemap.ts: 동적 사이트맵 생성 시스템.
- app/rss.xml/route.ts: 동적 RSS 피드 생성 시스템.
- **Robots.txt**: 검색 봇의 수집 범위를 제어하고 사이트맵 위치를 고지합니다.
- **Official Authority Integration**: CFA/TICA의 공식 표준 데이터를 `official_recognition` 객체로 구조화하여 정보의 권위성(Authority)을 확보하고, 시각적 배지(Badges)와 딥링크를 통해 신뢰도를 높입니다.
- i18n/dictionaries.ts: 영문/국문 UI 라벨 및 데이터 매핑 사전.
- lib/breeds.ts: JSON 데이터 로드 및 타입 정의 (BreedData).
- data/breeds/: 52종의 품종별 마스터 JSON 데이터 저장소.

### 📂 public/ (Static Assets)
- images/Nyan/: 품종별 8K 마스터피스 이미지 에셋 (WebP/PNG).

### 📂 .gravityBrain/ (Memory & Map)
- MEMORY.md: 프로젝트 진행 상황 및 단기 목표.
- SYSTEM_MAP.md: 현재 문서 (시스템 전체 구조도).
- CORE_LOGIC.md: 핵심 비즈니스 로직 및 SEO 알고리즘 상세.
- BREED_DATA_SCHEMA.md: 박물관급 데이터 표준 스키마 정의.

## 4. 데이터 흐름 (Data Flow)

`mermaid
graph TD
    D[src/data/breeds/*.json] -->|Localized Metadata| E[Next.js page.tsx]
    E -->|JSON-LD / Metadata| F[Search Engine]
    E -->|Pass Data| G[ClientPage.tsx]
    H[i18n Dictionary] -->|UI Labels| G
    I[public/images/Nyan/] -->|8K Assets| G
    G -->|Museum UI| J[User Browser]
    
    subgraph "SEO & Data Layer"
    D
    H
    E
    end
    
    subgraph "Visual Presentation Layer"
    G
    I
    J
    end
`

## 5. 핵심 모듈 간 관계 (Module Relationships)
1. Next.js & i18n: dictionaries.ts가 모든 UI 텍스트와 데이터 매핑(원산지, 체형 등)을 중앙 집중 관리하여 다국어 일관성을 보장함.
2. SEO & Data: page.tsx가 JSON 데이터를 읽어 실시간으로 Article, FAQ, Breadcrumb 스키마를 생성하며, CFA/TICA 공식 인증 데이터를 통해 정보의 권위성을 보강함.
3. Responsive Grid: ClientPage.tsx가 3열 그리드 시스템과 Authority Badges를 통해 정보의 신뢰도와 박물관 도감의 심미성을 구현함.
