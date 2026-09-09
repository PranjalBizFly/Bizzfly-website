import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

// Load imageRegistry
const regContent = fs.readFileSync(path.join(ROOT, 'content/images/imageRegistry.ts'), 'utf8');

// Parse registry items
// We can extract each object in imageRegistry
const items = [];
const itemRegex = /"([^"]+)":\s*\{\s*id:\s*"([^"]+)",\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]+)",\s*topic:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*type:\s*"([^"]+)",\s*aspectRatio:\s*"([^"]+)",\s*width:\s*(\d+),\s*height:\s*(\d+),\s*usage:\s*"([^"]+)"/g;

let match;
while ((match = itemRegex.exec(regContent)) !== null) {
  items.push({
    key: match[1],
    id: match[2],
    src: match[3],
    alt: match[4],
    topic: match[5],
    category: match[6],
    type: match[7],
    aspectRatio: match[8],
    width: parseInt(match[9], 10),
    height: parseInt(match[10], 10),
    usage: match[11],
  });
}

console.log(`Parsed ${items.length} items from imageRegistry.ts`);

// Extract queries from populate-image-system.mjs if available
const popContent = fs.readFileSync(path.join(ROOT, 'scripts/populate-image-system.mjs'), 'utf8');
const queryRegex = /id:\s*"([^"]+)"[\s\S]*?query:\s*"([^"]+)"/g;
const queries = {};
while ((match = queryRegex.exec(popContent)) !== null) {
  queries[match[1]] = match[2];
}

// Extract queries from missing catalogs
try {
  const compContent = fs.readFileSync(path.join(ROOT, 'scripts/missing-company-catalog.mjs'), 'utf8');
  while ((match = queryRegex.exec(compContent)) !== null) {
    queries[match[1]] = match[2];
  }
} catch (e) {}

try {
  const resContent = fs.readFileSync(path.join(ROOT, 'scripts/missing-resource-catalog.mjs'), 'utf8');
  while ((match = queryRegex.exec(resContent)) !== null) {
    queries[match[1]] = match[2];
  }
} catch (e) {}

console.log(`Extracted queries for ${Object.keys(queries).length} items.`);

for (const item of items) {
  item.originalQuery = queries[item.id] || '';
  const fullPath = path.join(ROOT, 'public', item.src.replace(/^\//, ''));
  item.fileExists = fs.existsSync(fullPath);
  if (item.fileExists) {
    item.fileSize = fs.statSync(fullPath).size;
  }
}

fs.writeFileSync(path.join(ROOT, 'image-audit-base.json'), JSON.stringify(items, null, 2));
console.log('Saved to image-audit-base.json');
