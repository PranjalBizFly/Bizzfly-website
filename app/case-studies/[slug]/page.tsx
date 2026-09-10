import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  ProcessBlock,
  QuoteBlock,
  RelatedContent,
  RelationshipMap,
  ConversionBand,
  ContentBlock,
  EditorialBlock,
} from "@/components/sections";
import { Heading, BodyText } from "@/components/typography";
import { TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { publishedCaseStudies, getCaseStudy } from "@/content/case-studies";
import { serviceLink, industryLink, technologyLink, useCaseLink } from "@/lib/relationships";
import type { RelatedLink } from "@/types/content";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./case-study.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Only publishable, fully verified case studies produce a route.
 * With none published this returns an empty array and no pages are built,
 * so an unapproved study cannot reach a URL by being forgotten — and
 * `dynamicParams = false` means an invented slug is a hard 404 rather than an
 * on-demand render that flushes a 200 before `notFound()` runs.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata(study.seo, `/case-studies/${slug}/`, {
    kind: "case-study",
    publishedTime: study.publishedAt,
  });
}

/** Renders a field only when it holds real content, never an empty label. */
function hasContent(value: string | undefined): value is string {
  if (!value) return false;
  return !value.includes("[CONTENT_REQUIRED]") && value.trim().length > 0;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const layout = study.layout ?? "narrative";

  /* Relationships resolved through the same engine the rest of the site uses. */
  const clean = (links: (RelatedLink | null)[]) =>
    links.filter((l): l is RelatedLink => l !== null);

  const relationships = {
    services: clean(study.servicesDelivered.map(serviceLink)),
    industries: clean([industryLink(study.industry)]),
    useCases: clean((study.relatedUseCases ?? []).map(useCaseLink)),
    technologies: clean((study.technologies ?? []).map(technologyLink)),
    resources: [] as RelatedLink[],
  };
  const allRelated = [
    ...relationships.services,
    ...relationships.industries,
    ...relationships.useCases,
    ...relationships.technologies,
  ];

  /* Only metrics that are verified AND approved for publication render. */
  const publishableResults = study.results.filter((r) => r.approvedForPublication);

  const sections = {
    context: hasContent(study.context) ? (
      <Section key="context" spacing="lg" width="content">
        <ContentBlock>
          <Heading level={2} size="h3">
            Context
          </Heading>
          <BodyText size="lg">{study.context}</BodyText>
        </ContentBlock>
      </Section>
    ) : null,

    challenge: hasContent(study.challenge) ? (
      <Section key="challenge" background="surface" spacing="lg" width="content">
        <ContentBlock>
          <Heading level={2} size="h3">
            The business problem
          </Heading>
          <BodyText size="lg">{study.challenge}</BodyText>
        </ContentBlock>
      </Section>
    ) : null,

    objectives: study.objectives.length ? (
      <Section key="objectives" spacing="lg">
        <EditorialBlock
          eyebrow="Objectives"
          title="What success was defined as"
          lead="Agreed before the work started, so the result could be judged against something."
          evidence={study.objectives}
        />
      </Section>
    ) : null,

    strategy: hasContent(study.strategy) ? (
      <Section key="strategy" spacing="lg" width="content">
        <ContentBlock>
          <Heading level={2} size="h3">
            Strategy
          </Heading>
          <BodyText size="lg">{study.strategy}</BodyText>
        </ContentBlock>
      </Section>
    ) : null,

    execution: study.execution.length ? (
      <Section key="execution" background="surface" spacing="lg">
        <SectionHeader split eyebrow="Execution" title="What we did" />
        <ProcessBlock steps={study.execution} />
      </Section>
    ) : null,

    /* Mandatory in the model — a case study without it reads as fiction. */
    challenges: hasContent(study.challenges) ? (
      <Section key="challenges" spacing="lg" width="content">
        <ContentBlock>
          <Heading level={2} size="h3">
            What went wrong
          </Heading>
          <BodyText size="lg">{study.challenges}</BodyText>
        </ContentBlock>
      </Section>
    ) : null,

    results: publishableResults.length ? (
      <Section key="results" background="inverse" spacing="lg">
        <SectionHeader
          split
          eyebrow="Results"
          title="Measured outcomes"
          lead="Every figure carries a measurement window and a source."
        />
        <div className="scroll-x">
          <table className={styles.metrics}>
            <caption className="sr-only">Verified results</caption>
            <thead>
              <tr>
                <th scope="col">Metric</th>
                <th scope="col">Result</th>
                <th scope="col">Window</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {publishableResults.map((proof) => (
                <tr key={proof.metric}>
                  <td>{proof.metric}</td>
                  <td className="tabular">{proof.value}</td>
                  <td>{proof.timeframe}</td>
                  <td>{proof.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    ) : null,

    lessons: hasContent(study.lessons) ? (
      <Section key="lessons" spacing="lg" width="content">
        <ContentBlock>
          <Heading level={2} size="h3">
            What we learned
          </Heading>
          <BodyText size="lg">{study.lessons}</BodyText>
        </ContentBlock>
      </Section>
    ) : null,
  };

  /* Composition variants, so two case studies do not read identically. */
  const order: (keyof typeof sections)[] =
    layout === "outcome-led"
      ? ["results", "context", "challenge", "strategy", "execution", "challenges", "lessons"]
      : layout === "build-led"
        ? ["challenge", "objectives", "execution", "strategy", "challenges", "results", "lessons"]
        : ["context", "challenge", "objectives", "strategy", "execution", "challenges", "results", "lessons"];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.seo.description,
          url: `${site.url}/case-studies/${slug}/`,
          publisher: { "@id": `${site.url}/#organization` },
          ...(study.publishedAt ? { datePublished: study.publishedAt } : {}),
          about: { "@id": `${site.url}/#organization` },
        }}
      />
      <JsonLd data={faqSchema(study.faqs ?? [])} />

      <EditorialHero
        eyebrow={[study.industry, study.location].filter(Boolean).join(" · ")}
        title={study.title}
        lead={study.summary ?? study.answer}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case studies", href: "/case-studies/" },
          { label: study.title },
        ]}
        inverse
      />

      {order.map((key) => sections[key])}

      {study.quote ? (
        <Section spacing="lg">
          <QuoteBlock quote={study.quote.text} attribution={study.quote.attribution} />
        </Section>
      ) : null}

      {allRelated.length > 0 ? (
        <Section background="surface" spacing="md">
          <SectionHeader
            eyebrow="Connected"
            title="What this engagement involved"
            level={2}
          />
          <RelationshipMap relationships={{ ...relationships, all: allRelated }} />
          <div className="mt-6">
            <TextLink href="/case-studies/">All case studies</TextLink>
          </div>
        </Section>
      ) : null}

      {study.related?.length ? (
        <Section spacing="md">
          <RelatedContent mode="split" heading="Read next" items={study.related} />
        </Section>
      ) : null}

      <ConversionBand cta={study.cta} />
    </>
  );
}
