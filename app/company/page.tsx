import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  ConversionBand,
  Directory,
  VisualStoryBlock,
} from "@/components/sections";
import { Button } from "@/components/buttons";
import { Heading, BodyText } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { companyPages, extraCompanyPages } from "@/content/company";
import { methodologyPages } from "@/content/company-methodology";
import { transparencyPages } from "@/content/company-transparency";
import { site } from "@/content/site";
import { primaryCta } from "@/content/navigation";
import { getCompanyHubImage } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import styles from "./company.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Company",
    description:
      "BizzFly is a Pune-based digital growth and technology company. How we work, what we optimise for, and how to reach us.",
    primaryTopic: "about BizzFly",
    secondaryTopics: ["company", "approach", "careers"],
    intent: "navigational",
  },
  "/company/",
);

export default function CompanyIndexPage() {
  /*
   * Three groups rather than one list of twenty-two.
   *
   * The flat list with an answer paragraph each measured 3,669px. These
   * pages divide cleanly by what a reader wants from them — who we are, how
   * we do the work, and what we will and will not claim — so the grouping is
   * a real distinction rather than an arbitrary split to shorten the page.
   *
   * Methodology and transparency pages are listed here and not only in the
   * Company mega menu: that panel renders on open, so its links never reach
   * the served HTML and cannot keep a page off the orphan list.
   */
  const canonicalMap: Record<string, string> = {
    about: "/about-us/",
    approach: "/our-approach/",
    "how-we-work": "/how-we-work/",
    "discovery-process": "/discovery-process/",
    "engagement-models": "/engagement-models/",
    careers: "/careers/",
  };

  const companyGroups = [
    {
      heading: "The company",
      items: [...companyPages, ...extraCompanyPages],
    },
    { heading: "How we work", items: methodologyPages },
    { heading: "What we commit to", items: transparencyPages },
  ]
    .map((group) => ({
      heading: group.heading,
      items: group.items.map((page) => ({
        label: page.title,
        href: canonicalMap[page.slug] ?? `/company/${page.slug}/`,
      })),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About BizzFly",
          url: `${site.url}/company/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Company"
        title="A small team in Pune, working across two disciplines that are usually kept apart"
        lead="Search visibility and business systems are treated as separate trades by separate suppliers, which is why neither tends to get solved properly. We work across both."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Company" }]}
        actions={
          <Button href={primaryCta.href} withArrow>
            {primaryCta.label}
          </Button>
        }
      />

      {/* Pune team & workspace editorial visual */}
      <Section spacing="md" width="content">
        <VisualStoryBlock
          image={getCompanyHubImage()}
          variant="C"
          priority
          caption="The BizzFly team in Pune, India — combining digital growth strategy with systems engineering."
        />
      </Section>

      {/* Values — verified from the live site, genuinely specific */}
      <Section spacing="lg">
        <SectionHeader
          split
          eyebrow="What we optimise for"
          title="Three things we hold every engagement against"
          lead="Not slogans. Each one has cost us work we would otherwise have taken."
        />
        <div className={styles.values}>
          {site.values.map((value, index) => (
            <div key={value.title} className={styles.value}>
              <span className={styles.valueIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <Heading level={3} size="h3">
                {value.title}
              </Heading>
              <BodyText muted className={styles.valueBody}>
                {value.description}
              </BodyText>
            </div>
          ))}
        </div>
      </Section>

      <Section background="surface" spacing="lg">
        <SectionHeader
          split
          eyebrow="More"
          title="About the company"
          lead="Everything we publish about how we work, priced, scoped and bounded."
        />
        <Directory groups={companyGroups} />
      </Section>

      <ConversionBand />
    </>
  );
}
