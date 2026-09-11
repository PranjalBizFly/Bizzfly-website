import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageMetadata } from "@/content/images/types";
import { Cascade, ImageReveal, Reveal, TextReveal } from "@/components/motion";
import { readParagraph } from "@/lib/prose";
import styles from "./AnchoredStatement.module.css";

interface AnchoredStatementProps {
  /** Small label above the title, usually an index — "The mechanism". */
  eyebrow?: string;
  /**
   * The section's authored heading.
   *
   * Optional: a company page already sets its title as the page H1 in the
   * hero, so repeating it here would give the reader the same line twice.
   * With no title the opening claim takes the statement position instead —
   * which is the author's own first sentence, not a heading written for it.
   */
  title?: string;
  titleLevel?: 2 | 3;
  /**
   * The paragraphs of the section, in order and verbatim.
   *
   * Optional, because one caller uses this composition for its heading and
   * frame alone and sets the section's prose beneath it in a different shape
   * — see PracticeNarrative's criteria branch.
   */
  paragraphs?: readonly string[];
  /**
   * The section's own enumerated points, where it has them.
   *
   * Set beneath the frame rather than under the prose, which is the whole
   * point of this composition: the supporting detail sits with the visual and
   * the argument stands on its own beside them.
   */
  points?: readonly string[];
  /** A photograph, where one is available and unspent. */
  image?: ImageMetadata;
  /** A drawing, where the subject is a mechanism rather than a place. */
  figure?: ReactNode;
  /**
   * The floating detail over the frame.
   *
   * Verified content only — what the frame shows, or a count of something on
   * this site. Never a statistic about the business: no client numbers, years
   * in operation or award tallies have been confirmed for publication, and
   * this slot is exactly where a template invites one to be invented.
   *
   * One line rather than the value-and-label pair a stat chip would use,
   * because a second line here had nothing verified to put in it and ended up
   * repeating the page title under every frame.
   */
  note?: string;
  /**
   * A composition placed inside the statement column, under the writing.
   *
   * Its purpose is to sit BESIDE the frame rather than under the whole band:
   * the aside is sticky when it carries no points, so a set placed here
   * travels alongside the picture instead of starting below it and leaving
   * the column empty. PracticeNarrative puts its criteria here.
   */
  children?: ReactNode;
  /** Rendered under the statement. */
  actions?: ReactNode;
  /** Puts the frame on the trailing side instead of the leading one. */
  reverse?: boolean;
}

/**
 * A statement, the detail that supports it, and one visual holding them
 * together.
 *
 * This is the composition the site's explanatory sections were missing. A
 * practice page's argument used to render as its heading followed by three
 * paragraphs and, where it had them, a bulleted list underneath — the same
 * shape four times down the page, with the points stranded below prose that
 * had already moved on from them.
 *
 * Here the frame and the points occupy one column and the argument the other.
 * The reader gets the claim at display size, the elaboration beneath it, and
 * the enumerated detail beside it rather than after it, which is what lets a
 * 250-word section be understood before it is read in full.
 *
 * Nothing is summarised. The title is the authored heading; the paragraphs are
 * verbatim, with only the first one split at its own sentence boundary so the
 * opening claim can lead (see lib/prose). Where a section has no photograph
 * left to spend and no mechanism worth drawing, the frame is simply absent and
 * the points take that column — the composition degrades to an editorial split
 * rather than to a box with a placeholder in it.
 */
export function AnchoredStatement({
  eyebrow,
  title,
  titleLevel = 2,
  paragraphs = [],
  points,
  image,
  figure,
  children,
  note,
  actions,
  reverse = false,
}: AnchoredStatementProps) {
  const Title = titleLevel === 3 ? "h3" : "h2";

  /*
   * The opening claim leads, the rest of its paragraph follows as the lead.
   * Only the first paragraph is split: the others are already subordinate to
   * it and cutting them too would produce a page of headings.
   */
  const [first, ...rest] = paragraphs;
  const opening = first ? readParagraph(first) : undefined;

  const hasVisual = Boolean(image || figure);
  const hasAside = hasVisual || Boolean(points?.length);

  return (
    <div
      className={`${styles.wrapper} ${hasAside ? styles.split : ""} ${
        reverse ? styles.reverse : ""
      }`.trim()}
    >
      {/*
        The statement is first in the DOM on purpose. On a phone this column
        stacks above the frame, so the heading is the first thing reached
        rather than the third; on a wide screen CSS places the frame in the
        leading track without changing that reading order.
      */}
      <Reveal className={styles.statement}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

        {title ? (
          <Title className={styles.title}>
            <TextReveal text={title} />
          </Title>
        ) : null}

        {/*
          With a heading above it the claim is emphasis inside the lead
          paragraph. Without one it *is* the heading position, so it is set at
          display size and its own elaboration follows as the lead.
        */}
        {opening ? (
          title ? (
            <p className={styles.lead}>
              <strong className={styles.claim}>{opening.claim}</strong>
              {opening.detail ? ` ${opening.detail}` : null}
            </p>
          ) : (
            <>
              <p className={styles.statementClaim}>{opening.claim}</p>
              {opening.detail ? (
                <p className={styles.lead}>{opening.detail}</p>
              ) : null}
            </>
          )
        ) : null}

        {rest.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={styles.body}>
            {paragraph}
          </p>
        ))}

        {children ? <div className={styles.extra}>{children}</div> : null}

        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </Reveal>

      {hasAside ? (
        <div className={styles.aside} data-points={points?.length ? "true" : undefined}>
          {image ? (
            <figure className={styles.figure}>
              {/*
                The frame IS the reveal rather than a wrapper around one, so
                the clip lands on the element that already owns the shape and
                no extra box comes between the frame and the image.

                "wipe-up" because this frame sits beside a statement and is
                read after it: uncovering upward carries the eye back towards
                the text rather than away from it. Lazy, never priority — this
                is always below the fold, so it can be clipped safely.
              */}
              <ImageReveal variant="wipe-up" className={styles.frame}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  sizes="(min-width: 1000px) 45vw, 100vw"
                />
              </ImageReveal>

              {/*
                The floating detail. Overlaps the frame's lower leading corner
                on wide screens and sits beneath it below 1000px, where an
                overlay would cover the photograph instead of annotating it.
              */}
              {note ? (
                <figcaption className={styles.note}>{note}</figcaption>
              ) : image.caption ? (
                <figcaption className={styles.caption}>
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          {!image && figure ? (
            <div className={styles.drawing}>{figure}</div>
          ) : null}

          {points?.length ? (
            <Cascade as="ul" className={styles.points}>
              {points.map((point) => (
                <li key={point.slice(0, 48)} className={styles.point}>
                  {point}
                </li>
              ))}
            </Cascade>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
