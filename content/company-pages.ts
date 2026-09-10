/**
 * Additional company pages.
 *
 * Only verified facts. Team size, founding year, client counts, awards,
 * certifications and partnerships are not published because none has been
 * confirmed — see content/site.ts `unverified`.
 */

import type { CompanyPage } from "@/types/content";

export const extraCompanyPages: CompanyPage[] = [
  {
    slug: "approach",
    section: "about",
    title: "Our approach",
    eyebrow: "Company",
    answer:
      "Every engagement starts with diagnosis rather than a proposal. We spend the first two weeks establishing which constraint is actually binding, because fixing the wrong one is the expensive mistake — and you keep those findings whether or not you continue with us.",
    body: [
      "Most agency relationships fail the same way. A proposal is written before anyone understands the problem, work is delivered against that proposal, and six months later the commercial result has not moved because the original diagnosis was wrong. The work was done competently; it was simply the wrong work.",
      "We run it in the other order.",
    ],
    seo: {
      title: "Our approach",
      description:
        "Diagnosis before proposal, boundaries stated in writing, and reporting against commercial measures rather than activity.",
      primaryTopic: "how BizzFly approaches projects",
      secondaryTopics: ["methodology", "engagement process"],
      intent: "commercial",
    },
    audience: ["A2", "A7", "A8"],
    phase: "P1",
    cta: {
      label: "Let's talk",
      href: "/contact/",
      tier: "T4",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["seo", "custom-software", "workflow-automation"],
    related: [
      { label: "About Us", href: "/about-us/", type: "COMPANY" },
      {
        label: "Our Engineering Standards",
        href: "/technologies/engineering-standards/",
        type: "TECHNOLOGY",
      },
      { label: "Services", href: "/services/", type: "SECTION" },
    ],
    faqs: [
      {
        question: "What happens in the first two weeks?",
        answer:
          "We audit the current position — technical health, visibility, conversion, and where the process actually loses time. The output is a document telling you what is broken, including the parts we are not the right people to fix. You keep it either way.",
      },
      {
        question: "Do you work on retainer or by project?",
        answer:
          "Both, depending on the work. Search and automation programmes suit a retainer because they compound; a website build or a software project suits a defined scope. We will tell you which fits rather than defaulting to whichever is more profitable for us.",
      },
      {
        question: "What if the diagnosis says we do not need you?",
        answer:
          "Then that is what the document says. It has happened, and it is a better outcome than six months of work against the wrong constraint.",
      },
    ],
  },
  {
    slug: "careers",
    section: "careers",
    title: "Careers",
    eyebrow: "Company",
    answer:
      "We hire people who want work that needs judgement rather than volume. The team spans search and AI visibility, web and software engineering, and automation delivery — and the work moves between them.",
    body: [
      "We are a small team in Pune. The work is varied by necessity: the same person may audit a crawl problem one week and scope an automation the next. That suits people who like breadth and dislike being handed a narrow lane.",
      "There are no published openings at the moment. We would still rather hear from someone good than miss them because the timing did not line up.",
    ],
    seo: {
      title: "Careers",
      description:
        "Work at BizzFly — search and AI visibility, engineering and automation delivery, from our Pune office.",
      primaryTopic: "careers at BizzFly",
      secondaryTopics: ["jobs", "hiring", "work with us"],
      intent: "navigational",
    },
    audience: ["A9"],
    phase: "P2",
    cta: {
      label: "Introduce yourself",
      href: "/contact/",
      tier: "T2",
      note: "Tell us what you want to work on.",
    },
    related: [
      { label: "Our Approach", href: "/our-approach/", type: "COMPANY" },
      { label: "About Us", href: "/about-us/", type: "COMPANY" },
    ],
  },
];
