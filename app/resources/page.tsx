import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  RelatedContent,
  ConversionBand,
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

export default function ResourcesIndexPage() {
  const published = resources.filter(
    (r) => (r.status ?? "published") === "published",
  );
  const articles = published.filter((r) => r.type !== "glossary");
  const glossary = published.filter((r) => r.type === "glossary");
  const [featured, ...remainingArticles] = articles;

  /* Topics derived from the content, so a heading never leads nowhere. */
  const topics = [...new Set(published.map((r) => r.topic))].sort();

  /* Capability grouping: which services each resource actually supports. */
  const byCapability = services
    .map((service) => ({
      service,
      items: published.filter((r) => r.supports?.includes(service.slug)),
    }))
    .filter((group) => group.items.length > 0)
    .slice(0, 6);

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

      {remainingArticles.length > 0 ? (
        <Section background="surface" spacing="lg">
          <SectionHeader
            split
            eyebrow="Articles"
            title="Recent thinking"
            lead="Written for people making a decision, not for a keyword."
          />
          <RelatedContent
            mode="list"
            items={remainingArticles.map((resource) => ({
              label: resource.title,
              href: `/resources/${resource.slug}/`,
              type: resource.topic.toUpperCase(),
              description: resource.answer,
            }))}
          />
        </Section>
      ) : null}

      {/* Browse by topic — derived from content, never a dead filter */}
      {topics.length > 1 ? (
        <Section spacing="md">
          <SectionHeader eyebrow="Browse" title="By topic" level={2} />
          <div className={styles.topics}>
            {topics.map((topic) => {
              const items = published.filter((r) => r.topic === topic);
              return (
                <section key={topic} className={styles.topic}>
                  <h3 className={styles.topicName}>{topic}</h3>
                  <ul className={styles.topicList}>
                    {items.map((resource) => (
                      <li key={resource.slug}>
                        <Link
                          href={`/resources/${resource.slug}/`}
                          className={styles.topicLink}
                        >
                          {resource.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Section>
      ) : null}

      {glossary.length > 0 ? (
        <Section background="surface" spacing="lg">
          <SectionHeader
            split
            eyebrow="Glossary"
            title="Definitions, without the marketing"
            lead="Plain definitions of terms this industry uses loosely. Each states what the thing is before it says anything about what we sell."
          />
          <RelatedContent
            mode="list"
            items={glossary.map((resource) => ({
              label: resource.title,
              href: `/resources/${resource.slug}/`,
              type: "GLOSSARY",
              description: resource.answer,
            }))}
          />
        </Section>
      ) : null}

      {/* Browse by capability — the relationship graph made navigable */}
      {byCapability.length > 0 ? (
        <Section spacing="md">
          <SectionHeader
            eyebrow="Browse"
            title="By capability"
            level={2}
          />
          <div className={styles.capabilities}>
            {byCapability.map((group) => (
              <section key={group.service.slug} className={styles.capability}>
                <h3 className={styles.capabilityName}>
                  <Link href={`/services/${group.service.slug}/`}>
                    {group.service.title}
                  </Link>
                </h3>
                <ul className={styles.topicList}>
                  {group.items.map((resource) => (
                    <li key={resource.slug}>
                      <Link
                        href={`/resources/${resource.slug}/`}
                        className={styles.topicLink}
                      >
                        {resource.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Section>
      ) : null}

      <ConversionBand
        title="Have a question these do not answer?"
        lead="Ask it directly. If the answer is useful to other people, we will write it up."
      />
    </>
  );
}
