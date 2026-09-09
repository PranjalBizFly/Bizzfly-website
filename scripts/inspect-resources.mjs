import fs from 'node:fs';

const base = JSON.parse(fs.readFileSync('image-audit-base.json', 'utf8'));
const res = base.filter(x => x.category === 'resources');

const humanType = res.filter(x => x.type === 'human');
console.log(`Resource images with type === 'human': ${humanType.length}`);
humanType.forEach((h, i) => {
  console.log(`${(i + 1).toString().padStart(2)}. [${h.id}] src: ${h.src}`);
  console.log(`    alt: ${h.alt}`);
});
