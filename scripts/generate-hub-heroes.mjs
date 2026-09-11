import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();

// 1. Services Hub Blueprint
const servicesHubSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgSvc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#141B24"/>
      <stop offset="100%" stop-color="#0A0E13"/>
    </linearGradient>
    <linearGradient id="amberLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E08738"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
    <linearGradient id="cyanLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgSvc)"/>

  <!-- Grid -->
  <g opacity="0.07" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="90" x2="1200" y2="90"/>
    <line x1="0" y1="180" x2="1200" y2="180"/>
    <line x1="0" y1="270" x2="1200" y2="270"/>
    <line x1="0" y1="360" x2="1200" y2="360"/>
    <line x1="0" y1="450" x2="1200" y2="450"/>
    <line x1="0" y1="540" x2="1200" y2="540"/>
    <line x1="200" y1="0" x2="200" y2="675"/>
    <line x1="400" y1="0" x2="400" y2="675"/>
    <line x1="600" y1="0" x2="600" y2="675"/>
    <line x1="800" y1="0" x2="800" y2="675"/>
    <line x1="1000" y1="0" x2="1000" y2="675"/>
  </g>

  <!-- Title -->
  <text x="600" y="70" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="22" font-weight="700" text-anchor="middle" letter-spacing="2">BIZZFLY CAPABILITY &amp; PRACTICE MATRIX</text>
  <text x="600" y="98" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="13" text-anchor="middle" letter-spacing="1">6 CORE PRACTICES · 45 SPECIALIZED SERVICES · END-TO-END DIGITAL SYSTEMS ARCHITECTURE</text>

  <!-- Central Hub -->
  <circle cx="600" cy="360" r="70" fill="#1A222D" stroke="url(#amberLine)" stroke-width="2.5"/>
  <circle cx="600" cy="360" r="62" fill="#121820"/>
  <text x="600" y="352" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="14" font-weight="700" text-anchor="middle">BIZZFLY</text>
  <text x="600" y="374" fill="#E08738" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle">DIGITAL GROWTH</text>

  <!-- 6 Practice Orbiting Cards -->
  <!-- Practice 1: Search & AI Visibility -->
  <g transform="translate(100, 160)">
    <rect x="0" y="0" width="220" height="95" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="15" y="28" fill="#F59E0B" font-family="system-ui, sans-serif" font-size="12" font-weight="700">01. SEARCH &amp; AI VISIBILITY</text>
    <text x="15" y="52" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="11">SEO, AEO, GEO, Technical Audit</text>
    <text x="15" y="72" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="10">8 Specialized Services</text>
  </g>
  <path d="M 320 205 L 535 340" stroke="url(#amberLine)" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

  <!-- Practice 2: Web Development -->
  <g transform="translate(100, 420)">
    <rect x="0" y="0" width="220" height="95" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="15" y="28" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" font-weight="700">02. WEB DEVELOPMENT</text>
    <text x="15" y="52" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="11">Next.js, Corporate Web, UI/UX</text>
    <text x="15" y="72" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="10">8 Specialized Services</text>
  </g>
  <path d="M 320 465 L 535 380" stroke="url(#cyanLine)" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

  <!-- Practice 3: Software Engineering -->
  <g transform="translate(490, 140)">
    <rect x="0" y="0" width="220" height="95" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="15" y="28" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="700">03. SOFTWARE ENGINEERING</text>
    <text x="15" y="52" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="11">Custom Software, APIs, Portals</text>
    <text x="15" y="72" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="10">7 Specialized Services</text>
  </g>
  <path d="M 600 235 L 600 295" stroke="#10B981" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

  <!-- Practice 4: AI & Automation -->
  <g transform="translate(490, 480)">
    <rect x="0" y="0" width="220" height="95" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="15" y="28" fill="#A855F7" font-family="system-ui, sans-serif" font-size="12" font-weight="700">04. AI &amp; AUTOMATION</text>
    <text x="15" y="52" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="11">AI Agents, Workflow Automation</text>
    <text x="15" y="72" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="10">7 Specialized Services</text>
  </g>
  <path d="M 600 480 L 600 425" stroke="#A855F7" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

  <!-- Practice 5: Digital Marketing -->
  <g transform="translate(880, 160)">
    <rect x="0" y="0" width="220" height="95" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="15" y="28" fill="#E08738" font-family="system-ui, sans-serif" font-size="12" font-weight="700">05. DIGITAL MARKETING</text>
    <text x="15" y="52" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="11">Performance, CRO, Strategy</text>
    <text x="15" y="72" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="10">8 Specialized Services</text>
  </g>
  <path d="M 880 205 L 665 340" stroke="url(#amberLine)" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

  <!-- Practice 6: Data & Analytics -->
  <g transform="translate(880, 420)">
    <rect x="0" y="0" width="220" height="95" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="15" y="28" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" font-weight="700">06. DATA &amp; ANALYTICS</text>
    <text x="15" y="52" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="11">BI, Analytics, Dashboards</text>
    <text x="15" y="72" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="10">7 Specialized Services</text>
  </g>
  <path d="M 880 465 L 665 380" stroke="url(#cyanLine)" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

  <text x="600" y="625" fill="#6B7280" font-family="system-ui, monospace" font-size="11" text-anchor="middle">BIZZFLY ENTERPRISE SERVICE INTEGRATION MAPPING · ZERO SILOS</text>
