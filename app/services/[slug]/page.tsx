import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ExploreNext } from "@/components/navigation";
import { SplitHero, EditorialHero, CinematicHero, toHeroFacts } from "@/components/hero";
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
import { getServiceImage } from "@/content/images";
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
  /*
   * Composition comes from the assembled service, not from the lookup.
   *
   * metaForService falls back to {group: growth, layout: editorial,
   * diagram: none} for any slug it does not know, so reading it directly
   * gave every newer service the same editorial order — and that order puts
   * problem, included and outcomes consecutively, all three rendered by
   * EditorialBlock. The result was three identically shaped sections in a
   * row on twenty pages. content/services.ts already resolves layout and
   * diagram as `service.layout ?? meta.layout`, so read them from there.
   */
  const meta = service ? metaForService(service.slug) : null;
  const layout = service?.layout ?? meta?.layout ?? "editorial";
  const diagramKind = service?.diagram ?? meta?.diagram ?? "none";
  const parentPractice = service ? getPractice(service.practice) : undefined;
  const group = service
    ? serviceGroups.find((g) => g.id === (service.group ?? meta?.group))
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

  /*
   * Curated order first, then everything else that belongs to this practice.
   *
   * practice.services is a hand-ordered shortlist and worth keeping as one —
   * it puts the services people actually arrive looking for at the top. But
   * read alone it silently omits any service added since the list was last
   * touched, which leaves those pages reachable only from /services/ and not
   * from their own parent hub. The union keeps the ordering and closes that.
   */
  const childServices = practice
    ? [
        ...practice.services
          .map((s) => services.find((x) => x.slug === s))
          .filter((s): s is NonNullable<typeof s> => Boolean(s)),
        ...services.filter(
          (s) => s.practice === practice.id && !practice.services.includes(s.slug),
        ),
      ]
    : [];

  const process = service?.approach ?? practice?.process ?? [];
  const hasDiagram = diagramKind !== "none";

  const serviceVisual = getServiceImage(slug);

  /* The spec list the old hero showed as bullets, now the hero fact cards. */
  const heroFacts = toHeroFacts(
    service ? service.whoFor : childServices.slice(0, 6).map((s) => s.title),
  );

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

    /*
     * The photograph moved to the hero.
     *
     * Each service owns exactly one commissioned image and no image is ever
     * shown on two pages, so this section and the hero were competing for
     * the same asset. Repeating it here would have been the one thing the
     * image system forbids, and cropping it twice does not make it two
     * visuals.
     */
    visual: null,

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
          <Diagram kind={diagramKind} />
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

  /*
   * problem, included and outcomes all render through EditorialBlock, so any
   * order that puts them consecutively produces three identically shaped
   * sections in a row. Every ordering below separates them with process,
   * diagram, visual or boundary.
   */
  const order: (keyof typeof sections)[] =
    layout === "process-led"
      ? ["problem", "process", "visual", "included", "diagram", "outcomes", "boundary"]
      : layout === "capability-led"
        ? ["problem", "visual", "included", "diagram", "process", "outcomes", "boundary"]
        : layout === "technology-led"
          ? ["problem", "diagram", "visual", "included", "boundary", "process", "outcomes"]
          : ["problem", "visual", "included", "process", "outcomes", "diagram", "boundary"];

  /*
   * Separating the statements is not something the fixed orders above can
   * guarantee, because which sections exist varies by service. A service with
   * no approach steps and no diagram — several of the search services — drops
   * both spacers out of its order and leaves problem, included and outcomes
   * adjacent, which is three identically shaped sections however they were
   * sequenced.
   *
   * So the order is a preference and this enforces the rule: walk the
   * sections that actually exist, and when a third statement would follow two
   * others, pull the next non-statement section forward to break the run.
   * Where nothing is available to pull, the run stands — a page with only
   * three sections has no arrangement that fixes it.
   */
  const STATEMENTS = new Set<keyof typeof sections>([
    "problem",
    "included",
    "outcomes",
  ]);

  const present = order.filter((key) => sections[key]);
  const composed: (keyof typeof sections)[] = [];
  const remaining = [...present];

  while (remaining.length > 0) {
    const runLength = composed
      .slice(-2)
      .filter((key) => STATEMENTS.has(key)).length;

    const nextIsStatement = STATEMENTS.has(remaining[0]!);
    if (runLength === 2 && nextIsStatement) {
      const spacer = remaining.findIndex((key) => !STATEMENTS.has(key));
      if (spacer > 0) {
        composed.push(...remaining.splice(spacer, 1));
        continue;
      }
    }
    composed.push(remaining.shift()!);
  }

  return (
    <>
      <JsonLd data={serviceSchema(entity.title, entity.seo.description, path)} />
      <JsonLd data={faqSchema(entity.faqs ?? [])} />

      {/*
        The service photograph opens the page rather than appearing halfway
        down it. Every service has exactly one commissioned image, so putting
        it in the hero is a choice about where the one visual does most work
        — and bleed-left is this template's signature, distinct from the
        industry banner and the use-case portrait.
      */}
      {serviceVisual ? (
        <CinematicHero
          image={serviceVisual}
          composition="bleed-left"
          eyebrow={group?.label ?? parentPractice?.title ?? "Services"}
          title={entity.title}
          lead={entity.answer}
          breadcrumbs={breadcrumbs}
          factsHeading={service ? "Who this is for" : "In this practice"}
          facts={heroFacts}
          actions={<CtaBlock cta={entity.cta} size="lg" />}
        />
      ) : layout === "editorial" && !practice ? (
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

      {/* The practice photograph is the hero image now — see `visual` above. */}
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

      {composed.map((key) => sections[key])}

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

      <Section spacing="md">
        <ExploreNext href={path} />
      </Section>

      <ConversionBand cta={entity.cta} />
    </>
  );
}
