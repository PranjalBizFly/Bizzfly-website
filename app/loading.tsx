import { Section } from "@/components/layout/Section";
import styles from "./loading.module.css";

/**
 * Route loading state.
 *
 * A skeleton matching the real page rhythm — hero, then content rows — so the
 * transition does not shift layout when content arrives.
 */
export default function Loading() {
  return (
    <Section spacing="lg" aria-busy="true" aria-label="Loading">
      <span className="sr-only">Loading page</span>
      <div className={styles.skeleton}>
        <div className={styles.eyebrow} />
        <div className={styles.title} />
        <div className={styles.titleShort} />
        <div className={styles.lead} />
        <div className={styles.leadShort} />
        <div className={styles.rule} />
        <div className={styles.rows}>
          <div className={styles.row} />
          <div className={styles.row} />
          <div className={styles.row} />
        </div>
      </div>
    </Section>
  );
}
