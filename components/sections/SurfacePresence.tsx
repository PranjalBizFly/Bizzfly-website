"use client";

import { useId, useState } from "react";
import type { CSSProperties } from "react";
import { Reveal, useReveal } from "@/components/motion";
import styles from "./SurfacePresence.module.css";
import { titleCase } from "@/lib/titleCase";

interface Surface {
  id: string;
  code: string;
  /** Node label on the rail. Two words at most — it sits inside the drawing. */
  node: string;
  /** The retrieval step, named in two or three words, drawn on the path. */
  retrieval: string;
  /** What the buyer ends up looking at. The end of the path. */
  outcome: string;
  standing: string;
  title: string;
  channels: string;
  buyerJourney: string;
  retrievalMechanism: string;
  enterpriseReality: string;
  criticalVulnerability: string;
  bizzflySolution: string;
  disciplines: string[];
}

/*
 * `node`, `retrieval` and `outcome` are labels for the drawing, each one a
 * compression of the prose already in the same record — "10 blue links" is
 * ranked results, RAG produces cited answers, an agent produces a shortlist.
 * Nothing here is a claim the passages below do not already make.
 */
const SURFACES: Surface[] = [
  {
    id: "seo",
    code: "Surface 01 / SEO",
    node: "SEO",
    retrieval: "Crawled index",
    outcome: "Rankings",
    standing: "Where most budgets already sit, and where returns are thinning",
    title: "Ranked Organic Search Results",
    channels: "Google Search · Bing Web · Traditional Search Crawlers",
    buyerJourney:
      "A prospective buyer types commercial keywords into a search bar and scans a list of 10 blue links. They look at page titles, meta descriptions, and positional ranking before deciding which link to click.",
    retrievalMechanism:
      "Keyword frequency, PageRank link graphs, technical crawlability, and domain authority determine position. Traditional web crawlers index static HTML and calculate relevancy scores against query terms.",
    enterpriseReality:
      "Where 85%+ of organic marketing budgets are currently spent. Most established businesses have invested in backlink acquisition and keyword optimisation to secure page-one rankings.",
    criticalVulnerability:
      "Over 60% of searches now conclude without a single outbound click. Traditional organic links are pushed beneath sponsored ads, map packs, and generative AI answer boxes, silently depressing click-through volume.",
    bizzflySolution:
      "We maintain organic technical SEO hygiene while upgrading legacy content into disambiguated Schema.org knowledge entities, ensuring traditional search equity transfers seamlessly to AI answer engines.",
    disciplines: [
      "Sub-second Core Web Vitals (LCP < 1.2s, CLS < 0.05)",
      "Information architecture with zero crawl-budget waste",
      "Semantic HTML5 without client-side rendering hurdles",
      "Authoritative, evidence-backed editorial frameworks",
    ],
  },
  {
    id: "aeo",
    code: "Surface 02 / AEO & GEO",
    node: "AEO & GEO",
    retrieval: "RAG synthesis",
    outcome: "Citations",
    standing: "Cited selectively, and only when the source reads as verifiable fact",
    title: "Synthesised Generative AI Answers",
    channels: "Google AI Overviews · Perplexity AI · Copilot Answer Snippets",
    buyerJourney:
      "A decision-maker inputs a complex, multifaceted question: “How do mid-market logistics platforms handle multi-tenant database decoupling?” The engine synthesizes a direct, comprehensive answer with cited footnotes.",
    retrievalMechanism:
      "Retrieval-Augmented Generation (RAG). AI systems extract relevant entity passages from indexed sources, evaluate semantic consistency across citations, and compile a synthesised answer referencing authoritative sources.",
    enterpriseReality:
      "Visibility is highly volatile. Websites with high traditional rankings are frequently bypassed if their content relies on generic marketing adjectives rather than structured, verifiable technical facts.",
    criticalVulnerability:
      "If your site relies on promotional marketing copy, client-side JavaScript rendering, or lacks structured Schema.org entity relationships, AI engines bypass your domain and cite competitors as primary sources.",
    bizzflySolution:
      "We engineer Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) through structured JSON-LD entity graphs, verifiable architectural definitions, and direct question-answering data hierarchies.",
    disciplines: [
      "Schema.org JSON-LD graph linking corporate entities",
      "Direct, unambiguous technical answer formatting",
      "Entity disambiguation across authoritative ontologies",
      "Machine-digestible microdata and table structures",
    ],
  },
  {
    id: "geo",
    code: "Surface 03 / Agentic GEO",
    node: "Agentic GEO",
    retrieval: "Agent reasoning",
    outcome: "Recommendations",
    standing: "Absent for over 90% of B2B companies, including most category leaders",
    title: "Autonomous Conversational AI Assistants",
    channels: "ChatGPT Search · Claude Projects · Enterprise AI Agents",
    buyerJourney:
      "An executive asks an AI assistant: “Recommend three vetted digital growth and engineering partners in India with verified enterprise cloud migration track records.” The assistant returns a qualified shortlist of three vendors.",
    retrievalMechanism:
      "Conversational reasoning models evaluate semantic knowledge graphs, verifiable third-party consensus, training corpus authority, and deep architectural alignment to formulate bespoke vendor recommendations.",
    enterpriseReality:
      "Over 90% of B2B companies are completely absent here. Traditional keyword rankings provide zero standing inside autonomous AI conversational reasoning or vendor selection weights.",
    criticalVulnerability:
      "The buyer evaluates the three recommended firms and initiates engagement directly. Because your company was omitted from the AI agent’s shortlist, you were disqualified before an RFP was ever drafted.",
    bizzflySolution:
      "We build multi-channel semantic corroboration and deep technical thought leadership that builds consensus across LLM training weights, establishing your firm as an undeniable authority in your category.",
    disciplines: [
      "Semantic knowledge graph integration across external registries",
      "Cross-platform entity corroboration and technical consensus",
      "Deep, framework-driven architectural documentation",
      "Category leadership positioning built for conversational reasoning",
    ],
  },
];

