import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

/**
 * Only verified business information appears here.
 * The live site publishes two phone numbers and three email addresses across
 * different templates; this renders one of each, from content/site.ts.
 * See docs/architecture/07-existing-site-audit.md finding F3.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} is-inverse`}>
      <Container>
        <div className={styles.statement}>
          <p className={styles.statementText}>
            Getting found is the first constraint on growth. We fix that, then
            build the systems that handle what follows.
          </p>
          <Link href="/contact/" className={styles.statementCta}>
            Start a conversation
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className={styles.columns}>
          {footerNav.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <details className={styles.group} open>
                <summary className={styles.groupHeading}>
                  <Link href={column.href}>{column.heading}</Link>
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
        </div>

        <div className={styles.contact}>
          <div>
            {/*
              The footer is a dark surface, so the official reversed lockup
              sits here unaltered and at full clearspace — the one place on
              the site with room for it.
            */}
            <BrandLogo
              variant="reversed"
              height="var(--logo-height-footer)"
              className={styles.contactLogo}
            />
            <address className={styles.address}>
              {site.contact.address.street}
              <br />
              {site.contact.address.city} {site.contact.address.postalCode}
              <br />
              {site.contact.address.region}, India
            </address>
          </div>
          <div>
            <p className={styles.contactHeading}>Get in touch</p>
            <p className={styles.address}>
              <a href={site.contact.phoneHref} className={styles.link}>
                {site.contact.phone}
              </a>
              <br />
              <a href={`mailto:${site.contact.email}`} className={styles.link}>
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className={styles.base}>
          <p className={styles.copyright}>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <ul className={styles.legal}>
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
