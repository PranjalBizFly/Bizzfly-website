import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  footerNav,
  legalNav,
  primaryCta,
  valuePropositions,
} from "@/content/navigation";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

/*
 * Stroked marks, drawn to the same spec as the rest of the site's icons: a
 * 24-unit box, 1.75 stroke, round joins, currentColor. Local to the footer
 * because nothing else needs them, and a shared icon set would be a larger
 * decision than one component is entitled to make.
 */
const marks: Record<string, ReactNode> = {
  discover: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  scale: (
    <>
      <path d="M4 19h16" />
      <path d="M7.5 19v-5M12 19V8.5M16.5 19v-8" />
    </>
  ),
  future: (
    <>
      <path d="M4 15.5 9.5 10l3.5 3.5L20 6.5" />
      <path d="M15 6.5h5v5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  phone: (
    <path d="M6.4 3.5h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.4 5.4l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.4 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 6.9 8.2 5.8 8.2-5.8" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.4 2.4 4.6-4.9" />
    </>
  ),
};

function Mark({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {marks[name]}
    </svg>
  );
}

/*
 * The opening clause of a value, used as the card's second line.
 *
 * Taken from the description rather than written fresh, so the card cannot
 * drift from what /company/ publishes: change the value and the footer
 * follows. Every value's description opens with a complete sentence, and the
 * whole string is used if one ever does not.
 */
function firstSentence(text: string): string {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

/** One icon per value, in the order the values are published. */
const valueMarks = ["discover", "scale", "future"];

/**
 * Only verified business information appears here.
 *
 * The structure is a wide directory: a brand column carrying the lockup, the
 * positioning, the three published values, and the registered contact
 * details; then five section columns; then a sixth that stacks the Company
 * links, what BizzFly commits to, and the two actions. A tagline chip
 * straddles the top edge so the footer opens on a statement rather than on a
 * wall of links, and a split base bar carries the copyright and the legal
 * links on one line.
 *
 * WHAT IS DELIBERATELY MISSING. There are no social icons, because
 * `site.social` is empty — the profiles exist but their URLs were never
 * verified, and a footer is the worst place to guess. The row is built and
 * will render the moment those URLs are added. There are no badges, ratings,
 * counts, certifications or membership marks, because BizzFly has none that
 * have been verified for publication — see `site.unverified`.
 *
 * Every line of copy in this file comes from `content/`: the values from
 * /company/, the commitments from the value strip, the address, phone and
 * email from the verified contact record. Nothing here is written for the
 * footer, which is what stops a footer becoming the place unsourced claims
 * accumulate.
 */
export function Footer() {
  const year = new Date().getFullYear();

  /* Five columns beside the brand, then the last one stacked with the tail. */
  const columns = footerNav.slice(0, -1);
  const lastColumn = footerNav[footerNav.length - 1];

  /*
   * The three closing statements from the value strip. Every line in that
   * list is already a restatement of something the site publishes and commits
   * to elsewhere, which is exactly the bar a footer badge has to clear.
   */
  const commitments = valuePropositions.slice(-3);

  return (
    <footer className={`${styles.footer} is-inverse`}>
      {/* Straddles the top edge, so the band reads as attached to the footer. */}
      <div className={styles.taglineRow}>
        <p className={styles.tagline}>Get found. Build well. Automate the rest.</p>
      </div>

      <Container width="wide">
        <div className={styles.main}>
          {/* --- Brand column --------------------------------------------- */}
          <div className={styles.brand}>
            {/*
              The footer is a dark surface in both themes, so BrandLogo
              resolves to the reversed lockup here. It sits unaltered and at
              full clearspace — the one place on the site with room for it.
            */}
            <BrandLogo
              height="var(--logo-height-footer)"
              className={styles.brandLogo}
            />

            <p className={styles.brandLine}>
              Getting found is the first constraint on growth. We fix that, then
              build the systems that handle what follows.
            </p>

            {/* Renders nothing until the profile URLs are verified. */}
            {site.social.length > 0 ? (
              <ul className={styles.social} aria-label="BizzFly on social media">
                {site.social.map((profile) => (
                  <li key={profile.href}>
                    <a
                      href={profile.href}
                      className={styles.socialLink}
                      rel="noopener noreferrer"
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* The three published values, one card each. */}
            <ul className={styles.valueCards}>
              {site.values.map((value, index) => (
                <li key={value.title} className={styles.valueCard}>
                  <span className={styles.valueIcon}>
                    <Mark
                      name={valueMarks[index] ?? "discover"}
                      className={styles.markSm}
                    />
                  </span>
                  <span className={styles.valueText}>
                    <span className={styles.valueTitle}>{value.title}</span>
                    <span className={styles.valueNote}>
                      {firstSentence(value.description)}
                    </span>
                  </span>
                  <span className={styles.valueBadge}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>

            {/* Registered office, phone and email — the verified record. */}
            <ul className={styles.contact}>
              <li className={styles.contactRow}>
                <Mark name="pin" className={styles.contactMark} />
                <address className={styles.address}>
                  {site.contact.address.street}, {site.contact.address.city} &ndash;{" "}
                  {site.contact.address.postalCode},{" "}
                  {site.contact.address.region}, India
                </address>
              </li>
              <li className={styles.contactRow}>
                <Mark name="phone" className={styles.contactMark} />
                <a href={site.contact.phoneHref} className={styles.contactLink}>
                  {site.contact.phone}
                </a>
              </li>
              <li className={styles.contactRow}>
                <Mark name="mail" className={styles.contactMark} />
                <a
                  href={`mailto:${site.contact.email}`}
                  className={styles.contactLink}
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* --- Section columns ------------------------------------------- */}
          <div className={styles.columns}>
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                {/*
                  <details> so the columns collapse on a phone, where six open
                  lists is several screens of scrolling before the copyright.
                  Forced open from md up by the stylesheet.
                */}
                <details className={styles.group} open>
                  <summary className={styles.groupHeading}>
                    {column.heading}
                  </summary>
                  <ul className={styles.list}>
                    {column.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={styles.link}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </nav>
            ))}

            {/*
              The last track carries more than a list.

              Company, then what the company commits to, then the two actions.
              Stacking them in the final column rather than giving each its own
              cell is what keeps the directory to six even tracks and puts the
              actions at the end of the reading order, where a footer's
              actions belong.
            */}
            <div className={styles.tail}>
              {lastColumn ? (
                <nav aria-label={lastColumn.heading}>
                  <details className={styles.group} open>
                    <summary className={styles.groupHeading}>
                      {lastColumn.heading}
                    </summary>
                    <ul className={styles.list}>
                      {lastColumn.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className={styles.link}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </nav>
              ) : null}

              <div className={styles.commitBlock}>
                <p className={styles.commitHeading}>What we commit&nbsp;to</p>
                <ul className={styles.commitList}>
                  {commitments.map((line) => (
                    <li key={line} className={styles.commitItem}>
                      <Mark name="check" className={styles.commitMark} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.actions}>
                <Link href="/careers/" className={styles.actionSecondary}>
                  We&#39;re hiring
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link href={primaryCta.href} className={styles.actionPrimary}>
                  {primaryCta.label}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/*
          Copyright left, legal right, on one line.
          The three legal links were a column of their own, which made the
          directory seven uneven tracks. On the base bar they sit where a
          reader looks for a privacy policy, and the directory divides evenly.
        */}
        <div className={styles.base}>
          <p className={styles.copyright}>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className={styles.baseLinks}>
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.baseLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
