/**
 * Structural reading of authored prose.
 *
 * Every paragraph in the content model is written the same way: a claim in
 * the opening sentence, then the elaboration that earns it. "Retrieval
 * follows, and this is where most businesses are eliminated without knowing
 * it." then four sentences on why. "Start with access, because everything
 * else is wasted if this fails." then the checks.
 *
 * That shape is what lets a run of paragraphs be presented as a structure
 * rather than as a column of text, and it is why nothing here summarises,
 * rewrites or generates copy. The split cuts at the first sentence boundary
 * and returns both halves verbatim: every word an author wrote still reaches
 * the page, in the order they wrote it. No string here is generated.

 *
 * A paragraph that is a single sentence returns an empty `detail` and is
 * rendered as a statement, because there is nothing to put beneath it.
 */

/**
 * Abbreviations that end in a full stop without ending a sentence.
 *
 * Kept deliberately short. A long list is a guess about prose that has not
 * been written yet; these are the ones that actually occur in the content.
 */
const ABBREVIATIONS = [
  "e.g.",
  "i.e.",
  "etc.",
  "vs.",
  "No.",
  "Inc.",
  "Ltd.",
  "Pvt.",
  "Dr.",
  "Mr.",
  "Mrs.",
  "Ms.",
  "St.",
  "approx.",
];

export interface ProseClaim {
  /** The opening sentence, verbatim. */
  claim: string;
  /** Everything after it, verbatim. Empty when the paragraph is one sentence. */
  detail: string;
  /** The paragraph as authored, for callers that need it whole. */
  source: string;
  /**
   * Set when the claim enumerates rather than asserts — "The commitments that
   * matter are usually the boring ones: how quickly someone responds, what
   * counts as an emergency, and what happens when a target is missed."
   *
   * `lead` is the text before the colon and `items` the segments after it,
   * all verbatim. A composition can then set the lead as a statement and the
   * segments as the supporting points the author already wrote, rather than
   * running three things together into one line of prose.
   */
  enumeration?: { lead: string; items: string[] };
}

/**
 * Finds the end of the first sentence.
 *
 * Returns -1 when the paragraph does not contain a second sentence, which is
 * the signal to render it as a statement rather than a claim and a detail.
 */
function firstSentenceEnd(text: string): number {
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char !== "." && char !== "?" && char !== "!") continue;

    /* Decimals and version numbers: "1.5x", "Core Web Vitals 2.0". */
    if (char === "." && /\d/.test(text[i - 1] ?? "") && /\d/.test(text[i + 1] ?? "")) {
      continue;
    }

    /* An abbreviation's full stop is inside the sentence, not the end of it. */
    const preceding = text.slice(0, i + 1);
    if (ABBREVIATIONS.some((abbr) => preceding.endsWith(abbr))) continue;

    /* A sentence ends at whitespace followed by an opening character. */
    const rest = text.slice(i + 1);
    const match = /^\s+(["'“‘(]?[A-Z0-9])/.exec(rest);
    if (!match) continue;

    return i + 1;
  }
  return -1;
}

/** Reads one paragraph as a claim and its elaboration. Nothing is rewritten. */
function splitClaim(paragraph: string): ProseClaim {
  const source = paragraph.trim();
  const end = firstSentenceEnd(source);

  if (end === -1) {
    return { claim: source, detail: "", source };
  }

  const claim = source.slice(0, end).trim();
  const detail = source.slice(end).trim();
  return { claim, detail, source };
}

/**
 * Ordinal openings — "The most common failure is sequencing.", "The second
 * is entity ambiguity.", "The third is measuring only what is easy."
 *
 * Where a run opens this way the author has already numbered it, so the
 * composition can show that numbering instead of asserting an order the
 * content does not claim. Used to choose between a sequence and a plain set.
 */
const ORDINAL_OPENING =
  /^(first|second|third|fourth|fifth|then|next|finally|start|begin|the (first|second|third|fourth|fifth|next|last|most common)|interpretation|retrieval|selection|composition)\b/i;

/** True when a run of claims reads as an ordered sequence. */
export function readsAsSequence(claims: readonly ProseClaim[]): boolean {
  if (claims.length < 3) return false;
  const ordered = claims.filter((c) => ORDINAL_OPENING.test(c.claim)).length;
  return ordered >= Math.ceil(claims.length / 2);
}

/**
 * Reads a claim that enumerates.
 *
 * The content model contains a recurring shape: a short assertion, a colon,
 * then the two to five things it refers to — "The commitments that matter are
 * usually the boring ones: how quickly someone responds, what counts as an
 * emergency, what happens when a target is missed." Set as prose it is one
 * 29-word sentence a reader has to parse to count. Set as a statement and
 * three points it is legible at a glance, and not one word has changed.
 *
 * Deliberately conservative. It requires a colon, a lead short enough to read
 * as a statement, at least two segments, and a coordinating "and"/"or" before
 * the last one — the marker that separates a genuine list from a clause that
 * merely contains commas. Anything else stays prose, because a wrong split
 * here would put a fragment on the page as though it were a point.
 */
function readEnumeration(claim: string): { lead: string; items: string[] } | undefined {
  const colon = claim.indexOf(":");
  if (colon < 12) return undefined;

  const lead = claim.slice(0, colon).trim();
  const tail = claim.slice(colon + 1).replace(/[.]\s*$/, "").trim();
  if (!lead || !tail) return undefined;

  /* A lead that is itself a sentence's worth of prose is not a list header. */
  if (lead.split(/\s+/).length > 14) return undefined;

  /*
   * Split on commas and semicolons only. An em-dash inside a segment is an
   * aside, not a separator, and splitting on it produced fragments.
   */
  const raw = tail
    .split(/\s*[;,]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (raw.length < 2 || raw.length > 6) return undefined;

  /* The coordinating conjunction that marks the final item of a real list. */
  const last = raw[raw.length - 1] ?? "";
  if (!/^(and|or)\s+/i.test(last)) return undefined;

  /* Every segment has to carry enough to stand as a point. */
  if (raw.some((part) => part.split(/\s+/).length < 2)) return undefined;

  const items = raw.map((part, index) =>
    index === raw.length - 1 ? part.replace(/^(and|or)\s+/i, "").trim() : part,
  );
  if (items.some((item) => !item)) return undefined;

  return { lead, items };
}

/**
 * Reads a paragraph fully: claim, elaboration, and the enumeration inside the
 * claim where there is one. `splitClaim` stays the narrow primitive; this is
 * what the compositions call.
 */
export function readParagraph(paragraph: string): ProseClaim {
  const base = splitClaim(paragraph);
  const enumeration = readEnumeration(base.claim);
  if (!enumeration) return base;
  return { ...base, enumeration };
}

/** Reads a run of paragraphs. */
export function readParagraphs(paragraphs: readonly string[]): ProseClaim[] {
  return paragraphs.map(readParagraph);
}
