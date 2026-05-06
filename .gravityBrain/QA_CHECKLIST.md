# QA Checklist

## 1. Purpose

This checklist should be used before launch and before publishing each new breed page, guide, or image batch.

## 2. Content QA

### Breed Page Required Sections
- [ ] Hero section exists.
- [ ] Quick facts exist.
- [ ] Short summary exists.
- [ ] Best for section exists.
- [ ] Think twice if section exists.
- [ ] Appearance section exists.
- [ ] Personality section exists.
- [ ] Care section exists.
- [ ] Grooming section exists or included in care.
- [ ] Health notes exist.
- [ ] Home suitability exists.
- [ ] Similar breeds exist.
- [ ] FAQ exists.
- [ ] Disclaimer exists.

### Content Quality
- [ ] No absolute temperament guarantees.
- [ ] No unsupported medical claims.
- [ ] Health wording is cautious.
- [ ] Beginner suitability is explained, not just scored.
- [ ] Grooming burden is practical.
- [ ] Shedding/allergy claims are careful.
- [ ] Controversial traits include welfare notes.
- [ ] Korean content is natural, not literal translation.
- [ ] English content is clear and non-fluffy.

### FAQ QA
- [ ] At least 5 FAQs per breed.
- [ ] FAQs match search intent.
- [ ] Answers are visible on page.
- [ ] FAQ schema, if used, matches visible FAQ exactly.

## 3. Data QA

### Required Fields
- [ ] Breed ID exists.
- [ ] English name exists.
- [ ] Korean name exists.
- [ ] Origin exists.
- [ ] Size exists.
- [ ] Coat type exists.
- [ ] Weight range exists.
- [ ] Lifespan range exists.
- [ ] Scores exist.
- [ ] Similar breed IDs exist.
- [ ] SEO metadata exists.
- [ ] Image metadata exists.

### Score Validation
- [ ] All scores are integers.
- [ ] All scores are between 1 and 5.
- [ ] Scores align with written content.
- [ ] Quiz logic uses the same scores.
- [ ] Comparison page uses the same data source.

## 4. Image QA

### Image Source
- [ ] Source type is recorded.
- [ ] AI-generated images are labeled.
- [ ] Licensed images have license notes.
- [ ] Creative Commons images have attribution if required.
- [ ] Placeholder images are not used on final published pages.

### Visual Accuracy
- [ ] Breed body shape looks plausible.
- [ ] Ear shape is correct.
- [ ] Eye color is plausible.
- [ ] Coat length is correct.
- [ ] Coat texture is plausible.
- [ ] Coat pattern is plausible.
- [ ] No extra limbs or distorted anatomy.
- [ ] No fantasy/cartoon style.
- [ ] Image does not exaggerate controversial traits.

### Image SEO and Performance
- [ ] Descriptive filename.
- [ ] Alt text in English page.
- [ ] Alt text in Korean page.
- [ ] Width and height set.
- [ ] Image compressed.
- [ ] Correct responsive size.

## 5. SEO QA

### Metadata
- [ ] Unique title.
- [ ] Unique meta description.
- [ ] Canonical URL.
- [ ] Open Graph title.
- [ ] Open Graph description.
- [ ] Open Graph image.

### Bilingual SEO
- [ ] English page has Korean hreflang.
- [ ] Korean page has English hreflang.
- [ ] Canonical points to current language page.
- [ ] Language switcher works.
- [ ] No broken equivalent language link.

### Technical SEO
- [ ] Sitemap includes page.
- [ ] Page is not accidentally noindexed.
- [ ] Heading hierarchy is valid.
- [ ] Internal links work.
- [ ] Breadcrumb works if implemented.
- [ ] Structured data validates if used.

## 6. UX QA

### Mobile
- [ ] Hero section works on mobile.
- [ ] Breed cards are readable.
- [ ] Tables do not overflow badly.
- [ ] Filters are usable.
- [ ] Language switcher is accessible.
- [ ] Images load correctly.

### Desktop
- [ ] Layout has readable line length.
- [ ] Comparison table is clear.
- [ ] Related breed links are visible.
- [ ] Navigation is intuitive.

### Accessibility
- [ ] Images have alt text.
- [ ] Buttons have accessible names.
- [ ] Keyboard navigation works.
- [ ] Color contrast is readable.
- [ ] Form controls have labels.

## 7. Comparison QA

- [ ] User can select 2 breeds.
- [ ] User can select 3 breeds.
- [ ] User can select 4 breeds.
- [ ] Duplicate breed selection is prevented.
- [ ] Empty comparison state is helpful.
- [ ] Compared values are consistent with breed pages.
- [ ] Korean labels are translated naturally.

## 8. Quiz QA

- [ ] All questions are understandable.
- [ ] Quiz works in English.
- [ ] Quiz works in Korean.
- [ ] Results include 3-5 breeds.
- [ ] Results explain why breeds were recommended.
- [ ] Results link to breed pages.
- [ ] Edge cases return useful results.

## 9. Monetization QA

- [ ] Affiliate disclosure exists before affiliate links go live.
- [ ] Product recommendations are relevant.
- [ ] No product claims medical benefits.
- [ ] Sponsored content is labeled.
- [ ] Ads do not block core content.

## 10. Launch QA

- [ ] All 30 breeds complete.
- [ ] All English pages complete.
- [ ] All Korean pages complete.
- [ ] All images reviewed or intentionally marked pending.
- [ ] Sitemap generated.
- [ ] Robots.txt configured.
- [ ] Analytics configured if desired.
- [ ] Search Console ready after deployment.
- [ ] No broken links.
- [ ] No placeholder text.
- [ ] No missing metadata.

## 11. Final Go/No-Go

Launch only if:
- [ ] Core breed pages are complete.
- [ ] SEO metadata is complete.
- [ ] Image source policy is clear.
- [ ] Health disclaimers exist.
- [ ] Bilingual links work.
- [ ] No severe factual or visual accuracy issues remain.
