# Museum & Encyclopedia Architecture

## 1. 개요 (Philosophy)
CAT-AI-PEDIA의 텍스트와 정보 구조는 단순한 블로그 포스팅을 넘어선 **"루브르 박물관의 도슨트 해설 + 브리태니커 백과사전의 깊이"**를 지향합니다. 유저가 이미지 없이 텍스트만 읽더라도 감동과 신뢰를 느낄 수 있어야 하며, 구글(Google) 검색 엔진이 "해당 품종에 대한 가장 완벽하고 구조화된 문서(Authority)"로 인식하게 만듭니다.

---

## 2. SEO 최적화 메가 카테고리 (Mega Categories)
검색량(Search Volume)과 유저의 탐색 의도(Search Intent)를 반영하여 40종의 고양이를 다차원으로 분류합니다. (각 카테고리는 독립된 SEO 허브 페이지로 작동합니다)

### A. 글로벌 인기 순위 (Popularity Rank - Top 40)
1. 코리안 숏헤어 (Korean Shorthair / Domestic) - *한국 한정 트래픽 1위*
2. 렉돌 (Ragdoll)
3. 메인쿤 (Maine Coon)
4. 브리티시 숏헤어 (British Shorthair)
5. 페르시안 (Persian)
6. 러시안 블루 (Russian Blue)
7. 샴 (Siamese)
8. 뱅갈 (Bengal)
9. 스코티시 폴드 (Scottish Fold) - *유전병 경고 필수*
10. 노르웨이 숲 (Norwegian Forest Cat)
11. 아비시니안 (Abyssinian)
12. 스핑크스 (Sphynx)
13. 아메리칸 숏헤어 (American Shorthair)
14. 먼치킨 (Munchkin) - *유전병 경고 필수*
15. 시베리안 (Siberian)
16. 엑조틱 숏헤어 (Exotic Shorthair)
17. 터키시 앙고라 (Turkish Angora)
18. 데본 렉스 (Devon Rex)
19. 버만 (Birman)
20. 코니시 렉스 (Cornish Rex)
*(이하 40위까지 확장)*

### B. 체형 및 털 특성 (Physical Traits)
- **자이언트 그룹 (Giant Cats)**: 메인쿤, 노르웨이 숲, 시베리안, 사바나캣
- **요정/외계인형 (Alien/Elf Look)**: 스핑크스, 데본 렉스, 피터볼드
- **저자극성/알러지 덜 유발 (Hypoallergenic)**: 시베리안, 러시안 블루, 스핑크스, 발리네즈
- **야생의 피 (Wild Blood)**: 뱅갈, 사바나캣, 토이거, 오시캣

### C. 라이프스타일/성격 (Lifestyle & Temperament)
- **무릎 고양이 (Lap Cats / Affectionate)**: 렉돌, 페르시안, 버만
- **개냥이/수다쟁이 (Dog-like / Vocal)**: 샴, 오리엔탈 숏헤어, 스핑크스
- **아파트/실내 적응형 (Apartment Friendly)**: 브리티시 숏헤어, 페르시안, 엑조틱 숏헤어

---

## 3. 딥 큐레이션 데이터 스키마 (Deep Curation Schema)
품종별 상세 페이지(`/breeds/[slug]`)는 다음의 구조화된 데이터(JSON-LD 호환)를 바탕으로 렌더링됩니다. 단순 텍스트가 아닌, 아코디언(Accordion), 데이터 표(Table), 타임라인(Timeline) 형태의 시각적 컴포넌트로 제공됩니다.

### 섹션 1: 박물관 도슨트 요약 (The Museum Plaque)
- **한줄평 (Catchphrase)**: (예: "거인의 몸에 깃든 다정한 천사, 메인쿤")
- **원산지 및 기원 연도 (Origin & Era)**: (예: 미국 메인 주, 19세기 자연발생)
- **국제 공인 상태 (CFA / TICA Status)**: 챔피언십 등록 연도
- **핵심 파라미터 (Radar Chart Data)**: 친화력, 활동량, 털빠짐, 지능, 울음소리 (1~10 스케일 척도)

### 섹션 2: 기원과 역사 (History & Heritage)
- **탄생 배경 (The Genesis)**: 인위적 교배인지, 자연 발생인지 서술 (SEO 타겟: "메인쿤 역사", "메인쿤 조상")
- **역사적 일화 (Historical Anecdotes)**: 항해사들의 쥐잡이 고양이였다는 전설 등.

### 섹션 3: 생물학적/해부학적 특징 (Anatomy & Genetics)
- **두상 및 이목구비 (Facial Structure)**: 귀의 각도, 눈의 형태(아몬드/호두/레몬 등), 코의 길이.
- **코트 텍스처 및 유전학 (Coat Genomics)**: 단모/장모 유전자 특성, 포인트 컬러 발현 온도 의존성(샴의 경우).
- **성장 속도 (Growth Curve)**: 완전히 크는 데 걸리는 시간 (예: 메인쿤은 3~5년 소요).

### 섹션 4: 행동 심리학 (Behavioral Psychology)
- **애착 유형 (Attachment Style)**: 사람을 졸졸 따라다니는지(Velcro cat), 독립적인지.
- **사냥 본능 및 놀이 (Prey Drive)**: 수직 공간(캣타워) 선호도 vs 수평 공간 선호도.
- **타 펫/어린이 친화도 (Socialization)**: 합사 난이도.

### 섹션 5: 수의학 및 건강 보고서 (Veterinary & Health Report)
*※ 가장 검색량이 많고 체류 시간이 긴 핵심 SEO 섹션*
- **주의해야 할 유전 질환 (Genetic Dispositions)**: 
  - (예: HCM(비대성 심근증), PKD(다낭성 신장질환), 관절 문제 등).
- **필수 권장 검사 (Recommended Screenings)**: 1세 이전에 해야 할 유전자/초음파 검사 목록.
- **기대 수명 (Lifespan)**: 평균 수명 및 장수 비결.

### 섹션 6: 오해와 진실 (Myth vs. Fact)
- **Myth**: "스핑크스는 털이 아예 안 빠지니까 관리가 쉽다?" 
- **Fact**: "털 대신 피지가 분비되어 정기적인 목욕과 피부 관리가 필수적입니다."

---

## 4. UI/UX 구현 방안 (Next.js 연계)
- 위 데이터들을 긴 텍스트로 나열하면 이탈률이 높아지므로, **잡지(Magazine) 레이아웃**을 차용합니다.
- 좌측에는 스크롤에 따라 변하는 고정 네비게이션(Sticky Nav)을 배치하고, 우측에는 각 스키마 섹션이 인터랙티브하게 등장(Fade-in)하도록 구성합니다.
- `JSON-LD` 스키마를 페이지 헤더에 자동 삽입하여 구글 검색 결과에서 '지식 패널(Knowledge Panel)'이나 '리치 스니펫(Rich Snippets)'으로 노출되도록 최적화합니다.
