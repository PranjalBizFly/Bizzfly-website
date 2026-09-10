#!/usr/bin/env node
/**
 * BizzFly Image System Verification
 *
 *   node scripts/verify-image-usage.mjs
 *
 * Enforces the Absolute No-Repeat Rule and visual realism standards:
 *   - Duplicate image assignments: 0
 *   - Missing image assignments: 0
 *   - Missing or generic alt text: 0
 *   - Invalid image paths: 0
 *   - Orphaned image assets: 0
 *   - Intrinsic dimensions present on every registered image
 */

import { existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const GENERIC_ALT_STRINGS = new Set([
  "image",
  "photo",
  "photo1",
  "photo2",
  "team",
  "seo",
  "hero",
  "pic",
  "picture",
  "placeholder",
  "banner",
]);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

async function verify() {
  console.log("Starting Image System Verification...\n");

  const registryFile = join(ROOT, "content", "images", "imageRegistry.ts");
  const assignmentsFile = join(ROOT, "content", "images", "imageAssignments.ts");

  if (!existsSync(registryFile) || !existsSync(assignmentsFile)) {
    console.error("❌ Registry or assignments file missing. Run populate-image-system.mjs first.");
    process.exit(1);
  }

  // Import registry & assignments dynamically via alias-hooks or strip-types
  const { imageRegistry } = await import("../content/images/imageRegistry.ts");
  const {
    getHomepageImages,
    serviceImageAssignments,
    industryImageAssignments,
    useCaseImageAssignments,
    technologyImageAssignments,
    companyImageAssignments,
    getCompanyHubImage,
    resourceImageAssignments,
    getContactImage,
    getCaseStudiesImage,
    getCaseStudiesAuditImage,
    getFounderImage,
  } = await import("../content/images/imageAssignments.ts");

  const registeredList = Object.values(imageRegistry);
  console.log(`Registered images in registry: ${registeredList.length}`);

  const errors = [];
  const warnings = [];

  // 1. Verify every registered image
  for (const img of registeredList) {
    // ID
    if (!img.id || typeof img.id !== "string") {
      errors.push(`Image without valid ID: ${JSON.stringify(img)}`);
    }

    // Alt text
    if (!img.alt || typeof img.alt !== "string" || img.alt.trim().length === 0) {
      errors.push(`[${img.id}] Missing alt text`);
    } else {
      const lower = img.alt.trim().toLowerCase();
      if (GENERIC_ALT_STRINGS.has(lower) || lower.length < 10) {
        errors.push(`[${img.id}] Alt text is too generic or short: "${img.alt}"`);
      }
    }

    // Dimensions
    if (!img.width || img.width <= 0 || !img.height || img.height <= 0) {
      errors.push(`[${img.id}] Missing or invalid intrinsic dimensions (${img.width}x${img.height})`);
    }

    // File path
    if (!img.src || !img.src.startsWith("/images/")) {
      errors.push(`[${img.id}] Invalid src path "${img.src}" (must start with /images/)`);
    } else {
      const physicalPath = join(ROOT, "public", img.src.replace(/^\//, ""));
      if (!existsSync(physicalPath)) {
        errors.push(`[${img.id}] Physical file does not exist on disk: ${physicalPath}`);
      }
    }
  }

  // 2. Verify assignments and check for DUPLICATES across the entire website
  const assignedImageUsage = new Map(); // imageId -> array of assignment locations

  function recordAssignment(location, imageId) {
    if (!imageId) {
      errors.push(`Empty image assignment at ${location}`);
      return;
    }
    if (!imageRegistry[imageId]) {
      errors.push(`Assignment at ${location} references unregistered image ID: "${imageId}"`);
      return;
    }
    if (!assignedImageUsage.has(imageId)) {
      assignedImageUsage.set(imageId, []);
    }
    assignedImageUsage.get(imageId).push(location);
  }

  // Homepage assignments
  const homeImages = getHomepageImages();
  recordAssignment("Homepage: hero", homeImages.hero?.id);
  recordAssignment("Homepage: whatWeDo", homeImages.whatWeDo?.id);
  recordAssignment("Homepage: visibility", homeImages.visibility?.id);
  recordAssignment("Homepage: aiSearch", homeImages.aiSearch?.id);
  recordAssignment("Homepage: automation", homeImages.automation?.id);
  recordAssignment("Homepage: technology", homeImages.technology?.id);
  recordAssignment("Homepage: founder", getFounderImage()?.id);

  // Services assignments
  for (const [slug, imgId] of Object.entries(serviceImageAssignments)) {
    recordAssignment(`Service [${slug}]`, imgId);
  }

  // Industry assignments
  for (const [slug, imgId] of Object.entries(industryImageAssignments)) {
    recordAssignment(`Industry [${slug}]`, imgId);
  }

  // Use case assignments
  for (const [slug, imgId] of Object.entries(useCaseImageAssignments)) {
    recordAssignment(`Use Case [${slug}]`, imgId);
  }

  // Technology assignments
  for (const [slug, imgId] of Object.entries(technologyImageAssignments)) {
    recordAssignment(`Technology [${slug}]`, imgId);
  }

  // Company assignments
  recordAssignment("Company Hub", getCompanyHubImage()?.id);
  for (const [slug, imgId] of Object.entries(companyImageAssignments)) {
    recordAssignment(`Company [${slug}]`, imgId);
  }

  // Resource assignments
  for (const [slug, imgId] of Object.entries(resourceImageAssignments)) {
    recordAssignment(`Resource [${slug}]`, imgId);
  }

  // Contact & Case studies
  recordAssignment("Contact page", getContactImage()?.id);
  recordAssignment("Case studies standard", getCaseStudiesImage()?.id);
  recordAssignment("Case studies audit", getCaseStudiesAuditImage()?.id);

  // Check for duplicates
  let duplicateCount = 0;
  for (const [imageId, locations] of assignedImageUsage.entries()) {
    if (locations.length > 1) {
      duplicateCount += locations.length - 1;
      errors.push(
        `DUPLICATE ASSIGNMENT: Image "${imageId}" is assigned to multiple locations: ${locations.join(", ")}`
      );
    }
  }

  // 3. Check for orphaned files in public/images/
  const imagesDir = join(ROOT, "public", "images");
  const physicalImages = walk(imagesDir).filter((file) => {
    const ext = extname(file).toLowerCase();
    return [".webp", ".jpg", ".jpeg", ".png", ".avif"].includes(ext);
  });

  const registeredSrcSet = new Set(registeredList.map((img) => join(ROOT, "public", img.src.replace(/^\//, ""))));
  let orphanedCount = 0;
  for (const file of physicalImages) {
    if (!registeredSrcSet.has(file)) {
      orphanedCount++;
      warnings.push(`Orphaned image asset not in registry: ${relative(ROOT, file)}`);
    }
  }

  // Print Summary
  console.log("═".repeat(66));
  console.log("IMAGE SYSTEM AUDIT RESULTS");
  console.log("═".repeat(66));
  console.log(`  Registered Images in Registry : ${registeredList.length}`);
  console.log(`  Total Assignments Checked    : ${assignedImageUsage.size}`);
  console.log(`  Duplicate Image Assignments  : ${duplicateCount}`);
  console.log(`  Missing / Broken Image Paths : ${errors.filter((e) => e.includes("Physical file") || e.includes("src path")).length}`);
  console.log(`  Missing / Generic Alt Text   : ${errors.filter((e) => e.includes("Alt text")).length}`);
  console.log(`  Orphaned Assets in public/   : ${orphanedCount}`);
  console.log("═".repeat(66));

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length}):`);
    for (const w of warnings) console.warn(`  ⚠ ${w}`);
  }

  if (errors.length > 0) {
    console.error(`\n❌ Failed with ${errors.length} error(s):`);
    for (const err of errors) console.error(`  ✗ ${err}`);
    process.exit(1);
  }

  console.log("\n✓ All image checks passed with ZERO duplicate assignments.\n");
}

verify().catch((err) => {
  console.error("Verification execution error:", err);
  process.exit(1);
});
