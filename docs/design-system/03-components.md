# 03 — Buttons, Links, Navigation, Search & Forms

---

## I. Button System

Buttons map to the six CTA tiers defined in architecture doc 06. **Tier determines
variant** — a designer never picks a button style by eye.

| Tier | Variant | Fill | Text | Border |
|---|---|---|---|---|
| T5 · T4 | **Primary** | `--blue-500` | `--text-on-brand` white (4.83:1 ✓) | none |
| T4 secondary · T3 | **Secondary** | transparent | `--ink-900` (18.90:1 ✓) | 1px `--ink-900` |
| T2 | **Tertiary** | transparent | `--ink-900` | 1px `--border` |
| T1 · T0 | **Text link CTA** | none | `--text-link` (6.97:1 ✓), `--link-underline` | none |
| On dark | **Inverse primary** | `--blue-500` | `--text-on-brand` white (4.83:1 ✓) | none |
| On dark | **Inverse secondary** | transparent | `--ink-050` (17.39:1 ✓) | 1px `--border-inverse` |
| Destructive | **Danger** | transparent | `--error` (6.54:1 ✓) | 1px `--error` |

**The primary button is BizzFly Blue with white text**, verified at 4.83:1. Blue
carries the primary action on every surface, light or dark, so the most important
control on a page never changes colour with its background.

Brand green is not the button fill. It cannot be: green needs ink text to be legible,
and an ink-on-green button next to an ink-on-white page reads as disabled rather than
primary. Green earns its weight as the accent on dark surfaces, where it reaches
10.28:1 — see `--accent-edge`. A page with three accent elements has no primary
action.

### Sizes

| Size | Height | Padding X | Type | Use |
|---|---|---|---|---|
| `lg` | 52px | 28px | `--text-button` | Hero and conversion pages |
| `md` | 44px | 20px | `--text-button` | **Default.** Meets the 44px touch minimum |
| `sm` | 36px | 14px | `--text-body-sm` | Toolbars, filters, table rows |

`sm` is never a page's primary action, because it is below the WCAG 2.2 target-size
threshold for standalone controls.

### States — all seven, all specified

| State | Primary | Secondary | Text CTA |
|---|---|---|---|
| Default | `--blue-500` fill | 1px ink border | underline `--link-underline` |
| **Hover** | fill → `--blue-600` (5.72:1 ✓), arrow advances 3px | bg → `--ink-900`, text → `--ink-050` | underline thickens 1→2px |
| **Focus-visible** | 2px `--ink-900` ring, 2px offset | same | same |
| **Active** | fill → `--blue-700` (6.97:1 ✓), no transform | bg `--ink-700` | — |
| **Disabled** | `--surface-sunken` fill, `--ink-400` text, `cursor: not-allowed` | same | 50% opacity |
| **Loading** | spinner replaces label, width locked, `aria-busy="true"` | same | — |
| **Visited** | not styled (actions, not documents) | — | — |

**Hover never scales or lifts a button.** Colour and the arrow move; the box does not.
Scaling buttons is the single most template-like interaction on the web.

### Rules

1. **One primary button per viewport.** A screen with two primaries has none.
2. Never a bare "Contact Us" — labels state the action and its cost: *"Book a
   consultation — 30 min"*.
3. Minimum 44×44px hit area even when the visual is smaller (use padding, not size).
4. Icon-only buttons require `aria-label` and a tooltip.
5. Buttons that navigate are `<a>`; buttons that act are `<button>`. Never a `<div>`.
6. Loading state locks the width to prevent layout shift.
7. Arrow icon (`→`) on forward-navigation CTAs only, never on submit actions.

---

## Links

Links must be identifiable without relying on colour (WCAG 1.4.1), so **every inline
link is underlined**.

