import Link from "next/link";
import { trustCommitments } from "@/content/homepage";
import styles from "./TrustStandard.module.css";

/**
 * Section 09 — trust.
 *
 * BizzFly has no client-approved case studies published yet. Rather than
 * fabricate logos, ratings or metrics — the previous site carried eleven
 * fabricated case studies from theme demo content — this section states the
 * publishing standard, which is itself a credible trust signal and is true.
 *
 * When verified proof exists, this section is replaced by it.
 */
export function TrustStandard() {
  return (
    <div className={styles.wrapper}>
      <ol className={styles.list}>
        {trustCommitments.map((commitment) => (
          <li key={commitment.index} className={styles.item}>
            <span className={styles.index}>{commitment.index}</span>
            <h3 className={styles.title}>{commitment.title}</h3>
            <p className={styles.body}>{commitment.body}</p>
          </li>
        ))}
      </ol>

      <p className={styles.note}>
        We would rather show you nothing than show you something invented. Ask
        us directly about work in your sector and we will tell you what we have
        done, and where we have not worked before.{" "}
        <Link href="/case-studies/" className={styles.noteLink}>
          How we publish client work
        </Link>
      </p>
    </div>
  );
}
