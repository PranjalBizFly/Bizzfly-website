import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CinematicHero } from "@/components/hero";
import {
  ChoiceList,
  ContentBlock,
  ConversionBand,
  EditorialBlock,
  ProcessBlock,
  RelatedContent,
  SectionHeader,
} from "@/components/sections";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { getVendorImage } from "@/content/images/imageAssignments";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "Vendor",
    description:
      "Procurement standards, supplier expectations, and invoicing requirements for technology vendors and specialist contractors working with BizzFly.",
    primaryTopic: "BizzFly vendor information",
    secondaryTopics: ["procurement", "supplier standards", "invoicing"],
    intent: "navigational",
  },
  "/vendor/",
  { kind: "company" },
);

const cta = {
  label: "Contact procurement",
  href: `mailto:${site.contact.email}`,
  tier: "T2" as const,
  note: "Vendor enquiries and onboarding.",
};

/*
 * The three supplier requirements, numbered.
 *
 * The page already listed exactly these three, each with a bolded name and a
 * sentence. As a bulleted list inside a text column they read as fine print;
 * numbered across the band they read as a standard, which is what they are.
 * The wording is unchanged.
 */
const standards = [
  {
    index: 1,
    title: "Data privacy and security",
    description:
      "Compliance with applicable Indian IT regulations and strict confidentiality of client data.",
  },
  {
    index: 2,
    title: "Accessible and clean delivery",
    description:
      "Adherence to semantic standards, WCAG AA accessibility guidelines, and documented APIs.",
  },
  {
    index: 3,
    title: "No black-hat techniques",
    description:
      "Zero tolerance for scraped content, private blog networks (PBNs), automated link schemes, or deceptive SEO tactics.",
  },
];

/*
 * What the hero's aside carries.
 *
 * It used to list the three supplier requirements, which section 02 then
 * sets out in full — a supplier read the same three headings twice before
 * reaching anything actionable. These are how the relationship actually
 * runs instead, and each is one of the page's own sentences: the way in,
 * the payment basis, and where invoices go. The requirements keep their
 * section; this is the other half of what a vendor arrives wanting.
 */
const engagementFacts = [
  "Submit a capability overview to procurement",
  "Invoices processed against contracted milestones",
  "Procurement enquiries answered directly",
];

const relatedLinks = [
  {
    label: "Engineering Standards",
    href: "/technologies/engineering-standards/",
    type: "TECHNOLOGY" as const,
  },
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "Contact", href: "/contact/", type: "CONTACT" as const },
];

export default function VendorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Vendor",
          description:
            "Procurement standards, supplier expectations, and invoicing requirements for technology vendors and specialist contractors working with BizzFly.",
          url: `${site.url}/vendor/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      <CinematicHero
        image={getVendorImage()}
        composition="bleed-right"
        eyebrow="Company"
        title="Vendor Information & Procurement"
        lead="Information for technology suppliers, software vendors, and professional partners working with BizzFly. Our procurement standards, compliance requirements, and payment processes."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Vendor" }]}
        factsHeading="How the relationship runs"
        facts={engagementFacts.map((fact) => ({ value: "✓", label: fact }))}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/* 01 — the principle the rest of the page follows from. */}
      <Section spacing="lg" width="content">
        <EditorialBlock
          eyebrow="The standard"
          title="Suppliers are held to the standard we hold ourselves to"
          lead="BizzFly maintains high operational, technical, and transparency standards across our client engagements. We hold external suppliers, cloud infrastructure providers, and specialist contractors to the same standard."
        />
      </Section>

      {/* 02 — the three requirements, across the tinted band. */}
      <Section background="tint" spacing="lg" id="standards">
        <SectionHeader
          eyebrow="What we evaluate"
          title="Three requirements, every supplier"
          lead="We evaluate suppliers on technical competence, code quality, security posture, and data protection."
        />
        <ProcessBlock steps={standards} />
      </Section>

      {/*
        03 — the operational detail.

        This was one sentence naming three separate invoice requirements, set
        as prose in a content-width column: a supplier checking whether their
        invoice would be accepted had to parse a comma list to find out, and
        the section left the right half of the page empty doing it. The three
        requirements are unchanged in wording — they are now set AS three
        requirements, which is what a reader came here to count. The
        submission route keeps its own line beneath, because it is an
        instruction rather than a requirement.
      */}
      <Section spacing="lg" id="invoicing">
        <SectionHeader
          split
          eyebrow="Invoicing and payment"
          title="What an invoice must carry"
          lead="Three details decide whether an invoice can be processed on its first pass. Missing any one of them sends it back."
        />
        <ChoiceList
          label="Invoice requirements"
          choices={[
            {
              name: "A valid Purchase Order reference",
              rationale:
                "The PO number issued for the engagement, quoted on the invoice itself.",
            },
            {
              name: "Clear itemised deliverables",
              rationale:
                "What was delivered, line by line, against the contracted milestones.",
            },
            {
              name: "GST identification details",
              rationale:
                "Official GST identification, where applicable under Indian law.",
            },
          ]}
        />
        <ContentBlock className="mt-10">
          <p>
            Invoices should be submitted directly to{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> for timely review
            and processing according to contracted payment milestones.
          </p>
        </ContentBlock>
      </Section>

      {/* 04 — the way in, on its own ground so it closes the page. */}
      <Section background="inverse" spacing="lg" width="content" id="prospective">
        <EditorialBlock
          eyebrow="Prospective vendors"
          title="If your tooling aligns with our engineering disciplines, tell us"
          lead="If you provide enterprise technology, cloud infrastructure, or specialised developer tooling that aligns with our engineering disciplines, please submit your capability overview to our procurement team."
          actions={<CtaBlock cta={cta} />}
        />
      </Section>

      <Section background="surface" spacing="sm" width="content">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      {/*
        A supplier reading this page is not a prospective client, and the
        site-wide band ("tell us what you are trying to solve") asks them the
        wrong question entirely. This one asks the question procurement
        actually needs answered.
      */}
      <ConversionBand
        title="Think your tooling fits how we build?"
        lead="Send a capability overview rather than a brochure: what the product does, where it fits in a delivery stack, and which of the three requirements above you already meet. We read every one and reply either way."
        cta={cta}
      />
    </>
  );
}
