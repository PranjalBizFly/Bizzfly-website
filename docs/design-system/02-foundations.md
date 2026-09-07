# 02 — Foundations: Typography, Colour, Spacing, Grid, Containers

Exact token values. The machine-readable contract is
[`tokens.css`](tokens.css); this document is the reasoning.

---

## D. Typography System

### Font stack

Two families plus a mono. Three is the ceiling. The two brand faces are fixed by the
BizzFly brand guidelines; the mono is a system choice.

| Role | Family | Why |
|---|---|---|
| **Display & headings** | **Funnel Sans SemiBold** (variable: weight 300–800) | The brand's primary typeface. Open and geometric, with real presence at 64px+ and still legible at 20px |
| **Body & UI** | **Poppins** (400 Regular, 500 Medium, 700 Bold) | The brand's secondary typeface. Carries body text, forms, tables and labels |
| **Technical** | **IBM Plex Mono** (400, 500) | Eyebrows, metrics, labels, breadcrumb separators, code, diagram annotation. The brand guidelines name no monospace face, so this is a system choice and stays confined to labels and data |

**Why the pairing works:** Funnel Sans carries the identity at display sizes; Poppins
is the workhorse underneath it.

**What Poppins costs, and what was done about it:** Poppins is geometric, wide, and
has a tall x-height, so it reads roughly a size larger than a neutral grotesque and
sets a shorter line for the same measure. Three tokens are set for that specifically:
`body` is **16px** rather than 17px, `--leading-body` is **1.70** rather than 1.65,
and `--container-text` is **640px** rather than 680px so the 62–72 character measure
still holds. These are consequences of the typeface, not preferences — changing the
face means re-deriving all three.

**Why a mono at all:** it is the cheapest, most legible signal that this is a
technology company rather than a marketing agency. Restricted to labels and data, it
never costs readability.

### Loading rules

- Loaded and **self-hosted** by `next/font/google` in `app/layout.tsx`. Nothing is
  fetched from a third-party origin, so the CSP stays at `font-src 'self'`.
- Funnel Sans is loaded as a **variable** file covering 300–800 in a single request —
  smaller over the wire than the static cuts it replaces, and it includes the
  SemiBold (600) the brand specifies for display.
- Poppins publishes no variable build, so exactly three static weights are requested:
  **400, 500, 700**. Latin subset, normal style only.
- **Budget: ≤ 5 font files.** Anything beyond the Funnel Sans variable file, three
  Poppins weights and two Plex Mono cuts is a system change, reviewed.
- `font-display: swap`, with the metric-matched fallbacks `next/font` generates and
  applies automatically, so the swap causes **zero CLS**.
- The families are bound to `--font-display`, `--font-body` and `--font-mono` in
  `app/globals.css`. Components only ever reference those three tokens, so replacing
  this loader with licensed font files touches `app/layout.tsx` and `app/globals.css`
  and no component at all.

### Scale

Fluid via `clamp()`. Min = 360px viewport, max = 1440px.

| Token | Family | Size (min → max) | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| `display-xl` | Funnel Sans | 44 → 96px | 600 | 1.00 | −0.025em | Homepage statement; one per site section |
| `display-lg` | Funnel Sans | 40 → 72px | 600 | 1.00 | −0.025em | Page hero H1 on major hubs |
| `h1` | Funnel Sans | 36 → 56px | 600 | 1.08 | −0.02em | Standard page H1 |
| `h2` | Funnel Sans | 28 → 44px | 600 | 1.15 | −0.015em | Section headings |
| `h3` | Funnel Sans | 22 → 30px | 600 | 1.35 | −0.01em | Sub-sections, card titles |
| `h4` | Funnel Sans | 18 → 21px | 600 | 1.35 | −0.01em | Minor headings, FAQ questions |
| `body-lg` | Poppins | 17 → 19px | 400 | 1.60 | 0 | Lead paragraphs, answer blocks |
| `body` | Poppins | 16px fixed | 400 | 1.70 | 0 | Default reading text |
| `body-sm` | Poppins | 14px fixed | 400 | 1.60 | 0 | Secondary text, captions in context |
| `caption` | Poppins | 13px fixed | 400 | 1.45 | 0 | Image captions, footnotes |
| `eyebrow` | Plex Mono | 12px fixed | 500 | 1.2 | +0.10em | Section labels, UPPERCASE |
| `meta` | Plex Mono | 13px fixed | 400 | 1.4 | +0.02em | Dates, sources, indices, breadcrumbs |
| `metric` | Funnel Sans | 40 → 72px | 600 | 1.00 | −0.025em | Verified figures only |
| `metric-label` | Plex Mono | 12px fixed | 500 | 1.3 | +0.08em | Label beneath a metric |
| `nav` | Poppins | 15px fixed | 500 | 1.4 | 0 | Primary navigation |
| `nav-sub` | Poppins | 14px fixed | 400 | 1.5 | 0 | Mega-menu links |
| `button` | Poppins | 15px fixed | 500 | 1.0 | +0.005em | All buttons |
| `label` | Poppins | 14px fixed | 500 | 1.4 | 0 | Form labels |
| `quote` | Funnel Sans | 24 → 34px | 400 | 1.35 | −0.015em | Pull quotes, testimonials |

