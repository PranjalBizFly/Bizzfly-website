/**
 * Homepage narrative sections — Why BizzFly, the Growth Engine, and the
 * human layer.
 *
 * Separate from homepage.ts because these three came out of a comparison
 * against the live site at bizzfly.com rather than out of the content model,
 * and it is worth being able to see at a glance which claims have an external
 * source and which do not.
 *
 * Sourcing rule, unchanged from the rest of the site: nothing here asserts a
 * result, a client, a rating or a duration. See trustCommitments in
 * homepage.ts and the transparency pages under /company/.
 */

/* ==========================================================================
   Why BizzFly
   --------------------------------------------------------------------------
   The four pillar NAMES are verbatim from the "Why choose us" section on
   bizzfly.com, verified 2026-09-09. They are the company's own articulation
   of what it does differently, and the new site had dropped them entirely —
   which lost a real piece of business communication the old site was doing.

   The supporting copy is rewritten. The original one-liners are generic
   ("Every solution tied directly to business outcomes and ROI"), and a claim
   that every competitor could also make is not a differentiator. Each pillar
   below names the constraint it addresses and the mechanism that addresses
   it, because a reader can check a mechanism and cannot check an adjective.
   ========================================================================== */
export interface WhyPillar {
  index: string;
  /** Verbatim from the live site. Do not reword without re-verifying. */
  name: string;
  /** The plain-language version, for a reader who is not in the industry. */
  claim: string;
  /** What it means in practice. */
  detail: string;
  /** How it is done — checkable, rather than an adjective. */
  mechanism: string;
  href: string;
  linkLabel: string;
}

export const whyPillars: WhyPillar[] = [
  {
    index: "01",
    name: "Search Intelligence",
    claim: "We work out why you are not being found before proposing anything.",
    detail:
      "Discovery is split across ranked results, generated answers and map packs, and a business can be strong on one while absent from the next. Which of those is failing changes the work completely.",
    mechanism:
      "The first two weeks are diagnosis: crawl and index coverage, entity clarity, structured data, and which surfaces currently return you for the queries that matter. You keep those findings either way.",
    href: "/services/search-ai-visibility/",
    linkLabel: "Search & AI visibility",
  },
  {
    index: "02",
    name: "Unified Execution",
    claim: "The team that finds the problem is the team that fixes it.",
    detail:
      "Visibility and engineering are usually bought from different suppliers, which is why neither gets solved properly. The crawl problem capping your traffic is a template problem, and the template belongs to somebody else.",
    mechanism:
      "One engagement covers the diagnosis and the build, so there is no handover between the people who identified the constraint and the people who change the code.",
    href: "/company/how-we-work/",
    linkLabel: "How we work",
  },
  {
    index: "03",
    name: "Future-Ready Systems",
    claim: "Built for how buyers will search next year, not last year.",
    detail:
      "The qualities that earn a citation from an AI system — a clear entity, structured content, machine-readable data, server-rendered pages — are engineering decisions, and they are expensive to retrofit later.",
    mechanism:
      "Structured data, semantic markup and server rendering are part of the build rather than a later optimisation pass. Every technology page states when we would tell you to use something else.",
    href: "/technologies/",
    linkLabel: "Technology standards",
  },
  {
    index: "04",
    name: "Growth-Focused Delivery",
    claim: "Reported against enquiries and hours, not impressions.",
    detail:
      "A monthly report full of rankings and impressions that avoids the commercial question is a way of not being accountable for whether anything actually changed.",
    mechanism:
      "Measures are agreed before work starts — enquiries, response times, hours removed — and the report separates indexation, impressions, sessions and enquiries, so a fall has a location rather than a vibe.",
    href: "/company/how-we-report/",
    linkLabel: "How we report",
  },
];

/* ==========================================================================
   The BizzFly Growth Engine
   --------------------------------------------------------------------------
   The four stages a business moves through, and the order they have to be
   solved in. This is the argument the site already makes in prose, drawn:
   visibility with nothing behind it wastes budget, a good website nobody
   finds wastes more, and demand you cannot service is not growth.

   Every service named below resolves to a page in the content registry.
   ========================================================================== */
export interface GrowthStage {
  index: string;
  key: string;
  name: string;
  /** The business outcome, for a reader skimming all four. */
  outcome: string;
  /** The failure this stage prevents — why it cannot be skipped. */
  constraint: string;
  /** The disciplines, as a compact rail. */
  disciplines: string[];
  items: { label: string; href: string }[];
  href: string;
  linkLabel: string;
}

