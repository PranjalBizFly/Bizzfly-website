/**
 * Title case for headings.
 *
 * Applied where a heading string enters a heading component — the three
 * heroes, SectionHeader, the typography Heading, and the handful of sections
 * that render their own <h2> — rather than by rewriting the 1,100+ authored
 * strings in content/. One function, one place per component, and new content
 * is covered the day it is written.
 *
 * THE RULE THAT DOES THE REAL WORK: a word that already contains an uppercase
 * letter is returned untouched.
 *
 * That single test preserves everything that must not be normalised, without
 * anyone maintaining a dictionary of it:
 *
 *   SEO, AEO, GEO, AIO, SXO, RAG, LLM, RPA, API, CRM, CMS, GA4, UI, UX, WCAG
 *   BizzFly, WordPress, JavaScript, PostgreSQL, GitHub, TypeScript
 *   E-commerce, Non-Profit, AI-Powered, Server-Side
 *
 * All of those carry a capital already, so none of them is touched. Only a
 * word that is entirely lowercase is capitalised, which is exactly the set the
 * request is about.
 *
 * Every word is capitalised including short prepositions and articles — "For",
 * "With", "In", "A" — because that is what was asked for, and it is what the
 * examples in the brief show. It is not publishing-standard title case, which
 * would lowercase those; the difference is deliberate.
 */

/**
 * Lowercase tokens that are names rather than words.
 *
 * The uppercase test above cannot save these, because they carry no capital of
 * their own — but capitalising them would be wrong in a different way: these
 * are literal identifiers a reader may have to type or search for.
 */
const LOWERCASE_IDENTIFIERS = new Set([
  "robots.txt",
  "llms.txt",
  "sitemap.xml",
  ".htaccess",
  "npm",
  "px",
  "rem",
  "vs",
]);

/** A word carries a capital already, so it is intentional. Leave it alone. */
const hasUppercase = (word: string) => /[A-Z]/.test(word);

/**
 * Capitalise the first *letter*, not the first character.
 *
 * A token can open with punctuation — an opening quote, a bracket, an
 * ampersand — and uppercasing position zero would do nothing to the letter
 * that follows it. Capitalising after an apostrophe is the same bug in the
 * other direction: "don't" must not become "Don'T", so only the first letter
 * in the token is touched and the rest is left exactly as written.
 */
function capitaliseFirstLetter(word: string): string {
  const index = word.search(/[a-z]/);
  if (index === -1) return word;
  return word.slice(0, index) + word[index]!.toUpperCase() + word.slice(index + 1);
}

/**
 * Title-case one heading.
 *
 * Whitespace is preserved exactly — the string is split on the gaps rather
 * than collapsed — so a heading keeps any deliberate spacing and non-breaking
 * spaces survive.
 */
export function titleCase(input: string): string {
  return input
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s*$/.test(token) || token === "") return token;
      if (LOWERCASE_IDENTIFIERS.has(token.toLowerCase())) return token;
      if (hasUppercase(token)) return token;

      /*
       * Hyphenated and slashed compounds are capitalised on both sides —
       * "day-to-day" becomes "Day-To-Day" — because each part is a word in the
       * heading. A compound that should keep an internal lowercase already
       * carries a capital somewhere and was returned above.
       */
      return token
        .split(/([-/])/)
        .map((part) => (part === "-" || part === "/" ? part : capitaliseFirstLetter(part)))
        .join("");
    })
    .join("");
}
