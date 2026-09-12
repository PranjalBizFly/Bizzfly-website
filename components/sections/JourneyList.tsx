import Link from "next/link";
import { visitorJourneys } from "@/content/homepage";
import { titleCase } from "@/lib/titleCase";
import styles from "./JourneyList.module.css";

/**
 * Section 08 — navigation by intent.
 * Rows, not cards: this is a routing table phrased in the visitor's language,
 * and it should read as useful navigation rather than as eight sales tiles.
 */
export function JourneyList() {
  return (
    <ul className={styles.list}>
      {visitorJourneys.map((journey) => (
        <li key={journey.intent} className={styles.item}>
          <Link href={journey.href} className={styles.link}>
            <span className={styles.intent}>{titleCase(journey.intent)}</span>
            <span className={styles.arrow} aria-hidden="true">
              &rarr;
            </span>
            <span className={styles.destination}>{titleCase(journey.destination)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
