# BizzFly design system

The technical reference for building on this site. The **Bizzfly Brand
Guidelines PDF is the source of truth**; this document translates it into the
tokens, components and rules the codebase actually enforces, and records the
reasoning where a guideline rule and a web constraint had to be reconciled.

Two files are authoritative in code:

| File | Role |
|---|---|
| `styles/tokens.css` | Every value in the system. The only stylesheet permitted to contain a raw colour. |
| `lib/brand.ts` | A mirror of the palette for the three renderers that cannot read CSS custom properties. |

Compliance is machine-checked. `npm run verify:brand` fails the build on a
violation; `npm run verify:contrast` asserts every colour pairing against
WCAG. Both run inside `npm run qa`.

---

## 1. Colour

### Official palette — never modified

| Role | Hex | RGB |
|---|---|---|
| Primary blue | `#2C70D1` | 44, 112, 209 |
| Primary green | `#A9CF46` | 169, 207, 70 |
| Secondary blue | `#2A1ED1` | 42, 30, 209 |
| Secondary green | `#40E523` | 64, 229, 35 |

These four values are fixed. When a brand colour fails contrast in a context,
the fix is the **background, pairing, size, weight or surrounding neutral** —
never the hex.

### The constraint that shapes everything

The two primaries have opposite legibility. Measured, not estimated:

| Pairing | Ratio | Verdict |
|---|---|---|
| Blue `#2C70D1` on white | 4.83:1 | ✅ text |
| Blue `#2C70D1` on ink | 3.82:1 | ❌ never body text |
| Green `#A9CF46` on white | 1.79:1 | ❌ never text |
| Ink on green `#A9CF46` | 10.28:1 | ✅ the green button |
| Green `#A9CF46` on ink | 10.28:1 | ✅ the accent on dark |

So **blue leads on light surfaces, green leads on dark**. That rule is encoded
once, in `--accent-text` / `--accent-edge`, and remapped by `.is-inverse` and
the dark theme. A component accents itself without knowing what it sits on.

### Secondary colours

`#2A1ED1` is a **signal, not a field**. Filling a section with it produces a
saturated wall that reads as a template — the homepage technology band was
2,157px of it before this was corrected. The deep context is built on
`--deep-900` (`#171238`, a near-black indigo) with the brand purple appearing
inside it only as an accent. On white it is text-safe at 9.52:1, which is
where it does its real work.

`#40E523` is deliberately **not wired into any semantic token**. It exists as
`--green-bright` for a single live indicator, so it cannot spread by accident.

### Ratio in practice

```
neutral surfaces ──────────────────────────────────  ~85%
primary blue / green  ───────────                     ~12%
secondary blue        ──                               ~3%
secondary green       ·                              <0.5%
```

### Neutrals

Ink is blue-shifted charcoal (`--ink-900: #0D1420`) so the greys sit with the
brand blue rather than fighting it. The full ramp — `ink-900` through
`ink-050` — plus `--surface`, `--surface-muted`, `--border`, `--border-strong`,
`--scrim`, and status colours (`--success`, `--warning`, `--error`, each
verified ≥4.5:1 on white).

### Gradients

None. The identity is carried by typography, spacing, the logo, the official
colours, layout and hierarchy. `verify:brand` fails on any
`linear-`/`radial-`/`conic-gradient`.

---

## 2. Typography

### The two families — and only two

| Role | Family | Weight |
|---|---|---|
| Display, H1–H4, metrics, quotes | **Funnel Sans** | SemiBold 600 |
| Body, UI, navigation, buttons, labels | **Poppins** | Regular 400 / Medium 500 / Bold 700 |

Loaded and self-hosted by `next/font/google` in `app/layout.tsx`. Funnel Sans
is a variable font (one file, 300–800). Poppins has no variable build, so its
three brand weights are requested explicitly — and no others.

> **A third typeface was removed.** IBM Plex Mono was previously used for
> eyebrows, meta lines, metric labels, section indices, breadcrumbs and search
> chrome — 70 declarations across 30 files. The guidelines enumerate exactly
> two families, and a monospace face reads as a deliberate editorial voice
> rather than a neutral utility, so this amounted to an unsanctioned brand
> typeface competing with Poppins. The role was real, so it kept a token:
> `--font-label`, which resolves to Poppins. What makes a label read as a
> label here is that it is small, uppercase and tracked — the typeface no
> longer has to carry it. One fewer webfont request, one fewer non-brand face.

