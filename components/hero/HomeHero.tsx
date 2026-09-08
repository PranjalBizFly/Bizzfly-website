import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button, ButtonGroup, TextLink } from "@/components/buttons";
import { DiscoveryDiagram } from "@/components/sections/DiscoveryDiagram";
import { primaryCta } from "@/content/navigation";
import { getHomepageImages } from "@/content/images";
import styles from "./HomeHero.module.css";

/**
 * Homepage hero.
 *
 * Combines authentic technology team visual realism with the discovery
 * diagram, demonstrating human expertise behind AI and digital systems.
 */
export function HomeHero() {
  const images = getHomepageImages();

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
            <div className={styles.heroVisualFrame}>
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                width={images.hero.width}
                height={images.hero.height}
                priority
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 45vw, 100vw"
                className={styles.heroImage}
              />
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} />
                <span>BizzFly engineering & growth team · Pune</span>
              </div>
            </div>
            <div className={styles.diagramWrapper}>
              <DiscoveryDiagram />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
