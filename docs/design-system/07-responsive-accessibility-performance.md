# 07 — Responsive Rules, Accessibility & Performance

---

## P. Responsive Rules

### Breakpoints

| Name | Range | Grid | Margin | Gutter |
|---|---|---|---|---|
| `xs` | 320–479 | 4 | 20px | 16px |
| `sm` | 480–767 | 4 | 24px | 16px |
| `md` | 768–1023 | 8 | 32px | 24px |
| `lg` | 1024–1279 | 12 | 40px | 24px |
| `xl` | 1280–1599 | 12 | 48px | 32px |
| `2xl` | 1600+ | 12 | auto | 32px |

Mobile-first: base styles are `xs`, `min-width` queries add up. **Container queries**
are used for components that appear at different widths in different contexts
(`RelatedRail`, `CardGrid`, `PersonRow`) — those respond to their container, not the
viewport, which is what makes them genuinely reusable.

### Component behaviour across breakpoints

| Component | xs–sm | md | lg+ |
|---|---|---|---|
| Header | Logo + CTA + menu; search inside menu | Logo + menu + search + CTA | Full nav + mega menus |
| Navigation | Full-screen drill-down | Full-screen drill-down | Mega menu panels |
| Search | Full-screen sheet | Centred dialog | Centred dialog + `⌘K` |
| Hero H-B | Content, CTA, then image | Content, then image | 7/5 side by side |
| Hero H-D metrics | Stacked, 2 columns | Row of 3 | Row of 4 |
| S-01 Numbered list | Index above name; links wrap to 2 lines | Index inline | Full row with link rail |
| S-02 Definition rail | Accordion | Stacked, sticky off | Sticky list + scrolling detail |
| S-03 Feature matrix | Horizontal scroll in own container | Horizontal scroll | Full table |
| S-05 Card grid | 1-up | 2-up | 3-up |
| S-06 Process timeline | Vertical | Vertical | Horizontal |
| S-07 Stepped narrative | Stacked, no alternation | Stacked | Alternating 5/7 · 7/5 |
| S-12 Sidenotes | Inline callouts below paragraph | Inline callouts | Margin notes |
| S-13/14 Diagrams | Simplified vertical list | Simplified SVG | Full SVG |
| S-18 Related rail | Horizontal scroll-snap | 2-up grid | 3-up grid |
| Footer | Accordion columns | 2 columns | 5 columns |
| Section nav | "On this page" disclosure | Disclosure | Sticky sidebar |

### Mobile is authored, not derived

Per principle P12, these are **different compositions**, not reflows:

1. **Section spacing is a separate scale**, not a percentage of desktop (doc 02).
2. **Hero crops differ.** Desktop 16:10 landscape; mobile 3:2 or 4:5 with a different
   focal point — never the same image letterboxed.
3. **Section order may differ.** On industry pages, the sector-problems rail moves
   above the lead on mobile, because scroll cost makes the first screen more valuable.
4. **Some elements do not exist on mobile.** Margin notes, the sticky term list and
   decorative rules are removed rather than shrunk.
5. **Link rails become wrapped groups**, not horizontal scrollers, where the items are
   navigation rather than browsing.

### Hard responsive rules

1. **No horizontal page scroll at any width from 320px up.** Wide content (tables,
   diagrams, code) scrolls inside its own `overflow-x: auto` container with a visible
   affordance.
2. **No fixed pixel widths** on content containers. `max-width` + `%` only.
3. **Text never shrinks below 15px** at any breakpoint.
4. **Touch targets ≥ 44×44px** below `lg`, with ≥ 8px between adjacent targets.
5. **Safe-area insets** respected (`env(safe-area-inset-*)`) for the sticky mobile CTA
   and bottom nav.
6. **Images always have `width`/`height` or `aspect-ratio`** — no exceptions. This is
   the primary CLS defence.
7. **Landscape phones** (≤500px tall) must not have a sticky header taller than 56px.
8. **Above 1600px the layout stops growing.** Extra width becomes margin.

### Required test matrix

320 · 360 · 375 · 390 · 414 · 480 · 768 · 834 · 1024 · 1280 · 1440 · 1600 · 1920 px

Plus: 390×844 landscape, 200% browser zoom, 320px at 400% zoom (WCAG reflow), and
`text-size-adjust` with the OS font scaled to 200%.

---

## Q. Accessibility Rules

Target: **WCAG 2.2 Level AA**, verified — not asserted.

### Colour and contrast

Already satisfied by construction: every pairing in `tokens.css` was computed before
being written down (doc 02). The rules that keep it that way:

| Requirement | Rule |
|---|---|
| Body text | ≥ 4.5:1. Lightest permitted text token is `--ink-500` (6.54:1) |
| Large text (≥24px or ≥19px bold) | ≥ 3:1 — but this system uses ≥ 4.5:1 throughout anyway |
| UI components and graphics | ≥ 3:1. `--ink-400` (4.46:1) and `--ink-350` (3.06:1) are **UI-only tokens** |
| `--green-500` | **Never** text or an icon on a light background (1.79:1). Asserted as a forbidden pairing in `verify-contrast.mjs` |
| Focus indicator | ≥ 3:1 against both the component and the adjacent background |
| Colour alone | Never the only carrier of meaning — links are underlined, charts are labelled, status has an icon |

### Keyboard

1. Every interactive element is reachable and operable by keyboard.
2. **Visible focus on everything**: 2px `--ink-900` ring at 2px offset (`--green-500`
   in inverse contexts). `:focus-visible`, so mouse users do not see rings.
