# 09 — Implementation Blueprint for Prompt 3

## U. How Prompt 3 implements the homepage and global experience

Prompt 3 builds the **global shell plus the homepage** — nothing else. It is the
proving run for the design system: if the header, footer, search, motion and one
complex page work inside the budget, the remaining 327 pages are assembly.

### Blocking dependency

**Decision D1 from architecture doc 08 must be answered before Prompt 3 starts:**
Next.js + headless CMS (Sanity/Payload), or headless WordPress + Next.js. Everything
below is stack-agnostic except the content layer.

The other open decisions (D2–D6) do not block Prompt 3. D4 (case study consent) blocks
Prompt 4.

---

### Build order

Strictly sequential. Each step gates the next.

#### Step 1 — Token layer and reset

Port [`tokens.css`](tokens.css) unchanged. Add reset, typography classes and the
named-line grid.

**Gate:** a test page renders every type token, every colour pair and every spacing
step. **Run the contrast script from this design pass against the built tokens and
commit it as a test** — the same script that produced the verified ratios in doc 02.
It becomes CI gate #11.

#### Step 2 — Fonts

Self-host Funnel Sans and Poppins via `next/font`, subset. Those two are the whole list — the brand guidelines name exactly two families. **Measure the
real metric-override values** for the fallback faces (doc 02 carries starting
estimates, not final numbers) and commit them.

**Gate:** ≤ 3 files, ≤ 95 KB total, **CLS = 0** measured across a font-swap cycle on a
throttled connection.

#### Step 3 — Layout primitives

`Container`, `Grid`, `GridItem`, `Stack`, `Section`, `Bleed`. The `Section` component
implements `background` → inverse-context class remapping, so no child ever branches
on dark mode.

**Gate:** the asymmetric splits (5/7, 4/8, 7/5, 3/9, 8-offset-2) render correctly at
all seven breakpoints with no horizontal overflow at 320px.

#### Step 4 — Text and interaction primitives

`Text`, `Button`, `Link`, `Rule`, `Tag`, `Media`.

**Gate:** all seven button states across all seven variants; keyboard operable;
`:focus-visible` correct in both normal and inverse contexts; 44px minimum targets
verified.

#### Step 5 — Motion primitives

`Reveal`, `StaggerGroup`, `StaggerItem`, `useReducedMotion`.

**Gate:** total motion JS ≤ 3 KB. Content visible with JavaScript disabled.
Reduced-motion path verified. Performance profile at 4× CPU throttle shows no dropped
frames and no layout/paint in the animation.

#### Step 6 — Header, mega menu, mobile navigation

The largest single component. Build in order: static header → desktop mega menu →
mobile drill-down → scroll condense.

Content comes from a **navigation config file** derived from
[`sitemap.csv`](../architecture/sitemap.csv), not hardcoded JSX. This is what lets
Prompt 4 add 200 pages without touching the header.

**Gate:** full keyboard operation of all six panels; `aria-expanded`/`aria-controls`
correct; focus trap and restore in the mobile panel; hover-intent delay 120ms; mega
menu opens in ≤ 240ms with no layout shift; **Industries featured slot shows the
work-listing link, not a placeholder case study.**

#### Step 7 — Footer

Five columns, accordion below `md`, with the **verified NAP block** —
2nd Floor, Shri Nivas Towers, Above Baramati Bank, Pune 411043 · +91 91 9815 9815 ·
sales@bizzfly.com — marked up with `Organization` + `PostalAddress` schema.

**Gate:** every internal link points at a final destination, never a redirect
(architecture doc 04). Only the single canonical phone number and email appear —
`+91 7098989191` and `rahul@bizzfly.com` must not exist anywhere in the build
(architecture doc 07, finding F3).

#### Step 8 — Search

`SearchTrigger` in the shell; `SearchDialog` lazy-loaded on first invocation. Pagefind
index generated at build. Synonym map and boost weights from architecture doc 06.

**Gate:** zero bytes in the initial bundle; `⌘K` and `/` both open; full keyboard
operation; `price`/`cost` returns `/engagement-models/pricing/` first; the empty state
shows popular searches, browse-by links and a consultation CTA — never a bare "no
results".

#### Step 9 — Global page furniture

`SkipLink`, `Breadcrumbs` (+ `BreadcrumbList` schema), `SectionNav`, `ConversionBand`,
`RelatedRail`, `NextSteps`, and all four state components.

**Gate:** `EmptyState`, `LoadingSkeleton`, `ErrorState` and `ContentRequired` are
documented in Storybook. `ContentRequired` renders visibly in preview and **throws at
build time in production** — the mechanical enforcement of principle P8.

#### Step 10 — Homepage

Only now. Sequence from doc 08:

```
H-C  Full-Width Declaration          ← LCP is text. No animation on load.
S-01 Six practices, numbered rows    ← NOT cards
S-14 Three-axis ecosystem map        ← static SVG, mobile = vertical list
S-16 Dark band: the AI-search view   ← is-inverse
S-13 How AI search works (diagram)   ← legible without interaction
S-09 Statement + evidence
S-15 Proof   ─or─  S-19 process links ← conditional on verified Proof entities
S-18 Insights rail
S-17 Conversion band
```

