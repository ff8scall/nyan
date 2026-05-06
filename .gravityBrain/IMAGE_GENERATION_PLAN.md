# Image Generation Plan

## 1. Goal

Create realistic, visually appealing cat breed images while protecting factual trust. The site should never mislead users into thinking AI images are documentary real photos.

## 2. Feasibility Summary

Realistic AI cat images are feasible. The major challenge is not photorealism but breed accuracy.

Common failure modes:
- wrong ear shape,
- wrong eye color,
- wrong body proportions,
- generic cat appearance,
- incorrect coat pattern,
- unrealistic fur texture,
- anatomical distortions,
- breed mix-up,
- over-beautified fantasy look.

## 3. Recommended Strategy

Use a hybrid strategy:
- AI-generated images for hero and consistent visual style.
- Licensed real images or reputable references for factual validation.
- Manual review before publication.
- Clear labeling for generated visuals.

## 4. Image Types Needed Per Breed

### MVP Minimum
- 1 hero image.
- 1 portrait or full-body image.

### Ideal Per Breed
- Hero image.
- Full-body side/front image.
- Face portrait.
- Coat/detail image.
- Lifestyle/home image.

For 30 breeds:
- Minimum: 60 images.
- Ideal: 150 images.

## 5. Image Metadata Fields

Each image should track:
- **image_id**
- **breed_id**
- **image_type**: hero, portrait, full_body, coat_detail, lifestyle.
- **source_type**: ai_generated, licensed_stock, creative_commons, original_photo, placeholder.
- **generation_tool**
- **model_name**
- **workflow_version**
- **prompt**
- **negative_prompt**
- **seed**
- **width**
- **height**
- **review_status**: pending, approved, rejected, needs_regeneration.
- **reviewer_notes**
- **license_notes**
- **alt_text_en**
- **alt_text_ko**

## 6. Local Generation Stack

### Recommended Tool
ComfyUI

Reason:
- Node-based reproducible workflows.
- Good for batching.
- Supports upscalers and control modules.
- Easier to store workflows.
- Better long-term control than simple UI tools.

### Model Options
- FLUX.1 family for strong realism.
- SDXL realistic checkpoints for fallback and experimentation.
- Animal-focused LoRA if high-quality and license-compatible.

### Add-ons
- Upscaler.
- IP-Adapter/reference guidance if references are licensed.
- ControlNet if pose/composition control is needed.
- Metadata saver.

## 7. Hardware Consideration

The user's RTX 5080 / Ryzen 9800X3D target machine should be strong for local image generation, assuming:
- compatible NVIDIA drivers,
- compatible CUDA/PyTorch versions,
- enough VRAM for selected model,
- sufficient SSD storage for models and outputs.

Expected storage planning:
- ComfyUI and Python environment: several GB.
- Models/checkpoints: 10-100+ GB depending on quantity.
- Generated outputs: can grow quickly; plan folder cleanup.

## 8. Workflow Stages

### Stage 1: Breed Visual Checklist
Before generating images, create a visual checklist for each breed.

Checklist should include:
- body size,
- body shape,
- head shape,
- ear shape,
- eye color,
- coat length,
- coat texture,
- common colors,
- common patterns,
- must-not-have traits.

### Stage 2: Prompt Template
Use standardized prompts so images remain visually consistent.

Base prompt structure:
- subject breed,
- age/adult cat,
- physical traits,
- pose,
- setting,
- lighting,
- camera/lens style,
- realism instruction,
- exclusions.

Example prompt pattern:
`photorealistic adult [BREED] cat, [KEY TRAITS], natural indoor window light, full body visible, realistic anatomy, detailed fur texture, calm expression, high-resolution editorial pet photography`

### Stage 3: Batch Generation
Generate 20-40 candidates per breed for the first round.

Recommended sorting:
- reject obvious failures,
- shortlist visually strong images,
- validate breed traits,
- select final candidates.

### Stage 4: Review
Each image must be checked against the breed visual checklist.

Review statuses:
- approved,
- rejected,
- needs regeneration,
- use only as decorative.

### Stage 5: Optimization
Final images should be:
- cropped consistently,
- compressed for web,
- given alt text,
- stored with metadata.

## 9. Breed Difficulty Ranking

### Easy
- Sphynx
- Siamese
- Bengal
- Russian Blue
- Persian
- Maine Coon

### Medium
- Ragdoll
- British Shorthair
- Scottish Fold
- Abyssinian
- Norwegian Forest Cat
- Siberian
- Exotic Shorthair
- Oriental Shorthair
- Turkish Angora
- Chartreux
- Japanese Bobtail

### Hard
- American Shorthair
- Birman
- Devon Rex
- Cornish Rex
- Turkish Van
- Burmese
- Tonkinese
- Himalayan
- Munchkin
- Savannah
- Ragamuffin
- Manx
- Domestic Shorthair

## 10. Special Breed Warnings

### Scottish Fold
- Folded ears are a key trait but tied to cartilage-related welfare issues.
- Do not present the trait as only cute.
- Content should mention welfare debate.

### Munchkin
- Short legs may be exaggerated by AI.
- Content should mention mobility and welfare discussions.

### Savannah
- AI may generate wildcat-like unrealistic images.
- Mention legal/ownership complexity by region if relevant.

### Domestic Shorthair
- Not a standardized breed.
- Use as a general guide for mixed/non-pedigree cats.

## 11. Labeling Policy

Recommended visible label:
- English: `AI-generated reference image, reviewed for breed traits.`
- Korean: `AI 생성 참고 이미지이며, 품종 특징 기준으로 검수되었습니다.`

Use this near the gallery or image caption.

## 12. Negative Prompt Ideas

Avoid:
- cartoon,
- illustration,
- fantasy,
- deformed anatomy,
- extra limbs,
- distorted face,
- unrealistic eyes,
- dog-like features,
- hybrid animal,
- over-smoothed fur,
- plastic texture,
- wrong ear shape,
- wrong coat pattern.

## 13. Quality Gate

An image can be published only if:
- breed traits are recognizable,
- anatomy is natural,
- no misleading physical exaggeration,
- no obvious AI artifacts,
- image metadata exists,
- alt text exists,
- AI/real source status is clear.

## 14. Recommended First Test Batch

Start with 5 breeds:
- Maine Coon
- Siamese
- Bengal
- Russian Blue
- Ragdoll

Reason:
- Mix of easy and medium difficulty.
- Covers long coat, colorpoint, spotted coat, solid coat, and comparison challenge.
