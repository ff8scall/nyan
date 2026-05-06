# Concept Logic

## Core Concept
A bilingual English/Korean cat breed guide that combines structured breed education, lifestyle-based comparison, and realistic visual presentation.

## Product Thesis
Users do not only want to know what a cat breed looks like. They want to know whether they can live well with that breed. The site should therefore translate breed information into practical lifestyle decisions.

## Information Architecture

### Top-Level Pages
- **Home**: Positioning, search, popular breeds, quick filters.
- **Breed Index**: All breeds with filters and language-specific SEO copy.
- **Breed Detail**: Deep page for each breed.
- **Compare Breeds**: Side-by-side breed comparison.
- **Find Your Cat Match**: Quiz-lite recommendation flow.
- **Methodology**: Explain scoring, sources, image policy, and disclaimers.
- **About**: Site purpose and editorial standards.

### URL Strategy
- **English**: `/en/breeds/maine-coon`
- **Korean**: `/ko/breeds/maine-coon` or `/ko/cat-breeds/maine-coon`
- **Comparison**: `/en/compare?breeds=maine-coon,ragdoll`
- **Quiz**: `/en/find-your-cat`

## Breed Page Schema

### Required Fields
- **id**: stable slug.
- **name_en**: English breed name.
- **name_ko**: Korean breed name.
- **summary_en / summary_ko**: localized intro.
- **origin**: country/region.
- **size**: small/medium/large.
- **weight_range**: adult estimate.
- **lifespan**: approximate.
- **coat_type**: short/long/hairless/curly/etc.
- **grooming_level**: 1-5.
- **activity_level**: 1-5.
- **affection_level**: 1-5.
- **vocal_level**: 1-5.
- **shedding_level**: 1-5.
- **beginner_friendly**: 1-5.
- **apartment_fit**: 1-5.
- **family_fit**: 1-5.
- **health_notes**: cautious, sourced notes.
- **care_notes**: grooming, enrichment, diet cautions.
- **image_prompt**: controlled prompt for generation.
- **image_status**: generated, licensed, pending, rejected.

## Image Generation Feasibility

### Is realistic AI image generation possible?
Yes, realistic cat breed images are technically possible. The challenge is not basic realism; it is breed accuracy and consistency. Some breeds are easier because their traits are visually obvious. Others require careful prompting and reference control.

### Easy-to-generate breeds
- **Sphynx**: hairless, wrinkled skin.
- **Maine Coon**: large body, lynx tips, long coat.
- **Persian**: flat face, long coat.
- **Siamese**: colorpoint pattern, blue eyes.
- **Russian Blue**: blue-gray coat, green eyes.
- **Bengal**: spotted/rosetted coat.

### Harder/riskier breeds
- **British Shorthair vs American Shorthair**: may look generic.
- **Birman vs Ragdoll vs Himalayan**: colorpoint confusion.
- **Devon Rex vs Cornish Rex**: curly coat/body differences can be mixed.
- **Scottish Fold**: folded ears are possible, but ethical controversy should be addressed.
- **Munchkin**: short legs may be exaggerated or distorted.

### 🛡️ Subject Integrity Protocol (Havana Clause)
To prevent hallucinations where the AI generates non-feline subjects (e.g., humans, flowers, dogs) for specific breeds, the following technical constraints are applied:
1. **Keyword Reinforcement**: Every prompt MUST include the explicit identifier `feline cat` alongside the breed name.
2. **Robust Negatives**: All generation workflows must use a high-weight negative prompt: `(human, person, woman, man:1.5), (flower, plant:1.5), (dog, canine, bird:1.5), furniture, background objects`.
3. **Missing-First Generation**: In the event of data loss, the system prioritizes filling gaps (null files) before re-generating existing good data, using an overwrite-only policy for targeted fixes.
4. **Subject Check**: Manual or automated vision checks must verify that the subject is a cat before publishing.

### Recommended Image Pipeline
1. **Create canonical breed visual notes** before prompting.
2. **Generate 20-40 candidates per breed** using local GPU or high-quality image API.
3. **Reject inaccurate anatomy or breed traits**.
4. **Select 3-5 images per breed**: hero, portrait, full-body, lifestyle, coat detail.
5. **Store prompt, seed, model, and review status** for reproducibility.
6. **Label AI-generated images clearly** if used as educational visuals.

### Local PC Generation Option
The user's PC target of RTX 5080 and Ryzen 9800X3D should be very capable for local generation if compatible drivers and model tooling are available.

Recommended local stack:
- **ComfyUI**: best for controllable workflows, batch generation, upscaling, LoRA, ControlNet/IP-Adapter.
- **FLUX.1-dev or FLUX.1-schnell**: strong realism, depending on license/use case.
- **SDXL realistic checkpoints**: useful fallback for animal photorealism.
- **Upscaler**: 4x-UltraSharp or modern diffusion upscaler.
- **Control tools**: IP-Adapter/reference image guidance if real reference images are licensed or self-owned.

### Commercial/API Option
- **Pros**: faster setup, high quality, no local driver pain.
- **Cons**: cost, terms, less reproducibility, possible content restrictions, less workflow control.

### Ethical Visual Policy
- Do not present AI images as real documentary photographs.
- Add image metadata or small label: `AI-generated reference image, reviewed for breed traits`.
- If using real breed standard claims, cite reputable organizations rather than relying on generated visuals.

## Editorial Method
Each breed profile should answer:
- **What does this cat look like?**
- **What is it like to live with?**
- **Who is it good for?**
- **Who should think twice?**
- **What care burden should owners expect?**
- **What health issues should be discussed with a veterinarian?**

## SEO Logic
- Use one canonical page per breed per language.
- Add `hreflang` pairs between English and Korean pages.
- Use FAQ blocks based on real search questions.
- Use internal links between similar breeds.
- Avoid duplicated translation boilerplate.
- Add comparison pages for long-tail queries like `Maine Coon vs Ragdoll` and `Persian vs Exotic Shorthair`.
