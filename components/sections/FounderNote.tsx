import Image from "next/image";
import { founderNote } from "@/content/homepage-narrative";
import type { ImageMetadata } from "@/content/images/types";
import { Reveal, Cascade } from "@/components/motion";
import styles from "./FounderNote.module.css";
import { Button } from "@/components/buttons";

interface FounderNoteProps {
  /**
   * Optional, and currently NOT supplied — see the note below. When an
   * appropriate frame exists, passing it turns this into the split
   * composition without any other change.
   */
  image?: ImageMetadata;
}

/**
 * The human layer.
 *
 * An editorial split: a contained photograph on one side, the argument and
 * the signature on the other. Deliberately NOT a full-bleed ground like the
 * two sections above it — three image-field sections in a row would turn a
 * device into a template, and this one is a person speaking rather than a
 * claim being made, which wants the quieter treatment.
 *
 * A supplied image keeps its registry alt, unlike the full-bleed grounds:
 * here it would be content rather than a field behind content.
 */
export function FounderNote({ image }: FounderNoteProps) {
  return (
    <div className={styles.wrapper} data-has-image={Boolean(image)}>
      <div className={styles.figure}>
        {/*
          `sizes` states the widths this frame is actually rendered at rather
          than an approximation of them. The band caps at 1280 and the image
          track is 43% of what is left after a 24px gutter, so past that
          breakpoint the frame is a fixed 500px however wide the screen gets;
          between 1024 and 1280 it tracks the viewport; stacked it fills the
          band, which is the viewport less its gutters.

          These three numbers are downstream of the grid in
          FounderNote.module.css. If the track ratio, the gutter or the
          stacked width changes, change them here too — a stale hint is
          invisible in review and shows up as a soft photograph. The stacked
          clause said 480px while the figure was briefly capped at that, which
          put a 640-wide file in a 958-wide frame.
        */}
        {image ? (
          <Reveal className={styles.frame}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
              /*
               * Above the default 75, which visibly softens a face.
               * Measured as variance of the Laplacian on what the optimiser
               * actually serves: the source portrait scores 247, q75 drops it
               * to 174, q95 holds 198, and q100 reaches 207 for another 2KB.
               * A portrait carries the trust on this section and the curve is
               * flat past 95, so this is where the detail stops being cheap.
               */
              quality={95}
              className={styles.image}
            />
          </Reveal>
        ) : null}

        {/*
          With a frame, the attribution overlaps its lower edge. Without one it
          is simply the signature block, which is why it lives here rather than
          inside the figure.
        */}
        <Reveal delay={140} className={styles.signature}>
          <p className={styles.name}>{founderNote.name}</p>
          <p className={styles.role}>
            {founderNote.role}
            <span className={styles.separator} aria-hidden="true">
              /
            </span>
            {founderNote.location}
          </p>
        </Reveal>
      </div>

      <Cascade step={80} className={styles.body}>
        <h2 className={styles.title}>A company, not a platform</h2>

        {/*
          Executive Premise Card with pull-quote styling
        */}
        <div className={styles.premiseCard}>
          <p className={styles.premise}>{founderNote.premise}</p>
        </div>

        {founderNote.body.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        <div className={styles.actions}>
          <Button
            href={founderNote.cta.href}
            variant="primary"
            withArrow
          >
            {founderNote.cta.label}
          </Button>
          <Button
            href={founderNote.secondary.href}
            variant="secondary"
            withArrow
          >
            {founderNote.secondary.label}
          </Button>
        </div>
      </Cascade>
    </div>
  );
}
