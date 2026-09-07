/**
 * Cross-linking engine.
 *
 * Relationships live in the content data, never hardcoded in page components.
 * This module resolves them in both directions, so declaring an industry's
 * services also makes that industry appear on each of those service pages —
 * without anyone having to remember to write the reverse link.
 *
 * Every resolved link is checked against the entity that actually exists, so a
 * stale slug produces no link rather than a 404.
 */

import type { RelatedLink } from "@/types/content";
import { services } from "@/content/services";
import { practices } from "@/content/practices";
import { industries } from "@/content/industries";
import { useCases } from "@/content/use-cases";
import { technologies } from "@/content/technologies";
import { resources } from "@/content/resources";

export type Dimension =
  | "service"
  | "practice"
  | "industry"
  | "use-case"
  | "technology"
  | "resource";

const TYPE_LABEL: Record<Dimension, string> = {
  service: "SERVICE",
  practice: "PRACTICE",
  industry: "INDUSTRY",
  "use-case": "USE CASE",
  technology: "TECHNOLOGY",
  resource: "RESOURCE",
};

/* ==========================================================================
   Link builders — each returns null when the target does not exist
   ========================================================================== */

export function serviceLink(slug: string): RelatedLink | null {
  const service = services.find((s) => s.slug === slug);
  if (service) {
    return {
      label: service.title,
      href: `/services/${service.slug}/`,
      type: TYPE_LABEL.service,
      description: service.seo.description,
    };
  }
  const practice = practices.find((p) => p.slug === slug);
  if (!practice) return null;
  return {
    label: practice.title,
    href: `/services/${practice.slug}/`,
    type: TYPE_LABEL.practice,
    description: practice.menuDescription,
  };
}

export function industryLink(slug: string): RelatedLink | null {
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return null;
  return {
    label: industry.title,
    href: `/industries/${industry.slug}/`,
    type: TYPE_LABEL.industry,
    description: industry.problems[0]?.title ?? industry.seo.primaryTopic,
  };
}

export function useCaseLink(slug: string): RelatedLink | null {
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) return null;
  return {
    label: useCase.title,
    href: `/use-cases/${useCase.slug}/`,
    type: TYPE_LABEL["use-case"],
    description: useCase.symptoms[0] ?? useCase.seo.primaryTopic,
  };
}

export function technologyLink(slug: string): RelatedLink | null {
  const technology = technologies.find((t) => t.slug === slug);
  if (!technology) return null;
  return {
    label: technology.title,
    href: `/technologies/${technology.slug}/`,
    type: TYPE_LABEL.technology,
    description: technology.category,
  };
}

export function resourceLink(slug: string): RelatedLink | null {
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) return null;
  return {
    label: resource.title,
    href: `/resources/${resource.slug}/`,
    type: resource.type === "glossary" ? "GLOSSARY" : "ARTICLE",
    description: resource.answer,
  };
}

const BUILDERS: Record<Dimension, (slug: string) => RelatedLink | null> = {
  service: serviceLink,
  practice: serviceLink,
  industry: industryLink,
  "use-case": useCaseLink,
  technology: technologyLink,
  resource: resourceLink,
};

function resolve(slugs: string[] | undefined, dimension: Dimension): RelatedLink[] {
  if (!slugs?.length) return [];
  return slugs
    .map((slug) => BUILDERS[dimension](slug))
    .filter((link): link is RelatedLink => link !== null);
}

function dedupe(links: RelatedLink[]): RelatedLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

/* ==========================================================================
   Reverse indexes — built once at module load from the forward declarations
   ========================================================================== */

/** Industry → services, reversed into service → industries. */
const industriesByService = new Map<string, string[]>();
for (const industry of industries) {
  const declared = new Set([
    ...industry.services,
    ...industry.problems.flatMap((problem) => problem.addressedBy),
  ]);
  for (const slug of declared) {
    const existing = industriesByService.get(slug);
    if (existing) existing.push(industry.slug);
    else industriesByService.set(slug, [industry.slug]);
  }
}

/** Use case → services, reversed into service → use cases. */
const useCasesByService = new Map<string, string[]>();
for (const useCase of useCases) {
  for (const slug of useCase.services) {
    const existing = useCasesByService.get(slug);
    if (existing) existing.push(useCase.slug);
    else useCasesByService.set(slug, [useCase.slug]);
  }
}

/** Use case → industries, reversed into industry → use cases. */
const useCasesByIndustry = new Map<string, string[]>();
for (const useCase of useCases) {
  for (const slug of useCase.industries ?? []) {
    const existing = useCasesByIndustry.get(slug);
    if (existing) existing.push(useCase.slug);
    else useCasesByIndustry.set(slug, [useCase.slug]);
  }
}

/** Technology → services, reversed into service → technologies. */
const technologiesByService = new Map<string, string[]>();
for (const technology of technologies) {
  for (const slug of technology.services ?? []) {
    const existing = technologiesByService.get(slug);
    if (existing) existing.push(technology.slug);
    else technologiesByService.set(slug, [technology.slug]);
  }
}

/** Resource → supported services, reversed into service → resources. */
const resourcesByService = new Map<string, string[]>();
for (const resource of resources) {
  for (const slug of resource.supports ?? []) {
    const existing = resourcesByService.get(slug);
    if (existing) existing.push(resource.slug);
    else resourcesByService.set(slug, [resource.slug]);
  }
}

/* ==========================================================================
   Public API — one call per page, returning every dimension
   ========================================================================== */

