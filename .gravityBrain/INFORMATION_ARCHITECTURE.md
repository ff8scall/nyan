# Information Architecture

## 1. Site Structure

### Primary Navigation
- **Home**
- **Breeds**
- **Compare**
- **Find Your Cat**
- **Guides**
- **Methodology**
- **About**

### Secondary Navigation
- **Popular Breeds**
- **Beginner-Friendly Breeds**
- **Apartment-Friendly Breeds**
- **Low-Shedding Breeds**
- **Affectionate Breeds**
- **Quiet Cat Breeds**
- **Large Cat Breeds**
- **Long-Haired Cat Breeds**

## 2. URL Structure

### Language Roots
- `/en`
- `/ko`

### Breed Index
- `/en/breeds`
- `/ko/breeds`

### Breed Detail
Use English stable slugs for both languages to simplify data mapping and hreflang.

Examples:
- `/en/breeds/maine-coon`
- `/ko/breeds/maine-coon`
- `/en/breeds/russian-blue`
- `/ko/breeds/russian-blue`

### Comparison
- `/en/compare`
- `/ko/compare`
- `/en/compare?breeds=maine-coon,ragdoll`
- `/ko/compare?breeds=maine-coon,ragdoll`

### Quiz
- `/en/find-your-cat`
- `/ko/find-your-cat`

### Guides
- `/en/guides`
- `/ko/guides`
- `/en/guides/best-cat-breeds-for-apartments`
- `/ko/guides/apartment-friendly-cat-breeds`

### Methodology and Policies
- `/en/methodology`
- `/ko/methodology`
- `/en/image-policy`
- `/ko/image-policy`
- `/en/about`
- `/ko/about`

## 3. Page Hierarchy

### Home Page
Purpose:
- Introduce the site promise.
- Send users to breed index, quiz, or popular breeds.

Main sections:
- Hero search.
- Popular breed cards.
- Lifestyle filters.
- Featured comparisons.
- Guide links.
- Trust statement.

### Breed Index Page
Purpose:
- Allow browsing and filtering of all breeds.

Main sections:
- SEO intro.
- Search and filters.
- Breed card grid.
- Category shortcuts.
- FAQ about choosing a breed.

### Breed Detail Page
Purpose:
- Provide deep educational content for one breed.

Main sections:
- Hero.
- Quick facts.
- Best for / think twice if.
- Appearance.
- Personality.
- Care and grooming.
- Health cautions.
- Home suitability.
- Similar breeds.
- Comparison CTA.
- FAQ.
- Sources/disclaimer.

### Compare Page
Purpose:
- Help users compare breeds side-by-side.

Main sections:
- Breed selector.
- Comparison table.
- Key differences summary.
- Recommendation notes.
- Related comparisons.

### Quiz Page
Purpose:
- Help uncertain users find likely breed matches.

Main sections:
- Intro.
- Questions.
- Results.
- Reasoning.
- Save/share CTA.
- Compare selected breeds CTA.

### Methodology Page
Purpose:
- Build trust by explaining scores, sources, and limitations.

Main sections:
- Editorial process.
- Scoring definitions.
- Health disclaimer.
- Temperament disclaimer.
- Source policy.
- Image review policy.

## 4. User Flow

### Flow A: Search User Enters Breed Page
1. User searches `Maine Coon personality`.
2. User lands on `/en/breeds/maine-coon`.
3. User reads quick facts and personality.
4. User clicks `Compare Maine Coon vs Ragdoll`.
5. User opens comparison page.
6. User clicks quiz or related care guide.

### Flow B: Korean User Browses Breeds
1. User searches `초보자가 키우기 좋은 고양이`.
2. User lands on Korean guide or breed index.
3. User filters by beginner-friendly and grooming level.
4. User opens Russian Blue, Ragdoll, British Shorthair.
5. User compares 3 breeds.

### Flow C: Visual Discovery
1. User lands on home.
2. User browses realistic breed cards.
3. User opens breed page.
4. User sees image note and profile details.
5. User saves/compares breed.

## 5. Internal Linking Rules

### Breed Page Links
Each breed page should link to:
- 3-5 similar breeds.
- 2-4 comparison pages.
- 2 relevant guides.
- language equivalent.
- breed index.

### Guide Page Links
Each guide should link to:
- relevant breed pages,
- comparison page,
- quiz page,
- methodology page where scoring is mentioned.

### Footer Links
- About.
- Methodology.
- Image Policy.
- Contact.
- Sitemap.
- Privacy Policy.
- Affiliate Disclosure if monetized.

## 6. Recommended Navigation Labels

### English
- Breeds
- Compare Breeds
- Find Your Cat
- Cat Care Guides
- Methodology

### Korean
- 고양이 품종
- 품종 비교
- 나에게 맞는 고양이 찾기
- 고양이 가이드
- 평가 기준

## 7. Language Strategy

### Slug Strategy
Use English slugs for both languages.

Reason:
- Easier content mapping.
- Cleaner data model.
- Stable hreflang.
- Avoids multiple romanization variants.

### Content Strategy
Korean pages should not be literal translations. They should be localized for Korean search behavior and phrasing.

Example:
- English: `Is the Ragdoll a good apartment cat?`
- Korean: `랙돌은 아파트에서 키우기 좋은 고양이일까?`