**Body is fixed at 16px, not fluid.** Reading text should not change size with the
viewport — only the measure should. Fluid body text is a common and unnecessary
readability cost. 16px rather than 17px because Poppins sets larger than the
neutral grotesque this scale was first drawn for — see the note under Font stack.

### Rules

1. **One `display-*` per page.** A page with two 96px statements has none.
2. **Never skip a heading level** for visual reasons. Size is a token, semantics are
   separate — an `h3` element may carry `h2` styling if the hierarchy demands it.
3. **Uppercase only** on `eyebrow` and inside buttons where required. Never on
   headings, never on body.
4. **Measure is enforced**: 62–72 characters for `body`, 55–65 for `body-lg`. Applied
   by the container system, not by hand.
5. **Tracking tightens as size grows.** Already encoded in the scale.
6. **No font sizes outside this table.** Any new size is a system change, reviewed.
7. **Numerals:** tabular figures (`font-variant-numeric: tabular-nums`) in tables,
   metrics and comparison layouts; proportional elsewhere.

---

## E. Colour System

### Derivation

The palette is the official BizzFly brand: primaries `#2C70D1` (BizzFly Blue) and
`#A9CF46` (BizzFly Green); secondaries `#2A1ED1` (Deep Electric Blue) and `#40E523`
(Bright Green). **Every pairing below was computed and verified** before being
written; ratios are measured, not estimated, and all of them are asserted in
[`verify-contrast.mjs`](verify-contrast.mjs), which runs in `npm run qa`.

The defining constraint is that the two primaries have **opposite** limitations:

- Green on white is **1.79:1**. It can never be text or an icon on a light surface.
  On ink it is **10.28:1**.
- Blue on ink is **3.82:1**. It can never be body text on a dark surface. On white it
  is **4.83:1**.

So neither primary works everywhere, and the system is built around that rather than
against it: **blue leads on light surfaces, green leads on dark ones.** That rule is
encoded once, in the `--accent-text` and `--accent-edge` tokens, which are redefined
inside `.is-inverse`. A component accents itself without knowing which surface it is
sitting on, and no component reaches for a raw brand hex.

### Brand — Blue (primary on light)

| Token | Value | Contrast facts | Use |
|---|---|---|---|
| `--blue-300` | `#8FB8EC` | 8.99:1 on ink | Link hover on dark surfaces |
| `--blue-400` | `#5C93DE` | 5.87:1 on ink ✓ | Links on dark surfaces |
| `--blue-500` | `#2C70D1` | 4.83:1 on white ✓ · 3.82:1 on ink ✗ | **The brand.** Primary button fill (with white text), accent edges, active state |
| `--blue-600` | `#2765BC` | 5.72:1 with white | Primary button hover |
| `--blue-700` | `#2258A6` | 6.97:1 on white ✓ · 6.49:1 on surface ✓ | **Link text**, primary button active |
| `--blue-900` | `#1A4480` | 9.62:1 on white ✓ | Link hover, high-emphasis text |

> **Rule:** `--blue-500` measures exactly **4.50:1** on `--surface`. That is the
> threshold itself, with no margin, so text on any tinted surface uses `--blue-700`.
> `--blue-500` is a fill and an edge colour, not a text colour.

### Brand — Green (primary on dark)