| Context | Treatment | Hover |
|---|---|---|
| Inline in prose | `--text-link`, 1px `--link-underline`, 3px offset | underline → 2px, colour → `--text-link-alt` |
| Navigation | `--text`, no underline | underline draws left→right, 180ms |
| Standalone / "read more" | `--text` + `→`, no underline | arrow advances 4px, underline appears |
| Card or row (whole area) | invisible link covering the row | rule extends, arrow advances |
| On dark | `--blue-400` (5.87:1 ✓), underlined | → `--blue-300` (8.99:1 ✓) |
| Footer | `--text-muted`, no underline | → `--text`, underline appears |

**Not every link becomes a button.** Buttons are reserved for the CTA tiers above;
everything else is a link. A page of buttons has no hierarchy.

External links carry a small outbound glyph and `rel="noopener"`. Links to PDFs state
the format and size in the label.

---

## J. Navigation System

Implements the structure specified in architecture doc 04 — six primary items,
persistent CTA, mega menus, mobile drill-down.

### Desktop header

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  BizzFly     Services  Industries  Use Cases  Work  Insights  Company        │
│                                                    ⌘K   Book a consultation  │
└──────────────────────────────────────────────────────────────────────────────┘
    72px tall · white · 1px bottom border · condenses to 56px on scroll
```

- **Logo** left, rendered by `BrandLogo` from the official asset in
  `/public/brand/logo`. It is never rebuilt as text or CSS. The supplied lockup is
  reversed (green and white), so the header is a dark brand surface — the only way to
  show the official mark without recolouring it.
- **Six items**, `--text-nav` (15px/500), 32px apart. Each is a real link to its hub.
- **Active section** marked with a 2px `--accent-edge` underline — green on the dark
  header — and it is decorative-adjacent, so contrast is not a text concern.
- **Search** as `⌘K` affordance rather than a magnifier alone — signals a real
  command palette to the technical audience and teaches the shortcut.
- **Primary CTA** — the only filled button in the header.
- On scroll past 120px: height 72→56px, border gains `--elev-1`. Transition
  `--dur-fast`. **The header never hides and re-appears** — direction-sensing headers
  cost orientation on a deep site (principle P11).

### Mega menu — behaviour

| Aspect | Rule |
|---|---|
| Open (mouse) | Hover with **120ms intent delay**; no delay if another panel is already open |
| Open (keyboard) | `Enter`/`Space` on the trigger; `Esc` closes and returns focus |
| Close | Mouse leaves header+panel with 200ms grace, `Esc`, or focus exits |
| Animation | Opacity 0→1 + `translateY(-6px)→0`, `--dur-base`, `--ease-decelerate`. **Height is never animated** (layout thrash) |
| Width | Full-bleed panel, content on `--container` |
| Height | Content-driven, `max-height: calc(100vh - var(--header-height))`, internal scroll if exceeded |
| Backdrop | Page scrim `rgb(13 18 16 / 0.24)`, no blur (cost) |
| Scroll | Page scroll **not** locked on desktop; scrolling closes the panel |
| A11y | `aria-expanded`, `aria-controls`; panel is a `<nav>` with an accessible name; arrow keys move within columns; `Tab` moves between columns |

### Mega menu — composition

Explicitly **not** a grid of cards (brief §06). Four zones:

```
┌─ SERVICES ───────────────────────────────────────────────────────────────────┐
│                                                                              │
│  PRACTICES              POPULAR                 PROGRAMME       FEATURED     │
│  ─────────              ───────                 ─────────       ────────     │
│  01 Search & AI    →    SEO Services            AI Visibility   [ guide ]    │
│     Get found on        AI Search Optimisation  Programme       The Guide to │
│     Google and in       Technical SEO           ───────────     AI Search    │
│     AI answers          Local SEO               Measure and     Optimisation │
│                         AEO · GEO               grow presence                │
│  02 Digital        →                            in AI answers   How brands   │
│     Marketing           Performance Marketing   → Explore       get cited by │
│     Build and           Content Marketing                       ChatGPT and  │
│     convert demand      Conversion Optimisation                 Perplexity   │
│                                                                 → Read       │
│  03 Websites       →    Web Design                                           │
│  04 Software       →    Corporate Websites      ───────────────────────────  │
│  05 AI & Automation→    E-commerce              Free SEO Audit               │
│  06 Data & BI      →    Website Redesign        See what's holding your      │
│                                                 site back → Request          │
│  ──────────────────────────────────────────────────────────────────────────  │
│  View all services →                                                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Column 1** — numbered practice list, mono index, name in Funnel Sans, one-line
definition in `--text-muted`. Hovering a practice **swaps column 2** to that
practice's popular services. Column 1 is the control; column 2 is the detail.

