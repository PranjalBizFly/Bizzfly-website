import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
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

const relatedLinks = [
  {
    label: "Our Engineering Standards",
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

      <EditorialHero
        eyebrow="Company"
        title="Vendor Information & Procurement"
        lead="Information for technology suppliers, software vendors, and professional partners working with BizzFly. Our procurement standards, compliance requirements, and payment processes."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Vendor" }]}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/* 01 — the principle the rest of the page follows from. */}
      <Section spacing="lg" width="content">
        <EditorialBlock
          eyebrow="01 / The standard"
          title="Suppliers are held to the standard we hold ourselves to"
          lead="BizzFly maintains high operational, technical, and transparency standards across our client engagements. We hold external suppliers, cloud infrastructure providers, and specialist contractors to the same standard."
        />
      </Section>

      {/* 02 — the three requirements, across the tinted band. */}
      <Section background="tint" spacing="lg" id="standards">
        <SectionHeader
          eyebrow="02 / What we evaluate"
          title="Three requirements, applied to every supplier"
          lead="We evaluate suppliers on technical competence, code quality, security posture, and data protection."
        />
        <ProcessBlock steps={standards} />
      </Section>

      {/* 03 — the operational detail, kept as prose because it is reference. */}
      <Section spacing="lg" width="content" id="invoicing">
        <SectionHeader
          eyebrow="03 / Invoicing and payment"
          title="What an invoice must carry"
          split
        />
        <ContentBlock>
          <p>
            All supplier invoices must include a valid Purchase Order (PO) reference, clear
            itemised deliverables, and official GST identification details where applicable under
            Indian law.
          </p>
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
          eyebrow="04 / Prospective vendors"
          title="If your tooling aligns with our engineering disciplines, tell us"
          lead="If you provide enterprise technology, cloud infrastructure, or specialised developer tooling that aligns with our engineering disciplines, please submit your capability overview to our procurement team."
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