Nine sections. No two consecutive patterns alike. **Zero card grids.** Three
background changes.

**Homepage gates:**
- LCP < 2.0s mobile 4G; the LCP element is the H-C statement text
- CLS = 0
- JS ≤ 40 KB compressed (header + motion + prefetch; search excluded, it lazy-loads)
- HTML < 60 KB
- Lighthouse ≥ 95 mobile
- axe-core: 0 critical, 0 serious
- Complete keyboard journey with visible focus throughout
- Renders fully with JavaScript disabled
- **No unverified claim appears.** The "4.9/5 from 1,500+ reviews" and "10+ years"
  claims do not ship until architecture doc 07 verification questions 6–8 are answered

#### Step 11 — Verification templates

Build **three** page types as system proofs, not for content: one Service (H-B), one
Glossary term (no hero, definition first), one Conversion page (H-I).

**Why these three:** they are the most different from each other and from the
homepage. If all four pass the silhouette test (principle P3), the system genuinely
produces distinct page types rather than one template.

---

### What Prompt 3 must NOT do

| Not in scope | Belongs to |
|---|---|
| Any of the 99 service pages beyond one proof template | Prompt 4 |
| Industry, use case, case study, technology pages | Prompt 4 |
| CMS schema and entity modelling | Prompt 4 |
| The 67 redirects | Prompt 5 |
| XML sitemaps, `llms.txt`, per-type schema beyond the global set | Prompt 5 |
| Real content writing | Prompt 4 |
| Any fabricated case study, metric, logo or testimonial | **Never** |

---

### Definition of done for Prompt 3

- [ ] `tokens.css` ported; contrast test suite committed and green
- [ ] Fonts self-hosted within budget; CLS = 0 through swap
- [ ] Layout, text, interaction and motion primitives built and documented
- [ ] Header, six mega menus, mobile navigation — fully keyboard accessible
- [ ] Footer with verified NAP; no legacy contact details anywhere in the build
- [ ] Search working, lazy-loaded, keyboard-complete, designed empty state
- [ ] Global furniture and all five component states documented in Storybook
- [ ] Homepage built to the nine-section sequence, all gates passed
- [ ] Three verification templates passing the silhouette test
- [ ] Full responsive QA across the 13-width matrix
- [ ] CI gates 1–11 configured and green

---

## Responsive QA checklist

Required by brief §44. Run at **320 · 360 · 375 · 390 · 414 · 480 · 768 · 834 · 1024 ·
1280 · 1440 · 1600 · 1920 px**, plus 390×844 landscape, 200% zoom, and 320px @ 400%
zoom.

| Area | Checks |
|---|---|
| **Overflow** | No horizontal page scroll at any width. Wide tables/diagrams scroll in their own container with a visible affordance |
| **Navigation** | Correct model per breakpoint; mega menu does not exceed viewport height; mobile panel traps focus and restores it; CTA reachable above the safe-area inset |
| **Search** | Full-screen sheet below `md`, dialog above; keyboard complete at every width; results never clipped |
| **Hero** | Correct pattern and crop per breakpoint; answer visible above 1,000px on 1366×768; no text clipped at 320px |
| **Typography** | Nothing below 15px; measure 62–72ch in prose; no orphaned single words in headings at any width; tracking correct at display sizes |
| **Images** | Correct aspect ratio per breakpoint; no distortion; no letterboxed desktop crops on mobile; space reserved (CLS) |
| **Forms** | 44px targets; labels visible; errors announced; keyboard complete; no zoom-on-focus on iOS (16px minimum input font) |
| **Buttons** | 44px minimum; no text wrapping inside a button; no two primaries in one viewport |
| **Tables** | Scroll container; sticky header where useful; tabular numerals; caption present |
| **Accordions** | Keyboard operable; correct `aria-expanded`; no CLS on toggle |
| **Sticky elements** | Do not obscure focused elements (WCAG 2.4.11); ≤56px on short landscape viewports; released at section end |
| **Animation** | ≤6 revealing elements per viewport; nothing above the fold animates on load; reduced-motion path complete |
| **Footer** | Accordion below `md`; NAP correct and singular; no redirect links |
| **Spacing** | Mobile uses the mobile scale, not scaled desktop; no cramped mobile sections; no vast empty desktop gaps |
| **Empty states** | Every data-driven component shows its designed empty state, not a default |

---

## Handover to Prompt 4

Prompt 4 receives: the token layer, ~60 documented components, 14 page templates, the
global shell, and a homepage proving the system works within budget.

Its job is then assembly and content — building P1's 134 pages from
[`sitemap.csv`](../architecture/sitemap.csv) using the templates, with the CMS entity
model from architecture doc 05.

**The gate it inherits from this design pass:** every page it builds must pass the
silhouette test and the 24 anti-template rules. A service page and an industry page
that look the same is a Prompt 4 defect, and the section pattern library (doc 04) is
the tool that prevents it.
