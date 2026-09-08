/**
 * Market pages — audience and business-model segments rather than trades.
 *
 * These are organised by how the business sells and who it sells to, because
 * a D2C brand and a B2B services firm face genuinely different digital
 * problems even when they operate in the same product category.
 */

import type { Industry } from "@/types/content";

export const marketIndustries: Industry[] = [
  {
    slug: "travel",
    layout: "challenge-led",
    diagram: "search-surfaces",
    title: "Travel & Tourism",
    answer:
      "Travel businesses compete for their own customers against intermediaries that outrank them, spend more, and take a margin on every booking that goes through them.",
    opportunity:
      "Direct bookings carry the commission back. Every percentage point moved from intermediary to direct is margin recovered on demand you already generated.",
    context:
      "Discovery is dominated by aggregators and marketplaces with large budgets and structural advantages in search. Buyers research across many sessions and devices before booking, and a large share of that research now happens in AI assistants that summarise options without sending a click. Meanwhile the operator's own site often loads slowly, presents availability poorly, and asks for more steps than the intermediary does — so even the customer who arrives directly frequently books elsewhere.",
    problems: [
      {
        title: "Intermediaries outrank the operator for its own name and offer",
        description:
          "Aggregators invest heavily in exactly the queries the operator should own, and often present the operator's inventory better than the operator does.",
        addressedBy: ["seo", "local-seo"],
      },
      {
        title: "The direct booking path is worse than the intermediary's",
        description:
          "More steps, slower pages, unclear availability. Customers who arrived intending to book direct still leave for the platform that makes it easier.",
        addressedBy: ["conversion-rate-optimization", "website-performance"],
      },
      {
        title: "Research increasingly ends without a click",
        description:
          "Assistants summarise options and price ranges directly. Being one of the sources those summaries draw on is now part of demand generation rather than a separate discipline.",
        addressedBy: ["generative-engine-optimisation", "structured-data"],
      },
    ],
    useCases: ["improve-website-conversion", "get-found-in-ai-search", "rank-in-local-search"],
    services: ["conversion-rate-optimization", "generative-engine-optimisation", "website-performance", "local-seo"],
    seo: {
      title: "Digital Services for Travel & Tourism",
      description:
        "Recovering direct bookings against intermediaries: search visibility, a booking path worth using, and presence in AI-assisted research.",
      primaryTopic: "travel digital marketing",
      secondaryTopics: ["direct bookings", "tourism SEO"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P2",
    cta: { label: "Discuss direct bookings", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Can we realistically outrank the big aggregators?",
        answer:
          "Not on broad category terms, and pursuing those wastes budget. On your own property, location specifics and the detail aggregators cannot cover, you have a genuine advantage — that is where direct demand is recoverable.",
      },
      {
        question: "Is it worth leaving the platforms entirely?",
        answer:
          "Rarely. They generate real demand you would not otherwise reach. The commercial goal is shifting the margin mix — capturing direct the customers who found you through a platform and would book with you again.",
      },
    ],
    related: [
      { label: "Hospitality", href: "/industries/hospitality/", type: "INDUSTRY" },
      { label: "Conversion Optimisation", href: "/services/conversion-rate-optimization/", type: "SERVICE" },
    ],
  },
  {
    slug: "nonprofit",
    layout: "opportunity-led",
    diagram: "experience-flow",
    title: "Non-Profit & Social Impact",
    answer:
      "Non-profits serve two audiences whose needs conflict: funders and donors who need evidence of impact, and service users who need help without navigating a fundraising site to find it.",
    opportunity:
      "Constrained budgets make the disciplined choices unusually valuable here. A small number of well-built pages that serve both audiences properly outperforms a large site nobody maintains.",
    context:
      "Budgets are tight and scrutinised, and spending on digital competes directly with programme delivery. Volunteers and part-time staff often maintain the site, so anything requiring specialist upkeep degrades. Service users may arrive in difficulty, on older devices and limited connections, which makes performance and accessibility a service issue rather than a technical preference. Funders assess governance and evidence, and increasingly expect both to be visible before they engage.",
    problems: [
      {
        title: "The site serves donors and hides the service",
        description:
          "Fundraising material dominates while the people the organisation exists to help have to navigate around it to find support.",
        addressedBy: ["site-architecture", "ui-ux-design"],
      },
      {
        title: "Sites are built once and then cannot be maintained",
        description:
          "A site requiring technical skill to update decays as soon as the volunteer or agency that built it moves on, and the cost of the rebuild recurs every few years.",
        addressedBy: ["corporate-websites", "website-maintenance"],
      },
      {
        title: "Accessibility is treated as optional",
        description:
          "For an organisation whose users may have disabilities, limited devices or poor connections, an inaccessible site excludes exactly the people it was built for.",
        addressedBy: ["accessibility-audit", "website-performance"],
      },
    ],
    useCases: ["improve-digital-presence", "improve-customer-experience", "reduce-manual-work"],
    services: ["corporate-websites", "accessibility-audit", "website-maintenance", "site-architecture"],
    seo: {
      title: "Digital Services for Non-Profits",
      description:
        "Serving service users and funders without one crowding out the other, on a site a small team can genuinely maintain.",
      primaryTopic: "nonprofit digital strategy",
      secondaryTopics: ["charity website", "third sector digital"],
      intent: "commercial",
    },
    audience: ["A1", "A2"],
    phase: "P2",
    cta: { label: "Discuss your requirements", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "How should a non-profit prioritise limited digital budget?",
        answer:
          "Service delivery first, then evidence for funders, then fundraising conversion. That order reflects the mission and, in practice, the funder evidence tends to improve fundraising anyway.",
      },
      {
        question: "Is accessibility a legal requirement for charities?",
        answer:
          "Public sector bodies face specific obligations and others face general duties not to discriminate. Beyond the legal position, an organisation serving people with disabilities has an obvious reason to make its own service usable.",
      },
    ],
    related: [
      { label: "Accessibility Audit", href: "/services/accessibility-audit/", type: "SERVICE" },
      { label: "Accessibility commitment", href: "/company/accessibility-commitment/", type: "COMPANY" },
    ],
  },
  {
    slug: "media",
    layout: "challenge-led",
    diagram: "search-surfaces",
    title: "Media & Publishing",
    answer:
      "Publishing economics assumed that answering a question earned a visit. AI answers have broken that assumption for a significant class of content, and the response has to be structural rather than tactical.",
    opportunity:
      "Content that cannot be summarised away — original reporting, proprietary data, distinctive voice, community — is where publishing value is concentrating. That is a commissioning decision as much as an SEO one.",
    context:
      "Advertising revenue depends on sessions, and sessions depend on people clicking through to read. Where an assistant can answer the question from the article, a share of that traffic does not arrive. Definitional and explanatory content is affected first and hardest; investigative work, original data and distinctive analysis hold up better. At the same time, archives of thousands of articles carry technical debt — old templates, broken embeds, outdated markup — that suppresses the pages still capable of earning attention.",
    problems: [
      {
        title: "Explanatory content no longer earns the click",
        description:
          "Impressions hold while clicks fall. The article still ranks and still gets read — inside someone else's answer, with no session recorded.",
        addressedBy: ["generative-engine-optimisation", "content-strategy"],
      },
      {
        title: "Large archives carry accumulated technical debt",
        description:
          "Years of templates, embeds and markup changes leave thousands of pages that render poorly and consume crawl attention the current content needs.",
        addressedBy: ["technical-seo", "seo-migration"],
      },
      {
        title: "Attribution and entity clarity are weak",
        description:
          "Where authorship and publication are not clearly modelled, work is summarised without credit and the publication's authority does not accumulate.",
        addressedBy: ["structured-data", "digital-pr"],
      },
    ],
    useCases: ["recover-lost-traffic", "get-found-in-ai-search", "increase-organic-traffic"],
    services: ["generative-engine-optimisation", "technical-seo", "structured-data", "content-strategy"],
    seo: {
      title: "Digital Services for Media & Publishing",
      description:
        "Publishing under AI answers: what still earns the click, archive technical debt, and attribution that makes authority accumulate.",
      primaryTopic: "media publishing seo",
      secondaryTopics: ["publisher SEO", "zero-click"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P2",
    cta: { label: "Discuss publishing visibility", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Should publishers block AI crawlers?",
        answer:
          "It is a genuine strategic choice with costs either way. Blocking protects content from uncompensated summarisation and removes you from answers your audience is reading. The decision depends on whether your revenue depends on sessions or on relationships.",
      },
      {
        question: "What content still earns visits?",
        answer:
          "Original reporting, proprietary data, distinctive perspective and anything requiring the full piece to be useful. Content that answers a question in a sentence is the most exposed, because a sentence is exactly what an assistant returns.",
      },
    ],
    related: [
      { label: "AI visibility measurement guide", href: "/resources/ai-visibility-measurement-guide/", type: "GUIDE" },
      { label: "Digital PR & Link Earning", href: "/services/digital-pr/", type: "SERVICE" },
    ],
  },
  {
    slug: "agriculture",
    layout: "journey-led",
    diagram: "system-architecture",
    title: "Agriculture & Agritech",
    answer:
      "Two constraints shape digital work in agriculture: the season, which compresses activity into narrow windows, and the field, where connectivity is unreliable and data capture has to work offline.",
    opportunity:
      "Because seasonal peaks are predictable, the administrative load around them can be prepared for months in advance — which is rarer and more valuable than it sounds.",
    context:
      "Buying decisions cluster around seasonal windows, and a supplier who is invisible during the fortnight that matters has effectively missed the year. Record-keeping obligations — traceability, compliance, input records — generate substantial paperwork, often captured on paper in the field and typed up later. Connectivity at the point of work cannot be assumed, so anything requiring a live connection to record data will be worked around. Buyers are practical, evaluate on evidence, and have limited patience for marketing language.",
    problems: [
      {
        title: "Field data is captured on paper and rekeyed",
        description:
          "Records written in the field are entered into systems later, introducing delay and transcription errors into exactly the records that have to be defensible.",
        addressedBy: ["custom-software", "workflow-automation"],
      },
      {
        title: "Demand is seasonal and presence is not",
        description:
          "Visibility built during the season is too late — search and content work needs to be in place before the window opens, which requires planning against the calendar.",
        addressedBy: ["content-strategy", "seo"],
      },
      {
        title: "Compliance records are assembled retrospectively",
        description:
          "Traceability and input records collected across a season are reconciled into a submission at the end, which is slow and where the errors surface.",
        addressedBy: ["custom-software", "reporting-dashboards"],
      },
    ],
    useCases: ["reduce-manual-work", "modernise-legacy-processes", "improve-data-quality"],
    services: ["custom-software", "workflow-automation", "content-strategy", "reporting-dashboards"],
    seo: {
      title: "Digital Services for Agriculture & Agritech",
      description:
        "Offline-capable field data capture, compliance records built as work happens, and visibility timed to the season rather than the quarter.",
      primaryTopic: "agritech digital transformation",
      secondaryTopics: ["farm software", "agriculture marketing"],
      intent: "commercial",
    },
    audience: ["A1", "A6"],
    phase: "P3",
    cta: { label: "Discuss field systems", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Does field software need to work offline?",
        answer:
          "Almost always. If recording requires a connection that is not reliably there, people revert to paper and the system is bypassed within a season. Capture locally and sync when a connection returns.",
      },
      {
        question: "When should seasonal content be published?",
        answer:
          "Months before the window, because search visibility takes time to establish. Content published as the season starts arrives after the decisions have been made.",
      },
    ],
    related: [
      { label: "Mobile Platforms", href: "/technologies/mobile-platforms/", type: "TECHNOLOGY" },
      { label: "Improve data quality", href: "/use-cases/improve-data-quality/", type: "USE CASE" },
    ],
  },
  {
    slug: "b2b-services",
    layout: "journey-led",
    diagram: "content-structure",
    title: "B2B Services",
    answer:
      "Most B2B services firms grew on referral and have no second channel. Building inbound alongside it is not about replacing referral — it is about not being capacity-limited by who happens to be recommending you.",
    opportunity:
      "Referral-led firms usually have deep expertise and almost no published material. That gap is the cheapest inbound opportunity available to them, because the content already exists as knowledge.",
    context:
      "Sales cycles are long and involve several people, each needing different reassurance. Buyers research before making contact and often arrive having already formed a shortlist. Referral produces the best-fit clients but arrives unpredictably, and when it slows there is nothing else running. The firm's expertise is real and almost entirely unpublished, so a buyer researching the problem finds competitors instead — frequently less capable ones who simply wrote it down.",
    problems: [
      {
        title: "Referral is the only channel and it is not controllable",
        description:
          "When referral slows, there is no alternative pipeline and the response is usually a burst of outbound activity that produces poorer-fit clients.",
        addressedBy: ["content-strategy", "seo"],
      },
      {
        title: "The site describes services, not problems",
        description:
          "Buyers search for their situation, not for the name of your service line. A site organised around your capability list misses that language entirely.",
        addressedBy: ["site-architecture", "content-strategy"],
      },
      {
        title: "Enquiries are handled inconsistently",
        description:
          "With no defined process, response quality depends on who picks it up and how busy they are — which is invisible internally and highly visible to the buyer.",
        addressedBy: ["crm-implementation", "marketing-automation"],
      },
    ],
    useCases: ["generate-more-leads", "shorten-sales-cycle", "qualify-leads-automatically"],
    services: ["content-strategy", "seo", "crm-implementation", "marketing-automation"],
    seo: {
      title: "Digital Services for B2B Services Firms",
      description:
        "Building an inbound channel alongside referral: publishing the expertise you already have, and handling enquiries consistently.",
      primaryTopic: "b2b services marketing",
      secondaryTopics: ["professional services growth", "inbound B2B"],
      intent: "commercial",
    },
    audience: ["A1", "A2", "A3"],
    phase: "P2",
    cta: { label: "Discuss building inbound", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "How long before inbound produces enquiries?",
        answer:
          "Typically two to three quarters before it contributes meaningfully, and it compounds after that. Anyone promising results in weeks is describing paid advertising, which is a different mechanism with a different cost profile.",
      },
      {
        question: "Does publishing our expertise help competitors?",
        answer:
          "Competitors already know what you know. Buyers do not, and they choose the firm that demonstrated understanding of their problem. Withholding expertise protects nothing and costs the enquiry.",
      },
    ],
    related: [
      { label: "Professional Services", href: "/industries/professional-services/", type: "INDUSTRY" },
      { label: "Content planning framework", href: "/resources/content-planning-framework/", type: "GUIDE" },
    ],
  },
  {
    slug: "d2c-brands",
    layout: "opportunity-led",
    diagram: "experience-flow",
    title: "D2C Brands",
    answer:
      "The direct-to-consumer model was built on affordable paid acquisition. As that cost has risen, brands without owned demand find their unit economics no longer work at scale.",
    opportunity:
      "Owned channels — search visibility, email, returning customers — cost more to build and less to run. Every point of demand moved from paid to owned improves margin permanently rather than monthly.",
    context:
      "Customer acquisition cost has risen while attribution has become less certain, so brands are spending more and seeing less of where it goes. Repeat purchase and lifetime value increasingly decide whether a brand is viable, which shifts attention from acquisition to retention. Product discovery is also fragmenting — marketplaces, social, and now AI assistants that recommend products directly — so a brand whose demand depends on one paid channel is exposed to that channel's pricing decisions.",
    problems: [
      {
        title: "Acquisition cost has risen faster than order value",
        description:
          "Growth funded by paid media stops working when the cost per acquisition approaches the margin, and there is no owned channel to fall back on.",
        addressedBy: ["ecommerce-seo", "content-strategy"],
      },
      {
        title: "First purchase is optimised and repeat purchase is not",
        description:
          "Effort concentrates on the initial conversion while the post-purchase experience — which decides lifetime value — receives almost none.",
        addressedBy: ["marketing-automation", "conversion-rate-optimization"],
      },
      {
        title: "Product discovery is moving to surfaces the brand does not control",
        description:
          "Marketplaces and assistants recommend products directly. A brand that is not present in those surfaces loses the recommendation without ever seeing the query.",
        addressedBy: ["structured-data", "generative-engine-optimisation"],
      },
    ],
    useCases: ["improve-website-conversion", "increase-organic-traffic", "reduce-customer-churn"],
    services: ["ecommerce-seo", "marketing-automation", "conversion-rate-optimization", "structured-data"],
    seo: {
      title: "Digital Services for D2C Brands",
      description:
        "Building owned demand as paid acquisition costs rise: organic visibility, repeat purchase, and presence where products are now recommended.",
      primaryTopic: "d2c brand growth",
      secondaryTopics: ["direct to consumer", "ecommerce growth"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P2",
    cta: { label: "Discuss owned demand", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Should we stop paid advertising?",
        answer:
          "No — it produces demand quickly and it is measurable. The risk is depending on it entirely. Owned channels take longer to build and then cost far less per order, which is what makes the mix sustainable.",
      },
      {
        question: "Does SEO work for D2C?",
        answer:
          "For category, comparison and problem-led queries, yes. Competing on generic product terms against marketplaces is usually not winnable, and the return is in the questions buyers ask before they know what to search for.",
      },
    ],
    related: [
      { label: "E-commerce", href: "/industries/ecommerce/", type: "INDUSTRY" },
      { label: "E-commerce SEO", href: "/services/ecommerce-seo/", type: "SERVICE" },
    ],
  },
  {
    slug: "smes",
    layout: "opportunity-led",
    diagram: "process-transformation",
    title: "Small & Medium Enterprises",
    answer:
      "The constraint in most SMEs is not budget but attention. Nobody owns digital, so work happens when someone finds time — which means it happens in bursts and then stops.",
    opportunity:
      "A small number of things done consistently beats a large plan done once. That is achievable without a dedicated team, and it is what most SME digital advice fails to account for.",
    context:
      "There is usually no in-house digital specialist. The site was built once and has not changed since, tools were adopted individually by whoever needed them, and the owner or a marketing generalist carries digital alongside another job. Suppliers pitch programmes designed for organisations with dedicated teams, which do not survive contact with an SME's capacity. The result is a series of started-and-abandoned initiatives and justified scepticism about the next proposal.",
    problems: [
      {
        title: "Nobody owns digital work",
        description:
          "Responsibility sits with someone who has another full-time job, so activity is sporadic and nothing compounds.",
        addressedBy: ["digital-strategy", "website-maintenance"],
      },
      {
        title: "Tools accumulated without a plan",
        description:
          "Each was adopted for a reason and none of them connect, so staff move data between them by hand and nobody has counted the cost.",
        addressedBy: ["systems-integration", "api-development"],
      },
      {
        title: "Advice is scaled for organisations with teams",
        description:
          "Recommendations assume capacity that does not exist. A plan requiring weekly effort from a nonexistent role is abandoned within a quarter, which is why the scepticism is earned.",
        addressedBy: ["digital-strategy", "workflow-automation"],
      },
    ],
    useCases: ["improve-digital-presence", "reduce-manual-work", "generate-more-leads"],
    services: ["digital-strategy", "workflow-automation", "website-maintenance", "systems-integration"],
    seo: {
      title: "Digital Services for SMEs",
      description:
        "What to do with no dedicated digital team: a small number of things done consistently, and automation of the work nobody has time for.",
      primaryTopic: "sme digital growth",
      secondaryTopics: ["small business digital", "SME marketing"],
      intent: "commercial",
    },
    audience: ["A1", "A2"],
    phase: "P1",
    cta: { label: "Discuss where to start", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Where should a small business start?",
        answer:
          "With whichever is currently costing most — usually either an invisible business or a process consuming days that should take hours. Doing one properly beats starting three, because the one that finishes is the one that pays for the next.",
      },
      {
        question: "Do we need an agency retainer?",
        answer:
          "Not necessarily. Some work is genuinely ongoing; much of it is a defined project followed by maintenance. A retainer that exists to fill hours rather than to do stated work is worth questioning.",
      },
    ],
    related: [
      { label: "How we price", href: "/company/how-we-price/", type: "COMPANY" },
      { label: "Startups", href: "/industries/startups/", type: "INDUSTRY" },
    ],
  },
];
