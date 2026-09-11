import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();

// 1. Generate job-automate.webp (Enterprise Automation Architecture)
const automateSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#141A22"/>
      <stop offset="100%" stop-color="#0B0E12"/>
    </linearGradient>
    <linearGradient id="amberGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
    <linearGradient id="emeraldGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
    <linearGradient id="cyanGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGrad)"/>
  
  <!-- Subtle Grid -->
  <g opacity="0.08" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="100" x2="1200" y2="100"/>
    <line x1="0" y1="200" x2="1200" y2="200"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="400" x2="1200" y2="400"/>
    <line x1="0" y1="500" x2="1200" y2="500"/>
    <line x1="0" y1="600" x2="1200" y2="600"/>
    <line x1="0" y1="700" x2="1200" y2="700"/>
    <line x1="150" y1="0" x2="150" y2="800"/>
    <line x1="300" y1="0" x2="300" y2="800"/>
    <line x1="450" y1="0" x2="450" y2="800"/>
    <line x1="600" y1="0" x2="600" y2="800"/>
    <line x1="750" y1="0" x2="750" y2="800"/>
    <line x1="900" y1="0" x2="900" y2="800"/>
    <line x1="1050" y1="0" x2="1050" y2="800"/>
  </g>

  <!-- Title Header -->
  <text x="600" y="80" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle" letter-spacing="2">ENTERPRISE WORKFLOW AUTOMATION &amp; AGENT ORCHESTRATION</text>
  <text x="600" y="110" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle" letter-spacing="1">EVENT-DRIVEN TRIGGERS · INTELLIGENT ROUTING · CRM INTEGRATION · OPERATIONAL SCALE</text>

  <!-- Connection Traces -->
  <g fill="none" stroke-width="2" opacity="0.6">
    <path d="M 230 250 L 370 250" stroke="url(#amberGlow)" stroke-dasharray="6,4"/>
    <path d="M 230 400 L 370 400" stroke="url(#amberGlow)" stroke-dasharray="6,4"/>
    <path d="M 230 550 L 370 550" stroke="url(#amberGlow)" stroke-dasharray="6,4"/>
    
    <path d="M 530 250 L 670 380" stroke="url(#cyanGlow)" stroke-width="3"/>
    <path d="M 530 400 L 670 400" stroke="url(#cyanGlow)" stroke-width="3"/>
    <path d="M 530 550 L 670 420" stroke="url(#cyanGlow)" stroke-width="3"/>

    <path d="M 830 380 L 970 250" stroke="url(#emeraldGlow)" stroke-width="3"/>
    <path d="M 830 400 L 970 400" stroke="url(#emeraldGlow)" stroke-width="3"/>
    <path d="M 830 420 L 970 550" stroke="url(#emeraldGlow)" stroke-width="3"/>
  </g>

  <!-- Stage 1: Ingestion & Triggers -->
  <rect x="70" y="160" width="160" height="480" rx="12" fill="#18202A" stroke="#2D3748" stroke-width="1.5"/>
  <text x="150" y="200" fill="#F59E0B" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">01. INGESTION</text>
  
  <rect x="90" y="225" width="120" height="50" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="150" y="255" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Form Submissions</text>
  
  <rect x="90" y="375" width="120" height="50" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="150" y="405" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Webhook Events</text>

  <rect x="90" y="525" width="120" height="50" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="150" y="555" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">API Telemetry</text>

  <!-- Stage 2: Intelligence & Decision Routing -->
  <rect x="370" y="160" width="160" height="480" rx="12" fill="#18202A" stroke="#2D3748" stroke-width="1.5"/>
  <text x="450" y="200" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">02. AI PIPELINE</text>
  
  <rect x="390" y="225" width="120" height="50" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="450" y="255" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Lead Qualification</text>
  
  <rect x="390" y="375" width="120" height="50" rx="8" fill="#1F2937" stroke="#38BDF8" stroke-width="1.5"/>
  <text x="450" y="405" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" font-weight="600" text-anchor="middle">Decision Engine</text>

  <rect x="390" y="525" width="120" height="50" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="450" y="555" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Entity Extraction</text>

  <!-- Stage 3: Orchestration Hub (Central Pulse) -->
  <circle cx="750" cy="400" r="80" fill="#1F2937" stroke="url(#cyanGlow)" stroke-width="3" filter="url(#glow)"/>
  <circle cx="750" cy="400" r="75" fill="#131B24"/>
  <text x="750" y="390" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="15" font-weight="700" text-anchor="middle">BIZZFLY</text>
  <text x="750" y="415" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600" text-anchor="middle">AUTOMATION</text>
  <text x="750" y="435" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">DISPATCH CORE</text>

  <!-- Stage 4: Execution & Enterprise Sync -->
  <rect x="970" y="160" width="160" height="480" rx="12" fill="#18202A" stroke="#2D3748" stroke-width="1.5"/>
  <text x="1050" y="200" fill="#10B981" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">03. EXECUTION</text>
  
  <rect x="990" y="225" width="120" height="50" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="1050" y="255" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">CRM &amp; ERP Sync</text>
  
  <rect x="990" y="375" width="120" height="50" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="1050" y="405" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Automated Slack/SMS</text>

  <rect x="990" y="525" width="120" height="50" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="1050" y="555" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Task Queue Dispatch</text>

  <!-- Footer Telemetry -->
  <g fill="#9CA3AF" font-family="system-ui, monospace" font-size="11" opacity="0.8">
    <text x="100" y="730">STATUS: ACTIVE</text>
    <text x="350" y="730">LATENCY: &lt; 140ms</text>
    <text x="650" y="730">ENCRYPTION: TLS 1.3 / AES-256</text>
    <text x="980" y="730">UPTIME: 99.98%</text>
  </g>
