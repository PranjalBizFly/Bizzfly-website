import Link from "next/link";
import { businessStages } from "@/content/homepage";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import styles from "./StageList.module.css";

/**
 * Section 05 — by business situation, not by package.
 * No pricing, no tiers, no "most popular" badge — these are situations, and a
 * business moves between them rather than buying one.
 */
export function StageList() {
  return (
    <StaggerGroup as="ol" className={styles.list}>
      {businessStages.map((stage, index) => (
        <StaggerItem as="li" key={stage.stage} index={index} className={styles.item}>
          <div className={styles.head}>
            <span className={styles.index}>{stage.index}</span>
            <h3 className={styles.stage}>{stage.stage}</h3>
            <p className={styles.situation}>{stage.situation}</p>
          </div>

          <p className={styles.focus}>{stage.focus}</p>

          <ul className={styles.work}>
            {stage.work.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.workLink}>
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
