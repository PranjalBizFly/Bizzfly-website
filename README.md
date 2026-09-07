# BizzFly Website Redesign — Source of Truth

Strategic architecture and design system for the BizzFly website rebuild.
**Specification only — no implementation has begun.**

Source of truth for business facts: the live site at `https://bizzfly.com`
(WordPress + `digitak` theme), audited 2026-09-07. Anything not verifiable there is
marked `[CONTENT REQUIRED]` or `[VERIFY WITH BIZZFLY]`.

---

## Prompt 1 — Architecture

| # | Document | Covers |
|---|---|---|
| 01 | [Strategy & Positioning](docs/architecture/01-strategy-and-positioning.md) | Executive strategy, positioning, value proposition, differentiation, content governance |
| 02 | [Audiences, Personas & Journeys](docs/architecture/02-audience-personas-journeys.md) | Audience matrix, 8 personas, 9 journey maps |
| 03 | [Complete Sitemap](docs/architecture/03-sitemap.md) | 328 pages, grouped and annotated |
| — | [sitemap.csv](docs/architecture/sitemap.csv) | Machine-readable sitemap — the build manifest for Prompt 4 |
| 04 | [URL & Navigation](docs/architecture/04-url-and-navigation.md) | URL rules, header, mega menu, mobile nav, footer, search |
| 05 | [Page Types & Content Model](docs/architecture/05-page-types-and-content-model.md) | 14 page types, content entities, case study / industry / use case / resource models |
| 06 | [SEO, AEO & GEO Architecture](docs/architecture/06-seo-aeo-geo-and-linking.md) | Search architecture, schema, internal linking, CTA/conversion architecture |
| 07 | [Existing Website Audit](docs/architecture/07-existing-site-audit.md) | What exists, what to keep, rewrite, kill, and verify |
| — | [redirects.csv](docs/architecture/redirects.csv) | 67 legacy → new redirects, validated, zero chains |
| 08 | [Technical Architecture & Plan](docs/architecture/08-technical-architecture-and-plan.md) | Stack recommendation, risks, plan for Prompts 2–6 |

## Prompt 2 — Design System

| # | Document | Covers |
|---|---|---|
| 01 | [Philosophy & Principles](docs/design-system/01-philosophy-and-principles.md) | Design philosophy, brand personality, 12 principles |
| 02 | [Foundations](docs/design-system/02-foundations.md) | Typography, colour, spacing, grid, containers, radius, elevation |
| — | [tokens.css](docs/design-system/tokens.css) | **The token contract.** Every value in the system |
| — | [verify-contrast.mjs](docs/design-system/verify-contrast.mjs) | Runnable contrast suite — 43 assertions, CI gate #11 |
| 03 | [Components](docs/design-system/03-components.md) | Buttons, links, navigation, mega menu, search, forms, states |
| 04 | [Heroes & Sections](docs/design-system/04-heroes-and-sections.md) | 10 hero patterns, 22 section patterns, composition rules |
| 05 | [Motion](docs/design-system/05-motion.md) | Reveals, stagger, hover, scroll, reduced motion, performance |
| 06 | [Component Architecture](docs/design-system/06-component-architecture.md) | Directory structure, composability contract, server/client boundary |
| 07 | [Responsive, Accessibility & Performance](docs/design-system/07-responsive-accessibility-performance.md) | Breakpoints, WCAG 2.2 AA rules, performance budget |
| 08 | [Page-Type Visual Strategy](docs/design-system/08-page-type-visual-strategy.md) | How 14 page types differ visually, 24 anti-template rules |
| 09 | [Implementation Blueprint](docs/design-system/09-implementation-blueprint.md) | Exactly how Prompt 3 builds the shell and homepage; responsive QA checklist |

---

## Key decisions carried forward

| Decision | Rationale |
|---|---|
| **6 nav items**, no "Solutions" alongside "Services" | Synonyms in ordinary English; users click both and leave. Three axes instead: Services (how), Industries (who), Use Cases (why) |
| **Official brand palette** — `#2C70D1` blue and `#A9CF46` green — not the theme's `#1863dc` | The two primaries have opposite limits: green is 1.79:1 on white, blue is 3.82:1 on ink. So blue leads on light surfaces and green leads on dark, encoded once in `--accent-text` / `--accent-edge` rather than decided per component |
| **The logo is only ever the official asset** | The supplied lockup is reversed — "Bizz" green, "fly" white — so it is illegible on white. The header is therefore a dark brand surface, rather than the mark being recoloured. `BrandLogo` is the only component allowed to render it |
| **328 pages, phased 134 / 132 / 62** | Publishing all at once guarantees thin content |
| **No city × service page matrix** | Only Pune has a verified address. The rest would be doorway pages |
| **Cards are a last resort** | Max two card grids per page, never consecutive |
| **No page transitions, no animation library** | Most sessions are 1–3 pages from search; instant navigation is the premium experience. All motion is CSS, ≤3 KB JS |
| **Server-rendered HTML, always** | AI crawlers execute little or no JS — this is a positioning requirement, not just performance |

## Blocking items

| # | Item | Blocks |
|---|---|---|
| **D1** | Stack: Next.js + headless CMS, or headless WordPress + Next.js | **Prompt 3** |
| **D2** | Remove the 11 fabricated `/project/*` pages and 24 thin `/service/*` fragments from the live site *(recommended: now)* | Nothing — actionable today |
| **R1 / D4** | Verified case study consent — 14 slots are `[CONTENT REQUIRED]` | Prompt 4, launch quality |
| — | 17 `[VERIFY WITH BIZZFLY]` questions in [audit doc 07](docs/architecture/07-existing-site-audit.md) | Prompt 4 content |

## Status

**Implementation prompt 1 of 6 complete.** The Next.js application is live in this
repository: design system, global shell (header, mega menus, mobile nav, search,
footer), data-driven routing for all seven content sections, and a working homepage.

```bash
npm install
npm run dev      # http://localhost:3000
npm run verify   # contrast + typecheck + lint
npm run build    # production build
```

The content layer is currently typed TypeScript modules under `content/`. Prompt 4
can swap it for a headless CMS without touching components, because every route
reads through the entity model in `types/content.ts` (decision D1).

### Repository layout

| Path | Contains |
|---|---|
| `app/` | Routes — one dynamic route per content section, all statically generated |
| `components/` | navigation · footer · layout · typography · buttons · hero · sections · motion · search · forms |
| `content/` | Content data and navigation, typed against `types/content.ts` |
| `lib/` | Search index and engine, SEO metadata helpers |
| `styles/` | `tokens.css` (the design contract) and `base.css` |
| `docs/` | Architecture and design system specifications |