### Family tokens

| Token | Resolves to | Use |
|---|---|---|
| `--font-display` | Funnel Sans | display and headings |
| `--font-body` | Poppins | body, UI, buttons |
| `--font-label` | Poppins | eyebrows, meta, labels, indices |
| `--font-mono` | **system** stack | machine strings only — one consumer, the error digest |

`verify:brand` fails if `--font-mono` gains a second consumer.

### Scale

Fluid values interpolate 360px → 1440px and retain a rem term, so browser zoom
and user font-size settings keep working (WCAG 1.4.4).

| Token | Range |
|---|---|
| `--text-display-xl` | 44 → 96px |
| `--text-display-lg` | 40 → 72px |
| `--text-h1` | 36 → 56px |
| `--text-h2` | 28 → 44px |
| `--text-h3` | 22 → 30px |
| `--text-h4` | 18 → 21px |
| `--text-body-lg` | 17 → 19px |
| `--text-body` | 16px |
| `--text-body-sm` | 14px |
| `--text-caption` | 13px |
| `--text-eyebrow` | 12px |

Relative tokens — `--text-inline` (0.9em) and `--text-glyph` (0.6em) — exist
because inline code and caret glyphs must track the size of the text they sit
in; an absolute token would break that relationship.

Poppins runs wide and tall for its point size, so `--container-text` (640px)
and `--leading-body` (1.70) are set for it specifically.

### Exception: inline SVG diagrams

`font-size` in `Diagram.module.css` and `DiscoveryDiagram.module.css` is in
**viewBox user units**, not CSS pixels — the drawing scales with its
container. Tokenising them would break the relationship rather than enforce
anything, so `verify:brand` allowlists these two files by name.

---

## 3. Logo

### One component

`components/brand/BrandLogo.tsx` is the only component that renders the mark.
It loads official artwork from `/public/brand/logo` and never reconstructs it:
no text substitute, no CSS shapes, no recolouring, no inline path data.

Two guideline rules are enforced there rather than left to callers, because a
rule every call site must remember is a rule that eventually breaks:

- **Aspect ratio** — callers choose a height; width is derived from the
  intrinsic size, so the mark cannot be stretched.
- **Clearspace** — equal to the cap height of the logotype, measured at
  **0.773** of the mark height in the official artwork. Applied as padding
  scaled from the rendered height, so it stays correct at any size.

### Minimum size

**30px** tall for digital (`--logo-min-height`), per page 8 of the guidelines.
It is the default height rather than a runtime check, because there is no size
below it to fall back to. The header is 80px, so a 30px mark clears 25px above
and below — past the 23.2px clearspace requires.

### Clearspace as a usable length

```css
--logo-clearspace-ratio: 0.773;  /* cap height 111.3 ÷ 144, measured */
--logo-clearspace: calc(var(--logo-height) * var(--logo-clearspace-ratio));
```

The header and the mobile drawer set `clearspace={false}` because the bar
height already supplies the vertical clearance and the component padding would
double it. They must therefore reserve the **horizontal** clearance
themselves — `padding-inline-end: var(--logo-clearspace)` — and
`verify:brand` fails if either opts out without doing so.

The page margin is the logo's *leading* clearspace in the header, which is why
`--margin` has a **24px** floor rather than the 20px it used to have.

### Two permitted direct uses

| File | Why it cannot use BrandLogo |
|---|---|
| `app/global-error.tsx` | Replaces the whole `<html>` document — no stylesheet, no app shell, so `next/image` and CSS tokens are both unavailable. |
| `app/og/route.tsx` | Satori renders to an image with no DOM and no network, so the file is read from disk and inlined as a data URI. |

Both are allowlisted in `verify:brand`, which then asserts on them directly
what BrandLogo would have guaranteed: official artwork, existing file,
aspect ratio within 1% of 634:144, and height ≥ 30px.

