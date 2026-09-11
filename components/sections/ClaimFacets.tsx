import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageMetadata } from "@/content/images/types";
import { Cascade, Reveal } from "@/components/motion";
import { readParagraphs } from "@/lib/prose";
import styles from "./ClaimFacets.module.css";
import { titleCase } from "@/lib/titleCase";

interface ClaimFacetsProps {
  /** The authored paragraphs, in order. Nothing is rewritten — see lib/prose. */
  paragraphs: readonly string[];
  /** Set beside the opening statement, carrying its caption as a floating note. */
  image?: ImageMetadata;
  /** Sits above the opening statement. */
  eyebrow?: string;
  /** Rendered under the supporting facets — usually the page's CTA. */
  actions?: ReactNode;
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
}

/**
 * A definition and the facets that qualify it.
 *
 * Glossary entries are not sequences and they are not comparisons. They are
 * written as a definition followed by three or four independent
 * qualifications, each opening by naming which one it is — "GEO differs from
 * traditional SEO in what it competes for", "In practice that shifts the
 * work", "GEO is frequently confused with AEO". None depends on the one
 * before it, so numbering them would assert an order the writing does not
 * have, and stacking them as paragraphs makes four distinct points look like
 * one undifferentiated passage.
 *
 * So the first facet takes the statement position beside the frame, and the
 * rest sit beneath it as a set. The image's own caption is lifted onto the
 * frame as a floating note rather than set under it, which is the one place
 * on these pages where a single photograph and a single line of writing
 * support each other instead of merely sharing a section.
 *
 * Verbatim throughout: `readParagraphs` splits each paragraph at its first
 * sentence boundary and returns both halves unaltered. See lib/prose.
 */
export function ClaimFacets({
  paragraphs,
  image,
  eyebrow,
  actions,
  label = "In detail",
  claimLevel = 3,
}: ClaimFacetsProps) {
  const claims = readParagraphs(paragraphs);
  const [opening, ...supporting] = claims;
  if (!opening) return null;

  const Claim = claimLevel === 2 ? "h2" : "h3";

  return (
    <div className={styles.wrapper}>
      <Reveal
        className={`${styles.lede} ${image ? styles.ledeWithFigure : ""}`.trim()}
      >
        <div className={styles.statement}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

          <Claim className={styles.claim}>
            {titleCase(
              opening.enumeration ? opening.enumeration.lead : opening.claim,
            )}
          </Claim>

          {opening.enumeration ? (
            <ul className={styles.points}>
              {opening.enumeration.items.map((item) => (
                <li key={item} className={styles.point}>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {opening.detail ? (
            <p className={styles.detail}>{opening.detail}</p>
          ) : null}
        </div>

        {image ? (
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                sizes="(min-width: 1000px) 44vw, 100vw"
              />
            </div>

            {/*
              The floating note. Positioned on the frame's lower edge on wide
              screens and under it below 1000px, because an overlay panel at
              phone width covers the photograph it is annotating rather than
              annotating it.

              Falls back to the registry topic: ten of the 145 resource frames
              carry no caption, and on those the plate was simply absent, so
              the composition lost its floating element on an arbitrary
              subset of pages. Both values are registry facts — never a
              statistic about the business, none of which is verified for
              publication.
            */}
            {image.caption || image.topic ? (
              <figcaption className={styles.note}>
                {image.caption ?? image.topic}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </Reveal>

      {supporting.length > 0 ? (
        <Cascade
          as="dl"
          className={styles.facets}
          data-count={supporting.length}
          aria-label={label}
        >
          {supporting.map((claim) => (
            <div key={claim.source.slice(0, 48)} className={styles.facet}>
              <dt className={styles.facetClaim}>
                {claim.enumeration ? claim.enumeration.lead : claim.claim}
              </dt>

              <dd className={styles.facetBody}>
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
                  <p className={styles.facetDetail}>{claim.detail}</p>
                ) : null}
              </dd>
            </div>
          ))}
        </Cascade>
      ) : null}

      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