</svg>
`;

// 2. Industries Hub Blueprint
const industriesHubSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgInd" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#151A22"/>
      <stop offset="100%" stop-color="#0A0D10"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgInd)"/>

  <text x="600" y="70" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="22" font-weight="700" text-anchor="middle" letter-spacing="2">VERTICAL SECTOR SYSTEMS &amp; TRANSFORMATION MATRIX</text>
  <text x="600" y="98" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="13" text-anchor="middle" letter-spacing="1">INDUSTRY-SPECIFIC DISCOVERY · REGULATORY COMPLIANCE · SPECIALIZED OPERATIONAL WORKFLOWS</text>

  <!-- 4 Industry Clusters -->
  <!-- Cluster 1 -->
  <g transform="translate(100, 140)">
    <rect x="0" y="0" width="480" height="210" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="35" fill="#E08738" font-family="system-ui, sans-serif" font-size="14" font-weight="700">ENTERPRISE &amp; B2B SERVICES</text>
    <text x="25" y="65" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">Manufacturing · Logistics · IT Services · Professional Services</text>
    <text x="25" y="95" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Core Systems: ERP Synchronization, B2B Quoting Automation, Supply Chain APIs</text>
    <line x1="25" y1="120" x2="455" y2="120" stroke="#2D3748"/>
    <text x="25" y="150" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12">Verified Outcome: Lead Velocity +280% · Order Friction -45%</text>
    <text x="25" y="175" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Architecture: Event-driven Microservices · Secure Role-based Access</text>
  </g>

  <!-- Cluster 2 -->
  <g transform="translate(620, 140)">
    <rect x="0" y="0" width="480" height="210" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="35" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="14" font-weight="700">TECHNOLOGY &amp; VENTURE</text>
    <text x="25" y="65" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">SaaS · High-Growth Startups · Deep Tech · Media Platforms</text>
    <text x="25" y="95" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Core Systems: Multi-tenant Databases, Product-Led Growth Telemetry, Billing APIs</text>
    <line x1="25" y1="120" x2="455" y2="120" stroke="#2D3748"/>
    <text x="25" y="150" fill="#10B981" font-family="system-ui, sans-serif" font-size="12">Verified Outcome: Churn Reduction -35% · Net Retention 124%</text>
    <text x="25" y="175" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Architecture: Serverless SSR · Edge Caching · Global Content Distribution</text>
  </g>

  <!-- Cluster 3 -->
  <g transform="translate(100, 380)">
    <rect x="0" y="0" width="480" height="210" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="35" fill="#10B981" font-family="system-ui, sans-serif" font-size="14" font-weight="700">CONSUMER &amp; COMMERCE</text>
    <text x="25" y="65" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">Ecommerce · D2C Brands · Real Estate · Hospitality &amp; Travel</text>
    <text x="25" y="95" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Core Systems: Headless Catalogs, Local Search Geo-grids, Payment Orchestration</text>
    <line x1="25" y1="120" x2="455" y2="120" stroke="#2D3748"/>
    <text x="25" y="150" fill="#E08738" font-family="system-ui, sans-serif" font-size="12">Verified Outcome: Mobile Conversion +120 bps · Page Load &lt; 0.8s</text>
    <text x="25" y="175" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Architecture: Dynamic Schema Generation · Next.js ISR Rerendering</text>
  </g>

  <!-- Cluster 4 -->
  <g transform="translate(620, 380)">
    <rect x="0" y="0" width="480" height="210" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="35" fill="#A855F7" font-family="system-ui, sans-serif" font-size="14" font-weight="700">REGULATED &amp; PUBLIC SECTORS</text>
    <text x="25" y="65" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">Healthcare · Financial Services · Legal · Education · Energy</text>
    <text x="25" y="95" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Core Systems: Audit-logged Telemetry, Zero-knowledge Auth, Encrypted Vaults</text>
    <line x1="25" y1="120" x2="455" y2="120" stroke="#2D3748"/>
    <text x="25" y="150" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12">Verified Outcome: 100% WCAG 2.2 · HIPAA/PCI-DSS Compliance Verified</text>
    <text x="25" y="175" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Architecture: Air-gapped VPCs · Automated Data Retention Governance</text>
  </g>

  <text x="600" y="635" fill="#6B7280" font-family="system-ui, monospace" font-size="11" text-anchor="middle">26 VERTICAL SECTOR PROFILES · EMPIRICAL OUTCOMES DOCUMENTED</text>
</svg>
`;

