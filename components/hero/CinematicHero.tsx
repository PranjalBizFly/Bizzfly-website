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
 * One rule holds every variant together: the photograph is a contained
 * object, never a ground. It sits beside or beneath the type on its own
 * rounded panel, and no text is ever laid over it — so there is no scrim to
 * tune, no dependence on how light a particular frame happens to be behind a
 * headline, and the contrast is simply the verified light-theme pairing.
 *
 * The variants differ in where that panel goes and what shape it takes, so a
 * visitor moving from a service to an industry meets a different composition
 * rather than the same hero with different words in it.
 *
 * The fact cards carry content the page already states — the specification
 * block that used to be a plain list — so nothing here is decorative filler.
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
  /*
   * The photograph is the ground. It fills the section, the scrim sits on
   * top of it, and the type sits on the scrim — so the image is edge to
   * edge at every breakpoint and the copy reads white over it.
   */
  const media = (
    <div className={styles.media}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes="100vw"
        className={styles.image}
      />
      <span className={styles.scrim} aria-hidden="true" />
    </div>
  );

  const trail = breadcrumbs ? (
    <div className={styles.breadcrumbs}>
      <Breadcrumbs items={breadcrumbs} inverse />
    </div>
  ) : null;

  return (
    <section
      className={`${styles.hero} ${compositionClass[composition]} is-inverse`.trim()}
    >
      {media}

      <Container className={styles.container}>
        {trail}

        <div className={styles.content}>
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
