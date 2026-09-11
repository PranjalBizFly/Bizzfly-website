import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SplitHero } from "@/components/hero";
import {
  ConversionBand,
  EditorialBlock,
  RelatedContent,
  SectionHeader,
  VisualStoryBlock,
} from "@/components/sections";
import { PinnedStory } from "@/components/motion";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { getCompanyImage } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "How We Work",
    description:
      "Our engagement process: diagnosis before proposal, boundaries stated in writing, and reporting against commercial measures rather than activity.",
    primaryTopic: "how BizzFly works",
    secondaryTopics: ["engagement process", "ways of working"],
    intent: "commercial",
  },
  "/how-we-work/",
  { kind: "company" },
);

const cta = {
  label: "Book a consultation",
  href: "/contact/",
  tier: "T4" as const,
  note: "Thirty minutes on the problem, not a pitch.",
};

/*
 * Three principles, each linking to the page that carries it in full.
 *
 * The page already made exactly these three commitments, one per paragraph.
 * Numbering them and giving each a destination turns a column of prose into
 * something a reader can scan and act on — and makes the page a hub for the
 * three it was already describing rather than a dead end. The descriptions
 * are the page's own sentences.
 */
const principles = [
  {
    index: "01",
    title: "Diagnosis before proposal",
    description:
      "We work in the other order. Diagnosis first, scoped proposal second. That means our first deliverable is usually a document telling you what is broken, including the parts we are not the right people to fix.",
    href: "/discovery-process/",
    linkLabel: "How discovery runs",
  },
  {
    index: "02",
    title: "Boundaries stated in writing",
    description:
      "Every proposal says what is out of scope as explicitly as what is in it. Naming the boundary early removes the most common source of disappointment in an engagement, and it is the fastest way to tell whether a supplier actually understands the work.",
    href: "/engagement-models/",
    linkLabel: "How engagements are scoped",
  },
  {
    index: "03",
    title: "Reporting against commercial measures",
    description:
      "We report against agreed commercial measures (enquiries, response times, hours removed) rather than against activity. A monthly report full of impressions and rankings that avoids the commercial question is a way of not being accountable.",
    href: "/our-approach/",
    linkLabel: "What we report against",
  },
];

/*
 * What the hero's aside carries.
 *
 * It used to be the three commitment titles, which the body then repeated in
 * full one screen below — the reader met the same three lines twice before
 * being told anything new. These are the engagement's shape instead, and each
 * is one of the page's own sentences: the two weeks of diagnosis, the
 * findings being yours either way, and discovery being scoped on its own.
 * Complementary to the commitments rather than a preview of them.
 */
const engagementFacts = [
  "Two weeks of diagnosis before any proposal",
  "The written findings are yours either way",
  "Discovery is scoped and priced on its own",
];

const relatedLinks = [
  { label: "About Us", href: "/about-us/", type: "COMPANY" as const },
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "Discovery Process", href: "/discovery-process/", type: "COMPANY" as const },
  {
    label: "Engineering Standards",
    href: "/technologies/engineering-standards/",
    type: "TECHNOLOGY" as const,
  },
  { label: "Contact", href: "/contact/", type: "CONTACT" as const },
];

export default function HowWeWorkPage() {
  const companyVisual = getCompanyImage("how-we-work");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How We Work",
          description:
            "Our engagement process: diagnosis before proposal, boundaries stated in writing, and reporting against commercial measures rather than activity.",
          url: `${site.url}/how-we-work/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      {/*
        The aside carries the engagement's shape — two weeks, findings yours
        either way, discovery scoped on its own — rather than the three
        commitment titles it used to preview. Those are the body's subject,
        and listing them here meant the reader met the same three lines twice
        within one screen before being told anything new. The photograph
        cannot open this one: it is the same frame the homepage gives its
        "why us" band, and no image on this site appears in two places.
      */}
      <SplitHero
        eyebrow="Company"
        title="How We Work"
        lead="Every engagement starts with diagnosis, not a proposal. We spend the first two weeks establishing what is actually wrong, because fixing the wrong constraint is the expensive mistake, and you keep those findings whether or not you continue with us."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
        asideHeading="What that means in practice"
        asideItems={engagementFacts}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/*
        01 — the failure mode first, on the dark ground. The page's argument
        only lands once the pattern it is refusing has been named, and stating
        it against the inverse surface gives the page somewhere to turn.
      */}
      <Section background="inverse" spacing="lg" width="content">
        <EditorialBlock
          eyebrow="The pattern we avoid"
          title="Most agency relationships fail in the same predictable way"
          lead="A proposal is written before anyone understands the problem, the work is delivered against that proposal, and six months later the commercial result has not moved because the original diagnosis was wrong."
        />
      </Section>

      {/*
        02 — the three commitments, read as a held sequence.

        These are stages in one argument: each commitment exists because of a
        specific way the previous one gets skipped, and the order is the
        point. A numbered list rendered all three at one weight, so the order
        was a typographic detail rather than something the reader travelled.

        Held rather than scroll-jacked. The rail carries the reader's position
        and doubles as a way to jump between the three by click or keyboard;
        the page's own scrollbar keeps meaning what it always meant. No
        visuals are passed — there are no three photographs that honestly
        illustrate three commitments, and this site does not invent imagery to
        fill a column, so the held column is the rail alone.
      */}
      <Section spacing="lg" id="principles">
        <SectionHeader
          eyebrow="What we do instead"
          title="Three commitments, in order"
          lead="Each one exists because of a specific way engagements go wrong, and each is written into the proposal rather than left as intent."
        />
        <PinnedStory
          label="Three commitments, in the order they apply"
          chapters={principles.map((principle) => ({
            id: `commitment-${principle.index}`,
            marker: principle.index,
            title: principle.title,
            body: [principle.description],
            link: { label: principle.linkLabel, href: principle.href },
          }))}
        />
      </Section>

      {/* 03 — the frame, so the page changes shape before it closes. */}
      {companyVisual ? (
        <Section background="surface" spacing="lg" width="content">
          {/*
            Split rather than the stacked card: variant D put a 1040px-wide
            frame above two lines of type, which spent a full screen on one
            sentence. Beside it, the same words and the same photograph read
            in half the height.
          */}
          <VisualStoryBlock
            image={companyVisual}
            variant="B"
            reverse
            eyebrow="In practice"
            title="You keep the findings either way"
            lead="Discovery is scoped and priced on its own, so continuing is a decision made with the diagnosis in hand rather than a commitment made before it."
            caption={companyVisual.caption}
          />
        </Section>
      ) : null}

      <Section spacing="sm" width="content">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      {/*
        The band argues this page's case rather than the site default. What a
        reader has just been shown is a method; what they cannot tell from a
        method is whether it applies to them, and that is the question the
        first thirty minutes actually answers.
      */}
      <ConversionBand
        title="Find out which constraint is actually binding"
        lead="The method above only helps once it is pointed at a real problem. Describe what is not working and we will tell you which of the four layers we would look at first — and whether it is work we should be doing at all."
        cta={cta}
      />
    </>
  );
}
