"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { TextReveal, useReveal } from "@/components/motion";
import styles from "./ProblemMap.module.css";

export interface ProblemMapProblem {
  title: string;
  description: string;
  /** Keys of the solutions that address this problem. */
  solutions: string[];
}

export interface ProblemMapSolution {
  key: string;
  label: string;
  description?: string;
  href: string;
}

interface ProblemMapProps {
  problems: ProblemMapProblem[];
  solutions: ProblemMapSolution[];
  problemsEyebrow?: string;
  problemsTitle: string;
  problemsLead?: string;
  solutionsEyebrow?: string;
  solutionsTitle: string;
  solutionsLead?: string;
}

/**
 * The mapping between what stalls and the work that addresses it.
 *
 * These were two sections: a numbered list of sector problems, and — three
 * screens further down — a list of services under the heading "The work that
 * addresses those problems", which stated a relationship the page then left
 * the reader to reconstruct from memory. The mapping already exists in the
 * content (`IndustryProblem.addressedBy`), so it is drawn here rather than
 * asserted twice.
 *
 * Selecting a problem raises the services that address it. Emphasis is added
 * to the matches rather than taken from the rest: a link dimmed to make its
 * neighbours stand out is a link that has been made harder to read, and every
 * row here is a real destination.
 *
 * Each service also carries the numbers of the problems it answers, so the
 * relationship is legible before anything is touched and to a reader who
 * never touches it at all. Nothing is hidden behind the interaction — both
 * lists are complete in the initial HTML.
 */
export function ProblemMap({
  problems,
  solutions,
  problemsEyebrow,
  problemsTitle,
  problemsLead,
  solutionsEyebrow,
  solutionsTitle,
  solutionsLead,
}: ProblemMapProps) {
  const [active, setActive] = useState(0);
  const rail = useReveal<HTMLDivElement>();

  /* Which problems each solution answers, by display number. */
  const answers = new Map<string, number[]>();
  problems.forEach((problem, index) => {
    for (const key of problem.solutions) {
      answers.set(key, [...(answers.get(key) ?? []), index + 1]);
    }
  });

  const activeSolutions = new Set(problems[active]?.solutions ?? []);

  const move = (from: number, delta: number) => {
    const next = (from + delta + problems.length) % problems.length;
    setActive(next);
    document.getElementById(`problem-${next}`)?.focus();
  };

  return (
    <div className={styles.map} ref={rail}>
      <div className={styles.column}>
        <header className={styles.head}>
          {problemsEyebrow ? (
            <span className={styles.eyebrow}>{problemsEyebrow}</span>
          ) : null}
          <h2 className={styles.title}><TextReveal text={problemsTitle} /></h2>
          {problemsLead ? <p className={styles.lead}>{problemsLead}</p> : null}
        </header>

        <ol className={styles.problems}>
          {problems.map((problem, index) => {
            const selected = index === active;
            const count = problem.solutions.length;
            return (
              <li key={problem.title}>
                <button
                  type="button"
                  id={`problem-${index}`}
                  className={styles.problem}
                  data-selected={selected}
                  aria-pressed={selected}
                  style={{ "--row-index": index } as CSSProperties}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      move(index, 1);
                    }
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      move(index, -1);
                    }
                  }}
                >
                  <span className={styles.problemIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.problemBody}>
                    <span className={styles.problemTitle}>{problem.title}</span>
                    <span className={styles.problemText}>{problem.description}</span>
                    {count > 0 ? (
                      <span className={styles.problemMeta}>
                        {count === 1
                          ? "Addressed by one capability"
                          : `Addressed by ${count} capabilities`}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.column}>
        <header className={styles.head}>
          {solutionsEyebrow ? (
            <span className={styles.eyebrow}>{solutionsEyebrow}</span>
          ) : null}
          <h2 className={styles.title}><TextReveal text={solutionsTitle} /></h2>
          {solutionsLead ? <p className={styles.lead}>{solutionsLead}</p> : null}
        </header>

        <ul className={styles.solutions} id="problem-map-solutions">
          {solutions.map((solution, index) => {
            const numbers = answers.get(solution.key) ?? [];
            return (
              <li
                key={solution.href}
                className={styles.solution}
                data-matched={activeSolutions.has(solution.key)}
                style={{ "--row-index": index } as CSSProperties}
              >
                <Link href={solution.href} className={styles.solutionLink}>
                  <span className={styles.solutionLabel}>{solution.label}</span>
                  {solution.description ? (
                    <span className={styles.solutionText}>{solution.description}</span>
                  ) : null}
                  <span className={styles.solutionArrow} aria-hidden="true">
                    &rarr;
                  </span>
                </Link>

                {numbers.length > 0 ? (
                  <p className={styles.answers}>
                    <span className={styles.answersLabel}>Answers</span>
                    {numbers.map((number) => (
                      <span
                        key={number}
                        className={styles.answerChip}
                        data-current={number === active + 1}
                      >
                        {String(number).padStart(2, "0")}
                      </span>
                    ))}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
