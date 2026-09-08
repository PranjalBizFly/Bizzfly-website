import type { CSSProperties, ReactNode } from "react";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  /**
   * Accessible name for the track. The visible copy is a real list, so the
   * label is what a screen reader announces before reading it.
   */
  label: string;
  /** Seconds for one full pass. A longer track wants a longer duration. */
  duration?: number;
  /** Right-to-left instead of left-to-right. */
  reverse?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A continuously scrolling band.
 *
 * The motion is CSS only — no timer, no client component, nothing in the
 * bundle. The track is rendered twice and translated by exactly half its
 * width, which is what makes the loop seamless: at -50% the second copy sits
 * precisely where the first one started.
 *
 * The clone is `aria-hidden` and `inert`, so the content is announced once
 * and no link inside it can take focus. Hover and focus-within pause the
 * animation, so a visitor can stop the band to read or click it, and
 * prefers-reduced-motion replaces the animation with an ordinary horizontal
 * scroller rather than removing the content.
 */
export function Marquee({
  label,
  duration = 40,
  reverse = false,
  className = "",
  children,
}: MarqueeProps) {
  return (
    <div
      className={`${styles.marquee} ${reverse ? styles.reverse : ""} ${className}`.trim()}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className={styles.track}>
        <ul className={styles.run} aria-label={label}>
          {children}
        </ul>
        <ul className={styles.run} aria-hidden="true" inert>
          {children}
        </ul>
      </div>
    </div>
  );
}

interface MarqueeItemProps {
  className?: string;
  children: ReactNode;
}

/** One cell in the band. Kept separate so the <li> is never forgotten. */
export function MarqueeItem({ className = "", children }: MarqueeItemProps) {
  return <li className={`${styles.item} ${className}`.trim()}>{children}</li>;
}
