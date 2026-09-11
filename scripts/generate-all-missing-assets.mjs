import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();

// 1. Accessibility Commitment Charter
const a11yCommitmentSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bgA11y" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#141B24"/>
      <stop offset="100%" stop-color="#0A0D11"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgA11y)"/>

  <!-- Title Header -->
  <text x="600" y="80" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle" letter-spacing="2">BIZZFLY ACCESSIBILITY &amp; INCLUSION COMMITMENT</text>
  <text x="600" y="110" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle" letter-spacing="1">WCAG 2.2 LEVEL AA CONFORMANCE · SCREEN READER AUDITED · 4.5:1 CONTRAST ENFORCED</text>

  <!-- 4 Core Pillars -->
  <g transform="translate(100, 160)">
    <rect x="0" y="0" width="480" height="230" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="30" y="45" fill="#10B981" font-family="system-ui, sans-serif" font-size="16" font-weight="700">1. PERCEIVABLE STANDARDS</text>
    <text x="30" y="80" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Minimum 4.5:1 text-to-background contrast ratio across all themes</text>
    <text x="30" y="110" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Informative, context-aware alt text on every functional image</text>
    <text x="30" y="140" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Semantic HTML5 landmarks (main, nav, header, section, footer)</text>
    <text x="30" y="170" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Responsive zoom support up to 200% without loss of content</text>
    <text x="30" y="205" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Continuous automated audit in CI/CD pipeline</text>
  </g>

  <g transform="translate(620, 160)">
    <rect x="0" y="0" width="480" height="230" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="30" y="45" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="16" font-weight="700">2. OPERABLE INTERACTION</text>
    <text x="30" y="80" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• 100% keyboard navigable without mouse dependency</text>
    <text x="30" y="110" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Distinct, high-contrast 2px focus ring indicator on interactive elements</text>
    <text x="30" y="140" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Skip-to-content bypass navigation links on all templates</text>
    <text x="30" y="170" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Zero keyboard traps in modal dialogs or dropdown menus</text>
    <text x="30" y="205" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Manual testing on macOS VoiceOver &amp; Windows NVDA</text>
  </g>

  <g transform="translate(100, 420)">
    <rect x="0" y="0" width="480" height="230" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="30" y="45" fill="#E08738" font-family="system-ui, sans-serif" font-size="16" font-weight="700">3. UNDERSTANDABLE COPY &amp; UI</text>
    <text x="30" y="80" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Plain, predictable language free of unverified corporate jargon</text>
    <text x="30" y="110" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Clear, descriptive form labels and inline validation error notices</text>
    <text x="30" y="140" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Predictable navigation structure consistent across all 300+ routes</text>
    <text x="30" y="170" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Programmatic heading hierarchy strictly enforced (single H1 per page)</text>
    <text x="30" y="205" fill="#E08738" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Editorial readability score: Grade 9 or clearer</text>
  </g>

  <g transform="translate(620, 420)">
    <rect x="0" y="0" width="480" height="230" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="30" y="45" fill="#A855F7" font-family="system-ui, sans-serif" font-size="16" font-weight="700">4. ROBUST ARCHITECTURE</text>
    <text x="30" y="80" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Valid HTML conforming to W3C specifications without parser errors</text>
    <text x="30" y="110" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Clean ARIA attributes applied only where native HTML is insufficient</text>
    <text x="30" y="140" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Server-side prerendered content accessible with JavaScript disabled</text>
    <text x="30" y="170" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="13">• Motion sensitivity: prefers-reduced-motion respected globally</text>
    <text x="30" y="205" fill="#A855F7" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Verified zero motion sickness triggers</text>
  </g>

  <!-- Footer -->
  <text x="600" y="720" fill="#6B7280" font-family="system-ui, monospace" font-size="11" text-anchor="middle">BIZZFLY ACCESSIBILITY SPECIFICATION · ENFORCED ON EVERY RELEASE</text>
