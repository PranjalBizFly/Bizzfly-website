import styles from "./Chevron.module.css";

interface ChevronProps {
  /** Drives the rotation. Comes from React state, never from :hover. */
  open: boolean;
  className?: string;
}

/**
 * The disclosure indicator for every menu trigger — header and drawer alike.
 *
 * A real SVG rather than the "▾" character it replaces. The glyph was not
 * decoration that happened to be text: it sat on the text baseline, so its
 * optical centre was above the box centre and rotating it 180° swung the
 * mark sideways instead of flipping it in place. Font fallback also moved it
 * — the arrow is not in either brand family, so it came from whatever the
 * system supplied, at a different weight and width per platform.
 *
 * The path is drawn centred in its own 16px box, which is what makes
 * `rotate(180deg)` read as down-becomes-up. The box is a fixed size and the
 * transform is not a layout property, so the label beside it never moves.
 */
export function Chevron({ open, className }: ChevronProps) {
  return (
    <svg
      className={[styles.chevron, className].filter(Boolean).join(" ")}
      data-open={open}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      /* Decorative: the button's own aria-expanded carries the state. */
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 6.5 8 10.5 12 6.5" />
    </svg>
  );
}
