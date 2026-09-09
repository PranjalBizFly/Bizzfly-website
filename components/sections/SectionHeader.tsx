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

/**
 * The section header — eyebrow, heading, lead — in the three compositions the
 * page types use.
 *
 * It also owns the gap to whatever follows it. That used to be split between
 * this component's bottom margin and each content block's top margin, which
 * meant the header-to-content distance was a sum of two independent numbers:
 * 96px under the showcase and insight grids, 80px under the figures band,
 * 48px under every split section. One relationship, three values, none of
 * them chosen. Content blocks now set no top margin and this sets
 * --gap-header, so the distance is one token everywhere on the site.
 */
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
      <Heading
        level={level}
        size={level === 2 ? "h2" : "h3"}
        className={styles.headerTitle}
      >
        {title}
      </Heading>
    </div>
  );

  const leadText = lead ? (
    <BodyText size="lg" className={styles.headerLead}>
      {lead}
    </BodyText>
  ) : null;

  if (split) {
    return (
      <div className={styles.headerSplit}>
        {heading}
        {leadText}
      </div>
    );
  }

  return (
    <div
      className={`${styles.headerStack} ${centred ? styles.headerCentred : ""}`.trim()}
    >
      {heading}
      {leadText}
    </div>
  );
}
