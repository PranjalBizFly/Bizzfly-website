/**
 * Technologies — engineering briefs, not logo walls.
 * "whenNotToUse" is mandatory on every entry.
 */

import type { Technology, TechnologyGroupId } from "@/types/content";
import { moreTechnologies } from "./more-technologies";
import { platformTechnologies } from "./technologies-platform";

const coreTechnologies: Technology[] = [
  {
    slug: "web-stack",
    title: "Web Stack",
    category: "Engineering",
    group: "web",
    layout: "architecture-led",
    diagram: "content-structure",
    whyItMatters:
      "The web stack decides whether your content exists for the crawlers that now decide who gets found. It is a visibility decision before it is an engineering one.",
    answer:
      "We build production websites on React and Next.js with server rendering, because content that only exists after JavaScript runs is invisible to a significant share of the crawlers that now decide whether a business gets found.",
    choices: [
      {
        name: "Next.js (App Router)",
        rationale:
          "Static generation with incremental revalidation gives complete HTML on first byte, which is a requirement for AI crawlers, not just a speed optimisation.",
      },
      {
        name: "TypeScript",
        rationale:
          "On a site with hundreds of content-driven pages, a type error caught at build is a broken page that never reaches production.",
      },
      {
        name: "CSS custom properties, no runtime CSS-in-JS",
        rationale:
          "Design tokens resolve in the browser with zero JavaScript cost. Runtime style engines add main-thread work on every render.",
      },
      {
        name: "Server Components by default",
        rationale:
          "Interactive JavaScript is the exception, declared per component. A typical content page ships around 10 KB.",
      },
    ],
    whenNotToUse: [
      "A five-page brochure site with no content operation behind it — a managed CMS is cheaper to own",
      "A team with no JavaScript capability and no plans to acquire one; the handover would fail",
      "Projects where an existing platform already meets the requirement and the only gain would be novelty",
    ],
    decisionCriteria: [
      "How much content, changing how often, edited by whom",
      "Whether discoverability is a commercial requirement or an afterthought",
      "Who maintains this in two years",
    ],
    services: ["corporate-websites", "custom-software"],
    seo: {
      title: "Web Stack",
      description:
        "The web technologies BizzFly builds on, why each was chosen, and when we would not use them.",
      primaryTopic: "web technology stack",
      secondaryTopics: ["Next.js", "React", "TypeScript"],
      intent: "commercial",
    },
    audience: ["A7"],
    phase: "P1",
    cta: { label: "Technical discovery call", href: "/contact/", tier: "T4" },
  },
  {
    slug: "ai-stack",
    title: "AI Stack",
    category: "Engineering",
    group: "ai",
    layout: "ecosystem-led",
    diagram: "ai-workflow",
    whyItMatters:
      "The AI layer is where most budget gets wasted. Choosing the right tool — and knowing when the answer is a rule engine — is the difference between a working system and an expensive pilot.",
    answer:
      "We build AI systems on hosted language models with retrieval over your own data, rather than fine-tuning or self-hosting, because for most business processes the cost and maintenance burden of the alternatives is not repaid.",
    choices: [
      {
        name: "Hosted frontier models",
        rationale:
          "Capability improves without a migration project, and there is no GPU infrastructure to operate.",
      },
      {
        name: "Retrieval-augmented generation over your own content",
        rationale:
          "Answers are grounded in your documents and can cite them. Cheaper and more auditable than fine-tuning for knowledge tasks.",
      },
      {
        name: "Explicit tool boundaries and permissions",
        rationale:
          "An agent should only reach the systems its task requires. Scope is a design decision made before the build.",
      },
      {
        name: "Logging and human escalation on every deployment",
        rationale:
          "You need to see what the system did and why, and a person needs a route in when it is unsure.",
      },
    ],
    whenNotToUse: [
      "Deterministic, rule-based processes — a language model adds cost and unpredictability where a rule engine is correct every time",
      "Decisions with legal or financial consequence that require an auditable, deterministic trail",
      "Any workflow where a confident wrong answer is worse than no answer and no human reviews the output",
      "Data that cannot leave a regulated environment, unless a compliant deployment has been agreed first",
    ],
    decisionCriteria: [
      "Does the task involve language, or just rules? Rules do not need AI",
      "What is the cost of a wrong answer, and who catches it?",
      "Where does the data live, and where is it allowed to go?",
    ],
    services: ["ai-agents", "workflow-automation"],
    seo: {
      title: "AI Stack",
      description:
        "The AI technologies BizzFly builds on, the boundaries we design in, and the cases where we would advise against using AI at all.",
      primaryTopic: "AI technology stack",
      secondaryTopics: ["RAG", "AI agents", "LLM applications"],
      intent: "commercial",
    },
    audience: ["A7", "A6"],
    phase: "P1",
    cta: { label: "Technical discovery call", href: "/contact/", tier: "T4" },
    faqs: [
      {
        question: "Do you fine-tune models?",
        answer:
          "Rarely. For most business use cases, retrieval over your own content produces better-grounded answers at lower cost, and does not need redoing every time the underlying model improves. Fine-tuning earns its place for narrow, high-volume, stable tasks.",
      },
    ],
  },
  {
    slug: "automation-platforms",
    title: "Automation Platforms",
    category: "Operations",
    group: "automation",
    layout: "capability-led",
    diagram: "process-transformation",
    whyItMatters:
      "Automation tooling determines who can change a process later. Choose wrong and every adjustment becomes a development ticket.",
    answer:
      "We use integration platforms for straightforward system-to-system work and write custom services where the logic is genuinely complex — the decision turns on how much branching a process has and who will maintain it.",
    choices: [
      {
        name: "Integration platforms for simple flows",
        rationale:
          "Data movement between systems with a handful of conditions is faster to build and easier for a non-developer to adjust.",
      },
      {
        name: "Custom services for complex logic",
        rationale:
          "Once a process has real branching, error handling and state, a visual builder becomes harder to maintain than code.",
      },
      {
        name: "Your existing systems as the source of truth",
        rationale:
          "Automation should connect what you already run, not become another system to reconcile.",
      },
    ],
    whenNotToUse: [
      "Processes that change every month — automate the stable ones first",
      "A process nobody owns; automating an undefined process just makes the confusion faster",
      "Volumes low enough that the build cost will never be repaid",
    ],
    services: ["workflow-automation"],
    seo: {
      title: "Automation Platforms",
      description:
        "How BizzFly chooses between integration platforms and custom services for business process automation.",
      primaryTopic: "automation platforms",
      secondaryTopics: ["integration", "process automation"],
      intent: "commercial",
    },
    audience: ["A6", "A7"],
    phase: "P2",
    cta: { label: "Request an automation assessment", href: "/contact/", tier: "T3" },
  },
  {
    slug: "engineering-standards",
    title: "Our Engineering Standards",
    category: "Practice",
    group: "practice",
    layout: "capability-led",
    diagram: "none",
    whyItMatters:
      "Standards decide whether your team can maintain what we build after we leave. That is the only measure of a handover that matters.",
    answer:
      "Our standards exist for one outcome: your team can maintain what we build after we leave. That means typed code, tests on the logic that matters, documented decisions, and a handover that is planned rather than improvised.",
    choices: [
      {
        name: "Typed codebases",
        rationale: "Errors surface at build time rather than in production.",
      },
      {
        name: "Code review on every change",
        rationale: "No single-author code paths in anything we hand over.",
      },
      {
        name: "Accessibility and performance budgets enforced in CI",
        rationale:
          "Both regress silently unless a build fails. Treating them as review comments means they degrade over time.",
      },
      {
        name: "Documented architecture decisions",
        rationale:
          "The reasoning behind a choice is worth more to the next engineer than the choice itself.",
      },
      {
        name: "Planned handover",
        rationale:
          "Documentation, walkthroughs and a support window. IP is yours from day one.",
      },
    ],
    whenNotToUse: [
      "Throwaway prototypes built to be discarded — full rigour there is waste",
      "Experiments where the goal is learning, not shipping",
    ],
    seo: {
      title: "Our Engineering Standards",
      description:
        "How BizzFly builds software that your own team can maintain — typing, review, testing, budgets in CI, and planned handover.",
      primaryTopic: "engineering standards",
      secondaryTopics: ["code quality", "handover", "technical practice"],
      intent: "commercial",
    },
    audience: ["A7", "A8"],
    phase: "P1",
    cta: { label: "Technical discovery call", href: "/contact/", tier: "T4" },
  },
];