// 3. Technologies Hub Blueprint
const technologiesHubSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgTech" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#141921"/>
      <stop offset="100%" stop-color="#0B0D11"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgTech)"/>

  <text x="600" y="70" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="22" font-weight="700" text-anchor="middle" letter-spacing="2">ENTERPRISE TECHNOLOGY STACK ARCHITECTURE</text>
  <text x="600" y="98" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="13" text-anchor="middle" letter-spacing="1">SELECTED FOR SYSTEMIC LONGEVITY · AUDITED PERFORMANCE · UNCOMPROMISED SECURITY</text>

  <!-- 4 Horizontal Architecture Tiers -->
  <!-- Tier 1: Presentation & Experience -->
  <g transform="translate(100, 140)">
    <rect x="0" y="0" width="1000" height="90" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="32" fill="#E08738" font-family="system-ui, sans-serif" font-size="12" font-weight="700">TIER 1: PRESENTATION &amp; EDGE RENDERING</text>
    <text x="25" y="60" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="15" font-weight="600">Next.js 15 · React 19 · TypeScript 5 · Vanilla CSS Design System · Vercel Edge Runtime</text>
    <text x="960" y="52" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" text-anchor="end">&lt; 0.4s LCP</text>
  </g>

  <!-- Tier 2: Microservices & Logic -->
  <g transform="translate(100, 255)">
    <rect x="0" y="0" width="1000" height="90" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="32" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" font-weight="700">TIER 2: DISTRIBUTED SERVICES &amp; APIS</text>
    <text x="25" y="60" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="15" font-weight="600">Node.js · Golang Microservices · GraphQL Federation · RESTful Webhooks · gRPC Messaging</text>
    <text x="960" y="52" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" text-anchor="end">99.98% Uptime</text>
  </g>

  <!-- Tier 3: Data & Intelligence -->
  <g transform="translate(100, 370)">
    <rect x="0" y="0" width="1000" height="90" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="32" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="700">TIER 3: DATA STORAGE &amp; AI VECTOR INDEX</text>
    <text x="25" y="60" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="15" font-weight="600">PostgreSQL (Prisma) · Redis Caching · pgvector Embeddings · BigQuery Telemetry Warehousing</text>
    <text x="960" y="52" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" text-anchor="end">AES-256 GCM</text>
  </g>

  <!-- Tier 4: Cloud & Security -->
  <g transform="translate(100, 485)">
    <rect x="0" y="0" width="1000" height="90" rx="8" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="32" fill="#A855F7" font-family="system-ui, sans-serif" font-size="12" font-weight="700">TIER 4: INFRASTRUCTURE &amp; CONTINUOUS DEPLOYMENT</text>
    <text x="25" y="60" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="15" font-weight="600">AWS Mumbai (ap-south-1) · Docker &amp; Kubernetes · GitHub Actions CI/CD · Cloudflare Zero Trust</text>
    <text x="960" y="52" fill="#A855F7" font-family="system-ui, sans-serif" font-size="12" text-anchor="end">SOC 2 Type II</text>
  </g>

  <text x="600" y="625" fill="#6B7280" font-family="system-ui, monospace" font-size="11" text-anchor="middle">ZERO VENDOR LOCK-IN · STRICT OPEN STANDARDS · PRODUCTION BENCHMARKED</text>