/** The four passages that describe a surface, in the order they are read. */
function passagesOf(surface: Surface) {
  return [
    { label: "How the buyer discovers", body: surface.buyerJourney },
    { label: "The retrieval mechanism", body: surface.retrievalMechanism },
    { label: "Typical enterprise presence", body: surface.enterpriseReality },
    { label: "The critical vulnerability", body: surface.criticalVulnerability },
  ];
}

interface Foundation {
  code: string;
  title: string;
  question: string;
  explanation: string;
  pillars: string[];
}

const FOUNDATIONS: Foundation[] = [
  {
    code: "Foundation 01 / AIO",
    title: "Artificial Intelligence Optimisation",
    question: "Can a machine parser read, comprehend, and verify you at all?",
    explanation:
      "AI crawlers, autonomous agents, and LLM scrapers do not read web pages like human visitors. They parse server-rendered HTML5, verified Schema.org JSON-LD entity structures, and contextual relationship microdata. When an organisation’s digital architecture is opaque or reliant on client-rendered scripts, AI engines fail to understand their capabilities and exclude them from foundational knowledge graphs.",
    pillars: [
      "Server-rendered semantic HTML5 with zero client-side dependencies",
      "Comprehensive Schema.org JSON-LD corporate knowledge graph",
      "Disambiguated entity architecture and capability modelling",
      "Direct machine-digestible documentation and taxonomy",
    ],
  },
  {
    code: "Foundation 02 / SXO",
    title: "Search Experience Optimisation",
    question: "When high-intent decision makers land, do you convert what you won?",
    explanation:
      "Winning search rankings and AI citations is meaningless if the destination experience fails. When an executive clicks through from an AI overview, search result, or recommendation, they expect instantaneous load speeds, accessible typography, authoritative proof points, and clear diagnostic inquiry pathways. SXO converts earned discovery into qualified enterprise pipeline.",
    pillars: [
      "Sub-second Core Web Vitals (LCP < 1.2s, CLS < 0.05)",
      "Accessible enterprise UX adhering to WCAG AA standards",
      "Proof-driven content architecture answering buyer constraints",
      "Friction-free diagnostic pathways and executive consultation routing",
    ],
  },
];

interface SelfCheck {
  surface: string;
  statement: string;
  ifNot: string;
}

const SELF_CHECK: SelfCheck[] = [
  {
    surface: "Surface 01: Ranked organic search",
    statement:
      "Our website consistently ranks on page one of Google for primary commercial, industry, and capability keywords.",
    ifNot:
      "If not, the fundamentals come first: crawlable architecture, Core Web Vitals, and content that answers a commercial question rather than describing a service.",
  },
  {
    surface: "Surface 02: Synthesised AI answers",
    statement:
      "Our solutions and leadership are actively cited, with linked footnotes, in Google AI Overviews, Perplexity answers, and Copilot summaries.",
    ifNot:
      "If not, the gap is almost always structural rather than editorial. Promotional copy and client-rendered pages are not retrievable as facts, so the engine cites a competitor who published the same claim in a parseable form.",
  },
  {
    surface: "Surface 03: Autonomous AI assistants",
    statement:
      "Our organisation is recommended when enterprise decision-makers prompt ChatGPT, Claude, or internal AI agents for a verified vendor shortlist.",
    ifNot:
      "If not, you are being filtered out before an RFP exists. Standing here is earned through third-party corroboration and depth of published technical thinking, not through keyword position.",
  },
];

