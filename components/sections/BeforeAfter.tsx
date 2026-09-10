import { Cascade } from "@/components/motion";
import styles from "./BeforeAfter.module.css";

export interface BeforeAfterSide {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Enumerated statements. Rendered as a numbered rail. */
  items?: string[];
  /** A single passage, where the side is a statement rather than a list. */
  text?: string;
}

interface BeforeAfterProps {
  before: BeforeAfterSide;
  after: BeforeAfterSide;
  /**
   * "flow" — one state becomes the other, and the connector is directional.
   * "versus" — two halves of one decision, and it is a plain divider. The
   * arrow is a claim about causation, so it is only drawn where the content
   * makes that claim.
   */
  relation?: "flow" | "versus";
  /** Names the relationship for assistive technology. */
  label?: string;
}

/**
 * Two states of the same situation, with the movement between them drawn.
 *
 * Service and use-case pages state the problem in one section and what the
 * work is designed to improve in another, several screens apart and in the
 * same shape — a heading, a lead and a numbered list, twice. A reader had to
 * hold the first list in their head to see that the second answers it.
 *
 * Here they are one section: what brings people here on the left, what it is
 * designed to improve on the right, and a rule between them that draws in the
 * direction of travel as the section arrives.
 *
 * No item is paired with an item opposite it, because nothing in the content
 * claims that mapping — these are two honest lists about one engagement, and
 * the composition says only what they are: a before, and an after.
 */
export function BeforeAfter({
  before,
  after,
  relation = "flow",
  label,
}: BeforeAfterProps) {
  return (
    <Cascade className={styles.band} aria-label={label} data-relation={relation}>
      <Side side={before} tone="before" />

      <div className={styles.connector} aria-hidden="true">
        <span className={styles.rule} />
        {relation === "flow" ? <span className={styles.arrow}>&rarr;</span> : null}
      </div>

      <Side side={after} tone="after" />
    </Cascade>
  );
}

function Side({ side, tone }: { side: BeforeAfterSide; tone: "before" | "after" }) {
  return (
    <div className={styles.side} data-tone={tone}>
      {side.eyebrow ? <span className={styles.eyebrow}>{side.eyebrow}</span> : null}
      <h2 className={styles.title}>{side.title}</h2>
      {side.lead ? <p className={styles.lead}>{side.lead}</p> : null}

      {side.items?.length ? (
        <ol className={styles.items}>
          {side.items.map((item, index) => (
            <li key={item} className={styles.item}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.itemText}>{item}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {side.text ? <p className={styles.text}>{side.text}</p> : null}
    </div>
  );
}