**Column 2** — 4–6 highest-demand services as plain text links, not cards. The full
set lives on the practice hub.

**Column 3** — one packaged programme with a real description and its own CTA.

**Column 4** — one featured resource with a `[ type ]` mono tag, plus a diagnostic
CTA below a rule.

Per-menu variations: **Industries** uses three plain columns + a featured slot;
**Use Cases** groups by outcome family (Grow / Run efficiently / Build); **Work** is a
compact two-column; **Insights** splits Formats / Topics; **Company** splits About /
Careers / Connect.

> **Honest empty state:** until real case studies exist, the Industries featured slot
> shows the *Work by industry* listing link — **never a placeholder case study card**
> (principle P8).

### Mobile navigation

A drill-down stack, authored separately (principle P12).

- Full-screen panel, `--z-modal`, opens in ≤150ms.
- One level at a time. Back row shows the parent name, not a bare chevron.
- **Every level begins with a link to its own hub** — "All Services", "Search & AI
  overview" — so a parent is never an unreachable label.
- Rows are 56px tall, full-width tap targets, hairline separated.
- Level transition: horizontal slide `--dur-base`; under reduced motion, cross-fade.
- Primary CTA pinned to the bottom, always visible above the safe-area inset.
- Focus trap; `Esc` and the close control both exit; body scroll locked; focus returns
  to the trigger.

### Breadcrumbs

`--text-meta` (Poppins Regular 13px), separator `/` in `--ink-400`, current page not a link,
`BreadcrumbList` schema. On mobile, collapse the middle to `…` and keep the immediate
parent — the parent is what people use to go up a level.

### Section sub-navigation

Deep pages (guides, long service pages, case studies) get a sticky in-page nav below
the header: `--z-sticky`, `--text-body-sm`, active item marked with an accent rule,
driven by IntersectionObserver. Hidden below `lg` — on mobile the same content is a
collapsible "On this page" disclosure above the content.

---

## K. Search System

Implements the search experience in architecture doc 04. Client-side Pagefind index
built at build time — zero runtime cost, no external dependency.

### Invocation

- `⌘K` / `Ctrl+K` from anywhere — the affordance is printed in the header.
- `/` also opens (unless focus is in a field).
- Header control, and the mobile nav search row.

### Interface

A centred command palette, `--container-narrow` wide, `--elev-3`, `--radius-lg`,
anchored 12vh from the top so it does not jump on results change.

```
┌────────────────────────────────────────────────────────────┐
│  ⌕  ai search visibility                              ESC  │
├────────────────────────────────────────────────────────────┤
│  SERVICES                                                  │
│  AI Search Optimisation            /services/search-ai…    │
│  Understand how to be visible in AI answers                │
│                                                            │
│  AEO — Answer Engine Optimisation  /services/search-ai…    │
│  Get content used as the direct answer                     │
│                                                            │
│  GUIDES                                                    │
│  The Guide to AI Search Optimisation   /insights/guides…   │
│                                                            │
│  GLOSSARY                                                  │
│  Generative Engine Optimisation        /insights/glossary… │
├────────────────────────────────────────────────────────────┤
│  ↑↓ navigate   ↵ open   esc close        12 results        │
└────────────────────────────────────────────────────────────┘
```

