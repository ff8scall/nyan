# Breed Data Schema

## 1. Purpose

Breed data should be structured so the same source can power:
- breed detail pages,
- breed index cards,
- filters,
- comparison tables,
- quiz recommendations,
- SEO metadata,
- image generation tracking.

## 2. Data Format Recommendation

Recommended options:
- JSON for strict structured data.
- MDX with frontmatter for editorial flexibility.
- Hybrid: JSON/YAML data plus markdown body content.

Best recommendation:
- Use structured JSON or YAML for all factual fields.
- Use localized markdown/MDX for long-form sections.

## 3. Breed Object Schema

### Core Identity
- **id**: stable slug, e.g. `maine-coon`.
- **name_en**: English breed name.
- **name_ko**: Korean breed name.
- **aliases_en**: alternative English names.
- **aliases_ko**: Korean spelling variants.
- **origin_country**: country or region.
- **recognition_notes**: optional notes about breed recognition.

### Classification
- **size_category**: `small`, `medium`, `large`, `giant`.
- **body_type**: e.g. `cobby`, `semi-cobby`, `foreign`, `semi-foreign`, `long_and_substantial`.
- **coat_length**: `hairless`, `short`, `medium`, `long`.
- **coat_texture**: `straight`, `silky`, `dense`, `curly`, `plush`, `wiry`.
- **common_patterns**: array of common coat patterns.
- **common_colors**: array of common colors.

### Physical Ranges
- **weight_min_kg**
- **weight_max_kg**
- **weight_min_lb**
- **weight_max_lb**
- **lifespan_min_years**
- **lifespan_max_years**

### Scores
All scores use 1-5 scale.

- **grooming_level**
- **shedding_level**
- **activity_level**
- **playfulness_level**
- **affection_level**
- **independence_level**
- **vocal_level**
- **social_needs_level**
- **beginner_friendly_score**
- **apartment_fit_score**
- **family_fit_score**
- **multi_pet_fit_score**
- **time_alone_tolerance_score**

### Social Compatibility
- **social_compatibility**:
  - **kids_score**: (1-5)
  - **cats_score**: (1-5)
  - **dogs_score**: (1-5)
  - **strangers_score**: (1-5)

### Editorial & SEO Content
- **pros**: (Array of Strings) Key benefits for Google Snippets.
- **cons**: (Array of Strings) Potential challenges or limitations.
- **visual_comparison_tip**: (String) Advice for distinguishing from similar breeds.
- **meta_tags**:
  - **title**: Optimized SEO title.
  - **description**: Compelling meta description.
  - **keywords**: Array of target search terms.

### Economic Data
- **economics**:
  - **price_range_ko**: (String) Local cattery price range.
  - **monthly_care_cost**: (String) Estimated monthly expenses.

### Suitability Tags
- **good_for**: array.
- **think_twice_if**: array.
- **notable_cautions**: array.

### Health
- **health_notes_en**
- **health_notes_ko**
- **known_risks**: array of objects.

Risk object:
- **name_en**
- **name_ko**
- **severity_note**
- **source_needed**: boolean.

### Content Sections
- **summary_en**
- **summary_ko**
- **appearance_en**
- **appearance_ko**
- **personality_en**
- **personality_ko**
- **care_en**
- **care_ko**
- **origin_history_ko**: (String) 품종의 상세 기원 및 역사 스토리.
- **grooming_tips_ko**: (String) 구체적인 털 관리 및 위생 관리 팁.
- **recommended_items**: (Array) [item_name, reason] 구조의 추천 용품 리스트.
- **home_fit_en**
- **home_fit_ko**

- **schema_data**: (Object) JSON-LD 기반 구조화 데이터 (Schema.org 규격).
- **expert_sources**: (Array) [source_name, url] 구조의 공신력 있는 출처 리스트.
- **vet_disclaimer_ko**: (String) 수의사 전문 면책 고지 문구.

### Official Recognition (CFA/TICA)
- **official_recognition**: (Object) 공식 협회 인증 정보.
  - **cfa**: (Object)
    - **status**: (String) CFA 인증 등급 (e.g., "Championship", "Miscellaneous").
    - **year**: (Number/String) CFA 최초 등록/승인 연도.
    - **url**: (String) CFA 공식 품종 페이지 딥링크.
  - **tica**: (Object)
    - **status**: (String) TICA 인증 등급 (e.g., "Championship Breed").
    - **year**: (Number/String) TICA 최초 승인 연도.
    - **url**: (String) TICA 공식 품종 페이지 딥링크.