export const growthStages: GrowthStage[] = [
  {
    index: "01",
    key: "discover",
    name: "Discover",
    outcome: "Buyers find you when they are looking.",
    constraint:
      "If you are absent from the surface a buyer uses, nothing further down this list ever gets its chance. It is the only stage whose failure is invisible — you never see the enquiry you did not receive.",
    disciplines: ["SEO", "AEO", "GEO", "AIO"],
    items: [
      { label: "Search engine optimisation", href: "/services/seo/" },
      {
        label: "Answer engine optimisation",
        href: "/services/answer-engine-optimisation/",
      },
      {
        label: "Generative engine optimisation",
        href: "/services/generative-engine-optimisation/",
      },
      { label: "AI optimisation", href: "/services/ai-optimisation/" },
    ],
    href: "/services/search-ai-visibility/",
    linkLabel: "Search & AI visibility",
  },
  {
    index: "02",
    key: "experience",
    name: "Experience",
    outcome: "What they find holds up when they arrive.",
    constraint:
      "Visibility sends people to a website. A slow, unclear or dated one turns the attention you just earned into a bounce, which is the most expensive way to fail because you paid for the visit first.",
    disciplines: ["Website", "UX", "SXO"],
    items: [
      {
        label: "Website design & development",
        href: "/services/corporate-websites/",
      },
      { label: "UI/UX design", href: "/services/ui-ux-design/" },
      {
        label: "Search experience optimisation",
        href: "/services/search-experience-optimisation/",
      },
    ],
    href: "/services/web-development/",
    linkLabel: "Websites & digital experience",
  },
  {
    index: "03",
    key: "convert",
    name: "Convert",
    outcome: "Interest turns into enquiries you can act on.",
    constraint:
      "Traffic that never becomes a conversation is a reporting number rather than a commercial result. Most websites lose more in the last two steps than in the first ten.",
    disciplines: ["Leads", "Sales", "Conversion"],
    items: [
      {
        label: "Conversion optimisation",
        href: "/services/conversion-rate-optimization/",
      },
      { label: "Performance marketing", href: "/services/performance-marketing/" },
      { label: "Sales automation", href: "/services/sales-automation/" },
    ],
    href: "/services/digital-marketing/",
    linkLabel: "Digital marketing & growth",
  },
  {
    index: "04",
    key: "scale",
    name: "Scale",
    outcome: "The business holds when the demand arrives.",
    constraint:
      "Growth that breaks your operations is not growth. The enquiry answered in three days is the enquiry a competitor already won — and that ceiling appears exactly when the earlier stages start working.",
    disciplines: ["Automation", "Software", "AI", "Data"],
    items: [
      { label: "Business automation", href: "/services/workflow-automation/" },
      { label: "Custom software development", href: "/services/custom-software/" },
      { label: "AI agents", href: "/services/ai-agents/" },
      { label: "Business intelligence", href: "/services/business-intelligence/" },
    ],
    href: "/services/ai-automation/",
    linkLabel: "AI & automation",
  },
];

/* ==========================================================================
   The human layer
   --------------------------------------------------------------------------
   The old site names a founder on /about-us/ and gives him a photograph. The
   new site mentioned him only inside a paragraph of body copy on one company
   page, which lost the fact that this is a company run by an identifiable
   person — the single clearest trust signal the old site had and this one
   did not.

   VERIFIED (bizzfly.com/about-us/, 2026-09-09): the name, that he founded the
   company, and the published positioning this paraphrases.

   NOT AVAILABLE, and therefore not invented: a portrait, a first-person
   quotation, the founding year, and team size. See site.unverified. The
   composition below is typographic so that it reads as finished without a
   photograph rather than as a card with a hole in it.
   ========================================================================== */
export const founderNote = {
  name: "Rahul Jadhav",
  role: "Founder",
  location: "Pune, India",
  /**
   * The company's own published reason for existing, from /about-us/, in this
   * site's register. It makes no claim the original does not make. This is
   * deliberately NOT presented as a quotation, because it is a paraphrase of
   * published positioning rather than something recorded as said.
   */
  premise:
    "BizzFly was built on one belief: that visibility, technology and growth are a single continuous problem, and that buying them as three separate services is why most businesses solve none of them properly.",
  body: [
    "That is an awkward thing to organise a company around, because it is harder to sell. It is far easier to sell a retainer for one discipline and subcontract the rest — and that handover, between the people who diagnose a problem and the people who fix it, is where most engagements quietly fail.",
    "We work the other way round. The same team that finds the crawl problem capping your visibility can fix the template causing it. And if we are not the right people for what you need, we will say so and point you somewhere better.",
  ],
  cta: { label: "About BizzFly", href: "/company/about/" },
  secondary: { label: "How we work", href: "/company/how-we-work/" },
};
