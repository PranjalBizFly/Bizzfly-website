import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionNav } from "@/components/navigation";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  ConversionBand,
  Directory,
} from "@/components/sections";
import { Button, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { useCases } from "@/content/use-cases";
import { outcomeDirectory } from "@/content/taxonomy";
import { services } from "@/content/services";
import { primaryCta } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./use-cases.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Use cases",
    description:
      "Start from what you are trying to achieve — more visibility, a better website, automated operations, AI in the business — rather than from a service list.",
    primaryTopic: "business outcomes",
    secondaryTopics: ["use cases", "business problems"],
    intent: "navigational",
  },
  "/use-cases/",
);

/**
 * Guided navigation by intent. Each route states the goal in the visitor's
 * words, then names the capabilities behind it — so the page is a routing
 * aid rather than a directory of outcomes.
 */
const routes = [
  {
    intent: "I need more visibility",
    detail:
      "Buyers cannot find you, or rankings have held while clicks have fallen away.",
    useCases: ["increase-organic-traffic", "get-found-in-ai-search"],
    services: ["seo", "ai-search-optimisation", "answer-engine-optimisation"],
  },
  {
    intent: "I need stronger local discovery",
    detail:
      "Nearby customers are choosing a competitor because that competitor appears in the map results.",
    useCases: ["rank-in-local-search"],
    services: ["google-business-profile", "seo"],
  },
  {
    intent: "I need a better website",
    detail:
      "Traffic arrives and does not convert, or the site is smaller than the business behind it.",
    useCases: ["improve-website-conversion"],
    services: ["corporate-websites", "website-redesign", "ui-ux-design"],
  },
  {
    intent: "I want more qualified enquiries",
    detail:
      "Volume is flat, or the enquiries arriving are the wrong size or sector.",
    useCases: ["generate-more-leads", "automate-sales-follow-up"],
    services: ["performance-marketing", "conversion-rate-optimisation"],
  },
  {
    intent: "I want to automate repetitive work",
    detail:
      "Capable people are spending the week on work a system should be doing.",
    useCases: ["reduce-manual-work", "improve-operational-efficiency"],
    services: ["workflow-automation", "systems-integration"],
  },
  {
    intent: "I want to introduce AI into the business",
    detail:
      "There is pressure to have an AI answer and no basis on which to choose the first project.",
    useCases: ["automate-customer-support"],
    services: ["ai-consulting", "ai-agents", "ai-chatbots"],
  },
  {
    intent: "I need a custom system",
    detail:
      "A core process runs on spreadsheets, or several tools work well alone and badly together.",
    useCases: [],
    services: ["custom-software", "web-applications", "systems-integration"],
  },
];

export default function UseCasesIndexPage() {
  const useCaseGroups = outcomeDirectory();

  const linkFor = (slug: string) => {
    const useCase = useCases.find((u) => u.slug === slug);
    if (useCase) return { label: useCase.title, href: `/use-cases/${slug}/` };
    const service = services.find((s) => s.slug === slug);
    return service ? { label: service.title, href: `/services/${slug}/` } : null;
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "BizzFly Use Cases",
          url: `${site.url}/use-cases/`,
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Use cases"
        title="What are you trying to achieve?"
        lead="Nobody wakes up wanting to buy search engine optimisation. They want enquiries, or their week back. Pick the sentence closest to your situation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Use Cases" }]}
        actions={
          <Button href={primaryCta.href} withArrow>
            {primaryCta.label}
          </Button>
        }
      />

      {/* Guided navigation, not a card grid */}
      <Section spacing="lg">
        <SectionHeader
          split
          eyebrow="Start here"
          title="Seven ways in"
          lead="Each route names the capabilities behind it, so you can see what the work actually involves before speaking to anyone."
        />

        <ol className={styles.routes}>
          {routes.map((route, index) => {
            const links = [...route.useCases, ...route.services]
              .map(linkFor)
              .filter((l): l is { label: string; href: string } => l !== null);

            return (
              <li key={route.intent} className={styles.route}>
                <span className={styles.routeIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.routeBody}>
                  <h2 className={styles.routeIntent}>{route.intent}</h2>
                  <p className={styles.routeDetail}>{route.detail}</p>
                </div>

                <ul className={styles.routeLinks}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.routeLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* The full index, for visitors who prefer to browse */}
      <Section background="surface" spacing="lg">
        <SectionHeader
          split
          eyebrow="All use cases"
          title="Or browse everything"
          lead="Every use case starts with the symptoms rather than with what we would sell you."
        />
        <SectionNav
          label="Jump to an outcome"
          items={useCaseGroups.map((group) => ({
            label: group.heading,
            count: group.items.length,
          }))}
          className="mt-8"
        />
        <div className="mt-10">
          <Directory groups={useCaseGroups} />
        </div>
        <div className="mt-8">
          <TextLink href="/services/">Browse by service instead</TextLink>
        </div>
      </Section>

      <ConversionBand
        title="Not sure which one you have?"
        lead="Describe the situation in your own words. Working out which constraint is actually binding is the first thing we do anyway."
      />
    </>
  );
}
