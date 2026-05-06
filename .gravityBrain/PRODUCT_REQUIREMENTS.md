# Product Requirements Document

## 1. Product Overview

### Product Name
Bcat Popular Cat Breed Guide

### Product Type
Bilingual English/Korean SEO-first informational website for cat breed discovery, comparison, and adoption-readiness education.

### Product Goal
Create a highly useful, trustworthy, visually rich website that introduces around 30 popular cat breeds in detail and helps users decide which breeds fit their lifestyle.

### Product Promise
The site should answer not only `What does this cat look like?` but also `Can I live well with this cat?`

### Primary Languages
- English
- Korean

### Primary Differentiation
- Deep bilingual content rather than thin translated summaries.
- Structured breed data that supports comparison, filters, quizzes, and SEO.
- Realistic image strategy with clear AI/real image policy.
- Practical lifestyle fit guidance.
- Transparent cautions around health, temperament, and controversial traits.

## 2. Target Users

### Persona 1: First-Time Cat Owner
- **Goal**: Find a beginner-friendly cat breed.
- **Concerns**: Grooming, shedding, cost, personality, allergies, child safety.
- **Needs**: Clear explanations, suitability scores, warnings, simple comparisons.

### Persona 2: Korean Search User
- **Goal**: Research cat breeds in Korean before adoption or purchase.
- **Concerns**: Korean content is often shallow or copied.
- **Needs**: Natural Korean explanations, localized FAQs, 분양/입양 전 체크포인트.

### Persona 3: Breed Comparison User
- **Goal**: Compare 2-4 breeds such as Maine Coon vs Ragdoll.
- **Concerns**: Similar-looking breeds are confusing.
- **Needs**: Side-by-side facts, personality differences, care burden differences.

### Persona 4: Cat Enthusiast
- **Goal**: Read deeper breed history, traits, and care details.
- **Concerns**: Generic listicles lack depth.
- **Needs**: Detailed profile, sources, visual examples, related breeds.

## 3. MVP Scope

### Required Pages
- **Home page**
- **Breed index page**
- **30 breed detail pages in English**
- **30 breed detail pages in Korean**
- **Comparison page**
- **Quiz-lite page**
- **Methodology page**
- **Image policy page**
- **About page**
- **Contact or feedback page**

### Required Features
- **Language switcher**: English/Korean equivalent page linking.
- **Breed search**: Search by English/Korean breed names.
- **Breed filters**: Size, grooming, shedding, activity, vocalness, beginner-friendly, apartment-friendly.
- **Breed cards**: Quick summary and scores.
- **Breed detail template**: Consistent sections across all breeds.
- **Comparison tool**: Select 2-4 breeds and compare major fields.
- **Quiz-lite**: Recommend breeds from lifestyle answers.
- **FAQ sections**: Localized per breed.
- **SEO metadata**: title, description, canonical, hreflang, open graph.
- **Image metadata**: source, license/status, prompt/seed if generated, review status.

### Non-MVP Features
- User accounts.
- Community comments.
- Breeder marketplace.
- Vet directory.
- Paid premium content.
- Mobile app.
- Full CMS workflow.

## 4. Functional Requirements

### FR-001: Language Routing
The site must support language-specific routes.

Recommended route structure:
- `/en`
- `/ko`
- `/en/breeds`
- `/ko/breeds`
- `/en/breeds/maine-coon`
- `/ko/breeds/maine-coon`

Each English breed page must link to its Korean equivalent and vice versa.

### FR-002: Breed Index
The breed index must display all breeds with:
- breed name,
- thumbnail image,
- short summary,
- size,
- coat type,
- grooming level,
- shedding level,
- activity level,
- beginner fit,
- apartment fit.

Users should be able to filter and sort.

### FR-003: Breed Detail Page
Each breed detail page must include:
- hero section,
- quick facts,
- appearance,
- personality,
- care needs,
- grooming,
- activity/enrichment,
- health cautions,
- home suitability,
- best for / think twice if,
- similar breeds,
- comparison links,
- FAQ,
- image/source note,
- disclaimer.

### FR-004: Comparison Page
Users must be able to compare 2-4 breeds across:
- size,
- weight,
- lifespan,
- grooming,
- shedding,
- activity,
- affection,
- vocalness,
- beginner fit,
- apartment fit,
- family fit,
- health considerations,
- best owner profile.

### FR-005: Quiz-Lite
Quiz should ask around 7-10 questions:
- apartment or house,
- children,
- other pets,
- grooming tolerance,
- activity preference,
- noise tolerance,
- affection preference,
- allergy/shedding concern,
- first-time owner status,
- time at home.

Quiz output should recommend 3-5 breeds with reasons.

### FR-006: Image Labeling
Every image must have a status:
- `ai_generated_reviewed`,
- `ai_generated_pending_review`,
- `licensed_stock`,
- `creative_commons`,
- `original_photo`,
- `placeholder`.

AI-generated images must not be presented as documentary real photos.

## 5. Non-Functional Requirements

### Performance
- Pages should load quickly on mobile.
- Images must be optimized and lazy-loaded.
- Breed pages should be statically generated or cached.

### SEO
- Every indexable page needs unique metadata.
- English and Korean pages need hreflang.
- FAQ schema should be used carefully where content matches visible FAQ.
- Sitemap should include both languages.

### Accessibility
- All images require meaningful alt text.
- Color contrast must be readable.
- Filters and comparison controls must be keyboard accessible.
- Language switcher must be clear.

### Trust and Safety
- Health content must include a veterinary disclaimer.
- Temperament must be described as tendency, not guarantee.
- Welfare concerns must be mentioned for controversial breeds.

## 6. Success Metrics

### Launch Metrics
- 30 breed pages complete in both languages.
- 100% pages have metadata.
- 100% images have source/status metadata.
- 100% breed pages have FAQs.
- Sitemap and hreflang validated.

### Growth Metrics
- Organic impressions.
- Organic clicks.
- Breed page dwell time.
- Comparison page usage.
- Quiz completion rate.
- Newsletter signups.
- Affiliate click-through after monetization.

## 7. Key Product Decisions

### Decision 1: Content-first
Build content and SEO foundation before advanced interactivity.

### Decision 2: Structured data
Breed data should be stored in a structured format so pages, filters, comparison, and quiz can use the same source.

### Decision 3: Hybrid images
Use AI-generated visuals where helpful, but maintain a review process and consider real licensed images for factual visual reference.

### Decision 4: Trust over monetization
Monetization should not damage credibility. Affiliate blocks must be useful and clearly separated from editorial content.
