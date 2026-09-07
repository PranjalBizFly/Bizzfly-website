import type { ProcessStep } from "@/types/content";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import styles from "./Sections.module.css";

interface ProcessBlockProps {
  steps: ProcessStep[];
}

/** S-06 Process Timeline. Horizontal on desktop, vertical on mobile. */
export function ProcessBlock({ steps }: ProcessBlockProps) {
  return (
    <StaggerGroup as="ol" className={styles.process}>
      {steps.map((step, i) => (
        <StaggerItem
          as="li"
          key={step.title}
          index={i}
          className={styles.step}
        >
          <span className={styles.stepIndex}>
            {String(step.index).padStart(2, "0")}
          </span>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDescription}>{step.description}</p>
          {step.duration ? (
            <span className={styles.stepDuration}>{step.duration}</span>
          ) : null}
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
