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
  ContentBlock,
  EditorialBlock,
  Diagram,
} from "@/components/sections";
import { CtaBlock, TextLink } from "@/components/buttons";
import { BodyText, Heading } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { industries, getIndustry } from "@/content/industries";
import { services } from "@/content/services";
import { getIndustryImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import { relationshipsForIndustry } from "@/lib/relationships";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs 404 at the routing layer — see /services/[slug]. */
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.filter(isPublished).map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata(industry.seo, `/industries/${slug}/`, {
    kind: "industry",
  });
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry || !isPublished(industry)) notFound();

  const path = `/industries/${slug}/`;
  const layout = industry.layout ?? "challenge-led";
  const rel = relationshipsForIndustry(slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries/" },
    { label: industry.title },
  ];

  /*
    Industry variants. Healthcare should not read like manufacturing, so the
    emphasis moves: challenge-led opens on the problems, opportunity-led opens
    on what is available, journey-led opens on the sequence of work.
  */
  const problems = (
    <Section key="problems" background="surface" spacing="lg">
      <SectionHeader
        split
        eyebrow="The problems"
        title="Where growth actually stalls in this sector"
        lead="Named in the sector's own vocabulary, because a generic list would tell you nothing about whether we understand your business."
      />
      <NumberedList
        items={industry.problems.map((problem, index) => ({
          index: String(index + 1).padStart(2, "0"),
          title: problem.title,
          description: problem.description,
          href: `/services/${problem.addressedBy[0] ?? "seo"}/`,
          rail: problem.addressedBy
            .map((s) => services.find((x) => x.slug === s))
            .filter((s): s is NonNullable<typeof s> => Boolean(s))
            .map((s) => ({ label: s.title, href: `/services/${s.slug}/` })),
        }))}
      />
    </Section>
  );

  const opportunity = industry.opportunity ? (
    <Section key="opportunity" spacing="lg">
      <EditorialBlock
        eyebrow="The opportunity"
        title="What is actually available here"
        lead={industry.opportunity}
        evidence={industry.problems.map((p) => p.title)}
      />
    </Section>
  ) : null;

  const industryVisual = getIndustryImage(slug);

  /*
   * The sector photograph is the hero band now. Each industry owns exactly
   * one image and none is ever shown twice, so this section carries the
   * argument in type instead of cropping the same picture a second time.
   */
  const context = (
    <Section key="context" spacing="md" width="content">
      <ContentBlock>
        <BodyText size="lg">{industry.context}</BodyText>
      </ContentBlock>
    </Section>
  );

  const capabilities =
    rel.services.length > 0 ? (
      <Section key="capabilities" spacing="lg">
        <SectionHeader
          split
          eyebrow="How we help"
          title="The work that addresses those problems"
          lead="Each of these is mapped to a problem above, not offered because it is on our service list."
        />
        <RelatedContent mode="list" items={rel.services} />
      </Section>
    ) : null;

  const journey =
    rel.useCases.length > 0 ? (
      <Section key="journey" background="inverse" spacing="lg">
        <SectionHeader
          split
          eyebrow="Recommended journey"
          title="Where most engagements in this sector start"
          lead="Usually with the constraint that is capping everything else, rather than with the most visible symptom."
        />
        <RelatedContent mode="list" items={rel.useCases} />
      </Section>
    ) : null;

  const technology =
    rel.technologies.length > 0 ? (
      <Section key="technology" background="surface" spacing="md">
        <SectionHeader
          split
          eyebrow="Technology"
          title="What tends to be involved"
        />
        <RelatedContent mode="compact" items={rel.technologies} />
        {industry.diagram && industry.diagram !== "none" ? (
          <div className="mt-10">
            <Diagram kind={industry.diagram} />
          </div>
        ) : null}
      </Section>
    ) : null;

  const order =
    layout === "opportunity-led"
      ? [context, opportunity, capabilities, problems, technology, journey]
      : layout === "journey-led"
        ? [context, journey, problems, capabilities, technology, opportunity]
        : [context, problems, capabilities, journey, technology, opportunity];

  const Hero = layout === "opportunity-led" ? EditorialHero : SplitHero;

  return (
    <>
      <JsonLd data={serviceSchema(industry.title, industry.seo.description, path)} />
      <JsonLd data={faqSchema(industry.faqs ?? [])} />

      {/* The sector's problems appear in the hero, before any capability. */}
      {industryVisual ? (
        <CinematicHero
          image={industryVisual}
          composition="banner"
          eyebrow="Industries"
          title={industry.title}
          lead={industry.answer}
          breadcrumbs={breadcrumbs}
          factsHeading="What we see in this sector"
          facts={toHeroFacts(industry.problems.map((problem) => problem.title))}
          actions={<CtaBlock cta={industry.cta} size="lg" />}
        />
      ) : (
        <Hero
          eyebrow="Industries"
          title={industry.title}
          lead={industry.answer}
          breadcrumbs={breadcrumbs}
          asideHeading="What we see in this sector"
          asideItems={industry.problems.map((problem) => problem.title)}
          actions={<CtaBlock cta={industry.cta} size="lg" />}
        />
      )}

      {order}

      {industry.complianceNotes ? (
        <Section spacing="md" width="text">
          <ContentBlock>
            <Heading level={2} size="h3">
              Sector considerations
            </Heading>
            <BodyText>{industry.complianceNotes}</BodyText>
          </ContentBlock>
        </Section>
      ) : null}

      {industry.faqs?.length ? (
        <Section spacing="lg">
          <SectionHeader split eyebrow="Questions" title="Sector questions" />
          <FAQBlock faqs={industry.faqs} />
        </Section>
      ) : null}

      {rel.all.length > 0 ? (
        <Section background="surface" spacing="md">
          <SectionHeader
            eyebrow="Connected"
            title="Everything relevant to this sector"
            level={2}
          />
          <RelationshipMap relationships={rel} />
          <div className="mt-8">
            <TextLink href="/industries/">All industries</TextLink>
          </div>
        </Section>
      ) : null}

      <Section spacing="md">
        <ExploreNext href={path} />
      </Section>

      <ConversionBand cta={industry.cta} />
    </>
  );
}
