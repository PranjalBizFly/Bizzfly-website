import type { ReactNode } from "react";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
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

/** S-09 Statement + Evidence. The core editorial section. */
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
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading level={level} size="h2" className={styles.statementTitle}>
          {title}
        </Heading>
        {lead ? (
          <BodyText size="lg" className={styles.headerLead}>
            {lead}
          </BodyText>
        ) : null}
        {actions ? <div className={styles.emptyActions}>{actions}</div> : null}
      </div>

      {evidence?.length ? (
        <ul className={styles.evidenceList}>
          {evidence.map((item, index) => (
            <li key={item} className={styles.evidenceItem}>
              <span className={styles.evidenceIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
