#!/usr/bin/env node
/**
 * BizzFly Missing Images Acquirer & Integrator
 *
 * Downloads 151 unique, realistic, topic-relevant photographs from Unsplash,
 * enforces zero duplicate photos, updates imageRegistry.ts and imageAssignments.ts.
 */

import { writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("=================================================");
  console.log("BizzFly Image Acquisition & Integration (151 New Images)");
  console.log("=================================================\n");

  const { MISSING_COMPANY_ITEMS } = await import("./missing-company-catalog.mjs");
  const { MISSING_RESOURCE_ITEMS } = await import("./missing-resource-catalog.mjs");
  const { imageRegistry: existingRegistry } = await import("../content/images/imageRegistry.ts");

  const allNewItems = [...MISSING_COMPANY_ITEMS, ...MISSING_RESOURCE_ITEMS];
  console.log(`Loaded ${MISSING_COMPANY_ITEMS.length} company items and ${MISSING_RESOURCE_ITEMS.length} resource items.`);
  console.log(`Total new images to acquire: ${allNewItems.length}\n`);

  // Ensure directories exist
  mkdirSync(join(ROOT, "public", "images", "company"), { recursive: true });
  mkdirSync(join(ROOT, "public", "images", "resources"), { recursive: true });

  const usedPhotoIds = new Set();
  const successfulItems = [];

  for (let i = 0; i < allNewItems.length; i++) {
    const item = allNewItems[i];
    const targetDir = join(ROOT, "public", "images", item.subDir);
    const targetFile = join(targetDir, item.filename);
    const relativeSrc = `/images/${item.subDir}/${item.filename}`;

    console.log(`[${i + 1}/${allNewItems.length}] Processing ${item.id} (${item.query})...`);

    // Check if image already exists and has size > 10KB
    let alreadyDownloaded = false;
    if (existsSync(targetFile)) {
      const stats = statSync(targetFile);
      if (stats.size > 10000) {
        alreadyDownloaded = true;
      }
    }

    let chosenPhoto = null;

    // Search Unsplash
    const queries = [
      item.query,
      `${item.topic} technology professional office`,
      `business technology ${item.type}`,
      `modern enterprise digital ${i % 10}`,
    ];

    for (const q of queries) {
      if (chosenPhoto) break;
      attempts++;
      try {
        const searchUrl = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=20`;
        const res = await fetch(searchUrl);
        if (res.ok) {
          const data = await res.json();
          for (const photo of data.results || []) {
            if (!usedPhotoIds.has(photo.id)) {
              chosenPhoto = photo;
              usedPhotoIds.add(photo.id);
              break;
            }
          }
        }
      } catch (err) {
        console.warn(`  Warning during search for "${q}":`, err.message);
      }
      if (!chosenPhoto) {
        await sleep(150);
      }
    }

    if (!chosenPhoto) {
      // Direct pagination fallback
      try {
        const fallbackUrl = `https://unsplash.com/napi/search/photos?query=business+technology&page=${i + 10}&per_page=20`;
        const res = await fetch(fallbackUrl);
        if (res.ok) {
          const data = await res.json();
          for (const photo of data.results || []) {
            if (!usedPhotoIds.has(photo.id)) {
              chosenPhoto = photo;
              usedPhotoIds.add(photo.id);
              break;
            }
          }
        }
      } catch (err) {
        console.warn(`  Fallback failed:`, err.message);
      }
    }

    if (!chosenPhoto) {
      throw new Error(`Failed to find unique photo for ${item.id}`);
    }

    // Download photo if needed
    if (!alreadyDownloaded) {
      const downloadUrl = `${chosenPhoto.urls.raw}&w=${item.width}&h=${item.height}&fit=crop&q=80&auto=format`;
      const imgRes = await fetch(downloadUrl);
      if (!imgRes.ok) {
        throw new Error(`Failed to download image from ${downloadUrl}: ${imgRes.status}`);
      }
      const buffer = Buffer.from(await imgRes.arrayBuffer());
      writeFileSync(targetFile, buffer);
      console.log(`  ✓ Downloaded & Saved: ${item.filename} (${buffer.length} bytes) [Unsplash ID: ${chosenPhoto.id}]`);
    } else {
      console.log(`  ✓ File exists: ${item.filename} [Assigned Unsplash ID: ${chosenPhoto.id}]`);
    }

    successfulItems.push({
      ...item,
      src: relativeSrc,
      unsplashId: chosenPhoto.id,
    });

    // Small delay to be polite to the server
    await sleep(80);
  }

  console.log(`\nAll ${successfulItems.length} images successfully processed!`);
  console.log(`Unique Unsplash IDs used: ${usedPhotoIds.size} (assert === ${allNewItems.length})`);
  if (usedPhotoIds.size !== allNewItems.length) {
    throw new Error(`Duplicate photos detected! Used IDs: ${usedPhotoIds.size}, Required: ${allNewItems.length}`);
  }

  // 1. UPDATE content/images/imageRegistry.ts
  console.log("\nUpdating content/images/imageRegistry.ts...");

  // Build complete registry dictionary
  const completeRegistry = { ...existingRegistry };
  for (const item of successfulItems) {
    completeRegistry[item.id] = {
      id: item.id,
      src: item.src,
      alt: item.alt,
      topic: item.topic,
      category: item.category,
      type: item.type,
      aspectRatio: item.aspectRatio,
      width: item.width,
      height: item.height,
      usage: item.usage,
      caption: item.caption,
    };
  }

  const registryEntries = Object.values(completeRegistry);
  console.log(`Total registry entries: ${registryEntries.length} (expected 300)`);

  const registryCode = `/**
 * BizzFly Centralized Image Registry
 *
 * AUTO-GENERATED & STRICTLY ENFORCED.
 * Every image asset has a unique ID, non-keyword-stuffed descriptive alt text,
 * explicit intrinsic dimensions, and semantic metadata.
 */

import type { ImageMetadata } from "./types";

export const imageRegistry: Record<string, ImageMetadata> = {
${registryEntries
  .map(
    (img) => `  "${img.id}": {
    id: "${img.id}",
    src: "${img.src}",
    alt: ${JSON.stringify(img.alt)},
    topic: ${JSON.stringify(img.topic)},
    category: "${img.category}",
    type: "${img.type}",
    aspectRatio: "${img.aspectRatio}",
    width: ${img.width},
    height: ${img.height},
    usage: "${img.usage}",${img.caption ? `\n    caption: ${JSON.stringify(img.caption)},` : ""}
  },`
  )
  .join("\n")}
};

export function getImage(id: string): ImageMetadata | undefined {
  return imageRegistry[id];
}

export function requireImage(id: string): ImageMetadata {
  const img = imageRegistry[id];
  if (!img) {
    throw new Error(\`[ImageRegistry] Missing registered image for ID: "\${id}"\`);
  }
  return img;
}

export function getAllImages(): ImageMetadata[] {
  return Object.values(imageRegistry);
}
`;

  writeFileSync(join(ROOT, "content", "images", "imageRegistry.ts"), registryCode);
  console.log("✓ content/images/imageRegistry.ts updated successfully.");

  // 2. UPDATE content/images/imageAssignments.ts
  console.log("\nUpdating content/images/imageAssignments.ts...");

  const {
    serviceImageAssignments,
    industryImageAssignments,
    useCaseImageAssignments,
    technologyImageAssignments,
  } = await import("../content/images/imageAssignments.ts");

  // Company assignments (22 total)
  const companyAssignments = {
    about: "company-about",
    "how-we-work": "company-how-we-work",
    approach: "company-approach",
    careers: "company-careers",
    "discovery-process": "company-discovery-process",
    "working-with-us": "company-working-with-us",
  };
  for (const item of MISSING_COMPANY_ITEMS) {
    companyAssignments[item.slug] = item.id;
  }

  // Resource assignments (145 total)
  const resourceAssignments = {
    // 10 existing images mapped to their exact slugs in content/resources.ts
    "why-ai-overviews-cut-your-clicks": "resource-ai-overviews-clicks",
    "why-your-website-redesign-lost-traffic": "resource-redesign-traffic-loss",
    "when-to-replatform-a-website": "resource-when-to-replatform",
    "when-to-invest-in-analytics": "resource-invest-in-analytics",
    "when-to-outsource-development": "resource-outsource-development",
    "technical-seo-checklist": "resource-checklist-technical-seo",
    "how-to-audit-your-own-website": "resource-guide-seo-audit",
    "seo-vs-aeo": "resource-comparison-framework",
    "custom-software-vs-off-the-shelf": "resource-decision-tree",
    "what-is-generative-engine-optimisation": "resource-glossary-knowledge",
  };
  for (const item of MISSING_RESOURCE_ITEMS) {
    resourceAssignments[item.slug] = item.id;
  }

  const assignmentsCode = `/**
 * BizzFly Page Image Assignments
 *
 * Maps routes and content slugs to unique registered images.
 * ONE IMAGE IS NEVER ASSIGNED TO MULTIPLE SECTIONS OR MULTIPLE PAGES.
 */

import { requireImage, getImage } from "./imageRegistry";
import type { ImageMetadata } from "./types";

export interface HomepageImages {
  hero: ImageMetadata;
  whatWeDo: ImageMetadata;
  visibility: ImageMetadata;
  aiSearch: ImageMetadata;
  automation: ImageMetadata;
  technology: ImageMetadata;
}

export function getHomepageImages(): HomepageImages {
  return {
    hero: requireImage("home-hero-growth-team"),
    whatWeDo: requireImage("home-what-we-do-strategists"),
    visibility: requireImage("home-search-visibility-analyst"),
    aiSearch: requireImage("home-ai-search-workflow"),
    automation: requireImage("home-automation-operations"),
    technology: requireImage("home-technology-engineers"),
  };
}

/** Map of service and practice slugs to image IDs. */
export const serviceImageAssignments: Record<string, string> = {
${Object.entries(serviceImageAssignments)
  .map(([slug, id]) => `  "${slug}": "${id}",`)
  .join("\n")}
};

export function getServiceImage(slug: string): ImageMetadata | undefined {
  const imageId = serviceImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

/** Map of industry slugs to image IDs. */
export const industryImageAssignments: Record<string, string> = {
${Object.entries(industryImageAssignments)
  .map(([slug, id]) => `  "${slug}": "${id}",`)
  .join("\n")}
};

export function getIndustryImage(slug: string): ImageMetadata | undefined {
  const imageId = industryImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

/** Map of use-case slugs to image IDs. */
export const useCaseImageAssignments: Record<string, string> = {
${Object.entries(useCaseImageAssignments)
  .map(([slug, id]) => `  "${slug}": "${id}",`)
  .join("\n")}
};

export function getUseCaseImage(slug: string): ImageMetadata | undefined {
  const imageId = useCaseImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

/** Map of technology slugs to image IDs. */
export const technologyImageAssignments: Record<string, string> = {
${Object.entries(technologyImageAssignments)
  .map(([slug, id]) => `  "${slug}": "${id}",`)
  .join("\n")}
};

export function getTechnologyImage(slug: string): ImageMetadata | undefined {
  const imageId = technologyImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

/** Map of company subpages to image IDs. (22 pages) */
export const companyImageAssignments: Record<string, string> = {
${Object.entries(companyAssignments)
  .map(([slug, id]) => `  "${slug}": "${id}",`)
  .join("\n")}
};

export function getCompanyImage(slug: string): ImageMetadata | undefined {
  const imageId = companyImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

export function getCompanyHubImage(): ImageMetadata {
  return requireImage("company-hub");
}

export function getContactImage(): ImageMetadata {
  return requireImage("contact-consultation");
}

export function getCaseStudiesImage(): ImageMetadata {
  return requireImage("case-studies-standard");
}

export function getCaseStudiesAuditImage(): ImageMetadata {
  return requireImage("case-studies-audit");
}

/** Map of resource slugs to image IDs. (145 resources) */
export const resourceImageAssignments: Record<string, string> = {
${Object.entries(resourceAssignments)
  .map(([slug, id]) => `  "${slug}": "${id}",`)
  .join("\n")}
};

export function getResourceImage(slug: string): ImageMetadata | undefined {
  const imageId = resourceImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}
`;

  writeFileSync(join(ROOT, "content", "images", "imageAssignments.ts"), assignmentsCode);
  console.log("✓ content/images/imageAssignments.ts updated successfully.");

  console.log("\n=================================================");
  console.log("Integration Complete!");
  console.log("=================================================");
}

main().catch((err) => {
  console.error("FATAL ERROR during image download & integration:", err);
  process.exit(1);
});
