import type { Faq } from "@/types/content";

/**
 * Bringing every page up to eight FAQs without inventing a single claim.
 *
 * Most entities ship two authored FAQs. The rest of each page, though, is
 * already answering questions a buyer asks — a practice states its process
 * stage by stage with durations, a service names who it is for and what is
 * out of scope, a technology is required to say when it should NOT be used.
 * That material was reachable only by reading the whole page.
 *
 * So nothing here is written: every answer below is the entity's own text,
 * and the question is a label placed on it. If a field is absent the question
 * is not asked, which is why a sparse entity simply ends up with fewer than
 * eight rather than with padding. That is the one rule this file exists to
 * enforce, and the reason it derives at render time instead of generating a
 * thousand static pairs into the content files: when the source copy is
 * edited the answer changes with it, and no answer can drift from the page
 * it is published on.
 *
 * These render into FAQPage structured data, so an invented answer here would
 * be an invented claim submitted to Google. Hence the guards: minimum answer
 * length, de-duplication against the authored questions, and a hard cap.
 */

/** Authored FAQs always come first; derivation only ever tops up to this. */
const TARGET = 8;

/**
 * Below this an "answer" is a fragment rather than something self-contained.
 * types/content.ts requires an answer that still makes sense pasted into a
 * chat window, and a six-word list item does not.
 */
const MIN_ANSWER = 40;

const normalise = (question: string) =>
  question.trim().toLowerCase().replace(/\s+/g, " ").replace(/[?.]+$/, "");

/** Joins an authored list into a sentence without rewording any item. */
function joinList(items: readonly string[] | undefined): string | undefined {
  const clean = (items ?? []).map((item) => item.trim()).filter(Boolean);
  if (!clean.length) return undefined;
  if (clean.length === 1) return clean[0];
  /*
   * Semicolons, not commas: several of these lists have items that already
   * contain commas, and comma-joining them produced a sentence where the
   * boundaries between items were unrecoverable.
   */
  const last = clean[clean.length - 1];
  return `${clean.slice(0, -1).join("; ")}; and ${last}`;
}

interface IndustryProblemLike {
  title: string;
  description: string;
}

interface ProcessLike {
  title: string;
  description: string;
  duration?: string;
}

interface Source {
  title: string;
  answer?: string;
  faqs?: Faq[];
  sections?: { heading: string; body: string[] }[];
  /* Practice / service / use-case process shapes. */
  process?: ProcessLike[];
  approach?: ProcessLike[];
  /* Service. */
  whoFor?: string[];
  included?: string[];
  problems?: unknown[];
  outcomes?: string[];
  outOfScope?: string[];
  timeline?: string;
  /* Industry. */
  context?: string;
  opportunity?: string;
  complianceNotes?: string;
  /* Use case. */
  symptoms?: string[];
  rootCauses?: string[];
  targetState?: string;
  realisticTimeline?: string;
  whyItMatters?: string;
  /* Technology. */
  whenNotToUse?: string[];
  decisionCriteria?: string[];
  choices?: { name: string; rationale: string }[];
  /* Resource / company page. */
  body?: string[];
}

export type FaqKind =
  | "practice"
  | "service"
  | "industry"
  | "use-case"
  | "technology"
  | "resource"
  | "company";

/**
 * Returns the entity's authored FAQs, topped up from its own content.
 *
 * Never exceeds eight, never repeats a question the author already wrote, and
 * never returns an entry whose answer did not already exist on the page.
 */
