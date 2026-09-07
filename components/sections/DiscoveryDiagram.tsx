import styles from "./DiscoveryDiagram.module.css";

/**
 * The hero visual.
 *
 * Not decoration: it shows what actually happens to one buyer question now —
 * it fans out across three discovery surfaces, and a business is either
 * present on each or absent from it. That is the whole BizzFly proposition
 * in a diagram, which is why it earns its place (design principle P5).
 *
 * Pure inline SVG. No image request, no library, no layout shift.
 */
export function DiscoveryDiagram() {
  return (
    <figure className={styles.wrapper}>
      <svg
        viewBox="0 0 420 300"
        className={styles.svg}
        role="img"
        aria-labelledby="discovery-diagram-title discovery-diagram-desc"
      >
        <title id="discovery-diagram-title">
          How one buyer question reaches three discovery surfaces
        </title>
        <desc id="discovery-diagram-desc">
          A single buyer question branches into ranked search results, an
          AI-generated answer, and an AI assistant. A business is either present
          on each surface or absent from it.
        </desc>

        {/* Query node */}
        <g>
          <rect
            x="130"
            y="8"
            width="160"
            height="34"
            rx="2"
            className={styles.queryBox}
          />
          <text x="210" y="24" className={styles.queryLabel} textAnchor="middle">
            BUYER QUESTION
          </text>
          <text x="210" y="36" className={styles.queryText} textAnchor="middle">
            &ldquo;who can do this for us?&rdquo;
          </text>
        </g>

        {/* Branch lines */}
        <g className={styles.lines}>
          <path d="M210 42 L210 66 L70 66 L70 96" />
          <path d="M210 42 L210 96" />
          <path d="M210 42 L210 66 L350 66 L350 96" />
        </g>

        {/* Three surfaces */}
        {[
          { x: 70, code: "SEO", label: "Ranked results", present: true },
          { x: 210, code: "AEO / GEO", label: "AI answer", present: true },
          { x: 350, code: "GEO", label: "AI assistant", present: false },
        ].map((surface) => (
          <g key={surface.label}>
            <rect
              x={surface.x - 58}
              y="96"
              width="116"
              height="70"
              rx="2"
              className={styles.surfaceBox}
            />
            <text
              x={surface.x}
              y="114"
              className={styles.surfaceCode}
              textAnchor="middle"
            >
              {surface.code}
            </text>
            <text
              x={surface.x}
              y="132"
              className={styles.surfaceLabel}
              textAnchor="middle"
            >
              {surface.label}
            </text>
            <rect
              x={surface.x - 34}
              y="142"
              width="68"
              height="16"
              rx="1"
              className={
                surface.present ? styles.statePresent : styles.stateAbsent
              }
            />
            <text
              x={surface.x}
              y="153"
              className={
                surface.present ? styles.stateTextOn : styles.stateTextOff
              }
              textAnchor="middle"
            >
              {surface.present ? "CITED" : "ABSENT"}
            </text>
          </g>
        ))}

        {/* Foundation layer */}
        <g className={styles.lines}>
          <path d="M70 166 L70 196 L210 196" />
          <path d="M210 166 L210 196" />
          <path d="M350 166 L350 196 L210 196" />
        </g>

        <rect
          x="60"
          y="206"
          width="300"
          height="30"
          rx="2"
          className={styles.foundationBox}
        />
        <text x="210" y="225" className={styles.foundationText} textAnchor="middle">
          AIO — can a machine read you at all?
        </text>

        <rect
          x="60"
          y="248"
          width="300"
          height="30"
          rx="2"
          className={styles.foundationBox}
        />
        <text x="210" y="267" className={styles.foundationText} textAnchor="middle">
          SXO — do you convert what you win?
        </text>
      </svg>

      {/* Text equivalent for narrow viewports, where SVG labels are illegible. */}
      <p className={styles.textAlternative}>
        One buyer question reaches three discovery surfaces: ranked search
        results, an AI-generated answer, and an AI assistant. A business is
        either cited on each or absent from it. Underneath sit two foundations
        — whether a machine can read you at all, and whether you convert what
        you win.
      </p>

      <figcaption className={styles.caption}>
        One question, three surfaces. Most businesses are optimised for the
        first and absent from the others.
      </figcaption>
    </figure>
  );
}
