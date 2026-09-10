import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { HomeHero } from "@/components/hero";
import {
  SectionHeader,
  CardTrack,
  CapabilityGroups,
  VisibilitySpectrum,
  ProblemList,
  StageList,
  JourneyList,
  TrustStandard,
  FAQBlock,
  ConversionBand,
  ShowcaseGrid,
  StatBand,
  InsightGrid,
  SurfacePresence,
  WhyBizzFly,
  GrowthEngine,
  FounderNote,
  TestimonialCarousel,
  type CardTrackEntry,
  type ShowcaseEntry,
  type Stat,
  type InsightEntry,
} from "@/components/sections";
import { Marquee, MarqueeItem, Reveal } from "@/components/motion";
import { TextLink } from "@/components/buttons";
import { BodyText } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";
import { industries } from "@/content/industries";
import { technologies } from "@/content/technologies";
import { resources } from "@/content/resources";
import { testimonials } from "@/content/testimonials";
import { allCompanyPages } from "@/content/company";
import { site } from "@/content/site";
import {
  getHomepageImages,
  getIndustryImage,
  getNarrativeImages,
  getStageImages,
  getResourceImage,
  resourceImageAssignments,
} from "@/content/images";
import { entriesByKind } from "@/lib/registry";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Digital Growth, AI & Automation",
  description:
    "BizzFly makes businesses visible across search and AI platforms, then builds the websites, software and automation that turn that visibility into revenue.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "BizzFly — Digital Growth, AI & Automation",
    description:
      "Get found across search and AI answers. Build the digital experience behind it. Automate the work that follows.",
    images: [
      {
        url: "/og/?title=Get%20found.%20Build%20well.%20Automate%20the%20rest.&kind=BizzFly",
        width: 1200,
        height: 630,
        alt: "BizzFly — digital growth, AI, automation and technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BizzFly — Digital Growth, AI & Automation",
    description:
      "Get found across search and AI answers. Build the digital experience behind it. Automate the work that follows.",
    images: [
      "/og/?title=Get%20found.%20Build%20well.%20Automate%20the%20rest.&kind=BizzFly",
    ],
  },
};

/*
 * The homepage carries all twenty-six sectors.
 *
 * It used to show a chosen six. The reason was height: as a stacked list of
 * rows, twenty-six measured 7,848px with 105 links, a third of the page, and
 * more scrolling than any visitor gives a homepage before deciding.
 *
 * A drifting track removes that constraint entirely. The section is one card
 * tall whether it holds six sectors or twenty-six, so the whole catalogue now
 * costs the page nothing in height — and the range is the point of the
 * section, which a curated six could only imply.
 *
 * Each card carries the same photograph as the sector page it opens, so
 * following the link is continuous rather than a jump to an unrelated image.
 * All twenty-six already have their own frame in the registry — verified as
 * twenty-six unique images, none missing and none shared — so nothing here
 * needed new artwork.
 */
const industryEntries: CardTrackEntry[] = industries.map((industry) => {
  const image = getIndustryImage(industry.slug);
  return image ? { industry, image } : null;
})
  .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
  .map(({ industry, image }, index) => ({
    index: String(index + 1).padStart(2, "0"),
    title: industry.title,
    description: industry.problems[0]?.description ?? industry.answer,
    href: `/industries/${industry.slug}/`,
    image,
  }));

/*
 * The figures band.
 *
 * Every number here counts something published on this site, which is the
 * only kind of number the trust section further down permits. No client
 * outcomes, years-in-business or award tallies, because none of those can
 * be evidenced yet — see trustCommitments in content/homepage.ts.
 */
const stats: Stat[] = [
  {
    label: "Services",
    value: String(entriesByKind("service").length),
    note: "Each states what it covers, what it does not, and what skipping it costs you.",
    href: "/services/",
  },
  {
    label: "Industries",
    value: String(industries.length),
    note: "Published only where we can name that sector's problems in its own vocabulary.",
    href: "/industries/",
  },
  {
    label: "Use cases",
    value: String(entriesByKind("use-case").length),
    note: "Written from the problem the visitor arrived with, not the service we would sell.",
    href: "/use-cases/",
  },
  {
    label: "Technologies",
    value: String(technologies.length),
    note: "What we build with, why, and when we would tell you to use something else.",
    href: "/technologies/",
  },
];