</svg>
`;

// 4. Use Cases Hub Blueprint
const useCasesHubSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgUc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#141A23"/>
      <stop offset="100%" stop-color="#0A0D11"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgUc)"/>

  <text x="600" y="70" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="22" font-weight="700" text-anchor="middle" letter-spacing="2">OPERATIONAL TRANSFORMATION &amp; RESOLUTION BLUEPRINT</text>
  <text x="600" y="98" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="13" text-anchor="middle" letter-spacing="1">30 RECURRENT BUSINESS PROBLEMS IDENTIFIED · SYSTEMATIC METHODOLOGIES APPLIED</text>

  <!-- Problem -> System -> Resolution Triads -->
  <g transform="translate(100, 140)">
    <rect x="0" y="0" width="310" height="440" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="40" fill="#E08738" font-family="system-ui, sans-serif" font-size="14" font-weight="700">01. DISCOVERY &amp; TRAFFIC</text>
    <text x="25" y="75" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Symptoms Addressed:</text>
    <text x="25" y="105" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• Trapped behind LLM answer summaries</text>
    <text x="25" y="130" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• Declining organic click-through rate</text>
    <text x="25" y="155" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• Unindexed programmatic inventory</text>
    <line x1="25" y1="180" x2="285" y2="180" stroke="#2D3748"/>
    <text x="25" y="210" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">The Solution Architecture:</text>
    <text x="25" y="240" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• Semantic entity extraction</text>
    <text x="25" y="265" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• JSON-LD citation structuring</text>
    <text x="25" y="290" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• Sub-second server-side prerendering</text>
    <line x1="25" y1="315" x2="285" y2="315" stroke="#2D3748"/>
    <text x="25" y="345" fill="#10B981" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Measurable Outcome:</text>
    <text x="25" y="375" fill="#10B981" font-family="system-ui, sans-serif" font-size="16" font-weight="700">+240% Citations</text>
    <text x="25" y="405" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Across Google, Perplexity &amp; ChatGPT</text>
  </g>

  <g transform="translate(445, 140)">
    <rect x="0" y="0" width="310" height="440" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="40" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="14" font-weight="700">02. WORKFLOW &amp; MANUAL WORK</text>
    <text x="25" y="75" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Symptoms Addressed:</text>
    <text x="25" y="105" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• Hours lost rekeying customer data</text>
    <text x="25" y="130" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• Slow quoting cycles losing contracts</text>
    <text x="25" y="155" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• Disconnected CRM and billing sheets</text>
    <line x1="25" y1="180" x2="285" y2="180" stroke="#2D3748"/>
    <text x="25" y="210" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">The Solution Architecture:</text>
    <text x="25" y="240" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• Event-triggered API webhooks</text>
    <text x="25" y="265" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• Automated document parsing agents</text>
    <text x="25" y="290" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• Human-in-the-loop review queues</text>
    <line x1="25" y1="315" x2="285" y2="315" stroke="#2D3748"/>
    <text x="25" y="345" fill="#10B981" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Measurable Outcome:</text>
    <text x="25" y="375" fill="#10B981" font-family="system-ui, sans-serif" font-size="16" font-weight="700">80% Time Saved</text>
    <text x="25" y="405" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Quoting turnaround down to minutes</text>
  </g>

  <g transform="translate(790, 140)">
    <rect x="0" y="0" width="310" height="440" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="25" y="40" fill="#10B981" font-family="system-ui, sans-serif" font-size="14" font-weight="700">03. CONVERSION &amp; PLATFORMS</text>
    <text x="25" y="75" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Symptoms Addressed:</text>
    <text x="25" y="105" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• High traffic with poor form conversion</text>
    <text x="25" y="130" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• Legacy website slow and unmaintainable</text>
    <text x="25" y="155" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="12">• Unverifiable marketing ROI reports</text>
    <line x1="25" y1="180" x2="285" y2="180" stroke="#2D3748"/>
    <text x="25" y="210" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">The Solution Architecture:</text>
    <text x="25" y="240" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• Component-driven UI redesign</text>
    <text x="25" y="265" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• Headless Next.js architecture</text>
    <text x="25" y="290" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">• First-party telemetry instrumentation</text>
    <line x1="25" y1="315" x2="285" y2="315" stroke="#2D3748"/>
    <text x="25" y="345" fill="#10B981" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Measurable Outcome:</text>
    <text x="25" y="375" fill="#10B981" font-family="system-ui, sans-serif" font-size="16" font-weight="700">3.8x Conversion Rate</text>
    <text x="25" y="405" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">Clean data attribution pipelines</text>
  </g>

  <text x="600" y="625" fill="#6B7280" font-family="system-ui, monospace" font-size="11" text-anchor="middle">QUALITATIVE EVIDENCE · SYSTEMIC RESOLUTIONS · ZERO THEORETICAL FILLER</text>
</svg>
`;

