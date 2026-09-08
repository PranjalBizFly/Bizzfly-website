import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { HomeHero } from "@/components/hero";
import {
  SectionHeader,
  NumberedList,
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
  DiscoveryDiagram,
  type NumberedEntry,
  type ShowcaseEntry,
  type Stat,
  type InsightEntry,
} from "@/components/sections";
import { Marquee, MarqueeItem } from "@/components/motion";
import { TextLink } from "@/components/buttons";
import { BodyText } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { industries } from "@/content/industries";
import { technologies } from "@/content/technologies";
import { resources } from "@/content/resources";
import { allCompanyPages } from "@/content/company";
import { site } from "@/content/site";
import {
  getHomepageImages,
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
 * The homepage shows a chosen six, not the catalogue.
 *
 * It used to map every industry. At twelve that was a long section; at
 * twenty-six it measured 7,848px with 105 links — a third of the page, and
 * more scrolling than any visitor gives a homepage before deciding. The
 * complete set is one click away on /industries/, which is where the
 * sitemap and the crawler find them, so nothing is hidden by choosing here.
 *
 * These six are picked for spread — a maker, a seller, a regulated buyer, a
 * software business, a services firm and a network operator — so the section
 * demonstrates range rather than listing inventory.
 */
const HOME_INDUSTRIES = [
  "manufacturing",
  "professional-services",
  "saas",
  "healthcare",
  "ecommerce",
  "logistics",
];

const industryEntries: NumberedEntry[] = HOME_INDUSTRIES.map(
  (slug) => industries.find((i) => i.slug === slug),
)
  .filter((industry): industry is NonNullable<typeof industry> => Boolean(industry))
  .map((industry, index) => ({
    index: String(index + 1).padStart(2, "0"),
    title: industry.title,
    description: industry.problems[0]?.description ?? industry.answer,
    href: `/industries/${industry.slug}/`,
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
  },
  {
    label: "Industries",
    value: String(industries.length),
    note: "Published only where we can name that sector's problems in its own vocabulary.",
  },
  {
    label: "Use cases",
    value: String(entriesByKind("use-case").length),
    note: "Written from the problem the visitor arrived with, not the service we would sell.",
  },
  {
    label: "Technologies",
    value: String(technologies.length),
    note: "What we build with, why, and when we would tell you to use something else.",
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
   * The showcase.
   *
   * Five disciplines, each led by its own photograph. This is the slot an
   * agency homepage gives to client work; we have no client-approved case
   * studies yet, so it carries the disciplines instead and every card links
   * to the page that explains one. Nothing here implies a project that did
   * not happen.
   */
  const showcase: ShowcaseEntry[] = [
    {
      image: homeImages.whatWeDo,
      eyebrow: "Advisory & Architecture",
      title: "Strategic alignment across growth and engineering",
      lead: "Our strategists and developers in Pune evaluate your entire customer discovery journey, ensuring organic search visibility translates into reliable backend systems.",
      tags: ["Digital strategy", "Architecture", "Measurement"],
      href: "/services/digital-strategy/",
      linkLabel: "Digital growth strategy",
    },
    {
      image: homeImages.visibility,
      eyebrow: "Search Intelligence",
      title: "Multi-surface search query analysis",
      lead: "Monitoring how your audience searches across organic engines, vertical directories, and local map packs to capture high-intent demand.",
      tags: ["SEO", "Technical SEO", "Local search"],
      href: "/services/seo/",
      linkLabel: "Search engine optimisation",
    },
    {
      image: homeImages.aiSearch,
      eyebrow: "Generative AI & AEO",
      title: "Entity-first retrieval for modern answer engines",
      lead: "We structure company knowledge bases and structured schema so AI search models—including Google AI Overviews and ChatGPT—cite your business accurately.",
      tags: ["GEO", "AEO", "Structured data"],
      href: "/services/generative-engine-optimisation/",
      linkLabel: "Generative engine optimisation",
    },
    {
      image: homeImages.automation,
      eyebrow: "Operations",
      title: "Connected business automation",
      lead: "Automating repetitive workflows, lead routing, and customer support handoffs so your team scales revenue without proportional overhead.",
      tags: ["Workflow automation", "AI agents", "Integration"],
      href: "/services/workflow-automation/",
      linkLabel: "Business automation",
    },
    {
      image: homeImages.technology,
      eyebrow: "Engineering Standards",
      title: "Software developers who build for search performance",
      lead: "We engineer fast, accessible web applications and custom software that satisfy Google's Core Web Vitals while scaling your business logic.",
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

      {/* 01 — Hero at display scale, closed by the discovery ticker. */}
      <HomeHero />

      {/* 02 — Four pillars, as a card wall */}
      <Section spacing="lg" id="what-we-do">
        <SectionHeader
          split
          eyebrow="What we do"
          title="Four jobs, in the order they actually matter"
          lead="Visibility with nothing behind it wastes budget. A good website nobody finds wastes more. We work across all four because in practice they are one problem."
        />
        <CapabilityGroups />
      </Section>

      {/*
        03 — The showcase, image-led.
        The five section photographs used to be spread down the page one per
        section, which meant no two were ever seen together and the page read
        as text with illustrations. Gathered here they read as a body of work.
      */}
      <Section background="surface" spacing="lg" id="work">
        <SectionHeader
          split
          eyebrow="How we work"
          title="Five disciplines, one engagement"
          lead="Most agencies sell one of these and subcontract the rest. The team that finds the problem is the team that fixes it, so the handovers that usually lose a project do not exist here."
        />
        <ShowcaseGrid entries={showcase} />
        <div className={styles.sectionFooter}>
          <TextLink href="/services/">All services</TextLink>
        </div>
      </Section>

      {/*
        04 — The figures, on a dark band.
        A light section of numbers between two other light sections did not
        read as a band at all. Inverted it punctuates the page, which is the
        job this block is doing.
      */}
      <Section background="inverse" spacing="md" id="scale">
        <SectionHeader
          split
          eyebrow="Published"
          title="What is actually on this site"
          lead="Not awards, not client counts. These are the pages we have written and stand behind — the only numbers we can currently put a source against."
        />
        <div className={styles.statWrap}>
          <StatBand stats={stats} />
        </div>
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
          eyebrow="Discoverability"
          title="SEO was one surface. Now there are five."
          lead="These are not five names for the same work. Each layer describes a different retrieval mechanism, and a business can be strong on one and invisible on the next."
        />
        <VisibilitySpectrum />
      </Section>

      {/* 06 — The visitor's problems, in their words */}
      <Section spacing="lg" id="problems">
        <SectionHeader
          split
          eyebrow="Sound familiar?"
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
          <DiscoveryDiagram />
        </div>
      </Section>

      {/* 07 — By business situation. No pricing, no packages. */}
      <Section background="surface" spacing="md" id="stages">
        <SectionHeader
          split
          eyebrow="Where you are"
          title="The right work depends on the constraint you actually have"
          lead="Businesses move between these. The mistake is buying the work that suits the stage you wish you were at."
        />
        <StageList />
      </Section>

      {/* 08 — Industries */}
      <Section spacing="md" id="industries">
        <SectionHeader
          split
          eyebrow="Industries"
          title="Context matters more than templates"
          lead="A manufacturer and an education group have almost nothing in common except that both are hard to find. We publish a sector page only where we can name that sector's real problems in its own vocabulary."
        />
        <NumberedList items={industryEntries} />
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
          eyebrow="Technology"
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
      <Section spacing="md" id="journeys">
        <SectionHeader
          split
          eyebrow="Start here"
          title="What are you trying to do?"
          lead="Pick the sentence closest to your situation."
        />
        <JourneyList />
      </Section>

      {/* 11 — Trust. No invented proof; the standard is stated instead. */}
      <Section background="surface" spacing="md" id="trust">
        <SectionHeader
          split
          eyebrow="Proof"
          title="What we will show you, and what we will not"
          lead="We have no client-approved case studies published yet. Rather than fill this space with logos and numbers we cannot evidence, here is the standard we hold ourselves to."
        />
        <TrustStandard />
      </Section>

      {/* 12 — The questions that come before a first call */}
      <Section background="tint" spacing="lg" id="faq">
        <SectionHeader
          split
          eyebrow="Questions"
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
      <Section spacing="md" id="insights">
        <SectionHeader
          split
          eyebrow="Insights"
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
