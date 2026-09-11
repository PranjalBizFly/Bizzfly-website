import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const assignPath = path.join(ROOT, 'content/images/imageAssignments.ts');
let content = fs.readFileSync(assignPath, 'utf8');

// 1. Update getNarrativeImages
content = content.replace(
  /export function getNarrativeImages\(\): NarrativeImages \{[\s\S]*?\n\}/,
  `export function getNarrativeImages(): NarrativeImages {
  return {
    why: requireImage("home-why-bizzfly"),
    engine: requireImage("home-growth-engine"),
    founder: requireImage("home-founder"),
    jobs: {
      "be-found": requireImage("home-job-be-found"),
      build: requireImage("home-job-build"),
      automate: requireImage("home-job-automate"),
      grow: requireImage("home-job-grow"),
    },
  };
}`
);

// 2. Restore professional-services in industryImageAssignments
content = content.replace(
  /\/\*\s*\* WITHDRAWN — docs\/imagery-audit\.md, "Watermarked — CONFIRMED"[\s\S]*?\*\//,
  `"professional-services": "industry-professional-services",`
);

// 3. Restore accessibility-standards in technologyImageAssignments
content = content.replace(
  /\/\*\s*\* WITHDRAWN — docs\/imagery-audit\.md, "Does not match its page topic"[\s\S]*?\*\//,
  `"accessibility-standards": "tech-accessibility-standards",`
);

// 4. Restore accessibility-commitment in companyImageAssignments
content = content.replace(
  /\/\*\s*\* WITHDRAWN — "company-accessibility-commitment"[\s\S]*?\*\//,
  `"accessibility-commitment": "company-accessibility-commitment",`
);

// 5. Add new export helper functions
const newHelpers = `
export function getServicesHubImage(): ImageMetadata {
  return requireImage("services-hub");
}

export function getIndustriesHubImage(): ImageMetadata {
  return requireImage("industries-hub");
}

export function getTechnologiesHubImage(): ImageMetadata {
  return requireImage("technologies-hub");
}

export function getUseCasesHubImage(): ImageMetadata {
  return requireImage("use-cases-hub");
}

export function getResourcesHubImage(): ImageMetadata {
  return requireImage("resources-hub");
}

export function getPressKitImage(): ImageMetadata {
  return requireImage("press-kit-hero");
}

export function getVendorImage(): ImageMetadata {
  return requireImage("vendor-hero");
}
`;

if (!content.includes('export function getServicesHubImage')) {
  content += newHelpers;
}

fs.writeFileSync(assignPath, content, 'utf8');
console.log("✓ Successfully updated content/images/imageAssignments.ts!");
