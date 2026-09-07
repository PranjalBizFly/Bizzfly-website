import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import {
  SectionHeader,
  FAQBlock,
  RelatedContent,
  RelationshipMap,
  ConversionBand,
} from "@/components/sections";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { CtaBlock, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/motion";
import { resources, getResource } from "@/content/resources";
import { isPublished } from "@/lib/registry";
import {
  serviceLink,
  industryLink,
  useCaseLink,
  technologyLink,
} from "@/lib/relationships";
import type { RelatedLink } from "@/types/content";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./resource.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs 404 at the routing layer — see /services/[slug]. */
export const dynamicParams = false;

export function generateStaticParams() {
  return resources.filter(isPublished).map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return buildMetadata(resource.seo, `/resources/${slug}/`, {
    kind: "resource",
    publishedTime: resource.publishedOn,
  });
}

/** Derives a stable anchor id from the first few words of a paragraph. */
function anchorFor(text: string, index: number): string {
  const words = text
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .slice(0, 5)
    .join("-")
    .toLowerCase();
  return `s${index + 1}-${words}`.slice(0, 60);
}

/**
 * Contents label for a paragraph.
 *
 * Takes the opening clause, then trims to a word boundary rather than a
 * character count — a hard slice cut labels mid-word ("rather than pre"),
 * which reads as broken rather than abbreviated.
 */
function tocLabel(paragraph: string): string {
  const clause = (paragraph.split(/[.,—:;]/)[0] ?? "").trim();
  if (clause.length <= 52) return clause;
  const trimmed = clause.slice(0, 52);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${(lastSpace > 24 ? trimmed.slice(0, lastSpace) : trimmed).trimEnd()}…`;
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource || !isPublished(resource)) notFound();

  const isGlossary = resource.type === "glossary";

  const clean = (links: (RelatedLink | null)[]) =>
    links.filter((l): l is RelatedLink => l !== null);

  const relationships = {
    services: clean((resource.supports ?? []).map(serviceLink)),
    industries: clean((resource.relatedIndustries ?? []).map(industryLink)),
    useCases: clean((resource.relatedUseCases ?? []).map(useCaseLink)),
    technologies: clean((resource.relatedTechnologies ?? []).map(technologyLink)),
    resources: [] as RelatedLink[],
  };
  const allRelated = [
    ...relationships.services,
    ...relationships.industries,
    ...relationships.useCases,
    ...relationships.technologies,
  ];

  /*
    Articles get in-page navigation; a glossary definition is short enough
    that a table of contents would be noise.
  */
  const showToc = !isGlossary && (resource.body?.length ?? 0) >= 4;
  const paragraphs = resource.body ?? [];

  /*
    DefinedTerm for glossary entries — these exist to be extracted and cited,
    so the definition is the first element after the heading with no hero.
  */
  const schema = isGlossary
    ? {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: resource.title,
        description: resource.answer,
        url: `${site.url}/resources/${slug}/`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "BizzFly Glossary",
          url: `${site.url}/resources/`,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: resource.title,
        description: resource.seo.description,
        url: `${site.url}/resources/${slug}/`,
        publisher: { "@id": `${site.url}/#organization` },
        about: { "@id": `${site.url}/#organization` },
        ...(resource.publishedOn ? { datePublished: resource.publishedOn } : {}),
        /* No author is claimed — none has been verified for publication. */
      };

  return (
    <>
      {showToc ? <ReadingProgress /> : null}
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(resource.faqs ?? [])} />

      <Section spacing="md" width={showToc ? "default" : "text"} as="article">
        <div className={styles.crumbs}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources/" },
              { label: resource.title },
            ]}
          />
        </div>

        <div className={showToc ? styles.withToc : undefined}>
          <div className={styles.main}>
            <Eyebrow>
              {isGlossary ? "Glossary" : resource.topic}
              {resource.readingTime ? ` · ${resource.readingTime}` : ""}
            </Eyebrow>

            <Heading level={1} size="h1" className={styles.title}>
              {resource.title}
            </Heading>

            {/* Answer first — nothing between the heading and the definition. */}
            <BodyText size="lg" className={styles.answer}>
              {resource.answer}
            </BodyText>

            {paragraphs.length > 0 ? (
              <div className={styles.body}>
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    id={showToc ? anchorFor(paragraph, index) : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {/* Contextual links inside the reading column, not only at the end */}
            {relationships.services.length > 0 ? (
              <div className={styles.inline}>
                <RelatedContent
                  mode="inline"
                  heading="Covered in"
                  items={relationships.services}
                />
              </div>
            ) : null}
          </div>

          {showToc ? (
            <aside className={styles.toc} aria-label="On this page">
              <p className={styles.tocHeading}>On this page</p>
              <ol className={styles.tocList}>
                {paragraphs.map((paragraph, index) => (
                  <li key={paragraph.slice(0, 32)}>
                    <a href={`#${anchorFor(paragraph, index)}`}>
                      {tocLabel(paragraph)}
                    </a>
                  </li>
                ))}
              </ol>
              <div className={styles.tocCta}>
                <CtaBlock cta={resource.cta} />
              </div>
            </aside>
          ) : null}
        </div>
      </Section>

      {resource.faqs?.length ? (
        <Section background="surface" spacing="lg" width="content">
          <SectionHeader split eyebrow="Questions" title="Related questions" />
          <FAQBlock faqs={resource.faqs} />
        </Section>
      ) : null}

      {allRelated.length > 0 ? (
        <Section spacing="md" width="content">
          <SectionHeader
            eyebrow="Connected"
            title="Where this applies"
            level={2}
          />
          <RelationshipMap relationships={{ ...relationships, all: allRelated }} />
          <div className="mt-8">
            <TextLink href="/resources/">All resources</TextLink>
          </div>
        </Section>
      ) : null}

      {resource.related?.length ? (
        <Section background="surface" spacing="md" width="content">
          <RelatedContent mode="split" heading="Read next" items={resource.related} />
        </Section>
      ) : null}

      {/* Glossary pages carry no hard CTA — tier T1 at most. */}
      {isGlossary ? (
        <Section spacing="sm" width="content">
          <CtaBlock cta={resource.cta} />
        </Section>
      ) : (
        <ConversionBand />
      )}
    </>
  );
}
