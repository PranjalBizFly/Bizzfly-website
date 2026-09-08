import { StaggerItem } from "@/components/motion";
import styles from "./StatBand.module.css";

export interface Stat {
  /** The figure itself, already formatted. */
  value: string;
  /** What the figure counts. */
  label: string;
  /** One line of context, so the number is not left to speak for itself. */
  note?: string;
}

interface StatBandProps {
  stats: Stat[];
}

/**
 * A row of figures at display size, centred on a dark ground.
 *
 * Every number passed in has to be one the site can substantiate — a count of
 * things actually published, not a claim about results. The trust section
 * further down commits to exactly that standard, and a band of unverifiable
 * numbers here would contradict it on the same page.
 *
 * The figure reads before the label: `dt` still holds the label and `dd` the
 * value, because that is what the markup means, and CSS order puts the number
 * on top where the eye lands first.
 */
export function StatBand({ stats }: StatBandProps) {
  return (
    <dl className={styles.band}>
      {stats.map((stat, index) => (
        <StaggerItem
          as="div"
          key={stat.label}
          index={index}
          className={styles.stat}
        >
          <dt className={styles.label}>{stat.label}</dt>
          <dd className={styles.value}>{stat.value}</dd>
          {stat.note ? <dd className={styles.note}>{stat.note}</dd> : null}
        </StaggerItem>
      ))}
    </dl>
  );
}
