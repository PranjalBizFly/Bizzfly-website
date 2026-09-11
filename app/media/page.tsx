import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SplitHero } from "@/components/hero";
import {
  ChoiceList,
  ContentBlock,
  NumberedList,
  ConversionBand,
  EditorialBlock,

  RelatedContent,
  SectionHeader,
} from "@/components/sections";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "Media",
    description:
      "Official media enquiries desk for BizzFly. Verified facts, press contacts, and background on search visibility, AI discovery, and engineering in Pune, India.",
    primaryTopic: "BizzFly media enquiries",
    secondaryTopics: ["press contact", "spokesperson", "company facts"],
    intent: "navigational",
  },
  "/media/",
  { kind: "company" },
);

const cta = {
  label: "Contact media desk",
  href: `mailto:${site.contact.email}`,
  tier: "T2" as const,
  note: "Response within one business day.",
};

/*
 * The subjects BizzFly gives comment on, each pointing at the practice that
 * actually does the work.
 *
 * The page listed these in one sentence. Numbered and linked they do two
 * jobs at once: a journalist can see the beat quickly, and each entry is a
 * route to the page that substantiates it rather than a claim on its own.
 */
const topics = [
  {
    index: "01",
    title: "Search and AI visibility",
    description:
      "Technical SEO, Answer Engine Optimisation (AEO), and Generative Engine Optimisation (GEO), including how retrieval is shifting from ranked lists to generated answers.",
    href: "/services/search-ai-visibility/",
  },
  {
    index: "02",
    title: "Custom software development",
    description:
      "Web applications, systems integration, and the engineering decisions behind them.",
    href: "/services/software-development/",
  },
  {
    index: "03",
    title: "Business process automation",
    description:
      "Where automation genuinely removes operational load, and where it makes an undefined process faster rather than better.",
    href: "/services/ai-automation/",
  },
];

/*
 * What the hero's aside carries.
 *
 * It used to name the three subjects we comment on, which section 01 then
 * lists again with descriptions and links — a journalist read the same three
 * headings twice before reaching anything usable. These are the desk's
 * operating facts instead: who speaks, how fast, and what we will not do.
 * Each is one of the page's own sentences, and none of them is a topic.
 */
const deskFacts = [
  "Founder is the official spokesperson",
  "Enquiries answered within one business day",
  "No unverified statistics, ever",
];

const relatedLinks = [
  { label: "Press Kit", href: "/press-kit/", type: "COMPANY" as const },
  { label: "About Us", href: "/about-us/", type: "COMPANY" as const },
  { label: "Case Studies", href: "/case-studies/", type: "SECTION" as const },
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
];

export default function MediaPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Media",
          description:
            "Official media enquiries desk for BizzFly. Verified facts, press contacts, and background on search visibility, AI discovery, and engineering in Pune, India.",
          url: `${site.url}/media/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      <SplitHero
        eyebrow="Company"
        title="Media & Press Enquiries"
        lead="Official media relations desk and company information for journalists, editors, and industry analysts covering search, AI visibility, software engineering, and automation in India."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Media" }]}
        asideHeading="How the desk operates"
        asideItems={deskFacts}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/* 01 — the beat, as a numbered set that also routes into the site. */}
      <Section spacing="lg" id="topics">
        <SectionHeader
          eyebrow="What we comment on"
          title="Three subjects, verified commentary"
          lead="We provide verified commentary, technical perspectives on search and AI shifts, and factual case context from our Pune office."
        />
        <NumberedList items={topics} />
      </Section>

      {/* 02 — the desk itself, on the tinted band. */}
      <Section background="tint" spacing="lg" id="contact">
        <EditorialBlock
          eyebrow="Media contact"
          title={`${site.founder}, Founder and official spokesperson`}
          lead="For interview requests, technical briefing queries, or background information, contact the media desk directly. All press enquiries are handled with priority and answered within one business day."
          actions={<CtaBlock cta={cta} />}
        />
        {/*
          The desk itself, as a sheet rather than a trailing sentence.

          A journalist arrives at this page for three facts — who speaks, where
          to write, and how long they will wait — and all three were prose: the
          address was the last line of the section, set as a paragraph after
          the statement and the CTA. Set as a sheet they are countable at a
          glance and the address is the one entry that is also an action.
          Nothing is added here that the section did not already state.
        */}
        <div className="mt-10">
          <ChoiceList
            label="Media desk"
            choices={[
              {
                name: site.contact.email,
                href: `mailto:${site.contact.email}`,
                rationale:
                  "Interview requests, technical briefing queries, and background.",
              },
              {
                name: site.founder,
                rationale: "Founder, and the official spokesperson on the record.",
              },
              {
                name: "One business day",
                rationale:
                  "Every press enquiry is handled with priority and answered within it.",
              },
            ]}
          />
        </div>
      </Section>

      {/*
        03 — the proof standard, on the dark ground. This is the page's most
        distinctive statement and the one a journalist is actually assessing,
        so it gets the surface that stops the scroll rather than a paragraph
        near the bottom of a text column.
      */}
      <Section background="inverse" spacing="lg" id="proof">
        <EditorialBlock
          eyebrow="Proof standard"
          title="We do not invent client numbers, awards, or unverified statistics"
          lead="BizzFly operates with a strict verification policy. All case studies published on this site reflect verified metrics approved in writing by our clients."
        />
      </Section>

      <Section background="surface" spacing="md" width="content">
        <ContentBlock>
          <p>
            For official brand boilerplates, logo assets, and usage rules, see the{" "}
            <Link href="/press-kit/">Press Kit</Link>.
          </p>
        </ContentBlock>
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      {/*
        A journalist on deadline, not a buyer. The site-wide band asks them
        what they are trying to solve, which is the wrong question; this one
        offers the thing the page exists to provide.
      */}
      <ConversionBand
        title="On deadline and need this confirmed?"
        lead="The media desk answers within one business day, and faster if the deadline is shorter than that. Ask for the figure, the background or the quote — we will confirm in writing what we can and say plainly what we cannot."
        cta={cta}
      />
    </>
  );
}
