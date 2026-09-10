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
  return (
    <div className={styles.statement}>
      <Reveal className={styles.statementText}>
        <div className={styles.header}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Heading level={level} size="h2" className={styles.statementTitle}>
            {title}
          </Heading>
        </div>
        {lead ? (
          <BodyText size="lg" className={styles.headerLead}>
            {lead}
          </BodyText>
        ) : null}
        {actions ? (
          <div className={styles.statementActions}>{actions}</div>
        ) : null}
      </Reveal>

      {evidence?.length ? (
        <Cascade as="ul" className={styles.evidenceList}>
          {evidence.map((item, index) => (
            <li key={item} className={styles.evidenceItem}>
              <span className={styles.evidenceIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </Cascade>
      ) : null}
    </div>
  );
}
