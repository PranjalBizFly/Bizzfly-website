import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ExploreNext } from "@/components/navigation";
import {
  SectionHeader,
  FAQBlock,
  RelatedContent,
  RelationshipMap,
  ConversionBand,
  ClaimSequence,
  ClaimDimensions,
  ClaimFacets,
  ClaimCriteria,
} from "@/components/sections";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { CtaBlock, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/motion";
import { SplitText } from "@/components/motion/SplitText";
import { resources, getResource } from "@/content/resources";
import { getResourceImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import {
  serviceLink,
  industryLink,
  useCaseLink,
  technologyLink,
} from "@/lib/relationships";
import type { RelatedLink, ResourceType } from "@/types/content";
import { expandFaqs } from "@/lib/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./resource.module.css";
import { titleCase } from "@/lib/titleCase";

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

/* ==========================================================================
   How a resource's body is composed
   --------------------------------------------------------------------------
   These pages used to render their body as `body.map(p => <p>)` — a run of
   four to six plain paragraphs under the answer, identical on all 145 of
   them. A contents list in the margin was the only concession to the fact
   that a reader cannot see the structure of a 280-word column until they
   have read it.

   The structure was always there. Every paragraph in the content model opens
   with its own claim and elaborates it, and the shape of a run follows the
   kind of thing the page is: a guide is a sequence, a comparison is a set of
   dimensions, a glossary entry is a definition and its qualifications, a
   "when should you" page is criteria and a resolution. So the composition is
   chosen by what the content is rather than rotated for variety, and the
   writing itself is untouched — see lib/prose.ts for the split, which is
   verbatim on both sides of the cut.

   The margin contents list is gone with the wall of text that needed it. A
   numbered path with a heading per step is its own outline, and the column it
   occupied now holds the page's photograph, which previously sat in a band of
   its own with nothing to illustrate.
   ========================================================================== */

type Composition = "sequence" | "dimensions" | "facets" | "criteria";

function compositionFor(type: ResourceType): Composition {
  switch (type) {
    /* Written in order, and they say so: "Start with access", "Then check". */
    case "guide":
    case "checklist":
      return "sequence";
    /* One paragraph per dimension, each opening by naming it. */
    case "comparison":
      return "dimensions";
    /* A definition, then independent qualifications of it. */
    case "glossary":
      return "facets";
    /* Criteria, then the paragraph that resolves them. */
    default:
      return "criteria";
  }
}

/**
 * The two things a comparison page weighs, taken from its own title.
 *
 * All twenty comparison pages are titled "A vs B", so this is a read of
 * existing content rather than a new field to maintain. A title that does not
 * carry the pair returns undefined and the composition simply omits the
 * header — nothing is invented to fill it.
 */
function subjectsFrom(title: string): readonly [string, string] | undefined {
  const match = /^(.+?)\s+vs\.?\s+(.+)$/i.exec(title);
  if (!match?.[1] || !match[2]) return undefined;
  return [match[1].trim(), match[2].trim()];
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource || !isPublished(resource)) notFound();

  /* Authored FAQs topped up from the page's own content — see lib/faqs.ts. */
  const faqs = expandFaqs(resource, "resource");

  const resourceVisual = getResourceImage(slug);
  const isGlossary = resource.type === "glossary";
  const paragraphs = resource.body ?? [];
  const composition = compositionFor(resource.type);

  /*
   * Which compositions hold the frame themselves. The other two pair it with
   * the answer in the opening split instead, so the photograph is always
   * beside writing it illustrates rather than in a band of its own.
   */
  const figureIsInBody = composition === "sequence" || composition === "facets";
  const ledeVisual = !figureIsInBody ? resourceVisual : undefined;

  /* Long reads only. A four-paragraph definition does not need a progress bar. */
  const showProgress = paragraphs.length >= 5;

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
      {showProgress ? <ReadingProgress /> : null}
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(faqs)} />

      {/* --- The frame: what this is, and the extractable answer ---------- */}
      <Section spacing="md" width={ledeVisual ? "default" : "content"} as="article">
        <div className={styles.crumbs}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources/" },
              { label: resource.title },
            ]}
          />
        </div>

        <div className={ledeVisual ? styles.lede : undefined}>
          <div className={styles.main}>
            <Eyebrow className={styles.kicker}>
              {isGlossary ? "Glossary" : resource.topic}
              {resource.readingTime ? ` · ${resource.readingTime}` : ""}
            </Eyebrow>

            <Heading level={1} size="h1" className={styles.title}>
              {/* Load-driven, not observed: this is above the fold, and
                  useReveal skips anything already painted. */}
              <SplitText text={titleCase(resource.title)} by="char" mode="load" offset={80} />
            </Heading>

            {/* Answer first — nothing between the heading and the definition. */}
            <BodyText size="lg" className={styles.answer}>
              {resource.answer}
            </BodyText>
          </div>

          {/*
            The frame, beside the answer it illustrates. Eager rather than
            lazy: on these two compositions it is above the fold on a laptop
            and is usually the largest element in the opening screen.
          */}
          {ledeVisual ? (
            <figure className={styles.ledeFigure}>
              <div className={styles.ledeFrame}>
                <Image
                  src={ledeVisual.src}
                  alt={ledeVisual.alt}
                  width={ledeVisual.width}
                  height={ledeVisual.height}
                  priority
                  sizes="(min-width: 1000px) 45vw, 100vw"
                />
              </div>
              {ledeVisual.caption ? (
                <figcaption className={styles.ledeCaption}>
                  {ledeVisual.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>
      </Section>

      {/* --- The body, composed as the kind of argument it is -------------- */}
      {paragraphs.length > 0 ? (
        <Section
          background="surface"
          spacing="lg"
          width={composition === "sequence" ? "default" : "content"}
        >
          {composition === "sequence" ? (
            <ClaimSequence
              paragraphs={paragraphs}
              image={resourceVisual}
              eyebrow={resource.type === "checklist" ? "In order" : "How it works"}
              label={resource.title}
              claimLevel={2}
            />
          ) : null}

          {composition === "dimensions" ? (
            <ClaimDimensions
              paragraphs={paragraphs}
              subjects={subjectsFrom(resource.title)}
              label={resource.title}
            />
          ) : null}

          {composition === "facets" ? (
            <ClaimFacets
              paragraphs={paragraphs}
              image={resourceVisual}
              label={resource.title}
              claimLevel={2}
            />
          ) : null}

          {composition === "criteria" ? (
            <ClaimCriteria
              paragraphs={paragraphs}
              resolves
              label={resource.title}
              claimLevel={2}
            />
          ) : null}

          {/*
            The contextual links close the argument rather than opening a band
            of their own. As a separate section this was one line of small
            links in 200px of empty ground — see the note on `.inline` in
            resource.module.css.
          */}
          {relationships.services.length > 0 ? (
            <div className={styles.inline}>
              <RelatedContent
                mode="inline"
                heading="Covered in"
                items={relationships.services}
              />
            </div>
          ) : null}
        </Section>
      ) : null}

      {faqs.length ? (
        <Section spacing="lg" width="content">
          <SectionHeader split eyebrow="Frequently Asked Questions" title="Frequently Asked Questions" />
          <FAQBlock faqs={faqs} />
        </Section>
      ) : null}

      {allRelated.length > 0 ? (
        <Section background="surface" spacing="md" width="content">
          <SectionHeader
            eyebrow="Connected"
            title="Where this applies"
            level={2}
          />
          <RelationshipMap relationships={{ ...relationships, all: allRelated }} />
          <div className="mt-6">
            <TextLink href="/resources/">All resources</TextLink>
          </div>
        </Section>
      ) : null}

      {resource.related?.length ? (
        <Section spacing="sm" width="content">
          <RelatedContent mode="split" heading="Read next" items={resource.related} />
        </Section>
      ) : null}

      <Section spacing="md">
        <ExploreNext href={`/resources/${slug}/`} />
      </Section>

      {/* Glossary pages carry no hard CTA — tier T1 at most. */}
      {isGlossary ? (
        <Section spacing="sm" width="content">
          <CtaBlock cta={resource.cta} />
        </Section>
      ) : (
        /*
          A reader who has finished a resource has done the reading. The
          offer that matches is applying it to their own situation, not the
          site-wide opener.
        */
        <ConversionBand
          title="Apply this to your own situation"
          lead={`You have read what we think. If you want to know what it means for your case specifically, describe it and we will tell you which parts of ${resource.title.toLowerCase()} actually apply — and which do not.`}
        />
      )}
    </>
  );
}
