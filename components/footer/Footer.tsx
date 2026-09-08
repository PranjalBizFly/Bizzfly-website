import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { footerNav, legalNav, primaryCta } from "@/content/navigation";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

/**
 * Only verified business information appears here.
 *
 * The structure is a wide directory: a brand column carrying the lockup,
 * the registered address, the contact details and the two actions, then the
 * section columns, then a centred legal bar. The tagline sits in a chip that
 * straddles the top edge so the footer opens on a statement rather than on a
 * wall of links.
 *
 * Several slots the layout would support are deliberately empty. There are no
 * social icons because `site.social` is empty — the profiles exist but their
 * URLs were never verified, and a footer is the worst place to guess. There
 * are no app badges, payment marks or membership logos because BizzFly has
 * none of those things, and a directory footer is not improved by borrowing
 * furniture from a company that does.
 */
export function Footer() {
  const year = new Date().getFullYear();

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

            <address className={styles.address}>
              {site.contact.address.street}
              <br />
              {site.contact.address.city} {site.contact.address.postalCode}
              <br />
              {site.contact.address.region}, India
            </address>

            <p className={styles.contactLines}>
              <a href={site.contact.phoneHref} className={styles.link}>
                {site.contact.phone}
              </a>
              <br />
              <a href={`mailto:${site.contact.email}`} className={styles.link}>
                {site.contact.email}
              </a>
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

            <div className={styles.actions}>
              <Link href={primaryCta.href} className={styles.actionPrimary}>
                {primaryCta.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/company/careers/" className={styles.actionSecondary}>
                We&rsquo;re hiring
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* --- Section columns ------------------------------------------- */}
          <div className={styles.columns}>
            {footerNav.map((column) => (
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
              Legal is a column of its own rather than a strip under the
              copyright. It was three links competing with the copyright line
              for the same row, which is where nobody looks for a privacy
              policy.
            */}
            <nav aria-label="Legal">
              <details className={styles.group} open>
                <summary className={styles.groupHeading}>Legal</summary>
                <ul className={styles.list}>
                  {legalNav.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.link}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </nav>
          </div>
        </div>

        <div className={styles.base}>
          <p className={styles.copyright}>
            &copy; {year} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
