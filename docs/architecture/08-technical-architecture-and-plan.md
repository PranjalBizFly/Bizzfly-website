# 08 — Technical Architecture, Risks & Implementation Plan

## 22. Recommended Technical Architecture

### The constraint that decides the stack

From document 06: **most AI crawlers execute little or no JavaScript.** GPTBot,
PerplexityBot, ClaudeBot and CCBot largely read raw HTML. A site whose entire
strategic bet is AI visibility cannot ship client-rendered content. Server-rendered
HTML is not a preference here — it is the requirement the positioning depends on.

Second constraint: **328 pages assembled from entities**, not 328 hand-authored
documents. Services, industries and use cases share `IndustryProblem`, `Proof`,
`FAQItem` and `ProcessStep` blocks. That needs a structured content source, not a
page builder.

Third: **a non-technical marketing team must publish** without a developer.

### Recommendation

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router)** | Static generation per route, server components, mature ecosystem, first-class metadata and sitemap APIs |
| Rendering | **SSG with ISR** | Every page pre-rendered to HTML at build. Full content in the DOM for every crawler. ISR lets content changes go live without a full rebuild |
| Content | **Headless CMS** — Sanity or Payload | Structured content types that map directly to the entity model in document 05. Sanity if BizzFly wants managed hosting; Payload if it wants to self-host alongside the app |
| Styling | Tailwind + a token layer | Design system in Prompt 2 |
| Search | **Pagefind**, build-time index | Zero runtime cost, no external dependency, correct at this scale |
| Forms | Server actions → CRM webhook + email | Source page and CTA tier captured on every submission |
| Hosting | Vercel or Netlify | Edge redirects, preview deploys, image optimisation |
| Analytics | GA4 + server-side tagging | Reliable measurement under ad blocking |
| CI | GitHub Actions | Runs the quality gates below |

### Why not WordPress again

Not dogma — a specific mismatch. Kept honestly:

| Requirement | WordPress reality |
|---|---|
| 328 pages from shared entities | ACF + CPTs can model it, but relationship integrity is manual and fragile — the current site already has two phone numbers as a result |
| Server-rendered, lightweight HTML | Achievable, but the current theme ships 296 KB and 44 scripts. Fixing that means rebuilding the theme |
| Automated linking/orphan gates in CI | No natural place to run them |
| Schema per page type, entity-anchored | Plugin-dependent and hard to keep consistent |

**If BizzFly must stay on WordPress** — for team familiarity or licensing — the
workable path is headless WordPress as the content API with Next.js rendering the
front end. That keeps the editorial experience and satisfies the rendering
requirement. This is a legitimate option, not a fallback, and the decision belongs to
BizzFly. It is listed as open decision D1 below.

### Performance budget

Non-negotiable, given BizzFly sells Core Web Vitals optimisation. A slow BizzFly site
is a disqualifying credibility problem.

| Metric | Budget |
|---|---|
| LCP | < 2.0s (mobile, 4G) |
| INP | < 200ms |
| CLS | < 0.1 |
| HTML per page | < 60 KB (currently 296 KB) |
| JS per page | < 120 KB compressed |
| Requests, initial | < 30 (currently 44 scripts alone) |
| Lighthouse Performance | ≥ 95 mobile |

Enforced in CI. A build exceeding budget fails.

### Quality gates in CI

Every one of these fails the build:

1. **Orphan check** — every page reachable from `/` in ≤3 clicks, ≥4 inbound links
2. **Broken link check** — zero internal links resolving to 3xx or 4xx
3. **Redirect check** — all 67 entries in `redirects.csv` resolve in one hop
4. **Schema validation** — required types present per page type; `Organization`
   `@id` referenced
5. **Metadata completeness** — title, description, canonical, H1 present and unique
6. **Heading hierarchy** — exactly one H1; no skipped levels
7. **Content depth** — word count meets the per-type minimum in document 01
8. **Banned-phrase lint** — the list in document 01
9. **Accessibility** — axe-core, zero critical violations
10. **Performance budget** — Lighthouse CI

Gates 1, 7 and 8 are what prevent this build from decaying into the site being
replaced.

### Content operations

- **Preview deploys** on every CMS change, shareable for review
- **Named owner and review date** on every page (document 05)
- **Publish workflow:** draft → review → scheduled publish
- **Structured intake forms** for case studies and proof, feeding the Proof entity

---

## 23. Risks & Problems

### R1 · No verified case studies — **critical, blocks launch quality**

Fourteen case study slots are empty. Personas P2, P6 and P7 will not convert without
proof at their scale and in their sector, and the 11 pages currently filling that gap
are fabricated.

**Impact:** journeys J1, J4 and J7 break at the Trust stage. This is the highest-value
unresolved item in the entire redesign.