/*
 * Insights.
 *
 * Chosen by which resources have a commissioned cover image rather than by
 * position in the array, because this section is now image-led — a card with
 * no picture in a row of three that have one reads as a missing asset. The
 * full library is one click away, and /resources/ still lists it in order.
 */
const insightEntries: InsightEntry[] = resources
  .filter((resource) => resourceImageAssignments[resource.slug])
  .slice(0, 3)
  .map((resource) => {
    const image = getResourceImage(resource.slug);
    return {
      image: image!,
      kind: resource.readingTime
        ? `${resource.type} · ${resource.readingTime}`
        : resource.type,
      title: resource.title,
      excerpt: resource.answer,
      href: `/resources/${resource.slug}/`,
    };
  });

/*
 * The questions asked before a first call, lifted from /company/faq/ rather
 * than written again here. One source, so an answer cannot drift between the
 * homepage and the page that owns it.
 */
const homeFaqs =
  allCompanyPages.find((page) => page.slug === "faq")?.faqs?.slice(0, 6) ?? [];

export default function HomePage() {
  const homeImages = getHomepageImages();
  /*
   * Imagery for the narrative sections, reusing frames already assigned
   * elsewhere. See getNarrativeImages for why that exception exists and what
   * it costs.
   */
  const narrative = getNarrativeImages();
  /* One frame per lifecycle stage — see getStageImages for the pairing rule. */
  const stageImages = getStageImages();

  /*
   * The showcase.
   *
   * Five disciplines, each led by its own photograph. This is the slot an
   * agency homepage gives to client work; we have no client-approved case
   * studies yet, so it carries the disciplines instead and every card links
   * to the page that explains one. Nothing here implies a project that did
   * not happen.
   */
  const showcase: ShowcaseEntry[] = [
    /*
     * Outcome first, mechanism second.
     *
     * These headings used to lead with the discipline's internal vocabulary —
     * "Multi-surface search query analysis", "Entity-first retrieval for
     * modern answer engines". Both are accurate and neither means anything to
     * the person who signs the contract, which on this page is a business
     * owner rather than a search practitioner. The technical framing has not
     * been removed; it has moved one line down, where it now does the work of
     * evidencing the claim above it rather than being the claim.
     *
     * The deep vocabulary still leads on the service and technology pages,
     * where the reader has self-selected into it.
     */
    {
      image: homeImages.whatWeDo,
      eyebrow: "Advisory & Architecture",
      title: "Know which problem to fix first",
      lead: "Most engagements start by buying the wrong thing. The first two weeks establish where growth is actually constrained — visibility, the website, or the operations behind it — and you keep those findings whether or not you continue with us.",
      tags: ["Digital strategy", "Architecture", "Measurement"],
      href: "/services/digital-strategy/",
      linkLabel: "Digital growth strategy",
    },
    {
      image: homeImages.visibility,
      eyebrow: "Search Intelligence",
      title: "Be found wherever buyers look",
      lead: "Ranked results, map packs and vertical directories are separate retrieval systems, and being strong in one tells you nothing about the others. We measure each surface and fix the ones that are failing.",
      tags: ["SEO", "Technical SEO", "Local search"],
      href: "/services/seo/",
      linkLabel: "Search engine optimisation",
    },
    {
      image: homeImages.aiSearch,
      eyebrow: "Generative AI & AEO",
      title: "Get your business cited by AI search",
      lead: "Assistants increasingly answer instead of linking, and they cite the sources they can parse. Structured data, a clear entity and machine-readable content are what put you among them.",
      tags: ["GEO", "AEO", "Structured data"],
      href: "/services/generative-engine-optimisation/",
      linkLabel: "Generative engine optimisation",
    },
    {
      image: homeImages.automation,
      eyebrow: "Operations",
      title: "Handle the demand without hiring for it",
      lead: "Quoting, lead routing and support handoffs are the steps that break first when enquiries rise. Automating them is what stops growth turning into a backlog.",
      tags: ["Workflow automation", "AI agents", "Integration"],
      href: "/services/workflow-automation/",
      linkLabel: "Business automation",
    },
    {
      image: homeImages.technology,
      eyebrow: "Engineering Standards",
      title: "A site fast enough to rank, clear enough to convert",
      lead: "Speed, accessibility and structure are the same engineering decisions that decide whether you rank at all. We build them in rather than optimising for them afterwards.",
      tags: ["Web development", "Custom software", "Core Web Vitals"],
      href: "/services/web-development/",
      linkLabel: "Web & software development",
    },
  ];

  return (
    <>
      {/* Homepage is the entity anchor; WebPage ties it to the Organization. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${site.url}/#webpage`,
          url: site.url,
          name: `${site.name} — Digital Growth, AI & Automation`,
          description: site.description,
          isPartOf: { "@id": `${site.url}/#website` },
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      {/*
        The homepage renders the same six questions every entity page marks up,
        and was the one page carrying them without the schema. Built from the
        same `homeFaqs` array the block below renders, so the markup cannot
        describe questions the page does not actually show.
      */}
      {homeFaqs.length ? <JsonLd data={faqSchema(homeFaqs)} /> : null}

      {/* 01 — Hero at display scale, closed by the discovery ticker. */}
      <HomeHero />

      {/* 02 — Four pillars, as a card wall */}
      <Section spacing="lg" id="what-we-do">
        <SectionHeader
          centred
          eyebrow="02 / What we do"
          title="Four jobs, in the order they actually matter"
          lead="Visibility with nothing behind it wastes budget. A good website nobody finds wastes more. We work across all four because in practice they are one problem."
        />
        <CapabilityGroups images={narrative.jobs} />
      </Section>

      {/*
        03 — The showcase, image-led.
        The five section photographs used to be spread down the page one per
        section, which meant no two were ever seen together and the page read
        as text with illustrations. Gathered here they read as a body of work.
      */}
      <Section background="surface" spacing="lg" id="work">
        <SectionHeader
          centred
          eyebrow="03 / How we work"
          title="Five disciplines, one engagement"
          lead="Most agencies sell one of these and subcontract the rest. The team that finds the problem is the team that fixes it, so the handovers that usually lose a project do not exist here."
        />
        <ShowcaseGrid entries={showcase} />
        <div className={styles.sectionFooter}>
          <TextLink href="/services/">All services</TextLink>
        </div>
      </Section>

      {/*
        04 — Why BizzFly.
        The live site carries a "Why choose us" section with four named
        pillars and this one had nothing equivalent: the page explained what
        we do at length and never answered why us rather than anyone else.
        The pillar names are the company's own; the supporting copy is
        rewritten so each one states a mechanism a reader can check instead
        of an adjective every competitor could also claim.
      */}
      {/*
        Full-bleed rather than a contained Section: the photograph is the
        ground for this one, so it owns its own header, container and footer
        link. Section would wrap it in a container and cap the image.
      */}
      <WhyBizzFly image={narrative.why} />

      {/*
        04 — The figures, on a dark band.
        A light section of numbers between two other light sections did not
        read as a band at all. Inverted it punctuates the page, which is the
        job this block is doing.
      */}
      <Section background="inverse" spacing="md" id="scale">
        {/*
          Revealed here rather than inside SectionHeader: that component is on
          fifteen page files and giving it a reveal would animate every
          section on the site, which is a different decision from animating
          this one.
        */}
        <Reveal>
          <SectionHeader
            centred
            eyebrow="05 / Published"
            title="What is actually on this site"
            lead="Not awards, not client counts. These are the pages we have written and stand behind — the only numbers we can currently put a source against."
          />
        </Reveal>
        <StatBand stats={stats} />
      </Section>

      {/*
        05 — Signature section: the discoverability spectrum.
        This is the AI and search narrative, and it still needs to read as
        its own movement — but a full-height deep indigo ground was doing
        that with weight rather than with composition, and it sat apart
        from the rest of the page instead of belonging to it. The tinted
        context is the quiet version of the same device: a near-white band
        carrying a trace of the brand blue, with blue taking the rules,
        active states and marks it holds everywhere else on light.
      */}
      <Section background="tint" spacing="lg" id="visibility">
        <SectionHeader
          split
          eyebrow="06 / Discoverability"
          title="SEO was one surface. Now there are five."
          lead="These are not five names for the same work. Each layer describes a different retrieval mechanism, and a business can be strong on one and invisible on the next."
        />
        <VisibilitySpectrum />
      </Section>

      {/* 06 — The visitor's problems, in their words */}
      <Section spacing="lg" id="problems">
        <SectionHeader
          split
          eyebrow="07 / Sound familiar?"
          title="Your customers do not discover businesses the way they used to"
          lead="Most engagements start with one of these sentences. Each links to how we would approach it."
        />
        <ProblemList />
        {/*
          The diagram used to sit in the hero, where it competed with the
          headline for the opening. It belongs here: this section is the
          claim that discovery has changed shape, and the diagram is that
          claim drawn — one question, three surfaces, present on some and
          absent from others.
        */}
        <div className={styles.sectionDiagram}>
          <SurfacePresence />
        </div>
      </Section>

      {/*
        08 — the Growth Engine.

        Deliberately placed here rather than beside the four jobs at the top,
        because it answers a different question and the two would otherwise
        read as the same list twice. Section 02 is the catalogue — what the
        four areas are and what sits under each. This is the sequence: the
        order they have to be solved in, and what specifically breaks when
        one is skipped. It follows the problem section because that is where
        a reader has just recognised their own situation and wants to know
        where it sits.
      */}
      {/* Full-bleed, for the same reason as the Why section above. */}
      <GrowthEngine image={narrative.engine} />

      {/* 07 — By business situation. No pricing, no packages. */}
      <Section background="surface" spacing="lg" id="stages">
        <SectionHeader
          split
          eyebrow="09 / Where you are"
          title="The right work depends on the constraint you actually have"
          lead="Businesses move between these. The mistake is buying the work that suits the stage you wish you were at."
        />
        <StageList images={stageImages} />
      </Section>

      {/* 08 — Industries */}
      <Section spacing="lg" id="industries">
        <SectionHeader
          split
          eyebrow="10 / Industries"
          title="Context matters more than templates"
          lead="A manufacturer and an education group have almost nothing in common except that both are hard to find. We publish a sector page only where we can name that sector's real problems in its own vocabulary."
        />
        <CardTrack entries={industryEntries} label="Industries we publish for" />
        <div className={styles.sectionFooter}>
          <TextLink href="/industries/">
            All {industries.length} industries
          </TextLink>
        </div>
      </Section>

      {/*
        09 — Technology. Typography carries this section, not a background:
        it used to be 2,157px of saturated brand purple, which read as a
        template rather than an engineering practice.
      */}
      <Section background="tint" spacing="lg" id="technology">
        <SectionHeader
          split
          eyebrow="11 / Technology"
          title="We are not a marketing agency with a developer attached"
          lead="The same team that finds the crawl problem capping your visibility can fix the template causing it. Every technology page states what we use, why, and when we would tell you to use something else."
        />
        <div className={styles.sectionFooter}>
          <TextLink href="/technologies/">
            All {technologies.length} technologies
          </TextLink>
        </div>
      </Section>

      {/*
        The stack as a running band, immediately under its own heading.
        It replaces the eight-row list that used to sit here: the list showed
        half the stack in 800px, the band shows all sixteen in 100 and reads
        as a strip rather than as another set of rows in a page already full
        of them. It sits outside a Section so it bleeds the viewport width.
      */}
      <div className={styles.techBand}>
        <Marquee label="The BizzFly technology stack" duration={56} reverse>
          {technologies.map((technology) => (
            <MarqueeItem key={technology.slug}>
              <Link
                href={`/technologies/${technology.slug}/`}
                className={styles.techLink}
              >
                <span className={styles.techName}>{technology.title}</span>
                <span className={styles.techCategory}>
                  {technology.category}
                </span>
              </Link>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>

      {/* 10 — Routing by intent */}
      <Section spacing="lg" id="journeys">
        <SectionHeader
          split
          eyebrow="12 / Start here"
          title="What are you trying to do?"
        />
        <JourneyList />
      </Section>

      {/* 11 — Trust. No invented proof; the standard is stated instead. */}
      <Section background="surface" spacing="lg" id="trust">
        <SectionHeader
          centred
          eyebrow="13 / Proof"
          title="What we will show you, and what we will not"
          lead="We have no client-approved case studies published yet. Rather than fill this space with logos and numbers we cannot evidence, here is the standard we hold ourselves to."
        />
        <TrustStandard />
      </Section>

      {/*
        Client testimonials.

        The section renders only once content/testimonials.ts holds an
        approved quote, and that array is deliberately empty — see the note at
        the top of that file. The old site publishes four testimonials plus a
        "4.9/5 from 1,500+ reviews" rating with no verifiable source, and this
        site has published a promise that it carries none of that. The
        component and the section are built and wired so that adding the first
        approved quote is the only step required.
      */}
      {testimonials.length > 0 ? (
        <Section spacing="lg" id="testimonials">
          <SectionHeader
            centred
            eyebrow="In their words"
            title="What clients say about working with us"
            lead="Published with the wording and attribution each client approved."
          />
          <div className={styles.testimonialWrap}>
            <TestimonialCarousel />
          </div>
        </Section>
      ) : null}

      {/*
        14 — the human layer.

        The old site names a founder and gives him a photograph; this one had
        reduced him to one sentence inside a company page. That was the single
        clearest trust signal the old site had that this one had lost. No
        portrait exists in the repository and none is invented, so the
        composition is typographic rather than a profile card with a hole in
        it.
      */}
      <Section spacing="lg" id="founder">
        <FounderNote image={narrative.founder} />
      </Section>

      {/* 12 — The questions that come before a first call */}
      <Section background="tint" spacing="lg" id="faq">
        <SectionHeader
          centred
          eyebrow="15 / Questions"
          title="Asked before every first call"
          lead="Procedural rather than technical: how this starts, how long it takes, what we will not promise, and who owns what we build."
        />
        <div className={styles.faqWrap}>
          <FAQBlock faqs={homeFaqs} />
          <div className={styles.sectionFooter}>
            <TextLink href="/company/faq/">All questions</TextLink>
          </div>
        </div>
      </Section>

      {/* 13 — Insights, image-led */}
      <Section spacing="lg" id="insights">
        <SectionHeader
          centred
          eyebrow="16 / Insights"
          title="What we have worked out, written down"
          lead="Nothing here is gated. If content is worth reading, putting a form in front of it just means fewer people read it."
        />
        <InsightGrid entries={insightEntries} />
        <div className={styles.sectionFooter}>
          <TextLink href="/resources/">All resources</TextLink>
        </div>
      </Section>

      {/* 14 — Closing CTA */}
      <ConversionBand
        title="Ready to build what comes next?"
        lead="Tell us what you are trying to solve, in your own words. If we are not the right people for it, we will say so and point you somewhere better."
        cta={{
          label: "Let's Talk",
          href: "/contact/",
          tier: "T4",
          note: "30 minutes. We reply within one business day.",
        }}
      />

      <Section spacing="sm" width="content">
        <BodyText size="sm" muted className={styles.closingNote}>
          Prefer to look around first?{" "}
          <Link href="/services/" className={styles.inlineLink}>
            Explore what we do
          </Link>{" "}
          or{" "}
          <Link href="/use-cases/" className={styles.inlineLink}>
            start from the problem you have
          </Link>
          .
        </BodyText>
      </Section>
    </>
  );
}
