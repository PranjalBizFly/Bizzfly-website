import styles from "./ReadingProgress.module.css";

/**
 * Reading progress indicator for long-form pages.
 *
 * Pure CSS via a scroll-driven animation — no JavaScript, no scroll listener,
 * and no main-thread work. Guarded by @supports, so browsers without
 * scroll-driven animations simply do not render the bar rather than falling
 * back to a JS implementation.
 *
 * Decorative: it conveys no information that is not already available from
 * the scrollbar, so it is hidden from assistive technology.
 */
export function ReadingProgress() {
  return <div className={styles.track} aria-hidden="true" />;
}