| Token | Value | Contrast facts | Use |
|---|---|---|---|
| `--green-300` | `#BEDD6F` | 12.09:1 on ink | Accent hover on dark |
| `--green-500` | `#A9CF46` | 1.79:1 on white ✗ · 10.28:1 on ink ✓ | **The brand.** Accent and focus ring on dark, fills carrying ink text, `::selection` |
| `--green-700` | `#7C9C2E` | 3.16:1 on white ✓ (non-text only) | Rules, list markers, chart strokes on light |
| `--green-900` | `#5A7220` | 5.44:1 on white ✓ · 5.07:1 on surface ✓ | The only green permitted as **text** on light |

> **Rule:** `--green-500` is never text or an icon on a light background. This is
> asserted as a *forbidden* pairing in the contrast suite, so a future token edit that
> made it pass would fail the build.

### Secondary — Deep Electric Blue

`#2A1ED1` is near-black in luminance terms: white on it is 9.52:1, but it is only
1.94:1 against ink. It is therefore used as a **surface**, never as a foreground on a
dark surface.

| Token | Value | Contrast | Use |
|---|---|---|---|
| `--deep-800` | `#2A1ED1` | white on it 9.52:1 ✓ · 9.52:1 on white ✓ | `.is-inverse-alt` section background; also usable as link text on white |
| `--deep-700` | `#3B30D8` | — | Surface elevation within an inverse-alt section |

Green on deep-800 = **5.31:1** ✓ — the accent survives the move, so inverse-alt
sections need no special-casing.

### Secondary — Bright Green

`#40E523` is a **micro-accent**, used very sparingly per the brand guidelines. It is
10.94:1 on ink and 1.69:1 on white. It is deliberately **not wired into any semantic
token**, so it cannot spread by accident; a component that wants it must name
`--green-bright` explicitly, which makes every use of it visible in review.

### Ink (primary neutral)

Blue-shifted charcoal, so the neutrals sit with the brand blue rather than fighting
it.

| Token | Value | Contrast on white | Use |
|---|---|---|---|
| `--ink-900` | `#0D1420` | 18.45:1 | Body text, headings, dark section background |
| `--ink-700` | `#232E3F` | 13.69:1 | Secondary headings, dark surface elevation |
| `--ink-500` | `#55606E` | 6.39:1 · 5.96 on surface | **Muted text.** The lightest permitted text grey |
| `--ink-400` | `#6E7A8A` | 4.36:1 ✗ text · ✓ 3:1 UI | Icons and graphical elements only — **not text** |
| `--ink-350` | `#8B95A3` | 3.03:1 ✓ UI | Input borders, dividers needing visibility |
| `--ink-250` | `#A9B4C4` | 8.80:1 **on ink** | Muted text on dark sections |
| `--ink-150` | `#DDE3EB` | — | Hairline rules, table borders |
| `--ink-050` | `#F5F7FA` | — | `--surface`, dark-section text |

### Semantic surfaces

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--surface` | `#F5F7FA` | Alternate section, subtle grouping |
| `--surface-sunken` | `#EAEEF4` | Input fields, code blocks |
| `--surface-inverse` | `#0D1420` | Dark sections |
| `--surface-inverse-alt` | `#2A1ED1` | Alternate dark sections |
| `--border` | `#DDE3EB` | Default hairline |
| `--border-strong` | `#8B95A3` | Inputs, focused containers |
| `--border-inverse` | `rgba(245,247,250,0.16)` | Rules on dark |

### Text and accent roles

| Token | Value | Verified |
|---|---|---|
| `--text` | `#0D1420` | 18.45:1 |
| `--text-muted` | `#55606E` | 6.39:1 |
| `--text-link` | `#2258A6` | 6.97:1 white · 6.49:1 surface |
| `--text-link-alt` | `#1A4480` | 9.62:1 |
| `--text-inverse` | `#F5F7FA` | 17.19:1 on ink |
| `--text-inverse-muted` | `#A9B4C4` | 8.80:1 on ink |
| `--text-on-brand` | `#FFFFFF` | 4.83:1 on blue-500 |
| `--text-on-green` | `#0D1420` | 10.28:1 on green-500 |
| `--accent-text` | blue-700 → green-500 in `.is-inverse` | 6.97:1 → 10.28:1 |
| `--accent-edge` | blue-500 → green-500 in `.is-inverse` | 4.83:1 → 10.28:1 |
| `--link-underline` | blue-300 → translucent blue-400 on dark | decorative; the text carries the contrast |

### Status