3. Focus order follows visual order. **No positive `tabindex`.**
4. Focus is never trapped except in intentional modals (search, mobile nav), where
   `Esc` exits and focus returns to the trigger.
5. **Skip link** first in the DOM, visible on focus, at `--z-skiplink`.
6. Mega menu: `Enter`/`Space` opens, arrows move within a column, `Tab` moves between
   columns, `Esc` closes and restores focus.
7. Accordions: `Enter`/`Space` toggles; native `<details>` wherever possible.
8. **WCAG 2.2 additions specifically checked** — focus not obscured by the sticky
   header (2.4.11), target size ≥ 24px minimum with this system using 44px (2.5.8),
   no drag-only interactions (2.5.7), and no cognitive-test authentication (3.3.8).

### Semantics

1. One `<h1>` per page; **never skip levels** — the `headingLevel` prop exists for
   exactly this (doc 06).
2. Landmarks: `<header>`, `<nav>` (each with an accessible name), `<main>`,
   `<aside>`, `<footer>`.
3. Lists are `<ul>`/`<ol>`. Tables are `<table>` with `<th scope>` and a `<caption>`.
4. Buttons that act are `<button>`; things that navigate are `<a>`. Never a clickable
   `<div>`.
5. SVG diagrams: `role="img"` with a `<title>`, plus a text alternative for complex
   figures. Decorative SVG is `aria-hidden`.
6. Live regions for search result counts and form submission status — `polite`, never
   `assertive`.

### Forms

Visible persistent labels; programmatic association; `aria-invalid` and
`aria-describedby` on errors; an error summary at the top with in-page links;
autocomplete tokens; validation on blur; fieldset/legend for grouped inputs;
**never placeholder-as-label**.

### Media

Meaningful images have descriptive `alt`; decorative images have `alt=""`. No text
baked into images. Video has captions and a transcript; nothing autoplays with sound;
any auto-advancing content has pause/stop/hide controls.

### Motion

`prefers-reduced-motion` honoured at the token level (doc 05). Nothing flashes more
than three times per second. Parallax does not exist in this system.

### Verification gates

| Gate | Tool | Threshold |
|---|---|---|
| Automated | axe-core in CI on every template | **0 critical, 0 serious** |
| Contrast | Token-pair test suite | 100% pass — the script from this design pass, committed |
| Keyboard | Manual script per template | Complete every journey by keyboard |
| Screen reader | NVDA + Firefox, VoiceOver + Safari | Nav, search, forms, tables, diagrams |
| Zoom | 200% and 400% reflow | No loss of content or function |
| Forced colours | Windows High Contrast | All content and focus visible |

Automated testing catches roughly a third of real issues. **The manual gates are not
optional.**

---

## R. Performance Rules

Budget inherited from architecture doc 08. Restated as design constraints because
they are inputs, not cleanup (principle P10).

### Budget

| Metric | Budget | Notes |
|---|---|---|
| **LCP** | < 2.0s | Mobile, 4G, p75 |
| **INP** | < 200ms | p75 |
| **CLS** | < 0.1 | Target 0 |
| **TTFB** | < 400ms | Static + edge |
| **FCP** | < 1.2s | |
| HTML per page | < 60 KB | Currently 296 KB on bizzfly.com |
| CSS | < 40 KB compressed | |
| JS per page | < 120 KB compressed | Typical service page ≈ 10 KB |
| Fonts | ≤ 3 files, ≤ 95 KB | |
| Requests, initial | < 30 | Currently 44 script tags alone |
| Lighthouse Performance | ≥ 95 mobile | CI gate |

### Rendering

Static generation with ISR. **Every page is complete HTML on first byte** — required
by architecture doc 06 because AI crawlers execute little or no JavaScript. This is a
positioning requirement, not just a speed one.

### Images

1. AVIF with WebP fallback; `srcset` + `sizes` on everything.
2. **Explicit `width`/`height` or `aspect-ratio` always** — the primary CLS defence.
3. Above-the-fold hero image: `priority`, preloaded, **never lazy**.
4. Everything else: `loading="lazy"`, `decoding="async"`.
5. Budget: hero ≤ 150 KB, in-content ≤ 80 KB, thumbnails ≤ 30 KB.
6. `fetchpriority="high"` on the LCP image only.

### Fonts

Self-hosted by `next/font`, subset, variable where published (Funnel Sans; Poppins ships static weights), `font-display: swap`
with metric-matched fallbacks so swap causes **zero** CLS.

### CSS and JavaScript

- Critical CSS inlined for above-the-fold; the rest deferred.
- No CSS-in-JS runtime — CSS Modules or compile-time only.
- **No animation library** (doc 05). No jQuery. No moment. No lodash.
- Route-level code splitting; `SearchDialog` and its index load on first invocation.
- Third-party scripts: analytics only, deferred, server-side tagged. **A third-party
  script requires an explicit performance-budget review before it ships.**

### The rules that protect the budget

1. **Every design decision states its cost.** A section whose weight is unknown is not
   designed yet.
2. **Nothing above the fold animates on load** — it delays LCP by definition.
3. **Composite-only animation** (`transform`/`opacity`). Anything else is a defect.
4. **No layout shift after first paint.** Space is reserved for every async element.
5. **The LCP element is text in most templates**, which is the cheapest possible LCP —
   a direct consequence of the answer-first hero rule (P6).

### Monitoring

Lighthouse CI on every PR against the budget; the build **fails** on breach. Real-user
monitoring of Core Web Vitals post-launch, segmented by template so a regression is
traced to a page type rather than a site-wide average.
