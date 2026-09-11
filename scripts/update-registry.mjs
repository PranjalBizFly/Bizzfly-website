import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const regPath = path.join(ROOT, 'content/images/imageRegistry.ts');
let content = fs.readFileSync(regPath, 'utf8');

// 1. Update existing replaced items' metadata/alts
content = content.replace(
  /"home-ai-search-workflow":\s*\{[\s\S]*?caption:\s*"[^"]*",\s*\}/,
  `"home-ai-search-workflow": {
    id: "home-ai-search-workflow",
    src: "/images/home/ai-search-workflow.webp",
    alt: "Professional Indian search strategist analyzing generative AI citations, schema markup, and Answer Engine Optimization (AEO) retrieval patterns in Pune tech office",
    topic: "AI Search & AEO",
    category: "technology",
    type: "human",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "section",
    caption: "Structuring business data for citation in generative AI responses.",
  }`
);

content = content.replace(
  /"home-technology-engineers":\s*\{[\s\S]*?caption:\s*"[^"]*",\s*\}/,
  `"home-technology-engineers": {
    id: "home-technology-engineers",
    src: "/images/home/technology-engineering-team.webp",
    alt: "Senior Indian cloud architects and software engineers collaborating around dual-monitor workstation in Pune reviewing Kubernetes microservices topology",
    topic: "Technology & Engineering",
    category: "technology",
    type: "human",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "section",
    caption: "Engineers building reliable, accessible web applications and custom software.",
  }`
);

content = content.replace(
  /"service-web-applications":\s*\{[\s\S]*?usage:\s*"[^"]*",\s*\}/,
  `"service-web-applications": {
    id: "service-web-applications",
    src: "/images/services/service-web-applications.webp",
    alt: "Indian software engineer at innovation hub in Pune developing full-stack responsive web application with React components on dual monitors",
    topic: "Web Applications",
    category: "services",
    type: "human",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "editorial",
  }`
);

content = content.replace(
  /"industry-professional-services":\s*\{[\s\S]*?usage:\s*"[^"]*",\s*\}/,
  `"industry-professional-services": {
    id: "industry-professional-services",
    src: "/images/industries/industry-professional-services.webp",
    alt: "Professional Indian advisory partners and enterprise technology consultants analyzing digital transformation roadmap on interactive display in Pune corporate meeting suite",
    topic: "Professional Services",
    category: "industries",
    type: "human",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "editorial",
  }`
);

content = content.replace(
  /"tech-testing-and-quality":\s*\{[\s\S]*?usage:\s*"[^"]*",\s*\}/,
  `"tech-testing-and-quality": {
    id: "tech-testing-and-quality",
    src: "/images/technologies/tech-testing-and-quality.webp",
    alt: "Automated software testing workstation in Pune tech office showing Jest unit tests, Playwright end-to-end test execution, and code coverage matrix",
    topic: "Testing & Quality",
    category: "technology",
    type: "technology",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "editorial",
  }`
);

content = content.replace(
  /"tech-accessibility-standards":\s*\{[\s\S]*?usage:\s*"[^"]*",\s*\}/,
  `"tech-accessibility-standards": {
    id: "tech-accessibility-standards",
    src: "/images/technologies/tech-accessibility-standards.webp",
    alt: "Web accessibility engineer in Pune conducting WCAG 2.2 Level AA compliance evaluation, screen reader testing, and color contrast audit across dual monitors",
    topic: "Accessibility Standards",
    category: "technology",
    type: "human",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "editorial",
  }`
);

content = content.replace(
  /"company-about":\s*\{[\s\S]*?caption:\s*"[^"]*",\s*\}/,
  `"company-about": {
    id: "company-about",
    src: "/images/company/company-about-team.webp",
    alt: "BizzFly engineering and leadership team collaborating around platform architecture blueprints in the Pune Innovation Hub",
    topic: "About BizzFly",
    category: "company",
    type: "human",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "hero",
    caption: "The BizzFly team in Pune, bringing search visibility and software engineering together.",
  }`
);

