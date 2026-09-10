import { Cascade } from "@/components/motion";
import styles from "./ChoiceList.module.css";

export interface Choice {
  name: string;
  rationale: string;
}

interface ChoiceListProps {
  choices: Choice[];
  /** Names the set for assistive technology. */
  label?: string;
}

/**
 * A stack, set as a reference rather than as a countdown.
 *
 * These were numbered editorial rows one under another — the shape the site
 * uses for a sequence — which made a set of independent choices read as an
 * ordered list of steps and ran to a thousand pixels for eight tools. They
 * are a glossary: a name, and the reason it is there. So they are set as one,
 * two columns wide where there is room, with the name in display type and the
 * reason beneath it.
 *
 * A definition list, because that is what this is, and because the pairing
 * survives with styles off.
 */
export function ChoiceList({ choices, label }: ChoiceListProps) {
  return (
    <Cascade as="dl" className={styles.list} aria-label={label}>
      {choices.map((choice) => (
        <div key={choice.name} className={styles.choice}>
          <dt className={styles.name}>{choice.name}</dt>
          <dd className={styles.rationale}>{choice.rationale}</dd>
        </div>
      ))}
    </Cascade>
  );
}
