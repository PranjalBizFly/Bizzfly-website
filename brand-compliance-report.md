# BizzFly brand compliance report

Generated 2026-09-08 by `npm run verify:brand`.
Source of truth: **Bizzfly Brand Guidelines.pdf**.

## Summary

| Area | Status |
|---|---|
| Colour | ✅ Compliant |
| Typography | ✅ Compliant |
| Logo | ✅ Compliant |
| Logo clearspace | ✅ Compliant |
| Logo misuse | ✅ Compliant |
| Logo background | ✅ Compliant |
| Favicon | ✅ Compliant |
| Buttons | ✅ Compliant |
| Navigation | ✅ Compliant |
| Icons | ✅ Compliant |
| Components | ✅ Compliant |
| Responsive | ✅ Compliant |
| Accessibility | ✅ Compliant |
| Imagery | ✅ Compliant |

**14 violation(s) found and fixed** in this audit pass.
**0 outstanding**, **6 item(s)** requiring manual review.

## Colour

| Role | Hex | Status |
|---|---|---|
| primary blue | `#2C70D1` | ✅ present in `styles/tokens.css`, unmodified |
| primary green | `#A9CF46` | ✅ present in `styles/tokens.css`, unmodified |
| secondary blue | `#2A1ED1` | ✅ present in `styles/tokens.css`, unmodified |
| secondary green | `#40E523` | ✅ present in `styles/tokens.css`, unmodified |

Raw colour values are permitted in exactly two files — `styles/tokens.css`
(the authority) and `lib/brand.ts` (the mirror for the OG renderer, the
global error boundary and `themeColor`, none of which can read CSS custom
properties). Every other file must reach a colour through a token.

## Typography

| Role | Family | Status |
|---|---|---|
| Display, H1–H4, metrics, quotes | Funnel Sans SemiBold (600) | ✅ |
| Body, UI, navigation, buttons | Poppins Regular/Medium/Bold | ✅ |
| Eyebrows, meta, labels, indices | Poppins via `--font-label` | ✅ |
| Machine strings (error digest) | system monospace stack | ✅ no webfont |

## Outstanding violations

_None._


## Fixed in this audit pass

| File | Line | Violation | Current | Required | Status |
|---|---|---|---|---|---|
| `app/layout.tsx + 30 stylesheets` | — | A third typeface. IBM Plex Mono was loaded as a webfont and used for eyebrows, meta lines, metric labels, section indices, breadcrumbs, nav and search chrome — 70 declarations across 30 files. The guidelines specify exactly two families. | `IBM Plex Mono (webfont) via --font-mono` | Poppins via --font-label; --font-mono reduced to a system stack for machine strings | FIXED |
| `components/navigation/Header.module.css` | 67 | The header logo reserved no trailing clearspace. Separation from the nav came from the flex gap alone — 12px against the 23.2px the cap height requires. | `gap: var(--space-3) only (12px)` | padding-inline-end: var(--logo-clearspace) (23.2px) | FIXED |
| `components/navigation/MobileNav.module.css` | 32 | The mobile drawer logo sat 16px from the close button, under the 23.2px required. | `gap: var(--space-4) only (16px)` | padding-inline-end: var(--logo-clearspace) (23.2px) | FIXED |
| `styles/tokens.css` | — | The base page margin was 20px, and the header logo sits at the leading container edge — so below 480px the logo had 20px of leading clearspace against the 23.2px required. | `--margin: 1.25rem (20px)` | --margin: 1.5rem (24px) | FIXED |
| `components/navigation/Header.module.css` | 284 | The header CTA was meant to be hidden below 768px and never was. `.headerCta { display: none }` tied on specificity with Button.module.css's `.base { display: inline-flex }`, and a tie is settled by CSS-module bundle order — Button won. The bar therefore overflowed by 53px at 320px, 14px at 360px and 2px at 375px, on every one of the 176 pages. | `.headerCta { display: none } (one class, lost the tie)` | .actions .headerCta { display: none } (two classes, wins in any order) | FIXED |
| `styles/tokens.css + components/footer/Footer.module.css` | — | The 40px footer mark needs 30.9px of clearspace, but the page gutter below 768px is 24px. The footer pulls the clearspace back by a negative margin to align the artwork with the address, so the reserved space landed at -7px — outside the viewport, leaving the mark closer to the screen edge than the guidelines permit. | `--logo-height-footer: 2.5rem at every width` | 1.875rem (the 30px brand minimum) below 768px, 2.5rem from 768px up | FIXED |
| `components/search/SearchDialog.module.css` | 5 | The modal scrim was rgb(13 18 16 / 0.4) — #0D1210, a green-black that is not in the palette and was a few units off the ink it was meant to be. | `rgb(13 18 16 / 0.4)` | var(--scrim-strong), derived from ink-900 | FIXED |
| `components/navigation/Header.module.css` | 539 | The menu scrim was written as a raw rgb() rather than a token. | `rgb(13 20 32 / 0.32)` | var(--scrim) | FIXED |
| `app/og/route.tsx` | 107 | The OG card border was a raw rgba() literal. | `rgba(245,247,250,0.16)` | brand.borderInverse from lib/brand.ts | FIXED |
| `components/navigation/Header.module.css` | 195 | The nav active-state mark used an off-scale 1px radius. | `border-radius: 1px` | var(--radius-full) | FIXED |
| `components/search/SearchDialog.module.css` | 38 | The full-screen sheet zeroed its radius with a literal. | `border-radius: 0` | var(--radius-0) | FIXED |
| `components/sections/Diagram.module.css` | 52 | A diagram label set its weight with a literal. | `font-weight: 500` | var(--weight-medium) | FIXED |
| `app/error.module.css, app/technologies/technologies.module.css, components/navigation/Header.module.css` | — | Inline code, status markers and the nav chevron sized themselves with bare em literals outside the type scale. | `font-size: 0.9em / 0.6em` | var(--text-inline) / var(--text-glyph) | FIXED |
| `components/forms/Form.module.css, components/search/*.module.css, components/navigation/MobileNav.module.css` | — | Input and icon-button sizes were literals rather than scale tokens. | `font-size: 1rem / 1.125rem` | var(--text-body) / var(--text-icon) | FIXED |


## Manual review

### Logo — `public/brand/logo/bizzfly-logo.svg`

[OFFICIAL_LOGO_ASSET_REQUIRED] The positive (on-light) lockup has not been supplied. Only the reversed artwork exists, which is why the header and the mobile drawer are dark surfaces in both themes. Recolouring the reversed file to fill this slot is prohibited by the guidelines, so the constraint stands until the official file arrives.

### Logo — `public/brand/logo/bizzfly-logo-mono.svg`

[OFFICIAL_LOGO_ASSET_REQUIRED] Single-colour lockup absent. Not referenced by the site today.

### Responsive — `320–1920px`

Layout at the twelve target viewports is measured in real Chrome by `npm run verify:responsive`, not here — overflow, sub-12px text and target size need a rendered page, which a static scan cannot produce.

### Accessibility — `contrast`

The 96 numeric WCAG assertions live in docs/design-system/verify-contrast.mjs. This check only confirms the mechanisms exist that brand edits tend to break.

### Imagery — `site-wide`

No photographic imagery is currently used. Any future photography must be judged by eye against guideline section 23 — technology, digital growth, AI and automation subjects, no generic stock.

### Logo background — `header, mobile drawer, footer`

Contrast of the reversed lockup against its ground is asserted numerically by verify-contrast.mjs, but the optical result on the condensed, blurred header needs a human check at each breakpoint.

