import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const svgDir = path.join(root, 'svg');
const dist = path.join(root, 'dist');

const sizes = [16, 32, 64, 128, 180, 256, 512, 1024, 2048];
const squareSizes = [64, 128, 180, 256, 512, 1024, 2048];

const transparentJobs = [
  { src: 'atlas-icon-color.svg', name: 'atlas-icon-color' },
  { src: 'atlas-icon-monochrome.svg', name: 'atlas-icon-monochrome' },
  { src: 'atlas-icon-white.svg', name: 'atlas-icon-white' },
  { src: 'atlas-lockup-horizontal.svg', name: 'atlas-lockup-horizontal-color' },
  { src: 'atlas-lockup-horizontal-white.svg', name: 'atlas-lockup-horizontal-white' },
  { src: 'atlas-lockup-stacked.svg', name: 'atlas-lockup-stacked-color' },
  { src: 'atlas-lockup-stacked-white.svg', name: 'atlas-lockup-stacked-white' },
  { src: 'atlas-wordmark.svg', name: 'atlas-wordmark' }
];

const backedJobs = [
  { src: 'atlas-icon-color.svg', name: 'atlas-icon-color-white', background: '#FFFFFF' },
  { src: 'atlas-icon-color.svg', name: 'atlas-icon-color-off-white', background: '#F8FAFC' },
  { src: 'atlas-icon-white.svg', name: 'atlas-icon-white-deep-navy', background: '#0B2F6B' },
  { src: 'atlas-icon-white.svg', name: 'atlas-icon-white-graphite', background: '#111827' },
  { src: 'atlas-lockup-horizontal-white.svg', name: 'atlas-lockup-horizontal-white-deep-navy', background: '#0B2F6B' },
  { src: 'atlas-lockup-horizontal-white.svg', name: 'atlas-lockup-horizontal-white-graphite', background: '#111827' },
  { src: 'atlas-lockup-stacked-white.svg', name: 'atlas-lockup-stacked-white-deep-navy', background: '#0B2F6B' },
  { src: 'atlas-lockup-stacked-white.svg', name: 'atlas-lockup-stacked-white-graphite', background: '#111827' }
];

async function ensure(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function exportTransparent(job, size) {
  const outputDir = path.join(dist, 'transparent');
  await ensure(outputDir);
  const image = sharp(path.join(svgDir, job.src), { density: 600 }).resize({
    width: size,
    height: size,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  });
  await image.png({ compressionLevel: 9 }).toFile(path.join(outputDir, `${job.name}-${size}.png`));
  await image.webp({ quality: 100, lossless: true }).toFile(path.join(outputDir, `${job.name}-${size}.webp`));
}

async function exportBacked(job, size) {
  const outputDir = path.join(dist, 'backgrounds');
  await ensure(outputDir);
  const image = sharp(path.join(svgDir, job.src), { density: 600 }).resize({
    width: size,
    height: size,
    fit: 'contain',
    background: job.background
  }).flatten({ background: job.background });
  await image.png({ compressionLevel: 9 }).toFile(path.join(outputDir, `${job.name}-${size}.png`));
  await image.webp({ quality: 100, lossless: true }).toFile(path.join(outputDir, `${job.name}-${size}.webp`));
}

await ensure(dist);
for (const job of transparentJobs) {
  for (const size of sizes) await exportTransparent(job, size);
}
for (const job of backedJobs) {
  for (const size of squareSizes) await exportBacked(job, size);
}

const appDir = path.join(dist, 'app');
await ensure(appDir);
for (const size of [128, 180, 192, 256, 512, 1024, 2048]) {
  await sharp(path.join(svgDir, 'atlas-app-tile.svg'), { density: 600 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(appDir, `atlas-app-icon-${size}.png`));
}

await sharp(path.join(svgDir, 'atlas-icon-color.svg')).resize(16, 16).png().toFile(path.join(dist, 'favicon-16.png'));
await sharp(path.join(svgDir, 'atlas-icon-color.svg')).resize(32, 32).png().toFile(path.join(dist, 'favicon-32.png'));
await sharp(path.join(svgDir, 'atlas-app-tile.svg')).resize(180, 180).png().toFile(path.join(dist, 'apple-touch-icon-180.png'));
await sharp(path.join(svgDir, 'atlas-app-tile.svg')).resize(512, 512).png().toFile(path.join(dist, 'pwa-icon-512.png'));
await sharp(path.join(svgDir, 'atlas-app-tile.svg')).resize(192, 192).png().toFile(path.join(dist, 'pwa-icon-192.png'));

console.log(`ATLAS assets exported to ${dist}`);
