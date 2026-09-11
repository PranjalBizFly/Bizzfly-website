import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SplitHero } from "@/components/hero";
import {
  NumberedList,
  SectionHeader,
  ConversionBand,
  EmptyState,
  RelatedContent,
  VisualStoryBlock,
} from "@/components/sections";
import { Button, TextLink, CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { getCompanyImage } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import styles from "./careers.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Careers",
    description:
      "Work at BizzFly: search and AI visibility, engineering and automation delivery, from our Pune office.",
    primaryTopic: "careers at BizzFly",
    secondaryTopics: ["jobs", "hiring", "work with us"],
    intent: "navigational",
  },
  "/careers/",
  { kind: "company" },
);

const cta = {
  label: "Introduce yourself",
  href: "/contact/",
  tier: "T2" as const,
  note: "Tell us what you want to work on.",
};

/*
 * What the hero's aside carries.
 *
 * It used to name the four disciplines, which section 02 then lists again
 * with descriptions and links — a candidate read the same four words twice
 * before learning anything about any of them. These are the facts a
 * candidate weighs that the discipline list cannot tell them: where the job
 * is, how the work moves, and the honest state of hiring. Each is one of the
 * page's own sentences.
 */
const candidateFacts = [
  "Based in Pune, Maharashtra",
  "The same person moves between disciplines",
  "No open roles — we still read every introduction",
];

const relatedLinks = [
  { label: "About Us", href: "/about-us/", type: "COMPANY" as const },
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "How We Work", href: "/how-we-work/", type: "COMPANY" as const },
  { label: "Contact", href: "/contact/", type: "CONTACT" as const },
];

/*
 * The four disciplines the team is built from, each pointing at the practice
 * that owns the work. The page already named these four; linking them lets a
 * candidate read what the discipline actually covers on this site rather
 * than infer it from a job title.
 */
const disciplines = [
  {
    index: "01",
    title: "Engineers",
    description:
      "Web and software engineering: corporate platforms, web applications, and the systems behind them.",
    href: "/services/software-development/",
  },
  {
    index: "02",
    title: "Technical SEO analysts",
    description:
      "Search and AI visibility: crawl health, indexation, structured data, and answer-engine presence.",
    href: "/services/search-ai-visibility/",
  },
  {
    index: "03",
    title: "Automation builders",
    description:
      "AI and automation: workflow automation, systems integration, and document processing.",
    href: "/services/ai-automation/",
  },
  {
    index: "04",
    title: "Digital strategists",
    description:
      "Strategy and analytics: diagnosis, measurement, and the commercial case behind the work.",
    href: "/services/data-analytics/",
  },
];

export default function CareersPage() {
  const companyVisual = getCompanyImage("careers");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Careers",
          description:
            "Work at BizzFly: search and AI visibility, engineering and automation delivery, from our Pune office.",
          url: `${site.url}/careers/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      {/*
        The aside answers what a candidate weighs before the disciplines
        matter: where the job is, that the work moves between lanes, and that
        nothing is open right now. Naming the four disciplines here instead
        meant repeating section 02's headings one screen ahead of section 02.
      */}
      <SplitHero
        eyebrow="Company"
        title="Careers at BizzFly"
        lead="We hire people who want work that needs judgement rather than volume. The team spans search and AI visibility, web and software engineering, and automation delivery, and the work moves between them."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        asideHeading="What to know first"
        asideItems={candidateFacts}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/* 01 — what the work is actually like, set against the frame. */}
      {companyVisual ? (
        <Section spacing="lg" width="content">
          <VisualStoryBlock
            image={companyVisual}
            variant="C"
            eyebrow="The work"
            title="Varied by necessity"
            lead="We are a team based in Pune, Maharashtra. The same person may audit a crawl problem one week and scope an automation the next. That suits people who like breadth and dislike being handed a narrow lane."
            caption={companyVisual.caption}
          />
        </Section>
      ) : null}

      {/*
        02 — the disciplines, each linking to the practice that owns it, so a
        candidate can read what the work actually involves rather than take a
        job title on trust.
      */}
      <Section background="tint" spacing="lg" id="disciplines">
        <SectionHeader
          eyebrow="Who we look for"
          title="Four disciplines, work moves between them"
          lead="People who care about commercial reality rather than activity reports. Each links to the practice that owns the work."
        />
        <NumberedList items={disciplines} />
      </Section>

      {/* 03 — the honest state of hiring. No invented openings. */}
      <Section spacing="lg" id="openings">
        <EmptyState
          title="No current openings"
          body="We are not hiring for a specific role at the moment. We would still rather hear from someone good than miss them because the timing did not line up. Tell us what you want to work on and we will keep it on file."
          actions={
            <div className={styles.actions}>
              <Button href="/contact/" withArrow>
                Introduce yourself
              </Button>
              <TextLink href="/our-approach/">Our Approach</TextLink>
            </div>
          }
        />
      </Section>

      <Section background="surface" spacing="sm">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      {/*
        A candidate is not a client, and the site-wide band asks them what
        they are trying to solve — the wrong question entirely. This one asks
        for the thing the page has just said it wants: an introduction with
        no role attached to it.
      */}
      <ConversionBand
        title="Nothing open today, which is not the same as no."
        lead="Tell us what you want to work on and what you are good at. We keep introductions on file and go back to them first when something does open — which is how most of this team arrived."
        cta={cta}
      />
    </>
  );
}
