import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import { SectionHeader, ConversionBand } from "@/components/sections";
import { Button, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { technologies } from "@/content/technologies";
import { services } from "@/content/services";
import { primaryCta } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import type { TechnologyGroupId } from "@/types/content";
import styles from "./technologies.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Technologies",
    description:
      "The technologies BizzFly builds on, organised by the business capability each one enables — with the reasoning behind every choice and when we would advise against it.",
    primaryTopic: "technology capability",
    secondaryTopics: ["AI", "automation", "web", "software", "data"],
    intent: "commercial",
  },
  "/technologies/",
);

/** Grouped by business capability rather than by vendor or logo. */
const groups: { id: TechnologyGroupId; label: string; role: string }[] = [
  {
    id: "ai",
    label: "AI",
    role: "Where language models genuinely help, and where a rule engine is the better answer.",
  },
  {
    id: "automation",
    label: "Automation & Integration",
    role: "Connecting the systems you already run so data stops being carried by people.",
  },
  {
    id: "web",
    label: "Web",
    role: "How pages are built and published, and whether machines can read them.",
  },
  {
    id: "software",
    label: "Software & Infrastructure",
    role: "Where applications run, how they deploy, and what happens when they fail.",
  },
  {
    id: "search-data",
    label: "Search & Data",
    role: "The measurement layer that tells you which of the above is actually working.",
  },
  {
    id: "practice",
    label: "Engineering Practice",
    role: "How we build, so your own team can maintain it after we leave.",
  },
];

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

      <EditorialHero
        eyebrow="Technologies"
        title="Choices with reasons attached"
        lead="A stack page without trade-offs is a logo wall. Every page here states what we use, why we chose it, and the cases where we would tell you to use something else — including where the honest answer is not to use technology at all."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technologies" }]}
        actions={
          <Button href={primaryCta.href} withArrow>
            {primaryCta.label}
          </Button>
        }
      />

      <Section spacing="lg">
        <SectionHeader
          split
          eyebrow="Ecosystem"
          title="Organised by what it enables"
          lead="Grouped by the business capability each layer supports, because a list of product names tells a buyer nothing useful."
        />

        <div className={styles.groups}>
          {groups.map((group) => {
            const items = technologies.filter((t) => t.group === group.id);
            if (items.length === 0) return null;

            return (
              <section key={group.id} className={styles.group}>
                <div className={styles.groupHead}>
                  <h2 className={styles.groupLabel}>{group.label}</h2>
                  <p className={styles.groupRole}>{group.role}</p>
                </div>

                <ul className={styles.items}>
                  {items.map((technology) => {
                    const applied = (technology.services ?? [])
                      .map((slug) => services.find((s) => s.slug === slug))
                      .filter((s): s is NonNullable<typeof s> => Boolean(s))
                      .slice(0, 3);

                    return (
                      <li key={technology.slug} className={styles.item}>
                        <h3 className={styles.itemTitle}>
                          <Link href={`/technologies/${technology.slug}/`}>
                            {technology.title}
                          </Link>
                        </h3>
                        <p className={styles.itemWhy}>
                          {technology.whyItMatters ?? technology.answer}
                        </p>
                        {applied.length > 0 ? (
                          <p className={styles.itemApplied}>
                            <span className={styles.itemAppliedLabel}>
                              Applied in
                            </span>{" "}
                            {applied.map((service, index) => (
                              <span key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}/`}
                                  className={styles.itemAppliedLink}
                                >
                                  {service.title}
                                </Link>
                                {index < applied.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </Section>

      {/* Honest note about what is and is not confirmed for publication */}
      <Section background="surface" spacing="md" width="content">
        <SectionHeader
          eyebrow="A note on specifics"
          title="We name a tool only when we would defend the choice"
          level={2}
        />
        <p className={styles.note}>
          You will notice these pages describe how we choose rather than listing
          badges. That is deliberate. We hold no reseller or partner
          arrangements that steer a recommendation, and an unverified stack
          claim is exactly the detail a technical buyer checks — so we would
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
