import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ExploreNext } from "@/components/navigation";
import { SplitHero, CinematicHero, toHeroFacts } from "@/components/hero";
import {
  SectionHeader,
  ProcessBlock,
  FAQBlock,
  RelatedContent,
  RelationshipMap,
  ConversionBand,
  BeforeAfter,
  ContentBlock,
  Diagram,
} from "@/components/sections";
import { CtaBlock, TextLink } from "@/components/buttons";
import { BodyText, Eyebrow, Heading } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { useCases, getUseCase } from "@/content/use-cases";
import { getUseCaseImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import { relationshipsForUseCase } from "@/lib/relationships";
import { expandFaqs } from "@/lib/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";

/** The two light grounds a band alternates between. */
type SectionGround = "bg" | "surface";

/** A section that takes its ground from where it lands in the page. */
type PlacedSection = (ground: SectionGround) => React.ReactElement;


interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs 404 at the routing layer — see /services/[slug]. */
export const dynamicParams = false;

export function generateStaticParams() {
  return useCases.filter(isPublished).map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return {};
  return buildMetadata(useCase.seo, `/use-cases/${slug}/`, { kind: "use-case" });
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase || !isPublished(useCase)) notFound();

  /* Authored FAQs topped up from the page's own content — see lib/faqs.ts. */
  const faqs = expandFaqs(useCase, "use-case");

  const layout = useCase.layout ?? "problem-solution";
  const rel = relationshipsForUseCase(slug);

  /*
    HowTo schema is only honest where the approach really is a sequence of
    steps a reader could follow. It is emitted for workflow-led pages only.
  */
  const howToSchema =
    layout === "workflow-led"
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: useCase.title,
          description: useCase.answer,
          step: useCase.approach.map((step) => ({
            "@type": "HowToStep",
            position: step.index,
            name: step.title,
            text: step.description,
          })),
        }
      : null;

  /*
   * Each section decides its eyebrow number and its ground from where the
   * layout puts it, rather than carrying a fixed one. Three layouts reorder
   * these, so a hard-coded background meant two grey bands could end up
   * adjacent and the numbering could not exist at all.
   *
   * The mechanism keeps the tint wherever it lands: it is the one section
   * that is a drawing rather than a statement, and it should not read as
   * another band of prose.
   */
  /*
   * The diagnosis and the outcome, in one band.
   *
   * "What good looks like" was a single paragraph in a section of its own —
   * 350px for two sentences, several screens below the causes it resolves.
   * Set opposite those causes with the direction of travel drawn between
   * them, it says the thing the page is actually claiming: these are the
   * reasons it happens, and this is the state on the other side of the work.
   */
  const diagnosis: PlacedSection = (ground) => (
    <Section key="diagnosis" background={ground} spacing="lg">
      <BeforeAfter
        label="Why this happens, and what good looks like"
        before={{
          eyebrow: "Diagnosis",
          title: "Why this usually happens",
          lead: "The visible symptom is rarely the cause. These are the underlying reasons we find most often.",
          items: useCase.rootCauses,
        }}
        after={{
          eyebrow: "The outcome",
          title: "What good looks like",
          text: useCase.targetState,
        }}
      />
    </Section>
  );

  const useCaseVisual = getUseCaseImage(slug);

  const matters: PlacedSection | null = useCase.whyItMatters
    ? (ground) => (
        <Section key="matters" background={ground} spacing="lg" width="content">
          {/*
            The photograph opens the page as the hero's portrait column. Each
            use case owns one image and none is shown twice, so this section
            makes its case in type.
          */}
          <ContentBlock>
            <Eyebrow>Context</Eyebrow>
            <Heading level={2} size="h3">
              Why it matters
            </Heading>
            <BodyText size="lg">{useCase.whyItMatters}</BodyText>
          </ContentBlock>
        </Section>
      )
    : null;

  const approach: PlacedSection = (ground) => (
    <Section key="approach" background={ground} spacing="lg">
      <SectionHeader
        split
        eyebrow={"How we solve it"}        title="The sequence that works"
        lead={useCase.realisticTimeline}
      />
      <ProcessBlock steps={useCase.approach} label="The sequence that works" />
    </Section>
  );

  /* Folded into the diagnosis band above; the slot stays so the three layout
     orders below still describe the same set. */
  const target: PlacedSection | null = null;

  const diagram: PlacedSection | null =
    useCase.diagram && useCase.diagram !== "none"
      ? () => (
          <Section key="diagram" background="tint" spacing="lg" width="content">
            <SectionHeader
              eyebrow={"How it works"}
              title="The mechanism behind the change"
              level={2}
            />
            <div className="mt-8">
              <Diagram kind={useCase.diagram!} />
            </div>
          </Section>
        )
      : null;

  const capabilities: PlacedSection | null =
    rel.services.length > 0
      ? (ground) => (
          <Section key="capabilities" background={ground} spacing="lg">
            <SectionHeader
              split
              eyebrow={"Capabilities"}
              title="Services involved"
            />
            <RelatedContent mode="list" items={rel.services} />
          </Section>
        )
      : null;

  const order = (
    layout === "workflow-led"
      ? [diagnosis, approach, diagram, target, capabilities, matters]
      : layout === "outcome-led"
        ? [matters, target, diagnosis, approach, capabilities, diagram]
        : [diagnosis, matters, approach, target, capabilities, diagram]
  ).filter((section): section is PlacedSection => section !== null);

  /* The tinted mechanism sits outside the alternation, so the light bands
     either side of it still differ from each other. */
  let lightIndex = 0;
  const composed = order.map((section) => {
    const ground: SectionGround = lightIndex % 2 === 0 ? "bg" : "surface";
    if (section !== diagram) lightIndex += 1;
    return section(ground);
  });

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={howToSchema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: useCase.title,
          description: useCase.seo.description,
          url: `${site.url}/use-cases/${slug}/`,
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      {/* Symptoms in the hero. No service is named above "How we solve it". */}
      {useCaseVisual ? (
        <CinematicHero
          image={useCaseVisual}
          composition="portrait"
          eyebrow="Use case"
          title={useCase.title}
          lead={useCase.answer}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Use cases", href: "/use-cases/" },
            { label: useCase.title },
          ]}
          factsHeading="Does this sound familiar?"
          facts={toHeroFacts(useCase.symptoms)}
          actions={<CtaBlock cta={useCase.cta} size="lg" />}
        />
      ) : (
        <SplitHero
          eyebrow="Use case"
          title={useCase.title}
          lead={useCase.answer}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Use cases", href: "/use-cases/" },
            { label: useCase.title },
          ]}
          asideHeading="Does this sound familiar?"
          asideItems={useCase.symptoms}
          actions={<CtaBlock cta={useCase.cta} size="lg" />}
        />
      )}

      {composed}

      {faqs.length ? (
        <Section background="surface" spacing="lg">
          <SectionHeader
            split
            eyebrow="Frequently Asked Questions"
            title="Frequently Asked Questions"
          />
          <FAQBlock faqs={faqs} />
        </Section>
      ) : null}

      {rel.all.length > 0 ? (
        <Section spacing="md">
          <SectionHeader
            eyebrow="Connected"
            title="Related across the site"
            level={2}
          />
          <RelationshipMap relationships={rel} />
          <div className="mt-6 mb-10">
            <TextLink href="/use-cases/">All use cases</TextLink>
          </div>
          <ExploreNext href={`/use-cases/${slug}/`} />
        </Section>
      ) : (
        <Section spacing="md">
          <ExploreNext href={`/use-cases/${slug}/`} />
        </Section>
      )}

      {/*
        The page has just described a change from one state to another. The
        band asks the only question left: whether the reader's situation is
        actually the "before" it described.
      */}
      <ConversionBand
        title="Is this the shape of your problem?"
        lead={`If the before state above reads like your operation, the next step is establishing which part of it is actually costing you. Describe it and we will tell you where ${useCase.title.toLowerCase()} would and would not help.`}
        cta={useCase.cta}
      />
    </>
  );
}
