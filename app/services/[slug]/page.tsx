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
  PracticeNarrative,
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
import { expandFaqs } from "@/lib/faqs";
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

/**
 * "a" or "an" for a service title.
 *
 * Needed because the closing band names the service the reader has just read
 * about, and the titles include acronyms whose article follows how the letter
 * is *said*, not how it is spelled: "an SEO audit" (ess), "a CRM
 * implementation" (see), "a UI/UX design" (you). A plain vowel test gets all
 * three wrong.
 *
 * So an all-caps first word is judged on its opening letter name — the letters
 * whose names begin with a vowel sound are A, E, F, H, I, L, M, N, O, R, S and
 * X — and anything else falls back to the ordinary spelling test.
 */
const VOWEL_SOUNDING_LETTERS = new Set(["A", "E", "F", "H", "I", "L", "M", "N", "O", "R", "S", "X"]);

function article(title: string): string {
  const word = title.split(/\s+/)[0] ?? "";
  const letters = word.replace(/[^A-Za-z]/g, "");
  if (!letters) return "a";

  const isAcronym = letters === letters.toUpperCase();
  const vowelSound = isAcronym
    ? VOWEL_SOUNDING_LETTERS.has(letters[0]!)
    : "AEIOU".includes(letters[0]!.toUpperCase());

  return vowelSound ? "an" : "a";
}

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

  /* Authored FAQs topped up from the page's own content — see lib/faqs.ts. */
  const faqs = expandFaqs(entity, practice ? "practice" : "service");

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
   * themselves — "The problem", "Scope" — so a service page has the
   * same spine the homepage does however its sections were ordered. And the
   * ground alternates by position rather than by section name, so no two
   * bands in a row share a background whatever the layout dropped or kept.
   */
  const sections: Record<
    string,
    ((ground: SectionGround) => React.ReactNode) | null
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
    /*
     * On a practice page the explainer is the page's substance — up to 570
     * words across four sections — so it is composed rather than set as
     * prose. PracticeNarrative gives each section its own frame, its own
     * ground and one of two compositions depending on whether its paragraphs
     * are an argument or a numbered set. ProseSections is kept for any other
     * entity that grows a `sections` array: only practices have one today,
     * and only practices have section frames assigned.
     */
    explainer: entity.sections?.length
      ? (ground) =>
          practice ? (
            <PracticeNarrative
              key="explainer"
              slug={practice.slug}
              sections={entity.sections!}
            />
          ) : (
            <ProseSections
              key="explainer"
              sections={entity.sections!}
              background={ground}
            />
          )
      : null,

    problem: service?.problems?.length
      ? (ground) => (
          <Section key="problem" background={ground} spacing="lg">
            {pairsProblemWithOutcome ? (
              <BeforeAfter
                label="What this is brought in to fix, and what it is designed to improve"
                before={{
                  eyebrow: "The problem",
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
                eyebrow={"The problem"}
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

    /*
     * Scope, led by how long the work takes wherever that is not already said.
     *
     * The lead here used to be one sentence — "Stated plainly, so there is no
     * ambiguity about what you are buying" — rendered identically on all 45
     * service pages. It is true, and it says nothing about the service it
     * introduces, which is precisely what makes a set of generated pages feel
     * generated.
     *
     * Meanwhile every service carries a `timeline`: a specific, factual,
     * authored sentence about duration — "2–3 weeks for the audit, then fixes
     * prioritised by impact", "6–10 weeks for a first production agent on a
     * single process". It is rendered as the lead of the approach section,
     * and only six of the 45 services have approach steps. On the other 39 it
     * was written, kept accurate, and never shown to anyone.
     *
     * So where the approach section is not going to render it, scope takes
     * it. Nothing is duplicated — the condition is exactly "the process band
     * is absent" — and nothing is invented: this is existing copy moved to
     * the one place on the page where a reader asking "what am I buying"
     * is also asking "and for how long".
     */
    included: service?.included?.length
      ? (ground) => (
          <Section key="included" background={ground} spacing="lg">
            <EditorialBlock
              eyebrow={"Scope"}
              title="What is included"
              lead={
                process.length === 0 && service.timeline
                  ? service.timeline
                  : "Stated plainly, so there is no ambiguity about what you are buying."
              }
              evidence={service.included}
            />
          </Section>
        )
      : null,

    process: process.length
      ? (ground) => (
          <Section key="process" background={ground} spacing="lg">
            <SectionHeader
              split
              eyebrow={"Approach"}              title="How we work through it"
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
      ? () => (
          <Section key="diagram" background="tint" spacing="lg" width="content">
            <SectionHeader
              eyebrow={"How it works"}
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
      ? (ground) => (
          <Section key="outcomes" background={ground} spacing="lg">
            <EditorialBlock
              eyebrow={"Outcomes"}
              title="What this is designed to improve"
              lead="Qualitative, because we do not publish numbers we cannot evidence."
              evidence={service.outcomes}
            />
          </Section>
        )
      : null,

    boundary: service?.outOfScope?.length
      ? (ground) => (
          <Section key="boundary" background={ground} spacing="md">
            <ContentBlock>
              <Eyebrow>The boundary</Eyebrow>
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

  /*
   * The ground for the nth band after the composed run.
   *
   * Each trailing band is optional, so the offset is the count of the ones
   * actually rendered before it rather than its position in the source. A
   * service with no questions hands the links the ground the questions would
   * have taken, and the alternation stays unbroken either way.
   */
  const trailing = [
    Boolean(faqs.length),
    Boolean(entity.related?.length),
    rel.all.length > 0,
  ];
  const groundAt = (slot: number): SectionGround => {
    const shown = trailing.slice(0, slot).filter(Boolean).length;
    return (composed.length + shown) % 2 === 0 ? "bg" : "surface";
  };

  return (
    <>
      <JsonLd data={serviceSchema(entity.title, entity.seo.description, path)} />
      <JsonLd data={faqSchema(faqs)} />

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
            title={`What ${practice.title} covers`}
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

        Numbers come from `positions`, which accounts for the explainer
        occupying one per authored section rather than one in total.
      */}
      {composed.map((key, index) =>
        sections[key]?.(index % 2 === 0 ? "bg" : "surface"),
      )}
      {/*
        The trailing bands carry on the same alternation instead of each
        picking a ground for itself.

        They used to be hardcoded — the questions band computed its own
        parity, the curated links were always `surface`, and the relationship
        map always took the default. Whenever the questions landed on surface
        the links landed on surface directly beneath them, and two grey bands
        ran together with only a heading between them. Measured on
        /services/seo/: a 672px surface band followed by a 211px surface band.

        `groundAt` continues the count from where the composed sections
        stopped, so the parity is computed once and every band after it falls
        where the rhythm says it should, whatever sections this particular
        service happens to have.
      */}

      {/*
        The questions carry on the same count rather than restarting at an
        unnumbered eyebrow, and take whichever ground the alternation is on
        when the composed sections run out.
      */}
      {faqs.length ? (
        <Section spacing="lg" background={groundAt(0)}>
          <SectionHeader
            split
            eyebrow="Frequently Asked Questions"
            title="Frequently Asked Questions"
          />
          <FAQBlock faqs={faqs} />
        </Section>
      ) : null}

      {/*
        Curated links first, then the resolved relationship map.

        `spacing` is sized to what the band actually holds. A service with two
        curated links was getting the same 129px of padding as one with eight,
        which measured as a 216px band carrying 87px of content — 60% of it
        air, immediately above a much larger band doing the same job. Short
        sets take the tighter inset; longer ones keep the full one.
      */}
      {entity.related?.length ? (
        <Section
          background={groundAt(1)}
          spacing={entity.related.length > 3 ? "md" : "sm"}
        >
          <RelatedContent
            mode="split"
            heading="Where to go next"
            items={entity.related}
          />
        </Section>
      ) : null}

      {rel.all.length > 0 ? (
        <Section spacing="md" background={groundAt(2)}>
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

      {/*
        Scoped to the service the reader has just read about, and explicit
        that the first conversation may end in "not this". That is the
        claim the rest of the page has been making.
      */}
      <ConversionBand
        title={`Talk through ${article(entity.title)} ${entity.title} requirement`}
        lead="Describe where the work currently is and what it has to achieve commercially. We will tell you what we would scope, what we would leave alone, and whether this is the right service to be buying first."
        cta={entity.cta}
      />
    </>
  );
}