**Mitigation:**
1. Start client outreach for case study consent **now**, in parallel with Prompt 2 —
   this has the longest lead time of anything in the project.
2. Use the anonymisation ladder (document 05) to publish at whatever level consent
   allows.
3. Substitute *process transparency* for proof at launch: detailed method,
   `/process/`, `/technology/our-engineering-standards/`, honest timelines. This is
   weaker than proof but it is real, and it is the correct interim answer.
4. Ship the Work hub with only what exists. **An honest empty Work section is
   recoverable; a fabricated one is not.**

### R2 · Content volume vs. quality — high

328 pages at the depth standards in document 01 is roughly 400,000 words. Written
badly or generated without review, it produces exactly the thin site being replaced.

**Mitigation:** phasing (134 / 132 / 62), CI depth and banned-phrase gates, and a hard
rule that **no page ships below its type's word minimum with substantive content**. If
P2 takes three quarters instead of two, that is the correct outcome.

### R3 · Traffic loss at migration — medium-high

43 of 63 indexed URLs are removed and every remaining URL changes. Some ranking loss
is normal; uncontrolled loss is not.

**Mitigation:** the 67-entry single-hop redirect map, pre/post crawl comparison,
Search Console monitoring for 90 days, a staged cutover, and full rollback capability
for 30 days.

### R4 · Unverifiable claims currently published — medium, legal and trust exposure

"4.9/5 based on 1,500+ reviews" has no visible source. Four testimonials may lack
written consent. Under Indian consumer protection rules on misleading advertising and
endorsements, unsubstantiated review claims carry real regulatory exposure, and they
also fail BizzFly's own proof standard.

**Mitigation:** verification questions 6–8 in document 07 answered before launch.
Anything unsourced is removed, not softened.

### R5 · The AI-search bet may commoditise — medium

The differentiation in document 01 rests on AI search being underserved. Large
agencies are moving in.

**Mitigation:** the defensible asset is *published depth and original data*, not the
service names. The two `[CONTENT REQUIRED]` research reports matter disproportionately
here — original data is what gets cited, and citations compound. Ship at least one
within six months of launch.

### R6 · Six practices from a team of unknown size — medium

Six practices and 99 service pages imply broad delivery capability. If the team
cannot staff all six, the site over-promises and the first engagement disappoints.

**Mitigation:** verification question 2 in document 07. If depth is genuinely in
search, web and automation, the other practices are presented at hub level without
14 sub-pages each, and P2/P3 pages are deferred. **The architecture supports honest
downscaling; the alternative is a credibility failure at delivery.**

### R7 · Maintenance burden after launch — medium

A 328-page site needs sustained editorial ownership. The current site's decay — a
default `hello-world` post still live 14 months on, a broken "0 + years" counter,
two phone numbers — is evidence of what happens without it.

**Mitigation:** `content_owner` and `review_due` on every page, a quarterly review
queue, and the CI gates. Realistically this needs at least one part-time content
owner; if that role does not exist, **build fewer pages**.

### R8 · Location pages without local presence — medium, policy risk

Mumbai, Bengaluru and Delhi NCR pages without a genuine presence are doorway pages
under Google's spam policies and are dishonest to users.

**Mitigation:** all three are P3 and gated on verification question 13. Only Pune —
with a verified street address — gets service-level location pages.

### R9 · Design ambition vs. performance budget — low-medium

Prompt 2 will produce a motion and interaction system. Heavy animation conflicts with
the LCP and INP budget.

**Mitigation:** the performance budget is set *before* the design system, in this
document, and is enforced in CI. Design works within it.

### Open decisions

| # | Decision | Owner | Blocks |
|---|---|---|---|
| **D1** | Stack: Next.js + headless CMS, or headless WordPress + Next.js | BizzFly | Prompt 2 |
| **D2** | Remove fabricated `/project/*` and thin `/service/*` pages from the live site immediately? *(Recommended: yes)* | BizzFly | Nothing — do it now |
| **D3** | Publish pricing ranges, or engagement models only | BizzFly | `/engagement-models/pricing/` |
| **D4** | Case study consent — which clients, at what attribution level | BizzFly | R1, launch quality |
| **D5** | Locale: en-IN only, or add en-US | BizzFly | `hreflang`, spelling |
| **D6** | Which of the six practices are staffed to full depth | BizzFly | R6, P2 scope |

---

## 24. Implementation Plan — Prompts 2 to 6

### Prompt 2 — Design System, UX & Motion

**Depends on:** this architecture approved; D1 answered.