content = content.replace(
  /"company-discovery-process":\s*\{[\s\S]*?usage:\s*"[^"]*",\s*\}/,
  `"company-discovery-process": {
    id: "company-discovery-process",
    src: "/images/company/company-discovery-process.webp",
    alt: "Indian technology consultants and systems architect mapping microservices dependencies and diagnostic audit findings on glass whiteboard in Pune office",
    topic: "Discovery Process",
    category: "company",
    type: "human",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "editorial",
  }`
);

content = content.replace(
  /"case-studies-standard":\s*\{[\s\S]*?usage:\s*"[^"]*",\s*\}/,
  `"case-studies-standard": {
    id: "case-studies-standard",
    src: "/images/case-studies/case-studies-verified-standard.webp",
    alt: "Technical audit workstation in modern Indian enterprise software firm displaying verified empirical case study benchmarks, performance telemetry, and signed client outcomes",
    topic: "Case Studies Publishing Standard",
    category: "case-studies",
    type: "editorial",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "hero",
  }`
);

content = content.replace(
  /"company-accessibility-commitment":\s*\{[\s\S]*?caption:\s*"[^"]*",\s*\}/,
  `"company-accessibility-commitment": {
    id: "company-accessibility-commitment",
    src: "/images/company/company-accessibility-commitment.webp",
    alt: "BizzFly accessibility and inclusion specification charter detailing WCAG 2.2 Level AA conformance, screen reader testing, and 4.5:1 contrast enforcement",
    topic: "Accessibility Commitment",
    category: "company",
    type: "technology",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "editorial",
    caption: "Engineering inclusive web experiences compliant with WCAG 2.2 AA standards for all users.",
  }`
);

