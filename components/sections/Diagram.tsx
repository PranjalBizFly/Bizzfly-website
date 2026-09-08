import type { DiagramKind } from "@/types/content";
import { SurfacePresence } from "./SurfacePresence";
import styles from "./Diagram.module.css";

/**
 * Subject-specific diagrams.
 *
 * Each one shows a real mechanism, so service categories look structurally
 * different from each other without any page needing bespoke components.
 * All are inline SVG: no image request, no library, no layout shift.
 *
 * Every diagram carries a title and description, and the same information is
 * available as text in the surrounding section — the visual is never the only
 * place a fact appears.
 */

/**
 * Text equivalents, shown in place of the SVG on narrow viewports.
 * Each says what the diagram shows, in the same words.
 */
const TEXT_ALTERNATIVE: Record<
  Exclude<DiagramKind, "none" | "search-surfaces">,
  { title: string; body: string }
> = {
  "system-architecture": {
    title: "Systems connected by people versus by integration",
    body: "Before: three systems, each bridged by a person moving data across by hand. After: the same three connected directly through an integration layer, with one declared source of truth per record.",
  },
  "process-transformation": {
    title: "A process before and after automation",
    body: "Before: five steps, four of them manual. After: the same outcome with one human decision point and a defined exception path for when the system is unsure.",
  },
  "ai-workflow": {
    title: "How a grounded AI system answers a question",
    body: "A request is matched against your own documented content, an answer is composed from what was retrieved, and anything below the confidence boundary is escalated to a person with full context.",
  },
  "content-structure": {
    title: "Page structure as a machine reads it",
    body: "An extractable page states its answer first, uses one heading level per section, and anchors its structured data to a single organisation entity. A page that buries the answer beneath a hero cannot be extracted at all.",
  },
};

interface DiagramProps {
  kind: DiagramKind;
}

const NODE_W = 96;
const NODE_H = 40;

