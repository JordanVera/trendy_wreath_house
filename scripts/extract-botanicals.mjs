import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source =
  process.argv[2] ??
  "/Users/jojovera/.cursor/projects/Users-jojovera-Dev-trendy-wreath-house/assets/image-2cf0aad2-b579-4aeb-92e0-06016f007b55.png";

const root = process.cwd();
const botanicalDir = path.join(root, "public/images/botanicals");
const collectionDir = path.join(root, "public/images/collections");
const galleryDir = path.join(root, "public/images/gallery");
const brandDir = path.join(root, "public/images/brand");

const names = [
  { id: "rose-ivory-a", category: "rose" },
  { id: "rose-ivory-b", category: "rose" },
  { id: "rose-ivory-c", category: "rose" },
  { id: "hydrangea-a", category: "hydrangea" },
  { id: "hydrangea-b", category: "hydrangea" },
  { id: "bloom-champagne-a", category: "bloom" },
  { id: "bloom-champagne-b", category: "bloom" },
  { id: "eucalyptus-a", category: "greenery" },
  { id: "eucalyptus-b", category: "greenery" },
  { id: "eucalyptus-c", category: "greenery" },
  { id: "gold-berries", category: "gold" },
  { id: "gold-leaves", category: "gold" },
  { id: "filler-a", category: "filler" },
  { id: "filler-b", category: "filler" },
  { id: "wreath-base", category: "base" },
  { id: "ribbon", category: "ribbon" },
];

const ALPHA_CUT = 40;

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const count = width * height;
const keep = new Uint8Array(count);

for (let i = 0; i < count; i += 1) {
  keep[i] = data[i * channels + 3] >= ALPHA_CUT ? 1 : 0;
}

const labels = new Uint8Array(count);
const boxes = [];
let nextLabel = 0;

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const start = y * width + x;
    if (!keep[start] || labels[start]) continue;
    nextLabel += 1;
    let minX = x;
    let maxX = x;
    let minY = y;
    let maxY = y;
    let area = 0;
    const stack = [start];
    labels[start] = nextLabel;
    while (stack.length) {
      const i = stack.pop();
      const cx = i % width;
      const cy = (i - cx) / width;
      area += 1;
      if (cx < minX) minX = cx;
      if (cx > maxX) maxX = cx;
      if (cy < minY) minY = cy;
      if (cy > maxY) maxY = cy;
      for (const n of [i - 1, i + 1, i - width, i + width]) {
        if (n < 0 || n >= count || labels[n] || !keep[n]) continue;
        const nx = n % width;
        if (Math.abs(nx - cx) > 1) continue;
        labels[n] = nextLabel;
        stack.push(n);
      }
    }
    if (area > 600) boxes.push({ minX, minY, maxX, maxY, area, label: nextLabel });
  }
}

boxes.sort((a, b) => {
  const rowA = Math.floor(a.minY / 120);
  const rowB = Math.floor(b.minY / 120);
  if (rowA !== rowB) return rowA - rowB;
  return a.minX - b.minX;
});

console.log(
  boxes
    .map(
      (box, index) =>
        `${index} ${box.minX},${box.minY} ${box.maxX - box.minX + 1}x${box.maxY - box.minY + 1}`,
    )
    .join("\n"),
);

if (boxes.length !== names.length) {
  console.error(`Expected ${names.length} pieces, found ${boxes.length}.`);
  process.exit(1);
}

await mkdir(botanicalDir, { recursive: true });
await mkdir(collectionDir, { recursive: true });
await mkdir(galleryDir, { recursive: true });
await mkdir(brandDir, { recursive: true });

const pad = 8;
const assets = [];

