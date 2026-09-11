import type { ReactNode } from "react";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Reveal, Cascade } from "@/components/motion";
import styles from "./Sections.module.css";

interface EditorialBlockProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Mono-indexed evidence list beside the statement. */
  evidence?: string[];
  actions?: ReactNode;
  level?: 2 | 3;
}

/**
 * S-09 Statement + Evidence. The core editorial section.
 *
 * The statement rises as one piece and the evidence counts in beneath it,
 * which is the order the section is read in — the claim, then what backs it.
 * Two observers per block, no extra markup, and the list stays a list.
 */
export function EditorialBlock({
  eyebrow,
  title,
  lead,
  evidence,
  actions,
  level = 2,
}: EditorialBlockProps) {
  const hasEvidence = Boolean(evidence?.length);

  const heading = (
    <div className={styles.header}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading level={level} size="h2" className={styles.statementTitle}>
        {title}
      </Heading>
    </div>
  );

  const leadText = lead ? (
    <BodyText size="lg" className={styles.headerLead}>
      {lead}
    </BodyText>
  ) : null;

  /*
   * WITHOUT EVIDENCE THIS IS A DIFFERENT COMPOSITION, NOT A NARROWER ONE.
   *
   * The block below is a 7/4 grid, and that second track only ever held the
   * evidence list. On the eleven pages that use this block for a statement
   * alone — engagement models, vendor, media, press kit, how we work — the
   * 4fr column was rendered empty, so a heading and three lines of lead sat
   * in the left half of the band with 400px of nothing beside them. Reading
   * as a section that had lost something is exactly how the evidence
   * alignment note below describes the same bug in the other axis.
   *
   * So the statement-only case takes the split the section headers use:
   * heading left, lead right, which is an established composition on this
   * site and fills the measure with writing instead of with air. The
   * evidence case is untouched.
   */
  if (!hasEvidence) {
    return (
      <Reveal className={styles.statementSplit}>
        <div className={styles.statementSplitHead}>
          {heading}
          {actions ? (
            <div className={styles.statementActions}>{actions}</div>
          ) : null}
        </div>
        {leadText}
      </Reveal>
    );
  }

  return (
    <div className={styles.statement} data-evidence="true">
      <Reveal className={styles.statementText}>
        {heading}
        {leadText}
        {actions ? (
          <div className={styles.statementActions}>{actions}</div>
        ) : null}
      </Reveal>

      <Cascade as="ul" className={styles.evidenceList}>
        {evidence!.map((item, index) => (
          <li key={item} className={styles.evidenceItem}>
            <span className={styles.evidenceIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </Cascade>
    </div>
  );
}