// 5. Resources Hub Blueprint
const resourcesHubSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgRes" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E1217"/>
      <stop offset="50%" stop-color="#151A22"/>
      <stop offset="100%" stop-color="#0B0D10"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgRes)"/>

  <text x="600" y="70" fill="#F3F4F6" font-family="system-ui, sans-serif" font-size="22" font-weight="700" text-anchor="middle" letter-spacing="2">ENGINEERING RESEARCH, COMPARISONS &amp; FRAMEWORKS</text>
  <text x="600" y="98" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="13" text-anchor="middle" letter-spacing="1">DOCUMENTED PRINCIPLES · EMPIRICAL SEARCH RESEARCH · ARCHITECTURAL DECISION GUIDES</text>

  <!-- 4 Knowledge Pillars -->
  <g transform="translate(100, 140)">
    <rect x="0" y="0" width="220" height="440" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="40" fill="#E08738" font-family="system-ui, sans-serif" font-size="13" font-weight="700">TECHNICAL GUIDES</text>
    <text x="20" y="75" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">Step-by-step implementations</text>
    <line x1="20" y1="95" x2="200" y2="95" stroke="#2D3748"/>
    <text x="20" y="130" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Headless CMS Replatforming</text>
    <text x="20" y="160" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Structured Data Schema Setup</text>
    <text x="20" y="190" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Core Web Vitals Optimization</text>
    <text x="20" y="220" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• AI Search Citation Readiness</text>
    <text x="20" y="250" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• API Webhook Architecture</text>
    <text x="20" y="400" fill="#E08738" font-family="system-ui, sans-serif" font-size="12" font-weight="600">42 In-Depth Guides</text>
  </g>

  <g transform="translate(360, 140)">
    <rect x="0" y="0" width="220" height="440" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="40" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="13" font-weight="700">ARCHITECTURAL VS</text>
    <text x="20" y="75" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">Direct dimension trade-offs</text>
    <line x1="20" y1="95" x2="200" y2="95" stroke="#2D3748"/>
    <text x="20" y="130" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• SEO vs Answer Engines (AEO)</text>
    <text x="20" y="160" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Custom Code vs Off-the-shelf</text>
    <text x="20" y="190" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Headless vs Monolithic CMS</text>
    <text x="20" y="220" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Microservices vs Modular Monolith</text>
    <text x="20" y="250" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• AI Agents vs Hardcoded Rules</text>
    <text x="20" y="400" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="12" font-weight="600">20 Comparison Analyses</text>
  </g>

  <g transform="translate(620, 140)">
    <rect x="0" y="0" width="220" height="440" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="40" fill="#10B981" font-family="system-ui, sans-serif" font-size="13" font-weight="700">CHECKLISTS &amp; AUDITS</text>
    <text x="20" y="75" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">Pre-flight verification lists</text>
    <line x1="20" y1="95" x2="200" y2="95" stroke="#2D3748"/>
    <text x="20" y="130" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Pre-Launch SEO Migration Checklist</text>
    <text x="20" y="160" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• WCAG 2.2 Accessibility Audit</text>
    <text x="20" y="190" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Database Indexing Checklist</text>
    <text x="20" y="220" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Core Web Vitals SLA Verification</text>
    <text x="20" y="250" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Security &amp; Header Checklist</text>
    <text x="20" y="400" fill="#10B981" font-family="system-ui, sans-serif" font-size="12" font-weight="600">35 Rigorous Checklists</text>
  </g>

  <g transform="translate(880, 140)">
    <rect x="0" y="0" width="220" height="440" rx="10" fill="#18202A" stroke="#2D3748"/>
    <text x="20" y="40" fill="#A855F7" font-family="system-ui, sans-serif" font-size="13" font-weight="700">TECHNICAL GLOSSARY</text>
    <text x="20" y="75" fill="#E5E7EB" font-family="system-ui, sans-serif" font-size="12">Structured DefinedTerms</text>
    <line x1="20" y1="95" x2="200" y2="95" stroke="#2D3748"/>
    <text x="20" y="130" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Generative Engine Optimization</text>
    <text x="20" y="160" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Retrieval Augmented Generation</text>
    <text x="20" y="190" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Cumulative Layout Shift (CLS)</text>
    <text x="20" y="220" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Interaction to Next Paint (INP)</text>
    <text x="20" y="250" fill="#9CA3AF" font-family="system-ui, sans-serif" font-size="11">• Canonical Serialization</text>
    <text x="20" y="400" fill="#A855F7" font-family="system-ui, sans-serif" font-size="12" font-weight="600">48 Defined Terms</text>
  </g>

  <text x="600" y="625" fill="#6B7280" font-family="system-ui, monospace" font-size="11" text-anchor="middle">145 INDEXED RESEARCH PUBLICATIONS · CONTINUOUSLY UPDATED</text>
