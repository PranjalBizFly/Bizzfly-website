interface IconProps {
  className?: string;
}

/**
 * Search — a magnifier, drawn on the same 16px grid and with the same stroke
 * as components/navigation/Chevron.tsx so the drawer's marks read as one set.
 *
 * It replaces the "&#9906;" character (U+26B2, NEUTER) that stood in for a
 * magnifier here. That was never an icon: it is a letterform, so it sat on
 * the text baseline rather than the optical centre of its button, it took its
 * weight and width from whatever font the platform fell back to — neither
 * brand family carries it — and on several Android builds it rendered as a
 * tofu box. A stroked path is the same mark on every device, aligns to the
 * label beside it, and picks up `currentColor` from the control.
 *
 * The geometry is BizzFly's: a true circle, a 45&deg; handle leaving the rim
 * on the tangent, and round caps and joins matching the chevron's 1.75 stroke.
 * Nothing is tapered or tilted — the house marks are geometric, not drawn.
 */
export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="7.25" cy="7.25" r="4.25" />
      <path d="m10.5 10.5 3 3" />
    </svg>
  );
}

/**
 * Home — the second of the drawer's two quick actions. Same grid, same
 * stroke, so it sits beside the magnifier without either looking heavier.
 */
export function HomeIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.75 7 8 2.9 13.25 7v6.25H2.75Z" />
    </svg>
  );
}
