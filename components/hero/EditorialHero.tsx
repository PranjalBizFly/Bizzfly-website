import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Breadcrumbs, type Crumb } from "@/components/navigation/Breadcrumbs";
import styles from "./Hero.module.css";

interface EditorialHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  inverse?: boolean;
}

/** H-A Editorial Statement. Typography carries the weight; no image. */
export function EditorialHero({
  eyebrow,
  title,
  lead,
  actions,
  breadcrumbs,
  inverse = false,
}: EditorialHeroProps) {
  return (
    <section
      className={`${styles.hero} ${inverse ? `${styles.heroInverse} is-inverse` : ""}`.trim()}
    >
      <Container>
        {breadcrumbs ? (
          <div className={styles.breadcrumbs}>
            <Breadcrumbs items={breadcrumbs} inverse={inverse} />
          </div>
        ) : null}
        {eyebrow ? <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow> : null}
        <Heading level={1} size="h1" className={styles.editorial}>
          {title}
        </Heading>
        {lead ? (
          <BodyText size="lg" className={styles.editorialLead}>
            {lead}
          </BodyText>
        ) : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </Container>
    </section>
  );
}
