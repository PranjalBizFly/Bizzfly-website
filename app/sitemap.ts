import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { indexableEntries, sectionPages } from "@/lib/registry";

/**
 * Generated from the content registry, so a page cannot appear in the sitemap
 * without existing as a published entity — and a draft or noindex entity
 * cannot leak in.
 *
 * Deliberately excluded: /search/ (query URLs), legal pages (noindex), draft
 * and review content, and any case study not yet approved for publication.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const priorityByKind: Record<string, number> = {
    practice: 0.8,
    service: 0.8,
    industry: 0.8,
    "use-case": 0.8,
    "case-study": 0.7,
    technology: 0.6,
    resource: 0.6,
    company: 0.5,
    conversion: 0.9,
  };

  return [
    ...sectionPages.map((page) => ({
      url: url(page.href),
      lastModified: now,
      changeFrequency: (page.href === "/" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: page.priority,
    })),
    ...indexableEntries
      /* Section landing pages are listed above; do not duplicate them. */
      .filter((entry) => !sectionPages.some((page) => page.href === entry.href))
      .map((entry) => ({
        url: url(entry.href),
        lastModified: entry.updated ? new Date(entry.updated) : now,
        changeFrequency: "monthly" as const,
        priority: priorityByKind[entry.kind] ?? 0.5,
      })),
  ];
}
