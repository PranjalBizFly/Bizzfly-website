# Imagery audit — problematic assets and where they are used

Generated 2026-09-11. Page mapping is derived from
`content/images/imageAssignments.ts`, so it is exact. The classifications are a
visual review of contact sheets rendered from the live library, not an automated
result — two automated detectors were attempted (horizontal autocorrelation and a
flat-tile floor) and neither separates a faint watermark from ordinary photographic
detail, so anything marked SUSPECTED needs a human look at full size.

**Root cause.** `scripts/download-and-integrate-images.mjs` queries Unsplash's
private `unsplash.com/napi/search/photos` endpoint with no API key and no licence
step, then saves `urls.raw`. That endpoint returns Unsplash+ (paid) results
alongside free ones, and their raw URLs serve **watermarked previews**. Any image
in the library may therefore be an unlicensed preview.

**Constraint on fixing it.** `npm run verify:images` enforces zero duplicate
assignments and all 320 registry entries are spoken for, so a bad image cannot be
fixed by reusing a good one — each replacement needs a newly licensed asset, or the
section needs a drawn/structural visual instead of a photograph.


## Watermarked — CONFIRMED (visible Unsplash+ lattice over the whole frame)

- **company-discovery-process.webp** — **worst case on the site**
  - Full-bleed background band, so the lattice is visible at full width rather
    than inside a contained frame. The watermark reads plainly at normal
    viewing distance.
  - Used on: the HOMEPAGE (the Growth Engine band, via
    `getNarrativeImages().engine`) and /discovery-process/. It is reached
    through `requireImage("company-discovery-process")` rather than through a
    slug map, which is why an assignment-map audit alone would miss it.
- **industry-professional-services.webp**
  - Used on: /industries/professional-services/
- **case-studies-verified-standard.webp**
  - Forensic crime scene — criminal record sheet, mugshot, evidence bags, crime-scene stills. On a B2B case-studies hub.
  - Used on: (not in the slug assignment maps — homepage / hub / practice art)

## Watermarked — SUSPECTED (faint lattice visible on the contact sheet; confirm at full size)

- **service-sales-automation.webp**
  - Used on: /services/sales-automation/
- **service-website-performance.webp**
  - Used on: /services/website-performance/
- **service-systems-integration.webp**
  - Used on: /services/systems-integration/
- **industry-saas.webp**
  - Used on: /industries/saas/
- **resource-glossary-knowledge.webp**
  - Used on: /resources/what-is-generative-engine-optimisation/
- **resource-comparison-framework.webp**
  - Stock 'EVALUATION' graphic with five-star ratings.
  - Used on: /resources/seo-vs-aeo/
- **resource-decision-tree.webp**
  - Stock 'ANALYSIS' infographic with invented bar charts and percentages.
  - Used on: /resources/custom-software-vs-off-the-shelf/
- **company-seo-methodology.webp**
  - Used on: /company/seo-methodology/
- **company-software-development-process.webp**
  - Used on: /company/software-development-process/
- **company-website-development-process.webp**
  - Used on: /company/website-development-process/
- **company-engagement-models.webp**
  - Used on: /company/engagement-models/

## Generic 3D / clipart — reads as template stock, not as BizzFly

- **ai-search-workflow.webp**
  - Glowing 'AI' cube render.
  - Used on: (not in the slug assignment maps — homepage / hub / practice art)
- **technology-engineering-team.webp**
  - Used on: (not in the slug assignment maps — homepage / hub / practice art)
- **service-performance-marketing.webp**
  - Used on: /services/performance-marketing/
- **service-analytics-implementation.webp**
  - Used on: /services/analytics-implementation/
- **service-website-performance.webp**
  - Used on: /services/website-performance/
- **tech-cloud-and-hosting.webp**
  - Used on: /technologies/cloud-and-hosting/
- **tech-data-platforms.webp**
  - Used on: /technologies/data-platforms/
- **tech-security-and-access.webp**
  - Used on: /technologies/security-and-access/
- **tech-testing-and-quality.webp**
  - Cartoon robot arms operating a laptop.
  - Used on: /technologies/testing-and-quality/
- **company-seo-methodology.webp**
  - Used on: /company/seo-methodology/
- **company-ai-search-methodology.webp**
  - Used on: /company/ai-search-methodology/
- **resource-comparison-framework.webp**
  - Stock 'EVALUATION' graphic with five-star ratings.
  - Used on: /resources/seo-vs-aeo/
- **resource-decision-tree.webp**
  - Stock 'ANALYSIS' infographic with invented bar charts and percentages.
  - Used on: /resources/custom-software-vs-off-the-shelf/

## Does not match its page topic

- **tech-accessibility-standards.webp**
  - A person at a desk beside a trophy. Nothing to do with accessibility standards — and near-identical to service-web-applications.webp (same desk, plant and cup), so two pages carry what reads as the same photograph.
  - Used on: /technologies/accessibility-standards/
- **service-web-applications.webp**
  - See tech-accessibility-standards.webp — same setting.
  - Used on: /services/web-applications/
- **company-about-team.webp**
  - Close-up of a laptop keyboard, used for a page about the team.
  - Used on: /company/about/
- **case-studies-verified-standard.webp**
  - Forensic crime scene — criminal record sheet, mugshot, evidence bags, crime-scene stills. On a B2B case-studies hub.
  - Used on: (not in the slug assignment maps — homepage / hub / practice art)

## Not a defect, but worth tidying

`image-audit-base.json` and `all-300-images.json` are stale report files: they
still carry ten `service-conversion-rate-optimization` paths (American spelling)
where the live registry and the asset on disk both use `-optimisation`. Nothing on
the site is broken by this — the live page resolves — but anything generated from
those files will show a missing image that does not exist in production.
