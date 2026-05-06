# Ideation Log

## 2026-05-04 Grand Strategy Session

### User Intent
The user wants to build an English/Korean website that introduces about 30 popular cat breeds in detail. The user strongly prefers realistic images and is willing to consider local image generation on a powerful PC if external image sourcing is insufficient.

### Stage 1: Research
The core market opportunity is evergreen SEO around cat breed selection. Search users often compare breeds before adoption or purchase. Korean-language content can be improved with deeper, better-structured, more trustworthy profiles.

Decision:
- Build around SEO-first breed profiles and comparison intent.

Reason:
- Breed pages can compound traffic over time.
- Bilingual content creates two search surfaces.
- Comparison and quiz features convert casual readers into engaged users.

### Stage 2: Brainstorm
The strongest concept is not just a visual cat encyclopedia but a lifestyle decision guide. The content should be practical: grooming burden, vocalness, apartment fit, child fit, health cautions, and owner suitability.

Decision:
- Use structured breed data and generate pages from a consistent schema.

Reason:
- This supports SEO, comparison UI, quiz recommendations, future expansion, and easier localization.

### Stage 3: Monetization
The project should not begin with aggressive monetization. Trust and traffic matter first. Affiliate content can be introduced naturally through care checklists and breed-specific product recommendations.

Decision:
- Phase monetization after core content is useful.

Reason:
- Pet information sites need credibility. Premature affiliate-heavy design can reduce trust and SEO quality.

### Stage 4: User Journey
Users will likely enter through search into a specific breed page. From there, they should be guided to compare similar breeds and understand suitability.

Decision:
- Every breed page should include `similar breeds`, `best for`, `think twice if`, and `compare with` sections.

Reason:
- These features align with real decision-making and increase internal navigation.

### Stage 5: Pre-Verification
The largest uncertainty is image generation. Realistic images are feasible, but factual breed accuracy is the bottleneck. AI can hallucinate anatomy, coat patterns, eye colors, or breed traits.

Decision:
- Use a review-based image workflow, not blind image generation.

Reason:
- A beautiful but inaccurate breed image damages trust.

### Stage 6: MVP Scope
The MVP should include 30 breed profiles, bilingual routing, a breed index, comparison basics, and image policy. The quiz can start simple and become more advanced later.

Decision:
- Build a content-first MVP, then improve interactivity.

Reason:
- Content depth and SEO architecture are the foundation.

## Key Strategic Choices
- **Bilingual from the beginning**: avoids retrofitting i18n later.
- **Structured data first**: enables pages, filters, comparison, and quiz.
- **Hybrid image strategy**: AI-generated visuals are possible but must be reviewed and labeled.
- **SEO-first architecture**: breed pages should be indexable, fast, and internally linked.
- **Trust-first monetization**: affiliate revenue should support, not dominate, the experience.

## Open Questions
- Should the site brand be playful, expert, premium, or warm/family-oriented?
- Will AI images be labeled visibly on the page or only in image metadata/methodology?
- Should Korean pages use English breed slugs or Korean transliterated slugs?
- Should controversial breeds like Scottish Fold and Munchkin be included with explicit welfare notes?
- Should the first version use Next.js or Astro?