</svg>
`;

// 2. Press Kit Brand System Blueprint
const pressKitSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bgPress" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#141922"/>
      <stop offset="100%" stop-color="#0A0D11"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgPress)"/>

  <text x="600" y="80" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle" letter-spacing="2">BIZZFLY BRAND IDENTITY &amp; DESIGN TOKENS</text>
  <text x="600" y="110" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle" letter-spacing="1">OFFICIAL LOGOMARKS · COLOR TOKENS · TYPOGRAPHY SCALE · ASSET GUIDELINES</text>

  <!-- Brand Mark Box -->
  <g transform="translate(100, 160)">
    <rect x="0" y="0" width="480" height="260" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="30" y="45" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="16" font-weight="700">PRIMARY LOGOMARK &amp; MONOGRAM</text>
    
    <!-- Stylized BizzFly Rocket Icon & Text -->
    <g transform="translate(40, 80)">
      <rect x="0" y="0" width="80" height="80" rx="16" fill="#1E293B" stroke="#E08738" stroke-width="2"/>
      <polygon points="40,15 65,55 40,45 15,55" fill="#E08738"/>
      <polygon points="40,25 55,52 40,45" fill="#F59E0B"/>
      <circle cx="40" cy="38" r="5" fill="#FFFFFF"/>
      <text x="100" y="52" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="34" font-weight="800" letter-spacing="1">BizzFly</text>
      <text x="102" y="74" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="13" letter-spacing="2">DIGITAL GROWTH &amp; AI</text>
    </g>

    <text x="30" y="200" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">Minimum Clear Space: 1x Icon Width on all sides</text>
    <text x="30" y="225" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">Formats: SVG Vector (Master), WebP &amp; PNG @ 2x / 3x</text>
  </g>

  <!-- Color Palette Box -->
  <g transform="translate(620, 160)">
    <rect x="0" y="0" width="480" height="260" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="30" y="45" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="16" font-weight="700">CORE COLOR PALETTE</text>

    <!-- Color Swatches -->
    <g transform="translate(30, 75)">
      <!-- Swatch 1 -->
      <rect x="0" y="0" width="90" height="70" rx="6" fill="#12161A" stroke="#4B5563"/>
      <text x="45" y="95" fill="#9CA3AF" font-family="monospace" font-size="11" text-anchor="middle">#12161A</text>
      <text x="45" y="112" fill="#E5E7EB" font-family="sans-serif" font-size="11" text-anchor="middle">Ground</text>

      <!-- Swatch 2 -->
      <rect x="110" y="0" width="90" height="70" rx="6" fill="#1E2631" stroke="#4B5563"/>
      <text x="155" y="95" fill="#9CA3AF" font-family="monospace" font-size="11" text-anchor="middle">#1E2631</text>
      <text x="155" y="112" fill="#E5E7EB" font-family="sans-serif" font-size="11" text-anchor="middle">Surface</text>

      <!-- Swatch 3 -->
      <rect x="220" y="0" width="90" height="70" rx="6" fill="#E08738"/>
      <text x="265" y="95" fill="#9CA3AF" font-family="monospace" font-size="11" text-anchor="middle">#E08738</text>
      <text x="265" y="112" fill="#E5E7EB" font-family="sans-serif" font-size="11" text-anchor="middle">Amber Core</text>

      <!-- Swatch 4 -->
      <rect x="330" y="0" width="90" height="70" rx="6" fill="#10B981"/>
      <text x="375" y="95" fill="#9CA3AF" font-family="monospace" font-size="11" text-anchor="middle">#10B981</text>
      <text x="375" y="112" fill="#E5E7EB" font-family="sans-serif" font-size="11" text-anchor="middle">Emerald</text>
    </g>

    <text x="30" y="225" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">Strict AA Contrast: Every pairing verified by docs/design-system/verify-contrast.mjs</text>
  </g>

  <!-- Typography & Assets Box -->
  <g transform="translate(100, 450)">
    <rect x="0" y="0" width="1000" height="230" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="30" y="45" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="16" font-weight="700">TYPOGRAPHY HIERARCHY &amp; ASSET SPECS</text>

    <g transform="translate(30, 80)">
      <text x="0" y="25" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="28" font-weight="700">Display Heading 1 (48px / 1.1)</text>
      <text x="0" y="65" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="20" font-weight="600">Section Title 2 (28px / 1.25)</text>
      <text x="0" y="105" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="16">Body Copy Large (18px / 1.6) — Editorial reading measure 68ch</text>
    </g>

    <g transform="translate(600, 80)">
      <text x="0" y="20" fill="#E08738" font-family="system-ui, sans-serif" font-size="13" font-weight="700">PRESS INQUIRIES &amp; ASSET LICENSING</text>
      <text x="0" y="45" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">Official Headshots, Vector SVGs &amp; B-Roll:</text>
      <text x="0" y="70" fill="#38BDF8" font-family="monospace" font-size="13">press@bizzfly.com · +91 (020) 6742 0100</text>
      <text x="0" y="95" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">BizzFly Innovation Hub, Kharadi, Pune 411014, Maharashtra, India</text>
    </g>
  </g>

  <text x="600" y="730" fill="#6B7280" font-family="system-ui, monospace" font-size="11" text-anchor="middle">BIZZFLY BRAND GUIDELINES V2.4 · REPRODUCTION SUBJECT TO WRITTEN AUTHORIZATION</text>
</svg>
`;