/**
 * SurfacePresence — one buyer question, three discovery surfaces.
 *
 * The argument here is a shape: a single question leaves the buyer and
 * arrives at three different retrieval systems, each of which answers it a
 * different way. Set as three long passages in sequence, that shape was
 * invisible — the reader met the same structure three times and had to hold
 * the comparison in their head. It is now drawn: a question node, a rule
 * running down through three surface nodes, and one panel showing whichever
 * surface is selected.
 *
 * Two things the earlier tab rail got wrong are deliberately not repeated.
 * Every panel renders in the DOM at all times and is hidden with the `hidden`
 * attribute rather than unmounted, so all three surfaces are still in the
 * initial HTML for an extractor and for a visitor with no JavaScript — which
 * matters more on this section than any other, since it is the section
 * arguing that machine-readable content is what gets cited. And the surfaces
 * are stated once: the drawing is the summary, the panel is the detail, and
 * neither repeats the other.
 */
export function SurfacePresence() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const diagram = useReveal<HTMLDivElement>();

  const move = (from: number, delta: number) => {
    const next = (from + delta + SURFACES.length) % SURFACES.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  const jump = (to: number) => {
    setActive(to);
    document.getElementById(`${baseId}-tab-${to}`)?.focus();
  };

  /*
   * Below the two-column breakpoint the panel is under the rail rather than
   * beside it, so a tap can change content that is entirely off screen and
   * look like it did nothing. Only on tap, only when the columns are stacked,
   * and `nearest` so a panel already in view is left where it is.
   */
  const revealPanelOnTap = (index: number) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      document.getElementById(`${baseId}-panel-${index}`)?.scrollIntoView({
        block: "nearest",
        behavior: smooth ? "smooth" : "auto",
      });
    });
  };

  return (
    <article className={styles.wrapper}>
      <div className={styles.top}>
        {/* Left: the claim, and the claim drawn. */}
        <div className={styles.aside}>
          <Reveal as="header" className={styles.header}>
            <span className={styles.eyebrow}>
              Multi-Surface Discovery Architecture
            </span>
            <h3 className={styles.title}>
              One Buyer Question: &ldquo;Who Can Do This For Us?&rdquo;
            </h3>
            <p className={styles.lead}>
              Modern enterprise buyers do not discover technology partners
              through a single search bar anymore. When a decision-maker seeks
              solutions to a critical business problem, discovery splits across
              three distinct retrieval tiers, from traditional search indexes to
              generative AI answers and autonomous conversational assistants.
              Most organisations optimise heavily for the first and remain
              completely invisible on the others.
            </p>
          </Reveal>

          <div className={styles.diagram} ref={diagram}>
            <div className={styles.origin} style={{ "--node-index": 0 } as CSSProperties}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.originBody}>
                <span className={styles.originLabel}>The buyer asks</span>
                <span className={styles.originQuestion}>
                  &ldquo;Who can do this for us?&rdquo;
                </span>
              </span>
            </div>

            <div
              className={styles.rail}
              role="tablist"
              aria-orientation="vertical"
              aria-label="Discovery surfaces"
            >
              {SURFACES.map((surface, index) => {
                const selected = index === active;
                return (
                  <button
                    key={surface.id}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${index}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${index}`}
                    tabIndex={selected ? 0 : -1}
                    className={styles.node}
                    data-selected={selected}
                    /* Every node from the question down to the selected one
                       lights its segment of the rule: the path the question
                       took to get here. */
                    data-onpath={index <= active}
                    style={{ "--node-index": index + 1 } as CSSProperties}
                    onClick={() => {
                      setActive(index);
                      revealPanelOnTap(index);
                    }}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                        event.preventDefault();
                        move(index, 1);
                      }
                      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        move(index, -1);
                      }
                      if (event.key === "Home") {
                        event.preventDefault();
                        jump(0);
                      }
                      if (event.key === "End") {
                        event.preventDefault();
                        jump(SURFACES.length - 1);
                      }
                    }}
                  >
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.nodeBody}>
                      <span className={styles.nodeCode}>{surface.code}</span>
                      <span className={styles.nodeName}>{surface.node}</span>
                      <span className={styles.nodePath}>
                        {surface.retrieval}
                        <span className={styles.nodeArrow} aria-hidden="true">
                          &rarr;
                        </span>
                        <span className={styles.nodeOutcome}>
                          {surface.outcome}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: the selected surface, in full. */}
        <div className={styles.panels}>
          {SURFACES.map((surface, index) => (
            <section
              key={surface.id}
              role="tabpanel"
              id={`${baseId}-panel-${index}`}
              aria-labelledby={`${baseId}-tab-${index}`}
              className={styles.panel}
              hidden={index !== active}
              /* Focusable: the panel holds no controls of its own, so this is
                 what lets a keyboard visitor reach and scroll the reading. */
              tabIndex={0}
            >
              <div className={styles.panelHead}>
                <span className={styles.surfaceCode}>{surface.code}</span>
                <h4 className={styles.surfaceTitle}>{titleCase(surface.title)}</h4>
                <p className={styles.surfaceMeta}>{surface.channels}</p>
                <p className={styles.surfaceStanding}>{surface.standing}</p>
              </div>

              <dl className={styles.passages}>
                {passagesOf(surface).map((passage, order) => (
                  <div key={passage.label} className={styles.passage}>
                    <dt className={styles.passageLabel}>
                      <span className={styles.passageIndex} aria-hidden="true">
                        {String(order + 1).padStart(2, "0")}
                      </span>
                      {passage.label}
                    </dt>
                    <dd className={styles.passageBody}>{passage.body}</dd>
                  </div>
                ))}
              </dl>

              {/* Where the surface stops describing the problem and BizzFly
                  answers it — marked, because it is the turn in the argument. */}
              <div className={styles.response}>
                <span className={styles.responseLabel}>What we do about it</span>
                <p className={styles.paragraph}>{surface.bizzflySolution}</p>

                <p className={styles.listLabel}>Core architectural disciplines</p>
                <ul className={styles.points}>
                  {surface.disciplines.map((discipline) => (
                    <li key={discipline} className={styles.point}>
                      {discipline}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* The two substrates underneath all three surfaces. */}
      <section className={styles.block}>
        <span className={styles.eyebrow}>Underneath all three</span>
        <h4 className={styles.blockTitle}>
          The Two Non-Negotiable Substrates
        </h4>
        <p className={styles.lead}>
          Surfaces are where buyers look. These two engineering foundations
          determine whether machine parsers can verify your capabilities and
          whether high-intent visitors convert into pipeline.
        </p>

        <div className={styles.foundations}>
          {FOUNDATIONS.map((foundation) => (
            <section key={foundation.code} className={styles.foundation}>
              <span className={styles.surfaceCode}>{foundation.code}</span>
              <h5 className={styles.foundationTitle}>{foundation.title}</h5>
              <p className={styles.question}>
                &ldquo;{foundation.question}&rdquo;
              </p>
              <p className={styles.paragraph}>{foundation.explanation}</p>

              <p className={styles.listLabel}>Core architecture</p>
              <ul className={styles.points}>
                {foundation.pillars.map((pillar) => (
                  <li key={pillar} className={styles.point}>
                    {pillar}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      {/* The self-assessment, stated rather than scored. */}
      <section className={styles.block}>
        <span className={styles.eyebrow}>A short self-assessment</span>
        <h4 className={styles.blockTitle}>
          Where Does Your Organisation Actually Stand?
        </h4>
        <p className={styles.lead}>
          Three statements. The ones you cannot say honestly are the surfaces
          where buyers are meeting your competitors instead of you.
        </p>

        <dl className={styles.checkList}>
          {SELF_CHECK.map((item) => (
            <div key={item.surface} className={styles.checkItem}>
              <dt className={styles.checkTerm}>{item.surface}</dt>
              <dd className={styles.checkBody}>
                <p className={styles.checkStatement}>
                  &ldquo;{item.statement}&rdquo;
                </p>
                <p className={styles.checkNote}>{item.ifNot}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Closing argument. */}
      <section className={styles.block}>
        <span className={styles.eyebrow}>The BizzFly position</span>
        <h4 className={styles.blockTitle}>
          Three Surfaces, Engineered As One System
        </h4>
        <p className={styles.paragraph}>
          Most digital agencies spend 100% of their organic retainer competing
          for traditional blue links from a decade ago, leaving their clients
          absent from the AI Overviews and conversational agents where modern
          enterprise shortlists are formed. BizzFly aligns your discoverability
          across all three surfaces while cementing the machine-readable
          foundations beneath them: ranked organic search, generative AI
          citations, conversational agent shortlists, a full JSON-LD knowledge
          graph, and sub-second conversion once the visitor arrives.
        </p>
      </section>
    </article>
  );
}
