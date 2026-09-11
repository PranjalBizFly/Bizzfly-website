import { Cascade, Reveal } from "@/components/motion";
import { readParagraphs } from "@/lib/prose";
import styles from "./ClaimDimensions.module.css";

interface ClaimDimensionsProps {
  /** The authored paragraphs, in order. Nothing is rewritten — see lib/prose. */
  paragraphs: readonly string[];
  /** The two things being weighed, where the page is a comparison. */
  subjects?: readonly [string, string];
  /** Names the set for assistive technology. */
  label?: string;
}

/**
 * A comparison, set out along the dimensions it actually compares.
 *
 * Every comparison page in the content model is written the same way: one
 * paragraph per dimension, each opening by naming it — "The economics differ
 * in shape", "Control differs too", "The strongest argument for doing both",
 * "The decision is usually about runway". Four paragraphs in a column hide
 * that structure; four labelled rows are the structure.
 *
 * What this deliberately does *not* do is split each paragraph into a column
 * per option. The writing weighs both sides inside one sentence — "Paid
 * search has a marginal cost per click that persists forever: the thousandth
 * visit costs roughly what the first did" — and cutting it in half would
 * force an attribution the author did not make. So the two subjects are named
 * once, at the top, where the title already names them, and each dimension
 * keeps the balanced reading it was written as.
 *
 * The claim and its elaboration are verbatim throughout — see lib/prose.
 */
export function ClaimDimensions({
  paragraphs,
  subjects,
  label = "Compared",
}: ClaimDimensionsProps) {
  const claims = readParagraphs(paragraphs);
  if (claims.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      {/*
        The pair, named once. This is the page's own title set as the
        opposition it describes, so the thing being decided is visible above
        the dimensions rather than only in the browser tab.
      */}
      {subjects ? (
        <Reveal className={styles.pair}>
          <p className={styles.subject}>{subjects[0]}</p>
          <p className={styles.versus} aria-hidden="true">
            vs
          </p>
          <p className={styles.subject} data-side="b">
            {subjects[1]}
          </p>
        </Reveal>
      ) : null}

      <Cascade as="dl" className={styles.rows} aria-label={label}>
        {claims.map((claim, index) => (
          <div key={claim.source.slice(0, 48)} className={styles.row}>
            {/*
              The index alone.

              This rail used to carry a short label derived from the
              paragraph's opening clause, which read as a caption beside the
              claim it was taken from — "The economics differ in shape" next
              to "The economics differ in shape, not just size." Any label
              derived from the claim duplicates the claim, so the rail counts
              the dimensions and the claim names them.
            */}
            <dt className={styles.rail}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </dt>

            <dd className={styles.content}>
              <p className={styles.claim}>
                {claim.enumeration ? claim.enumeration.lead : claim.claim}
              </p>

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
            </dd>
          </div>
        ))}
      </Cascade>
    </div>
  );
}