</svg>
`;

// 2. Generate job-grow.webp (Compounding Growth & Performance Architecture)
const growSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#151A22"/>
      <stop offset="100%" stop-color="#0A0D10"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#E08738" stop-opacity="0.2"/>
      <stop offset="50%" stop-color="#E08738" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.25"/>
      <stop offset="50%" stop-color="#E08738" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#12161A" stop-opacity="0.0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGrad2)"/>

  <!-- Title Header -->
  <text x="600" y="80" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="24" font-weight="700" text-anchor="middle" letter-spacing="2">MULTI-CHANNEL PERFORMANCE &amp; COMPOUNDING GROWTH ENGINE</text>
  <text x="600" y="110" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle" letter-spacing="1">ATTRIBUTION MODELING · CONVERSION VELOCITY · COHORT RETENTION · ORGANIC MULTIPLIER</text>

  <!-- Metric Cards at Top -->
  <g transform="translate(100, 140)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="220" height="90" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="30" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12" font-weight="600">ORGANIC DISCOVERY</text>
    <text x="20" y="65" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="26" font-weight="700">+312%</text>
    <text x="130" y="65" fill="#10B981" font-family="system-ui, sans-serif" font-size="13">YoY Volume</text>

    <!-- Card 2 -->
    <rect x="260" y="0" width="220" height="90" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="280" y="30" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12" font-weight="600">SEARCH CTR</text>
    <text x="280" y="65" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="26" font-weight="700">8.4%</text>
    <text x="365" y="65" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="13">Top 3 Pos</text>

    <!-- Card 3 -->
    <rect x="520" y="0" width="220" height="90" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="540" y="30" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12" font-weight="600">CONVERSION RATE</text>
    <text x="540" y="65" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="26" font-weight="700">4.18%</text>
    <text x="640" y="65" fill="#E08738" font-family="system-ui, sans-serif" font-size="13">+140 bps</text>

    <!-- Card 4 -->
    <rect x="780" y="0" width="220" height="90" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="800" y="30" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12" font-weight="600">CUSTOMER CAC</text>
    <text x="800" y="65" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="26" font-weight="700">-42%</text>
    <text x="880" y="65" fill="#10B981" font-family="system-ui, sans-serif" font-size="13">Blended</text>
  </g>

  <!-- Large Graph Background -->
  <rect x="100" y="270" width="1000" height="420" rx="12" fill="#161E28" stroke="#2D3748"/>

  <!-- Graph Grid Lines -->
  <g opacity="0.1" stroke="#FFFFFF" stroke-width="1">
    <line x1="150" y1="330" x2="1050" y2="330"/>
    <line x1="150" y1="410" x2="1050" y2="410"/>
    <line x1="150" y1="490" x2="1050" y2="490"/>
    <line x1="150" y1="570" x2="1050" y2="570"/>
    <line x1="150" y1="640" x2="1050" y2="640"/>
  </g>

  <!-- Compounding Curve Area Fill -->
  <path d="M 180 640 
           C 300 630, 420 600, 520 540 
           C 620 480, 720 400, 820 340 
           C 920 280, 980 250, 1020 220 
           L 1020 640 Z" fill="url(#areaGrad)"/>

  <!-- Compounding Curve Line -->
  <path d="M 180 640 
           C 300 630, 420 600, 520 540 
           C 620 480, 720 400, 820 340 
           C 920 280, 980 250, 1020 220" fill="none" stroke="url(#lineGrad)" stroke-width="4"/>

  <!-- Data Points -->
  <circle cx="180" cy="640" r="5" fill="#E08738"/>
  <circle cx="520" cy="540" r="6" fill="#E08738"/>
  <circle cx="820" cy="340" r="6" fill="#10B981"/>
  <circle cx="1020" cy="220" r="8" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>

  <!-- Graph Annotations -->
  <g fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">
    <text x="180" y="665" text-anchor="middle">Stage 1: Audit</text>
    <text x="520" y="665" text-anchor="middle">Stage 2: Technical SEO</text>
    <text x="820" y="665" text-anchor="middle">Stage 3: AI Retrieval</text>
    <text x="1020" y="665" text-anchor="middle">Stage 4: Compounding Scale</text>
  </g>

  <!-- Legend -->
  <g transform="translate(140, 295)" font-family="system-ui, sans-serif" font-size="12">
    <circle cx="0" cy="0" r="5" fill="#10B981"/>
    <text x="12" y="4" fill="#E5E7EB">Verified Revenue Pipeline Attributed to Search &amp; AI Systems</text>
  </g>
</svg>
`;

async function main() {
  await sharp(Buffer.from(automateSvg))
    .resize(1200, 800)
    .webp({ quality: 90 })
    .toFile(path.join(ROOT, 'public/images/home/job-automate.webp'));
  console.log("✓ Generated job-automate.webp (1200x800)");

  await sharp(Buffer.from(growSvg))
    .resize(1200, 800)
    .webp({ quality: 90 })
    .toFile(path.join(ROOT, 'public/images/home/job-grow.webp'));
  console.log("✓ Generated job-grow.webp (1200x800)");
}

main().catch(console.error);
