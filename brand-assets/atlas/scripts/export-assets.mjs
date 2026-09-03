import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const svgDir = path.join(root, 'svg');
const dist = path.join(root, 'dist');

const sizes = [16, 32, 64, 128, 180, 256, 512, 1024, 2048];

const jobs = [
  { src: 'atlas-icon-color.svg', name: 'atlas-icon-color', transparent: true },
  { src: 'atlas-icon-monochrome.svg', name: 'atlas-icon-monochrome', transparent: true },
  { src: 'atlas-icon-white.svg', name: 'atlas-icon-white', transparent: true },
  { src: 'atlas-app-tile.svg', name: 'atlas-app-icon', transparent: false },
  { src: 'atlas-lockup-horizontal.svg', name: 'atlas-lockup-horizontal-color', transparent: true },
  { src: 'atlas-lockup-stacked.svg', name: 'atlas-lockup-stacked-color', transparent: true },
  { src: 'atlas-wordmark.svg', name: 'atlas-wordmark', transparent: true }
];

async function ensure(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function exportRaster(job, size) {
  const input = path.join(svgDir, job.src);
  const outputDir = path.join(dist, job.transparent ? 'transparent' : 'app');
  await ensure(outputDir);
  const image = sharp(input, { density: 600 }).resize({
    width: size,
    height: size,
    fit: 'contain',
    background: job.transparent ? { r: 0, g: 0, b: 0, alpha: 0 } : undefined
  });
  await image.png({ compressionLevel: 9 }).toFile(path.join(outputDir, `${job.name}-${size}.png`));
  await image.webp({ quality: 100, lossless: true }).toFile(path.join(outputDir, `${job.name}-${size}.webp`));
}

await ensure(dist);
for (const job of jobs) {
  for (const size of sizes) await exportRaster(job, size);
}

await sharp(path.join(svgDir, 'atlas-icon-color.svg')).resize(16, 16).png().toFile(path.join(dist, 'favicon-16.png'));
await sharp(path.join(svgDir, 'atlas-icon-color.svg')).resize(32, 32).png().toFile(path.join(dist, 'favicon-32.png'));
await sharp(path.join(svgDir, 'atlas-app-tile.svg')).resize(180, 180).png().toFile(path.join(dist, 'apple-touch-icon-180.png'));
await sharp(path.join(svgDir, 'atlas-app-tile.svg')).resize(512, 512).png().toFile(path.join(dist, 'pwa-icon-512.png'));
await sharp(path.join(svgDir, 'atlas-app-tile.svg')).resize(192, 192).png().toFile(path.join(dist, 'pwa-icon-192.png'));

console.log(`ATLAS assets exported to ${dist}`);
