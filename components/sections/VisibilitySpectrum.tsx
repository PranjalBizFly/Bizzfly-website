import { visibilityLayers } from "@/content/homepage";
import { LayerTabs } from "./LayerTabs";

/**
 * Section 03 — the discoverability spectrum.
 *
 * An interactive relationship between SEO, AEO, GEO, AIO and SXO. Each layer
 * describes a genuinely different retrieval mechanism, which is the honest
 * reason they are five disciplines rather than five names for one thing.
 *
 * The rail-and-panel behaviour now lives in LayerTabs, so subpages comparing
 * a different set get the same interaction instead of a new one. This stays
 * as the homepage's call site: same data, same markup, same result.
 */
export function VisibilitySpectrum() {
  return (
    <LayerTabs
      label="Search and AI visibility layers"
      /*
        No `surface` sub-label on the rail.
        The codes here are the names — SEO, AEO, GEO, AIO, SXO — and each tab
        was carrying a second gloss under its code ("Ranked results", "Direct
        answers") that the panel beside it then explains properly. The rail is
        a set of five switches, not a place to start the argument.
      */
      items={visibilityLayers.map((layer) => ({
        code: layer.code,
        name: layer.name,
        question: layer.question,
        description: layer.description,
        facts: [{ label: "How it is won", value: layer.mechanism }],
        href: layer.href,
      }))}
    />
  );
}
