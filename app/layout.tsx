import type { Metadata, Viewport } from "next";
import { Funnel_Sans, Poppins } from "next/font/google";
import { Header } from "@/components/navigation/Header";
import { ValueTicker } from "@/components/navigation/ValueTicker";
import { Footer } from "@/components/footer/Footer";
import { BackToTop } from "@/components/navigation/BackToTop";
import { ConsultationProvider } from "@/components/consultation";
import { site, locale } from "@/content/site";
import { brand } from "@/lib/brand";
import { themeInitScript } from "@/lib/theme";
import { primaryNav, primaryCta } from "@/content/navigation";
import "./globals.css";

/*
 * The brand typefaces, self-hosted by next/font with automatic
 * metric-matched fallbacks — the swap causes no layout shift, and nothing
 * is fetched from a third-party origin, so the CSP stays at font-src 'self'.
 *
 * Funnel Sans is loaded as a variable font: a single file covers the whole
 * 300–800 range, including the SemiBold (600) the brand specifies for
 * display, and weighs less over the wire than the static cuts it replaces.
 * Poppins publishes no variable build, so its three brand weights —
 * Regular 400, Medium 500, Bold 700 — are requested explicitly.
 *
 * A note for anyone auditing weights: --weight-semibold (600) is a Funnel
 * Sans weight, and the variable file covers it exactly. Where that token
 * lands on a Poppins element instead — about a dozen labels and footer
 * headings per page — CSS font matching resolves it up to the 700 cut, so
 * it renders as Bold. That is still inside the brand set, which is why the
 * weights here stay 400/500/700: verify:brand enforces exactly that trio.
 * Loading a 600 cut to make those elements match the token would put a
 * non-brand Poppins weight on the wire.
 *
 * These two are the ENTIRE typeface list, because the brand guidelines
 * specify exactly two families. A third — IBM Plex Mono — was previously
 * loaded here and used for eyebrows, meta lines and labels across the site;
 * that role now resolves to Poppins through --font-label, and the machine
 * -string token --font-mono is a system stack. One fewer webfont request
 * and one fewer non-brand typeface on the page.
 *
 * These CSS variables are bound to the design system's family tokens in
 * app/globals.css. Components only ever see --font-display / --font-body /
 * --font-label, so replacing this loader with licensed font files later
 * touches this file and globals.css, and nothing else.
 */
const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "700"],
});

const defaultOgImage = `/og/?title=${encodeURIComponent(
  `${site.name} — Digital Growth, AI & Automation`,
)}&kind=page`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Digital Growth, AI & Automation`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Digital Growth, AI & Automation`,
    description: site.description,
    /*
     * The default share image. Pages built through buildMetadata override it
     * with one generated from their own title; this covers the few that set
     * their metadata directly and would otherwise ship no og:image at all.
     */
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Digital Growth, AI & Automation`,
    description: site.description,
    images: [defaultOgImage],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: brand.ink,
};

/**
 * Organization schema with a stable @id.
 * Every page's schema references this, which is what turns a set of pages
 * into one machine-readable entity — the foundation of AI visibility.
 * Only verified facts appear here.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.description,
  founder: { "@type": "Person", name: site.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    addressLocality: site.contact.address.city,
    addressRegion: site.contact.address.region,
    postalCode: site.contact.address.postalCode,
    addressCountry: site.contact.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.contact.phone,
    email: site.contact.email,
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["en"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": `${site.url}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/search/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={locale}
      className={`${funnelSans.variable} ${poppins.variable}`}
      /*
        data-theme is written by the script below before React sees the
        document, so the server markup and the live attribute differ by
        design. Without this, React would warn on every page load.
      */
      suppressHydrationWarning
    >
      <body>
        {/*
          First element in the body, and inline, so it executes while the
          browser is still parsing — before any of the markup below it is
          painted. That is what stops a dark-theme visitor seeing a white
          flash; a React effect would run far too late.

          It must NOT be wrapped in a <head> element: the App Router builds
          <head> itself, and rendering a literal one breaks hydration for the
          whole tree, which silently turns off every interactive component on
          the site.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/*
          The consultation dialog is mounted once, here, around the whole
          site: every CTA opens the same modal, and the form it holds
          survives both closing it and navigating between pages. See
          components/consultation/ConsultationProvider.
        */}
        <ConsultationProvider>
        <div className="site">
          {/*
            Above the header in the document, and the header is sticky — so the
            strip scrolls away on the first gesture instead of occupying the
            fixed chrome for the whole session.
          */}
          <ValueTicker />
          <Header nav={primaryNav} cta={primaryCta} />
          <main id="main" className="main">
            {children}
          </main>
          <Footer />
        </div>
        </ConsultationProvider>
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
