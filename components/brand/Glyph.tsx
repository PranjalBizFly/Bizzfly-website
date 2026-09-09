interface GlyphProps {
  /** Rendered size. Any CSS length; defaults to the surrounding font size. */
  size?: string;
  className?: string;
  /**
   * Give the mark a label only where it carries meaning on its own. It is
   * decorative in almost every position it is used, and an announced "star"
   * before every list item is noise.
   */
  title?: string;
}

/**
 * The BizzFly glyph — a small four-point mark used as a recurring accent.
 *
 * NEW ARTWORK, not the logo. The symbol's centre is a pair of opposed lens
 * forms meeting at a waist, and this takes that geometry — concave sides,
 * points pulled to a taper — into a mark small enough to sit inline at 12px.
 * The vertical axis is longer than the horizontal, which is what keeps it
 * reading as BizzFly's lens rather than as the generic four-point sparkle
 * that every AI product now uses.
 *
 * It is deliberately DERIVED rather than extracted: cutting a piece out of
 * the official lockup and using it as a bullet is logo misuse, and the brand
 * suite asserts against exactly that. Nothing here is taken from the artwork
 * on disk.
 *
 * Drawn in `currentColor`, so it takes the accent, the muted tone or the
 * inverse text colour from whatever it is placed in without a prop.
 */
export function Glyph({ size = "1em", className = "", title }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      focusable="false"
      {...(title
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": "true" as const })}
    >
      <path d="M12 0 Q13.4 8.6 21 12 Q13.4 15.4 12 24 Q10.6 15.4 3 12 Q10.6 8.6 12 0 Z" />
    </svg>
  );
}