### Misuse — prohibited without exception

No rotation, skew, stretch, compression, glow, drop shadow, bevel, 3D effect,
arbitrary recolour, redraw, or alternative lockup. Animation may affect
opacity and position only, never the artwork. `verify:brand` fails on
`transform`, `filter`, `box-shadow`, `rotate`, `skew` or `text-shadow` in
`BrandLogo.module.css`.

### ⚠️ Missing official assets

The supplied lockup is the **reversed (on-dark)** artwork: "Bizz" and the star
in green `#A9CF46`, "fly" and the symbol plate in **white**. On a white
background the symbol and "fly" disappear and the mark reads as a broken
"Bizz".

**This is why the header and the mobile drawer are dark surfaces in both
themes.** It is a consequence of the available artwork, not a style choice.

```
[OFFICIAL_LOGO_ASSET_REQUIRED]  public/brand/logo/bizzfly-logo.svg
[OFFICIAL_LOGO_ASSET_REQUIRED]  public/brand/logo/bizzfly-logo-mono.svg
[OFFICIAL_LOGO_ASSET_REQUIRED]  public/brand/logo/bizzfly-symbol.svg
```

Supplying the positive lockup is the single change that would unlock a light
header. **Do not fill these slots by recolouring the reversed file** — that is
explicitly outside the guidelines. `BrandLogo` throws in development if asked
for a variant with no official asset, rather than degrading quietly.

### Favicon and app icon

The guidelines treat the app icon as distinct from the full logo. Both are the
official **symbol** on the brand ink square — nothing redrawn:

- `app/icon.svg` (32×32, 4px radius)
- `app/apple-icon.svg` (180×180, 24px radius)

Mirrored in `public/brand/favicon/`. Open Graph cards are generated from the
design tokens by `app/og/route.tsx` until an official `1200×630` card is
supplied.

---

## 4. Spacing and layout

4px base scale, `--space-1` (4px) through `--space-48` (192px).

Section rhythm is authored per size rather than scaled:
`--section-sm` 48→72, `--section-md` 64→112, `--section-lg` 80→160,
`--section-xl` 96→200.

| Container | Width |
|---|---|
| `--container-wide` | 1600px |
| `--container` | 1280px |
| `--container-content` | 1040px |
| `--container-text` | 640px |
| `--container-narrow` | 560px |

Grid: 4 columns → 8 at 768 → 12 at 1024. Margin 24 → 32 → 40 → 48px.
Asymmetric splits only (`.split-5-7`, `.split-7-5`, `.split-4-8`,
`.split-3-9`); a symmetric 6/6 is deliberately absent.

Vertical rhythm is owned by the parent through `gap`, never by sibling
margins.

---

## 5. Buttons

One system, three variants, three sizes. Tier determines variant — never eye.

| Variant | Treatment |
|---|---|
| Primary | Brand blue fill, white text. 4.83:1. |
| Secondary | Transparent, `--foreground` border and text; inverts on hover. |
| Tertiary | Transparent with a quiet border. |

Each interaction step **darkens**, so contrast climbs rather than falls:
4.83 → 5.72 → 6.97:1 against white.

| Size | Height |
|---|---|
| `lg` | 52px |
| `md` | 44px (default, meets the touch target) |
| `sm` | 36px |

Radius `--radius-md` (4px), Poppins Medium, `--text-button` (15px). Nothing
scales or lifts on hover; the arrow advances, the box does not move. Disabled
uses `--surface-muted` with `pointer-events: none`.

Things that navigate render as `<a>`; things that act render as `<button>`.
Never a clickable div.

---

## 6. Links

`--text-link` is `--blue-700` (6.97:1 on white, 6.49:1 on surface) — a step
darker than the brand blue, because the brand blue at 4.83:1 leaves nothing in
hand on a tinted surface. On dark it becomes `--blue-400` (5.87:1), since
`--blue-500` manages only 3.82:1 there.

Underlines are always present in prose, coloured `--link-underline` so the
rule is subordinate to the text, and thicken from 1px to 2px on hover rather
than appearing from nothing.

---

## 7. Forms