function Node({
  x,
  y,
  label,
  accent = false,
}: {
  x: number;
  y: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx="2"
        className={accent ? styles.nodeAccent : styles.node}
      />
      <text
        x={x + NODE_W / 2}
        y={y + NODE_H / 2 + 3}
        className={accent ? styles.nodeTextAccent : styles.nodeText}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

/** System architecture — systems bridged by people versus by integration. */
function SystemArchitecture() {
  return (
    <svg
      viewBox="0 0 480 210"
      className={styles.svg}
      role="img"
      aria-labelledby="sys-title sys-desc"
    >
      <title id="sys-title">Systems connected by people versus by integration</title>
      <desc id="sys-desc">
        Above, three systems each connected to a person who moves data between
        them by hand. Below, the same three systems connected directly through
        an integration layer with one declared source of truth.
      </desc>

      <text x="0" y="12" className={styles.groupLabel}>
        BEFORE
      </text>
      <Node x={0} y={22} label="CRM" />
      <Node x={192} y={22} label="Spreadsheet" />
      <Node x={384} y={22} label="Accounts" />
      <path d="M96 42 L192 42" className={styles.lineDashed} />
      <path d="M288 42 L384 42" className={styles.lineDashed} />
      <text x="128" y="36" className={styles.lineLabel}>
        manual
      </text>
      <text x="320" y="36" className={styles.lineLabel}>
        manual
      </text>

      <text x="0" y="112" className={styles.groupLabel}>
        AFTER
      </text>
      <Node x={0} y={122} label="CRM" />
      <Node x={192} y={122} label="Integration" accent />
      <Node x={384} y={122} label="Accounts" />
      <path d="M96 142 L192 142" className={styles.line} />
      <path d="M288 142 L384 142" className={styles.line} />
      <text x="192" y="186" className={styles.caption}>
        One declared source of truth per record.
      </text>
    </svg>
  );
}

/** Process transformation — steps removed rather than steps automated. */
function ProcessTransformation() {
  return (
    <svg
      viewBox="0 0 480 190"
      className={styles.svg}
      role="img"
      aria-labelledby="proc-title proc-desc"
    >
      <title id="proc-title">A process before and after automation</title>
      <desc id="proc-desc">
        Before: five steps, four of them manual. After: the same outcome with
        one human decision point and an exception path when the system is
        unsure.
      </desc>

      <text x="0" y="12" className={styles.groupLabel}>
        BEFORE — 5 steps, 4 manual
      </text>
      {[0, 1, 2, 3, 4].map((index) => (
        <g key={index}>
          <rect
            x={index * 96}
            y={22}
            width="80"
            height="26"
            rx="2"
            className={index === 4 ? styles.nodeAccent : styles.node}
          />
          {index < 4 ? (
            <path
              d={`M${index * 96 + 80} 35 L${(index + 1) * 96} 35`}
              className={styles.lineDashed}
            />
          ) : null}
        </g>
      ))}

      <text x="0" y="102" className={styles.groupLabel}>
        AFTER — 1 decision, 1 exception path
      </text>
      <rect x="0" y="112" width="176" height="26" rx="2" className={styles.node} />
      <text x="88" y="129" className={styles.nodeText} textAnchor="middle">
        Automated
      </text>
      <path d="M176 125 L272 125" className={styles.line} />
      <rect x="272" y="112" width="112" height="26" rx="2" className={styles.nodeAccent} />
      <text x="328" y="129" className={styles.nodeTextAccent} textAnchor="middle">
        Human decision
      </text>
      <path d="M328 138 L328 160 L400 160" className={styles.lineDashed} />
      <text x="406" y="163" className={styles.lineLabel}>
        exception
      </text>
    </svg>
  );
}

/** AI workflow — retrieval grounded in your own content, with escalation. */
function AiWorkflow() {
  return (
    <svg
      viewBox="0 0 480 200"
      className={styles.svg}
      role="img"
      aria-labelledby="ai-title ai-desc"
    >
      <title id="ai-title">How a grounded AI system answers a question</title>
      <desc id="ai-desc">
        A request is matched against your own documented content, an answer is
        composed from what was retrieved, and anything below the confidence
        boundary is escalated to a person with the full context.
      </desc>

      <Node x={0} y={20} label="Request" />
      <path d="M96 40 L160 40" className={styles.line} />
      <Node x={160} y={20} label="Retrieve" accent />
      <path d="M256 40 L320 40" className={styles.line} />
      <Node x={320} y={20} label="Answer" />

      <path d="M208 60 L208 96" className={styles.line} />
      <rect x="128" y="96" width="160" height="28" rx="2" className={styles.node} />
      <text x="208" y="114" className={styles.nodeText} textAnchor="middle">
        Your own content
      </text>

      <path d="M368 60 L368 140 L288 140" className={styles.lineDashed} />
      <rect x="128" y="126" width="160" height="28" rx="2" className={styles.node} />
      <text x="208" y="144" className={styles.nodeText} textAnchor="middle">
        Escalate to a person
      </text>

      <text x="0" y="182" className={styles.caption}>
        Below the confidence boundary, a person takes over with full context.
      </text>
    </svg>
  );
}

/** Content structure — what a crawler sees versus what a visitor sees. */
function ContentStructure() {
  return (
    <svg
      viewBox="0 0 480 200"
      className={styles.svg}
      role="img"
      aria-labelledby="content-title content-desc"
    >
      <title id="content-title">
        Page structure as a machine reads it
      </title>
      <desc id="content-desc">
        A page with the answer stated first, one heading level per section, and
        structured data anchoring it to a single organisation entity — versus a
        page whose answer sits below a hero and cannot be extracted.
      </desc>

      <text x="0" y="12" className={styles.groupLabel}>
        EXTRACTABLE
      </text>
      <rect x="0" y="22" width="210" height="18" rx="1" className={styles.nodeAccent} />
      <text x="8" y="35" className={styles.nodeTextAccent}>
        H1 + answer, first in the DOM
      </text>
      {[46, 68, 90].map((y, index) => (
        <g key={y}>
          <rect x="0" y={y} width="210" height="14" rx="1" className={styles.node} />
          <text x="8" y={y + 10} className={styles.nodeTextSmall}>
            {["H2 section", "H2 section", "FAQ, self-contained"][index]}
          </text>
        </g>
      ))}
      <rect x="0" y="112" width="210" height="14" rx="1" className={styles.node} />
      <text x="8" y="122" className={styles.nodeTextSmall}>
        Schema → one entity
      </text>

      <text x="270" y="12" className={styles.groupLabel}>
        NOT EXTRACTABLE
      </text>
      <rect x="270" y="22" width="210" height="46" rx="1" className={styles.nodeMuted} />
      <text x="278" y="48" className={styles.nodeTextSmall}>
        Hero, no answer
      </text>
      {[74, 96].map((y) => (
        <rect
          key={y}
          x="270"
          y={y}
          width="210"
          height="14"
          rx="1"
          className={styles.nodeMuted}
        />
      ))}
      <rect x="270" y="118" width="210" height="14" rx="1" className={styles.nodeMuted} />
      <text x="278" y="128" className={styles.nodeTextSmall}>
        Answer, below the fold
      </text>

      <text x="0" y="180" className={styles.caption}>
        Extraction rewards the answer appearing before the argument.
      </text>
    </svg>
  );
}

export function Diagram({ kind }: DiagramProps) {
  if (kind === "none") return null;

  /*
   * search-surfaces is a table now, not a drawing. It needs no light/dark
   * wrapper: every colour in it comes from a semantic role, so it is already
   * correct in whichever context the page puts it.
   */
  if (kind === "search-surfaces") {
    return <SurfacePresence />;
  }

  const content = {
    "system-architecture": <SystemArchitecture />,
    "process-transformation": <ProcessTransformation />,
    "ai-workflow": <AiWorkflow />,
    "content-structure": <ContentStructure />,
  }[kind];

  if (!content) return null;

  return (
    <figure className={styles.figure}>
      {content}
      {/*
        Below md the SVG is hidden because its labels scale below legibility.
        The same information is presented as text, so nothing is lost on a
        phone and screen-reader users get it either way.
      */}
      <div className={styles.textAlternative}>
        <p className={styles.textAlternativeTitle}>{TEXT_ALTERNATIVE[kind].title}</p>
        <p className={styles.textAlternativeBody}>{TEXT_ALTERNATIVE[kind].body}</p>
      </div>
    </figure>
  );
}
