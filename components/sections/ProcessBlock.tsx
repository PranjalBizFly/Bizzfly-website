import type { ProcessStep } from "@/types/content";
import { Cascade } from "@/components/motion";
import styles from "./ProcessBlock.module.css";

interface ProcessBlockProps {
  steps: ProcessStep[];
  /**
   * Names the sequence for assistive technology and labels the spine.
   * Defaults to the generic reading, which is right for a process; a page
   * whose steps are stages or phases should say so.
   */
  label?: string;
}

/**
 * S-06 — the process, drawn as a path rather than listed as columns.
 *
 * This used to be five bordered columns side by side, which is the shape a
 * list of features takes, not a sequence. Nothing in it said that step two
 * follows step one — the reader inferred the order from the numbers and from
 * reading left to right, and on mobile, where the columns stacked, even that
 * was gone.
 *
 * So the sequence is now the composition. A spine runs through the numbered
 * nodes — horizontal on desktop, vertical below it — and the segment between
 * two nodes draws itself in as the section arrives, in order, so the path is
 * built in front of the reader rather than presented finished. That is the
 * one thing this section has to communicate, and it is now the thing the
 * motion is doing.
 *
 * Hovering or focusing a step lifts its node and darkens its segment, which
 * makes the relationship between a step and its place on the path legible
 * when a reader is picking through them out of order. It reveals nothing:
 * every word is in the DOM at every moment, because these steps are the part
 * of an engagement page an extractor most often quotes.
 */
export function ProcessBlock({ steps, label = "Process" }: ProcessBlockProps) {
  return (
    <Cascade as="ol" className={styles.path} aria-label={label}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={styles.step}
          data-first={index === 0 ? "true" : undefined}
          data-last={index === steps.length - 1 ? "true" : undefined}
          tabIndex={0}
        >
          {/*
            The node and the segment leaving it are one row, so the rule
            always meets the marker on its centre line whatever the step
            title wraps to.
          */}
          <div className={styles.node}>
            <span className={styles.index}>
              {String(step.index).padStart(2, "0")}
            </span>
            <span className={styles.segment} aria-hidden="true" />
          </div>

          <div className={styles.body}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
            {step.duration ? (
              <span className={styles.duration}>{step.duration}</span>
            ) : null}
          </div>
        </li>
      ))}
    </Cascade>
  );
}