/**
 * The six capability groups, grouped by what the layer enables rather than by
 * vendor. They live here rather than in app/technologies/page.tsx because the
 * hub is no longer the only thing that renders them: the mega menu browses by
 * the same groups and links into the hub's own anchors, and two copies of this
 * list would drift into two different taxonomies within a release.
 */
export const technologyGroups: {
  id: TechnologyGroupId;
  label: string;
  role: string;
}[] = [
  {
    id: "ai",
    label: "AI",
    role: "Where language models genuinely help, and where a rule engine is the better answer.",
  },
  {
    id: "automation",
    label: "Automation & Integration",
    role: "Connecting the systems you already run so data stops being carried by people.",
  },
  {
    id: "web",
    label: "Web",
    role: "How pages are built and published, and whether machines can read them.",
  },
  {
    id: "software",
    label: "Software & Infrastructure",
    role: "Where applications run, how they deploy, and what happens when they fail.",
  },
  {
    id: "search-data",
    label: "Search & Data",
    role: "The measurement layer that tells you which of the above is actually working.",
  },
  {
    id: "practice",
    label: "Engineering Practice",
    role: "How we build, so your own team can maintain it after we leave.",
  },
];

export const technologies: Technology[] = [
  ...coreTechnologies,
  ...moreTechnologies,
  ...platformTechnologies,
];

export function getTechnology(slug: string): Technology | undefined {
  return technologies.find((t) => t.slug === slug);
}
