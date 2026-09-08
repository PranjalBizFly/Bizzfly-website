import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Breadcrumbs, type Crumb } from "@/components/navigation/Breadcrumbs";
import type { ImageMetadata } from "@/content/images/types";
import styles from "./CinematicHero.module.css";

/**
 * How the image and the type are arranged. One per page type, so no two
 * templates open with the same shape — a visitor moving from a service to an
 * industry should see a different composition, not the same hero with
 * different words in it.
 */
export type HeroComposition =
  | "bleed-right" // media off the right edge, type on the ground beside it
  | "bleed-left" // the mirror
  | "banner" // type first, then a wide band of image beneath it
  | "portrait" // a tall crop beside a bordered panel
  | "inset"; // image behind a panel that sits over its lower corner

export interface HeroFact {
  /** Short and factual — a count, a stage, a surface. Never a claim. */
  value: string;
  label: string;
}

interface CinematicHeroProps {
  image: ImageMetadata;
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  /**
   * Layered over the image edge. These carry content the page already
   * states — never an invented metric.
   */
  facts?: HeroFact[];
  /** Names the fact row — the spec block heading the old hero carried. */
  factsHeading?: string;
  composition?: HeroComposition;
  /** True only for the first hero on a route: this is the LCP image. */
  priority?: boolean;
}

const compositionClass: Record<HeroComposition, string> = {
  "bleed-right": styles.bleedRight ?? "",
  "bleed-left": styles.bleedLeft ?? "",
  banner: styles.banner ?? "",
  portrait: styles.portrait ?? "",
  inset: styles.inset ?? "",
};

/**
 * The image-led hero.
 *
 * Two rules hold every variant together.
 *
 * The type never sits on the photograph. It sits on the dark ground beside
 * or above it, which is what makes the contrast ratios provable rather than
 * dependent on how light that particular photo happens to be in the corner
 * where the headline lands. The scrim exists to settle the image into the
 * ground, not to rescue text laid over it.
 *
 * The fact cards are the layer that makes the composition read as depth:
 * they start in the type column and run across the image's edge, so the two
 * planes overlap instead of sitting side by side. They are pulled from what
 * the page already says — the specification block that used to be a plain
 * list in the old hero — so nothing here is decorative filler.
 */
export function CinematicHero({
  image,
  eyebrow,
  title,
  lead,
  actions,
  breadcrumbs,
  facts,
  factsHeading,
  composition = "bleed-right",
  priority = true,
}: CinematicHeroProps) {
  const media = (
    <div className={styles.media}>
      <div className={styles.mediaInner}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes={
            composition === "banner"
              ? "100vw"
              : "(min-width: 1024px) 55vw, 100vw"
          }
          className={styles.image}
        />
        {/* Settles the photograph into the dark ground it is set on. */}
        <span className={styles.scrim} aria-hidden="true" />
      </div>
    </div>
  );

  /*
   * Banner and portrait keep the image in the flow, because both place it
   * relative to the type — a band beneath it, or a column beside it. The
   * other three take it out of the flow and pin it to an edge of the
   * section, which is what lets it reach the viewport boundary.
   */
  const mediaInFlow = composition === "banner" || composition === "portrait";

  /* The inset panel is the only readable ground in that composition, so the
     trail goes inside it rather than floating on the photograph. */
  const trail = breadcrumbs ? (
    <div className={styles.breadcrumbs}>
      <Breadcrumbs items={breadcrumbs} inverse />
    </div>
  ) : null;

  return (
    <section
      className={`${styles.hero} ${compositionClass[composition]} is-inverse`.trim()}
    >
      {!mediaInFlow ? media : null}

      <Container className={styles.container}>
        {composition !== "inset" ? trail : null}

        <div className={styles.content}>
          {composition === "inset" ? trail : null}

          {eyebrow ? <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow> : null}

          <Heading level={1} size="h1" className={styles.title}>
            {title}
          </Heading>

          {lead ? (
            <BodyText size="lg" className={styles.lead}>
              {lead}
            </BodyText>
          ) : null}

          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>

        {mediaInFlow ? <div className={styles.mediaSlot}>{media}</div> : null}

        {facts?.length ? (
          <div className={styles.factsWrap}>
            {factsHeading ? (
              <p className={styles.factsHeading}>{factsHeading}</p>
            ) : null}
            <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt className={styles.factLabel}>{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
              </div>
            ))}
            </dl>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

/**
 * Turns a specification list into numbered fact cards.
 *
 * Every entity template already carried one of these — "Who this is for",
 * "Decision criteria", "Does this sound familiar?" — as a plain list in the
 * old hero. This keeps that content and changes only how it is presented, so
 * the cards are never invented copy.
 */
export function toHeroFacts(
  items: string[] | undefined,
  max = 3,
): HeroFact[] | undefined {
  if (!items?.length) return undefined;
  return items.slice(0, max).map((item, index) => ({
    label: String(index + 1).padStart(2, "0"),
    value: item,
  }));
}
