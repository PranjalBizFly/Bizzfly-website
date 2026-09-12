import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ExploreNext } from "@/components/navigation";
import { SplitHero, EditorialHero, CinematicHero, toHeroFacts } from "@/components/hero";
import {
  SectionHeader,
  ProblemMap,
  FAQBlock,
  RelatedContent,
  RelationshipMap,
  CardTrack,
  ConversionBand,
  type CardTrackEntry,
  AnchoredStatement,
  ContentBlock,
  EditorialBlock,
  Diagram,
} from "@/components/sections";
import { CtaBlock, TextLink } from "@/components/buttons";
import { BodyText, Heading } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { industries, getIndustry } from "@/content/industries";
import { services } from "@/content/services";
import { technologies } from "@/content/technologies";
import { getIndustryImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import { relationshipsForIndustry } from "@/lib/relationships";
import { expandFaqs } from "@/lib/faqs";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";

/** The two light grounds a band alternates between. See `composed` below. */
type SectionGround = "bg" | "surface";

/** A section that takes its ground from where it lands in the page. */
type PlacedSection = (ground: SectionGround) => React.ReactElement;


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

  /*
   * Every other published sector, each with the frame already assigned to its
   * own page. Filtered on `isPublished` for the same reason the route is:
   * a card is a link, and linking to a page that 404s is worse than omitting
   * the sector.
   */
  const otherSectors: CardTrackEntry[] = industries
    .filter((entry) => entry.slug !== slug && isPublished(entry))
    .map((entry, index) => {
      const image = getIndustryImage(entry.slug);
      return image
        ? {
            index: String(index + 1).padStart(2, "0"),
            title: entry.title,
            description: entry.problems[0]?.description ?? entry.answer,
            href: `/industries/${entry.slug}/`,
            image,
          }
        : null;
    })
    .filter((entry): entry is CardTrackEntry => entry !== null);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries/" },
    { label: industry.title },
  ];

  /*
    Industry variants. Healthcare should not read like manufacturing, so the
    emphasis moves: challenge-led opens on the problems, opportunity-led opens
    on what is available, journey-led opens on the sequence of work.

    Each section is a function of where it lands rather than a finished
    element, for the same reason the service template is: the order changes
    per sector, so the eyebrow numbers and the alternating ground can only be
    decided once the order is known. The journey band keeps its dark ground
    wherever it falls — it is the one section on the page that is a
    recommendation rather than an inventory, and it should read that way.
  */
  /*
   * The problems and the work that answers them, as one mapping.
   *
   * They used to be two sections several screens apart — a numbered list of
   * what stalls, and a list of services under "The work that addresses those
   * problems" — which asserted a relationship the reader had to hold in their
   * head to see. `addressedBy` already records that relationship per problem,
   * so the section draws it: pick a problem, the capabilities that answer it
   * are marked, and every capability carries the numbers of the problems it
   * answers whether or not anything is touched.
   */
  const problemSolutions = [
    ...new Map(
      [
        ...industry.problems.flatMap((problem) => problem.addressedBy),
        ...rel.services
          .map((link) => link.href.replace(/^\/services\/|\/$/g, ""))
          .filter(Boolean),
      ]
        .map((slug) => services.find((service) => service.slug === slug))
        .filter((service): service is NonNullable<typeof service> => Boolean(service))
        .map((service) => [service.slug, service] as const),
    ).values(),
  ].slice(0, 8);

  const problems: PlacedSection = (ground) => (
    <Section key="problems" background={ground} spacing="lg">
      <ProblemMap
        problemsEyebrow={"The problems"}
        problemsTitle="Where growth actually stalls in this sector"
        problemsLead="Named in the sector's own vocabulary, because a generic list would tell you nothing about whether we understand your business."
        solutionsEyebrow="The work that answers them"
        solutionsTitle="What we would put against each"
        solutionsLead="Mapped to a problem on the left, not offered because it is on our service list."
        problems={industry.problems.map((problem) => ({
          title: problem.title,
          description: problem.description,
          solutions: problem.addressedBy,
        }))}
        solutions={problemSolutions.map((service) => ({
          key: service.slug,
          label: service.title,
          description: service.answer,
          href: `/services/${service.slug}/`,
        }))}
      />
    </Section>
  );

  const opportunity: PlacedSection | null = industry.opportunity
    ? (ground) => (
        <Section key="opportunity" background={ground} spacing="lg">
          <EditorialBlock
            eyebrow={"The opportunity"}
            title="What is actually available here"
            lead={industry.opportunity}
            evidence={industry.problems.map((p) => p.title)}
          />
        </Section>
      )
    : null;

  /* Authored FAQs topped up from the page's own content — see lib/faqs.ts. */
  const faqs = expandFaqs(industry, "industry");

  const industryVisual = getIndustryImage(slug);

  /*
   * The sector photograph is the hero band now. Each industry owns exactly
   * one image and none is ever shown twice, so this section carries the
   * argument in type instead of cropping the same picture a second time.
   */
  const context: PlacedSection = (ground) => (
    <Section key="context" background={ground} spacing="lg">
      {/*
        The sector's context, read as a claim and its elaboration.

        This was a single paragraph set as one undifferentiated block of body
        type — the same shape on all 26 sector pages, with no entry point and
        nothing to tell a reader where the argument turned. AnchoredStatement
        takes the author's OWN first sentence as the statement and sets the
        remainder beside it as the detail; splitClaim rewrites nothing, so
        every word is the one that was authored, in the order it was authored.

        The title is the sector's own `contextHeading` — its opening claim
        compressed, not a heading written fresh for it. Passing one matters:
        without a title the claim takes the statement position as a <p>, so
        the band looked headed and was not, and 26 sector pages carried a
        full-width band that nothing named in the document outline. With it,
        AnchoredStatement sets a real h2 and keeps the author's sentence
        intact as the emphasised opening of the lead. And no image — each
        sector owns exactly one photograph and it is already the hero, so
        this section carries the argument in type, as before.
      */}
      <AnchoredStatement
        eyebrow={"Context"}
        title={industry.contextHeading}
        paragraphs={[industry.context]}
      />
    </Section>
  );

  /*
   * Folded into the mapping above. Kept as null rather than deleted so the
   * three layout orders below still read as the same set of slots.
   */
  const capabilities: PlacedSection | null = null;

  const journey: PlacedSection | null =
    rel.useCases.length > 0
      ? () => (
          <Section key="journey" background="inverse" spacing="lg">
            <SectionHeader
              split
              eyebrow={"Recommended journey"}              title="Where most engagements in this sector start"
              lead="Usually with the constraint that is capping everything else, rather than with the most visible symptom."
            />
            <RelatedContent mode="list" items={rel.useCases} />
          </Section>
        )
      : null;

  const technology: PlacedSection | null =
    rel.technologies.length > 0
      ? (ground) => (
          <Section key="technology" background={ground} spacing="lg">
            <SectionHeader
              split
              eyebrow={"Technology"}
              title="What tends to be involved"
              lead="Named with the reason it is on the list. Each links to the page stating where we would use it and where we would not."
            />
            {/*
              Set as cards carrying the reason, not as a row of chips.
              `technologyLink` fills `description` with the technology's
              CATEGORY — "Search & Analytics", "Web Stack" — so the compact
              chip row this used to render named four products and explained
              none of them, then left the rest of the band empty. The record's
              own `whyItMatters` is the sentence a sector reader is actually
              looking for, so it is what the card carries. The journey section
              above uses the numbered list mode, which is why this one does
              not: two identical rails on one page read as one section split
              in half.
            */}
            <RelatedContent
              items={rel.technologies.map((link) => {
                const slug = link.href.replace(/^\/technologies\/|\/$/g, "");
                const record = technologies.find((entry) => entry.slug === slug);
                return {
                  ...link,
                  description:
                    record?.whyItMatters ?? record?.answer ?? link.description,
                };
              })}
            />
            {industry.diagram && industry.diagram !== "none" ? (
              <div className="mt-16">
                <Diagram kind={industry.diagram} />
              </div>
            ) : null}
          </Section>
        )
      : null;

  const order = (
    layout === "opportunity-led"
      ? [context, opportunity, capabilities, problems, technology, journey]
      : layout === "journey-led"
        ? [context, journey, problems, capabilities, technology, opportunity]
        : [context, problems, capabilities, journey, technology, opportunity]
  ).filter((section): section is PlacedSection => section !== null);

  /*
   * The dark band is placed, not alternated, so the light sections either
   * side of it both take the page background rather than one of them landing
   * on grey against black.
   */
  let lightIndex = 0;
  const composed = order.map((section) => {
    const ground: SectionGround = lightIndex % 2 === 0 ? "bg" : "surface";
    if (section !== journey) lightIndex += 1;
    return section(ground);
  });

  /*
   * The ground for the nth band after the composed run.
   *
   * Each trailing band is optional, so the offset counts the ones actually
   * rendered before it rather than its position in the source. `lightIndex`
   * rather than `composed.length` is the base, because the pinned dark
   * journey band deliberately does not advance the count.
   */
  const trailing = [
    Boolean(industry.complianceNotes),
    Boolean(faqs.length),
    rel.all.length > 0,
    otherSectors.length > 0,
  ];
  const groundAt = (slot: number): SectionGround => {
    const shown = trailing.slice(0, slot).filter(Boolean).length;
    return (lightIndex + shown) % 2 === 0 ? "bg" : "surface";
  };

  const Hero = layout === "opportunity-led" ? EditorialHero : SplitHero;

  return (
    <>
      <JsonLd data={serviceSchema(industry.title, industry.seo.description, path)} />
      <JsonLd data={faqSchema(faqs)} />

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

      {composed}

      {industry.complianceNotes ? (
        <Section background={groundAt(0)} spacing="md" width="content">
          <ContentBlock>
            <Heading level={2} size="h3">
              Sector considerations
            </Heading>
            <BodyText>{industry.complianceNotes}</BodyText>
          </ContentBlock>
        </Section>
      ) : null}

      {faqs.length ? (
        <Section background={groundAt(1)} spacing="lg">
          <SectionHeader
            split
            eyebrow="Frequently Asked Questions"
            title="Frequently Asked Questions"
          />
          <FAQBlock faqs={faqs} />
        </Section>
      ) : null}

      {rel.all.length > 0 ? (
        <Section background={groundAt(2)} spacing="md">
          <SectionHeader
            eyebrow="Connected"
            title="Everything relevant to this sector"
            level={2}
          />
          <RelationshipMap relationships={rel} />
          <div className="mt-6">
            <TextLink href="/industries/">All industries</TextLink>
          </div>
        </Section>
      ) : null}

      {/*
        Cross-sector discovery, and the one place on this page that offers it.
        The relationship map above covers what is relevant WITHIN this sector —
        its services, use cases and technologies — and says nothing about the
        other twenty-five, which is exactly what a reader who has decided this
        is not their sector needs next.

        Autoplay is on here: twenty-five items is a set nobody scrolls through
        by hand, and the drift is what makes the range visible at all.
      */}
      {otherSectors.length > 0 ? (
        <Section background={groundAt(3)} spacing="lg">
          <SectionHeader
            split
            eyebrow="Other sectors"
            title="Not your industry?"
            lead="We publish a sector page only where we can name that sector's real problems in its own vocabulary. These are the rest of them."
          />
          <CardTrack
            entries={otherSectors}
            label="Other sectors we work with"
          />
        </Section>
      ) : null}

      <Section spacing="md">
        <ExploreNext href={path} />
      </Section>

      {/*
        Named rather than generic. A reader on a sector page is deciding
        whether we understand THEIR sector, so the band asks the question
        that decides it — and says plainly that the answer may be no.
      */}
      <ConversionBand
        title={`Tell us what is not working in ${industry.title}`}
        lead="Bring the constraint as you see it. We will tell you whether it is the one we would attack first, what we would need to look at to be sure, and whether this is work we should be doing at all."
        cta={industry.cta}
      />
    </>
  );
}
