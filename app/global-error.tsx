"use client";

import { brand } from "@/lib/brand";

/**
 * Root error boundary. Replaces the whole document, so it carries its own
 * html/body and inline styles rather than relying on the app shell — which
 * means no stylesheet, and therefore no design tokens. Colours come from
 * lib/brand, the mirror of styles/tokens.css kept for exactly these cases.
 *
 * The ground is brand ink by choice — an error page should not look like a
 * working one — so this carries the reversed lockup, which is the variant
 * that ground calls for. It is served as a plain <img> from /public rather
 * than reconstructed, and plain rather than next/image because the app
 * shell has failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.ink,
          color: brand.inkLight,
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <main style={{ maxWidth: "34rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo/bizzfly-logo-reversed.svg"
            alt="BizzFly"
            height={30}
            width={132}
            style={{ display: "block" }}
          />
          <h1
            style={{
              fontSize: "2rem",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "1.5rem 0 0",
            }}
          >
            Something went badly wrong
          </h1>
          <p style={{ color: brand.inkMuted, lineHeight: 1.6, marginTop: "1rem" }}>
            The site failed to load. Please try again, or email
            sales@bizzfly.com
            {error.digest ? ` and quote reference ${error.digest}` : ""}.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              minHeight: "2.75rem",
              padding: "0 1.5rem",
              /* Matches the primary button: 4.83:1 with white. */
              background: brand.blue,
              color: brand.white,
              border: "none",
              borderRadius: "4px",
              fontSize: "0.9375rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