### FAQ
Each FAQ object:
- **question_en**
- **answer_en**
- **question_ko**
- **answer_ko**

### Similar Breeds
- **similar_breed_ids**: array of breed IDs.
- **comparison_targets**: array of breed IDs.

### Images
- **hero_image_id**
- **gallery_image_ids**
- **image_generation_priority**: `high`, `medium`, `low`.
- **visual_accuracy_difficulty**: `easy`, `medium`, `hard`.
- **image_review_notes**

## 4. Example Breed Skeleton

```json
{
  "id": "maine-coon",
  "name_en": "Maine Coon",
  "name_ko": "메인쿤",
  "aliases_en": [],
  "aliases_ko": ["메인쿤 고양이"],
  "origin_country": "United States",
  "size_category": "giant",
  "body_type": "long_and_substantial",
  "coat_length": "long",
  "coat_texture": "dense",
  "common_patterns": ["tabby", "solid", "tortoiseshell", "bicolor"],
  "common_colors": ["brown", "black", "red", "cream", "silver", "blue"],
  "weight_min_kg": 4.5,
  "weight_max_kg": 8.5,
  "lifespan_min_years": 12,
  "lifespan_max_years": 15,
  "grooming_level": 4,
  "shedding_level": 4,
  "activity_level": 3,
  "playfulness_level": 4,
  "affection_level": 4,
  "independence_level": 3,
  "vocal_level": 3,
  "social_needs_level": 4,
  "beginner_friendly_score": 3,
  "apartment_fit_score": 3,
  "family_fit_score": 5,
  "multi_pet_fit_score": 4,
  "time_alone_tolerance_score": 3,
  "good_for": ["families", "owners who enjoy grooming", "people wanting a large affectionate cat"],
  "think_twice_if": ["you want a low-shedding cat", "you have very limited space", "you dislike regular brushing"],
  "similar_breed_ids": ["norwegian-forest-cat", "siberian", "ragdoll"],
  "comparison_targets": ["ragdoll", "norwegian-forest-cat", "siberian"],
  "image_generation_priority": "high",
  "visual_accuracy_difficulty": "medium"
}
```

## 5. Score Definitions

### Grooming Level
- **1**: Minimal brushing.
- **2**: Occasional brushing.
- **3**: Weekly routine needed.
- **4**: Frequent brushing needed.
- **5**: High maintenance, possibly daily care.

### Shedding Level
- **1**: Very low visible shedding.
- **2**: Low.
- **3**: Moderate.
- **4**: High.
- **5**: Very high or seasonally heavy.

### Activity Level
- **1**: Very calm.
- **2**: Low to moderate.
- **3**: Moderate.
- **4**: Active.
- **5**: Very active, high enrichment need.

### Vocal Level
- **1**: Usually quiet.
- **2**: Mild.
- **3**: Moderate.
- **4**: Talkative.
- **5**: Very vocal.

### Beginner-Friendly Score
Considers:
- grooming burden,
- health complexity,
- activity needs,
- social needs,
- adaptability,
- handling tolerance.

## 6. Initial 30 Breed IDs

- `persian`
- `maine-coon`
- `ragdoll`
- `british-shorthair`
- `american-shorthair`
- `siamese`
- `bengal`
- `sphynx`
- `scottish-fold`
- `russian-blue`
- `abyssinian`
- `birman`
- `norwegian-forest-cat`
- `siberian`
- `exotic-shorthair`
- `devon-rex`
- `cornish-rex`
- `oriental-shorthair`
- `turkish-angora`
- `turkish-van`
- `chartreux`
- `burmese`
- `tonkinese`
- `himalayan`
- `munchkin`
- `savannah`
- `ragamuffin`
- `manx`
- `japanese-bobtail`
- `domestic-shorthair`

## 7. Data Validation Rules

- Every breed must have English and Korean names.
- Every breed must have all required scores.
- Every score must be integer 1-5.
- Every breed must have at least 3 similar breeds.
- Every breed must have at least 5 FAQs.
- Every breed must have image status metadata.
- Every health note must avoid diagnostic wording.
