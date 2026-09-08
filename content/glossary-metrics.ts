/**
 * Glossary — metrics, platform and delivery terms.
 *
 * Definition first, then the part that is usually left out: what the term
 * conceals, or where it is routinely misread. A definition that only repeats
 * the vendor's description is not worth a page.
 */

import type { Resource } from "@/types/content";

export const metricsGlossary: Resource[] = [
  {
    slug: "what-is-organic-traffic",
    type: "glossary",
    topic: "Analytics",
    title: "Organic Traffic",
    answer:
      "Organic traffic is visits arriving from unpaid search results. It excludes paid clicks, direct arrivals and referrals — and increasingly it excludes people who found you in a search result and never clicked.",
    body: [
      "The definition matters because the number is shrinking for reasons unrelated to performance. As results pages answer more questions directly, a brand can be more visible than last year while its organic sessions fall. Read alone, that reads as failure.",
      "It is also an aggregate that hides its own composition. Organic traffic to a pricing page and organic traffic to a definition page mean entirely different things commercially, and a rise driven by the second while the first falls is usually bad news reported as good.",
      "The useful practice is to segment by page type and query intent, and to read it alongside impressions, branded search volume and enquiries. Where those diverge from sessions, the divergence is the finding.",
    ],
    supports: ["seo", "analytics-implementation"],
    seo: {
      title: "What Is Organic Traffic?",
      description:
        "Visits from unpaid search — and why the number now falls for reasons unrelated to performance. What it hides and what to read alongside it.",
      primaryTopic: "organic traffic",
      secondaryTopics: ["SEO metrics", "analytics"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: { label: "Read about SEO Services", href: "/services/seo/", tier: "T1" },
    faqs: [
      {
        question: "Why is our organic traffic falling but rankings are stable?",
        answer:
          "Usually because results pages are answering more queries directly. You keep the position and lose the click. Impressions holding steady while clicks fall is the signature of that pattern.",
      },
      {
        question: "Is organic traffic a good primary KPI?",
        answer:
          "Not on its own. It aggregates page types with different jobs and is affected by zero-click behaviour you do not control. Enquiries, segmented by source, are a better commercial measure.",
      },
    ],
    related: [
      { label: "Zero-click search", href: "/resources/what-is-zero-click-search/", type: "GLOSSARY" },
      { label: "How to measure search visibility", href: "/resources/how-to-measure-search-visibility/", type: "GUIDE" },
    ],
  },
  {
    slug: "what-is-bounce-rate",
    type: "glossary",
    topic: "Analytics",
    title: "Bounce Rate",
    answer:
      "Bounce rate is the share of sessions that ended without a second interaction. It measures single-interaction visits, which is not the same as dissatisfaction — and treating the two as identical produces bad decisions.",
    body: [
      "A visitor who arrives, reads a complete answer and leaves satisfied bounces. So does one who arrives, finds the wrong page and leaves immediately. The metric cannot distinguish them, which is why it is one of the most confidently misread numbers in analytics.",
      "It also varies by page type in ways that mean nothing. A glossary page will always bounce more than a pricing page, because it is doing a different job. Comparing them, or comparing your site to a benchmark, compares two different mixes of page type.",
      "Where it is genuinely useful is as a change signal on a single page: a rate that jumps after a redesign or a template change is worth investigating, because the page's job did not change but something else did.",
    ],
    supports: ["analytics-implementation", "conversion-rate-optimization"],
    seo: {
      title: "What Is Bounce Rate?",
      description:
        "The share of single-interaction sessions — not a satisfaction measure. Why it is misread, and the one case where it is genuinely useful.",
      primaryTopic: "bounce rate",
      secondaryTopics: ["analytics", "engagement metrics"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: { label: "Read about Analytics Implementation", href: "/services/analytics-implementation/", tier: "T1" },
    faqs: [
      {
        question: "What is a good bounce rate?",
        answer:
          "There is no portable figure, because it depends entirely on page type. A page that answers a question completely should bounce heavily. Compare a page to its own history, not to a benchmark.",
      },
      {
        question: "Should we try to reduce bounce rate?",
        answer:
          "Only where a low-interaction visit indicates a real failure. Adding pagination or interstitials to force a second interaction improves the metric and makes the experience worse.",
      },
    ],
    related: [
      { label: "Conversion rate", href: "/resources/what-is-conversion-rate/", type: "GLOSSARY" },
      { label: "Website conversion checklist", href: "/resources/website-conversion-checklist/", type: "CHECKLIST" },
    ],
  },
  {
    slug: "what-is-domain-authority",
    type: "glossary",
    topic: "SEO",
    title: "Domain Authority",
    answer:
      "Domain Authority is a third-party tool's prediction of how likely a site is to rank, expressed as a score. It is a vendor metric, not a search engine one, and no search engine uses it.",
    body: [
      "The distinction is routinely lost in proposals. A score produced by a company that also sells the tool measuring it is a model of ranking, built from a crawl of the web that is necessarily partial. It correlates with performance because it is built to, not because search engines consult it.",
      "That makes it useful for comparison and misleading as a target. Comparing your score to a competitor's gives a rough sense of relative link profile. Setting a goal of raising it invites buying the links that raise the score, which is precisely the behaviour that carries penalty risk.",
      "Where an agency reports authority score movement as a result, ask what commercial measure moved alongside it. A rising score with flat enquiries describes an improved model input, not an improved business.",
    ],
    supports: ["seo", "digital-pr"],
    seo: {
      title: "What Is Domain Authority?",
      description:
        "A third-party prediction of ranking ability, not a search engine metric. Why it is useful for comparison and misleading as a target.",
      primaryTopic: "domain authority",
      secondaryTopics: ["authority score", "link metrics"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: { label: "Read about SEO Services", href: "/services/seo/", tier: "T1" },
    faqs: [
      {
        question: "Does Google use Domain Authority?",
        answer:
          "No. It is a metric produced by third-party tool vendors, modelled from their own crawl of the web. Search engines have their own internal signals and do not consult it.",
      },
      {
        question: "Should we set a Domain Authority target?",
        answer:
          "No. Targeting a modelled score encourages buying the inputs to that model, which is the behaviour carrying the most penalty risk. Target the commercial outcome instead.",
      },
    ],
    related: [
      { label: "Backlink", href: "/resources/what-is-a-backlink/", type: "GLOSSARY" },
      { label: "Digital PR & Link Earning", href: "/services/digital-pr/", type: "SERVICE" },
    ],
  },
  {
    slug: "what-is-a-backlink",
    type: "glossary",
    topic: "SEO",
    title: "Backlink",
    answer:
      "A backlink is a link from another website to yours. Search engines treat it as a signal that someone found the page worth referencing — which is why the source matters far more than the count.",
    body: [
      "One link from a publication your market reads carries more weight than a hundred from directories nobody visits. Volume-based link building persists because volume is easy to sell and easy to report, not because it works better.",
      "Links that were paid for, exchanged reciprocally, or placed in content written purely to host them are against search engine guidelines. The risk is asymmetric: the benefit is temporary, the manual action is not, and it lands on your domain rather than the supplier's.",
      "What earns links reliably is material worth referencing — original analysis, a genuinely useful tool, a clear explanation of something usually explained badly. That is slow, resists shortcuts, and is why credible providers will not promise a monthly quantity.",
    ],
    supports: ["digital-pr", "seo"],
    seo: {
      title: "What Is a Backlink?",
      description:
        "A link from another site, treated as a reference signal. Why the source outweighs the count, and why bought links carry asymmetric risk.",
      primaryTopic: "backlink",
      secondaryTopics: ["link building", "digital PR"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: { label: "Read about Digital PR", href: "/services/digital-pr/", tier: "T1" },
    faqs: [
      {
        question: "How many backlinks do we need?",
        answer:
          "There is no number. A handful from sources your market trusts outperforms hundreds from directories. Any provider quoting a monthly quantity is describing volume they can manufacture, which is the kind that carries risk.",
      },
      {
        question: "Are paid links worth the risk?",
        answer:
          "No. The gain is temporary and the penalty attaches to your domain rather than to whoever sold them. Recovery takes far longer than the advantage lasted.",
      },
    ],
    related: [
      { label: "Domain authority", href: "/resources/what-is-domain-authority/", type: "GLOSSARY" },
      { label: "How to build search visibility", href: "/resources/how-to-build-search-visibility/", type: "GUIDE" },
    ],
  },
  {
    slug: "what-is-anchor-text",
    type: "glossary",
    topic: "SEO",
    title: "Anchor Text",
    answer:
      "Anchor text is the visible, clickable words of a link. It tells both a reader and a search engine what the destination is about, which makes it a description rather than a decoration.",
    body: [
      "Links reading 'click here' or 'read more' describe nothing. They cost nothing in ranking terms directly, but they waste the clearest opportunity a page has to say what it is linking to — and they are worse for screen reader users, who often navigate by link list.",
      "The opposite failure is over-optimisation. Every internal link using the identical exact-match phrase reads as manipulation rather than description, and on external links it is one of the clearer patterns associated with manual action.",
      "The workable standard is the one that would apply if search engines did not exist: describe the destination in natural language, varying with context, so the sentence still reads properly with the link removed.",
    ],
    supports: ["seo"],
    seo: {
      title: "What Is Anchor Text?",
      description:
        "The visible words of a link, describing its destination. Why 'click here' wastes it and why identical exact-match anchors read as manipulation.",
      primaryTopic: "anchor text",
      secondaryTopics: ["internal linking", "accessibility"],
      intent: "informational",
    },
    audience: ["A4"],
    phase: "P1",
    cta: { label: "Read about On-Page SEO", href: "/services/on-page-seo/", tier: "T1" },
    faqs: [
      {
        question: "Should anchor text always contain the target keyword?",
        answer:
          "No. Natural, varied, descriptive phrasing performs better and reads better. Identical exact-match anchors repeated across a site are a recognised manipulation pattern.",
      },
      {
        question: "Does anchor text affect accessibility?",
        answer:
          "Yes, considerably. Screen reader users frequently navigate by listing links, and a page of 'read more' entries is unusable in that mode.",
      },
    ],
    related: [
      { label: "Internal linking", href: "/resources/what-is-internal-linking/", type: "GLOSSARY" },
      { label: "Website accessibility checklist", href: "/resources/accessibility-checklist/", type: "CHECKLIST" },
    ],
  },
  {
    slug: "what-is-page-speed",
    type: "glossary",
    topic: "Technical SEO",
    title: "Page Speed",
    answer:
      "Page speed is how quickly a page becomes visible and usable. It is measured two ways — in a controlled laboratory test, and from what real visitors actually experienced — and the two frequently disagree.",
    body: [
      "Laboratory tools simulate one device on one connection and produce a repeatable score, which makes them useful for comparing two versions of a page. Field data records what happened to real visitors on their own hardware, which is what search engines assess and what customers experience.",
      "A perfect laboratory score alongside a failing field assessment is common and not a contradiction. It means the test machine is faster than your audience's, and the audience is the one that matters.",
      "The commercial argument is stronger than the ranking one. Speed is a modest ranking input that mainly separates otherwise similar pages; its effect on abandonment and conversion is direct and much larger.",
    ],
    supports: ["website-performance", "technical-seo"],
    seo: {
      title: "What Is Page Speed?",
      description:
        "How quickly a page becomes visible and usable, measured in the lab and in the field. Why the two disagree and which one matters.",
      primaryTopic: "page speed",
      secondaryTopics: ["performance", "core web vitals"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: { label: "Read about Website Performance", href: "/services/website-performance/", tier: "T1" },
    faqs: [
      {
        question: "Why is our lab score good but the assessment failing?",
        answer:
          "Because the assessment uses field data from real visitors, whose devices and networks are usually slower than the test environment. The field figure is the one search engines and customers experience.",
      },
      {
        question: "How much does speed affect rankings?",
        answer:
          "Modestly, and mainly between pages of similar relevance. The stronger case for fixing it is abandonment and conversion, where the effect is direct.",
      },
    ],
    related: [
      { label: "Core Web Vitals", href: "/resources/what-is-core-web-vitals/", type: "GLOSSARY" },
      { label: "Website Performance", href: "/services/website-performance/", type: "SERVICE" },
    ],
  },
  {
    slug: "what-is-a-conversion-funnel",
    type: "glossary",
    topic: "Conversion",
    title: "Conversion Funnel",
    answer:
      "A conversion funnel is a model of the stages a visitor passes through before acting — typically awareness, consideration, decision. It is a planning tool, not a description of how people actually behave.",
    body: [
      "The model is useful because it forces a question most sites never ask: which stage is this page for? Pages that try to serve awareness and decision simultaneously usually convince nobody, and the funnel makes that visible.",
      "Where it misleads is in implying a single orderly path. Real buyers enter at the middle, leave, return through a different channel, and consult sources you never see. Treating the model as a literal sequence produces measurement that reports a tidy journey nobody took.",
      "Used well, it is a way of checking coverage rather than tracking individuals: is there a page for each stage, does each link sensibly to the next, and is each measured against the job it is actually doing.",
    ],
    supports: ["conversion-rate-optimization", "digital-strategy"],
    seo: {
      title: "What Is a Conversion Funnel?",
      description:
        "A model of the stages before action. Where it genuinely helps, and why treating it as a literal sequence produces misleading measurement.",
      primaryTopic: "conversion funnel",
      secondaryTopics: ["buyer journey", "CRO"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: { label: "Read about Conversion Optimisation", href: "/services/conversion-rate-optimization/", tier: "T1" },
    faqs: [
      {
        question: "Do buyers really follow a funnel?",
        answer:
          "Not literally. They enter mid-way, leave, return through other channels and consult sources you cannot see. The funnel is useful for checking content coverage, not for describing individual behaviour.",
      },
      {
        question: "How many pages does each stage need?",
        answer:
          "As many as there are distinct questions at that stage. The common gap is the middle: businesses publish awareness content and decision pages, and nothing that helps someone compare options.",
      },
    ],
    related: [
      { label: "Search intent", href: "/resources/what-is-search-intent/", type: "GLOSSARY" },
      { label: "Marketing attribution", href: "/resources/what-is-marketing-attribution/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "what-is-lead-scoring",
    type: "glossary",
    topic: "Sales",
    title: "Lead Scoring",
    answer:
      "Lead scoring assigns a number to an enquiry based on attributes and behaviour, so sales attention goes to the enquiries most likely to convert. It encodes a judgement, which means it inherits whatever bias that judgement had.",
    body: [
      "Scores usually combine fit — company size, sector, role — with engagement, such as pages viewed or emails opened. The fit half is generally reliable. The engagement half is weaker than it looks: a competitor researching you and a serious buyer behave almost identically.",
      "The most common failure is scoring built from opinion and never checked against outcomes. If nobody has compared scores against which enquiries actually closed, the model is a formalised guess that is now harder to argue with because it produces a number.",
      "It is also easy to over-build. For most businesses a simple, explicit rule that routes obviously good-fit enquiries quickly beats an elaborate weighted model nobody in sales trusts or understands.",
    ],
    supports: ["sales-automation", "crm-implementation"],
    seo: {
      title: "What Is Lead Scoring?",
      description:
        "Scoring enquiries by fit and behaviour to direct sales attention. Why the engagement half is weak and why unvalidated models formalise a guess.",
      primaryTopic: "lead scoring",
      secondaryTopics: ["sales automation", "CRM"],
      intent: "informational",
    },
    audience: ["A5", "A3"],
    phase: "P1",
    cta: { label: "Read about Sales Automation", href: "/services/sales-automation/", tier: "T1" },
    faqs: [
      {
        question: "How do we know if our lead scoring works?",
        answer:
          "Compare scores against what actually closed. If high-scoring leads do not convert better than low-scoring ones, the model is encoding an assumption rather than a pattern.",
      },
      {
        question: "Should scoring be automatic or manual?",
        answer:
          "Start with an explicit rule simple enough that sales can state it. Elaborate weighted models are hard to validate and are usually ignored by the people they are meant to help.",
      },
    ],
    related: [
      { label: "Qualify leads automatically", href: "/use-cases/qualify-leads-automatically/", type: "USE CASE" },
      { label: "CRM Implementation", href: "/services/crm-implementation/", type: "SERVICE" },
    ],
  },
  {
    slug: "what-is-a-customer-data-platform",
    type: "glossary",
    topic: "Analytics",
    title: "Customer Data Platform",
    answer:
      "A customer data platform collects customer data from several systems into unified profiles that other tools can use. It is a category of product, and for most businesses it is premature.",
    body: [
      "The promise is a single view of the customer assembled automatically, available to marketing, sales and support. Where a business genuinely has many touchpoints and high volume, that is valuable and hard to build by hand.",
      "The catch is that the platform inherits your data quality rather than fixing it. If two systems disagree about who a customer is, the platform will unify them into a confidently wrong profile. Identity resolution is the hard part, and it is a definitions problem before it is a tooling one.",
      "For most small and mid-sized businesses the honest sequence is: agree the definitions, connect the two or three systems that matter, and see whether the remaining gap justifies a platform. Buying one first tends to produce an expensive integration project with no owner.",
    ],
    supports: ["analytics-implementation", "systems-integration"],
    seo: {
      title: "What Is a Customer Data Platform?",
      description:
        "Unified customer profiles assembled from several systems. Why identity resolution is a definitions problem and when a CDP is premature.",
      primaryTopic: "customer data platform",
      secondaryTopics: ["CDP", "customer data", "martech"],
      intent: "informational",
    },
    audience: ["A3", "A7"],
    phase: "P2",
    cta: { label: "Read about Systems Integration", href: "/services/systems-integration/", tier: "T1" },
    faqs: [
      {
        question: "Do we need a CDP?",
        answer:
          "Only with genuinely many touchpoints and enough volume that manual unification is impractical. With two or three systems, connecting them directly is cheaper and forces the definitions to be agreed.",
      },
      {
        question: "Will a CDP fix our data quality?",
        answer:
          "No. It unifies whatever it is given, including contradictions, and presents the result confidently. Definitions and ownership have to be resolved first.",
      },
    ],
    related: [
      { label: "Improve data quality", href: "/use-cases/improve-data-quality/", type: "USE CASE" },
      { label: "Data Platforms", href: "/technologies/data-platforms/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "what-is-etl",
    type: "glossary",
    topic: "Data",
    title: "ETL",
    answer:
      "ETL stands for extract, transform, load — the process of taking data out of source systems, reshaping it into a consistent form, and loading it somewhere it can be analysed.",
    body: [
      "The ordering matters less than the vocabulary suggests. Modern practice frequently loads raw data first and transforms it afterwards, which keeps the original available when a definition turns out to be wrong. What stays constant is that data has to be moved and reshaped before it can be compared.",
      "Transformation is where the business logic lives, and therefore where the disagreements surface. Deciding that an order counts on dispatch rather than on payment is a business decision expressed as code, which is why transformations belong in version control and not in a settings panel.",
      "The failure mode is silent. A source system adds a field, changes a format or starts sending nulls, and the pipeline keeps running while producing subtly wrong figures. Validation on the way in is what turns that into an alert rather than a quarter of bad reporting.",
    ],
    supports: ["business-intelligence", "analytics-implementation"],
    seo: {
      title: "What Is ETL?",
      description:
        "Extract, transform, load — moving and reshaping data for analysis. Why transformation is business logic and why failures are silent.",
      primaryTopic: "etl",
      secondaryTopics: ["data pipeline", "ELT", "data engineering"],
      intent: "informational",
    },
    audience: ["A7", "A8"],
    phase: "P2",
    cta: { label: "Read about Business Intelligence", href: "/services/business-intelligence/", tier: "T1" },
    faqs: [
      {
        question: "What is the difference between ETL and ELT?",
        answer:
          "The order of the last two steps. ELT loads raw data first and transforms it in the destination, which keeps the original available when a definition changes. For most current warehouses ELT is the default.",
      },
      {
        question: "Why do pipelines produce wrong numbers?",
        answer:
          "Usually because a source changed and nothing checked. Pipelines fail silently by default, so validation and alerting on the way in are what prevent a quarter of quietly incorrect reporting.",
      },
    ],
    related: [
      { label: "Data pipeline", href: "/resources/what-is-a-data-pipeline/", type: "GLOSSARY" },
      { label: "Data warehouse", href: "/resources/what-is-a-data-warehouse/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "what-is-a-data-pipeline",
    type: "glossary",
    topic: "Data",
    title: "Data Pipeline",
    answer:
      "A data pipeline is the automated path data takes from a source system to wherever it is used, including the scheduling, transformation, error handling and recovery that keep it running unattended.",
    body: [
      "The distinction from a one-off script is everything that happens when something goes wrong. A script moves data once. A pipeline handles a source being unavailable, a run overlapping the previous one, a partial failure halfway through, and the need to re-process yesterday after a bug is fixed.",
      "Backfill is the requirement most often missed. When a transformation turns out to be wrong, the correction has to be applied to historical data as well as new — and a pipeline that can only move today's records makes that a manual project.",
      "Ownership decides whether it survives. Pipelines break when source systems change, credentials rotate and schemas drift. Without a named owner and an alert that reaches them, the first sign of failure is usually a figure someone did not believe.",
    ],
    supports: ["business-intelligence", "systems-integration"],
    seo: {
      title: "What Is a Data Pipeline?",
      description:
        "The automated path data takes, including scheduling, failure handling and backfill. Why backfill is the requirement most often missed.",
      primaryTopic: "data pipeline",
      secondaryTopics: ["data engineering", "ETL", "orchestration"],
      intent: "informational",
    },
    audience: ["A7"],
    phase: "P2",
    cta: { label: "Read about Business Intelligence", href: "/services/business-intelligence/", tier: "T1" },
    faqs: [
      {
        question: "How is a pipeline different from a script?",
        answer:
          "A script moves data once. A pipeline handles scheduling, overlapping runs, partial failures, alerting and re-processing history after a fix — which is most of the real work.",
      },
      {
        question: "What breaks pipelines most often?",
        answer:
          "Changes in the source system: a renamed field, a changed format, a new null. They are silent by default, which is why validation on ingest matters more than clever transformation.",
      },
    ],
    related: [
      { label: "ETL", href: "/resources/what-is-etl/", type: "GLOSSARY" },
      { label: "Workflow orchestration", href: "/resources/what-is-workflow-orchestration/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "what-is-single-sign-on",
    type: "glossary",
    topic: "Software",
    title: "Single Sign-On",
    answer:
      "Single sign-on lets people access several systems with one set of credentials, authenticated centrally. It reduces password sprawl and makes access something you can grant and revoke in one place.",
    body: [
      "The operational argument is the strongest one. When someone leaves, access has to be removed everywhere — and access removed from nine systems individually is access that will still be live somewhere. Central identity turns that into a single action.",
      "It also improves security in a less obvious way: fewer passwords means less reuse, and central authentication makes multi-factor enforcement a policy rather than a per-system project.",
      "The trade is concentration. One identity provider becomes both a single point of failure and a high-value target, so it needs stronger protection than any individual system it fronts. That is usually a good trade, and it should be made deliberately rather than by default.",
    ],
    supports: ["systems-integration", "custom-software"],
    seo: {
      title: "What Is Single Sign-On?",
      description:
        "One credential across systems, authenticated centrally. Why offboarding is the strongest argument, and what concentrating identity costs.",
      primaryTopic: "single sign-on",
      secondaryTopics: ["SSO", "identity", "access control"],
      intent: "informational",
    },
    audience: ["A7", "A8"],
    phase: "P2",
    cta: { label: "Read about Security & Access", href: "/technologies/security-and-access/", tier: "T1" },
    faqs: [
      {
        question: "Is single sign-on more secure?",
        answer:
          "Generally yes, because it reduces password reuse and makes multi-factor authentication and offboarding enforceable centrally. It concentrates risk in the identity provider, which then needs stronger protection than the systems it fronts.",
      },
      {
        question: "What happens if the identity provider is down?",
        answer:
          "Access to everything behind it is affected, which is why break-glass accounts and a documented recovery path are part of implementing it rather than an afterthought.",
      },
    ],
    related: [
      { label: "Security & Access", href: "/technologies/security-and-access/", type: "TECHNOLOGY" },
      { label: "API", href: "/resources/what-is-an-api/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "what-is-a-design-system",
    type: "glossary",
    topic: "Web",
    title: "Design System",
    answer:
      "A design system is a set of reusable components and the decisions behind them — colour, type, spacing, states — recorded so that the same problem is not re-solved differently on every page.",
    body: [
      "A component library is only half of it. The half that makes a system durable is the recorded reasoning: which colour pairings are permitted and why, what a heading level means, when a card is appropriate. Without that, teams reuse the components and still produce inconsistent pages.",
      "The economics come from repetition. On a small site a design system is overhead. Across a large site maintained by several people over years, it is what prevents the slow divergence where each new page is slightly different from the last.",
      "The best test of one is whether constraints are enforced rather than documented. Contrast ratios asserted in a check that fails the build are a system; contrast ratios listed in a document are a suggestion.",
    ],
    supports: ["ui-ux-design", "corporate-websites"],
    seo: {
      title: "What Is a Design System?",
      description:
        "Reusable components plus the recorded decisions behind them. Why the reasoning is the durable half and why enforcement beats documentation.",
      primaryTopic: "design system",
      secondaryTopics: ["component library", "design tokens"],
      intent: "informational",
    },
    audience: ["A4", "A7"],
    phase: "P2",
    cta: { label: "Read about UI/UX Design", href: "/services/ui-ux-design/", tier: "T1" },
    faqs: [
      {
        question: "Do we need a design system for one website?",
        answer:
          "Rarely at first. It pays off where several people maintain a site over years, or where one brand spans several products. On a single small site it is overhead that slows the first release.",
      },
      {
        question: "What makes a design system actually work?",
        answer:
          "Enforcement. Constraints checked automatically — contrast, spacing, type scale — hold. Constraints written in a document drift within months of the people who wrote them moving on.",
      },
    ],
    related: [
      { label: "Structured content", href: "/resources/what-is-structured-content/", type: "GLOSSARY" },
      { label: "UI/UX Design", href: "/services/ui-ux-design/", type: "SERVICE" },
    ],
  },
  {
    slug: "what-is-progressive-enhancement",
    type: "glossary",
    topic: "Web",
    title: "Progressive Enhancement",
    answer:
      "Progressive enhancement is building so the core content and functions work with HTML alone, then layering JavaScript on top. The page is useful before the enhancement arrives, and remains useful if it never does.",
    body: [
      "It is often mistaken for supporting old browsers. The modern argument is different: scripts fail for ordinary reasons — a flaky connection, a blocked CDN, a parse error, a crawler that does not execute them — and a page whose content only exists after JavaScript runs has no fallback for any of those.",
      "It matters more now because of who is reading. Many AI crawlers execute little or no JavaScript, so client-rendered content is invisible to exactly the systems increasingly deciding whether a business gets recommended.",
      "In practice it means server-rendered content, forms that submit without JavaScript, links that are real links, and interactivity added as an improvement rather than as a prerequisite for reading the page.",
    ],
    supports: ["website-performance", "corporate-websites"],
    seo: {
      title: "What Is Progressive Enhancement?",
      description:
        "Core content works without JavaScript, enhancement layers on top. Why the modern argument is failure modes and AI crawlers, not old browsers.",
      primaryTopic: "progressive enhancement",
      secondaryTopics: ["server rendering", "resilience"],
      intent: "informational",
    },
    audience: ["A7"],
    phase: "P2",
    cta: { label: "Read about Website Performance", href: "/services/website-performance/", tier: "T1" },
    faqs: [
      {
        question: "Is progressive enhancement still relevant?",
        answer:
          "More than before. The argument is no longer old browsers but failure modes and machine readers: flaky networks, blocked scripts, and AI crawlers that execute little or no JavaScript.",
      },
      {
        question: "Does it mean avoiding JavaScript?",
        answer:
          "No. It means the content and core actions do not depend on it. Interactivity is layered on top, so a failure degrades the experience rather than removing the page.",
      },
    ],
    related: [
      { label: "Server-side rendering", href: "/resources/what-is-server-side-rendering/", type: "GLOSSARY" },
      { label: "Web Stack", href: "/technologies/web-stack/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "what-is-a-service-level-agreement",
    type: "glossary",
    topic: "Company",
    title: "Service Level Agreement",
    answer:
      "A service level agreement states the service a supplier commits to — response times, availability, resolution targets — and what happens when it is missed. Without the consequence, it is a statement of intent.",
    body: [
      "The commitments that matter are usually the boring ones: how quickly someone responds, what counts as an emergency, what hours are covered, and how long a fix should take. Availability percentages get attention and are rarely the thing that hurts.",
      "Read the definitions rather than the numbers. A four-hour response target during business hours in one time zone, on a definition of 'critical' the supplier decides, is a very different commitment from what the headline implies.",
      "The consequence clause is what makes it an agreement. Service credits are the common mechanism and are usually small relative to the disruption — which is a reason to treat an SLA as an expectation-setting document rather than as insurance.",
    ],
    supports: ["website-maintenance"],
    seo: {
      title: "What Is a Service Level Agreement?",
      description:
        "Committed response, availability and resolution targets, plus the consequence for missing them. Why the definitions matter more than the numbers.",
      primaryTopic: "service level agreement",
      secondaryTopics: ["SLA", "support", "vendor management"],
      intent: "informational",
    },
    audience: ["A8", "A2"],
    phase: "P2",
    cta: { label: "Read about Website Maintenance", href: "/services/website-maintenance/", tier: "T1" },
    faqs: [
      {
        question: "What should an SLA actually cover?",
        answer:
          "Response time, covered hours, how severity is defined and by whom, resolution expectations, and the consequence when a target is missed. Availability percentages get most of the attention and are usually the least relevant.",
      },
      {
        question: "Are service credits meaningful compensation?",
        answer:
          "Rarely. They are typically small relative to the disruption. Treat an SLA as a way of setting expectations and escalation paths, not as insurance against loss.",
      },
    ],
    related: [
      { label: "Website Maintenance & Support", href: "/services/website-maintenance/", type: "SERVICE" },
      { label: "Total cost of ownership", href: "/resources/what-is-total-cost-of-ownership/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "what-is-total-cost-of-ownership",
    type: "glossary",
    topic: "Company",
    title: "Total Cost of Ownership",
    answer:
      "Total cost of ownership is what something costs across its whole life, not what it costs to acquire. For software it includes hosting, maintenance, updates, support, training and eventual replacement.",
    body: [
      "The build is usually the smaller number. A system that costs a fixed sum to deliver then needs hosting, dependency updates, security patching, occasional fixes and someone who understands it — every year, for as long as it runs. Business cases that fund the first and not the rest are how systems become liabilities.",
      "It is also the honest way to compare building against buying. A subscription looks expensive next to a one-off build until the build's ongoing costs are included, at which point the comparison frequently reverses.",
      "The cost most often omitted is knowledge. When the people who built or configured something leave, the cost of the next change rises sharply unless documentation and handover were treated as deliverables rather than courtesies.",
    ],
    supports: ["custom-software", "website-maintenance"],
    seo: {
      title: "What Is Total Cost of Ownership?",
      description:
        "Whole-life cost, not acquisition cost. Why the build is the smaller number and why knowledge is the most commonly omitted line.",
      primaryTopic: "total cost of ownership",
      secondaryTopics: ["TCO", "build vs buy", "budgeting"],
      intent: "informational",
    },
    audience: ["A8", "A2"],
    phase: "P1",
    cta: { label: "Read about Custom Software Development", href: "/services/custom-software/", tier: "T1" },
    faqs: [
      {
        question: "What is usually missing from a software business case?",
        answer:
          "Ownership after launch — hosting, monitoring, dependency updates, security patching and support — and the cost of the knowledge walking out when the original team moves on.",
      },
      {
        question: "How does TCO change a build-versus-buy decision?",
        answer:
          "Often decisively. A subscription that looks expensive against a one-off build frequently wins once the build's annual ownership costs are included over the same period.",
      },
    ],
    related: [
      { label: "Custom software vs off-the-shelf", href: "/resources/custom-software-vs-off-the-shelf/", type: "COMPARISON" },
      { label: "Technical debt", href: "/resources/what-is-technical-debt/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "what-is-a-minimum-viable-product",
    type: "glossary",
    topic: "Software",
    title: "Minimum Viable Product",
    answer:
      "A minimum viable product is the smallest version that tests the riskiest assumption in a plan. It is an experiment with a question attached, not a cheap first release of the full idea.",
    body: [
      "The word doing the work is 'viable'. Something has to be genuinely usable enough that the response to it means something; a demonstration nobody depends on produces polite feedback rather than evidence.",
      "The word most often ignored is 'minimum'. Scope grows because every stakeholder has one more thing that is obviously essential, and the result is a small version of everything rather than a complete version of the one thing being tested.",
      "The discipline is to name the assumption first. 'We believe operations teams will accept an automated first pass if they can override it' is testable. 'We want to see if people like it' is not, and it produces a build with no criterion for having answered anything.",
    ],
    supports: ["custom-software", "web-applications"],
    seo: {
      title: "What Is a Minimum Viable Product?",
      description:
        "The smallest version that tests the riskiest assumption. Why 'viable' and 'minimum' both matter, and why the assumption must be named first.",
      primaryTopic: "minimum viable product",
      secondaryTopics: ["MVP", "product discovery"],
      intent: "informational",
    },
    audience: ["A2", "A7"],
    phase: "P1",
    cta: { label: "Read about Custom Software Development", href: "/services/custom-software/", tier: "T1" },
    faqs: [
      {
        question: "How small should an MVP be?",
        answer:
          "Small enough to answer one question, complete enough that someone genuinely depends on it. If nobody relies on it, the feedback is opinion rather than evidence.",
      },
      {
        question: "Why do MVPs grow?",
        answer:
          "Because each stakeholder adds one obviously essential thing. Naming the assumption being tested up front gives you a criterion for refusing additions that do not help answer it.",
      },
    ],
    related: [
      { label: "Launch a digital product", href: "/use-cases/launch-a-digital-product/", type: "USE CASE" },
      { label: "Build a custom business platform", href: "/use-cases/build-a-custom-business-platform/", type: "USE CASE" },
    ],
  },
  {
    slug: "what-is-workflow-orchestration",
    type: "glossary",
    topic: "Automation",
    title: "Workflow Orchestration",
    answer:
      "Workflow orchestration coordinates a sequence of steps across systems, handling order, dependencies, retries and failures — so a process that spans several tools behaves as one thing rather than several.",
    body: [
      "The need appears as soon as a process has more than two steps that can fail independently. Step three should not run if step two failed; a step that times out should be retried a few times and then escalate; and the whole run should be visible rather than inferred from side effects.",
      "It is distinct from triggering. A webhook starting an action is automation; knowing that the action is the second of five, that the third depends on it, and that the run as a whole either completed or did not, is orchestration.",
      "The question that decides whether you need it is what happens on a partial failure. If the honest answer is 'somebody notices eventually and re-runs it by hand', the process has outgrown simple triggers.",
    ],
    supports: ["workflow-automation", "systems-integration"],
    seo: {
      title: "What Is Workflow Orchestration?",
      description:
        "Coordinating multi-step processes across systems with order, retries and visibility. How it differs from triggering, and when you need it.",
      primaryTopic: "workflow orchestration",
      secondaryTopics: ["automation", "process automation"],
      intent: "informational",
    },
    audience: ["A6", "A7"],
    phase: "P2",
    cta: { label: "Read about Workflow Automation", href: "/services/workflow-automation/", tier: "T1" },
    faqs: [
      {
        question: "When do we need orchestration rather than simple automation?",
        answer:
          "When a process has several steps that can fail independently and a partial failure currently means someone notices later and re-runs it by hand. That is the point where visibility and retry logic stop being optional.",
      },
      {
        question: "Is orchestration the same as an integration platform?",
        answer:
          "Overlapping but not identical. Integration moves data between systems; orchestration governs the order, dependencies and failure behaviour of a multi-step process that may use those integrations.",
      },
    ],
    related: [
      { label: "Data pipeline", href: "/resources/what-is-a-data-pipeline/", type: "GLOSSARY" },
      { label: "Automation Platforms", href: "/technologies/automation-platforms/", type: "TECHNOLOGY" },
    ],
  },
];
