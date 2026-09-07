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

/** Which official file backs each variant. */
const ASSETS = {
  /**
   * The lockup as published: "Bizz" in brand green, "fly" and the symbol
   * plate in white. Legible only on a dark surface.
   */
  reversed: {
    src: "/brand/logo/bizzfly-logo-reversed.svg",
    width: 634,
    height: 144,
  },
  /** The symbol alone, for square contexts. Also reversed. */
  "symbol-reversed": {
    src: "/brand/logo/bizzfly-symbol-reversed.svg",
    width: 143,
    height: 143,
  },
  /**
   * The positive lockup for light surfaces. NOT YET SUPPLIED — see
   * public/brand/README.md. The path is fixed so that dropping the official
   * file at it is the only step needed; nothing here should be filled in by
   * recolouring the reversed artwork.
   */
  positive: {
    src: "/brand/logo/bizzfly-logo.svg",
    width: 634,
    height: 144,
    missing: true,
  },
} as const;

export type BrandLogoVariant = keyof typeof ASSETS;

interface BrandLogoProps {
  /** Defaults to the reversed lockup, the only full lockup supplied. */
  variant?: BrandLogoVariant;
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
  variant = "reversed",
  height,
  alt = "BizzFly",
  clearspace = true,
  priority = false,
  className,
}: BrandLogoProps) {
  const asset = ASSETS[variant];

  /*
   * A variant with no official file must not degrade quietly into a broken
   * image or, worse, the wrong-polarity logo. In development that is a hard
   * error so it surfaces immediately; in production the mark is omitted and
   * the accessible name carries the brand, because shipping a broken logo is
   * worse than shipping none.
   */
  if ("missing" in asset && asset.missing) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `BrandLogo: the "${variant}" variant has no official asset yet. ` +
          `Expected a file at public${asset.src}. Do not substitute a ` +
          `recoloured version of another variant — see public/brand/README.md.`,
      );
    }
    return <span className={className}>{alt}</span>;
  }

  return (
    <span
      className={[styles.wrap, clearspace ? styles.clearspace : "", className]
        .filter(Boolean)
        .join(" ")}
      style={height ? ({ "--logo-size": height } as React.CSSProperties) : undefined}
    >
      <Image
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={alt}
        priority={priority}
        className={styles.mark}
      />
    </span>
  );
}
