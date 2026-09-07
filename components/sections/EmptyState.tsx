import type { ReactNode } from "react";
import { Heading, BodyText } from "@/components/typography";
import styles from "./Sections.module.css";

interface EmptyStateProps {
  title: string;
  body: string;
  actions?: ReactNode;
}

/**
 * Designed empty state. Never "No items found."
 * Explains why the section is empty and what to do instead.
 * See design principle P8.
 */
export function EmptyState({ title, body, actions }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <Heading level={2} size="h3" className={styles.emptyTitle}>
        {title}
      </Heading>
      <BodyText className={styles.emptyBody}>{body}</BodyText>
      {actions ? <div className={styles.emptyActions}>{actions}</div> : null}
    </div>
  );
}
