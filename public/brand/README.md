# BizzFly brand assets

Every file here is official artwork. Nothing in this directory was drawn,
traced, approximated, recoloured or reconstructed. Components reference these
paths through `components/brand/BrandLogo.tsx` — no component embeds logo
geometry of its own, and no logo is ever built out of text or CSS.

## Provenance

All logo files come from the supplied brand package, `Bizzfly Brand
Guidelines/Logo/SVG/` (`Bizzfly-01.svg` … `Bizzfly-21.svg`), and the icons
from `Bizzfly Brand Guidelines/App icons, or Favicon/`. Three mechanical
transformations were applied, and nothing else:

1. The full-bleed background rectangle was dropped from the variants that
   carry one, so the artwork is transparent and can sit on a real surface.
2. The `class="cls-N"` / `<style>` indirection was flattened to `fill`
   attributes with the identical hex values, so the files carry no CSS that
   could collide once inlined.
3. The viewBox was cropped to the artwork's own bounding box, via a single
   `translate(-223.47, -468.4035)` on the 1080-square original.

Path data, colours and proportions are unchanged. Every variant shares one
crop, so any two are drop-in interchangeable at the same rendered size.

## What is present

| File | Source | Use |
|---|---|---|
| `logo/bizzfly-logo.svg` | `Bizzfly-01` | **The primary lockup.** "Bizz" green, "fly" and plate blue. Light surfaces. |
| `logo/bizzfly-logo-reversed.svg` | `Bizzfly-02` | "Bizz" green, "fly" and plate white. BizzFly Blue and dark surfaces. |
| `logo/bizzfly-logo-on-green.svg` | `Bizzfly-03` | The whole lockup in blue, for BizzFly Green surfaces (guidelines p.6). |
| `logo/bizzfly-logo-mono-black.svg` | `Bizzfly-04` | Single-colour, black. Print, engraving, one-colour partner placements. |
| `logo/bizzfly-logo-mono-white.svg` | `Bizzfly-05` | Single-colour, white. |
| `logo/bizzfly-symbol.svg` | `Bizzfly-01` | The symbol alone, positive. Square contexts on light surfaces. |
| `logo/bizzfly-symbol-reversed.svg` | `Bizzfly-02` | The symbol alone, reversed. Square contexts on dark surfaces. |
| `favicon/icon.svg`, `favicon/apple-icon.svg` | `favicon-01` | The official app icon — the mark on a white rounded square. Mirrored at `app/icon.svg` and `app/apple-icon.svg`, which is where Next.js reads them from. |

Lockups are `634 × 144`; symbols are `143.1 × 143.1`.

## Polarity is a property of the surface

The star is **knocked out** of the symbol plate — it is a hole, not a white
shape, so it takes the colour of whatever sits behind it. That is what makes
the two lockups non-interchangeable:

- **Primary** on a light ground: the star reads white, the mark reads as the
  logo. On brand ink the star fills with near-black and "fly" nearly
  disappears.
- **Reversed** on BizzFly Blue or a dark ground: the plate reads white and
  the star takes the ground.

Because that decision depends on the surface rather than on the call site,
`BrandLogo` defaults to `variant="auto"` and lets CSS resolve it: anything
inside `.is-inverse` or in the dark theme gets the reversed lockup, and
everything else gets the primary one. Call sites should not name a polarity
unless the ground is fixed and known — an on-green panel, a one-colour
placement.

## What is missing — do not substitute

| Expected path | What is needed |
|---|---|
| `social/og-default.png` | `1200 × 630` social card. Until supplied, `app/og/route.tsx` generates cards from the design tokens |
| `icons/` | Any bespoke brand iconography. Empty by design — the site uses no icon font and draws UI affordances from text and CSS |

Do not fill a missing slot by recolouring an existing variant; the full
package has 21 official lockups, and the one you need is almost certainly
among them.

## Rules that are enforced elsewhere

- Clearspace equals the cap height of the logotype — `0.773 ×` the rendered
  logo height. Encoded as `--logo-clearspace-ratio` in `styles/tokens.css`
  and applied by `BrandLogo`, so it scales with the logo automatically.
- Minimum digital size is 30px tall, encoded as `--logo-min-height`.
- The logo is never stretched: `BrandLogo` sets a height and leaves width
  automatic, so the aspect ratio cannot be altered by a caller.
