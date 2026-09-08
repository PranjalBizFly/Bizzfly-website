/**
 * Technologies — platform and engineering practice.
 *
 * These describe how decisions are made, not which vendors we are partnered
 * with. Every entry carries a `whenNotToUse`, because a technology page
 * without one is a logo wall. No partnership, certification or vendor tier
 * is claimed anywhere: none has been verified.
 */

import type { Technology } from "@/types/content";

export const platformTechnologies: Technology[] = [
  {
    slug: "data-platforms",
    title: "Data Platforms",
    category: "Data",
    group: "search-data",
    layout: "architecture-led",
    answer:
      "A data platform brings figures from several operational systems into one place with agreed definitions, so questions can be answered once rather than reconciled every time they are asked.",
    whyItMatters:
      "Most reporting disputes are definition disputes. Until a business agrees what counts as an order, the tooling underneath cannot resolve the disagreement.",
    choices: [
      {
        name: "Managed cloud warehouse",
        rationale:
          "Separates analytical queries from the systems running the business, so reporting cannot slow operations. Managed rather than self-hosted because maintaining a warehouse is a full-time job that produces no business value.",
      },
      {
        name: "Scheduled extraction over streaming",
        rationale:
          "Most business questions are answered fine by data that is an hour old. Streaming multiplies cost and failure modes, and should follow a demonstrated need for freshness rather than precede it.",
      },
      {
        name: "Transformations in version control",
        rationale:
          "Definitions written as reviewable code rather than clicked together in a tool. When two reports disagree, the difference is then visible in a diff rather than buried in a settings panel.",
      },
      {
        name: "One documented definition per metric",
        rationale:
          "Kept alongside the transformation that produces it. A metric whose definition lives in someone's memory becomes a different metric when that person leaves.",
      },
    ],
    whenNotToUse: [
      "Two source systems and a handful of recurring questions — well-defined reports are cheaper and easier to trust",
      "Where the underlying definitions are still disputed; a warehouse will encode the disagreement rather than settle it",
      "As a first step toward AI, when the actual requirement is access to a few specific documents",
    ],
    decisionCriteria: [
      "How many systems hold data the question needs",
      "How often the question is asked, and by whom",
      "Whether anyone can state the definition of the metric today",
    ],
    services: ["business-intelligence", "analytics-implementation", "reporting-dashboards"],
    seo: {
      title: "Data Platforms",
      description:
        "Warehouses, scheduled extraction and definitions in version control — and why a platform encodes a disagreement it cannot settle.",
      primaryTopic: "data platform architecture",
      secondaryTopics: ["data warehouse", "analytics engineering"],
      intent: "informational",
    },
    audience: ["A7", "A8"],
    phase: "P1",
    cta: { label: "Read about Business Intelligence", href: "/services/business-intelligence/", tier: "T1" },
    faqs: [
      {
        question: "Do we need a data warehouse?",
        answer:
          "Only when several sources and a growing set of questions make separate reporting unworkable. With two systems and a few recurring questions, well-defined reports are cheaper and faster to trust.",
      },
      {
        question: "Why do two reports show different revenue?",
        answer:
          "Almost always because they define revenue differently — different date, different treatment of refunds, different inclusion rules. That is a definition problem, and no platform resolves it for you.",
      },
    ],
    related: [
      { label: "Data warehouse", href: "/resources/what-is-a-data-warehouse/", type: "GLOSSARY" },
      { label: "Reporting Dashboards", href: "/services/reporting-dashboards/", type: "SERVICE" },
    ],
  },
  {
    slug: "crm-platforms",
    title: "CRM Platforms",
    category: "Operations",
    group: "automation",
    layout: "ecosystem-led",
    answer:
      "A CRM holds the record of who your customers are and what has happened with them. Which one you choose matters far less than whether the people doing the selling actually use it.",
    whyItMatters:
      "A CRM nobody updates is worse than no CRM, because decisions get made on data everyone believes is current and is not.",
    choices: [
      {
        name: "Fit the process before the features",
        rationale:
          "Most platforms in the category can do most things. The question that predicts success is whether the sales process can be represented without contortion, because a CRM that fights the process loses.",
      },
      {
        name: "A small mandatory data model",
        rationale:
          "Few required fields, each of which someone acts on. Long mandatory forms are the most reliable way to get a pipeline full of records completed carelessly to get past the form.",
      },
      {
        name: "Automatic capture over manual entry",
        rationale:
          "Email, calendar and form activity logged without anyone typing it. Every field a person has to fill by hand is a field that will be empty when it matters.",
      },
      {
        name: "Integration path checked before purchase",
        rationale:
          "Whether the platform exposes a usable API decides what the next three years cost. It is easier to check this before buying than to discover it during an integration.",
      },
    ],
    whenNotToUse: [
      "A handful of customers and one salesperson — a shared document is genuinely adequate and honest about it",
      "As a substitute for a defined sales process; the tool will encode whatever confusion already exists",
      "Where the real problem is lead quality, which a CRM records but does not improve",
    ],
    decisionCriteria: [
      "Can the actual sales process be represented without workarounds",
      "How much can be captured automatically rather than typed",
      "Whether the platform has a documented, versioned API",
    ],
    services: ["crm-implementation", "sales-automation", "systems-integration"],
    seo: {
      title: "CRM Platforms",
      description:
        "Choosing a CRM on process fit, automatic capture and integration path — and why adoption decides the outcome more than features.",
      primaryTopic: "crm platforms",
      secondaryTopics: ["CRM selection", "sales systems"],
      intent: "informational",
    },
    audience: ["A5", "A2"],
    phase: "P2",
    cta: { label: "Read about CRM Implementation", href: "/services/crm-implementation/", tier: "T1" },
    faqs: [
      {
        question: "Which CRM is best?",
        answer:
          "The one your team will keep updated. Most platforms in the category are capable enough; the differences that matter in practice are process fit, how much is captured automatically, and whether it integrates with what you already run.",
      },
      {
        question: "Why did our CRM rollout fail?",
        answer:
          "Usually because it demanded manual entry that produced no visible benefit to the person entering it. Adoption follows when the CRM gives back more than it asks for.",
      },
    ],
    related: [
      { label: "CRM Implementation", href: "/services/crm-implementation/", type: "SERVICE" },
      { label: "Sales Automation", href: "/services/sales-automation/", type: "SERVICE" },
    ],
  },
  {
    slug: "mobile-platforms",
    title: "Mobile Platforms",
    category: "Engineering",
    group: "web",
    layout: "ecosystem-led",
    answer:
      "There are three routes to a mobile experience — a responsive web application, a cross-platform native app, or fully native apps — and the right one is decided by what device capabilities you genuinely need.",
    whyItMatters:
      "Building a native app when a website would do is one of the more expensive mistakes available, and it recurs because an app feels more substantial than a site.",
    choices: [
      {
        name: "Responsive web first",
        rationale:
          "No install friction, no store review, one codebase, and it is findable in search. For most business use cases this is the honest answer, and it is the one most often skipped.",
      },
      {
        name: "Cross-platform native where install matters",
        rationale:
          "One codebase producing both platforms, appropriate when you need push notifications, offline use or device hardware. Accepts a performance ceiling that most business applications never reach.",
      },
      {
        name: "Fully native for demanding cases",
        rationale:
          "Two codebases and two skill sets, justified when the experience depends on platform-specific capability or sustained graphics and sensor performance.",
      },
      {
        name: "Store presence as a distribution decision",
        rationale:
          "An app store listing is a marketing channel with review latency attached. Treating it as a release constraint rather than a technical detail changes how releases are planned.",
      },
    ],
    whenNotToUse: [
      "As a marketing exercise — an app nobody has a reason to install is a cost with an ongoing maintenance tail",
      "For content that should be findable in search, which an app removes from the web entirely",
      "Before a responsive web version has demonstrated that the use case is real",
    ],
    decisionCriteria: [
      "Does the experience need offline use, push or device hardware",
      "Will people use it often enough to justify installing it",
      "Whether the content also needs to be discoverable in search",
    ],
    services: ["web-applications", "custom-software", "ui-ux-design"],
    seo: {
      title: "Mobile Platforms",
      description:
        "Responsive web, cross-platform native, or fully native. Which capability requirements justify each route, and when an app is the wrong answer.",
      primaryTopic: "mobile app platforms",
      secondaryTopics: ["native vs web", "mobile development"],
      intent: "informational",
    },
    audience: ["A7", "A2"],
    phase: "P2",
    cta: { label: "Read about Web Applications", href: "/services/web-applications/", tier: "T1" },
    faqs: [
      {
        question: "Do we need a native app?",
        answer:
          "Only if you need offline use, push notifications or device hardware, and people will use it often enough to justify installing it. Otherwise a responsive web application delivers the same value without install friction or store review.",
      },
      {
        question: "Will an app help our search visibility?",
        answer:
          "No — it generally reduces it. Content inside an app is not on the web, so it cannot be crawled, ranked or cited. Anything that should be findable belongs on the site.",
      },
    ],
    related: [
      { label: "Native apps vs web apps", href: "/resources/native-vs-web-apps/", type: "COMPARISON" },
      { label: "Web Stack", href: "/technologies/web-stack/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "security-and-access",
    title: "Security & Access",
    category: "Engineering",
    group: "software",
    layout: "architecture-led",
    answer:
      "Most breaches in systems of this size come from credentials and dependencies rather than exotic attacks. Access control, secret handling and update discipline cover the majority of realistic risk.",
    whyItMatters:
      "Security failures are usually operational rather than clever, which means they are preventable by process rather than by expertise nobody has.",
    choices: [
      {
        name: "Least privilege by default",
        rationale:
          "Every account and integration gets the narrowest permissions that let it work. It costs a little setup time and limits how far a single compromised credential reaches.",
      },
      {
        name: "Secrets outside the repository",
        rationale:
          "Credentials in environment configuration or a managed secret store, never in code. A secret committed once is in the history permanently, whoever deletes it later.",
      },
      {
        name: "Dependencies updated on a schedule",
        rationale:
          "Most vulnerabilities arrive through libraries rather than through code written for the project. Regular small updates are far safer than an annual large one that nobody wants to test.",
      },
      {
        name: "Single sign-on where it exists",
        rationale:
          "One identity to grant and one to revoke. Access that must be removed from nine systems individually is access that will still be live somewhere after someone leaves.",
      },
    ],
    whenNotToUse: [
      "As a replacement for a specialist assessment where the risk profile genuinely warrants one",
      "As a compliance claim — these are engineering practices, not a certification",
      "As a reason to delay delivery indefinitely; security added continuously beats security deferred",
    ],
    decisionCriteria: [
      "What the blast radius of one compromised credential is today",
      "Whether anyone can list the third-party dependencies in production",
      "How access is revoked when someone leaves",
    ],
    services: ["custom-software", "cloud-migration", "systems-integration"],
    seo: {
      title: "Security & Access",
      description:
        "Least privilege, secrets outside the repository, scheduled dependency updates and single sign-on — the practices that cover realistic risk.",
      primaryTopic: "application security practices",
      secondaryTopics: ["access control", "dependency management"],
      intent: "informational",
    },
    audience: ["A7", "A8"],
    phase: "P2",
    cta: { label: "Read our engineering standards", href: "/technologies/engineering-standards/", tier: "T1" },
    faqs: [
      {
        question: "Is this a security certification?",
        answer:
          "No. These are engineering practices applied to what we build. Where a formal certification or penetration test is required, that is specialist work commissioned separately, and we would say so rather than imply coverage we do not have.",
      },
      {
        question: "What is the most common real-world weakness?",
        answer:
          "Credentials with broader permissions than needed, and dependencies that have not been updated. Neither is sophisticated, and together they account for a large share of practical risk.",
      },
    ],
    related: [
      { label: "Single sign-on", href: "/resources/what-is-single-sign-on/", type: "GLOSSARY" },
      { label: "Cloud & Hosting", href: "/technologies/cloud-and-hosting/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "testing-and-quality",
    title: "Testing & Quality",
    category: "Engineering",
    group: "practice",
    layout: "capability-led",
    answer:
      "Automated tests exist to make change safe, not to reach a coverage number. We test the behaviour that would be expensive to break and leave the rest to review.",
    whyItMatters:
      "The cost of software is dominated by changing it later. Tests are what decide whether the third year of a system is affordable.",
    choices: [
      {
        name: "Test behaviour, not implementation",
        rationale:
          "Tests written against what the system does survive refactoring. Tests written against how it does it break every time the code improves, which teaches teams to avoid improving it.",
      },
      {
        name: "Concentrate on the expensive failures",
        rationale:
          "Money movement, data integrity, permissions and anything irreversible. Coverage percentages reward testing trivial code, which is why they are a poor target.",
      },
      {
        name: "A small number of end-to-end journeys",
        rationale:
          "The few flows whose failure would be noticed immediately, checked in a real browser. Large end-to-end suites become slow and flaky, and a flaky suite is ignored.",
      },
      {
        name: "Checks run automatically on every change",
        rationale:
          "Types, linting, tests and a build, before merge. A check that has to be remembered is a check that will be skipped under deadline pressure.",
      },
    ],
    whenNotToUse: [
      "Exhaustive tests on a prototype whose purpose is to be thrown away",
      "Chasing a coverage percentage, which rewards testing the code least likely to break",
      "As a substitute for review; tests confirm behaviour, review catches design problems",
    ],
    decisionCriteria: [
      "What would be most expensive to break without noticing",
      "Whether the team can currently deploy without a manual checklist",
      "How long the suite takes, because a slow suite gets bypassed",
    ],
    services: ["custom-software", "web-applications"],
    seo: {
      title: "Testing & Quality",
      description:
        "Test behaviour rather than implementation, concentrate on expensive failures, and run checks automatically. Why coverage is a poor target.",
      primaryTopic: "software testing practices",
      secondaryTopics: ["automated testing", "code quality"],
      intent: "informational",
    },
    audience: ["A7", "A2"],
    phase: "P2",
    cta: { label: "Read our engineering standards", href: "/technologies/engineering-standards/", tier: "T1" },
    faqs: [
      {
        question: "What test coverage should we aim for?",
        answer:
          "No particular number. Coverage measures which lines ran, not whether the important behaviour is protected. A system with 40% coverage concentrated on money and permissions is safer than one at 90% spread evenly.",
      },
      {
        question: "Are automated tests worth it on a small project?",
        answer:
          "For anything that will be changed again, yes — but proportionately. A handful of tests around the behaviour that would be costly to break returns more than a comprehensive suite nobody maintains.",
      },
    ],
    related: [
      { label: "Technical debt", href: "/resources/what-is-technical-debt/", type: "GLOSSARY" },
      { label: "Observability", href: "/technologies/observability/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "observability",
    title: "Observability",
    category: "Engineering",
    group: "software",
    layout: "architecture-led",
    answer:
      "Observability is being able to answer what a system is doing without deploying new code to find out. It is logging, metrics and alerting designed together rather than added after an incident.",
    whyItMatters:
      "The time between something breaking and someone understanding why is the part of an incident a business actually feels.",
    choices: [
      {
        name: "Structured logs with a request identifier",
        rationale:
          "Logs as data rather than prose, with one identifier threading a single request across services. Without that thread, diagnosing anything distributed means guessing which lines belong together.",
      },
      {
        name: "A small number of meaningful metrics",
        rationale:
          "Error rate, latency, throughput and saturation, per service. Dashboards with forty panels are read by nobody during the incident they were built for.",
      },
      {
        name: "Alerts on symptoms, not causes",
        rationale:
          "Alert when users are affected — errors rising, requests slowing — rather than on every resource threshold. Cause-based alerting produces noise, and noisy alerting is eventually muted.",
      },
      {
        name: "Errors reported with context",
        rationale:
          "An exception without the request, user and input that produced it is a puzzle. Captured context turns a two-hour investigation into a five-minute one.",
      },
    ],
    whenNotToUse: [
      "A static site with no server-side behaviour worth observing",
      "Buying an expensive platform before anyone has agreed what would constitute an incident",
      "As a substitute for fixing a known recurring failure, which monitoring will simply document",
    ],
    decisionCriteria: [
      "How long the last incident took to diagnose, and why",
      "Whether anyone would know about a failure before a customer reported it",
      "Whether logs can be searched, or only read",
    ],
    services: ["custom-software", "cloud-migration"],
    seo: {
      title: "Observability",
      description:
        "Structured logs, few meaningful metrics, symptom-based alerts and errors captured with context — designed in rather than added after an incident.",
      primaryTopic: "application observability",
      secondaryTopics: ["monitoring", "logging", "alerting"],
      intent: "informational",
    },
    audience: ["A7"],
    phase: "P2",
    cta: { label: "Read about Cloud Migration", href: "/services/cloud-migration/", tier: "T1" },
    faqs: [
      {
        question: "How is observability different from monitoring?",
        answer:
          "Monitoring tells you a known thing broke. Observability lets you investigate an unknown failure without shipping new code to gather the data — which is the situation most real incidents present.",
      },
      {
        question: "What should we add first?",
        answer:
          "Structured logs with a request identifier and error reporting with context. Together they cover most of the diagnostic gap, and both are cheap relative to a full monitoring platform.",
      },
    ],
    related: [
      { label: "Testing & Quality", href: "/technologies/testing-and-quality/", type: "TECHNOLOGY" },
      {
        label: "Build scalable digital infrastructure",
        href: "/use-cases/build-scalable-digital-infrastructure/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "payments-and-billing",
    title: "Payments & Billing",
    category: "Integrations",
    group: "automation",
    layout: "architecture-led",
    answer:
      "Taking a payment is the easy part. The complexity is in what surrounds it — refunds, retries, partial states, reconciliation and tax — and that is where billing projects overrun.",
    whyItMatters:
      "Billing errors are visible to customers and to finance simultaneously, which makes them disproportionately expensive to recover from.",
    choices: [
      {
        name: "Hosted payment pages where possible",
        rationale:
          "Card details never touch your systems, which removes the largest part of compliance scope. The trade is less control over the checkout appearance, which is usually worth making.",
      },
      {
        name: "The provider as the source of truth",
        rationale:
          "Payment state read from the provider rather than mirrored in your database. Two systems tracking the same money will disagree, and reconciling them is permanent work.",
      },
      {
        name: "Idempotent operations",
        rationale:
          "The same request repeated must not charge twice. Networks fail mid-request, users double-click, and webhooks are redelivered — all of which happen in normal operation, not only in edge cases.",
      },
      {
        name: "Reconciliation designed in",
        rationale:
          "A scheduled comparison between what the provider recorded and what your system believes. Without it, discrepancies are discovered by a customer or an accountant.",
      },
    ],
    whenNotToUse: [
      "Building bespoke subscription logic that an established billing provider already handles",
      "Storing card details, which almost no business of this size has a reason to do",
      "Custom invoicing where the accounting system already produces compliant documents",
    ],
    decisionCriteria: [
      "Whether the model is one-off, subscription or usage-based",
      "Which system finance treats as authoritative today",
      "How refunds, failures and partial payments must behave",
    ],
    services: ["systems-integration", "custom-software", "web-applications"],
    seo: {
      title: "Payments & Billing",
      description:
        "Hosted pages, provider as source of truth, idempotent operations and designed-in reconciliation — where billing complexity actually lives.",
      primaryTopic: "payments integration",
      secondaryTopics: ["billing", "subscriptions", "reconciliation"],
      intent: "informational",
    },
    audience: ["A7", "A8"],
    phase: "P2",
    cta: { label: "Read about Systems Integration", href: "/services/systems-integration/", tier: "T1" },
    faqs: [
      {
        question: "Should we store card details?",
        answer:
          "Almost certainly not. Hosted payment pages and provider-held tokens give you repeat billing without card data entering your systems, which removes most of the compliance surface.",
      },
      {
        question: "Why do payment integrations overrun?",
        answer:
          "Because the estimate covers the successful path. Refunds, retries, partial payments, disputes, currency and reconciliation are where the work is, and they are rarely in the original scope.",
      },
    ],
    related: [
      { label: "Webhook", href: "/resources/what-is-a-webhook/", type: "GLOSSARY" },
      { label: "Integrations", href: "/technologies/integrations/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "accessibility-standards",
    title: "Accessibility Standards",
    category: "Practice",
    group: "practice",
    layout: "capability-led",
    answer:
      "WCAG defines what accessible means at three conformance levels. AA is the level most organisations are held to, and reaching it reliably means building to it rather than auditing for it afterwards.",
    whyItMatters:
      "Retrofitting accessibility costs several times what building to it costs, and the people excluded in the meantime are frequently the intended audience.",
    choices: [
      {
        name: "WCAG 2.2 AA as the delivery target",
        rationale:
          "The level referenced by most procurement and legislation. Level AAA is not achievable across a whole site and claiming it is a signal that nobody checked.",
      },
      {
        name: "Contrast verified against tokens, not eyeballed",
        rationale:
          "Every colour pairing computed and asserted in the design system, so a failing combination cannot be introduced by a later change without the check failing.",
      },
      {
        name: "Semantic HTML before ARIA",
        rationale:
          "A native button behaves correctly for keyboard, screen reader and touch without configuration. ARIA is a repair mechanism, and incorrect ARIA is worse than none.",
      },
      {
        name: "Manual checks for what automation cannot judge",
        rationale:
          "Automated tools catch a minority of real problems. Whether alternative text is useful and whether a flow makes sense with a screen reader require a person.",
      },
    ],
    whenNotToUse: [
      "As a claim of certified conformance, which requires specialist audit including testing with assistive technology users",
      "As a launch-week checklist; almost everything expensive to fix is decided during design",
      "As a reason to avoid interactivity, which usually makes an interface worse for everyone",
    ],
    decisionCriteria: [
      "Whether the organisation has a legal or procurement conformance requirement",
      "Whether contrast and target sizes are enforced by the design system or by memory",
      "Whether anyone has attempted the primary journey using only a keyboard",
    ],
    services: ["accessibility-audit", "ui-ux-design", "corporate-websites"],
    seo: {
      title: "Accessibility Standards",
      description:
        "WCAG 2.2 AA as a build target: contrast asserted in tokens, semantic HTML before ARIA, and manual checks for what automation cannot judge.",
      primaryTopic: "wcag accessibility standards",
      secondaryTopics: ["WCAG 2.2", "conformance", "inclusive design"],
      intent: "informational",
    },
    audience: ["A7", "A3"],
    phase: "P2",
    cta: { label: "Read about our Accessibility Audit", href: "/services/accessibility-audit/", tier: "T1" },
    faqs: [
      {
        question: "Which WCAG level should we target?",
        answer:
          "AA, at version 2.2. It is the level referenced by most legislation and procurement. AAA includes requirements that cannot be met across a whole site, so a claim of full AAA conformance is usually a sign nobody verified it.",
      },
      {
        question: "Can accessibility be tested automatically?",
        answer:
          "Partly. Automated checks reliably catch contrast, missing labels, heading order and target size. Whether alternative text is meaningful, or a flow is usable with a screen reader, needs a person.",
      },
    ],
    related: [
      {
        label: "Accessibility commitment",
        href: "/company/accessibility-commitment/",
        type: "COMPANY",
      },
      {
        label: "Website accessibility checklist",
        href: "/resources/accessibility-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
];
