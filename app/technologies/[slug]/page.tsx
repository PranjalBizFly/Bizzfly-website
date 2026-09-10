import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ExploreNext } from "@/components/navigation";
import { SplitHero, EditorialHero, CinematicHero, toHeroFacts } from "@/components/hero";
import {
  SectionHeader,
  FAQBlock,
  RelatedContent,
  RelationshipMap,
  ConversionBand,
  EditorialBlock,
  BeforeAfter,
  ChoiceList,
  ContentBlock,
  Diagram,
} from "@/components/sections";
import { CtaBlock, TextLink } from "@/components/buttons";
import { BodyText, Eyebrow, Heading } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { technologies, getTechnology } from "@/content/technologies";
import { getTechnologyImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import { relationshipsForTechnology } from "@/lib/relationships";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";

/** The two light grounds a band alternates between. */
type SectionGround = "bg" | "surface";

/** A section that takes its eyebrow number and ground from its position. */
type PlacedSection = (position: number, ground: SectionGround) => React.ReactElement;

/** Zero-padded position, so the eyebrows read 01, 02 rather than 1, 2. */
const pad = (position: number) => String(position).padStart(2, "0");

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

  /*
   * Sections take their eyebrow number and their ground from where the
   * layout puts them. Three layouts reorder these, so a fixed background
   * could land two grey bands together and there was no way to number them.
   *
   * Two placements are fixed wherever they fall: the boundaries band stays
   * dark, because "when we would not use this" is the section this page type
   * exists for, and the architecture drawing stays tinted so it does not
   * read as another band of prose.
   */
  const why: PlacedSection | null = technology.whyItMatters
    ? (position, ground) => (
        <Section key="why" background={ground} spacing="lg" width="content">
          {/* The photograph is the hero ground; one image per technology. */}
          <ContentBlock>
            <Eyebrow>{`${pad(position)} / Context`}</Eyebrow>
            <Heading level={2} size="h3">
              Why this matters
            </Heading>
            <BodyText size="lg">{technology.whyItMatters}</BodyText>
          </ContentBlock>
        </Section>
      )
    : null;

  const choices: PlacedSection = (position, ground) => (
    <Section key="choices" background={ground} spacing="lg">
      <SectionHeader
        split
        eyebrow={`${pad(position)} / Choices`}
        title="What we use, and why"
        lead="Every choice below has a reason attached. A stack without reasons is a logo wall."
      />
      {/*
        A reference, not a countdown. These rows used to be numbered editorial
        entries linking back to this same page — a link to where the reader
        already is — which is the shape this site uses for a sequence.
      */}
      <ChoiceList choices={technology.choices} label="What we use, and why" />
    </Section>
  );

  /*
   * The decision, both halves of it, in one band.
   *
   * "How we would decide for you" and "When we would not use this" were two
   * sections in the same shape, one of them several screens after the other —
   * which is the one arrangement guaranteed to stop a reader comparing them.
   * They are the two sides of a single judgement, so they are set opposite
   * each other with a divider rather than an arrow: neither one causes the
   * other, and drawing a direction between them would say it did.
   *
   * Mandatory on every technology page — this is what persona P4 reads first.
   */
  const boundaries: PlacedSection = (position) => (
    <Section key="boundaries" background="inverse" spacing="lg">
      {technology.decisionCriteria?.length ? (
        <BeforeAfter
          relation="versus"
          label="How we would decide, and when we would not use this"
          before={{
            eyebrow: `${pad(position)} / The decision`,
            title: "How we would decide for you",
            lead: "The questions we work through before recommending anything in this area.",
            items: technology.decisionCriteria,
          }}
          after={{
            eyebrow: "The boundary",
            title: "When we would not use this",
            lead: "Recommending something everywhere is the same as having no opinion.",
            items: technology.whenNotToUse,
          }}
        />
      ) : (
        <EditorialBlock
          eyebrow={`${pad(position)} / Boundaries`}
          title="When we would not use this"
          lead="Recommending something everywhere is the same as having no opinion. These are the cases where we would tell you to do something else."
          evidence={technology.whenNotToUse}
        />
      )}
    </Section>
  );

  /* Folded into the decision band above wherever the criteria exist. */
  const decisions: PlacedSection | null = null;

  const architecture: PlacedSection | null =
    technology.diagram && technology.diagram !== "none"
      ? (position) => (
          <Section key="architecture" background="tint" spacing="lg" width="content">
            <SectionHeader
              eyebrow={`${pad(position)} / Architecture`}
              title="How it fits together"
              level={2}
            />
            <div className="mt-8">
              <Diagram kind={technology.diagram!} />
            </div>
          </Section>
        )
      : null;

  const applied: PlacedSection | null =
    rel.services.length > 0
      ? (position, ground) => (
          <Section key="applied" background={ground} spacing="lg">
            <SectionHeader
              split
              eyebrow={`${pad(position)} / Where we apply it`}
              title="Services that use this"
            />
            <RelatedContent mode="list" items={rel.services} />
          </Section>
        )
      : null;

  const order = (
    layout === "architecture-led"
      ? [why, architecture, choices, boundaries, decisions, applied]
      : layout === "ecosystem-led"
        ? [why, choices, applied, architecture, boundaries, decisions]
        : [why, choices, boundaries, decisions, architecture, applied]
  ).filter((section): section is PlacedSection => section !== null);

  /* The two placed bands sit outside the alternation. */
  let lightIndex = 0;
  const composed = order.map((section, index) => {
    const ground: SectionGround = lightIndex % 2 === 0 ? "bg" : "surface";
    if (section !== boundaries && section !== architecture) lightIndex += 1;
    return section(index + 1, ground);
  });

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

      {composed}

      {technology.faqs?.length ? (
        <Section spacing="lg">
          <SectionHeader
            split
            eyebrow={`${pad(composed.length + 1)} / Questions`}
            title="Technical Questions"
          />
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
          <div className="mt-6">
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
