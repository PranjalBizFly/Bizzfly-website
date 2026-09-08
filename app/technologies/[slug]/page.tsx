import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ExploreNext } from "@/components/navigation";
import { SplitHero, EditorialHero, CinematicHero, toHeroFacts } from "@/components/hero";
import {
  SectionHeader,
  NumberedList,
  FAQBlock,
  RelatedContent,
  RelationshipMap,
  ConversionBand,
  EditorialBlock,
  ContentBlock,
  Diagram,
} from "@/components/sections";
import { CtaBlock, TextLink } from "@/components/buttons";
import { BodyText, Heading } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { technologies, getTechnology } from "@/content/technologies";
import { getTechnologyImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import { relationshipsForTechnology } from "@/lib/relationships";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs 404 at the routing layer — see /services/[slug]. */
export const dynamicParams = false;

export function generateStaticParams() {
  return technologies
    .filter(isPublished)
    .map((technology) => ({ slug: technology.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) return {};
  return buildMetadata(technology.seo, `/technologies/${slug}/`, {
    kind: "technology",
  });
}

export default async function TechnologyPage({ params }: PageProps) {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology || !isPublished(technology)) notFound();

  const layout = technology.layout ?? "capability-led";
  const rel = relationshipsForTechnology(slug);

  const techVisual = getTechnologyImage(slug);

  const why = technology.whyItMatters ? (
    <Section key="why" spacing="lg" width="content">
      {/* The photograph is the hero ground; one image per technology. */}
      <ContentBlock>
        <Heading level={2} size="h3">
          Why this matters
        </Heading>
        <BodyText size="lg">{technology.whyItMatters}</BodyText>
      </ContentBlock>
    </Section>
  ) : null;

  const choices = (
    <Section key="choices" spacing="lg">
      <SectionHeader
        split
        eyebrow="Choices"
        title="What we use, and why"
        lead="Every choice below has a reason attached. A stack without reasons is a logo wall."
      />
      <NumberedList
        items={technology.choices.map((choice, index) => ({
          index: String(index + 1).padStart(2, "0"),
          title: choice.name,
          description: choice.rationale,
          href: `/technologies/${slug}/`,
        }))}
      />
    </Section>
  );

  /* Mandatory on every technology page — this is what persona P4 reads first. */
  const boundaries = (
    <Section key="boundaries" background="inverse" spacing="lg">
      <EditorialBlock
        eyebrow="Boundaries"
        title="When we would not use this"
        lead="Recommending something everywhere is the same as having no opinion. These are the cases where we would tell you to do something else."
        evidence={technology.whenNotToUse}
      />
    </Section>
  );

  const decisions = technology.decisionCriteria?.length ? (
    <Section key="decisions" background="surface" spacing="lg">
      <EditorialBlock
        eyebrow="Decision criteria"
        title="How we would decide for you"
        lead="The questions we work through before recommending anything in this area."
        evidence={technology.decisionCriteria}
      />
    </Section>
  ) : null;

  const architecture =
    technology.diagram && technology.diagram !== "none" ? (
      <Section key="architecture" spacing="md" width="content">
        <SectionHeader
          eyebrow="Architecture"
          title="How it fits together"
          level={2}
        />
        <div className="mt-8">
          <Diagram kind={technology.diagram} />
        </div>
      </Section>
    ) : null;

  const applied =
    rel.services.length > 0 ? (
      <Section key="applied" spacing="lg">
        <SectionHeader
          split
          eyebrow="Where we apply it"
          title="Services that use this"
        />
        <RelatedContent mode="list" items={rel.services} />
      </Section>
    ) : null;

  const order =
    layout === "architecture-led"
      ? [why, architecture, choices, boundaries, decisions, applied]
      : layout === "ecosystem-led"
        ? [why, choices, applied, architecture, boundaries, decisions]
        : [why, choices, boundaries, decisions, architecture, applied];

  const Hero = layout === "ecosystem-led" ? EditorialHero : SplitHero;

  return (
    <>
      <JsonLd data={faqSchema(technology.faqs ?? [])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: technology.title,
          description: technology.seo.description,
          url: `${site.url}/technologies/${slug}/`,
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      {techVisual ? (
        <CinematicHero
          image={techVisual}
          composition="inset"
          eyebrow={technology.category}
          title={technology.title}
          lead={technology.answer}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Technologies", href: "/technologies/" },
            { label: technology.title },
          ]}
          factsHeading="Decision criteria"
          facts={toHeroFacts(technology.decisionCriteria ?? technology.whenNotToUse)}
          actions={<CtaBlock cta={technology.cta} size="lg" />}
        />
      ) : (
        <Hero
          eyebrow={technology.category}
          title={technology.title}
          lead={technology.answer}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Technologies", href: "/technologies/" },
            { label: technology.title },
          ]}
          asideHeading="Decision criteria"
          asideItems={technology.decisionCriteria ?? technology.whenNotToUse}
          actions={<CtaBlock cta={technology.cta} size="lg" />}
        />
      )}

      {order}

      {technology.faqs?.length ? (
        <Section spacing="lg">
          <SectionHeader split eyebrow="Questions" title="Technical questions" />
          <FAQBlock faqs={technology.faqs} />
        </Section>
      ) : null}

      {rel.all.length > 0 ? (
        <Section background="surface" spacing="md">
          <SectionHeader
            eyebrow="Connected"
            title="Where this shows up across the site"
            level={2}
          />
          <RelationshipMap relationships={rel} />
          <div className="mt-8">
            <TextLink href="/technologies/">All technologies</TextLink>
          </div>
        </Section>
      ) : null}

      <Section spacing="md">
        <ExploreNext href={`/technologies/${slug}/`} />
      </Section>

      <ConversionBand cta={technology.cta} />
    </>
  );
}