Inputs: 44px minimum height, `--surface-muted` fill, `--border-strong`
(3.03:1), `--radius-sm`. Font size is `--text-body` (16px) — below that, iOS
zooms on focus.

Every control has a real `<label>`. Errors are announced, not just coloured.

---

## 8. Navigation

Dark bar in both themes — forced by the reversed artwork (see §3).

- **Desktop** (≥1024px): mega-menu panels, active state as a short centred
  mark rather than a full underline, because at six items a full underline
  reads as a tab bar.
- **1024–1280px**: the official symbol replaces the full lockup — same
  artwork, cropped viewBox, never a redrawn or condensed lockup.
- **Mobile**: full-screen drawer, 56px rows, body-size text, accordion
  sections, CTA pinned above the safe-area inset.
- Condensed state adds a shadow and a blur where supported; the solid colour
  is always the fallback, so the effect is never load-bearing.

---

## 9. Iconography

No icon font and no icon library. UI affordances are drawn in CSS
(`::before`/`::after`) or set as text glyphs sized by `--text-glyph` /
`--text-icon`, so stroke weight and family cannot drift between components.
Diagrams are inline SVG — no image request, no library, no layout shift.

---

## 10. Surfaces, borders, radius, elevation

Radius tops out at **8px**: `--radius-sm` 2, `--radius-md` 4, `--radius-lg` 8,
plus `--radius-full` for pills and `--radius-0`.

Elevation is `--elev-1`/`2`/`3`, and levels 2 and 3 are for genuinely floating
elements only. Hairline rules do the work shadows do elsewhere. On dark
surfaces shadows do almost nothing, so the dark theme dials elevation back and
lets borders carry separation.

---

## 11. Responsive

Verified at 320, 360, 375, 390, 414, 480, 768, 820, 1024, 1280, 1440, 1920px
by `npm run verify:responsive` (18 pages × 12 viewports in real Chrome).

`overflow-x: clip` on the body guards the page; wide content scrolls inside
its own `.scroll-x` container. Mobile problems are never solved by breaking a
brand rule — the logo minimum and its clearspace hold at every width.

---

## 12. Motion

| Token | Value |
|---|---|
| `--dur-fast` | 160ms |
| `--dur-base` | 240ms |
| `--dur-reveal` | 480ms |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |

Opacity and transform only. Staggered reveals step 70ms and cap at the 6th
item. Nothing bounces, spins or glows; the logo is never animated in a way
that touches the artwork.

`prefers-reduced-motion: reduce` collapses every duration to 1ms and
`--reveal-distance` to 0 at the token level, so no component has to handle it
individually.

---

## 13. Accessibility

Non-negotiable, and never traded against brand compliance.

- **Contrast** — 96 assertions in `docs/design-system/verify-contrast.mjs`,
  including a *forbidden* list (green as text on white, blue as body text on
  ink) that must keep failing, so the two-primary rule cannot quietly erode.
- **Focus** — `:focus-visible` only, 2px solid with 2px offset, ink on light
  and brand green on dark.
- **Targets** — `--touch-target-min` 44px; a 30px logo still gets a 44px hit
  area.
- **Semantics** — real `<a>`/`<button>`, one `<h1>` per page, landmark
  regions, skip link.
- **Forced colours** — `@media (forced-colors: active)` hands focus and
  borders back to the system.

---

## 14. Imagery

No photographic imagery is used today. Anything added must communicate
technology, digital growth, AI, automation, business transformation, search
visibility or digital experience — not generic stock, not corporate
handshakes, not decorative abstractions. No image may be presented as a real
BizzFly client unless verified.

---

## 15. Content integrity

The design system never invents business facts. Company claims, metrics,
testimonials, clients, case studies, awards, certifications, addresses, phone
numbers and email addresses come from `content/site.ts` and the content
registry, and are changed only with verified information.

---

## 16. Commands

```bash
npm run verify:brand      # palette, typefaces, logo rules, token use
npm run verify:contrast   # 96 WCAG assertions against the palette
npm run report:brand      # regenerate the compliance reports
npm run verify            # contrast + brand + content + typecheck + lint
npm run qa                # the full suite, including build and responsive
```
