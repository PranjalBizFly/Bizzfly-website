/**
 * Additional resources.
 *
 * No fabricated authors, publication dates or readership figures. Where a
 * date is given it is the date the piece was written for this site.
 * Every resource declares which services it supports, which feeds the
 * relationship engine in lib/relationships.ts.
 */

import type { Resource } from "@/types/content";

export const moreResources: Resource[] = [
  {
    slug: "what-is-ai-optimisation",
    type: "glossary",
    topic: "AI Search",
    title: "What Is AI Optimisation?",
    answer:
      "AI Optimisation is the work of structuring a website so AI systems can read, classify and reuse it — covering server-rendered content, machine-readable data, and deliberate crawler access.",
    body: [
      "AIO sits underneath AEO and GEO. Those two compete for extraction and citation; AIO decides whether a machine can see your content at all. If the answer is no, nothing above that line is achievable regardless of how good the writing is.",
      "The single largest cause of failure here is client-side rendering. Most AI crawlers execute little or no JavaScript, so a site that assembles its content in the browser presents an effectively empty page to them. The content exists for humans and does not exist for the systems increasingly deciding who gets recommended.",
      "The second cause is structured data that is either absent or fragmented. Schema that describes each page in isolation is far less useful than schema anchored to a single organisation entity, because the latter lets a machine connect every page to one identifiable business.",
      "The third is accidental blocking. Robots directives written years ago, or copied from a template, frequently exclude the exact crawlers a business now wants to be read by. This is worth checking before spending anything on content.",
    ],
    supports: ["ai-optimisation", "technical-seo", "ai-search-optimisation"],
    relatedUseCases: ["get-found-in-ai-search"],
    seo: {
      title: "What Is AI Optimisation (AIO)?",
      description:
        "AIO is the work of making a site readable by AI systems — server rendering, structured data anchored to one entity, and deliberate crawler access.",
      primaryTopic: "what is AI optimisation",
      secondaryTopics: ["AIO", "AI crawlability", "server rendering"],
      intent: "informational",
    },
    audience: ["A4", "A7"],
    phase: "P1",
    cta: {
      label: "Read about AI Optimisation",
      href: "/services/ai-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Does AIO replace SEO?",
        answer:
          "No. It is a foundation layer beneath both SEO and AI search work. A site can be technically readable and still rank for nothing; it cannot rank or be cited if it is unreadable.",
      },
    ],
    related: [
      {
        label: "AI Optimisation",
        href: "/services/ai-optimisation/",
        type: "SERVICE",
      },
      {
        label: "Generative Engine Optimisation",
        href: "/resources/what-is-generative-engine-optimisation/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-search-experience-optimisation",
    type: "glossary",
    topic: "SEO",
    title: "What Is Search Experience Optimisation?",
    answer:
      "Search Experience Optimisation is the work that happens after the click — matching what a page delivers to the intent behind the query, so search visibility turns into enquiries rather than bounces.",
    body: [
      "SXO exists because ranking and converting are different problems. A page can occupy the first position for a query it does not really answer, collect the click, and lose the visitor within seconds. From the outside that looks like an SEO success and reads on the balance sheet as nothing.",
      "The work is unglamorous: match the page to the intent behind the query, remove the friction between arrival and enquiry, make the next step obvious, and measure the result properly. It usually produces faster commercial movement than acquisition work, because you are improving the conversion of traffic you already have.",
      "It also compounds. Every channel feeding that page benefits from the same improvement, which is why it is normally the first thing worth fixing rather than the last.",
    ],
    supports: ["search-experience-optimisation", "conversion-rate-optimisation"],
    relatedUseCases: ["improve-website-conversion"],
    seo: {
      title: "What Is Search Experience Optimisation (SXO)?",
      description:
        "SXO is the work after the click — matching pages to search intent so visibility becomes enquiries rather than bounces.",
      primaryTopic: "what is search experience optimisation",
      secondaryTopics: ["SXO", "conversion", "search intent"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: {
      label: "Read about SXO",
      href: "/services/search-experience-optimisation/",
      tier: "T1",
    },
    related: [
      {
        label: "Search Experience Optimisation",
        href: "/services/search-experience-optimisation/",
        type: "SERVICE",
      },
      {
        label: "Improve website conversion",
        href: "/use-cases/improve-website-conversion/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "how-to-choose-a-first-automation-project",
    type: "article",
    topic: "Automation",
    title: "How to Choose a First Automation Project",
    answer:
      "Pick the process that is repetitive, stable, high-volume and owned by someone. Automating an unstable process locks in the wrong version of it, and automating an unowned one just makes the confusion faster.",
    readingTime: "6 min read",
    body: [
      "Most failed automation programmes we see failed at selection rather than at execution. The technology worked; it was applied to a process that should not have been automated first, or at all.",
      "Four filters remove most of the risk. The process should be repetitive enough that the build cost is repaid. It should be stable — automating something that changes every month means rebuilding it every month. It should have real volume, because a process running twice a week rarely justifies the work. And it should have an owner, because an automated process with no owner becomes nobody's problem until it breaks.",
      "The fourth filter is the one people skip. If nobody currently owns the process end to end, the first task is not automation, it is deciding who owns it. Otherwise you are encoding an undefined process into software, which makes it harder to change later rather than easier.",
      "There is a fifth consideration that is less about the process and more about the organisation: pick something visible. A first project that saves a team a genuinely tedious afternoon each week builds more internal support than one that saves more money invisibly. Momentum matters when the second and third projects need approval.",
      "Finally, decide the failure path before you build. What happens when the system is unsure, or wrong, and who notices. A process with no defined exception handling will eventually produce a confident mistake nobody catches, and that single incident tends to end the programme.",
    ],
    supports: ["workflow-automation", "ai-consulting", "ai-agents"],
    relatedUseCases: ["reduce-manual-work", "improve-operational-efficiency"],
    relatedIndustries: ["manufacturing"],
    seo: {
      title: "How to Choose a First Automation Project",
      description:
        "Four filters for picking the right first process to automate — repetitive, stable, high-volume and owned — plus the failure path to decide before you build.",
      primaryTopic: "choosing an automation project",
      secondaryTopics: ["business automation", "process selection"],
      intent: "informational",
    },
    audience: ["A6", "A2"],
    phase: "P1",
    cta: {
      label: "Explore business automation",
      href: "/services/workflow-automation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Should we start with the biggest process?",
        answer:
          "Usually not. A large first project takes longer to show value and carries more ways to fail. A smaller, visible win builds the internal support you will need to fund the larger one.",
      },
    ],
    related: [
      {
        label: "Workflow Automation",
        href: "/services/workflow-automation/",
        type: "SERVICE",
      },
      {
        label: "Reduce manual work",
        href: "/use-cases/reduce-manual-work/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "why-your-website-redesign-lost-traffic",
    type: "article",
    topic: "Web Development",
    title: "Why Your Website Redesign Lost Traffic",
    answer:
      "Traffic loss after a redesign is almost never caused by the design. It is caused by the migration: missing redirects, changed URL structures with no mapping, and content quietly dropped because nobody checked what it was earning.",
    readingTime: "5 min read",
    body: [
      "This is one of the most common problems we are called in to fix, and it is almost always avoidable. A business invests in a redesign, launches something better looking, and watches organic traffic fall for three months.",
      "The first cause is the redirect map, or the absence of one. Every URL that changes needs a rule pointing the old address at its closest equivalent, in a single hop. Redirect chains dilute the signal; missing redirects lose it entirely. This is tedious work that gets squeezed at the end of a project, which is exactly when it matters most.",
      "The second cause is structural. A redesign frequently reorganises the site around how the company thinks about itself rather than around how buyers search. Pages that ranked get merged into a parent, or split across three, and the specific relevance that earned the ranking is dispersed.",
      "The third is content that was quietly dropped. Somebody looks at an old page, decides it looks dated, and removes it — without checking that it was the highest-earning organic entry point on the site. An audit of what currently performs, before anything is designed, prevents this entirely.",
      "The fix, if it has already happened, is recoverable. Reconstruct the old URL inventory from analytics and archived crawls, map each one to its closest current equivalent, and restore the content that was earning. Recovery usually takes a quarter, which is a good argument for doing the mapping before launch rather than after.",
    ],
    supports: ["website-redesign", "technical-seo", "seo"],
    relatedUseCases: ["increase-organic-traffic"],
    seo: {
      title: "Why Your Website Redesign Lost Traffic",
      description:
        "Traffic loss after a redesign comes from the migration, not the design — missing redirects, restructured URLs, dropped content. How to prevent and recover it.",
      primaryTopic: "website redesign traffic loss",
      secondaryTopics: ["site migration", "redirects", "SEO"],
      intent: "informational",
    },
    audience: ["A3", "A1"],
    phase: "P1",
    cta: {
      label: "Explore website redesign",
      href: "/services/website-redesign/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How long does recovery take?",
        answer:
          "Typically a quarter once the redirects and content are corrected, sometimes longer if the structural changes were significant. Recovery is rarely complete — which is why the mapping work belongs before launch, not after.",
      },
    ],
    related: [
      {
        label: "Website Redesign",
        href: "/services/website-redesign/",
        type: "SERVICE",
      },
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
    ],
  },
];