for (let index = 0; index < boxes.length; index += 1) {
  const box = boxes[index];
  const name = names[index];
  const left = Math.max(0, box.minX - pad);
  const top = Math.max(0, box.minY - pad);
  const cropWidth = Math.min(width - left, box.maxX - box.minX + 1 + pad * 2);
  const cropHeight = Math.min(height - top, box.maxY - box.minY + 1 + pad * 2);
  const crop = await sharp(source)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(crop.data);
  for (let i = 0; i < crop.info.width * crop.info.height; i += 1) {
    const sx = left + (i % crop.info.width);
    const sy = top + Math.floor(i / crop.info.width);
    const alpha = pixels[i * 4 + 3];
    if (alpha < ALPHA_CUT || labels[sy * width + sx] !== box.label) {
      pixels[i * 4 + 3] = 0;
    }
  }

  const file = `${name.id}.webp`;
  const dest = path.join(botanicalDir, file);
  const preserved = name.id === "wreath-base" || name.id === "ribbon";
  let outWidth = crop.info.width;
  let outHeight = crop.info.height;
  if (preserved) {
    const existing = await sharp(dest).metadata();
    outWidth = existing.width ?? outWidth;
    outHeight = existing.height ?? outHeight;
  } else {
    await sharp(pixels, {
      raw: { width: crop.info.width, height: crop.info.height, channels: 4 },
    })
      .webp({ quality: 92, alphaQuality: 100, effort: 4 })
      .toFile(dest);
  }

  assets.push({
    id: name.id,
    category: name.category,
    src: `/images/botanicals/${file}`,
    width: outWidth,
    height: outHeight,
    placeholder: true,
    alt: preserved
      ? name.id === "ribbon"
        ? "Champagne silk bow"
        : "Hand-twisted grapevine wreath base"
      : `Temporary ${name.category} cutout from the studio reference sheet`,
  });
}

const byId = Object.fromEntries(assets.map((asset) => [asset.id, asset]));

async function layerBuffer(id, targetWidth, rotate) {
  return sharp(path.join(botanicalDir, `${id}.webp`))
    .resize({ width: targetWidth })
    .rotate(rotate ?? 0, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function still({ file, width: canvasW, height: canvasH, background, layers }) {
  const composites = [];
  for (const layer of layers) {
    if (!byId[layer.id]) continue;
    const input = await layerBuffer(layer.id, Math.round(canvasW * layer.w), layer.rotate ?? 0);
    const meta = await sharp(input).metadata();
    const layerW = meta.width ?? 0;
    const layerH = meta.height ?? 0;
    let left = Math.round(canvasW * layer.x - layerW / 2);
    let top = Math.round(canvasH * layer.y - layerH / 2);
    let clipped = input;
    if (left < 0 || top < 0 || left + layerW > canvasW || top + layerH > canvasH) {
      const cropLeft = Math.max(0, -left);
      const cropTop = Math.max(0, -top);
      const cropW = Math.min(layerW - cropLeft, canvasW - Math.max(0, left));
      const cropH = Math.min(layerH - cropTop, canvasH - Math.max(0, top));
      if (cropW < 2 || cropH < 2) continue;
      clipped = await sharp(input)
        .extract({
          left: cropLeft,
          top: cropTop,
          width: Math.round(cropW),
          height: Math.round(cropH),
        })
        .toBuffer();
      left = Math.max(0, left);
      top = Math.max(0, top);
    }
    composites.push({ input: clipped, left, top });
  }

  await sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background },
  })
    .composite(composites)
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(file);
}

const ink = { r: 12, g: 12, b: 12 };
const ivory = { r: 246, g: 242, b: 233 };
const charcoal = { r: 23, g: 22, b: 20 };

