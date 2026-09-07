import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import { SectionHeader, ConversionBand } from "@/components/sections";
import { Button, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { primaryCta } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./industries.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Industries",
    description:
      "Sector-specific digital growth and automation — manufacturing, real estate, education and professional services, with the problems named in each sector's own vocabulary.",
    primaryTopic: "industries served",
    secondaryTopics: ["sectors", "manufacturing", "real estate", "education"],
    intent: "navigational",
  },
  "/industries/",
);

export default function IndustriesIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Industries BizzFly works with",
          url: `${site.url}/industries/`,
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Industries"
        title="The work looks different in every sector"
        lead="A manufacturer and an education group have almost nothing in common except that both are hard to find. We publish a sector page only where we can name that sector's real problems in its own vocabulary — which is why this list is short."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        actions={
          <Button href={primaryCta.href} withArrow>
            {primaryCta.label}
          </Button>
        }
      />

      {/*
        Each sector shows its actual challenges and the capabilities that
        address them, so the page is scannable by problem rather than by name.
      */}
      <Section spacing="lg">
        <SectionHeader
          split
          eyebrow="Sectors"
          title="Where we work, and what we see there"
          lead="If your sector is not listed, it does not mean we cannot help — it means we have not yet published a page we would stand behind."
        />

        <div className={styles.sectors}>
          {industries.map((industry, index) => {
            const capabilities = Array.from(
              new Set(industry.problems.flatMap((p) => p.addressedBy)),
            )
              .map((slug) => services.find((s) => s.slug === slug))
              .filter((s): s is NonNullable<typeof s> => Boolean(s))
              .slice(0, 5);

            return (
              <section key={industry.slug} className={styles.sector}>
                <div className={styles.sectorHead}>
                  <span className={styles.sectorIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className={styles.sectorTitle}>
                    <Link href={`/industries/${industry.slug}/`}>
                      {industry.title}
                    </Link>
                  </h2>
                  <p className={styles.sectorAnswer}>{industry.answer}</p>
                </div>

                <div className={styles.sectorChallenges}>
                  <p className={styles.columnLabel}>Common challenges</p>
                  <ul className={styles.challengeList}>
                    {industry.problems.slice(0, 4).map((problem) => (
                      <li key={problem.title}>{problem.title}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.sectorCapabilities}>
                  <p className={styles.columnLabel}>Where we help</p>
                  <ul className={styles.capabilityList}>
                    {capabilities.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}/`}
                          className={styles.capabilityLink}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <TextLink href={`/industries/${industry.slug}/`}>
                    {industry.title} in detail
                  </TextLink>
                </div>
              </section>
            );
          })}
        </div>
      </Section>

      <Section background="surface" spacing="md" width="content">
        <SectionHeader
          eyebrow="Not listed?"
          title="Sector fluency is earned, not claimed"
          level={2}
        />
        <p className={styles.note}>
          We would rather publish four sectors we understand than twenty we do
          not. If yours is not here, tell us what the work involves — we will be
          straight with you about whether we are the right people for it.
        </p>
        <div className="mt-8">
          <TextLink href="/contact/">Tell us about your sector</TextLink>
        </div>
      </Section>

      <ConversionBand />
    </>
  );
}
