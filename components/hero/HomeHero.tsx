import { Container } from "@/components/layout/Container";
import { Button, ButtonGroup, TextLink } from "@/components/buttons";
import { DiscoveryDiagram } from "@/components/sections/DiscoveryDiagram";
import { primaryCta } from "@/content/navigation";
import styles from "./HomeHero.module.css";

/**
 * Homepage hero.
 *
 * Renders immediately with no entrance animation — the headline is the LCP
 * element, and animating it would delay LCP by definition.
 *
 * The visual is a diagram of the actual problem, not a decorative graphic or
 * a fake product screenshot.
 */
export function HomeHero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>
              Digital growth · AI · Automation · Technology
            </p>

            <h1 className={styles.title}>
              Get found. Build well. Automate the rest.
            </h1>

            <p className={styles.lead}>
              Your buyers now search in two places: Google, and the AI systems
              answering on Google&rsquo;s behalf. BizzFly makes businesses
              visible in both — then builds the websites, software and
              automation that turn that visibility into revenue.
            </p>

            <div className={styles.actions}>
              <ButtonGroup>
                <Button href={primaryCta.href} size="lg" withArrow>
                  {primaryCta.label}
                </Button>
                <TextLink href="/services/">Explore services</TextLink>
              </ButtonGroup>
            </div>

            <dl className={styles.summary}>
              <div className={styles.summaryItem}>
                <dt>Be found</dt>
                <dd>Search, AI answers and maps</dd>
              </div>
              <div className={styles.summaryItem}>
                <dt>Build</dt>
                <dd>Websites, software, applications</dd>
              </div>
              <div className={styles.summaryItem}>
                <dt>Automate</dt>
                <dd>Support, sales, back office</dd>
              </div>
            </dl>
          </div>

          <div className={styles.visual}>
            <DiscoveryDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}
