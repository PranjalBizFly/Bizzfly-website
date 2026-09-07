import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import styles from "./contact.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Contact",
    description:
      "Tell us what you are trying to build, improve or grow. We reply within one business day, and if we are not the right people for it we will say so.",
    primaryTopic: "contact BizzFly",
    secondaryTopics: ["consultation", "enquiry", "get in touch"],
    intent: "transactional",
  },
  "/contact/",
  { kind: "conversion" },
);

/**
 * Conversion paths by intent. Each links to the capability that answers it,
 * so a visitor who is not ready to write a message still has a next step.
 */
const paths = [
  {
    intent: "I need more visibility",
    detail: "Search, AI answers and maps",
    href: "/services/search-ai-visibility/",
  },
  {
    intent: "I need a better website",
    detail: "Design, build and redesign",
    href: "/services/web-development/",
  },
  {
    intent: "I want to automate operations",
    detail: "Workflow and process automation",
    href: "/services/workflow-automation/",
  },
  {
    intent: "I want AI in the business",
    detail: "Agents, assistants and advisory",
    href: "/services/ai-automation/",
  },
  {
    intent: "I need custom software",
    detail: "Systems built around your process",
    href: "/services/custom-software/",
  },
  {
    intent: "I want stronger local discovery",
    detail: "Google Business Profile and local search",
    href: "/services/google-business-profile/",
  },
];

/*
  ContactPage schema only. No LocalBusiness with opening hours or geo
  coordinates, because those have not been verified for publication.
*/
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${site.url}/contact/`,
  name: "Contact BizzFly",
  description:
    "Tell us what you are trying to build, improve or grow. We reply within one business day.",
  mainEntity: { "@id": `${site.url}/#organization` },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactSchema} />

      {/* Conversion-led: the form starts high, no navigation cross-sell. */}
      <Section spacing="md" width="content">
        <div className={styles.crumbs}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        </div>

        <div className={styles.layout}>
          <div className={styles.intro}>
            <Eyebrow>Contact</Eyebrow>
            <Heading level={1} size="h1" className={styles.title}>
              Tell us what you are trying to build, improve or grow
            </Heading>
            <BodyText size="lg" className={styles.lead}>
              Describe the situation in your own words. If we are not the right
              people for it, we will tell you and point you somewhere better.
            </BodyText>

            <ul className={styles.trust}>
              <li>
                <span className={styles.trustIndex}>01</span>
                <span>
                  <strong>We reply within one business day.</strong> A real reply
                  from someone who read your message.
                </span>
              </li>
              <li>
                <span className={styles.trustIndex}>02</span>
                <span>
                  <strong>The first call is 30 minutes.</strong> We ask about the
                  problem. No deck, no pitch.
                </span>
              </li>
              <li>
                <span className={styles.trustIndex}>03</span>
                <span>
                  <strong>No obligation.</strong> If we run a diagnostic, you keep
                  the findings whether or not you continue.
                </span>
              </li>
            </ul>

            <div className={styles.direct}>
              <p className={styles.directHeading}>Or reach us directly</p>
              <p>
                <a href={site.contact.phoneHref} className={styles.directLink}>
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className={styles.directLink}
                >
                  {site.contact.email}
                </a>
              </p>
              <address className={styles.address}>
                {site.contact.address.street}
                <br />
                {site.contact.address.city} {site.contact.address.postalCode}
                <br />
                {site.contact.address.region}, India
              </address>
            </div>
          </div>

          <div className={styles.formColumn}>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* Not ready to write a message? Route by intent instead. */}
      <Section background="surface" spacing="lg">
        <Heading level={2} size="h3" className={styles.pathsHeading}>
          Not ready to write a message?
        </Heading>
        <BodyText muted className={styles.pathsLead}>
          Start with the sentence closest to your situation and read how we would
          approach it.
        </BodyText>

        <ul className={styles.paths}>
          {paths.map((path) => (
            <li key={path.href} className={styles.path}>
              <Link href={path.href} className={styles.pathLink}>
                <span className={styles.pathIntent}>{path.intent}</span>
                <span className={styles.pathDetail}>{path.detail}</span>
                <span className={styles.pathArrow} aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