Each result shows **title · category · short description · URL** as required, with the
category as a mono group header rather than a badge on every row.

### Behaviour

- Results after 2 characters, debounced 150ms.
- Grouped by page type, ordered by the boost weights in architecture doc 06:
  Conversion & Service > Industry & Use Case > Case Study > Guide > Blog & Glossary.
- Keyboard: `↑↓` move (wrapping), `↵` open, `⌘↵` new tab, `Esc` close and restore
  focus.
- Filter chips for page type / practice / industry below the input once a query
  exists.
- Recent searches shown on an empty input (localStorage, clearable).
- **Empty state is never bare** — "No matches for *x*", then popular searches, then
  browse-by links, then *Still stuck? Book a consultation*.
- Synonym map from architecture doc 06 applies, including `price`/`cost` →
  `/engagement-models/pricing/` first.
- Fuzzy match at edit distance 1 for terms ≥5 characters.

### Accessibility

`role="dialog"` with `aria-modal`, labelled input, `role="listbox"`/`option` results,
`aria-activedescendant` for the virtual cursor, and a polite live region announcing
the result count. Focus trapped while open, restored on close.

---

## Forms

Per architecture doc 06: the current seven-field form drops City and State, and Phone
becomes optional.

### Field anatomy

```
Label (14px/500, --text)                       Optional (13px, --text-muted)
┌───────────────────────────────────────────────────────────────┐
│  value                                                        │  44px
└───────────────────────────────────────────────────────────────┘
Helper text (13px, --text-muted)  ·or·  ⚠ Error (13px, --error)
```

| Property | Value |
|---|---|
| Height | 44px (`--control-height`), 52px on conversion pages |
| Background | `--surface-sunken` |
| Border | 1px `--border-strong` (3.06:1 ✓) |
| Radius | `--radius-sm` (6px) |
| Focus | 2px `--ink-900` ring, 2px offset, border → `--ink-900` |
| Error | Border → `--error`, message with icon, `aria-invalid`, `aria-describedby` |
| Label | Always visible above the field. **Never a placeholder as a label** |
| Placeholder | Only for format examples, `--ink-500` (6.54:1 ✓) |

### Rules

1. **Validate on blur, not on keystroke.** Errors while typing are hostile.
2. Errors appear inline *and* in a summary at the top for screen readers, with links
   to each field.
3. Required fields marked with the word "required", not only an asterisk.
4. Autocomplete tokens on every field (`name`, `email`, `tel`, `organization`).
5. Submit is disabled only while submitting, never as a validation gate — a disabled
   button with no explanation is a dead end.
6. **Every form states its response commitment**: *"We reply within one business
   day."*
7. Confirmation is a real page, not an alert — it confirms, sets expectations, and
   offers one relevant next read.
8. Hidden fields capture **source page and CTA tier** for the measurement requirement
   in architecture doc 06.
9. Spam handled by honeypot + rate limiting. **No CAPTCHA.**

### Progressive disclosure

Diagnostic forms (`/free-seo-audit/`, `/ai-visibility-assessment/`) ask for **URL +
email only**. Everything else is asked after the value has been delivered. A
seven-field form in front of a free audit converts a fraction of a two-field one.

---

## Component states — the universal requirement

Per principle P8, **every data-driven component specifies five states** and the empty
state is designed, not defaulted:

| State | Requirement |
|---|---|
| **Empty** | Explains why it is empty and what to do instead. Never "No items found." |
| **Loading** | Skeleton matching final layout dimensions — prevents CLS |
| **Partial** | Renders what exists; does not pad with placeholders |
| **Full** | The designed state |
| **Error** | Plain language, a retry, and a route onward |

Applied concretely: the Work hub with zero published case studies shows the case study
*model* — what BizzFly publishes and why, plus a link to `/process/` — not eleven grey
rectangles.
