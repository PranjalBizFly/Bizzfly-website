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
  BeforeAfter,
  ContentBlock,
  Diagram,
  ProseSections,
} from "@/components/sections";
import { CtaBlock, TextLink } from "@/components/buttons";
import { BodyText, Eyebrow, Heading } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { practices, getPractice } from "@/content/practices";
import { services, getService } from "@/content/services";
import { metaForService, serviceGroups } from "@/content/service-meta";
import { getServiceImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import { relationshipsForService } from "@/lib/relationships";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";

/**
 * The grounds an alternating band can take.
 *
 * Deliberately only the two light ones. Tint is reserved for the diagram
 * section, which has to read as a different kind of thing wherever it lands,
 * and inverse belongs to the conversion band that closes the page — a second
 * dark band above it would take the emphasis off the one that matters.
 */
type SectionGround = "bg" | "surface";

/** Zero-padded position, so the eyebrows read 01, 02 rather than 1, 2. */
const pad = (position: number) => String(position).padStart(2, "0");

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

  /*
   * The problem and the outcomes become one section wherever a service states
   * both. They are the two ends of the same engagement, and set several
   * screens apart in identical shapes — heading, lead, numbered list — a
   * reader never connects them.
   */
  const pairsProblemWithOutcome = Boolean(
    service?.problems?.length && service?.outcomes?.length,
  );

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
  /*
   * Every section is a function of the position it ends up in, because the
   * order is composed below rather than fixed here.
   *
   * That buys two things the old map could not have. The eyebrows number
   * themselves — "01 / The problem", "02 / Scope" — so a service page has the
   * same spine the homepage does however its sections were ordered. And the
   * ground alternates by position rather than by section name, so no two
   * bands in a row share a background whatever the layout dropped or kept.
   */
  const sections: Record<
    string,
    ((position: number, ground: SectionGround) => React.ReactNode) | null
  > = {
    /*
     * The explanation, before any of the lists.
     *
     * Everything else in this map renders an enumeration — problems, scope,
     * outcomes, steps. A page built only from those states facts without ever
     * making the argument that connects them, which is what made these pages
     * read as specifications. This is where the page explains itself, and it
     * comes first because a reader needs the argument before the inventory.
     */
    explainer: entity.sections?.length
      ? (_position, ground) => (
          <ProseSections
            key="explainer"
            sections={entity.sections!}
            background={ground}
          />
        )
      : null,

    problem: service?.problems?.length
      ? (position, ground) => (
          <Section key="problem" background={ground} spacing="lg">
            {pairsProblemWithOutcome ? (
              <BeforeAfter
                label="What this is brought in to fix, and what it is designed to improve"
                before={{
                  eyebrow: `${pad(position)} / The problem`,
                  title: "What this is usually brought in to fix",
                  lead: "Stated as we hear it, before any mention of what we would do about it.",
                  items: service.problems,
                }}
                after={{
                  eyebrow: "The intended result",
                  title: "What this is designed to improve",
                  lead: "Qualitative, because we do not publish numbers we cannot evidence.",
                  items: service.outcomes,
                }}
              />
            ) : (
              <EditorialBlock
                eyebrow={`${pad(position)} / The problem`}
                title="What this is usually brought in to fix"
                lead="Stated as we hear it, before any mention of what we would do about it."
                evidence={service.problems}
              />
            )}
          </Section>
        )
      : null,

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

    included: service?.included?.length
      ? (position, ground) => (
          <Section key="included" background={ground} spacing="lg">
            <EditorialBlock
              eyebrow={`${pad(position)} / Scope`}
              title="What is included"
              lead="Stated plainly, so there is no ambiguity about what you are buying."
              evidence={service.included}
            />
          </Section>
        )
      : null,

    process: process.length
      ? (position, ground) => (
          <Section key="process" background={ground} spacing="lg">
            <SectionHeader
              split
              eyebrow={`${pad(position)} / Approach`}
              title="How we work through it"
              lead={service?.timeline}
            />
            <ProcessBlock steps={process} label="How we work through it" />
          </Section>
        )
      : null,

    /*
     * The mechanism, on the tinted band whatever position it lands in.
     *
     * This is the one section on the page that is a drawing rather than a
     * list, and it is the page's centre of gravity. Alternating grey with
     * everything around it left it reading as one more band; the tint marks
     * it as a different kind of thing, which is what the homepage does with
     * its own signature section.
     */
    diagram: hasDiagram
      ? (position) => (
          <Section key="diagram" background="tint" spacing="lg" width="content">
            <SectionHeader
              eyebrow={`${pad(position)} / How it works`}
              title="The mechanism, not the marketing"
              level={2}
            />
            <div className="mt-8">
              <Diagram kind={diagramKind} />
            </div>
          </Section>
        )
      : null,

    /* Only when it was not already paired with the problem above. */
    outcomes: !pairsProblemWithOutcome && service?.outcomes?.length
      ? (position, ground) => (
          <Section key="outcomes" background={ground} spacing="lg">
            <EditorialBlock
              eyebrow={`${pad(position)} / Outcomes`}
              title="What this is designed to improve"
              lead="Qualitative, because we do not publish numbers we cannot evidence."
              evidence={service.outcomes}
            />
          </Section>
        )
      : null,

    boundary: service?.outOfScope?.length
      ? (position, ground) => (
          <Section key="boundary" background={ground} spacing="md">
            <ContentBlock>
              <Eyebrow>{`${pad(position)} / The boundary`}</Eyebrow>
              <Heading level={2} size="h3">
                What this does not include
              </Heading>
              <ul>
                {service.outOfScope!.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <BodyText muted>
                Naming the boundary early removes the most common source of
                disappointment in an engagement.
              </BodyText>
            </ContentBlock>
          </Section>
        )
      : null,
  };

  /*
   * problem, included and outcomes all render through EditorialBlock, so any
   * order that puts them consecutively produces three identically shaped
   * sections in a row. Every ordering below separates them with process,
   * diagram, visual or boundary.
   */
  const order: (keyof typeof sections)[] =
    layout === "process-led"
      ? ["explainer", "problem", "process", "visual", "included", "diagram", "outcomes", "boundary"]
      : layout === "capability-led"
        ? ["explainer", "problem", "visual", "included", "diagram", "process", "outcomes", "boundary"]
        : layout === "technology-led"
          ? ["explainer", "problem", "diagram", "visual", "included", "boundary", "process", "outcomes"]
          : ["explainer", "problem", "visual", "included", "process", "outcomes", "diagram", "boundary"];

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

      {/*
        Position decides the eyebrow number and the ground: the explainer
        opens on the page background, and every band after it alternates.
        Nothing here knows which sections a given service happens to have,
        which is the point — a service with no process steps still gets a
        page whose bands alternate and whose eyebrows count from one.
      */}
      {composed.map((key, index) =>
        sections[key]?.(index + 1, index % 2 === 0 ? "bg" : "surface"),
      )}

      {/*
        The questions carry on the same count rather than restarting at an
        unnumbered eyebrow, and take whichever ground the alternation is on
        when the composed sections run out.
      */}
      {entity.faqs?.length ? (
        <Section
          spacing="lg"
          background={composed.length % 2 === 0 ? "bg" : "surface"}
        >
          <SectionHeader
            split
            eyebrow={`${pad(composed.length + 1)} / Questions`}
            title="Common Questions"
          />
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
          <div className="mt-6 mb-10">
            <TextLink href="/services/">All services</TextLink>
          </div>
          <ExploreNext href={path} />
        </Section>
      ) : (
        <Section spacing="md">
          <ExploreNext href={path} />
        </Section>
      )}

      <ConversionBand cta={entity.cta} />
    </>
  );
}
