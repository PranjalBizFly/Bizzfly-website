/**
 * Brand colours for the three contexts that cannot read CSS custom
 * properties.
 *
 * styles/tokens.css is the source of truth for the design system. These
 * literals are a mirror of it, and exist only because three renderers have
 * no stylesheet to read from:
 *
 *   - app/og/route.tsx        Satori renders to an image; no CSS variables.
 *   - app/global-error.tsx    Replaces <html>, so no stylesheet is loaded.
 *   - app/layout.tsx          themeColor metadata must be a literal.
 *
 * Keeping them here means the brand palette still appears in exactly two
 * files rather than being scattered across components. If a value changes
 * in tokens.css, change it here too — docs/design-system/verify-contrast.mjs
 * asserts that these two stay in agreement.
 */
export const brand = {
  /** #0D1420 — ink-900. 18.45:1 with inkLight. */
  ink: "#0D1420",
  /** #F5F7FA — ink-050. Text on ink. */
  inkLight: "#F5F7FA",
  /** #A9B4C4 — ink-250. Muted text on ink, 8.80:1. */
  inkMuted: "#A9B4C4",
  /** #2C70D1 — BizzFly Blue. Primary. 4.83:1 with white. */
  blue: "#2C70D1",
  /** #A9CF46 — BizzFly Green. 10.28:1 on ink, so it is the accent on dark. */
  green: "#A9CF46",
  /** #2A1ED1 — Deep Electric Blue. Secondary surface, 9.52:1 with white. */
  deepBlue: "#2A1ED1",
  white: "#FFFFFF",
  /**
   * ink-050 at 16% — the hairline rule on a dark ground, mirroring
   * --border-inverse in tokens.css. Present so the OG card does not have to
   * write an rgba() literal of its own.
   */
  borderInverse: "rgba(245,247,250,0.16)",
} as const;
