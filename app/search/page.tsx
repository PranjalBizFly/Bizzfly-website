import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { SearchResults } from "@/components/search/SearchResults";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { totalPageCount } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search and page directory",
  description:
    "Search BizzFly services, industries, use cases, technologies and resources, or browse the complete directory of every published page.",
  alternates: { canonical: "/search/" },
  // Internal search results are not indexed — see docs/architecture/06.
  robots: { index: false, follow: true },
};

/**
 * Search, and the directory the search dialog's "Explore all pages" opens.
 *
 * One route rather than two: with a query this is the full result set, and
 * without one it is every published page grouped by section. Both are read
 * from the same content registry, so neither can fall behind the site.
 */
export default function SearchPage() {
  return (
    <Section spacing="md" width="default">
      {/* The one inner page that carried no trail. Label matches the route. */}
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <Eyebrow>Search</Eyebrow>
      <Heading level={1} size="h1">
        Find anything on this site
      </Heading>
      <BodyText size="lg" muted>
        {totalPageCount} published pages — services, industries, use cases,
        technologies, resources and company. Search below, or scan the complete
        directory further down.
      </BodyText>

      <Suspense fallback={<BodyText muted>Loading search…</BodyText>}>
        <SearchResults />
      </Suspense>
    </Section>
  );
}
