import { Heading, BodyText, Eyebrow } from "@/components/typography";
import styles from "./Sections.module.css";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Asymmetric 5/7 — heading left, lead right. The editorial default. */
  split?: boolean;
  /**
   * Centred, with the lead stacked beneath on a narrow measure.
   *
   * For sections whose content is a grid of cards rather than an argument:
   * a card wall is symmetrical, and a left-weighted header above it leaves
   * the eye starting in the wrong place. Editorial sections keep `split`.
   * Ignored when `split` is also set.
   */
  centred?: boolean;
  level?: 2 | 3;
  inverse?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  split = false,
  centred = false,
  level = 2,
}: SectionHeaderProps) {
  const heading = (
    <div className={styles.header}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading level={level} size={level === 2 ? "h2" : "h3"}>
        {title}
      </Heading>
    </div>
  );

  if (centred && !split) {
    return (
      <div className={styles.headerCentred}>
        {heading}
        {lead ? (
          <BodyText size="lg" className={styles.headerLead}>
            {lead}
          </BodyText>
        ) : null}
      </div>
    );
  }

  if (!split) {
    return (
      <div>
        {heading}
        {lead ? (
          <BodyText size="lg" className={styles.headerLead}>
            {lead}
          </BodyText>
        ) : null}
      </div>
    );
  }

  return (
    <div className={styles.headerSplit}>
      {heading}
      {lead ? (
        <BodyText size="lg" className={styles.headerLead}>
          {lead}
        </BodyText>
      ) : null}
    </div>
  );
}