Deliver: brand expression (colour, type, space, elevation) as design tokens; the
component library implied by the 14 page types — practice hub grid, service answer
block, industry problem module, use case diagnostic block, case study metrics table,
glossary definition card, comparison table, CTA blocks in six tiers, mega-menu
panels, mobile drill-down nav, search overlay, forms; responsive rules; a motion
system built inside the INP and CLS budget; accessibility baseline (WCAG 2.2 AA,
focus states, reduced-motion, contrast).

**Constraint carried forward:** every component must render meaningfully server-side.
No component may depend on client JS to display its content.

### Prompt 3 — Homepage & Global Components

**Depends on:** Prompt 2.

Deliver: header with six mega-menu panels; mobile navigation; footer with the
verified NAP; global search; breadcrumbs; homepage routing to all three discovery
axes; the six CTA blocks; form components with source-page and tier capture; 404 and
search-empty states; `Organization`, `WebSite`, `SearchAction` and `BreadcrumbList`
schema wired to the central `@id`.

**Gate:** homepage meets the performance budget before any other page is built.

### Prompt 4 — Page Implementation & Content System

**Depends on:** Prompt 3; content from D3, D4, D6.

Deliver: CMS schema for every entity in document 05; the 14 page-type templates;
`sitemap.csv` imported as the build manifest; **P1's 134 pages built and written**;
per-type schema; internal linking modules driven by the entity relationships; the
banned-phrase lint and depth validators.

**Rules:** no page ships below its depth minimum. No case study ships without
verified data. P2 and P3 are queued, not built.

### Prompt 5 — SEO, AEO, GEO, Interactions & Performance

**Depends on:** Prompt 4.

Deliver: metadata generation per title pattern; XML sitemap index split by type;
`robots.txt` ported from the current site with AI-crawler allowances intact;
`llms.txt`; all 67 redirects at the edge; entity-anchored schema across all page
types; answer blocks and FAQ structure validated for extraction; `LocalBusiness`
schema for Pune; analytics and the fixed 50-prompt AI-citation measurement set;
performance work to budget; interaction polish.

### Prompt 6 — QA, Responsive & Production Readiness

**Depends on:** Prompt 5.

Deliver: the ten CI quality gates green; responsive QA across breakpoints; WCAG 2.2
AA audit; cross-browser testing; pre-migration URL inventory captured; redirect
verification crawl; staged cutover plan with rollback; Search Console and analytics
configured; 90-day post-launch monitoring plan; content governance handover — owners,
review dates, publishing workflow.

### Sequence and parallel tracks

```
NOW ──────────────────────────────────────────────────────────────────────►
│
├─ Architecture approval + D1…D6            ← blocks everything
│
├─ D2: remove fabricated pages from live site   ← do immediately, independent
│
├─ Case study consent + proof collection ═══════════════════════════════════►
│  (longest lead time — starts now, runs through Prompt 5)
│
├─ Prompt 2 ──► Prompt 3 ──► Prompt 4 ──► Prompt 5 ──► Prompt 6 ──► Launch
│                                                                     │
└─ Content writing (P1: 134 pages) ══════════════════════════════════►│
   (starts during Prompt 2, runs in parallel — it is the critical path)
                                                                      │
                                              P2 rollout ─────────────┴──►
                                              P3 as demand justifies ────►
```

**The two things that must start before Prompt 2:** case study consent (R1) and
removing the fabricated project pages (D2). Neither depends on design or code, and
the first has the longest lead time in the project.

---

## Definition of done for Prompt 1

- [x] Executive strategy, positioning, value proposition, differentiation — doc 01
- [x] Content governance, voice, banned language, proof standards — doc 01
- [x] Audience matrix (9 groups) — doc 02
- [x] User personas (8) — doc 02
- [x] User journey maps (9) — doc 02
- [x] Complete sitemap — **328 pages**, validated — doc 03 + `sitemap.csv`
- [x] URL architecture, canonical and redirect policy — doc 04
- [x] Navigation, mega menus, mobile, footer, search — doc 04
- [x] Page type architecture (14 types, distinct hierarchies) — doc 05
- [x] Content model, entities, relationships — doc 05
- [x] Case study model — doc 05
- [x] Resource, industry and use case architecture — doc 05
- [x] SEO / AEO / GEO architecture and schema strategy — doc 06
- [x] Internal linking strategy — doc 06
- [x] CTA and conversion architecture (6 tiers) — doc 06
- [x] Existing website audit — doc 07
- [x] Content to reuse / rewrite / remove — doc 07
- [x] Missing content and verification requirements — doc 07
- [x] Redirect map — `redirects.csv`, 67 entries, validated
- [x] Technical architecture, risks, plan for Prompts 2–6 — doc 08

**Status: complete, awaiting approval.** No implementation has begun. No homepage
redesign, no components, no page content, no fabricated case studies.
