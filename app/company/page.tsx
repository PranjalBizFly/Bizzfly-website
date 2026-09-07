import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  RelatedContent,
  ConversionBand,
} from "@/components/sections";
import { Button } from "@/components/buttons";
import { Heading, BodyText } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { companyPages, extraCompanyPages } from "@/content/company";
import { site } from "@/content/site";
import { primaryCta } from "@/content/navigation";
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
  const pages = [...companyPages, ...extraCompanyPages];

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
        <SectionHeader split eyebrow="More" title="About the company" />
        <RelatedContent
          mode="list"
          items={pages.map((page) => ({
            label: page.title,
            href: `/company/${page.slug}/`,
            type: "COMPANY",
            description: page.answer,
          }))}
        />
      </Section>

      <ConversionBand />
    </>
  );
}
