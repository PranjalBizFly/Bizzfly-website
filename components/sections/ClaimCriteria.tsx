import { Cascade, Reveal } from "@/components/motion";
import { readParagraphs } from "@/lib/prose";
import styles from "./ClaimCriteria.module.css";
import { titleCase } from "@/lib/titleCase";

interface ClaimCriteriaProps {
  /** The authored paragraphs, in order. Nothing is rewritten — see lib/prose. */
  paragraphs: readonly string[];
  /**
   * Lifts the final paragraph out as the closing statement.
   *
   * True for the pages whose last paragraph resolves the question rather than
   * adding another consideration — which is every decision page and every
   * article in the content model, checked one by one: "A useful test before
   * signing anything…", "It is legitimate to conclude not yet.", "Whatever
   * you decide, budget the decade rather than the build." A page whose last
   * paragraph is just another criterion passes false and keeps it in the set.
   */
  resolves?: boolean;
  /** Names the set for assistive technology. */
  label?: string;
  /**
   * The heading level of each claim.
   *
   * 3 where an <h2> already introduces the set (PracticeNarrative), 2 where
   * the set is the page's own first section and its claims are siblings of
   * "Related Questions" rather than subordinate to anything.
   */
  claimLevel?: 2 | 3;
  /**
   * How many columns the criteria are laid out in.
   *
   * 2 across a full content band, which is what the staggered grid was drawn
   * for. 1 where the set sits in one track of a split — beside a figure —
   * and a two-column grid inside it would give each criterion about 300px.
   */
  columns?: 1 | 2;
}

/**
 * The considerations behind a decision, and where it lands.
 *
 * "When should you…" pages are written as a weighing: several independent
 * criteria, then a resolution. The criteria genuinely are numbered by the
 * author — "The strongest signal is a diagnosis you cannot reach", "The
 * second signal is a known fix nobody can implement" — but they are not a
 * path: skipping the second does not stop you reaching the third, which is
 * why they are set on a staggered grid rather than on the connected spine
 * ClaimSequence draws for a guide.
 *
 * The closing paragraph is lifted out and set on its own. In a column of
 * five paragraphs the answer to the question in the page title is the fifth
 * one, indistinguishable from the four that qualify it; here it is the thing
 * the section ends on, which is what it was written to be.
 *
 * Verbatim throughout — `readParagraphs` splits at the first sentence
 * boundary and alters nothing. See lib/prose.
 */
export function ClaimCriteria({
  paragraphs,
  resolves = false,
  label = "What decides it",
  claimLevel = 3,
  columns = 2,
}: ClaimCriteriaProps) {
  const claims = readParagraphs(paragraphs);
  if (claims.length === 0) return null;

  const Claim = claimLevel === 2 ? "h2" : "h3";

  const canLift = resolves && claims.length > 2;
  const criteria = canLift ? claims.slice(0, -1) : claims;
  const closing = canLift ? claims[claims.length - 1] : undefined;

  return (
    <div className={styles.wrapper}>
      <Cascade
        as="ol"
        className={`${styles.grid} ${columns === 1 ? styles.single : ""}`.trim()}
        aria-label={label}
      >
        {criteria.map((claim, index) => (
          <li key={claim.source.slice(0, 48)} className={styles.criterion}>
            <span className={styles.index} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <Claim className={styles.claim}>
              {titleCase(
                claim.enumeration ? claim.enumeration.lead : claim.claim,
              )}
            </Claim>

            {claim.enumeration ? (
              <ul className={styles.points}>
                {claim.enumeration.items.map((item) => (
                  <li key={item} className={styles.point}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {claim.detail ? (
              <p className={styles.detail}>{claim.detail}</p>
            ) : null}
          </li>
        ))}
      </Cascade>

      {/*
        No label above it. A heading here would be a sentence this site's
        editors did not write, and the rule plus the display size already say
        that the section has stopped listing and started concluding.
      */}
      {closing ? (
        <Reveal className={styles.closing}>
          <p className={styles.closingClaim}>
            {closing.enumeration ? closing.enumeration.lead : closing.claim}
          </p>

          {closing.enumeration ? (
            <ul className={styles.points} data-tone="closing">
              {closing.enumeration.items.map((item) => (
                <li key={item} className={styles.point}>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {closing.detail ? (
            <p className={styles.closingDetail}>{closing.detail}</p>
          ) : null}
        </Reveal>
      ) : null}
    </div>
  );
}
