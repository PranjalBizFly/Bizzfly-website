import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { brand } from "@/lib/brand";

export const runtime = "nodejs";

/**
 * Per-page Open Graph image, generated from the page title.
 *
 * Built rather than sourced: there are no verified BizzFly photographs to
 * use, and one generic stock image repeated across 77 pages is worse than a
 * typographic card that actually names the page.
 *
 * The card is laid on brand ink, which is the surface the official logo is
 * drawn for — the supplied lockup is reversed, so ink is the only ground it
 * can sit on unaltered.
 *
 * Satori cannot read CSS custom properties, so colours come from lib/brand,
 * which mirrors styles/tokens.css.
 */

/*
 * The official mark, inlined once at module load. Satori has no access to
 * the network or the public route handler, so the file is read from disk and
 * handed over as a data URI. If it cannot be read the card still renders —
 * without the logo rather than with a text imitation of it, which the brand
 * guidelines rule out.
 */
const LOGO_SRC = (() => {
  try {
    const svg = readFileSync(
      join(process.cwd(), "public/brand/logo/bizzfly-logo-reversed.svg"),
    );
    return `data:image/svg+xml;base64,${svg.toString("base64")}`;
  } catch {
    return null;
  }
})();

/* 634 × 144 at a 44px cap keeps the official aspect ratio exactly. */
const LOGO_HEIGHT = 44;
const LOGO_WIDTH = Math.round((634 / 144) * LOGO_HEIGHT);

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = (searchParams.get("title") ?? "BizzFly").slice(0, 110);
  const kind = (searchParams.get("kind") ?? "page").replace(/-/g, " ");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.ink,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {LOGO_SRC ? (
            /* Satori renders to a raster image; next/image has no role here. */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={LOGO_SRC}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              alt="BizzFly"
            />
          ) : null}
          <span
            style={{
              fontSize: 18,
              color: brand.inkMuted,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            {kind}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 60 : 76,
            fontWeight: 600,
            color: brand.inkLight,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            borderTop: `1px solid ${brand.borderInverse}`,
            paddingTop: "28px",
          }}
        >
          {/* Green reaches 10.28:1 on ink, which is where it belongs. */}
          <span style={{ fontSize: 22, color: brand.green }}>
            Digital growth · AI · Automation · Technology
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
