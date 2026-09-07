/**
 * Service directory grouping and page-composition metadata.
 *
 * Kept as a lookup rather than repeated on every service object, so adding a
 * service means adding one row here plus its content — and the composition it
 * uses is a deliberate editorial decision rather than an accident.
 *
 * The composition variant is chosen by what the service actually is:
 *   capability-led  — the value is the breadth of what is included
 *   process-led     — the value is the sequence and the discipline
 *   technology-led  — the buyer is technical and wants the stack and boundaries
 *   editorial       — the value is judgement, best carried by prose
 */

import type {
  DiagramKind,
  ServiceGroupId,
  ServiceLayout,
} from "@/types/content";

export interface ServiceGroup {
  id: ServiceGroupId;
  index: string;
  label: string;
  summary: string;
  /** When a visitor should be reading this group rather than another. */
  chooseWhen: string;
}

/** The /services/ directory structure. */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "digital-visibility",
    index: "01",
    label: "Digital Visibility",
    summary:
      "Being found across every surface where buyers now search — ranked results, direct answers, AI-generated responses and maps.",
    chooseWhen:
      "Start here if buyers cannot find you, or if rankings have held while clicks have fallen.",
  },
  {
    id: "digital-experience",
    index: "02",
    label: "Digital Experience",
    summary:
      "The website and interface work that decides whether the visibility you win turns into an enquiry.",
    chooseWhen:
      "Start here if traffic is healthy and enquiries are not, or if the site no longer reflects the business.",
  },
  {
    id: "systems-software",
    index: "03",
    label: "Systems & Software",
    summary:
      "Software built around a process that is genuinely specific to you, and the integrations that connect what you already run.",
    chooseWhen:
      "Start here if a core process runs on spreadsheets, or if your tools each work well and none of them talk.",
  },
  {
    id: "automation",
    index: "04",
    label: "Automation",
    summary:
      "Removing the repetitive work that consumes a team's week and caps how far the business can grow without hiring.",
    chooseWhen:
      "Start here if growth conversations keep ending at headcount, or if response times are costing you deals.",
  },
  {
    id: "ai",
    index: "05",
    label: "AI",
    summary:
      "AI applied to specific processes with defined boundaries — including an honest answer about where it is the wrong tool.",
    chooseWhen:
      "Start here if you are under pressure to have an AI answer and want to know which project is worth doing first.",
  },
  {
    id: "growth",
    index: "06",
    label: "Growth",
    summary:
      "Strategy, acquisition and measurement — deciding what to do, in what order, and how you will know whether it worked.",
    chooseWhen:
      "Start here if you are doing a bit of everything and cannot say which part is producing revenue.",
  },
];

interface ServiceMeta {
  group: ServiceGroupId;
  layout: ServiceLayout;
  diagram: DiagramKind;
}

/**
 * Composition per service. A service without an entry falls back to
 * editorial + no diagram, which is a safe default rather than a broken page.
 */
export const serviceMeta: Record<string, ServiceMeta> = {
  /* --- Digital visibility ------------------------------------------------ */
  seo: { group: "digital-visibility", layout: "process-led", diagram: "search-surfaces" },
  "ai-search-optimisation": {
    group: "digital-visibility",
    layout: "capability-led",
    diagram: "search-surfaces",
  },
  "technical-seo": {
    group: "digital-visibility",
    layout: "technology-led",
    diagram: "content-structure",
  },
  "answer-engine-optimisation": {
    group: "digital-visibility",
    layout: "capability-led",
    diagram: "search-surfaces",
  },
  "generative-engine-optimisation": {
    group: "digital-visibility",
    layout: "capability-led",
    diagram: "search-surfaces",
  },
  "ai-optimisation": {
    group: "digital-visibility",
    layout: "technology-led",
    diagram: "content-structure",
  },
  "search-experience-optimisation": {
    group: "digital-visibility",
    layout: "editorial",
    diagram: "experience-flow",
  },
  "google-business-profile": {
    group: "digital-visibility",
    layout: "process-led",
    diagram: "none",
  },

  /* --- Digital experience ------------------------------------------------ */
  "corporate-websites": {
    group: "digital-experience",
    layout: "capability-led",
    diagram: "content-structure",
  },
  "ui-ux-design": {
    group: "digital-experience",
    layout: "editorial",
    diagram: "experience-flow",
  },
  "website-performance": {
    group: "digital-experience",
    layout: "technology-led",
    diagram: "none",
  },
  "website-redesign": {
    group: "digital-experience",
    layout: "process-led",
    diagram: "content-structure",
  },

  /* --- Systems & software ------------------------------------------------ */
  "custom-software": {
    group: "systems-software",
    layout: "process-led",
    diagram: "system-architecture",
  },
  "web-applications": {
    group: "systems-software",
    layout: "capability-led",
    diagram: "system-architecture",
  },
  "systems-integration": {
    group: "systems-software",
    layout: "technology-led",
    diagram: "system-architecture",
  },

  /* --- Automation -------------------------------------------------------- */
  "workflow-automation": {
    group: "automation",
    layout: "process-led",
    diagram: "process-transformation",
  },
  "sales-automation": {
    group: "automation",
    layout: "process-led",
    diagram: "process-transformation",
  },

  /* --- AI ---------------------------------------------------------------- */
  "ai-agents": { group: "ai", layout: "technology-led", diagram: "ai-workflow" },
  "ai-chatbots": { group: "ai", layout: "capability-led", diagram: "ai-workflow" },
  "ai-consulting": { group: "ai", layout: "editorial", diagram: "none" },

  /* --- Growth ------------------------------------------------------------ */
  "digital-strategy": { group: "growth", layout: "editorial", diagram: "none" },
  "performance-marketing": {
    group: "growth",
    layout: "capability-led",
    diagram: "none",
  },
  "conversion-rate-optimization": {
    group: "growth",
    layout: "process-led",
    diagram: "experience-flow",
  },
  "business-intelligence": {
    group: "growth",
    layout: "capability-led",
    diagram: "system-architecture",
  },
  "analytics-implementation": {
    group: "growth",
    layout: "technology-led",
    diagram: "none",
  },
};

export function metaForService(slug: string): ServiceMeta {
  return (
    serviceMeta[slug] ?? {
      group: "growth",
      layout: "editorial",
      diagram: "none",
    }
  );
}
