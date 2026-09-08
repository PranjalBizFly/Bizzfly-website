import Image from "next/image";
import styles from "./BrandLogo.module.css";

/**
 * The BizzFly logo.
 *
 * This is the only component permitted to render the mark. It loads official
 * artwork from /public/brand/logo and never reconstructs it: no text
 * substitute, no CSS shapes, no recolouring, no inline path data.
 *
 * Two rules from the brand guidelines are enforced here rather than left to
 * callers, because a rule that every call site has to remember is a rule that
 * eventually gets broken:
 *
 *   Aspect ratio  Callers choose a height. Width is derived from the
 *                 intrinsic size, so the mark cannot be stretched.
 *   Clearspace    Equal to the cap height of the logotype, which measures
 *                 0.773 of the mark height in the official artwork. Applied
 *                 as padding scaled from the rendered height, so it stays
 *                 correct at any size.
 *
 * The minimum digital size (30px) is the default height rather than a
 * runtime check — there is no size below it to fall back to.
 */

/** Which official file backs each variant, and its intrinsic size. */
const ASSETS = {
  /**
   * The primary lockup (guidelines p.2): "Bizz" in brand green, "fly" and
   * the symbol plate in brand blue, with the star knocked out of the plate.
   * The knockout is what makes this a light-surface logo — the star takes
   * the colour of whatever is behind it.
   */
  primary: { src: "/brand/logo/bizzfly-logo.svg", width: 634, height: 144 },
  /**
   * The reversed lockup (p.3): "Bizz" in green, "fly" and the plate in
   * white. For BizzFly Blue and other dark grounds.
   */
  reversed: { src: "/brand/logo/bizzfly-logo-reversed.svg", width: 634, height: 144 },
  /** For BizzFly Green grounds (p.6) — the whole lockup in brand blue. */
  "on-green": { src: "/brand/logo/bizzfly-logo-on-green.svg", width: 634, height: 144 },
  /** Single-colour lockups, for print and one-colour partner placements. */
  "mono-black": { src: "/brand/logo/bizzfly-logo-mono-black.svg", width: 634, height: 144 },
  "mono-white": { src: "/brand/logo/bizzfly-logo-mono-white.svg", width: 634, height: 144 },
  /** The symbol alone, for square contexts. Same two polarities. */
  symbol: { src: "/brand/logo/bizzfly-symbol.svg", width: 143, height: 143 },
  "symbol-reversed": { src: "/brand/logo/bizzfly-symbol-reversed.svg", width: 143, height: 143 },
} as const;

export type BrandLogoVariant = keyof typeof ASSETS;

/**
 * The two polarity-sensitive pairs, and which asset serves which ground.
 *
 * Polarity is a property of the surface, not of the call site. Asking every
 * placement to name a variant is how the wrong one ends up shipped: the
 * header carried the reversed lockup onto brand ink, where the star knocks
 * out to near-black and the mark stops reading as the logo at all.
 *
 * "auto" hands that decision to CSS, which is the only thing that knows the
 * active theme and whether an `.is-inverse` section is in scope. Both files
 * are emitted and one is hidden; they are ~2KB each and identical in
 * geometry, so nothing about the layout depends on which one wins.
 */
const PAIRS = {
  auto: { light: "primary", dark: "reversed" },
  "auto-symbol": { light: "symbol", dark: "symbol-reversed" },
} as const;

export type BrandLogoPolarity = keyof typeof PAIRS;

interface BrandLogoProps {
  /**
   * Defaults to "auto": the primary lockup on light ground, the reversed
   * lockup on dark ground or in the dark theme. Name a variant explicitly
   * only where the ground is fixed and known — an on-green panel, a
   * one-colour placement.
   */
  variant?: BrandLogoVariant | BrandLogoPolarity;
  /**
   * Rendered height. Any CSS length; defaults to --logo-height (30px), the
   * brand minimum for digital.
   */
  height?: string;
  /**
   * Accessible name. Pass "" when the logo sits inside an already-labelled
   * link, so the name is not announced twice.
   */
  alt?: string;
  /** Reserve the full clearspace around the mark. On by default. */
  clearspace?: boolean;
  priority?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = "auto",
  height,
  alt = "BizzFly",
  clearspace = true,
  priority = false,
  className,
}: BrandLogoProps) {
  const wrap = [styles.wrap, clearspace ? styles.clearspace : "", className]
    .filter(Boolean)
    .join(" ");
  const style = height
    ? ({ "--logo-size": height } as React.CSSProperties)
    : undefined;

  const mark = (key: BrandLogoVariant, extra?: string) => {
    const asset = ASSETS[key];
    return (
      <Image
        key={key}
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={alt}
        priority={priority}
        className={[styles.mark, extra].filter(Boolean).join(" ")}
      />
    );
  };

  if (variant in PAIRS) {
    const pair = PAIRS[variant as BrandLogoPolarity];
    return (
      <span className={wrap} style={style}>
        {mark(pair.light, styles.onLight)}
        {mark(pair.dark, styles.onDark)}
      </span>
    );
  }

  return (
    <span className={wrap} style={style}>
      {mark(variant as BrandLogoVariant)}
    </span>
  );
}
