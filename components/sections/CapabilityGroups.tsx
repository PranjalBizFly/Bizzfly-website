import Link from "next/link";
import { capabilityGroups } from "@/content/homepage";
import { StaggerItem } from "@/components/motion";
import styles from "./CapabilityGroups.module.css";

/**
 * Section 02 — capabilities grouped by the job the visitor needs done.
 *
 * Four pillars, presented as a four-up card wall: the name at display size,
 * the question it answers, and the services that sit under it. The whole
 * card is one link target — the sub-service links are still individually
 * reachable, so the card is a shortcut rather than a replacement for them.
 */
export function CapabilityGroups() {
  return (
    <div className={styles.groups}>
      {capabilityGroups.map((group, index) => (
        <StaggerItem
          as="article"
          key={group.key}
          index={index}
          className={styles.group}
        >
          <div className={styles.head}>
            <span className={styles.index}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.label}>
              {/*
                The stretched link makes the whole card clickable. It sits on
                the heading so the accessible name of the link is the pillar
                name, not "read more".
              */}
              <Link href={group.href} className={styles.labelLink}>
                {group.label}
              </Link>
            </h3>
          </div>

          <p className={styles.question}>{group.question}</p>
          <p className={styles.summary}>{group.summary}</p>

          <ul className={styles.rail}>
            {group.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.railLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className={styles.arrow} aria-hidden="true">
            &rarr;
          </span>
        </StaggerItem>
      ))}
    </div>
  );
}