export interface ResolvedRelationships {
  services: RelatedLink[];
  industries: RelatedLink[];
  useCases: RelatedLink[];
  technologies: RelatedLink[];
  resources: RelatedLink[];
  /** Everything flattened, for a compact single-row related section. */
  all: RelatedLink[];
}

function assemble(parts: Omit<ResolvedRelationships, "all">): ResolvedRelationships {
  return {
    ...parts,
    all: dedupe([
      ...parts.services,
      ...parts.industries,
      ...parts.useCases,
      ...parts.technologies,
      ...parts.resources,
    ]),
  };
}

export function relationshipsForService(slug: string): ResolvedRelationships {
  const service = services.find((s) => s.slug === slug);
  const practice = practices.find((p) => p.slug === slug);

  /* Siblings: services in the same practice, excluding this one. */
  const siblingSlugs = service
    ? services
        .filter((s) => s.practice === service.practice && s.slug !== slug)
        .slice(0, 4)
        .map((s) => s.slug)
    : (practice?.services ?? []);

  const declaredServices = service?.relatedServices ?? [];
  const parentSlug = service?.parent ? [service.parent] : [];

  return assemble({
    services: dedupe([
      ...resolve([...parentSlug, ...declaredServices], "service"),
      ...resolve(siblingSlugs, "service"),
    ]).slice(0, 6),
    industries: dedupe([
      ...resolve(service?.relatedIndustries, "industry"),
      ...resolve(industriesByService.get(slug), "industry"),
    ]).slice(0, 4),
    useCases: dedupe([
      ...resolve(service?.relatedUseCases, "use-case"),
      ...resolve(useCasesByService.get(slug), "use-case"),
    ]).slice(0, 4),
    technologies: dedupe([
      ...resolve(service?.relatedTechnologies, "technology"),
      ...resolve(technologiesByService.get(slug), "technology"),
    ]).slice(0, 4),
    resources: dedupe([
      ...resolve(service?.relatedResources, "resource"),
      ...resolve(resourcesByService.get(slug), "resource"),
    ]).slice(0, 3),
  });
}

export function relationshipsForIndustry(slug: string): ResolvedRelationships {
  const industry = industries.find((i) => i.slug === slug);

  const serviceSlugs = [
    ...(industry?.services ?? []),
    ...(industry?.problems.flatMap((p) => p.addressedBy) ?? []),
    ...(industry?.relatedServices ?? []),
  ];

  return assemble({
    services: dedupe(resolve(serviceSlugs, "service")).slice(0, 6),
    industries: dedupe(
      resolve(
        industries.filter((i) => i.slug !== slug).slice(0, 3).map((i) => i.slug),
        "industry",
      ),
    ),
    useCases: dedupe([
      ...resolve(industry?.useCases, "use-case"),
      ...resolve(useCasesByIndustry.get(slug), "use-case"),
      ...resolve(industry?.relatedUseCases, "use-case"),
    ]).slice(0, 4),
    technologies: dedupe([
      ...resolve(industry?.relatedTechnologies, "technology"),
      /* Technologies attached to any service this industry uses. */
      ...resolve(
        serviceSlugs.flatMap((s) => technologiesByService.get(s) ?? []),
        "technology",
      ),
    ]).slice(0, 4),
    resources: dedupe(resolve(industry?.relatedResources, "resource")).slice(0, 3),
  });
}

export function relationshipsForUseCase(slug: string): ResolvedRelationships {
  const useCase = useCases.find((u) => u.slug === slug);
  const serviceSlugs = [
    ...(useCase?.services ?? []),
    ...(useCase?.relatedServices ?? []),
  ];

  return assemble({
    services: dedupe(resolve(serviceSlugs, "service")).slice(0, 6),
    industries: dedupe([
      ...resolve(useCase?.industries, "industry"),
      ...resolve(useCase?.relatedIndustries, "industry"),
    ]).slice(0, 4),
    useCases: dedupe(
      resolve(
        useCases.filter((u) => u.slug !== slug).slice(0, 3).map((u) => u.slug),
        "use-case",
      ),
    ),
    technologies: dedupe([
      ...resolve(useCase?.relatedTechnologies, "technology"),
      ...resolve(
        serviceSlugs.flatMap((s) => technologiesByService.get(s) ?? []),
        "technology",
      ),
    ]).slice(0, 4),
    resources: dedupe([
      ...resolve(useCase?.relatedResources, "resource"),
      ...resolve(
        serviceSlugs.flatMap((s) => resourcesByService.get(s) ?? []),
        "resource",
      ),
    ]).slice(0, 3),
  });
}

export function relationshipsForTechnology(slug: string): ResolvedRelationships {
  const technology = technologies.find((t) => t.slug === slug);
  const serviceSlugs = [
    ...(technology?.services ?? []),
    ...(technology?.relatedServices ?? []),
  ];

  return assemble({
    services: dedupe(resolve(serviceSlugs, "service")).slice(0, 6),
    industries: dedupe([
      ...resolve(technology?.relatedIndustries, "industry"),
      ...resolve(
        serviceSlugs.flatMap((s) => industriesByService.get(s) ?? []),
        "industry",
      ),
    ]).slice(0, 4),
    useCases: dedupe([
      ...resolve(technology?.relatedUseCases, "use-case"),
      ...resolve(
        serviceSlugs.flatMap((s) => useCasesByService.get(s) ?? []),
        "use-case",
      ),
    ]).slice(0, 4),
    technologies: dedupe(
      resolve(
        technologies.filter((t) => t.slug !== slug).slice(0, 3).map((t) => t.slug),
        "technology",
      ),
    ),
    resources: dedupe(resolve(technology?.relatedResources, "resource")).slice(0, 3),
  });
}
