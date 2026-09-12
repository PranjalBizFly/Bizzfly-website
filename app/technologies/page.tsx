import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CinematicHero } from "@/components/hero";
import { SectionHeader, ConversionBand, StickyIndex } from "@/components/sections";
import { Button, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { technologies, technologyGroups } from "@/content/technologies";
import { services } from "@/content/services";
import { primaryCta } from "@/content/navigation";
import { titleCase } from "@/lib/titleCase";
import { getTechnologiesHubImage } from "@/content/images/imageAssignments";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./technologies.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Technologies",
    description:
      "The technologies BizzFly builds on, organised by the business capability each enables: the reasoning behind every choice, and when we would advise against it.",
    primaryTopic: "technology capability",
    secondaryTopics: ["AI", "automation", "web", "software", "data"],
    intent: "commercial",
  },
  "/technologies/",
);

export default function TechnologiesIndexPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "BizzFly Technology Capability",
          url: `${site.url}/technologies/`,
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      <CinematicHero
        image={getTechnologiesHubImage()}
        composition="bleed-right"
        eyebrow="Technologies"
        title="Choices with reasons attached"
        lead="A stack page without trade-offs is a logo wall. Every page here states what we use, why we chose it, and the cases where we would tell you to use something else, including where the honest answer is not to use technology at all."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technologies" }]}
        actions={
          <Button href={primaryCta.href} withArrow>
            {titleCase(primaryCta.label)}
          </Button>
        }
        factsHeading="Stack Governance"
        facts={[
          {
            value: String(technologies.length),
            label: "technologies documented, each with the reasoning and the cases against it",
          },
          {
            value: String(
              technologyGroups.filter((group) =>
                technologies.some((technology) => technology.group === group.id),
              ).length,
            ),
            label: "capability layers, grouped by what they enable rather than by vendor",
          },
          {
            value: "0",
            label: "reseller or partner arrangements steering any recommendation here",
          },
        ]}
      />

      <Section spacing="lg">
        <SectionHeader
          split
          eyebrow="Ecosystem"
          title="Organised by what it enables"
          lead="Grouped by the business capability each layer supports, because a list of product names tells a buyer nothing useful."
        />

        <StickyIndex
          label="Jump to a capability"
          groups={technologyGroups
            .map((group) => ({
              id: group.id,
              label: group.label,
              role: group.role,
              items: technologies
                .filter((technology) => technology.group === group.id)
                .map((technology) => ({
                  title: technology.title,
                  href: `/technologies/${technology.slug}/`,
                  description: technology.whyItMatters ?? technology.answer,
                  metaLabel: "Applied in",
                  metaLinks: (technology.services ?? [])
                    .map((slug) => services.find((s) => s.slug === slug))
                    .filter((s): s is NonNullable<typeof s> => Boolean(s))
                    .slice(0, 3)
                    .map((service) => ({
                      label: service.title,
                      href: `/services/${service.slug}/`,
                    })),
                })),
            }))
            .filter((group) => group.items.length > 0)}
        />
      </Section>

      {/* Honest note about what is and is not confirmed for publication */}
      <Section background="tint" spacing="md" width="content">
        <SectionHeader
          eyebrow="A note on specifics"
          title="We name a tool only when we would defend the choice"
          level={2}
        />
        <p className={styles.note}>
          You will notice these pages describe how we choose rather than listing
          badges. That is deliberate. We hold no reseller or partner
          arrangements that steer a recommendation, and an unverified stack
          claim is exactly the detail a technical buyer checks, so we would
          rather explain the decision than decorate the page with logos.
        </p>
        <div className="mt-8">
          <TextLink href="/technologies/engineering-standards/">
            How we build and hand over
          </TextLink>
        </div>
      </Section>

      <ConversionBand
        title="Want to talk architecture rather than marketing?"
        lead="A technical discovery call is engineer to engineer. Bring the constraints and the existing system; we will tell you what we would do and what we would leave alone."
        cta={{
          label: "Technical discovery call",
          href: "/contact/",
          tier: "T4",
          note: "No sales qualifier first.",
        }}
      />
    </>
  );
}
