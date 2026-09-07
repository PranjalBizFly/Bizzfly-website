import type { Metadata } from "next";
import type { Faq, SeoData } from "@/types/content";
import type { RegistryKind } from "@/lib/registry";
import { site, locale } from "@/content/site";

/**
 * Centralised metadata generation.
 *
 * Titles, descriptions, canonicals and social metadata all derive from the
 * content model, so there is one place to change a pattern and no page can
 * ship with a generic or duplicated title.
 */

/**
 * Title patterns per content kind.
 * Applied only when a page has not set an explicit title, so an entity can
 * always override the pattern where the natural phrasing is better.
 */
const TITLE_PATTERN: Partial<Record<RegistryKind, (title: string) => string>> = {
  service: (t) => t,
  practice: (t) => t,
  industry: (t) => `Digital Growth & Technology for ${t}`,
  "use-case": (t) => t,
  technology: (t) => `${t} — Technology at BizzFly`,
  "case-study": (t) => t,
  resource: (t) => t,
  company: (t) => t,
  conversion: (t) => t,
};

export interface MetadataOptions {
  /** Drives the title pattern. Omit for pages that set their own title. */
  kind?: RegistryKind;
  /** Absolute or relative OG image. Falls back to the generated default. */
  image?: string;
  /** ISO dates, emitted as article metadata where present. */
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata(
  seo: SeoData,
  path: string,
  options: MetadataOptions = {},
): Metadata {
  const { kind, image, publishedTime, modifiedTime } = options;

  const pattern = kind ? TITLE_PATTERN[kind] : undefined;
  const title = pattern ? pattern(seo.title) : seo.title;

  /* One OG image per page, generated from the page title — never a stock asset. */
  const ogImage =
    image ?? `/og/?title=${encodeURIComponent(title)}&kind=${kind ?? "page"}`;

  const url = `${site.url}${path}`;

  return {
    title,
    description: seo.description,
    alternates: { canonical: path },
    robots: seo.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: publishedTime ? "article" : "website",
      locale: locale.replace("-", "_"),
      url,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description: seo.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description: seo.description,
      images: [ogImage],
    },
  };
}

/* ==========================================================================
   Structured data helpers
   ========================================================================== */

/**
 * FAQPage schema — emitted only when the page genuinely renders these
 * questions, so schema always matches visible content.
 */
export function faqSchema(faqs: Faq[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Service schema, anchored to the single Organization entity. */
export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "IN",
  };
}

/**
 * WebPage schema with an explicit entity link.
 *
 * `about` pointing at the Organization @id is what turns a set of pages into
 * one machine-readable entity graph — the foundation of AI-search visibility.
 */
export function webPageSchema({
  name,
  description,
  path,
  primaryTopic,
}: {
  name: string;
  description: string;
  path: string;
  primaryTopic?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}${path}#webpage`,
    url: `${site.url}${path}`,
    name,
    description,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    inLanguage: locale,
    ...(primaryTopic ? { keywords: primaryTopic } : {}),
  };
}
