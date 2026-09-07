import type { Metadata, Viewport } from "next";
import { Funnel_Sans, Poppins, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { BackToTop } from "@/components/navigation/BackToTop";
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
 * These CSS variables are bound to the design system's family tokens in
 * app/globals.css. Components only ever see --font-display / --font-body,
 * so replacing this loader with licensed font files later touches this file
 * and globals.css, and nothing else.
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

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Digital Growth, AI & Automation`,
    description: site.description,
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
      className={`${funnelSans.variable} ${poppins.variable} ${plexMono.variable}`}
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
        <div className="site">
          <Header nav={primaryNav} cta={primaryCta} />
          <main id="main" className="main">
            {children}
          </main>
          <Footer />
        </div>
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