// 2. Append new registered assets right before export function getImage
const newEntries = `  "home-why-bizzfly": {
    id: "home-why-bizzfly",
    src: "/images/home/why-bizzfly-architecture.webp",
    alt: "Enterprise distributed systems architecture diagram illustrating microservice clusters, caching layers, and high-availability database infrastructure",
    topic: "Why BizzFly Systems Architecture",
    category: "technology",
    type: "technology",
    aspectRatio: "16:9",
    width: 1200,
    height: 675,
    usage: "section",
    caption: "Enterprise distributed systems architecture built for high availability and low latency.",
  },
  "home-growth-engine": {
    id: "home-growth-engine",
    src: "/images/home/growth-engine-blueprint.webp",
    alt: "Digital growth engine and continuous discovery pipeline systems blueprint with data analytics and deployment nodes",
    topic: "BizzFly Growth Engine",
    category: "digital-growth",
    type: "technology",
    aspectRatio: "16:9",
    width: 1200,
    height: 675,
    usage: "section",
    caption: "Systematic growth engine connecting discoverability directly to operational systems.",
  },
  "home-job-be-found": {
    id: "home-job-be-found",
    src: "/images/home/job-be-found.webp",
    alt: "Multi-surface search and AI discoverability visualization connecting organic query pathways to business intelligence core",
    topic: "Search & AI Visibility",
    category: "services",
    type: "editorial",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "section",
    caption: "Structuring business data for retrieval across Google and generative AI engines.",
  },
  "home-job-build": {
    id: "home-job-build",
    src: "/images/home/job-build.webp",
    alt: "Full-stack web application engineering and responsive design system architecture diagram",
    topic: "Web & Application Engineering",
    category: "technology",
    type: "technology",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "section",
    caption: "Engineers building reliable, accessible web applications and custom software.",
  },
  "home-job-automate": {
    id: "home-job-automate",
    src: "/images/home/job-automate.webp",
    alt: "Enterprise workflow automation and AI agent orchestration diagram with event-driven triggers connecting lead capture to CRM pipelines",
    topic: "Process & Workflow Automation",
    category: "automation",
    type: "technology",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "section",
    caption: "Event-driven workflow automation connecting lead capture, CRM pipelines, and backend microservices.",
  },
  "home-job-grow": {
    id: "home-job-grow",
    src: "/images/home/job-grow.webp",
    alt: "Multi-channel performance and compounding growth engine telemetry dashboard illustrating attribution modeling and conversion velocity",
    topic: "Performance Marketing & Compounding Growth",
    category: "digital-growth",
    type: "editorial",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "section",
    caption: "Performance telemetry and attribution modeling tracking compounding organic and multi-channel revenue.",
  },
  "services-hub": {
    id: "services-hub",
    src: "/images/services/services-hub.webp",
    alt: "BizzFly enterprise capability and practice matrix illustrating 6 core practices and 45 specialized digital services",
    topic: "Services & Practices Overview",
    category: "services",
    type: "technology",
    aspectRatio: "16:9",
    width: 1200,
    height: 675,
    usage: "hero",
    caption: "Comprehensive digital growth, AI, automation, and software engineering practice matrix.",
  },
  "industries-hub": {
    id: "industries-hub",
    src: "/images/industries/industries-hub.webp",
    alt: "Vertical sector systems and transformation matrix detailing specialized operational workflows across 26 industries",
    topic: "Industries Systems Matrix",
    category: "industries",
    type: "technology",
    aspectRatio: "16:9",
    width: 1200,
    height: 675,
    usage: "hero",
    caption: "Vertical digital systems engineered for enterprise, SaaS, consumer, and regulated industries.",
  },
  "technologies-hub": {
    id: "technologies-hub",
    src: "/images/technologies/technologies-hub.webp",
    alt: "Enterprise technology stack architecture across edge presentation, distributed APIs, vector databases, and cloud infrastructure",
    topic: "Technologies Stack Architecture",
    category: "technology",
    type: "technology",
    aspectRatio: "16:9",
    width: 1200,
    height: 675,
    usage: "hero",
    caption: "Production-benchmarked enterprise technology stacks selected for systemic longevity.",
  },
  "use-cases-hub": {
    id: "use-cases-hub",
    src: "/images/use-cases/use-cases-hub.webp",
    alt: "Operational transformation and business problem resolution blueprint mapping symptoms to architectural solutions",
    topic: "Use Cases Transformation Blueprint",
    category: "use-cases",
    type: "technology",
    aspectRatio: "16:9",
    width: 1200,
    height: 675,
    usage: "hero",
    caption: "30 recurrent enterprise operational bottlenecks solved through engineering.",
  },
  "resources-hub": {
    id: "resources-hub",
    src: "/images/resources/resources-hub.webp",
    alt: "Engineering research, architectural comparisons, technical checklists, and structured glossary knowledge pillars",
    topic: "Resources & Research Pillars",
    category: "resources",
    type: "technology",
    aspectRatio: "16:9",
    width: 1200,
    height: 675,
    usage: "hero",
    caption: "145 indexed technical research guides and architectural decision frameworks.",
  },
  "press-kit-hero": {
    id: "press-kit-hero",
    src: "/images/company/press-kit-hero.webp",
    alt: "BizzFly brand identity and design tokens specification displaying logomarks, color palette, and typography hierarchy",
    topic: "Press Kit & Brand Assets",
    category: "company",
    type: "technology",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "hero",
    caption: "Official BizzFly brand identity guidelines, design tokens, and media resources.",
  },
  "vendor-hero": {
    id: "vendor-hero",
    src: "/images/company/vendor-hero.webp",
    alt: "Enterprise vendor and partner ecosystem matrix detailing cloud infrastructure, AI models, and database tooling",
    topic: "Vendor & Partner Ecosystem",
    category: "company",
    type: "technology",
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    usage: "hero",
    caption: "Tier-1 cloud infrastructure and enterprise tooling partner ecosystem.",
  },
`;

if (!content.includes('"home-why-bizzfly":')) {
  content = content.replace(
    /\n\};\s*\nexport function getImage/,
    `\n${newEntries}};\n\nexport function getImage`
  );
}

fs.writeFileSync(regPath, content, 'utf8');
console.log("✓ Successfully updated content/images/imageRegistry.ts!");
