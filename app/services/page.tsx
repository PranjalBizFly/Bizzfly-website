import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionNav } from "@/components/navigation";
import { CinematicHero } from "@/components/hero";
import {
  SectionHeader,
  CardTrack,
  ConversionBand,
  type CardTrackEntry,
} from "@/components/sections";
import { Button, ButtonGroup, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { practices } from "@/content/practices";
import { getServiceImage, getServicesHubImage } from "@/content/images";
import { serviceGroups } from "@/content/service-meta";
import { primaryCta } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";
import { titleCase } from "@/lib/titleCase";

/*
 * Each discipline carries the photograph already assigned to its practice
 * page, so the card and the page it opens show the same frame. All six
 * resolve; none is shared with another practice.
 */
const practiceCards: CardTrackEntry[] = practices
  .map((practice, index) => {
    const image = getServiceImage(practice.slug);
    return image
      ? {
          index: String(index + 1).padStart(2, "0"),
          title: practice.title,
          description: practice.menuDescription,
          href: `/services/${practice.slug}/`,
          image,
        }
      : null;
  })
  .filter((entry): entry is CardTrackEntry => entry !== null);
import { site } from "@/content/site";
import styles from "./services.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Services",
    description:
      "Digital visibility, digital experience, systems and software, automation, AI and growth: six capability groups and where each one applies.",
    primaryTopic: "BizzFly services",
    secondaryTopics: ["digital services", "capabilities", "SEO", "automation"],
    intent: "navigational",
  },
  "/services/",
);

export default function ServicesIndexPage() {
  /*
   * Group from the assembled service, not from metaForService. The lookup
   * falls back to "growth" for any slug it does not know, so reading it here
   * would silently collect every newer service into one group. content/
   * services.ts has already resolved group as `service.group ?? meta.group`.
   */
  const grouped = serviceGroups.map((group) => ({
    ...group,
    services: services.filter((s) => s.group === group.id),
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "BizzFly Services",
          url: `${site.url}/services/`,
          about: { "@id": `${site.url}/#organization` },
          hasPart: services.map((s) => ({
            "@type": "Service",
            name: s.title,
            url: `${site.url}/services/${s.slug}/`,
          })),
        }}
      />

      <CinematicHero
        image={getServicesHubImage()}
        composition="bleed-right"
        eyebrow="Services"
        title="What can we help you build, improve or grow?"
        lead="Six capability groups. Most engagements span at least two of them, because visibility with nothing behind it and a good site nobody finds are the same problem seen from different sides."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        factsHeading="Practice Overview"
        facts={[
          {
            value: String(services.length),
            label: "service pages, each stating scope and boundaries",
          },
          {
            value: String(serviceGroups.length),
            label: "capability groups spanning integrated practices",
          },
          {
            value: String(practices.length),
            label: "core practices staffed by the same team end to end",
          },
        ]}
        actions={
          <ButtonGroup>
            <Button href={primaryCta.href} withArrow>
              {primaryCta.label}
            </Button>
            <TextLink href="/use-cases/">Start from a problem instead</TextLink>
          </ButtonGroup>
        }
      />

      {/*
        Directory as an editorial index: group, when to choose it, then the
        services as text links. Six groups and every service in the space six
        cards would occupy.
      */}
      <Section spacing="lg">
        <SectionHeader
          split
          eyebrow="Directory"
          title="Where to start"
          lead="Each group states the situation it is for. If two apply, that is normal. Say so when you get in touch and we will tell you which constraint to fix first."
        />

        <SectionNav
          label="Jump to a capability group"
          items={grouped
            .filter((group) => group.services.length > 0)
            .map((group) => ({
              label: group.label,
              id: group.id,
              count: group.services.length,
            }))}
          className="mt-8"
        />

        <div className={styles.groups}>
          {grouped.map((group) => (
            <section key={group.id} className={styles.group} id={group.id}>
              <div className={styles.groupHead}>
                <span className={styles.groupIndex}>{group.index}</span>
                <h3 className={styles.groupLabel}>{titleCase(group.label)}</h3>
              </div>

              <div className={styles.groupBody}>
                <p className={styles.groupSummary}>{group.summary}</p>
                <p className={styles.groupChoose}>{group.chooseWhen}</p>
              </div>

              <ul className={styles.groupServices}>
                {group.services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}/`}
                      className={styles.serviceLink}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>

      {/* How the groups relate — the reason they are sold as one engagement */}
      <Section background="inverse" spacing="lg">
        <SectionHeader
          split
          eyebrow="How they connect"
          title="Visibility, experience and operations are one chain"
          lead="Work on one link without the others and the gain leaks out somewhere else."
        />
        <ol className={styles.chain}>
          {[
            {
              step: "Visibility brings people",
              detail:
                "Search and AI work decides how many qualified people arrive at all.",
            },
            {
              step: "Experience converts them",
              detail:
                "The site decides how many of those arrivals become an enquiry rather than a bounce.",
            },
            {
              step: "Operations keeps them",
              detail:
                "Response time and process decide how many enquiries become clients rather than cold leads.",
            },
            {
              step: "Data tells you which link is weakest",
              detail:
                "Without measurement you will optimise the link that is already working.",
            },
          ].map((item, index) => (
            <li key={item.step} className={styles.chainItem}>
              <span className={styles.chainIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.chainStep}>{titleCase(item.step)}</h3>
              <p className={styles.chainDetail}>{item.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Practices — the delivery view, for buyers who think in disciplines */}
      <Section background="surface" spacing="lg">
        <SectionHeader
          split
          eyebrow="Practices"
          title="Or browse by discipline"
          lead="The same services, grouped by the team that delivers them rather than by the problem they solve."
        />
        {/*
          The six disciplines as a card row rather than the numbered list they
          were.

          This section follows a directory of forty-five service links, so a
          second dense list of text was the worst thing that could sit here —
          the disciplines are the coarse way in, and giving each one a frame
          is what separates them from the catalogue above.

          No autoplay. Six cards drift for about two seconds before looping,
          which is motion without discovery; the track stays draggable and
          keyed instead. Contrast with the industries showcase, where
          twenty-six items make the drift the point.
        */}
        <CardTrack
          entries={practiceCards}
          label="Practices"
          action="View practice"
          autoplay={false}
        />
      </Section>

      {/* The index: the reader is choosing between practices, not buying one. */}
      <ConversionBand
        title="Not sure which of these you actually need?"
        lead="That is the normal position, and picking wrong is expensive. Describe the commercial problem rather than the service you think you want, and we will tell you which practice we would start with — or that the answer is none of them yet."
      />
    </>
  );
}
