import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const ARTIFACT_DIR = path.join(
  process.env.USERPROFILE || 'C:\\Users\\Dreams',
  '.gemini',
  'antigravity-ide',
  'brain',
  'e6c569e0-9cf9-4652-9e0f-bf57464724a4'
);

/**
 * Process a generated image artifact into a production-ready WebP asset.
 *
 * @param {string} sourceFilename - Artifact file name (e.g. 'growth_engine_blueprint_1789130765730.jpg')
 * @param {string} targetRelativePath - Destination under public/ (e.g. 'images/home/growth-engine-blueprint.webp')
 * @param {number} targetWidth - e.g. 1200
 * @param {number} targetHeight - e.g. 675 or 800
 * @param {number} quality - WebP quality, default 88
 */
export async function processAiImage(sourceFilename, targetRelativePath, targetWidth = 1200, targetHeight = 675, quality = 88) {
  const sourcePath = path.isAbsolute(sourceFilename)
    ? sourceFilename
    : path.join(ARTIFACT_DIR, sourceFilename);

  const targetPath = path.join(ROOT, 'public', targetRelativePath.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  await sharp(sourcePath)
    .resize(targetWidth, targetHeight, {
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality, effort: 5 })
    .toFile(targetPath);

  const stats = fs.statSync(targetPath);
  console.log(`✓ Processed ${path.basename(sourcePath)} -> ${targetRelativePath} (${targetWidth}x${targetHeight}, ${Math.round(stats.size / 1024)} KB)`);
  return {
    src: `/${targetRelativePath.replace(/\\/g, '/').replace(/^\/?/, '')}`,
    width: targetWidth,
    height: targetHeight,
    fileSize: stats.size
  };
}

// CLI usage if run directly: node scripts/process-ai-image.mjs <sourceFile> <targetRelativePath> [width] [height]
if (process.argv[1] && process.argv[1].endsWith('process-ai-image.mjs')) {
  const [,, src, dst, w, h] = process.argv;
  if (!src || !dst) {
    console.error('Usage: node scripts/process-ai-image.mjs <src> <dst> [width] [height]');
    process.exit(1);
  }
  processAiImage(src, dst, parseInt(w || '1200', 10), parseInt(h || '675', 10))
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
