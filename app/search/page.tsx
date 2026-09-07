import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search BizzFly services, industries, use cases and resources.",
  alternates: { canonical: "/search/" },
  // Internal search results are not indexed — see docs/architecture/06.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Section spacing="md" width="content">
      <Eyebrow>Search</Eyebrow>
      <Heading level={1} size="h1">
        Search
      </Heading>
      <BodyText muted>
        Services, industries, use cases, technologies and resources.
      </BodyText>

      <Suspense fallback={<BodyText muted>Loading search…</BodyText>}>
        <SearchResults />
      </Suspense>
    </Section>
  );
}
