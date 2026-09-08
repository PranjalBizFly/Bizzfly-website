import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function getHash(filePath) {
  const buf = readFileSync(filePath);
  return createHash("sha256").update(buf).digest("hex");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const { imageRegistry } = await import("../content/images/imageRegistry.ts");
  const { MISSING_COMPANY_ITEMS } = await import("./missing-company-catalog.mjs");
  const { MISSING_RESOURCE_ITEMS } = await import("./missing-resource-catalog.mjs");

  const newItemsMap = new Map();
  [...MISSING_COMPANY_ITEMS, ...MISSING_RESOURCE_ITEMS].forEach((item) => {
    newItemsMap.set(item.id, item);
  });

  // 1. Identify baseline (first 149) vs new (151)
  const knownHashes = new Map(); // hash -> id
  const duplicateIds = [];

  for (const [id, img] of Object.entries(imageRegistry)) {
    const physicalPath = join(ROOT, "public", img.src.replace(/^\//, ""));
    if (!existsSync(physicalPath)) {
      console.error(`Physical file missing: ${physicalPath}`);
      continue;
    }
    const hash = getHash(physicalPath);
    if (!newItemsMap.has(id)) {
      // Baseline item
      knownHashes.set(hash, id);
    }
  }

  console.log(`Baseline unique hashes: ${knownHashes.size}`);

  // Check new items against baseline and each other
  for (const [id, item] of newItemsMap.entries()) {
    const physicalPath = join(ROOT, "public", "images", item.subDir, item.filename);
    const hash = getHash(physicalPath);
    if (knownHashes.has(hash)) {
      duplicateIds.push({
        id,
        item,
        physicalPath,
        duplicateOf: knownHashes.get(hash),
      });
    } else {
      knownHashes.set(hash, id);
    }
  }

  console.log(`Duplicate items that need replacement: ${duplicateIds.length}`);

  // 2. Fetch truly unique replacements for all duplicates
  for (let i = 0; i < duplicateIds.length; i++) {
    const { id, item, physicalPath, duplicateOf } = duplicateIds[i];
    console.log(`[${i + 1}/${duplicateIds.length}] Replacing ${id} (was identical to ${duplicateOf})...`);

    let replacementDownloaded = false;
    let page = 2;

    while (!replacementDownloaded && page <= 10) {
      const searchQueries = [
        `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(item.query)}&page=${page}&per_page=20`,
        `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(item.topic + " " + item.type)}&page=${page}&per_page=20`,
        `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(item.type + " professional workspace")}&page=${page + i}&per_page=20`,
      ];

      for (const url of searchQueries) {
        if (replacementDownloaded) break;
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          const candidates = data.results || [];

          for (const candidate of candidates) {
            const downloadUrl = `${candidate.urls.raw}&w=${item.width}&h=${item.height}&fit=crop&q=80&auto=format`;
            const imgRes = await fetch(downloadUrl);
            if (!imgRes.ok) continue;

            const buffer = Buffer.from(await imgRes.arrayBuffer());
            const candidateHash = createHash("sha256").update(buffer).digest("hex");

            if (!knownHashes.has(candidateHash)) {
              writeFileSync(physicalPath, buffer);
              knownHashes.set(candidateHash, id);
              replacementDownloaded = true;
              console.log(`  ✓ Replaced with photo [${candidate.id}] (${buffer.length} bytes) - unique hash confirmed.`);
              break;
            }
          }
        } catch (e) {
          console.warn(`  Warning on page ${page}:`, e.message);
        }
        await sleep(100);
      }
      page++;
    }

    if (!replacementDownloaded) {
      throw new Error(`Failed to find unique replacement image for ${id}`);
    }

    await sleep(100);
  }

  // 3. Final verification of all 300 files
  console.log("\nRunning final SHA256 uniqueness verification across all 300 files...");
  const finalHashes = new Map();
  const finalDuplicates = [];

  for (const [id, img] of Object.entries(imageRegistry)) {
    const physicalPath = join(ROOT, "public", img.src.replace(/^\//, ""));
    const hash = getHash(physicalPath);
    if (finalHashes.has(hash)) {
      finalDuplicates.push({ id, duplicateOf: finalHashes.get(hash) });
    } else {
      finalHashes.set(hash, id);
    }
  }

  console.log(`Total files verified: ${Object.keys(imageRegistry).length}`);
  console.log(`Total unique hashes: ${finalHashes.size}`);
  console.log(`Remaining duplicates: ${finalDuplicates.length}`);

  if (finalDuplicates.length > 0) {
    throw new Error(`Still found ${finalDuplicates.length} duplicate images!`);
  }

  console.log("\n✓ 100% of all 300 images on the website are cryptographically UNIQUE!");
}

main().catch((err) => {
  console.error("FATAL ERROR in duplicate resolution:", err);
  process.exit(1);
});
