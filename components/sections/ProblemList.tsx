import Link from "next/link";
import { visitorProblems } from "@/content/homepage";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import styles from "./ProblemList.module.css";

/**
 * Section 04 — the visitor's problems, in their words.
 * No BizzFly service is named in the problem statement itself; the link is
 * the resolution, which keeps the section diagnostic rather than a sales list.
 */
export function ProblemList() {
  return (
    <StaggerGroup as="ul" className={styles.list}>
      {visitorProblems.map((problem, index) => (
        <StaggerItem as="li" key={problem.problem} index={index} className={styles.item}>
          <span className={styles.quote}>{problem.problem}</span>
          <p className={styles.detail}>{problem.detail}</p>
          <Link href={problem.href} className={styles.link}>
            {problem.linkLabel}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
