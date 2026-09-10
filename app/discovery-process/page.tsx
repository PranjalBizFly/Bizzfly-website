import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  ConversionBand,
  EditorialBlock,
  ProcessBlock,
  RelatedContent,
  SectionHeader,
  VisualStoryBlock,
} from "@/components/sections";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { getCompanyImage } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "Discovery Process",
    description:
      "Two weeks to establish which constraint is actually binding, four layers examined in order, and a written diagnosis you keep either way.",
    primaryTopic: "discovery process",
    secondaryTopics: ["diagnosis", "engagement process"],
    intent: "commercial",
  },
  "/discovery-process/",
  { kind: "company" },
);

const cta = {
  label: "Start with a diagnostic",
  href: "/contact/",
  tier: "T3" as const,
  note: "Thirty minutes on the problem, not a pitch.",
};

/*
 * The four layers, in the order discovery examines them.
 *
 * This is the page's own sentence — "whether you can be found, whether what
 * people find is credible, whether it converts, and whether the operation
 * behind it can absorb more demand" — given the structure it was already
 * describing. The wording of each clause is unchanged; only its presentation
 * is, because a numbered sequence is what makes "the order matters" legible
 * at a glance rather than a claim buried mid-paragraph.
 */
const layers = [
  {
    index: 1,
    title: "Found",
    description: "Whether you can be found at all — in ranked results, and in the answers AI systems generate.",
    duration: "Layer one",
  },
  {
    index: 2,
    title: "Credible",
    description: "Whether what people find is credible once they reach it.",
    duration: "Layer two",
  },
  {
    index: 3,
    title: "Converts",
    description: "Whether that credibility turns into an enquiry rather than a visit that ends.",
    duration: "Layer three",
  },
  {
    index: 4,
    title: "Capacity",
    description: "Whether the operation behind it can absorb more demand once the first three are working.",
    duration: "Layer four",
  },
];

const relatedLinks = [
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "How We Work", href: "/how-we-work/", type: "COMPANY" as const },
  { label: "Engagement Models", href: "/engagement-models/", type: "COMPANY" as const },
  {
    label: "Digital Growth Audit Checklist",
    href: "/resources/digital-growth-audit-checklist/",
    type: "CHECKLIST" as const,
  },
];

export default function DiscoveryProcessPage() {
  const companyVisual = getCompanyImage("discovery-process");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Discovery Process",
          description:
            "Two weeks to establish which constraint is actually binding, four layers examined in order, and a written diagnosis you keep either way.",
          url: `${site.url}/discovery-process/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Methodology"
        title="Discovery Process"
        lead="Discovery establishes which constraint is actually binding before anything is proposed. It runs for roughly two weeks, produces a written diagnosis, and the findings are yours whether or not the engagement continues."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Discovery Process" }]}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/* 01 — the argument, set as one editorial statement rather than a column of prose. */}
      <Section spacing="lg" width="content">
        <EditorialBlock
          eyebrow="01 / Why it exists"
          title="The purpose of discovery is to be able to say what is wrong with confidence"
          lead="That sounds obvious, and it is the step most commonly skipped: proposals are frequently written from a briefing call, which means the plan reflects what the client already believed rather than what the evidence shows."
        />
      </Section>

      {/* 02 — the sequence itself, on a tinted band so it reads as the centre of the page. */}
      <Section background="tint" spacing="lg" id="layers">
        <SectionHeader
          eyebrow="02 / What we examine"
          title="Four layers, in order"
          lead="The order matters, because a constraint at an earlier layer makes work at a later one worthless."
        />
        <ProcessBlock steps={layers} />
      </Section>

      {/* 03 — the deliverable, set against the frame so the page changes shape here. */}
      <Section spacing="lg" width="content">
        {companyVisual ? (
          <VisualStoryBlock
            image={companyVisual}
            variant="B"
            eyebrow="03 / What you get"
            title="A written diagnosis"
            lead="What the binding constraint appears to be, what evidence supports that, what we would do about it, and what we would not do. It includes the things we think are fine, which is usually the part clients find most useful."
            caption={companyVisual.caption}
          />
        ) : (
          <EditorialBlock
            eyebrow="03 / What you get"
            title="A written diagnosis"
            lead="What the binding constraint appears to be, what evidence supports that, what we would do about it, and what we would not do. It includes the things we think are fine, which is usually the part clients find most useful."
          />
        )}
      </Section>

      {/* 04 — the commercial boundary, closing the argument the hero opened. */}
      <Section background="surface" spacing="lg" width="content">
        <EditorialBlock
          eyebrow="04 / How it is scoped"
          title="Discovery is deliberately separable"
          lead="It is scoped and priced on its own so that continuing is a decision made with the findings in hand rather than a commitment made before them. If the conclusion is that you do not need us, that is a legitimate result and we will say so."
          actions={<CtaBlock cta={cta} />}
        />
      </Section>

      <Section spacing="md" width="content">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      <ConversionBand cta={cta} />
    </>
  );
}
