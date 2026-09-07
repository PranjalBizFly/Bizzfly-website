import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { SplitHero, EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  NumberedList,
  ProcessBlock,
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
import { practices, getPractice } from "@/content/practices";
import { services, getService } from "@/content/services";
import { metaForService, serviceGroups } from "@/content/service-meta";
import { isPublished } from "@/lib/registry";
import { relationshipsForService } from "@/lib/relationships";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Anything not enumerated below is a 404 at the routing layer.
 *
 * Without this, an unknown slug is rendered on demand: the streamed shell
 * flushes headers before `notFound()` runs, so the response is a 200 carrying
 * the loading skeleton. That turns every invented URL under this segment into
 * a soft 404 a crawler will index.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...practices.filter(isPublished).map((p) => ({ slug: p.slug })),
    ...services.filter(isPublished).map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entity = getPractice(slug) ?? getService(slug);
  if (!entity) return {};
  return buildMetadata(entity.seo, `/services/${slug}/`, {
    kind: getPractice(slug) ? "practice" : "service",
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const practice = getPractice(slug);
  const service = practice ? undefined : getService(slug);
  const entity = practice ?? service;

  if (!entity || !isPublished(entity)) notFound();

  const path = `/services/${slug}/`;
  const meta = service ? metaForService(service.slug) : null;
  const layout = meta?.layout ?? "editorial";
  const parentPractice = service ? getPractice(service.practice) : undefined;
  const group = meta
    ? serviceGroups.find((g) => g.id === meta.group)
    : undefined;
  const rel = relationshipsForService(slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    ...(parentPractice
      ? [{ label: parentPractice.title, href: `/services/${parentPractice.slug}/` }]
      : []),
    { label: entity.title },
  ];

  const childServices = practice
    ? practice.services
        .map((s) => services.find((x) => x.slug === s))
        .filter((s): s is NonNullable<typeof s> => Boolean(s))
    : [];

  const process = service?.approach ?? practice?.process ?? [];
  const hasDiagram = Boolean(meta && meta.diagram !== "none");

  /*
    Composition variants. The order and emphasis of sections changes with the
    layout, so a technology-led service does not read like a process-led one —
    without either needing a bespoke component.
  */
  const sections = {
    problem: service?.problems?.length ? (
      <Section key="problem" background="surface" spacing="lg">
        <EditorialBlock
          eyebrow="The problem"
          title="What this is usually brought in to fix"
          lead="Stated as we hear it, before any mention of what we would do about it."
          evidence={service.problems}
        />
      </Section>
    ) : null,

    included: service?.included?.length ? (
      <Section key="included" spacing="lg">
        <EditorialBlock
          eyebrow="Scope"
          title="What is included"
          lead="Stated plainly, so there is no ambiguity about what you are buying."
          evidence={service.included}
        />
      </Section>
    ) : null,

    process: process.length ? (
      <Section key="process" background="surface" spacing="lg">
        <SectionHeader
          split
          eyebrow="Approach"
          title="How we work through it"
          lead={service?.timeline}
        />
        <ProcessBlock steps={process} />
      </Section>
    ) : null,

    diagram: hasDiagram ? (
      <Section key="diagram" spacing="md" width="content">
        <SectionHeader
          eyebrow="How it works"
          title="The mechanism, not the marketing"
          level={2}
        />
        <div className="mt-8">
          <Diagram kind={meta!.diagram} />
        </div>
      </Section>
    ) : null,

    outcomes: service?.outcomes?.length ? (
      <Section key="outcomes" spacing="lg">
        <EditorialBlock
          eyebrow="Outcomes"
          title="What this is designed to improve"
          lead="Qualitative, because we do not publish numbers we cannot evidence."
          evidence={service.outcomes}
        />
      </Section>
    ) : null,

    boundary: service?.outOfScope?.length ? (
      <Section key="boundary" background="surface" spacing="md">
        <ContentBlock>
          <Heading level={2} size="h3">
            What this does not include
          </Heading>
          <ul>
            {service.outOfScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <BodyText muted>
            Naming the boundary early removes the most common source of
            disappointment in an engagement.
          </BodyText>
        </ContentBlock>
      </Section>
    ) : null,
  };

  const order: (keyof typeof sections)[] =
    layout === "process-led"
      ? ["problem", "process", "included", "diagram", "outcomes", "boundary"]
      : layout === "capability-led"
        ? ["problem", "included", "diagram", "process", "outcomes", "boundary"]
        : layout === "technology-led"
          ? ["problem", "diagram", "included", "boundary", "process", "outcomes"]
          : ["problem", "included", "outcomes", "process", "diagram", "boundary"];

  return (
    <>
      <JsonLd data={serviceSchema(entity.title, entity.seo.description, path)} />
      <JsonLd data={faqSchema(entity.faqs ?? [])} />

      {/* Editorial layouts get a typographic hero; the rest get the split. */}
      {layout === "editorial" && !practice ? (
        <EditorialHero
          eyebrow={group?.label ?? parentPractice?.title ?? "Services"}
          title={entity.title}
          lead={entity.answer}
          breadcrumbs={breadcrumbs}
          actions={<CtaBlock cta={entity.cta} size="lg" />}
        />
      ) : (
        <SplitHero
          eyebrow={group?.label ?? parentPractice?.title ?? "Services"}
          title={entity.title}
          lead={entity.answer}
          breadcrumbs={breadcrumbs}
          asideHeading={service ? "Who this is for" : "In this practice"}
          asideItems={
            service ? service.whoFor : childServices.slice(0, 6).map((s) => s.title)
          }
          actions={<CtaBlock cta={entity.cta} size="lg" />}
        />
      )}

      {/* Practice hubs route; services explain. */}
      {practice && childServices.length > 0 ? (
        <Section spacing="lg">
          <SectionHeader
            split
            eyebrow="Capabilities"
            title={`What ${practice.title.toLowerCase()} covers`}
          />
          <NumberedList
            items={childServices.map((s, index) => ({
              index: String(index + 1).padStart(2, "0"),
              title: s.title,
              description: s.seo.description,
              href: `/services/${s.slug}/`,
            }))}
          />
        </Section>
      ) : null}

      {order.map((key) => sections[key])}

      {entity.faqs?.length ? (
        <Section spacing="lg">
          <SectionHeader split eyebrow="Questions" title="Common questions" />
          <FAQBlock faqs={entity.faqs} />
        </Section>
      ) : null}

      {/* Curated links first, then the resolved relationship map. */}
      {entity.related?.length ? (
        <Section background="surface" spacing="md">
          <RelatedContent
            mode="split"
            heading="Where to go next"
            items={entity.related}
          />
        </Section>
      ) : null}

      {rel.all.length > 0 ? (
        <Section spacing="md">
          <SectionHeader
            eyebrow="Connected"
            title="How this fits with everything else"
            level={2}
          />
          <RelationshipMap relationships={rel} />
          <div className="mt-8">
            <TextLink href="/services/">All services</TextLink>
          </div>
        </Section>
      ) : null}

      <ConversionBand cta={entity.cta} />
    </>
  );
}