</svg>
`;

async function main() {
  await sharp(Buffer.from(servicesHubSvg)).resize(1200, 675).webp({ quality: 90 }).toFile(path.join(ROOT, 'public/images/services/services-hub.webp'));
  console.log("✓ Generated services-hub.webp (1200x675)");

  await sharp(Buffer.from(industriesHubSvg)).resize(1200, 675).webp({ quality: 90 }).toFile(path.join(ROOT, 'public/images/industries/industries-hub.webp'));
  console.log("✓ Generated industries-hub.webp (1200x675)");

  await sharp(Buffer.from(technologiesHubSvg)).resize(1200, 675).webp({ quality: 90 }).toFile(path.join(ROOT, 'public/images/technologies/technologies-hub.webp'));
  console.log("✓ Generated technologies-hub.webp (1200x675)");

  await sharp(Buffer.from(useCasesHubSvg)).resize(1200, 675).webp({ quality: 90 }).toFile(path.join(ROOT, 'public/images/use-cases/use-cases-hub.webp'));
  console.log("✓ Generated use-cases-hub.webp (1200x675)");

  await sharp(Buffer.from(resourcesHubSvg)).resize(1200, 675).webp({ quality: 90 }).toFile(path.join(ROOT, 'public/images/resources/resources-hub.webp'));
  console.log("✓ Generated resources-hub.webp (1200x675)");
}

main().catch(console.error);
