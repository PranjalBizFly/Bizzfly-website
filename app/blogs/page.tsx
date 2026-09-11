import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import { ConversionBand, SectionHeader } from "@/components/sections";
import { Heading, BodyText } from "@/components/typography";
import { TextLink } from "@/components/buttons";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { resources } from "@/content/resources";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import styles from "./blogs.module.css";
import { titleCase } from "@/lib/titleCase";

export const metadata: Metadata = buildMetadata(
  {
    title: "Blogs",
    description:
      "Articles, technical guides, and strategic frameworks on search visibility, Answer Engine Optimisation, web engineering, and business automation from BizzFly.",
    primaryTopic: "BizzFly blogs and insights",
    secondaryTopics: ["articles", "guides", "frameworks"],
    intent: "informational",
  },
  "/blogs/",
  { kind: "resource" },
);

const cta = {
  label: "Book a consultation",
  href: "/contact/",
  tier: "T4" as const,
  note: "Thirty minutes on the problem, not a pitch.",
};

const published = resources.filter(
  (r) => r.type !== "glossary" && (r.status ?? "published") === "published",
);

/*
 * One lead piece, then the rest as an index.
 *
 * The page used to be twenty-four identical cards, which gives a reader no
 * way to tell what to open first — every item claimed the same weight. An
 * index has a lead and a list: the lead gets the room to make its argument,
 * and the rest are rows that can be scanned by format and subject. Nothing
 * is hidden that was visible before; the same entries are simply ranked.
 */
const [lead, ...rest] = published;
const listed = rest.slice(0, 17);

/* The formats the library is actually written in, in the order they appear. */
const FORMAT_LABEL: Record<string, string> = {
  article: "Article",
  guide: "Guide",
  comparison: "Comparison",
  decision: "Decision",
  checklist: "Checklist",
};

export default function BlogsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Blogs",
          description:
            "Articles, technical guides, and strategic frameworks on search visibility, Answer Engine Optimisation, web engineering, and business automation from BizzFly.",
          url: `${site.url}/blogs/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Resources"
        title="Blogs & Engineering Insights"
        lead="Practical analysis and methodology for growing businesses. Search visibility, Answer Engine Optimisation, custom software, and operational automation, written by engineers and practitioners."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
        /*
          Counted from the published set, so the ledger and the index below
          can never disagree. The formats figure is derived from what is
          actually written rather than from the label map, which lists the
          formats the library *could* use.
        */
        ledger={[
          {
            figure: String(published.length),
            label: "articles and guides published, none of them behind a form",
          },
          {
            figure: String(new Set(published.map((article) => article.type)).size),
            label: "formats — articles, guides, comparisons, decisions, checklists",
          },
          {
            figure: "0",
            label: "written by anyone who does not also do the work",
          },
        ]}
      />

      {/* 01 — the lead piece, given the room to state its own argument. */}
      {lead ? (
        <Section spacing="lg" id="lead">
          <SectionHeader eyebrow="Latest" title="Start here" split />
          <article className={styles.lead}>
            <p className={styles.leadMeta}>
              <span className={styles.format}>
                {FORMAT_LABEL[lead.type] ?? lead.type}
              </span>
              <span className={styles.dot} aria-hidden="true">
                &middot;
              </span>
              {lead.topic}
              {lead.readingTime ? (
                <>
                  <span className={styles.dot} aria-hidden="true">
                    &middot;
                  </span>
                  {lead.readingTime}
                </>
              ) : null}
            </p>
            <Heading level={3} size="h2" className={styles.leadTitle}>
              <Link href={`/resources/${lead.slug}/`} className={styles.leadLink}>
                {titleCase(lead.title)}
              </Link>
            </Heading>
            <BodyText size="lg" muted className={styles.leadAnswer}>
              {lead.answer ?? lead.seo.description}
            </BodyText>
          </article>
        </Section>
      ) : null}

      {/* 02 — the index. Rows, not cards: format and subject are scannable. */}
      <Section background="surface" spacing="lg" id="index">
        <SectionHeader
          eyebrow="The library"
          title="Everything else, by format"
          lead="Guides explain a subject, comparisons weigh two options, decisions answer a question, and checklists are the working list."
        />

        <StaggerGroup as="ol" className={styles.index}>
          {listed.map((article, i) => (
            <StaggerItem as="li" key={article.slug} index={i} className={styles.row}>
              <Link href={`/resources/${article.slug}/`} className={styles.rowLink}>
                <span className={styles.rowFormat}>
                  {FORMAT_LABEL[article.type] ?? article.type}
                </span>
                <span className={styles.rowTitle}>{article.title}</span>
                <span className={styles.rowMeta}>
                  {article.topic}
                  {article.readingTime ? ` · ${article.readingTime}` : ""}
                </span>
                <span className={styles.rowArrow} aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className={styles.allLink}>
          <TextLink href="/resources/">
            All {published.length} articles and guides
          </TextLink>
        </p>
      </Section>

      {/* A reader here is reading, not buying. Offer the next read first. */}
      <ConversionBand
        title="Prefer a conversation to more reading?"
        lead="Everything here is what we have worked out in the open. If you would rather skip to the part that applies to you, describe the situation and we will point you at the three pieces that matter — or just answer it directly."
        cta={cta}
      />
    </>
  );
}
