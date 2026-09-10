import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionNav } from "@/components/navigation";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  RelatedContent,
  ConversionBand,
  Directory,
  type DirectoryGroup,
} from "@/components/sections";
import { TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { resources } from "@/content/resources";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./resources.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Resources",
    description:
      "Articles and plain definitions on search visibility, AI search, automation and digital growth. Nothing gated, no fabricated statistics.",
    primaryTopic: "digital growth resources",
    secondaryTopics: ["articles", "glossary", "AI search", "SEO"],
    intent: "navigational",
  },
  "/resources/",
);

/** Order the type groups read in, rather than however the array happens to sit. */
const TYPE_ORDER = [
  "guide",
  "comparison",
  "decision",
  "checklist",
  "article",
  "glossary",
] as const;

const TYPE_LABEL: Record<string, string> = {
  guide: "Guides & frameworks",
  comparison: "Comparisons",
  decision: "Decision guides",
  checklist: "Checklists",
  article: "Articles",
  glossary: "Glossary",
};

/** Anchor ids the mega menu links to. Stable, and independent of the counts. */
const TYPE_ANCHOR: Record<string, string> = {
  guide: "guides",
  comparison: "comparisons",
  decision: "decisions",
  checklist: "checklists",
  article: "articles",
  glossary: "glossary",
};

export default function ResourcesIndexPage() {
  const published = resources.filter(
    (r) => (r.status ?? "published") === "published",
  );

  /*
   * One complete listing, not three.
   *
   * This page used to render every resource in "Recent thinking" with its
   * answer paragraph, again in "By topic", again in the glossary section and
   * a fourth time under "By capability". At 40 resources that was merely
   * repetitive; at 146 it measured 34,354px — the tallest page on the site by
   * a factor of three, and four separate sections over 2,500px.
   *
   * So the page now has one authoritative listing (by type, below) that every
   * resource appears in exactly once, preceded by a short editorial selection.
   * The capability axis is kept but points at the service pages rather than
   * re-listing their resources, because each service page already carries its
   * own related reading.
   */
  const [featured, ...rest] = published;

  /* Six with room to explain them, chosen across types rather than by array order. */
  const selected = TYPE_ORDER.map((type) => rest.find((r) => r.type === type))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .slice(0, 6);

  const byType: DirectoryGroup[] = TYPE_ORDER.map((type) => {
    const items = published.filter((r) => r.type === type);
    return {
      heading: `${TYPE_LABEL[type] ?? type} (${items.length})`,
      /*
       * Explicit, because the heading carries a count: deriving the anchor
       * from it would put "-24" in the URL and break every link to this
       * group the next time a resource is published. The mega menu links
       * here by type, so these ids are a contract.
       */
      id: TYPE_ANCHOR[type],
      items: items.map((r) => ({
        label: r.title,
        href: `/resources/${r.slug}/`,
      })),
    };
  }).filter((group) => group.items.length > 0);

  /* Which services have reading behind them, and how much. */
  const byCapability = services
    .map((service) => ({
      service,
      count: published.filter((r) => r.supports?.includes(service.slug)).length,
    }))
    .filter((group) => group.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "BizzFly resources",
          url: `${site.url}/resources/`,
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Resources"
        title="What we have worked out, written down"
        lead="Nothing here is gated. If content is worth reading, putting a form in front of it just means fewer people read it — and we do not publish reader counts or download figures, because we would be making them up."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
      />

      {featured ? (
        <Section spacing="lg">
          <article className={styles.featured}>
            <div className={styles.featuredMeta}>
              <span className={styles.featuredLabel}>Featured</span>
              <span className={styles.featuredTopic}>{featured.topic}</span>
              {featured.readingTime ? (
                <span className={styles.featuredTopic}>{featured.readingTime}</span>
              ) : null}
            </div>
            <h2 className={styles.featuredTitle}>
              <Link href={`/resources/${featured.slug}/`}>{featured.title}</Link>
            </h2>
            <p className={styles.featuredAnswer}>{featured.answer}</p>
            <TextLink href={`/resources/${featured.slug}/`}>Read it</TextLink>
          </article>
        </Section>
      ) : null}

      {selected.length > 0 ? (
        <Section background="tint" spacing="lg">
          <SectionHeader
            split
            eyebrow="01 / Start here"
            title="One of each, to show what these are"
            lead="Written for people making a decision, not for a keyword. The complete set is below."
          />
          <RelatedContent
            mode="list"
            items={selected.map((resource) => ({
              label: resource.title,
              href: `/resources/${resource.slug}/`,
              type: resource.topic.toUpperCase(),
              description: resource.answer,
            }))}
          />
        </Section>
      ) : null}

      {/* The complete listing. Every resource appears here exactly once. */}
      <Section spacing="lg">
        <SectionHeader
          split
          eyebrow="02 / Everything"
          title={`All ${published.length} resources`}
          lead="Grouped by what each one is for. A guide gives you a method, a comparison weighs two options, a decision guide helps you work out whether to act at all, and the glossary just defines the term."
        />
        <SectionNav
          label="Jump to a kind"
          items={TYPE_ORDER.filter((type) =>
            published.some((r) => r.type === type),
          ).map((type) => ({
            label: TYPE_LABEL[type] ?? type,
            id: TYPE_ANCHOR[type],
            count: published.filter((r) => r.type === type).length,
          }))}
          className="mt-8"
        />
        <div className="mt-10">
          <Directory groups={byType} filter={{ noun: "resources" }} />
        </div>
      </Section>

      {/* The capability axis — service pages, not a second copy of the list. */}
      {byCapability.length > 0 ? (
        <Section background="surface" spacing="md">
          <SectionHeader
            eyebrow="03 / Browse"
            title="By capability"
            level={2}
            lead="Each service page carries the reading that supports it."
          />
          <ul className={styles.capabilityRow}>
            {byCapability.map((group) => (
              <li key={group.service.slug}>
                <Link
                  href={`/services/${group.service.slug}/`}
                  className={styles.capabilityLink}
                >
                  {group.service.title}
                  <span className={styles.capabilityCount}>{group.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <ConversionBand
        title="Have a question these do not answer?"
        lead="Ask it directly. If the answer is useful to other people, we will write it up."
      />
    </>
  );
}