// 3. Vendor Ecosystem Blueprint
const vendorSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bgVendor" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#131922"/>
      <stop offset="100%" stop-color="#090C0F"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgVendor)"/>

  <text x="600" y="80" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle" letter-spacing="2">ENTERPRISE VENDOR &amp; PARTNER ECOSYSTEM</text>
  <text x="600" y="110" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle" letter-spacing="1">TIER-1 CLOUD INFRASTRUCTURE · SECURE AI RUNTIMES · AUDITED TOOLING STANDARDS</text>

  <!-- 4 Ecosystem Columns -->
  <g transform="translate(100, 160)">
    <!-- Col 1: Cloud & Edge -->
    <rect x="0" y="0" width="220" height="490" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="40" fill="#E08738" font-family="system-ui, sans-serif" font-size="13" font-weight="700">CLOUD &amp; EDGE RUNTIMES</text>
    <line x1="20" y1="60" x2="200" y2="60" stroke="#2D3748"/>
    <text x="20" y="95" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">AWS Mumbai</text>
    <text x="20" y="115" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">ap-south-1 Compute &amp; S3</text>
    <text x="20" y="155" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Vercel Enterprise</text>
    <text x="20" y="175" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Global Edge SSR Delivery</text>
    <text x="20" y="215" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Cloudflare</text>
    <text x="20" y="235" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">DDoS Shield &amp; Zero Trust</text>
    <text x="20" y="450" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600">SLA: 99.99% Uptime</text>
  </g>

  <g transform="translate(360, 160)">
    <!-- Col 2: AI & LLM Models -->
    <rect x="0" y="0" width="220" height="490" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="40" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="13" font-weight="700">AI &amp; EMBEDDING MODELS</text>
    <line x1="20" y1="60" x2="200" y2="60" stroke="#2D3748"/>
    <text x="20" y="95" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Anthropic Claude</text>
    <text x="20" y="115" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Sonnet 3.7 Reasoning Core</text>
    <text x="20" y="155" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">OpenAI Enterprise</text>
    <text x="20" y="175" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">GPT-4o &amp; Embeddings v3</text>
    <text x="20" y="215" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Google Gemini</text>
    <text x="20" y="235" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Flash 2.0 Multimodal API</text>
    <text x="20" y="450" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Zero Data Training Policy</text>
  </g>

  <g transform="translate(620, 160)">
    <!-- Col 3: Database & Analytics -->
    <rect x="0" y="0" width="220" height="490" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="40" fill="#10B981" font-family="system-ui, sans-serif" font-size="13" font-weight="700">DATA &amp; TELEMETRY</text>
    <line x1="20" y1="60" x2="200" y2="60" stroke="#2D3748"/>
    <text x="20" y="95" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">PostgreSQL (Prisma)</text>
    <text x="20" y="115" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">ACID Relational Storage</text>
    <text x="20" y="155" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Redis Enterprise</text>
    <text x="20" y="175" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Sub-10ms In-Memory Cache</text>
    <text x="20" y="215" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Google BigQuery</text>
    <text x="20" y="235" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Scalable Search Analytics</text>
    <text x="20" y="450" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600">AES-256 GCM Encrypted</text>
  </g>

  <g transform="translate(880, 160)">
    <!-- Col 4: DevOps & QA -->
    <rect x="0" y="0" width="220" height="490" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="40" fill="#A855F7" font-family="system-ui, sans-serif" font-size="13" font-weight="700">DEVOPS &amp; TOOLING</text>
    <line x1="20" y1="60" x2="200" y2="60" stroke="#2D3748"/>
    <text x="20" y="95" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">GitHub Enterprise</text>
    <text x="20" y="115" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Protected Branch Pipelines</text>
    <text x="20" y="155" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Docker &amp; K8s</text>
    <text x="20" y="175" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Reproducible Containers</text>
    <text x="20" y="215" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="600">Playwright &amp; Jest</text>
    <text x="20" y="235" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Automated E2E Testing</text>
    <text x="20" y="450" fill="#A855F7" font-family="system-ui, sans-serif" font-size="12" font-weight="600">100% Automated Checks</text>
  </g>

  <text x="600" y="730" fill="#6B7280" font-family="system-ui, monospace" font-size="11" text-anchor="middle">CERTIFIED PARTNER STATUS · DIRECT API ACCESS · PRODUCTION ISOLATION</text>
</svg>
`;

async function main() {
  await sharp(Buffer.from(a11yCommitmentSvg))
    .resize(1200, 800)
    .webp({ quality: 90 })
    .toFile(path.join(ROOT, 'public/images/company/company-accessibility-commitment.webp'));
  console.log("✓ Generated company-accessibility-commitment.webp (1200x800)");

  await sharp(Buffer.from(pressKitSvg))
    .resize(1200, 800)
    .webp({ quality: 90 })
    .toFile(path.join(ROOT, 'public/images/company/press-kit-hero.webp'));
  console.log("✓ Generated press-kit-hero.webp (1200x800)");

  await sharp(Buffer.from(vendorSvg))
    .resize(1200, 800)
    .webp({ quality: 90 })
    .toFile(path.join(ROOT, 'public/images/company/vendor-hero.webp'));
  console.log("✓ Generated vendor-hero.webp (1200x800)");
}

main().catch(console.error);