await still({
  file: path.join(collectionDir, "spring.jpg"),
  width: 1600,
  height: 1100,
  background: ivory,
  layers: [
    { id: "eucalyptus-b", x: 0.42, y: 0.58, w: 0.55, rotate: -18 },
    { id: "hydrangea-a", x: 0.34, y: 0.46, w: 0.38, rotate: -8 },
    { id: "rose-ivory-a", x: 0.62, y: 0.4, w: 0.3, rotate: 12 },
    { id: "filler-a", x: 0.7, y: 0.62, w: 0.24, rotate: 6 },
  ],
});
await still({
  file: path.join(collectionDir, "autumn.jpg"),
  width: 1600,
  height: 1100,
  background: charcoal,
  layers: [
    { id: "gold-leaves", x: 0.46, y: 0.55, w: 0.48, rotate: -12 },
    { id: "gold-berries", x: 0.28, y: 0.48, w: 0.36, rotate: 16 },
    { id: "bloom-champagne-a", x: 0.66, y: 0.42, w: 0.34, rotate: 8 },
    { id: "eucalyptus-c", x: 0.72, y: 0.66, w: 0.4, rotate: -20 },
  ],
});
await still({
  file: path.join(collectionDir, "holiday.jpg"),
  width: 1600,
  height: 1100,
  background: ink,
  layers: [
    { id: "ribbon", x: 0.62, y: 0.7, w: 0.24, rotate: -2 },
    { id: "rose-ivory-b", x: 0.36, y: 0.4, w: 0.28, rotate: -10 },
    { id: "rose-ivory-c", x: 0.58, y: 0.34, w: 0.26, rotate: 14 },
    { id: "bloom-champagne-b", x: 0.7, y: 0.5, w: 0.3, rotate: 4 },
  ],
});
await still({
  file: path.join(collectionDir, "everyday.jpg"),
  width: 1600,
  height: 1100,
  background: ivory,
  layers: [
    { id: "eucalyptus-a", x: 0.4, y: 0.52, w: 0.5, rotate: 8 },
    { id: "eucalyptus-c", x: 0.62, y: 0.58, w: 0.46, rotate: -14 },
    { id: "rose-ivory-a", x: 0.5, y: 0.4, w: 0.28, rotate: -6 },
  ],
});
await still({
  file: path.join(collectionDir, "custom.jpg"),
  width: 1600,
  height: 1100,
  background: ink,
  layers: [
    { id: "hydrangea-b", x: 0.38, y: 0.48, w: 0.36, rotate: 6 },
    { id: "bloom-champagne-a", x: 0.62, y: 0.42, w: 0.32, rotate: -8 },
    { id: "gold-berries", x: 0.7, y: 0.64, w: 0.28, rotate: 18 },
    { id: "filler-b", x: 0.3, y: 0.66, w: 0.22, rotate: -10 },
  ],
});
await still({
  file: path.join(galleryDir, "portrait.jpg"),
  width: 1200,
  height: 1600,
  background: ink,
  layers: [
    { id: "wreath-base", x: 0.5, y: 0.52, w: 0.62, rotate: 0 },
    { id: "eucalyptus-b", x: 0.34, y: 0.46, w: 0.42, rotate: -30 },
    { id: "hydrangea-a", x: 0.38, y: 0.34, w: 0.36, rotate: -8 },
    { id: "rose-ivory-b", x: 0.66, y: 0.32, w: 0.28, rotate: 12 },
    { id: "ribbon", x: 0.54, y: 0.7, w: 0.32, rotate: 2 },
  ],
});
await still({
  file: path.join(galleryDir, "wide.jpg"),
  width: 1800,
  height: 1100,
  background: charcoal,
  layers: [
    { id: "eucalyptus-a", x: 0.28, y: 0.55, w: 0.34, rotate: -8 },
    { id: "eucalyptus-c", x: 0.74, y: 0.58, w: 0.32, rotate: 16 },
    { id: "rose-ivory-a", x: 0.42, y: 0.42, w: 0.2, rotate: -6 },
    { id: "bloom-champagne-b", x: 0.58, y: 0.46, w: 0.22, rotate: 10 },
    { id: "filler-a", x: 0.5, y: 0.64, w: 0.16, rotate: 0 },
  ],
});
await still({
  file: path.join(galleryDir, "detail-bloom.jpg"),
  width: 1200,
  height: 1200,
  background: ivory,
  layers: [
    { id: "hydrangea-b", x: 0.42, y: 0.5, w: 0.58, rotate: -6 },
    { id: "rose-ivory-c", x: 0.68, y: 0.42, w: 0.38, rotate: 14 },
    { id: "filler-b", x: 0.62, y: 0.68, w: 0.28, rotate: 8 },
  ],
});
await still({
  file: path.join(galleryDir, "detail-door.jpg"),
  width: 1200,
  height: 1500,
  background: { r: 28, g: 26, b: 23 },
  layers: [
    { id: "wreath-base", x: 0.5, y: 0.46, w: 0.7, rotate: 0 },
    { id: "gold-leaves", x: 0.32, y: 0.58, w: 0.38, rotate: 20 },
    { id: "rose-ivory-b", x: 0.64, y: 0.32, w: 0.28, rotate: 8 },
    { id: "gold-berries", x: 0.72, y: 0.6, w: 0.3, rotate: -12 },
  ],
});
await still({
  file: path.join(brandDir, "signature.jpg"),
  width: 1800,
  height: 1400,
  background: ink,
  layers: [
    { id: "wreath-base", x: 0.64, y: 0.52, w: 0.42, rotate: 0 },
    { id: "eucalyptus-b", x: 0.5, y: 0.46, w: 0.3, rotate: -24 },
    { id: "hydrangea-a", x: 0.52, y: 0.36, w: 0.24, rotate: -10 },
    { id: "rose-ivory-a", x: 0.76, y: 0.32, w: 0.18, rotate: 12 },
    { id: "bloom-champagne-a", x: 0.8, y: 0.54, w: 0.2, rotate: 6 },
    { id: "ribbon", x: 0.66, y: 0.68, w: 0.2, rotate: 2 },
    { id: "gold-leaves", x: 0.46, y: 0.66, w: 0.22, rotate: 18 },
  ],
});
await still({
  file: path.join(brandDir, "intro.jpg"),
  width: 1400,
  height: 1700,
  background: ivory,
  layers: [
    { id: "rose-ivory-b", x: 0.48, y: 0.36, w: 0.46, rotate: -8 },
    { id: "eucalyptus-a", x: 0.62, y: 0.58, w: 0.55, rotate: 12 },
    { id: "filler-a", x: 0.34, y: 0.64, w: 0.28, rotate: -6 },
  ],
});
await still({
  file: path.join(brandDir, "about.jpg"),
  width: 1400,
  height: 1700,
  background: charcoal,
  layers: [
    { id: "eucalyptus-c", x: 0.55, y: 0.4, w: 0.68, rotate: -16 },
    { id: "hydrangea-b", x: 0.4, y: 0.58, w: 0.46, rotate: 8 },
    { id: "gold-berries", x: 0.68, y: 0.7, w: 0.34, rotate: -8 },
  ],
});
await still({
  file: path.join(root, "public/og.jpg"),
  width: 1200,
  height: 630,
  background: ink,
  layers: [
    { id: "eucalyptus-b", x: 0.74, y: 0.58, w: 0.38, rotate: -18 },
    { id: "rose-ivory-a", x: 0.62, y: 0.4, w: 0.22, rotate: -8 },
    { id: "ribbon", x: 0.78, y: 0.68, w: 0.18, rotate: 4 },
    { id: "bloom-champagne-b", x: 0.86, y: 0.34, w: 0.2, rotate: 10 },
  ],
});

const manifest = `export type BotanicalCategory =
  | "rose"
  | "hydrangea"
  | "bloom"
  | "greenery"
  | "gold"
  | "filler"
  | "base"
  | "ribbon";

export type BotanicalAsset = {
  id: string;
  category: BotanicalCategory;
  src: string;
  width: number;
  height: number;
  placeholder: boolean;
  alt: string;
};

export const botanicalAssets = ${JSON.stringify(assets, null, 2)} as const satisfies readonly BotanicalAsset[];

export type BotanicalId = (typeof botanicalAssets)[number]["id"];

export const botanicalAssetMap = Object.fromEntries(
  botanicalAssets.map((asset) => [asset.id, asset]),
) as { [K in BotanicalId]: Extract<(typeof botanicalAssets)[number], { id: K }> };
`;

await mkdir(path.join(root, "src/data"), { recursive: true });
await writeFile(path.join(root, "src/data/botanical-assets.ts"), manifest);
console.log(`Wrote ${assets.length} botanical assets and studio stills.`);