| Token | Value | On white | Use |
|---|---|---|---|
| `--success` | `#17734A` | 5.85:1 ✓ | Confirmations |
| `--warning` | `#8A5B00` | 5.87:1 ✓ | Cautions, `[CONTENT REQUIRED]` markers |
| `--error` | `#B3261E` | 6.54:1 ✓ | Validation errors |

Each has a `-subtle` background tint at 8% for message blocks; text on the tint always
uses the full-strength token.

### Data visualisation

Two ordered sequences, because one cannot serve both grounds. Every member clears 3:1
against its own background, and both are distinguishable in greyscale and for the
common colour vision deficiencies.

On light: `#0D1420` → `#2C70D1` → `#2A1ED1` → `#5A7220` → `#7C9C2E` → `#8B95A3`

On dark: `#A9CF46` → `#5C93DE` → `#F5F7FA` → `#BEDD6F` → `#8FB8EC` → `#A9B4C4`

Brand green is absent from the light series by necessity — at 1.79:1 on white it
cannot carry a data mark — and leads the dark series, where it reaches 10.28:1.

**Never encode meaning by colour alone.** Direct labels, patterns or shape carry the
meaning; colour is reinforcement.

### The one permitted gradient

Exactly one, used only as a section transition from light into `--surface-inverse`:
a vertical `#FFFFFF → #F5F7FA` at ≤120px. **No mesh gradients, no brand gradients, no
gradient text, no gradient buttons, no radial glows.**

### Light and dark

The site ships **both a light and a dark theme**, plus dark *sections* inside either
of them. The two are different mechanisms and should not be confused:

- **Theme** is the visitor's choice, stored in `localStorage` and applied as
  `data-theme` on `<html>` by a blocking script before first paint. It redefines the
  contract variables — `--background`, `--foreground`, `--surface`, `--surface-muted`,
  `--muted`, `--border` and the accent roles — and nothing else.
- **Dark sections** (`.is-inverse`, `.is-inverse-alt`) remain a compositional device
  used for the AI-search narrative, case study openers, technology pages and the
  pre-footer band. Inside the dark theme they lift their background rather than
  matching the page, so the rhythm survives in both themes.

Dark is designed, not inverted: the brand ramp is unchanged, surfaces step up in
controlled increments (1.18:1 and 1.29:1 off the page rather than pure black), and
green takes the accent from blue for exactly the reason it does in an inverse
section. Every pairing in both themes is asserted in
[`verify-contrast.mjs`](verify-contrast.mjs), so an unverified palette cannot ship.

**The header is a dark bar in both themes.** That is forced by the artwork rather
than chosen: the official lockup is reversed, so a light bar would erase half the
logo, and recolouring it is outside the brand guidelines.

---

## F. Spacing System

4px base unit.

| Token | Value | Use |
|---|---|---|
| `--space-1` … `--space-6` | 4, 8, 12, 16, 20, 24 | Micro: icon gaps, label-to-input, inline |
| `--space-8` / `--space-10` / `--space-12` | 32 / 40 / 48 | Component internals, stack gaps |
| `--space-16` / `--space-20` / `--space-24` | 64 / 80 / 96 | Between component groups |
| `--space-32` / `--space-40` / `--space-48` | 128 / 160 / 192 | Large compositional gaps |

### Section rhythm — mobile and desktop are separately authored

Per principle P12, section spacing is **not** a scaled-down desktop value. Mobile
needs proportionally *less* vertical space, because scroll cost is higher and the
viewport is shorter.

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--section-sm` | 48px | 72px | Tightly related sections |
| `--section-md` | 64px | 112px | **Default** between sections |
| `--section-lg` | 80px | 160px | Major shifts in subject |
| `--section-xl` | 96px | 200px | Page open/close, dark-section bookends |

```css
--section-md: clamp(4rem, 3rem + 4.4444vw, 7rem); /* 64 → 112 */
```

### Rules

1. No arbitrary values. Everything resolves to a token.
2. Vertical rhythm inside prose is owned by the prose component, not by margins on
   individual elements.
3. Space between two elements is owned by the parent (`gap`), never by sibling
   margins — this eliminates margin-collapse bugs and makes reordering safe.
4. Dark sections carry one step *more* internal padding than light sections at the
   same level; dark surfaces read as tighter than they are.

---

## G. Grid System

| Breakpoint | Range | Columns | Gutter | Margin |
|---|---|---|---|---|
| `xs` | 320–479 | 4 | 16px | 20px |
| `sm` | 480–767 | 4 | 16px | 24px |
| `md` | 768–1023 | 8 | 24px | 32px |
| `lg` | 1024–1279 | 12 | 24px | 40px |
| `xl` | 1280–1599 | 12 | 32px | 48px |
| `2xl` | 1600+ | 12 | 32px | auto (container-capped) |

CSS Grid, not a float or flex grid. Named lines for the common spans so layouts are
readable:

```css
grid-template-columns:
  [full-start] minmax(var(--margin), 1fr)
  [wide-start] minmax(0, 200px)
  [content-start] repeat(8, minmax(0, 1fr))
  [content-end] minmax(0, 200px)
  [wide-end] minmax(var(--margin), 1fr) [full-end];
