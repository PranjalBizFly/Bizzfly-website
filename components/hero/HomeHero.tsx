import Link from "next/link";
import { Button, ButtonGroup } from "@/components/buttons";
import { Marquee, MarqueeItem } from "@/components/motion/Marquee";
import { primaryCta } from "@/content/navigation";
import { titleCase } from "@/lib/titleCase";
import { visibilityLayers } from "@/content/homepage";
import { getHomepageImages } from "@/content/images";
import { CinematicHero } from "./CinematicHero";
import styles from "./HomeHero.module.css";

/**
 * Homepage hero.
 *
 * The photograph runs off the right edge of the viewport at full height and
 * the type sits on the ground beside it, with the three jobs layered across
 * the boundary as cards. That overlap is the whole composition: it is what
 * separates an image-led hero from a picture placed next to a paragraph.
 *
 * The discovery diagram that used to sit in this hero has moved down to the
 * problems section, which is the argument it actually illustrates — one
 * buyer question reaching three surfaces, and a business absent from some.
 *
 * The band underneath runs the five discoverability surfaces continuously.
 * It is the only place the whole spectrum appears above the fold, and it is
 * real content: each cell links to the service page for that layer.
 */
export function HomeHero() {
  const images = getHomepageImages();

  return (
    <>
      <CinematicHero
        image={images.hero}
        composition="bleed-right"
        priority
        /* A keyword line, so it types. The only typed text on the site —
           see typeEyebrow in CinematicHero for why it is opt-in. */
        typeEyebrow
        eyebrow="Digital growth · AI · Automation · Technology"
        title="Get found. Build well. Automate the rest."
        lead="Your buyers now search in two places: Google, and the AI systems answering on Google's behalf. BizzFly makes businesses visible in both, then builds the websites, software and automation that turn that visibility into revenue."
        actions={
          <ButtonGroup>
            <Button href={primaryCta.href} size="lg" withArrow>
              {titleCase(primaryCta.label)}
            </Button>
            <Button href="/services/" size="lg" variant="secondary">
              Explore Services
            </Button>
          </ButtonGroup>
        }
        facts={[
          { label: "Be Found", value: "Search, AI answers and maps" },
          { label: "Build", value: "Websites, software, applications" },
          { label: "Automate", value: "Support, sales, back office" },
        ]}
      />

      {/*
        Full-bleed by design: it sits outside any container so it runs the
        width of the viewport and reads as a rule under the hero rather than
        as another contained block.
      */}
      <div className={styles.ticker}>
        <Marquee label="The five discoverability surfaces" duration={48}>
          {visibilityLayers.map((layer) => (
            <MarqueeItem key={layer.code}>
              <Link href={layer.href} className={styles.tickerLink}>
                {/*
                  Code and full name only. Each cell used to close with the
                  layer's short gloss — "Ranked results", "Direct answers",
                  "After the click" — which made a strip of five links read as
                  five sentences travelling past, and the full name already
                  says the same thing in words the reader can act on. The
                  separator that used to hang off that span now hangs off the
                  name; see HomeHero.module.css.
                */}
                <span className={styles.tickerCode}>{layer.code}</span>
                <span className={styles.tickerName}>{layer.name}</span>
              </Link>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>
    </>
  );
}
