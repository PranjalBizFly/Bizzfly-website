import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import type { ImageMetadata } from "@/content/images/types";
import styles from "./MediaGround.module.css";

interface MediaGroundProps {
  image: ImageMetadata;
  id?: string;
  /** Heavier wash, for compositions that set small text over the frame. */
  weight?: "standard" | "deep";
  className?: string;
  children: ReactNode;
}

/**
 * A full-bleed photograph used as the ground for a section, with the type set
 * over it.
 *
 * This is the one mechanic borrowed wholesale from the reference: a section
 * opener where the image is the field rather than an object placed beside the
 * words. It exists as a shared primitive because two sections use it, but it
 * is deliberately only the GROUND — what sits on top is composed differently
 * in each, so the two do not read as the same section twice.
 *
 * Everywhere else on this site the rule is the opposite: CinematicHero holds
 * the photograph as a contained object precisely so no scrim has to be tuned
 * per image. Setting type over a photograph is the exception, so it uses
 * --scrim-hero, the one wash computed to hold white text at AA over the
 * brightest frame in the set. Any new image dropped in here needs checking
 * against that, which is why the token exists rather than a local rgba().
 *
 * The image carries an empty alt and is hidden from assistive technology.
 * That is not an oversight: as a ground behind copy it is decorative, the
 * heading and body say everything it conveys, and announcing a photograph
 * description before the section's own words would be noise. Images that
 * carry meaning — the founder frame, the job frames — keep their registry alt.
 */
export function MediaGround({
  image,
  id,
  weight = "standard",
  className = "",
  children,
}: MediaGroundProps) {
  return (
    <section
      id={id}
      className={`${styles.ground} ${weight === "deep" ? styles.deep : ""} is-inverse ${className}`.trim()}
    >
      <div className={styles.media} aria-hidden="true">
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          loading="lazy"
          sizes="100vw"
          className={styles.image}
        />
        <span className={styles.scrim} />
      </div>

      <Container className={styles.container}>{children}</Container>
    </section>
  );
}
