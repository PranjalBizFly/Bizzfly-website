# BizzFly brand assets

Every file here is official artwork. Nothing in this directory was drawn,
traced, approximated, recoloured or reconstructed. Components reference these
paths through `components/brand/BrandLogo.tsx` — no component embeds logo
geometry of its own, and no logo is ever built out of text or CSS.

## What is present

| File | Provenance | Use |
|---|---|---|
| `logo/bizzfly-logo-reversed.svg` | Official lockup, byte-for-byte as published by BizzFly (`634 × 144`) | The logo on dark surfaces |
| `logo/bizzfly-symbol-reversed.svg` | The two symbol paths from that same file, lifted verbatim, with the viewBox cropped to the symbol square (`143.1 × 143.1`) measured from the artwork. Path data and fills unaltered. | Square contexts where the full lockup would be illegible |
| `favicon/icon.svg`, `favicon/apple-icon.svg` | The official symbol above, placed on the brand ink square. Nothing redrawn. | Browser and home-screen icons (mirrored at `app/icon.svg` and `app/apple-icon.svg`, which is where Next.js reads them from) |

## Colour composition of the official lockup

Measured from the artwork, not assumed:

- **"Bizz"** and the star inside the symbol — BizzFly Green `#A9CF46`
- **"fly"** and the symbol's plate — **white**

This matters: the supplied lockup is a **reversed (on-dark) logo**. On a white
background the symbol and the letters "fly" disappear and the mark reads as a
broken "Bizz". It has been verified to render correctly on brand ink and on
BizzFly Blue. That is why the site header uses a dark brand surface — it is
the only way to show the official asset without altering it.

## What is missing — do not substitute

These slots are referenced by `BrandLogo` but have no official file yet. They
must be supplied from the brand-guideline package. **Do not fill them by
recolouring the reversed logo** — that is explicitly outside the guidelines.

| Expected path | What is needed |
|---|---|
| `logo/bizzfly-logo.svg` | The positive (on-light) lockup — the version whose "fly" and symbol plate are dark rather than white |
| `logo/bizzfly-logo-mono.svg` | Single-colour lockup for print, faxes, engraving and one-colour partner placements |
| `logo/bizzfly-symbol.svg` | Positive (on-light) symbol |
| `social/og-default.png` | `1200 × 630` social card. Until supplied, `app/og/route.tsx` generates cards from the design tokens |
| `icons/` | Any bespoke brand iconography. Empty by design — the site currently uses no icon font and draws UI affordances from text and CSS |

`BrandLogo` fails loudly in development if asked for a variant whose asset is
absent, rather than rendering a broken image or silently swapping in the wrong
one. See `components/brand/BrandLogo.tsx`.

## Rules that are enforced elsewhere

- Clearspace equals the cap height of the logotype — `0.773 ×` the rendered
  logo height. Encoded as `--logo-clearspace-ratio` in `styles/tokens.css`
  and applied by `BrandLogo`, so it scales with the logo automatically.
- Minimum digital size is 30px tall, encoded as `--logo-min-height`.
- The logo is never stretched: `BrandLogo` sets a height and leaves width
  automatic, so the aspect ratio cannot be altered by a caller.
