/**
 * Checklists — the second set.
 *
 * Ordered so the checks that invalidate later work come first. Each says what
 * to verify and why it matters, which is what separates a checklist from a
 * list of services.
 */

import type { Resource } from "@/types/content";

export const moreChecklists: Resource[] = [
  {
    slug: "seo-audit-checklist",
    type: "checklist",
    topic: "SEO",
    title: "SEO Audit Checklist",
    answer:
      "A full audit runs in four passes: can search engines reach and render the site, is it eligible to rank, does the content match the intent it targets, and is anything actively working against it.",
    body: [
      "Access and rendering first, because everything after it is conditional. Robots directives, status codes, redirect chains, sitemap accuracy, and whether the main content is present in server-rendered HTML rather than assembled by JavaScript. A failure here invalidates every later finding.",
      "Then eligibility. Index coverage by section, canonical consistency, duplicate and parameter URLs, and whether pages you care about are actually indexed. A content programme producing unindexed pages looks like a content problem and is a technical one.",
      "Then relevance. For each priority query: does a page exist, does it match the intent the results page reveals, is the answer near the top, and do several pages compete for it. Cannibalisation is found here and nowhere else.",
      "Then the negatives. Manual actions, thin or duplicated templates, unnatural link patterns, and content that contradicts itself across pages. Finish with prioritisation — an audit that lists thirty findings without saying which three matter is a document, not a plan.",
    ],
    supports: ["seo-audit", "technical-seo"],
    seo: {
      title: "SEO Audit Checklist",
      description:
        "Four passes in order: access and rendering, eligibility, relevance, then negatives. Why a finding list without prioritisation is not a plan.",
      primaryTopic: "seo audit checklist",
      secondaryTopics: ["site audit", "SEO review"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: { label: "Read about our SEO Audit", href: "/services/seo-audit/", tier: "T1" },
    faqs: [
      {
        question: "How long should an SEO audit take?",
        answer:
          "Two to three weeks for a thorough one on a mid-sized site. Longer usually means scope creep, and the recommendations go stale before anyone implements them.",
      },
      {
        question: "What is the most commonly missed check?",
        answer:
          "Whether content is present in server-rendered HTML. It is skipped because the page looks fine in a browser, and it is the single check most likely to explain poor AI-crawler visibility.",
      },
    ],
    related: [
      { label: "SEO Audit", href: "/services/seo-audit/", type: "SERVICE" },
      { label: "Technical SEO checklist", href: "/resources/technical-seo-checklist/", type: "CHECKLIST" },
    ],
  },
  {
    slug: "content-audit-checklist",
    type: "checklist",
    topic: "SEO",
    title: "Content Audit Checklist",
    answer:
      "Sort every page into keep, improve, consolidate or remove, judged on whether it earns anything, serves an intent no other page serves, and is still accurate.",
    body: [
      "Start with a complete inventory, not a sample: every indexable URL with impressions, clicks, conversions, last update and inbound internal links. The pages nobody remembers publishing are exactly what the exercise exists to surface.",
      "Apply three questions to each. Does it earn anything — visibility, enquiries, citations, links? Does it serve an intent no other page serves? Is it still true? Failing all three makes it a removal candidate; failing only the third makes it an update.",
      "Group the survivors by intent to find competition. Several pages ranking for the same query is cannibalisation, and consolidating them into the strongest with redirects from the others concentrates what was split.",
      "Finish by repointing internal links. An audit that consolidates and removes without fixing the links that referenced those pages leaves broken paths and orphaned survivors, which undoes most of the gain.",
    ],
    supports: ["content-strategy", "seo"],
    seo: {
      title: "Content Audit Checklist",
      description:
        "Inventory everything, apply three questions, group by intent to find competition, then repoint the links. The step most audits skip.",
      primaryTopic: "content audit checklist",
      secondaryTopics: ["content pruning", "consolidation"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: { label: "Read about SEO Content Strategy", href: "/services/content-strategy/", tier: "T1" },
    faqs: [
      {
        question: "Should we delete pages that get no traffic?",
        answer:
          "Not automatically. Check whether they earn links, citations or assisted conversions first. Remove pages that earn nothing and serve no intent; update the ones that are simply stale.",
      },
      {
        question: "How often should a content audit run?",
        answer:
          "Annually for most sites, or after a migration or strategy change. More frequent full audits consume effort better spent acting on the previous one.",
      },
    ],
    related: [
      { label: "How to run a content audit", href: "/resources/how-to-run-a-content-audit/", type: "GUIDE" },
      { label: "Keyword cannibalisation", href: "/resources/what-is-keyword-cannibalisation/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "site-migration-checklist",
    type: "checklist",
    topic: "Technical SEO",
    title: "Site Migration Checklist",
    answer:
      "A migration is survivable when every URL has a decided destination before design starts, content depth is preserved, and the first fortnight after launch is monitored deliberately.",
    body: [
      "Before anything is designed: a full inventory of existing URLs with their traffic, conversions and inbound links, and a decision for each — kept, redirected in one hop to the closest genuine equivalent, or deliberately retired. Chains, loops and mass redirects to the homepage are the specific patterns that cause damage.",
      "Preserve what earns. Pages with visibility keep their content depth rather than being trimmed to fit a new template, and internal links to them survive the restructure. Most migration losses are self-inflicted here.",
      "Prepare the technical parity checks: server-rendered content on key templates, canonical and structured data behaviour, heading structure, and analytics and search console configured for the new property before launch rather than after.",
      "After launch, monitor for two weeks closely and a quarter loosely. Index coverage, crawl errors, redirect resolution, structured data validity and rankings on priority queries. The first fortnight is when a fixable problem is still cheap to fix.",
    ],
    supports: ["seo-migration", "technical-seo"],
    seo: {
      title: "Site Migration Checklist",
      description:
        "Every URL decided before design, earning pages preserved, parity checks prepared, and the first fortnight monitored deliberately.",
      primaryTopic: "site migration checklist",
      secondaryTopics: ["replatform", "redirects", "migration"],
      intent: "informational",
    },
    audience: ["A7", "A3"],
    phase: "P1",
    cta: { label: "Read about SEO Migration", href: "/services/seo-migration/", tier: "T1" },
    faqs: [
      {
        question: "How much traffic loss is normal after a migration?",
        answer:
          "A short dip while search engines reprocess is normal. A sustained drop is not — it almost always traces to unmapped URLs, lost content depth or a rendering change, all of which are preventable.",
      },
      {
        question: "How long should redirects stay in place?",
        answer:
          "At least a year, longer where external links point at old URLs. Removing them early discards the value of every link and bookmark still using the previous address.",
      },
    ],
    related: [
      { label: "Redirect", href: "/resources/what-is-a-redirect/", type: "GLOSSARY" },
      { label: "SEO Migration", href: "/services/seo-migration/", type: "SERVICE" },
    ],
  },
  {
    slug: "ecommerce-seo-checklist",
    type: "checklist",
    topic: "E-commerce",
    title: "E-commerce SEO Checklist",
    answer:
      "Retail sites fail on four things: faceted navigation generating crawl waste, thin category pages, duplicated variants, and out-of-stock handling that discards accumulated value.",
    body: [
      "Facets first, because they generate the most damage. Decide which filter combinations correspond to real demand and are worth indexing, and block or canonicalise the rest. Left open, filters produce thousands of near-identical URLs that consume crawl effort meant for products.",
      "Then category depth. A heading and a product grid gives a search engine almost nothing on exactly the pages that should capture discovery queries. Genuine buying guidance on category pages is usually the highest-return content work available to a retailer.",
      "Then variants. Colour and size variations that each get a URL split signals across near-identical pages. Decide whether variants are separate products or one product with options, and make canonicals reflect that consistently.",
      "Then lifecycle. Out-of-stock and discontinued products should keep the URL and offer alternatives rather than 404ing, because the page has accumulated links and rankings that are discarded the moment it disappears.",
    ],
    supports: ["ecommerce-seo", "technical-seo"],
    seo: {
      title: "E-commerce SEO Checklist",
      description:
        "Faceted navigation, category depth, variant duplication and out-of-stock handling — the four failures that cap retail search performance.",
      primaryTopic: "ecommerce seo checklist",
      secondaryTopics: ["retail SEO", "faceted navigation"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P2",
    cta: { label: "Read about E-commerce SEO", href: "/services/ecommerce-seo/", tier: "T1" },
    faqs: [
      {
        question: "What should happen to out-of-stock product pages?",
        answer:
          "Keep the URL, state availability honestly and offer alternatives. Removing it discards accumulated links and rankings, and returns visitors to a dead end.",
      },
      {
        question: "Should every filter combination be indexable?",
        answer:
          "No. Index the combinations matching real demand that have content worth ranking; block or canonicalise the rest. Indexing all of them splits signals across near-duplicates and wastes crawl budget.",
      },
    ],
    related: [
      { label: "E-commerce & Retail", href: "/industries/ecommerce/", type: "INDUSTRY" },
      { label: "Crawl budget", href: "/resources/what-is-crawl-budget/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "crm-implementation-checklist",
    type: "checklist",
    topic: "Sales",
    title: "CRM Implementation Checklist",
    answer:
      "CRM projects fail on adoption rather than configuration. Agree the process and the minimum data model first, automate capture wherever possible, and migrate less than you think you need.",
    body: [
      "Map the actual sales process before touching the platform, including how deals really progress rather than how the stages are named. A CRM configured against an idealised process records fiction, and the people entering it know that first.",
      "Define the smallest mandatory data model that supports the decisions you make. Every required field is a tax on the person entering it, and long forms produce records completed carelessly to get past them.",
      "Automate capture. Email, calendar activity and form submissions logged without anyone typing. The ratio of what the system gives back to what it demands is what determines whether it is still used in six months.",
      "Migrate selectively and verify. Bringing over years of unqualified records imports noise and makes reporting worse from day one. Agree what is worth migrating, check a sample after the load, and confirm ownership of every record before switching off the old system.",
    ],
    supports: ["crm-implementation", "sales-automation"],
    seo: {
      title: "CRM Implementation Checklist",
      description:
        "Map the real process, keep the mandatory data model small, automate capture, migrate selectively. Why adoption decides the outcome.",
      primaryTopic: "crm implementation checklist",
      secondaryTopics: ["CRM rollout", "sales process"],
      intent: "informational",
    },
    audience: ["A5", "A2"],
    phase: "P2",
    cta: { label: "Read about CRM Implementation", href: "/services/crm-implementation/", tier: "T1" },
    faqs: [
      {
        question: "Should we migrate all our historical data?",
        answer:
          "Usually not. Importing years of unqualified records makes reporting worse immediately. Migrate what is genuinely useful, and archive the rest somewhere retrievable.",
      },
      {
        question: "Why do CRM rollouts fail?",
        answer:
          "Because they demand manual entry that produces no visible benefit to the person entering it. Adoption follows when the system returns more than it asks for.",
      },
    ],
    related: [
      { label: "CRM Platforms", href: "/technologies/crm-platforms/", type: "TECHNOLOGY" },
      { label: "Lead scoring", href: "/resources/what-is-lead-scoring/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "integration-readiness-checklist",
    type: "checklist",
    topic: "Integration",
    title: "Integration Readiness Checklist",
    answer:
      "Before connecting two systems, confirm four things: which one owns the record, what each exposes, how failures will surface, and who holds the credentials.",
    body: [
      "Ownership first. For every record that will move — customer, order, invoice — decide which system is authoritative. Most integration disputes are this question left unanswered, and no amount of engineering resolves it afterwards.",
      "Then capability. Does each system offer a documented API, are there webhooks for the events you care about, what are the rate limits, and how does authentication work. A system without these can still be integrated, but through fragile routes that need a named owner and a maintenance budget.",
      "Then failure behaviour. What happens when the receiving system is briefly unavailable, when a message arrives twice, or when a record is rejected. Deciding this during design costs an hour; discovering it in production costs a reconciliation exercise.",
      "Then credentials and change. Who holds the keys, how they rotate, and who is notified when a vendor announces a breaking change. Integrations rarely break spontaneously — they break when something on either side changes and nobody was watching.",
    ],
    supports: ["systems-integration", "workflow-automation"],
    seo: {
      title: "Integration Readiness Checklist",
      description:
        "Record ownership, system capability, failure behaviour and credential management — the four things to settle before connecting anything.",
      primaryTopic: "integration readiness",
      secondaryTopics: ["systems integration", "API integration"],
      intent: "informational",
    },
    audience: ["A7", "A6"],
    phase: "P1",
    cta: { label: "Read about Systems Integration", href: "/services/systems-integration/", tier: "T1" },
    faqs: [
      {
        question: "What if two systems both claim to own a record?",
        answer:
          "Resolve it before building. An integration that syncs both directions without an authoritative source produces conflicts that are expensive to unpick and impossible to audit.",
      },
      {
        question: "How do we know an integration is still working?",
        answer:
          "Only if it tells you. Alerting on failures and a periodic reconciliation between the two systems are what turn a silent failure into a notification.",
      },
    ],
    related: [
      { label: "Webhook", href: "/resources/what-is-a-webhook/", type: "GLOSSARY" },
      { label: "Connect business systems", href: "/use-cases/connect-business-systems/", type: "USE CASE" },
    ],
  },
  {
    slug: "ai-project-checklist",
    type: "checklist",
    topic: "AI",
    title: "AI Project Readiness Checklist",
    answer:
      "Before starting an AI project, confirm four things: a specific repeated task, accessible data, a defined confidence boundary, and a named owner after launch.",
    body: [
      "The task must be specific and repeated. 'Classify inbound enquiries by service area' is a project; 'use AI in marketing' is a budget line with no completion criterion. Frequency matters too — a task performed twice a month rarely repays the build.",
      "The data has to be reachable. Whatever the task needs — documents, records, history — must be accessible and reasonably consistent. This is where most stalled initiatives actually stopped, and checking it takes days rather than the months a data programme would.",
      "The confidence boundary must be decided during design. Where does the system stop and hand to a person, what context travels with the handover, and what does the person see. A system that answers everything answers wrongly at the edges, and that is a design choice rather than an accident.",
      "Ownership after launch is the check most often skipped. Models change, prompts drift, source documents go stale and providers alter terms. An AI system without a named owner degrades quietly, and the first sign is usually a customer complaint.",
    ],
    supports: ["ai-readiness-assessment", "ai-consulting"],
    seo: {
      title: "AI Project Readiness Checklist",
      description:
        "A specific repeated task, accessible data, a defined confidence boundary and a named owner. The four checks before an AI project starts.",
      primaryTopic: "ai project checklist",
      secondaryTopics: ["AI readiness", "AI adoption"],
      intent: "informational",
    },
    audience: ["A2", "A7", "A6"],
    phase: "P1",
    cta: { label: "Read about AI Readiness Assessment", href: "/services/ai-readiness-assessment/", tier: "T1" },
    faqs: [
      {
        question: "Do we need a data platform before starting?",
        answer:
          "No. You need the specific data the first task requires to be accessible and reasonably consistent. That is far smaller than a data programme and can be done project by project.",
      },
      {
        question: "What makes a good first AI project?",
        answer:
          "A repeated task with unstructured input, a human check, and errors that are visible and cheap to correct. Irreversible or regulated decisions are the wrong place to start.",
      },
    ],
    related: [
      { label: "When should a business invest in AI?", href: "/resources/when-should-a-business-invest-in-ai/", type: "DECISION" },
      { label: "Introduce AI into operations", href: "/use-cases/introduce-ai-into-operations/", type: "USE CASE" },
    ],
  },
  {
    slug: "accessibility-checklist",
    type: "checklist",
    topic: "Accessibility",
    title: "Website Accessibility Checklist",
    answer:
      "Check four things in order: can the page be operated by keyboard alone, is every control and image labelled, does the text meet contrast and sizing requirements, and does the structure make sense without sight.",
    body: [
      "Keyboard first, because it is the fastest way to find real failures. Tab through the whole page: every interactive element should be reachable, in a sensible order, with a visible focus indicator, and nothing should trap focus. Modals should return focus where it came from.",
      "Then labelling. Every form field with a real label rather than a placeholder, every button with a name that says what it does, every meaningful image with alternative text describing its information rather than its appearance, and decorative images marked as decorative.",
      "Then the visual requirements. Text contrast of at least 4.5:1, non-text controls at 3:1, interactive targets at least 24×24 pixels, text that reflows at 400% zoom without horizontal scrolling, and nothing conveyed by colour alone.",
      "Then structure. One H1, headings in order without skipped levels, landmarks used properly, and error messages that say what went wrong and how to fix it rather than just turning a field red. Then test the primary journey with a screen reader, because that is what automation cannot judge.",
    ],
    supports: ["accessibility-audit", "ui-ux-design"],
    seo: {
      title: "Website Accessibility Checklist",
      description:
        "Keyboard operation, labelling, contrast and sizing, then structure. What to check in order and what automated tools cannot judge.",
      primaryTopic: "accessibility checklist",
      secondaryTopics: ["WCAG", "keyboard navigation", "screen readers"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: { label: "Read about our Accessibility Audit", href: "/services/accessibility-audit/", tier: "T1" },
    faqs: [
      {
        question: "What is the quickest meaningful accessibility check?",
        answer:
          "Unplug the mouse and complete your primary journey with the keyboard. It finds unreachable controls, missing focus indicators and focus traps in minutes, and those are among the most damaging failures.",
      },
      {
        question: "Can automated tools confirm accessibility?",
        answer:
          "They catch a minority — contrast, missing labels, heading order, target size. Whether alternative text is meaningful or a flow is usable with a screen reader requires a person.",
      },
    ],
    related: [
      { label: "Accessibility Standards", href: "/technologies/accessibility-standards/", type: "TECHNOLOGY" },
      { label: "Accessibility Audit", href: "/services/accessibility-audit/", type: "SERVICE" },
    ],
  },
  {
    slug: "analytics-implementation-checklist",
    type: "checklist",
    topic: "Analytics",
    title: "Analytics Implementation Checklist",
    answer:
      "Decide which questions the data must answer before configuring anything, then track only the events that inform them, verify they fire correctly, and document what each one means.",
    body: [
      "Start from decisions, not events. List the questions the business actually asks — which channels produce qualified enquiries, where the form is abandoned, which pages assist conversions — and work back to the minimum tracking that answers them. Implementations built the other way collect everything and answer nothing.",
      "Define events and their properties before implementation, with names that will still make sense in a year. Inconsistent naming across a site is the most common reason analytics data cannot be aggregated later.",
      "Verify each event fires once, on the real interaction, with the expected properties, on both desktop and mobile. Conversion events are the ones most often broken and least often checked, because nobody submits the live form after launch.",
      "Then handle the boundaries: exclude internal traffic, keep personal data out of URLs and event properties, respect consent, and document the definition of each metric alongside its implementation so two reports cannot quietly diverge.",
    ],
    supports: ["analytics-implementation", "conversion-rate-optimization"],
    seo: {
      title: "Analytics Implementation Checklist",
      description:
        "Start from decisions, define events before building, verify they fire, then handle consent and definitions. Why conversion events break unnoticed.",
      primaryTopic: "analytics implementation checklist",
      secondaryTopics: ["event tracking", "measurement plan"],
      intent: "informational",
    },
    audience: ["A4", "A8"],
    phase: "P1",
    cta: { label: "Read about Analytics Implementation", href: "/services/analytics-implementation/", tier: "T1" },
    faqs: [
      {
        question: "How many events should we track?",
        answer:
          "As few as answer your actual questions. Large event catalogues built to be comprehensive are rarely maintained and produce inconsistent data that nobody trusts enough to act on.",
      },
      {
        question: "Why does our conversion count not match reality?",
        answer:
          "Usually a tracking fault rather than an analytics one: the event fires twice, fires on page load rather than submission, or was verified on a test form and never on the live one.",
      },
    ],
    related: [
      { label: "Marketing attribution", href: "/resources/what-is-marketing-attribution/", type: "GLOSSARY" },
      { label: "Prove marketing ROI", href: "/use-cases/prove-marketing-roi/", type: "USE CASE" },
    ],
  },
  {
    slug: "pre-launch-seo-checklist",
    type: "checklist",
    topic: "Technical SEO",
    title: "Pre-Launch SEO Checklist",
    answer:
      "Before a site goes live, verify the crawler's view rather than the browser's: content in server-rendered HTML, one H1, canonicals self-referencing, no staging noindex, and every old URL mapped.",
    body: [
      "The single highest-value pass is fetching key templates as a crawler would and reading what comes back. Content present in the HTML, a single H1, headings in order, structured data validating, and metadata unique per template. Everything here is cheap before launch and expensive after.",
      "Check the directives that silently remove a site. A staging noindex left in place, a robots rule blocking a directory, or a canonical pointing at the development domain will each take pages out of eligibility while the site looks perfect to a visitor.",
      "Confirm URL continuity where a site is being replaced: every existing address either kept or redirected in one hop, no chains or loops, and the sitemap listing only canonical, indexable, live URLs.",
      "Then measurement: analytics on every template, conversion events firing on the real form, and search console verified for the live property before launch rather than a week after, so the first days of data exist.",
    ],
    supports: ["technical-seo", "corporate-websites"],
    seo: {
      title: "Pre-Launch SEO Checklist",
      description:
        "Verify the crawler's view: rendered content, one H1, self-referencing canonicals, no staging noindex, URLs mapped and measurement live.",
      primaryTopic: "pre-launch seo checklist",
      secondaryTopics: ["go live", "launch checks"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: { label: "Read about Technical SEO", href: "/services/technical-seo/", tier: "T1" },
    faqs: [
      {
        question: "What is most often missed before launch?",
        answer:
          "A staging noindex directive, and conversion tracking that was verified on a test form but never on the live one. Both are silent: the site looks correct while being invisible or unmeasurable.",
      },
      {
        question: "Should we launch on a Friday?",
        answer:
          "Preferably not. The first forty-eight hours are when a fixable problem is cheapest to fix, and that is when the people who could fix it are least available.",
      },
    ],
    related: [
      { label: "Website launch checklist", href: "/resources/website-launch-checklist/", type: "CHECKLIST" },
      { label: "Site migration checklist", href: "/resources/site-migration-checklist/", type: "CHECKLIST" },
    ],
  },
];
