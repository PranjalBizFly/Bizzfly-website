import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  ContentBlock,
  ConversionBand,
  EditorialBlock,
  NumberedList,
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
      "Technical SEO, Answer Engine Optimisation (AEO), and Generative Engine Optimisation (GEO) — including how retrieval is shifting from ranked lists to generated answers.",
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

      <EditorialHero
        eyebrow="Company"
        title="Media & Press Enquiries"
        lead="Official media relations desk and company information for journalists, editors, and industry analysts covering search, AI visibility, software engineering, and automation in India."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Media" }]}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/* 01 — the beat, as a numbered set that also routes into the site. */}
      <Section spacing="lg" id="topics">
        <SectionHeader
          eyebrow="01 / What we comment on"
          title="Three subjects we give verified commentary on"
          lead="We provide verified commentary, technical perspectives on search and AI shifts, and factual case context from our Pune office."
        />
        <NumberedList items={topics} />
      </Section>

      {/* 02 — the desk itself, on the tinted band. */}
      <Section background="tint" spacing="lg" width="content" id="contact">
        <EditorialBlock
          eyebrow="02 / Media contact"
          title={`${site.founder} — Founder and official spokesperson`}
          lead="For interview requests, technical briefing queries, or background information, contact the media desk directly. All press enquiries are handled with priority and answered within one business day."
          actions={<CtaBlock cta={cta} />}
        />
        <ContentBlock>
          <p>
            Media desk:{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
        </ContentBlock>
      </Section>

      {/*
        03 — the proof standard, on the dark ground. This is the page's most
        distinctive statement and the one a journalist is actually assessing,
        so it gets the surface that stops the scroll rather than a paragraph
        near the bottom of a text column.
      */}
      <Section background="inverse" spacing="lg" width="content" id="proof">
        <EditorialBlock
          eyebrow="03 / Proof standard"
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

      <ConversionBand cta={cta} />
    </>
  );
}
