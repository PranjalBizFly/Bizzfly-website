import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { SplitHero } from "@/components/hero";
import {
  SectionHeader,
  ProcessBlock,
  FAQBlock,
  RelatedContent,
  RelationshipMap,
  ConversionBand,
  EditorialBlock,
  ContentBlock,
  Diagram,
  VisualStoryBlock,
} from "@/components/sections";
import { CtaBlock, TextLink } from "@/components/buttons";
import { BodyText, Heading } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { useCases, getUseCase } from "@/content/use-cases";
import { getUseCaseImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import { relationshipsForUseCase } from "@/lib/relationships";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";

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

  const diagnosis = (
    <Section key="diagnosis" background="surface" spacing="lg">
      <EditorialBlock
        eyebrow="Diagnosis"
        title="Why this usually happens"
        lead="The visible symptom is rarely the cause. These are the underlying reasons we find most often."
        evidence={useCase.rootCauses}
      />
    </Section>
  );

  const useCaseVisual = getUseCaseImage(slug);

  const matters = useCase.whyItMatters ? (
    <Section key="matters" spacing="lg" width="content">
      {useCaseVisual ? (
        <VisualStoryBlock
          image={useCaseVisual}
          variant="B"
          eyebrow="Commercial impact"
          title={`Solving ${useCase.title.toLowerCase()}`}
          lead={useCase.whyItMatters}
        />
      ) : (
        <ContentBlock>
          <Heading level={2} size="h3">
            Why it matters
          </Heading>
          <BodyText size="lg">{useCase.whyItMatters}</BodyText>
        </ContentBlock>
      )}
    </Section>
  ) : null;

  const approach = (
    <Section key="approach" spacing="lg">
      <SectionHeader
        split
        eyebrow="How we solve it"
        title="The sequence that works"
        lead={useCase.realisticTimeline}
      />
      <ProcessBlock steps={useCase.approach} />
    </Section>
  );

  const target = (
    <Section key="target" background="surface" spacing="md" width="text">
      <ContentBlock>
        <Heading level={2} size="h3">
          What good looks like
        </Heading>
        <BodyText size="lg">{useCase.targetState}</BodyText>
      </ContentBlock>
    </Section>
  );

  const diagram =
    useCase.diagram && useCase.diagram !== "none" ? (
      <Section key="diagram" spacing="md" width="content">
        <SectionHeader
          eyebrow="How it works"
          title="The mechanism behind the change"
          level={2}
        />
        <div className="mt-8">
          <Diagram kind={useCase.diagram} />
        </div>
      </Section>
    ) : null;

  const capabilities =
    rel.services.length > 0 ? (
      <Section key="capabilities" spacing="lg">
        <SectionHeader split eyebrow="Capabilities" title="Services involved" />
        <RelatedContent mode="list" items={rel.services} />
      </Section>
    ) : null;

  const order =
    layout === "workflow-led"
      ? [diagnosis, approach, diagram, target, capabilities, matters]
      : layout === "outcome-led"
        ? [matters, target, diagnosis, approach, capabilities, diagram]
        : [diagnosis, matters, approach, target, capabilities, diagram];

  return (
    <>
      <JsonLd data={faqSchema(useCase.faqs ?? [])} />
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

      {order}

      {useCase.faqs?.length ? (
        <Section background="surface" spacing="lg">
          <SectionHeader split eyebrow="Questions" title="Common questions" />
          <FAQBlock faqs={useCase.faqs} />
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
          <div className="mt-8">
            <TextLink href="/use-cases/">All use cases</TextLink>
          </div>
        </Section>
      ) : null}

      <ConversionBand cta={useCase.cta} />
    </>
  );
}
