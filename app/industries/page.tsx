import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionNav } from "@/components/navigation";
import { EditorialHero } from "@/components/hero";
import { SectionHeader, ConversionBand, Directory } from "@/components/sections";
import { Button, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { industries } from "@/content/industries";
import { sectorDirectory, LEAD_SECTORS } from "@/content/taxonomy";
import { services } from "@/content/services";
import { primaryCta } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./industries.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Industries",
    description:
      "Sector-specific digital growth and automation — manufacturing, real estate, education and professional services, with problems named in each sector's own words.",
    primaryTopic: "industries served",
    secondaryTopics: ["sectors", "manufacturing", "real estate", "education"],
    intent: "navigational",
  },
  "/industries/",
);

export default function IndustriesIndexPage() {
  const bySlug = (slug: string) => industries.find((i) => i.slug === slug);

  const leadIndustries = LEAD_SECTORS.map(bySlug).filter(
    (i): i is NonNullable<typeof i> => Boolean(i),
  );

  const sectorGroups = sectorDirectory();

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
        lead="A manufacturer and an education group have almost nothing in common except that both are hard to find. We publish a sector page only where we can name that sector's real problems in its own vocabulary, in the sector's own words."
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
          eyebrow="01 / Sectors"
          title="Where we work, and what we see there"
          lead="Six shown in full — the sector context, the problems we hear most, and the work that addresses them. Every sector we publish is listed below."
        />

        <div className={styles.sectors}>
          {leadIndustries.map((industry, index) => {
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

      {/* The complete set, grouped by how the business earns. */}
      {/*
        The tinted band rather than the grey one. Six sectors were shown in
        full above; this is where the whole set is, and the page needs the
        change of ground to say that the reader has moved from the selection
        to the index.
      */}
      <Section background="tint" spacing="lg">
        <SectionHeader
          split
          eyebrow="02 / Every sector"
          title={`All ${industries.length} industries`}
          lead="Grouped by business model rather than by category, because the digital problem a manufacturer has looks far more like a logistics operator's than like another company that happens to share its industry code."
        />
        <SectionNav
          label="Jump to a business model"
          items={sectorGroups.map((group) => ({
            label: group.heading,
            count: group.items.length,
          }))}
          className="mt-8"
        />
        <div className="mt-10">
          <Directory groups={sectorGroups} filter={{ noun: "industries" }} />
        </div>
      </Section>

      <Section background="surface" spacing="md" width="content">
        <SectionHeader
          eyebrow="03 / Not listed?"
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
