import styles from "./SurfacePresence.module.css";

interface Surface {
  code: string;
  surface: string;
  /** Whether a typical business is cited on this surface or missing from it. */
  present: boolean;
}

/**
 * The three surfaces one buyer question reaches, and whether a business is
 * usually on them. Carried verbatim from the diagram this replaces.
 */
const SURFACES: Surface[] = [
  { code: "SEO", surface: "Ranked results", present: true },
  { code: "AEO / GEO", surface: "AI answer", present: true },
  { code: "GEO", surface: "AI assistant", present: false },
];

const FOUNDATIONS = [
  "AIO — can a machine read you at all?",
  "SXO — do you convert what you win?",
];

/**
 * Where one buyer question actually lands.
 *
 * This replaces an SVG flow chart that drew the same three surfaces as boxes
 * joined by dashed lines. The chart had two problems that no amount of
 * restyling fixes: its labels were set at a fixed size inside a 420-unit
 * viewBox, so below `md` they fell under legibility and the whole thing had
 * to be swapped for a paragraph — meaning phone visitors never saw the
 * argument at all — and a screen reader got a `<title>`/`<desc>` summary
 * rather than the data.
 *
 * A table has neither problem. It reflows, it is readable at any width, the
 * relationship between a surface and its state is in the markup rather than
 * in the positions of rectangles, and it needs no parallel text version to
 * stay accessible.
 */
export function SurfacePresence() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.question}>
        <p className={styles.questionLabel}>One buyer question</p>
        <p className={styles.questionText}>&ldquo;who can do this for us?&rdquo;</p>
      </div>

      <table className={styles.table}>
        <caption className={styles.caption}>
          Where that question lands, and where a typical business is missing.
        </caption>
        <thead>
          <tr>
            <th scope="col">Layer</th>
            <th scope="col">Surface</th>
            <th scope="col" className={styles.stateHead}>
              Typical state
            </th>
          </tr>
        </thead>
        <tbody>
          {SURFACES.map((row) => (
            <tr key={row.code}>
              <th scope="row" className={styles.code}>
                {row.code}
              </th>
              <td>{row.surface}</td>
              <td className={styles.stateCell}>
                {/*
                  The word carries the meaning and the chip only styles it,
                  so this reads correctly with styles off and in a screen
                  reader without a visually-hidden duplicate.
                */}
                <span
                  className={styles.state}
                  data-present={row.present ? "true" : "false"}
                >
                  {row.present ? "Cited" : "Absent"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.foundations}>
        <p className={styles.foundationsLabel}>Underneath all three</p>
        <ul className={styles.foundationsList}>
          {FOUNDATIONS.map((item) => (
            <li key={item} className={styles.foundation}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.note}>
        One question, three surfaces. Most businesses are optimised for the
        first and absent from the others.
      </p>
    </div>
  );
}
