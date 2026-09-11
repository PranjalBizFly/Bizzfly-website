import type { ImageMetadata } from "@/content/images/types";
import Image from "next/image";
import { Cascade, TextReveal } from "@/components/motion";
import { readParagraphs } from "@/lib/prose";
import styles from "./ClaimSequence.module.css";

interface ClaimSequenceProps {
  /** The authored paragraphs, in order. Nothing is rewritten — see lib/prose. */
  paragraphs: readonly string[];
  /** Held beside the sequence on wide screens. */
  image?: ImageMetadata;
  /** Sits above the first step, in the rail. */
  eyebrow?: string;
  /** Names the sequence for assistive technology. */
  label?: string;
  /**
   * The heading level of each step.
   *
   * 3 where an <h2> already introduces the sequence (PracticeNarrative), 2
   * where the sequence is the page's own first section and its steps are
   * siblings of "Related Questions" rather than subordinate to anything.
   */
  claimLevel?: 2 | 3;
}

/**
 * An ordered argument, drawn as the path it already is.
 *
 * Guides and checklists in the content model are written as sequences and say
 * so in their own first words — "Interpretation comes first", "Retrieval
 * follows", "Selection then narrows"; "Start with access", "Then check
 * rendering", "Next resolve duplication", "Finally check structure". Set as a
 * column of six paragraphs that order is invisible until the whole thing has
 * been read. Set as a numbered path it is legible before any of it has been.
 *
 * Nothing here is summarised or generated. `readParagraphs` cuts each
 * paragraph at its first sentence boundary and returns both halves verbatim:
 * the opening sentence becomes the step, the rest becomes the explanation
 * beneath it, and where the opening sentence enumerates ("The common causes
 * are unglamorous: images without dimensions, fonts that swap late, …") the
 * segments the author wrote become the points. Every word still reaches the
 * page, in the order it was written.
 *
 * The figure is sticky beside the path rather than stacked above it, so the
 * subject stays in view while the steps are read — the one arrangement a
 * single image can hold across a long sequence without repeating itself.
 */
export function ClaimSequence({
  paragraphs,
  image,
  eyebrow,
  label = "In order",
  claimLevel = 3,
}: ClaimSequenceProps) {
  const claims = readParagraphs(paragraphs);
  if (claims.length === 0) return null;

  const Claim = claimLevel === 2 ? "h2" : "h3";

  return (
    <div className={`${styles.wrapper} ${image ? styles.withFigure : ""}`.trim()}>
      {image ? (
        <figure className={styles.figure}>
          <div className={styles.frame}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              sizes="(min-width: 1100px) 40vw, 100vw"
            />
          </div>
          {image.caption ? (
            <figcaption className={styles.caption}>{image.caption}</figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className={styles.pathColumn}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

        <Cascade as="ol" className={styles.path} aria-label={label}>
          {claims.map((claim, index) => (
            <li
              key={claim.source.slice(0, 48)}
              className={styles.step}
              data-last={index === claims.length - 1 ? "true" : undefined}
            >
              {/*
                The marker and the rule leaving it are one column, so the
                spine always meets the number on its centre line whatever the
                step heading wraps to. Same geometry as ProcessBlock's node,
                turned vertical because this sequence is read down a reading
                column rather than across a band.
              */}
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.spine} />
              </div>

              <div className={styles.body}>
                <Claim className={styles.claim}>
                  {/* Letter by letter, like every other heading that opens a
                      section. The claim IS the heading here. */}
                  <TextReveal
                    text={claim.enumeration ? claim.enumeration.lead : claim.claim}
                  />
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
              </div>
            </li>
          ))}
        </Cascade>
      </div>
    </div>
  );
}
