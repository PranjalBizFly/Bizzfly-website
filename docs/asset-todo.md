# Asset TODO — imagery that needs replacing or commissioning

Companion to `docs/imagery-audit.md`, which carries the classifications and the
root cause. This file is the action list: what is withdrawn, what is still live
and shouldn't be, and what has to be bought or shot.

**Root cause (unchanged).** `scripts/download-and-integrate-images.mjs` queried
Unsplash's private `napi` endpoint with no API key and no licence step, saving
`urls.raw`. That endpoint returns Unsplash+ (paid) results alongside free ones
and their raw URLs serve watermarked previews. **Any asset in the library may be
an unlicensed paid preview.** This is a licensing exposure, not a taste problem —
treat it as legal cleanup with a visual benefit, not the reverse.

**Why a bad image cannot simply be swapped.** `npm run verify:images` enforces
zero duplicate assignments, and the one-image-per-entity rule is deliberate. So
no bad asset can be fixed by pointing it at a good one already in use. Each needs
a newly licensed asset, a drawn/structural visual, or withdrawal.

---

## A. Withdrawn in this pass — slot now empty, page intact

These no longer render. No text was removed; every page keeps its full copy and
falls through to its existing no-image composition.

| Page | Withdrawn asset | Problem | Recommended direction | Existing asset can replace? | Commission needed? |
|---|---|---|---|---|---|
| `/case-studies/` | `case-studies-verified-standard.webp` | **CONFIRMED watermark** + forensic crime-scene imagery (record sheet, mugshot, evidence bags) on a B2B hub | Studio or desk shot of a signed approval document; or leave as the statement it now is | No | **Yes** |
| `/industries/professional-services/` | `industry-professional-services.webp` | **CONFIRMED watermark** (full-frame Unsplash+ lattice) | Sector-authentic workplace photograph | No | **Yes** |
| `/resources/seo-vs-aeo/` | `resource-comparison-framework.webp` | Stock "EVALUATION" graphic with **invented five-star ratings**; also suspected watermark | Drawn comparison figure via `Diagram` (crawlable SVG, no licence risk) | No — but `Diagram` removes the need | No, if drawn |
| `/resources/custom-software-vs-off-the-shelf/` | `resource-decision-tree.webp` | Stock "ANALYSIS" infographic with **invented bar charts and percentages**; also suspected watermark | Drawn decision figure via `Diagram` | No — but `Diagram` removes the need | No, if drawn |
| `/technologies/accessibility-standards/` | `tech-accessibility-standards.webp` | Topic mismatch (person beside a trophy) **and** near-identical to `service-web-applications.webp` — two pages read as one photograph | Real assistive-technology use: screen reader, switch access, magnification | No | **Yes** |

---

## B. Still live and still wrong — needs a decision

Not withdrawn, because withdrawing every questionable asset at once would strip
imagery from most of the site. Ordered by severity.

### B1. Suspected watermark — confirm at full size, then withdraw or licence

Each needs a human look at 100%. If the lattice is there, it is unlicensed.

| Asset | Page | Commission needed if confirmed? |
|---|---|---|
| `service-sales-automation.webp` | `/services/sales-automation/` | Yes |
| `service-website-performance.webp` | `/services/website-performance/` | Yes — also flagged as clipart (B2) |
| `service-systems-integration.webp` | `/services/systems-integration/` | Yes |
| `industry-saas.webp` | `/industries/saas/` | Yes |
| `resource-glossary-knowledge.webp` | `/resources/what-is-generative-engine-optimisation/` | Yes |
| `company-seo-methodology.webp` | `/company/seo-methodology/` | Yes — also clipart (B2) |
| `company-software-development-process.webp` | `/company/software-development-process/` | Yes |
| `company-website-development-process.webp` | `/company/website-development-process/` | Yes |
| `company-engagement-models.webp` | `/company/engagement-models/` | Yes |

### B2. Generic 3D / clipart — reads as template stock, not as BizzFly

Not a licensing problem; a positioning one. A glowing AI cube says the opposite
of "we tell you when not to use technology".

| Asset | Page | Recommended direction |
|---|---|---|
| `tech-cloud-and-hosting.webp` | `/technologies/cloud-and-hosting/` | Real infrastructure, or a drawn topology via `Diagram` |
| `tech-data-platforms.webp` | `/technologies/data-platforms/` | Drawn pipeline figure |
| `tech-security-and-access.webp` | `/technologies/security-and-access/` | Drawn access-control figure |
| `tech-testing-and-quality.webp` | `/technologies/testing-and-quality/` | Cartoon robot arms — replace with real CI output or a drawn figure |
| `service-performance-marketing.webp` | `/services/performance-marketing/` | Photograph of actual analysis work |
| `service-analytics-implementation.webp` | `/services/analytics-implementation/` | Photograph of actual analysis work |
| `company-ai-search-methodology.webp` | `/company/ai-search-methodology/` | Drawn retrieval figure — `Diagram` already draws one for AI answering |
| `ai-search-workflow.webp` | hub / practice art | Glowing "AI" cube render — drawn figure instead |
| `technology-engineering-team.webp` | hub / practice art | Real team photograph (see section C) |

### B3. Topic mismatch

| Asset | Page | Problem |
|---|---|---|
| `company-about.webp` (`company-about-team.webp`) | `/company/about/` | Close-up of a laptop keyboard on a page about the team. **Its alt text also claims "BizzFly team members collaborating in bright, modern office space in Pune" — which describes a photograph this is not.** Inaccurate alt is an accessibility defect as well as a content one: fix the alt now even if the image stays. |

---

## C. Pages with no registry entry — do not invent one

`/media/`, `/press-kit/`, `/vendor/`, `/about-us/` have **no** assigned image and
correctly render none. Per policy no stock was added. Each already carries its
argument in type, structure and motion.

| Page | If commissioning, what would earn its place |
|---|---|
| `/media/` | The founder as spokesperson — a real portrait, since the page names them as the on-record voice |
| `/press-kit/` | The wordmark in physical use, or nothing: a brand page is stronger showing the asset than a photograph of an office |
| `/vendor/` | Nothing photographic is needed. A procurement page is a specification |
| `/about-us/` | One honest team photograph in the Pune office — the single highest-value commission on this list, because it also fixes B3 |

---

## Priority

1. **Confirm B1 at full size.** It is the only legal exposure, and nine pages are affected.
2. **Commission the Pune team photograph.** Fixes `/about-us/`, `/company/about/` (B3) and `technology-engineering-team.webp` in one shoot.
3. **Draw, don't buy, for B2 technology pages.** `Diagram` renders crawlable SVG with no licence risk, and a drawn mechanism explains more than a render of a glowing cube.
4. **Fix the `company-about` alt text now**, independent of whether the image is replaced.
5. Section A slots last — those pages already read correctly without imagery.

## Stale report files

`image-audit-base.json` and `all-300-images.json` still carry ten
`service-conversion-rate-optimization` paths (American spelling) where the live
registry and the asset on disk both use `-optimisation`. Nothing on the site is
broken; anything generated from those files will show a missing image.
