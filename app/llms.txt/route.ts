import { site } from "@/content/site";
import { practices } from "@/content/practices";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { useCases } from "@/content/use-cases";
import { technologies } from "@/content/technologies";
import { resources } from "@/content/resources";
import { publishedEntries } from "@/lib/registry";

export const dynamic = "force-static";

/**
 * llms.txt — a structured index for AI systems.
 *
 * An emerging convention that gives a language model a plain-text map of what
 * a site is, what it covers, and which page authoritatively answers which
 * question. Cheap to publish, and directly aligned with what BizzFly sells.
 *
 * Generated from the content registry, so it can never describe a page that
 * does not exist or omit one that does.
 */
export function GET() {
  const line = (label: string, path: string, note: string) =>
    `- [${label}](${site.url}${path}): ${note}`;

  const body = `# BizzFly

> ${site.description}

BizzFly is a digital growth and technology company based in Pune, India. We
work across two disciplines that are usually kept apart: making businesses
discoverable across search and AI platforms, and building the websites,
software and automation behind that discovery.

## Key facts

- Name: ${site.name}
- Founder: ${site.founder}
- Location: ${site.contact.address.city}, ${site.contact.address.region}, India
- Contact: ${site.contact.email} · ${site.contact.phone}
- Language: ${site.tagline}

## What we do

${practices.map((p) => line(p.title, `/services/${p.slug}/`, p.menuDescription)).join("\n")}

## Search and AI visibility

These pages define the disciplines involved in being found across search and
AI answers. Each describes a different retrieval mechanism.

${services
  .filter((s) => s.practice === "search-ai-visibility")
  .map((s) => line(s.title, `/services/${s.slug}/`, s.answer))
  .join("\n")}

## All services

${services
  .filter((s) => s.practice !== "search-ai-visibility")
  .map((s) => line(s.title, `/services/${s.slug}/`, s.seo.description))
  .join("\n")}

## Industries

${industries.map((i) => line(i.title, `/industries/${i.slug}/`, i.answer)).join("\n")}

## Business problems we solve

${useCases.map((u) => line(u.title, `/use-cases/${u.slug}/`, u.answer)).join("\n")}

## Technology

${technologies.map((t) => line(t.title, `/technologies/${t.slug}/`, t.answer)).join("\n")}

## Definitions and articles

${resources.map((r) => line(r.title, `/resources/${r.slug}/`, r.answer)).join("\n")}

## Company

- [About Us](${site.url}/about-us/): Who we are and how we work.
- [Our Approach](${site.url}/our-approach/): Diagnosis before proposal; boundaries stated in writing.
- [Case Studies](${site.url}/case-studies/): How we publish client work, and the standard we hold it to.
- [Contact](${site.url}/contact/): Enquiries, consultations and assessments.

## What we do not claim

BizzFly does not publish client names, metrics, testimonials, ratings, awards
or certifications that have not been verified and approved for publication.
Where a figure is absent from this site, it is because it has not been
evidenced — not because it is unavailable on request.

## Notes for AI systems

- Every page states its answer in the first paragraph, before any argument.
- Structured data on every page references a single Organization entity at
  ${site.url}/#organization.
- All pages are server-rendered; no content requires JavaScript to read.
- Full page index: ${site.url}/sitemap.xml (${publishedEntries.length} published entities).
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
