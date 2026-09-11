import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { SplitText } from "@/components/motion/SplitText";
import { titleCase } from "@/lib/titleCase";
import { CountUp } from "@/components/motion";
import { Breadcrumbs, type Crumb } from "@/components/navigation/Breadcrumbs";
import styles from "./Hero.module.css";

export interface HeroLedgerEntry {
  /** The figure itself. Kept a string so "146" and "6 of 6" both work. */
  figure: string;
  /** What the figure counts, in words a reader can check against the page. */
  label: string;
}

interface EditorialHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  inverse?: boolean;
  /**
   * An at-a-glance ledger beside the statement.
   *
   * This hero is type-led and caps its heading and lead at a reading
   * measure, which on a 1440 viewport left the right-hand half of every hub
   * page empty above the fold — ten pages opening on the same large void.
   * The fix is not to stretch the type, which would break the measure that
   * makes it readable, but to give the space something worth reading.
   *
   * Every entry must be a fact the page itself can be checked against — how
   * many things it indexes, how they are grouped. Never a claim the site
   * cannot source: no client counts, no results, no awards. If a page has no
   * such figure, it passes no ledger and the hero stays as it was.
   */
  ledger?: HeroLedgerEntry[];
}

/** H-A Editorial Statement. Typography carries the weight; no image. */
export function EditorialHero({
  eyebrow,
  title,
  lead,
  actions,
  breadcrumbs,
  inverse = false,
  ledger,
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
        <div className={ledger?.length ? styles.editorialGrid : undefined}>
          <div>
            {/*
              The type-led hero, so the headline carries the whole entrance —
              there is no image to share it with. It is also the LCP element on
              these pages, which is why the offset stays at the 80ms the block
              rise already used rather than being lengthened for effect: the
              first word paints at the same moment it always did, and the rest
              arrive behind it.
            */}
            <Heading level={1} size="h1" className={styles.editorial}>
              <SplitText text={titleCase(title)} by="char" mode="load" offset={80} />
            </Heading>
            {lead ? (
              <BodyText size="lg" className={styles.editorialLead}>
                {lead}
              </BodyText>
            ) : null}
            {actions ? <div className={styles.actions}>{actions}</div> : null}
          </div>

          {ledger?.length ? (
            <dl className={styles.ledger}>
              {ledger.map((entry, index) => (
                <div
                  key={entry.label}
                  className={styles.ledgerRow}
                  /* Each figure lands on its own beat behind the column. */
                  style={{ "--ledger-index": index } as CSSProperties}
                >
                  <dt className={styles.ledgerFigure}>
                    {/*
                      Counted up on arrival. These are the only animated
                      numbers on the site, and every one of them is derived
                      from published content — how many sectors exist, how
                      many formats are indexed — so the count is running to a
                      fact the reader can check against the page below it.
                    */}
                    <CountUp value={entry.figure} />
                  </dt>
                  <dd className={styles.ledgerLabel}>{entry.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
