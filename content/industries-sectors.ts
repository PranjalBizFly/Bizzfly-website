/**
 * Sector pages — regulated, technical and trade sectors.
 *
 * Each is written to demonstrate fluency in how the sector actually operates
 * rather than to assert experience in it. Where a sector carries regulatory
 * constraints, those are stated, because pretending they do not exist is the
 * fastest way to lose credibility with the people who work in it.
 */

import type { Industry } from "@/types/content";

export const sectorIndustries: Industry[] = [
  {
    slug: "technology",
    layout: "opportunity-led",
    diagram: "search-surfaces",
    title: "Technology",
    answer:
      "Technology companies face a specific marketing problem: the capability is genuinely differentiated and almost impossible to describe differently from competitors, because everyone uses the same vocabulary.",
    opportunity:
      "The category vocabulary is exhausted, which means specificity wins. Explaining what you actually do, for whom, and what you do not do, is more differentiating than any adjective.",
    context:
      "Buying is committee-driven and technically informed. A technical evaluator reads documentation before marketing pages, a commercial sponsor needs a business case, and procurement asks about security and support. The three read different pages and all three have to be satisfied. Meanwhile the category page every competitor writes says the same three things, so the buyer's real question (what is different here) is answered nowhere.",
    problems: [
      {
        title: "Every competitor's site says the same thing",
        description:
          "Category vocabulary converges. When six vendors all promise to be scalable, secure and intelligent, none of those words carry information, and the buyer falls back on price or on whoever a colleague recommended.",
        addressedBy: ["content-strategy", "digital-strategy"],
      },
      {
        title: "Technical evaluators bypass marketing entirely",
        description:
          "Developers and architects read documentation, integration guides and error messages. If those are thin or absent, the evaluation ends there regardless of how good the marketing site is.",
        addressedBy: ["api-development", "corporate-websites"],
      },
      {
        title: "AI assistants describe the category, not the company",
        description:
          "When a buyer asks an assistant which tools solve their problem, generic positioning produces generic omission. Entity clarity and specific, citable material decide whether you are named.",
        addressedBy: ["generative-engine-optimisation", "structured-data"],
      },
    ],
    useCases: ["get-found-in-ai-search", "launch-a-digital-product", "shorten-sales-cycle"],
    services: ["content-strategy", "generative-engine-optimisation", "api-development", "digital-strategy"],
    seo: {
      title: "Digital Growth for Technology Companies",
      description:
        "Specificity over category vocabulary, documentation that survives technical evaluation, and entity clarity for AI-assisted research.",
      primaryTopic: "technology company marketing",
      secondaryTopics: ["B2B tech marketing", "developer audience"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P2",
    cta: { label: "Discuss your positioning", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "How do we differentiate when everyone claims the same things?",
        answer:
          "By being specific about who you are for and what you do not do. Exclusions are more credible than claims, and they attract better-fit buyers while filtering out the ones who would have churned.",
      },
      {
        question: "Does documentation quality affect sales?",
        answer:
          "For technically evaluated products, substantially. The technical assessor often decides before the commercial conversation happens, and they assess on documentation and integration experience rather than on marketing pages.",
      },
    ],
    related: [
      { label: "SaaS", href: "/industries/saas/", type: "INDUSTRY" },
      { label: "API Development", href: "/services/api-development/", type: "SERVICE" },
    ],
  },
  {
    slug: "automotive",
    layout: "challenge-led",
    diagram: "search-surfaces",
    title: "Automotive",
    answer:
      "Dealers, garages and specialists compete on two things digitally: whether they appear when someone searches locally, and how fast they respond to the enquiry that follows.",
    opportunity:
      "Response speed is a genuine differentiator in this sector and it is almost entirely within your control. The enquiry that gets a reply within the hour usually wins the appointment.",
    context:
      "Search here is overwhelmingly local and often urgent: a service due, a fault, a specific model in stock. The map pack matters more than the organic list, and stock or availability data changes daily. Enquiries arrive across web forms, phone, marketplace platforms and social messaging, and the business that answers first typically books the appointment. Multi-site groups face the additional problem that one location's visibility often suppresses the others.",
    problems: [
      {
        title: "One location dominates and the rest are invisible",
        description:
          "Group sites frequently rank a single branch for everything, so nearby locations lose searches happening on their doorstep. This is usually a structural problem with location pages and profiles rather than a competitive one.",
        addressedBy: ["local-seo", "site-architecture"],
      },
      {
        title: "Enquiries arrive across channels and get lost",
        description:
          "Forms, phone, marketplace messages and social all land in different places with different owners. The enquiry that waits until tomorrow has usually already booked elsewhere.",
        addressedBy: ["workflow-automation", "crm-implementation"],
      },
      {
        title: "Stock and availability information goes stale",
        description:
          "A listing showing a vehicle that sold last week costs a visit and some credibility. Keeping availability accurate is an integration problem, not a content one.",
        addressedBy: ["systems-integration", "api-development"],
      },
    ],
    useCases: ["rank-in-local-search", "qualify-leads-automatically", "improve-website-conversion"],
    services: ["local-seo", "workflow-automation", "systems-integration", "conversion-rate-optimisation"],
    seo: {
      title: "Digital Growth for Automotive Businesses",
      description:
        "Multi-location local visibility, enquiry routing across channels, and stock data that stays accurate.",
      primaryTopic: "automotive digital marketing",
      secondaryTopics: ["dealer marketing", "local automotive SEO"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P2",
    cta: { label: "Discuss local visibility", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Why does only one of our branches show up?",
        answer:
          "Usually because the site treats locations as content rather than as entities: one strong page absorbs the relevance for all of them. Distinct location pages, correctly claimed profiles and consistent citations separate them again.",
      },
      {
        question: "How quickly should we respond to an online enquiry?",
        answer:
          "Within the hour during business hours, and with an acknowledgement outside them. In a sector where the buyer is contacting several providers, response order frequently decides the outcome before quality does.",
      },
    ],
    related: [
      { label: "Local SEO", href: "/services/local-seo/", type: "SERVICE" },
      { label: "Rank in local search", href: "/use-cases/rank-in-local-search/", type: "USE CASE" },
    ],
  },
  {
    slug: "construction",
    layout: "challenge-led",
    title: "Construction",
    answer:
      "The digital problem in construction is rarely enquiry volume. It is qualification: separating the projects worth quoting from the ones that consume estimating time and never convert.",
    opportunity:
      "Estimating capacity is the scarce resource. Anything that filters enquiries before they reach an estimator returns time directly to the part of the business that wins work.",
    context:
      "Enquiries range from domestic jobs to tendered contracts, and the effort to quote them varies enormously. Estimating is skilled, slow and usually the bottleneck. Buyers assess credibility on completed work and on whether the business looks like it will still exist at practical completion: accreditations, insurance, real project evidence. Much of the sector's web presence consists of a gallery and a contact form, which qualifies nobody and answers none of the questions a serious buyer has.",
    problems: [
      {
        title: "Estimating time is consumed by enquiries that never convert",
        description:
          "Without qualification at the point of enquiry, the estimator's queue fills with projects outside the scope, budget or geography the business actually wants.",
        addressedBy: ["workflow-automation", "crm-implementation"],
      },
      {
        title: "Capability is shown but not explained",
        description:
          "A gallery demonstrates that work was done. It does not answer what types of project you take, at what scale, in what areas, or how you handle the parts buyers worry about.",
        addressedBy: ["content-strategy", "corporate-websites"],
      },
      {
        title: "Local visibility is uncontested and unclaimed",
        description:
          "Many construction firms rely entirely on referral and are invisible in search for the work they do. In sectors where competitors are equally absent, basic local visibility is unusually cheap.",
        addressedBy: ["local-seo", "seo"],
      },
    ],
    useCases: ["qualify-leads-automatically", "rank-in-local-search", "speed-up-quoting"],
    services: ["local-seo", "workflow-automation", "corporate-websites", "content-strategy"],
    seo: {
      title: "Digital Growth for Construction Businesses",
      description:
        "Qualification before quotation, capability explained rather than displayed, and local visibility in a sector that largely ignores it.",
      primaryTopic: "construction digital marketing",
      secondaryTopics: ["contractor marketing", "trade SEO"],
      intent: "commercial",
    },
    audience: ["A1", "A2"],
    phase: "P2",
    cta: { label: "Discuss enquiry quality", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "How do we stop quoting work we do not want?",
        answer:
          "State the scope plainly on the site (project types, size range, areas covered) and ask two or three qualifying questions at enquiry. Being explicit about what you do not take filters more effectively than any scoring system.",
      },
      {
        question: "Is search worth it when most work comes from referral?",
        answer:
          "Often yes, precisely because competitors assume it is not. Referral is capacity-limited and lumpy; search visibility gives a second channel that does not depend on who happens to be recommending you this quarter.",
      },
    ],
    related: [
      { label: "Speed up quoting", href: "/use-cases/speed-up-quoting/", type: "USE CASE" },
      { label: "Manufacturing", href: "/industries/manufacturing/", type: "INDUSTRY" },
    ],
  },
  {
    slug: "legal-services",
    layout: "challenge-led",
    diagram: "content-structure",
    title: "Legal Services",
    answer:
      "Legal marketing operates under professional conduct rules that constrain what can be claimed. Within those constraints, demonstrated expertise is the strongest available signal, and it is the one most firms under-use.",
    opportunity:
      "The sector's regulatory caution has left a gap: clear, accurate explanation of common legal questions. Firms that publish it earn both visibility and the trust that precedes an enquiry.",
    context:
      "Prospective clients research extensively before contacting a firm, often at a stressful moment, and they arrive with questions they are embarrassed to ask. Professional conduct rules restrict comparative and outcome-based claims, which removes most of the levers other sectors use. What remains is genuine expertise, expressed clearly. Legal content is also heavily represented in AI answers, which makes accuracy and citability commercially relevant as well as ethically necessary.",
    complianceNotes:
      "Marketing by regulated legal practices is subject to professional conduct rules on accuracy, comparative claims and client confidentiality. Content should be reviewed by the firm before publication; we do not publish client-identifying material or outcome claims without that review.",
    problems: [
      {
        title: "Expertise exists and is never published",
        description:
          "Fee earners answer the same questions constantly, and almost none of it reaches the website. That material is the firm's most credible asset and its cheapest source of visibility.",
        addressedBy: ["content-strategy", "seo"],
      },
      {
        title: "Sites explain practice areas rather than problems",
        description:
          "Clients do not search for the name of a practice area; they search for their situation in their own words. A site organised around the firm's structure misses that vocabulary entirely.",
        addressedBy: ["site-architecture", "content-strategy"],
      },
      {
        title: "Enquiries are handled inconsistently",
        description:
          "A first contact made at a difficult moment sets the relationship. Where enquiry handling depends on who is at the desk, the experience varies more than any firm would choose.",
        addressedBy: ["crm-implementation", "workflow-automation"],
      },
    ],
    useCases: ["increase-organic-traffic", "generate-more-leads", "improve-customer-experience"],
    services: ["content-strategy", "seo", "corporate-websites", "crm-implementation"],
    seo: {
      title: "Digital Growth for Legal Practices",
      description:
        "Publishing expertise within professional conduct rules, organising around client situations, and consistent enquiry handling.",
      primaryTopic: "legal sector digital marketing",
      secondaryTopics: ["law firm marketing", "solicitor SEO"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P2",
    cta: { label: "Discuss your firm's visibility", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "What can a regulated firm publish?",
        answer:
          "Explanatory content about the law and about process is generally uncontroversial. Comparative claims, outcome guarantees and anything client-identifying are where the constraints bite, so the firm's own compliance review governs publication.",
      },
      {
        question: "Does legal content still get traffic given AI answers?",
        answer:
          "Purely definitional questions increasingly get answered without a click. Situation-specific content (where someone needs to know what applies to their circumstances) still produces enquiries, and it is also what AI systems cite when they cite anyone.",
      },
    ],
    related: [
      { label: "Professional Services", href: "/industries/professional-services/", type: "INDUSTRY" },
      { label: "Content Strategy", href: "/services/content-strategy/", type: "SERVICE" },
    ],
  },
  {
    slug: "accounting",
    layout: "opportunity-led",
    diagram: "process-transformation",
    title: "Accounting",
    answer:
      "Two pressures at once: compliance work is commoditising, and client onboarding carries administrative load that scales linearly with growth. Digital work addresses both, and the second is usually more urgent.",
    opportunity:
      "Advisory services differentiate where compliance cannot, and automating onboarding frees exactly the capacity needed to deliver them.",
    context:
      "Compliance work is increasingly automated and priced accordingly, while advisory work carries margin and depends on the relationship. Meanwhile, taking on a client involves identity verification, engagement letters, data collection and system setup: largely manual, entirely repetitive, and heaviest in the periods when the practice is busiest. Buyers, especially owner-managed businesses, choose on trust and on whether the firm appears to understand their sector.",
    complianceNotes:
      "Client onboarding is subject to anti-money-laundering identity verification requirements. Automation here supports the process and its record-keeping; it does not remove the practice's obligation to satisfy itself as to identity and risk.",
    problems: [
      {
        title: "Onboarding is manual and peaks with the season",
        description:
          "Identity checks, engagement letters, document collection and system setup consume the same weeks that are already the practice's busiest.",
        addressedBy: ["workflow-automation", "customer-portals"],
      },
      {
        title: "The firm looks like every other firm",
        description:
          "Sites list services that all practices offer. Sector specialism, or a clear statement of who the firm is for, differentiates more than any list of compliance services can.",
        addressedBy: ["content-strategy", "corporate-websites"],
      },
      {
        title: "Client data is scattered across systems",
        description:
          "Practice management, accounting platforms and document storage rarely talk, so staff carry data between them and the same information is entered several times.",
        addressedBy: ["systems-integration", "api-development"],
      },
    ],
    useCases: ["onboard-customers-faster", "reduce-manual-work", "generate-more-leads"],
    services: ["workflow-automation", "systems-integration", "content-strategy", "customer-portals"],
    seo: {
      title: "Digital Growth for Accounting Practices",
      description:
        "Onboarding automation that frees capacity in the busiest weeks, plus differentiation beyond a list of compliance services.",
      primaryTopic: "accounting firm marketing",
      secondaryTopics: ["practice automation", "accountancy marketing"],
      intent: "commercial",
    },
    audience: ["A1", "A6"],
    phase: "P2",
    cta: { label: "Discuss practice efficiency", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Can client onboarding be automated given AML requirements?",
        answer:
          "The collection, verification prompts, chasing and record-keeping can be. The risk assessment and the decision remain the practice's, which is where the obligation sits; automation makes the evidence trail better, not thinner.",
      },
      {
        question: "How do accounting firms differentiate?",
        answer:
          "Usually by sector or by client type rather than by service. A practice that clearly serves a specific kind of business is chosen more readily than one that serves everyone, even when the underlying work is identical.",
      },
    ],
    related: [
      { label: "Onboard customers faster", href: "/use-cases/onboard-customers-faster/", type: "USE CASE" },
      { label: "Financial Services", href: "/industries/financial-services/", type: "INDUSTRY" },
    ],
  },
  {
    slug: "recruitment",
    layout: "journey-led",
    diagram: "content-structure",
    title: "Recruitment",
    answer:
      "Recruitment sites serve two audiences with opposite needs (clients hiring and candidates looking) and most sites are built for one while the other navigates around it.",
    opportunity:
      "Separating the two journeys properly is unusually high-return here, because both audiences are actively searching and both currently arrive at a site designed for someone else.",
    context:
      "Clients assess whether a consultancy understands their sector and can deliver quickly; candidates assess whether the roles are real, current and worth their time. The two need different content, different navigation and different conversion actions. Job listings create a second problem: they generate large numbers of URLs with short lifespans, and how expired roles are handled affects both site quality and candidate trust. Speed matters throughout: the first credible CV and the first response to an application both carry disproportionate weight.",
    problems: [
      {
        title: "One site trying to serve two audiences",
        description:
          "Client-facing and candidate-facing content compete in the same navigation, so both audiences read material written for the other before finding their own.",
        addressedBy: ["site-architecture", "ui-ux-design"],
      },
      {
        title: "Job listings create and then abandon thousands of URLs",
        description:
          "Roles are posted, filled and left. Expired listings that stay indexed waste crawl attention and disappoint candidates who arrive at a closed role.",
        addressedBy: ["technical-seo", "seo-migration"],
      },
      {
        title: "Application handling is slow and opaque",
        description:
          "Candidates who hear nothing assume rejection and stop applying. The reputational cost accrues quietly and shows up as a shrinking talent pool.",
        addressedBy: ["workflow-automation", "crm-implementation"],
      },
    ],
    useCases: ["qualify-leads-automatically", "improve-digital-presence", "reduce-manual-work"],
    services: ["site-architecture", "technical-seo", "workflow-automation", "ui-ux-design"],
    seo: {
      title: "Digital Growth for Recruitment Agencies",
      description:
        "Separate client and candidate journeys, job listing URL handling that does not degrade the site, and faster application response.",
      primaryTopic: "recruitment agency marketing",
      secondaryTopics: ["staffing marketing", "job board SEO"],
      intent: "commercial",
    },
    audience: ["A3", "A1"],
    phase: "P2",
    cta: { label: "Discuss your site structure", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "What should happen to expired job listings?",
        answer:
          "Either removed with a clear message and relevant current roles, or kept only where they still serve a purpose. Leaving thousands indexed wastes crawl attention and sends candidates to dead ends.",
      },
      {
        question: "Should clients and candidates have separate sections?",
        answer:
          "In most cases yes: separate entry points, navigation and calls to action. They want different things, and a single blended journey serves whichever audience the homepage was written for.",
      },
    ],
    related: [
      { label: "Site Architecture", href: "/services/site-architecture/", type: "SERVICE" },
      { label: "Professional Services", href: "/industries/professional-services/", type: "INDUSTRY" },
    ],
  },
  {
    slug: "energy",
    layout: "challenge-led",
    diagram: "system-architecture",
    title: "Energy",
    answer:
      "Two demands pull in opposite directions: technical credibility for informed buyers and specifiers, and process automation for high-volume administrative work with regulatory record-keeping attached.",
    opportunity:
      "Technical buyers in this sector research thoroughly and find little that respects their expertise. Content written at their level is both differentiating and cheap to produce, because the knowledge already exists internally.",
    context:
      "Buyers include specifiers, facilities managers and procurement teams who evaluate on technical specification, compliance and total cost over a long horizon. Sales cycles are long and involve several stakeholders. Behind the front end sits substantial administrative process (surveys, quotations, installations, certifications and reporting), much of it evidenced for regulatory purposes. Both halves of the business are usually under-served digitally, and the administrative half is normally the more expensive problem.",
    problems: [
      {
        title: "Content is written for a general audience nobody in the market is",
        description:
          "Specifiers need specification. Marketing copy pitched at a general reader signals that the supplier does not understand who is evaluating them.",
        addressedBy: ["content-strategy", "seo"],
      },
      {
        title: "Survey-to-installation process is manual and evidenced on paper",
        description:
          "Scheduling, documentation, certification and reporting run on spreadsheets and email, with compliance evidence assembled retrospectively.",
        addressedBy: ["workflow-automation", "custom-software"],
      },
      {
        title: "Long cycles are managed without shared visibility",
        description:
          "Multi-stakeholder purchases spanning months are tracked in individual inboxes, so nobody can say where a deal actually stands.",
        addressedBy: ["crm-implementation", "reporting-dashboards"],
      },
    ],
    useCases: ["reduce-manual-work", "shorten-sales-cycle", "modernise-legacy-processes"],
    services: ["workflow-automation", "custom-software", "content-strategy", "crm-implementation"],
    seo: {
      title: "Digital Growth for Energy & Utilities",
      description:
        "Technical content for informed specifiers, and automation of survey-to-installation process with its compliance record-keeping.",
      primaryTopic: "energy sector digital",
      secondaryTopics: ["utilities digital transformation", "renewables marketing"],
      intent: "commercial",
    },
    audience: ["A2", "A6", "A7"],
    phase: "P3",
    cta: { label: "Discuss operational systems", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Should technical content be simplified for a wider audience?",
        answer:
          "Not at the expense of the specifier. Write for the person who evaluates, and provide a plain-language summary alongside. Simplifying everything loses the audience that decides while gaining one that does not buy.",
      },
      {
        question: "Where does automation return most in this sector?",
        answer:
          "Usually in the documentation and certification trail around installation work: high volume, highly repetitive, and already required to be evidenced, which means the structure is largely defined already.",
      },
    ],
    related: [
      { label: "Manufacturing", href: "/industries/manufacturing/", type: "INDUSTRY" },
      { label: "Custom Software", href: "/services/custom-software/", type: "SERVICE" },
    ],
  },
];
