import { Marquee, MarqueeItem } from "@/components/motion";
import { Glyph } from "@/components/brand/Glyph";
import { valuePropositions } from "@/content/navigation";
import styles from "./ValueTicker.module.css";

/**
 * A thin band of positioning statements above the header.
 *
 * It sits BEFORE the header in the document, and the header is sticky, so
 * the strip scrolls away on the first gesture and never occupies the fixed
 * chrome. That is the whole reason it is affordable: a permanently pinned
 * promotional bar costs every page a slice of viewport on every screen, and
 * this one costs a reader nothing after they have scrolled past it.
 *
 * No new machinery. It reuses Marquee, which is CSS-only, ships nothing to
 * the bundle, pauses on hover and focus, and degrades to an ordinary
 * horizontal scroller under prefers-reduced-motion — so the statements stay
 * readable for someone who has asked the movement to stop.
 *
 * The glyph separates the statements rather than a bullet or a slash. It is
 * the one place the mark is doing structural work rather than decoration,
 * which is what stops it becoming wallpaper everywhere else it appears.
 */
export function ValueTicker() {
  return (
    <div className={styles.band}>
      <Marquee label="What BizzFly does" duration={64}>
        {valuePropositions.map((line) => (
          <MarqueeItem key={line}>
            <span className={styles.item}>
              <Glyph className={styles.glyph} size="0.7em" />
              <span className={styles.text}>{line}</span>
            </span>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}
