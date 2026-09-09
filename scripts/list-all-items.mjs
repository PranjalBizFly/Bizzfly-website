import fs from 'node:fs';

const base = JSON.parse(fs.readFileSync('image-audit-base.json', 'utf8'));

console.log('=== BREAKDOWN BY CATEGORY ===');
const cats = {};
base.forEach(x => {
  cats[x.category] = cats[x.category] || [];
  cats[x.category].push(x);
});

for (const [cat, items] of Object.entries(cats)) {
  console.log(`\n--- ${cat.toUpperCase()} (${items.length}) ---`);
  items.forEach((it, i) => {
    console.log(`${(i + 1).toString().padStart(3)}. [${it.type}] ${it.id} (query: "${it.originalQuery || 'N/A'}") -> ${it.src}`);
  });
}