```

This gives three nested widths in one grid — `full`, `wide`, `content` — so a section
can break out to full-bleed without leaving the grid or nesting extra wrappers.

### Asymmetry is the default for editorial sections

A 12-column grid used as 6+6 every time produces the template feel the brief
prohibits. Preferred splits:

| Split | Use |
|---|---|
| 5 / 7 | Heading left, content right — the standard editorial section |
| 4 / 8 | Sticky sub-nav or label column beside content |
| 7 / 5 | Content-dominant with a supporting visual |
| 3 / 9 | Index or step number beside a long row |
| 8 offset 2 | Centred long-form with room for margin notes |

**Symmetric 6/6 requires justification.** It is correct for genuine comparisons and
almost nothing else.

---

## H. Container System

| Token | Max width | Measure | Use |
|---|---|---|---|
| `--container-full` | 100% | — | Full-bleed media, dark bands, marquees |
| `--container-wide` | 1600px | — | Immersive sections at 2xl only |
| `--container` | 1280px | — | **Default** page container |
| `--container-content` | 1040px | — | Editorial sections, diagrams, tables |
| `--container-text` | 680px | 62–72ch | **Long-form reading.** Guides, blog, case study prose, legal |
| `--container-narrow` | 560px | — | Forms, conversion pages, empty states |

### Rules

1. **`--container-text` is mandatory for any prose run over 120 words.** This is the
   single most common enterprise-site readability failure — full-width paragraphs at
   1440px produce 140-character lines.
2. Containers nest: a `--container` section may hold a `--container-text` prose block.
3. Full-bleed elements break out via the named grid lines, not by escaping the
   container with negative margins.
4. Above 1600px the container centres and margins grow. **The layout never continues
   to stretch** — an ultra-wide monitor gets more whitespace, not longer lines.
5. Padding is a container property (`--margin` per breakpoint), never applied by
   sections individually.

---

## Radius, elevation, borders

Deliberately restrained — the brief prohibits excessive rounding and heavy shadows.

| Token | Value | Use |
|---|---|---|
| `--radius-0` | 0 | Section bands, full-bleed media, tables — **the default** |
| `--radius-sm` | 2px | Inputs, tags, small controls |
| `--radius-md` | 4px | Buttons, cards, image containers |
| `--radius-lg` | 8px | Overlays, modals, mega-menu panels |
| `--radius-full` | 9999px | Avatars and pill filters only |

Nothing on this site has a radius above 8px. Large radii are the strongest visual
signal of a consumer template.

| Elevation | Value | Use |
|---|---|---|
| `--elev-0` | none | **Default.** Separation comes from rules and space |
| `--elev-1` | `0 1px 2px rgb(13 18 16 / 0.06)` | Hovered interactive surface |
| `--elev-2` | `0 4px 16px rgb(13 18 16 / 0.08)` | Dropdowns, mega-menu, popovers |
| `--elev-3` | `0 12px 40px rgb(13 18 16 / 0.12)` | Modal, command palette |

Three levels, and levels 2–3 exist only for elements that genuinely float above the
page. **A static section never has a shadow.**

Borders are `1px solid var(--border)` by default. Hairlines do the work shadows do
elsewhere.

## Z-index

| Token | Value | Layer |
|---|---|---|
| `--z-base` | 0 | Content |
| `--z-sticky` | 100 | Sticky sub-navigation, table headers |
| `--z-header` | 200 | Global header |
| `--z-dropdown` | 300 | Mega menu |
| `--z-overlay` | 400 | Scrim |
| `--z-modal` | 500 | Modal, mobile nav, search |
| `--z-toast` | 600 | Notifications |
| `--z-skiplink` | 700 | Skip-to-content — always on top |

No value outside this scale. No `z-index: 9999`.
