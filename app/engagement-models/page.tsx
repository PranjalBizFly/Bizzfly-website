import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SplitHero } from "@/components/hero";
import {
  ConversionBand,
  EditorialBlock,
  LayerTabs,
  RelatedContent,
  SectionHeader,
  type LayerTabItem,
} from "@/components/sections";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "Engagement Models",
    description:
      "A fixed-scope diagnostic, a defined project, or an ongoing programme. Which fits depends on how well the problem is understood.",
    primaryTopic: "engagement models",
    secondaryTopics: ["diagnostic", "project", "programme"],
    intent: "commercial",
  },
  "/engagement-models/",
  { kind: "company" },
);

const cta = {
  label: "Talk through which fits",
  href: "/contact/",
  tier: "T3" as const,
  note: "Thirty minutes on the problem, not a pitch.",
};

/*
 * The three shapes, as a comparison rather than three paragraphs.
 *
 * The page's argument is that these are alternatives chosen against how well
 * the problem is understood — which is a comparison, and was previously set
 * as prose a reader had to hold in their head to compare. The rail puts them
 * side by side. Every word of each description is the page's own; the two
 * fact rows are the "suits" and "risk" clauses each paragraph already made,
 * lifted so the same attribute can be read across all three.
 */
const models: LayerTabItem[] = [
  {
    code: "Diagnostic",
    surface: "Fixed scope",
    name: "A fixed-scope diagnostic",
    question: "When the constraint is unclear",
    description:
      "A diagnostic is fixed in scope, price and duration. It is deliberately separable so that continuing is a decision made with findings in hand. You keep the written diagnosis whether or not anything follows.",
    facts: [
      { label: "Suits", value: "Situations where the constraint is genuinely unclear." },
      { label: "Ends with", value: "A written diagnosis you keep either way." },
    ],
    href: "/discovery-process/",
    linkLabel: "Discovery Process",
  },
  {
    code: "Project",
    surface: "Defined outcome",
    name: "A defined project",
    question: "When the shape of the work is known",
    description:
      "A project has a defined outcome and an end. It suits work whose shape is known — a site rebuilt, an integration delivered, a process automated. We prefer projects to be scoped narrowly enough to finish.",
    facts: [
      { label: "Suits", value: "Work whose shape is already known." },
      {
        label: "The risk",
        value:
          "A project that runs for a year has usually become a programme without anyone deciding it should.",
      },
    ],
    href: "/services/",
    linkLabel: "Services",
  },
  {
    code: "Programme",
    surface: "Monthly scope",
    name: "An ongoing programme",
    description:
      "A programme is ongoing work with a scope agreed each month against a stated priority. It suits compounding work such as search visibility, where the useful unit is a quarter rather than a deliverable.",
    question: "When the work compounds",
    facts: [
      { label: "Suits", value: "Compounding work measured in quarters, not deliverables." },
      {
        label: "The risk",
        value: "Drift — so each month names what it is trying to move.",
      },
    ],
    href: "/how-we-work/",
    linkLabel: "How We Work",
  },
];

const relatedLinks = [
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "How We Work", href: "/how-we-work/", type: "COMPANY" as const },
  { label: "Discovery Process", href: "/discovery-process/", type: "COMPANY" as const },
  {
    label: "How to Choose a Digital Growth Partner",
    href: "/resources/how-to-choose-a-digital-growth-partner/",
    type: "DECISION" as const,
  },
];

export default function EngagementModelsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Engagement Models",
          description:
            "A fixed-scope diagnostic, a defined project, or an ongoing programme. Which fits depends on how well the problem is understood.",
          url: `${site.url}/engagement-models/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      {/*
        The three shapes are named in the hero, because the page exists to be
        chosen from and a reader should not have to scroll to learn what the
        options are called.
      */}
      <SplitHero
        eyebrow="Methodology"
        title="Engagement Models"
        lead="We work in three shapes: a fixed-scope diagnostic, a defined project with a stated outcome, and an ongoing programme with a monthly scope. Which fits depends on how well the problem is understood, not on budget."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Engagement Models" }]}
        asideHeading="The three shapes"
        asideItems={models.map((model) => model.name)}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/*
        01 — the comparison, on the tinted band. This is the page: three
        alternatives that a reader is here to choose between, so they are set
        against each other rather than one after another.
      */}
      <Section background="tint" spacing="lg" id="models">
        <SectionHeader
          eyebrow="01 / The three shapes"
          title="Which fits depends on how well the problem is understood"
          lead="Not on budget. Move between the three to compare what each suits and where each goes wrong."
        />
        <LayerTabs label="Engagement models" items={models} />
      </Section>

      {/* 02 — the anti-pattern, stated plainly on its own ground. */}
      <Section background="inverse" spacing="lg" width="content">
        <EditorialBlock
          eyebrow="02 / What we avoid"
          title="The open-ended retainer with a deliverable list and no stated outcome"
          lead="It is comfortable for both parties, and it is the arrangement most likely to run for a year without anyone being able to say whether it worked."
        />
      </Section>

      {/* 03 — the way in. */}
      <Section spacing="lg" width="content">
        <EditorialBlock
          eyebrow="03 / Where to start"
          title="When the constraint is unclear, start with the diagnostic"
          lead="It is scoped and priced on its own, so continuing is a decision made with the findings in hand rather than a commitment made before them."
          actions={<CtaBlock cta={cta} />}
        />
      </Section>

      <Section background="surface" spacing="md" width="content">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      <ConversionBand cta={cta} />
    </>
  );
}
