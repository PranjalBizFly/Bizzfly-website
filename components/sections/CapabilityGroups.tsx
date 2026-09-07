import Link from "next/link";
import { capabilityGroups } from "@/content/homepage";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import styles from "./CapabilityGroups.module.css";

/**
 * Section 02 — capabilities grouped by the job the visitor needs done.
 *
 * Editorial rows, not a card grid: each group is a question, an answer and a
 * link rail. Four groups and twenty service links in less vertical space than
 * four cards would take.
 */
export function CapabilityGroups() {
  return (
    <StaggerGroup as="div" className={styles.groups}>
      {capabilityGroups.map((group, index) => (
        <StaggerItem as="section" key={group.key} index={index} className={styles.group}>
          <div className={styles.marker}>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <h3 className={styles.label}>{group.label}</h3>
          </div>

          <div className={styles.body}>
            <p className={styles.question}>{group.question}</p>
            <p className={styles.summary}>{group.summary}</p>
          </div>

          <ul className={styles.rail}>
            {group.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.railLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
