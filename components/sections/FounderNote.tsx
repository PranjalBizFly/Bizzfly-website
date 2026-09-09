import Image from "next/image";
import Link from "next/link";
import { founderNote } from "@/content/homepage-narrative";
import type { ImageMetadata } from "@/content/images/types";
import { Reveal } from "@/components/motion";
import styles from "./FounderNote.module.css";

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
 * NO PHOTOGRAPH IS CURRENTLY PASSED, deliberately.
 *
 * The obvious candidate was `company-about`, whose registry alt reads "BizzFly
 * team members collaborating in bright, modern office space in Pune, India".
 * The file is a close-up of a laptop screen showing a confusion matrix. There
 * are no people in it and nothing about it is BizzFly. Running it under a
 * heading that says "A company, not a platform" would make a visual claim
 * about who works here that the picture does not support — which is the exact
 * failure mode the rest of this site is built to avoid.
 *
 * That alt/image mismatch is not isolated, and much of the library also
 * carries Unsplash+ preview watermarks. Until that is resolved this section
 * stays typographic, which it was designed to survive: the composition reads
 * as finished without a frame rather than as a card with a hole in it.
 *
 * A supplied image keeps its registry alt, unlike the full-bleed grounds:
 * here it would be content rather than a field behind content.
 */
export function FounderNote({ image }: FounderNoteProps) {
  return (
    <div className={styles.wrapper} data-has-image={Boolean(image)}>
      <Reveal direction="right" className={styles.figure}>
        {image ? (
          <div className={styles.frame}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className={styles.image}
            />
          </div>
        ) : null}

        {/*
          With a frame, the attribution overlaps its lower edge. Without one it
          is simply the signature block, which is why it lives here rather than
          inside the figure.
        */}
        <div className={styles.signature}>
          <p className={styles.name}>{founderNote.name}</p>
          <p className={styles.role}>
            {founderNote.role}
            <span className={styles.separator} aria-hidden="true">
              /
            </span>
            {founderNote.location}
          </p>
        </div>
      </Reveal>

      <Reveal delay={120} className={styles.body}>
        <p className={styles.eyebrow}>14 / Who you would be working with</p>

        <h2 className={styles.title}>A company, not a platform</h2>

        {/*
          Not a <blockquote>: this paraphrases published positioning rather
          than quoting something recorded as said, and quote markup would
          assert a provenance that does not exist.
        */}
        <p className={styles.premise}>{founderNote.premise}</p>

        {founderNote.body.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        <div className={styles.actions}>
          <Link href={founderNote.cta.href} className={styles.primary}>
            {founderNote.cta.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link href={founderNote.secondary.href} className={styles.secondary}>
            {founderNote.secondary.label}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
