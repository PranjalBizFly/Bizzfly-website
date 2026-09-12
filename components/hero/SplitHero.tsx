import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { SplitText } from "@/components/motion/SplitText";
import { Breadcrumbs, type Crumb } from "@/components/navigation/Breadcrumbs";
import styles from "./Hero.module.css";

interface SplitHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Specification block, not decoration. */
  asideHeading?: string;
  asideItems?: string[];
  inverse?: boolean;
}

/**
 * H-B Split Contextual. 7/5 on desktop; the aside moves below the CTA on
 * mobile, which is a different composition rather than a reflow.
 */
export function SplitHero({
  eyebrow,
  title,
  lead,
  actions,
  breadcrumbs,
  asideHeading,
  asideItems,
  inverse = false,
}: SplitHeroProps) {
  return (
    <section
      /* See EditorialHero for why the inverse variant declares no ground. */
      data-ground={inverse ? undefined : "bg"}
      className={`${styles.hero} ${inverse ? `${styles.heroInverse} is-inverse` : ""}`.trim()}
    >
      <Container>
        {breadcrumbs ? (
          <div className={styles.breadcrumbs}>
            <Breadcrumbs items={breadcrumbs} inverse={inverse} />
          </div>
        ) : null}

        <div className={styles.split}>
          <div>
            {eyebrow ? <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow> : null}
            <Heading level={1} size="h1" className={styles.splitTitle}>
              <SplitText text={title} by="char" mode="load" offset={80} />
            </Heading>
            {lead ? (
              <BodyText size="lg" className={styles.splitLead}>
                {lead}
              </BodyText>
            ) : null}
            {actions ? <div className={styles.actions}>{actions}</div> : null}
          </div>

          {asideItems?.length ? (
            <div className={styles.splitAside}>
              {asideHeading ? (
                <p className={styles.asideHeading}>{asideHeading}</p>
              ) : null}
              <ul className={styles.asideList}>
                {asideItems.map((item, index) => (
                  <li
                    key={item}
                    className={styles.asideItem}
                    /* Each line arrives on its own beat rather than the
                       whole specification block appearing at once. */
                    style={{ "--aside-index": index } as CSSProperties}
                  >
                    <span className={styles.asideIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
