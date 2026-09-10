import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Reveal } from "@/components/motion";
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
  /**
   * Opt out of the scroll reveal.
   *
   * For a header inside something that already animates as one piece — a
   * hero, or a block with its own entrance — where revealing the header
   * separately would break the composition into two arrivals.
   */
  reveal?: boolean;
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
 *
 * It also owns the section's arrival. Every band on the site opens with one
 * of these, so revealing here is what makes scrolling a hub or entity page
 * feel like scrolling the homepage — one decision, on every page, instead of
 * a wrapper repeated in fifteen page files and forgotten in the sixteenth.
 * The reveal is a CSS transition behind a one-shot IntersectionObserver, and
 * content renders visible by default, so nothing here can hide a heading
 * from a reader whose JavaScript failed or from a crawler that runs none.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  split = false,
  centred = false,
  level = 2,
  reveal = true,
}: SectionHeaderProps) {
  const heading = (
    <div className={styles.header}>
      {eyebrow ? (
        <Eyebrow className={styles.headerEyebrow}>{eyebrow}</Eyebrow>
      ) : null}
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

  const className = split
    ? styles.headerSplit
    : `${styles.headerStack} ${centred ? styles.headerCentred : ""}`.trim();

  /*
   * The reveal wrapper IS the layout element rather than a div around it —
   * Reveal puts both classes on one node — so the 5/7 split grid and the
   * header's own bottom gap are unchanged whether or not it animates.
   */
  if (!reveal) {
    return (
      <div className={className}>
        {heading}
        {leadText}
      </div>
    );
  }

  return (
    <Reveal className={className}>
      {heading}
      {leadText}
    </Reveal>
  );
}
