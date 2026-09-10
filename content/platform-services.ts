/**
 * Systems, AI and support services.
 *
 * The common thread is ownership after delivery. Each of these produces
 * something that has to keep working — an integration, a portal, a dashboard,
 * a running site — so scope here states the maintenance position rather than
 * leaving it to be discovered afterwards.
 */

import type { Service } from "@/types/content";

export const platformServices: Service[] = [
  {
    slug: "ai-readiness-assessment",
    practice: "ai-automation",
    parent: "ai-consulting",
    group: "ai",
    layout: "process-led",
    diagram: "ai-workflow",
    title: "AI Readiness Assessment",
    answer:
      "A structured evaluation of whether specific tasks in your business are suited to AI, and whether the data behind them supports it. It frequently concludes that some are not, which is the point.",
    seo: {
      title: "AI Readiness Assessment",
      description:
        "Task-level and data-level feasibility assessed before any build, with a written position on what should not be automated.",
      primaryTopic: "ai readiness assessment",
      secondaryTopics: ["AI feasibility", "AI strategy"],
      intent: "commercial",
    },
    audience: ["A2", "A7", "A6"],
    phase: "P1",
    problems: [
      "There is pressure to adopt AI without a specific problem attached",
      "Pilots have been run and none has reached production",
      "Nobody can say whether the data would support what is being proposed",
    ],
    outcomes: [
      "A shortlist of tasks where AI is genuinely suited, with reasoning",
      "An honest statement of what your data does and does not currently support",
      "A first project scoped small enough to prove or disprove the assumptions",
    ],
    whoFor: [
      "Organisations being asked for an AI strategy without a defined problem",
      "Teams whose pilots keep stalling before production",
      "Businesses wanting a defensible reason to say no to some proposals",
    ],
    included: [
      "Task inventory: volume, variability, tolerance for error and cost of a mistake",
      "Data assessment — whether the material a system would need actually exists and is accurate",
      "Feasibility judgement per task, including tasks that should stay manual",
      "Failure-mode analysis: what happens when the system is confidently wrong",
      "Governance starting points — permitted data, decisions requiring a person, ownership",
      "A first project recommendation, sized to produce evidence within a quarter",
    ],
    approach: [
      {
        index: 1,
        title: "Inventory",
        description:
          "The tasks actually being done, with frequency and time observed rather than estimated. Recall of one's own repetitive work is consistently unreliable.",
        duration: "Week 1",
      },
      {
        index: 2,
        title: "Assess",
        description:
          "Each task against suitability and data availability. Most organisations find the constraint is documentation quality, not model capability.",
        duration: "Weeks 2–3",
      },
      {
        index: 3,
        title: "Recommend",
        description:
          "A ranked shortlist with the reasoning, including what should not be attempted and why. A report with no rejections has not assessed anything.",
        duration: "Week 4",
      },
    ],
    timeline: "Three to four weeks.",
    outOfScope: [
      "A build — this exists to decide whether one is warranted",
      "Model or vendor selection, which follows a defined problem rather than preceding it",
    ],
    cta: {
      label: "Request a readiness assessment",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "What if the assessment says we are not ready?",
        answer:
          "Then it has done its job and saved a build. It will also say what would make you ready — usually documentation, data definitions or a process simplification — which is generally cheaper than the project it replaced.",
      },
      {
        question: "Do we need a data warehouse first?",
        answer:
          "Not usually. Most useful first projects work against a single system or a defined document set. Data platform work becomes necessary when a project genuinely needs data from several sources at once.",
      },
    ],
    related: [
      { label: "AI Project Readiness Checklist", href: "/resources/ai-project-checklist/", type: "CHECKLIST" },
      { label: "AI Governance for Small Teams", href: "/resources/ai-governance-guide/", type: "GUIDE" },
    ],
  },
  {
    slug: "ai-document-processing",
    practice: "ai-automation",
    group: "ai",
    layout: "capability-led",
    diagram: "ai-workflow",
    title: "AI Document Processing",
    answer:
      "Extracting structured data from invoices, forms, contracts and correspondence, with a confidence threshold that routes uncertain cases to a person rather than guessing.",
    seo: {
      title: "AI Document Processing",
      description:
        "Structured extraction from documents with confidence thresholds, human review of uncertain cases and a defined escalation path.",
      primaryTopic: "ai document processing",
      secondaryTopics: ["document extraction", "intelligent document processing"],
      intent: "commercial",
    },
    audience: ["A6", "A8"],
    phase: "P2",
    problems: [
      "Staff rekey data from documents into systems every day",
      "Document backlogs build up and delay downstream work",
      "Rekeying errors surface later as reconciliation problems",
    ],
    outcomes: [
      "Routine documents processed without a person reading every field",
      "Uncertain extractions routed for review rather than silently accepted",
      "An audit trail showing what was extracted, from where, with what confidence",
    ],
    whoFor: [
      "Operations handling consistent document types at meaningful volume",
      "Finance teams processing supplier invoices manually",
      "Businesses where document turnaround is a customer-facing delay",
    ],
    included: [
      "Document type analysis and realistic accuracy expectations per type",
      "Extraction pipeline with confidence scoring on every field",
      "Review interface for the cases the system is unsure about",
      "Integration into the system of record, so output lands where work happens",
      "Exception handling and escalation, designed in rather than added later",
      "Accuracy monitoring after go-live, because document formats change",
    ],
    timeline: "Six to twelve weeks for a first document type.",
    outOfScope: [
      "Full automation with no human review, which is not appropriate for financial or legal documents",
      "Handwriting-heavy or highly variable documents, where accuracy rarely justifies the build",
    ],
    cta: {
      label: "Discuss document processing",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "How accurate is document extraction?",
        answer:
          "It varies by document type and quality, which is why the design assumes it is imperfect. Confidence thresholds route uncertain fields to a person, so the accuracy question becomes how much review is needed rather than whether errors reach your systems.",
      },
      {
        question: "Can it handle documents we have never seen?",
        answer:
          "Novel formats extract less reliably, and the honest answer is that they should be flagged rather than guessed. Systems that never express uncertainty are the ones that put wrong numbers into ledgers.",
      },
    ],
    related: [
      { label: "Reduce manual work", href: "/use-cases/reduce-manual-work/", type: "USE CASE" },
      { label: "Workflow Automation", href: "/services/workflow-automation/", type: "SERVICE" },
    ],
  },
  {
    slug: "api-development",
    practice: "software-development",
    group: "systems-software",
    layout: "technology-led",
    diagram: "system-architecture",
    title: "API Development",
    answer:
      "Building interfaces other systems depend on — with a versioned contract, documented behaviour under failure, and authentication designed before the first endpoint rather than after.",
    seo: {
      title: "API Development",
      description:
        "Versioned contracts, documented failure behaviour, authentication and rate limiting. APIs built to be depended on.",
      primaryTopic: "api development",
      secondaryTopics: ["REST API", "API design", "integration"],
      intent: "commercial",
    },
    audience: ["A7", "A6"],
    phase: "P2",
    problems: [
      "Partners or internal teams need access to data currently exported by hand",
      "An existing API changes without warning and breaks its consumers",
      "Every integration is built bespoke because there is nothing stable to build against",
    ],
    outcomes: [
      "A documented contract consumers can build against with confidence",
      "Versioning that allows change without breaking what already works",
      "Behaviour under failure that is specified rather than discovered",
    ],
    whoFor: [
      "Businesses whose partners need programmatic access",
      "Product teams exposing capability to customers or resellers",
      "Organisations replacing manual data exchange with a real interface",
    ],
    included: [
      "Contract design agreed before implementation, so consumers can start early",
      "Authentication, authorisation and rate limiting appropriate to the audience",
      "Versioning strategy with a deprecation policy that is actually stated",
      "Error responses that are specific enough to act on",
      "Documentation generated from the implementation, so it cannot drift",
      "Monitoring on availability, latency and error rate",
    ],
    timeline: "Six to sixteen weeks depending on surface area and existing system access.",
    outOfScope: [
      "Exposing an internal database structure directly, which makes every future change a breaking one",
      "Consumer application development, unless separately scoped",
    ],
    cta: {
      label: "Discuss an API project",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "REST or GraphQL?",
        answer:
          "REST for most business integrations — it is simpler to consume, cache and debug, and the consumers usually want a handful of stable endpoints. GraphQL earns its complexity where clients genuinely need to shape varied queries themselves.",
      },
      {
        question: "How do we change an API without breaking consumers?",
        answer:
          "Version it, add rather than alter where possible, and state a deprecation window before removing anything. The cost of that discipline is small; the cost of breaking a partner integration without warning is not.",
      },
    ],
    related: [
      { label: "Systems Integration", href: "/services/systems-integration/", type: "SERVICE" },
      { label: "Connect business systems", href: "/use-cases/connect-business-systems/", type: "USE CASE" },
    ],
  },
  {
    slug: "crm-implementation",
    practice: "software-development",
    group: "systems-software",
    layout: "process-led",
    diagram: "process-transformation",
    title: "CRM Implementation",
    answer:
      "Getting a CRM genuinely used, which is a data model and adoption problem rather than a licence selection one. Most failed implementations were configured correctly and abandoned anyway.",
    seo: {
      title: "CRM Implementation",
      description:
        "Data model, migration, integration and adoption. Why CRM projects fail on use rather than configuration.",
      primaryTopic: "crm implementation",
      secondaryTopics: ["CRM setup", "sales system"],
      intent: "commercial",
    },
    audience: ["A5", "A2", "A6"],
    phase: "P2",
    problems: [
      "A CRM was bought, configured, and the sales team still works from spreadsheets",
      "Customer data is split across systems with no agreed source of truth",
      "Pipeline reporting is unreliable because entry is inconsistent",
    ],
    outcomes: [
      "A data model that matches how the business actually sells",
      "Entry that is faster than the workaround it replaces",
      "Reporting people trust because the underlying entry is consistent",
    ],
    whoFor: [
      "Teams whose CRM is technically live and practically unused",
      "Businesses moving off spreadsheets or a system nobody supports",
      "Organisations where sales and marketing hold separate versions of the same customer",
    ],
    included: [
      "Process mapping before configuration, so the system reflects how you sell",
      "Data model design: what a lead, contact, account and opportunity mean here",
      "Migration with deduplication and a decision on what not to bring across",
      "Integration with the systems that create and consume customer data",
      "Adoption work — training, entry design, and removing the parallel spreadsheet",
      "Reporting built on the fields that are reliably populated",
    ],
    approach: [
      {
        index: 1,
        title: "Map",
        description:
          "The real sales process, including the steps that happen off-system. Configuring against the documented process is how you get a CRM nobody uses.",
      },
      {
        index: 2,
        title: "Model",
        description:
          "Definitions agreed with the people who will type into it. Most CRM data quality problems are definition disagreements that surface a year later.",
      },
      {
        index: 3,
        title: "Migrate",
        description:
          "Deduplicated, with an explicit decision on what is not worth bringing. Importing everything imports the mess and the distrust with it.",
      },
      {
        index: 4,
        title: "Adopt",
        description:
          "Training, then removing the alternative. A CRM competing with a spreadsheet loses, because the spreadsheet is faster for the person filling it in.",
      },
    ],
    timeline: "Eight to sixteen weeks depending on data volume and integration count.",
    outOfScope: [
      "Licence resale — we have no commercial relationship with platform vendors",
      "Configuration delivered without the adoption work, which is how most of these fail",
    ],
    cta: {
      label: "Discuss a CRM project",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Which CRM should we choose?",
        answer:
          "Usually whichever your team will use and your systems can integrate with. Platform differences matter far less than fit with your process, and the selection decision is nearly always less important than the implementation decisions that follow it.",
      },
      {
        question: "Why do CRM implementations fail?",
        answer:
          "Because entry is slower than the workaround. If logging an activity properly takes two minutes and a spreadsheet takes ten seconds, the spreadsheet wins regardless of policy. Adoption is a design problem before it is a management one.",
      },
    ],
    related: [
      { label: "CRM Implementation Checklist", href: "/resources/crm-implementation-checklist/", type: "CHECKLIST" },
      { label: "CRM Platforms", href: "/technologies/crm-platforms/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "marketing-automation",
    practice: "digital-marketing",
    group: "automation",
    layout: "capability-led",
    diagram: "process-transformation",
    title: "Marketing Automation",
    answer:
      "Sequences triggered by what someone actually did, not by a calendar. The value is in the triggers and the data behind them; the platform is the least interesting part of the decision.",
    seo: {
      title: "Marketing Automation",
      description:
        "Behaviour-triggered sequences, lifecycle stages and lead handover, built on data that is reliable enough to trigger on.",
      primaryTopic: "marketing automation",
      secondaryTopics: ["lead nurture", "email automation", "lifecycle marketing"],
      intent: "commercial",
    },
    audience: ["A3", "A4", "A5"],
    phase: "P2",
    problems: [
      "Enquiries go cold because follow-up depends on someone remembering",
      "Every contact receives the same sequence regardless of what they did",
      "Marketing passes leads to sales with no agreed definition of ready",
    ],
    outcomes: [
      "Follow-up that happens on behaviour rather than on availability",
      "Content matched to where someone is in a decision",
      "An agreed handover point between marketing and sales",
    ],
    whoFor: [
      "Businesses with a considered sales cycle and inconsistent follow-up",
      "Teams whose email programme is a monthly send to everyone",
      "Organisations where lead handover is a recurring source of friction",
    ],
    included: [
      "Lifecycle stage definitions agreed between marketing and sales",
      "Behaviour tracking sufficient to trigger on, which usually needs fixing first",
      "Sequence design for the moments that matter rather than a full lifecycle build",
      "Lead scoring where volume justifies it, with the model documented and reviewable",
      "CRM integration so sales sees the same history",
      "Reporting on progression between stages, not just email open rates",
    ],
    timeline: "Six to twelve weeks for a first set of sequences.",
    outOfScope: [
      "Bulk sending to purchased lists, which damages deliverability and breaches consent rules",
      "Automating a sales process nobody has agreed on — the disagreement gets encoded",
    ],
    cta: {
      label: "Discuss marketing automation",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Do we need lead scoring?",
        answer:
          "Only at volumes where a person cannot review each enquiry. Below that, scoring adds a model to maintain and argue about while a five-minute human read does the job better.",
      },
      {
        question: "Why does automation feel impersonal?",
        answer:
          "Usually because it is triggered by time rather than behaviour. A message sent because someone read a pricing page is relevant; the same message sent on day four to everyone is not, and readers can tell the difference.",
      },
    ],
    related: [
      { label: "Automate sales follow-up", href: "/use-cases/automate-sales-follow-up/", type: "USE CASE" },
      { label: "Lead Scoring", href: "/resources/what-is-lead-scoring/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "customer-portals",
    practice: "software-development",
    group: "systems-software",
    layout: "capability-led",
    diagram: "system-architecture",
    title: "Customer Portals",
    answer:
      "A secure area where customers do for themselves what they currently email you about — checking status, retrieving documents, submitting requests. Its success is measured in removed inbound, not logins.",
    seo: {
      title: "Customer Portals",
      description:
        "Self-service portals for status, documents and requests, scoped by the inbound questions they are meant to remove.",
      primaryTopic: "customer portal development",
      secondaryTopics: ["client portal", "self-service"],
      intent: "commercial",
    },
    audience: ["A6", "A2"],
    phase: "P2",
    problems: [
      "Staff answer the same status questions by email every day",
      "Customers cannot retrieve their own documents without asking",
      "Requests arrive by email and get lost between inboxes",
    ],
    outcomes: [
      "Routine questions answered without anyone being asked",
      "Documents and history available to the customer directly",
      "Requests captured in a structured, trackable form",
    ],
    whoFor: [
      "Service businesses with high volumes of repetitive customer contact",
      "Organisations where account information lives in systems customers cannot see",
      "Businesses whose customers ask for visibility they cannot currently give",
    ],
    included: [
      "Scoping from the actual inbound — which questions, at what volume",
      "Authentication and access control, including multi-user accounts where needed",
      "Integration with the systems holding the underlying data",
      "Document access with permissions and an audit trail",
      "Structured request submission that lands in your existing workflow",
      "Accessibility built in, since a portal your customers must use has to work for all of them",
    ],
    timeline: "Ten to twenty weeks depending on integration depth.",
    outOfScope: [
      "Portals built without integration, which become another place data is entered twice",
      "Replacing support entirely — self-service deflects routine contact, it does not remove the need for people",
    ],
    cta: {
      label: "Discuss a portal project",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "How do we know a portal will be used?",
        answer:
          "Scope it from the questions customers already ask you. A portal built around real inbound has demonstrated demand; one built around what the business would like customers to do usually does not.",
      },
      {
        question: "What is the most common reason portals fail?",
        answer:
          "Stale data. If the portal shows something different from what a staff member would say on the phone, customers stop trusting it and return to email — so integration matters more than interface.",
      },
    ],
    related: [
      { label: "Improve customer experience", href: "/use-cases/improve-customer-experience/", type: "USE CASE" },
      { label: "Web Applications", href: "/services/web-applications/", type: "SERVICE" },
    ],
  },
  {
    slug: "reporting-dashboards",
    practice: "data-analytics",
    group: "growth",
    layout: "process-led",
    diagram: "system-architecture",
    title: "Reporting Dashboards",
    answer:
      "Dashboards built after the definitions are agreed, not before. Most dashboard projects fail as definition disputes: two teams calculate the same metric differently and both are right by their own rules.",
    seo: {
      title: "Reporting Dashboards",
      description:
        "Agreed metric definitions first, then automated dashboards on trustworthy data with stated refresh and ownership.",
      primaryTopic: "reporting dashboards",
      secondaryTopics: ["business dashboards", "management reporting"],
      intent: "commercial",
    },
    audience: ["A2", "A8", "A7"],
    phase: "P2",
    problems: [
      "Reporting is assembled manually every month and is out of date on arrival",
      "Two departments present different numbers for the same measure",
      "Dashboards exist and nobody opens them",
    ],
    outcomes: [
      "One agreed definition per metric, documented where the metric is displayed",
      "Reporting that refreshes without anyone assembling it",
      "Dashboards built for a specific decision rather than for completeness",
    ],
    whoFor: [
      "Organisations spending days each month building the same report",
      "Leadership teams reconciling conflicting numbers in meetings",
      "Businesses whose data is adequate but scattered",
    ],
    included: [
      "Metric definitions agreed with the people who will be held to them",
      "Source review, including honest assessment of which sources are reliable",
      "Automated pipelines with refresh schedules and failure alerting",
      "Dashboards designed around decisions, so each has an owner and a purpose",
      "Definitions visible alongside the numbers, so the meaning travels with the metric",
      "Handover so your team can extend it without us",
    ],
    timeline: "Six to twelve weeks for a first dashboard set.",
    outOfScope: [
      "Dashboards on data known to be unreliable — that is a data quality engagement first",
      "Vanity dashboards built to display everything available",
    ],
    cta: {
      label: "Discuss reporting",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Why do our departments report different numbers?",
        answer:
          "Almost always because they are applying different, individually reasonable definitions — different date fields, different exclusions, different treatment of cancellations. It is a definition problem, and no tool resolves it.",
      },
      {
        question: "How many dashboards should we have?",
        answer:
          "As many as there are recurring decisions to support. Dashboards without a decision attached go unopened, and they dilute attention from the ones that matter.",
      },
    ],
    related: [
      { label: "Data Quality Framework", href: "/resources/data-quality-framework/", type: "GUIDE" },
      { label: "Business Intelligence", href: "/services/business-intelligence/", type: "SERVICE" },
    ],
  },
  {
    slug: "cloud-migration",
    practice: "software-development",
    group: "systems-software",
    layout: "process-led",
    diagram: "system-architecture",
    title: "Cloud Migration",
    answer:
      "Moving applications and data to cloud infrastructure in a sequence driven by a measured constraint. Migrations that begin without one tend to reproduce the same problems at a different cost base.",
    seo: {
      title: "Cloud Migration",
      description:
        "Sequenced migration against a measured constraint, with cost modelled honestly and rollback planned per workload.",
      primaryTopic: "cloud migration services",
      secondaryTopics: ["cloud hosting", "infrastructure migration"],
      intent: "commercial",
    },
    audience: ["A7", "A8"],
    phase: "P3",
    problems: [
      "Infrastructure cannot handle demand peaks or takes weeks to change",
      "Hardware or a hosting contract is reaching end of life",
      "Recovery from a serious failure has never been tested and probably would not work",
    ],
    outcomes: [
      "Capacity that responds to demand rather than being provisioned for the peak",
      "Deployment and recovery that are routine rather than events",
      "Running costs that are visible and attributable",
    ],
    whoFor: [
      "Organisations facing a hardware refresh or hosting renewal",
      "Teams whose release process is constrained by infrastructure",
      "Businesses with a recovery plan nobody has tested",
    ],
    included: [
      "Workload assessment: what moves as-is, what needs rework, what should be retired",
      "Sequencing by risk and dependency, starting with something reversible",
      "Cost modelling before the move, including the egress and support costs usually omitted",
      "Migration with rollback planned per workload rather than for the programme",
      "Monitoring, alerting and backup verified by restoring, not by configuration review",
      "Handover of runbooks and access to your team",
    ],
    timeline: "Three to nine months depending on estate size and workload complexity.",
    outOfScope: [
      "Lift-and-shift of an application whose problems are architectural, which relocates them",
      "Ongoing infrastructure management, unless separately agreed",
    ],
    cta: {
      label: "Discuss a migration",
      href: "/contact/",
      tier: "T4",
    },
    faqs: [
      {
        question: "Will cloud reduce our costs?",
        answer:
          "Not automatically. It converts capital cost to operating cost and can be more expensive for steady, predictable workloads. The reliable gains are elasticity, deployment speed and recovery — cost savings depend on right-sizing after the move.",
      },
      {
        question: "Should we move everything?",
        answer:
          "Rarely. Some workloads are cheaper and simpler where they are, and some are due for retirement rather than migration. A migration that starts by questioning what should move usually moves less and delivers more.",
      },
    ],
    related: [
      { label: "Cloud and hosting", href: "/technologies/cloud-and-hosting/", type: "TECHNOLOGY" },
      { label: "Build scalable digital infrastructure", href: "/use-cases/build-scalable-digital-infrastructure/", type: "USE CASE" },
    ],
  },
  {
    slug: "website-maintenance",
    practice: "web-development",
    group: "digital-experience",
    layout: "capability-led",
    diagram: "none",
    title: "Website Maintenance & Support",
    answer:
      "Ongoing ownership of a live site: security updates, dependency upgrades, monitoring, backups and small changes. Priced by what is actually included rather than by an hours allowance nobody tracks.",
    seo: {
      title: "Website Maintenance & Support",
      description:
        "Security updates, dependency upgrades, monitoring, tested backups and small changes, with response times stated plainly.",
      primaryTopic: "website maintenance services",
      secondaryTopics: ["website support", "site upkeep"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P1",
    problems: [
      "The site was built by someone who is no longer available",
      "Updates are deferred until something breaks",
      "Nobody can say when a backup was last restored successfully",
    ],
    outcomes: [
      "Updates applied on a schedule rather than after an incident",
      "Someone identifiable to contact when something goes wrong",
      "Backups verified by restoring them, not by their existence",
    ],
    whoFor: [
      "Businesses without in-house technical ownership of their site",
      "Organisations whose site is commercially important and technically unattended",
      "Teams inheriting a site with no documentation",
    ],
    included: [
      "Security patching and dependency upgrades on a stated cadence",
      "Uptime and error monitoring with alerts reaching a person",
      "Backups with periodic restore testing",
      "Small content and configuration changes within an agreed scope",
      "Performance and accessibility checks, so neither degrades unnoticed",
      "A named contact and a stated response time by severity",
    ],
    timeline: "Ongoing, on a monthly agreement with no long tie-in.",
    outOfScope: [
      "New feature development, which is quoted separately rather than absorbed",
      "Emergency recovery of sites we have not assessed, without a scoping conversation first",
    ],
    cta: {
      label: "Discuss ongoing support",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Why does a site need maintenance if nothing is changing?",
        answer:
          "Because its dependencies change around it. Security vulnerabilities are disclosed continuously, and a site left unpatched for a year is exposed by inaction rather than by anything anyone did.",
      },
      {
        question: "What is not covered?",
        answer:
          "New features and redesign work. Bundling development hours into a maintenance fee makes both harder to plan; we state what is included and quote the rest.",
      },
    ],
    related: [
      { label: "Website Performance", href: "/services/website-performance/", type: "SERVICE" },
      { label: "How we price", href: "/company/how-we-price/", type: "COMPANY" },
    ],
  },
  {
    slug: "accessibility-audit",
    practice: "web-development",
    group: "digital-experience",
    layout: "process-led",
    title: "Accessibility Audit",
    answer:
      "Assessment against WCAG 2.2 AA using assistive technology as well as automated tooling, because automated checks find roughly a third of real barriers and none of the ones that matter most.",
    seo: {
      title: "Accessibility Audit",
      description:
        "WCAG 2.2 AA assessment with screen reader and keyboard testing, prioritised by user impact rather than rule count.",
      primaryTopic: "website accessibility audit",
      secondaryTopics: ["WCAG audit", "digital accessibility"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P2",
    problems: [
      "An accessibility statement is required and nobody knows what is true",
      "A complaint or procurement question has raised the issue",
      "An automated scanner reports a clean pass that nobody believes",
    ],
    outcomes: [
      "A defensible picture of conformance, with severity by user impact",
      "Findings written so a developer can act on them without interpretation",
      "Evidence that supports an honest accessibility statement",
    ],
    whoFor: [
      "Organisations with procurement or regulatory accessibility requirements",
      "Teams whose site has never been tested with assistive technology",
      "Businesses that want the statement they publish to be true",
    ],
    included: [
      "Automated scanning as a first pass, treated as coverage rather than as the answer",
      "Manual testing: keyboard only, screen reader, zoom to 400%, reduced motion",
      "Assessment against WCAG 2.2 AA with the failing criterion named per finding",
      "Severity ranked by impact on a user completing a task, not by rule count",
      "Remediation guidance specific enough to implement",
      "Support in drafting an accessibility statement that reflects reality",
    ],
    timeline: "Three to five weeks depending on the number of distinct templates and flows.",
    outOfScope: [
      "Certification — no supplier can certify accessibility, and any who offer to are misrepresenting it",
      "Overlay widgets, which do not resolve underlying barriers and are widely opposed by disabled users",
    ],
    cta: {
      label: "Request an accessibility audit",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Is an automated scan enough?",
        answer:
          "No. Automated tools reliably find contrast and missing labels but cannot judge whether a heading structure makes sense, whether focus order follows the visual flow, or whether an error message is announced. Those require manual testing.",
      },
      {
        question: "Can you make us compliant?",
        answer:
          "We can assess conformance and guide remediation. Nobody can certify compliance, because conformance is assessed against real use and changes with every content update. Any claim otherwise should be treated with suspicion.",
      },
    ],
    related: [
      { label: "Accessibility checklist", href: "/resources/accessibility-checklist/", type: "CHECKLIST" },
      { label: "Accessibility commitment", href: "/company/accessibility-commitment/", type: "COMPANY" },
    ],
  },
];