export function expandFaqs(entity: Source, kind: FaqKind): Faq[] {
  const out: Faq[] = [...(entity.faqs ?? [])];
  const seen = new Set(out.map((faq) => normalise(faq.question)));
  const title = entity.title;
  const lower = title.toLowerCase();

  const add = (question: string, answer: string | undefined) => {
    if (out.length >= TARGET) return;
    const text = answer?.trim();
    if (!text || text.length < MIN_ANSWER) return;
    const key = normalise(question);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ question, answer: text });
  };

  /* The page's own opening definition, which is written to be extractable. */
  if (kind === "use-case") add(`What does ${lower} actually involve?`, entity.answer);
  else if (kind === "industry") add(`How does BizzFly work with ${lower}?`, entity.answer);
  else if (kind === "resource") add(`What does this cover?`, entity.answer);
  else add(`What is ${title}?`, entity.answer);

  /* --- Kind-specific fields, asked in the order a buyer reaches them. --- */

  if (kind === "service") {
    add(`Who is ${lower} for?`, joinList(entity.whoFor));
    add("What is included?", joinList(entity.included));
    add("What problem does this solve?", joinList(entity.problems as string[]));
    add("What is this designed to improve?", joinList(entity.outcomes));
    add("How long does it take?", entity.timeline);
    /* Stated scope limits are the most-asked and least-published thing. */
    add("What is out of scope?", joinList(entity.outOfScope));
  }

  if (kind === "industry") {
    add(`What is different about ${lower}?`, entity.context);
    add("Where is the opportunity in this sector?", entity.opportunity);
    add("Are there sector-specific considerations?", entity.complianceNotes);
    /*
     * Each sector problem asked on its own. These are the four things the
     * page already argues go wrong here, stated in the sector's own
     * vocabulary, and a buyer checking whether we understand their business
     * is checking exactly these.
     */
    for (const problem of (entity.problems ?? []) as IndustryProblemLike[]) {
      if (!problem?.title || !problem?.description) continue;
      add(`${problem.title}: why does this happen?`, problem.description);
    }
  }

  if (kind === "use-case") {
    add("Why does this matter commercially?", entity.whyItMatters);
    add("How does this show up day to day?", joinList(entity.symptoms));
    add("Why does this usually happen?", joinList(entity.rootCauses));
    add("What does good look like?", entity.targetState);
    add("How long does this realistically take?", entity.realisticTimeline);
  }

  if (kind === "technology") {
    add(`Why does ${title} matter to the business?`, entity.whyItMatters);
    /* Mandatory in the model, and the question a technical buyer checks. */
    add(`When would you advise against ${title}?`, joinList(entity.whenNotToUse));
    add("How do you decide whether to use it?", joinList(entity.decisionCriteria));
    /*
     * Each choice asked on its own rather than joined into one answer. The
     * rationale is the whole point of a technology page here — the site's
     * position is that a stack page without reasons is a logo wall — so one
     * run-on sentence listing six tools would bury exactly the content that
     * justifies the page existing.
     */
    for (const choice of entity.choices ?? []) {
      if (!choice?.name || !choice?.rationale) continue;
      add(`Why ${choice.name}?`, choice.rationale);
    }
  }

  /*
   * Process stages, asked one at a time. The duration is appended only when
   * the entity published one, so no stage acquires a timeline it never had.
   */
  const stages = entity.process ?? entity.approach ?? [];
  for (const stage of stages) {
    add(
      `What happens during "${stage.title}"?`,
      stage.duration ? `${stage.description} (${stage.duration}.)` : stage.description,
    );
  }

  /*
   * Long-form sections last. The authored heading becomes the question: these
   * are written as the reader's own question or as the claim that answers it,
   * so they need no rephrasing, and the first paragraph is the answer.
   */
  for (const section of entity.sections ?? []) {
    add(section.heading, section.body?.[0]);
  }

  /*
   * Resources and company pages carry plain paragraph runs with no headings.
   *
   * Those paragraphs are deliberately NOT mined. A paragraph without a
   * heading has no authored question attached to it, and the only labels
   * available — "point 3", or the paragraph's own first clause — are either
   * meaningless or a question invented to justify the answer. Either one is
   * the padding this file exists to avoid, so these pages top up from their
   * sections or stay where they are.
   */

  return out.slice(0, TARGET);
}
