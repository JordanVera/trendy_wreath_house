import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const botanicalDir = path.join(root, "public/images/botanicals");

const sources = [
  {
    id: "wreath-base",
    src: "/Users/jojovera/.cursor/projects/Users-jojovera-Dev-trendy-wreath-house/assets/wreath-base-source.jpg",
  },
  {
    id: "ribbon",
    src: "/Users/jojovera/.cursor/projects/Users-jojovera-Dev-trendy-wreath-house/assets/ribbon-source.jpg",
  },
];

function isDark(data, channels, index) {
  const offset = index * channels;
  return data[offset] < 22 && data[offset + 1] < 22 && data[offset + 2] < 22;
}

async function cutout(src) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const count = width * height;
  const background = new Uint8Array(count);
  const stack = [];

  const seed = (index) => {
    if (index < 0 || index >= count || background[index] || !isDark(data, channels, index)) return;
    stack.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    seed(y * width);
    seed(y * width + width - 1);
  }
  seed(Math.floor(height / 2) * width + Math.floor(width / 2));

  while (stack.length) {
    const index = stack.pop();
    if (background[index] || !isDark(data, channels, index)) continue;
    background[index] = 1;
    const x = index % width;
    if (x > 0) stack.push(index - 1);
    if (x < width - 1) stack.push(index + 1);
    if (index >= width) stack.push(index - width);
    if (index < count - width) stack.push(index + width);
  }

  const pixels = Buffer.alloc(count * 4);
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let index = 0; index < count; index += 1) {
    const source = index * channels;
    const target = index * 4;
    pixels[target] = data[source];
    pixels[target + 1] = data[source + 1];
    pixels[target + 2] = data[source + 2];
    if (background[index]) {
      pixels[target + 3] = 0;
      continue;
    }
    pixels[target + 3] = 255;
    const x = index % width;
    const y = (index - x) / width;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  const pad = 12;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - left, maxX - minX + 1 + pad * 2);
  const cropHeight = Math.min(height - top, maxY - minY + 1 + pad * 2);

  return sharp(pixels, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .webp({ quality: 92, alphaQuality: 100, effort: 4 });
}

for (const item of sources) {
  const file = path.join(botanicalDir, `${item.id}.webp`);
  await (await cutout(item.src)).toFile(file);
  const meta = await sharp(file).metadata();
  console.log(`${item.id} ${meta.width}x${meta.height}`);
}

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
        .extract({ left: cropLeft, top: cropTop, width: Math.round(cropW), height: Math.round(cropH) })
        .toBuffer();
      left = Math.max(0, left);
      top = Math.max(0, top);
    }
    composites.push({ input: clipped, left, top });
  }
  await sharp({ create: { width: canvasW, height: canvasH, channels: 3, background } })
    .composite(composites)
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(file);
}

const ink = { r: 12, g: 12, b: 12 };

await still({
  file: path.join(root, "public/images/collections/holiday.jpg"),
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
  file: path.join(root, "public/images/gallery/portrait.jpg"),
  width: 1200,
  height: 1600,
  background: ink,
  layers: [
    { id: "wreath-base", x: 0.5, y: 0.48, w: 0.7, rotate: 0 },
    { id: "eucalyptus-b", x: 0.34, y: 0.44, w: 0.42, rotate: -30 },
    { id: "hydrangea-a", x: 0.38, y: 0.32, w: 0.36, rotate: -8 },
    { id: "rose-ivory-b", x: 0.66, y: 0.3, w: 0.28, rotate: 12 },
    { id: "ribbon", x: 0.54, y: 0.7, w: 0.32, rotate: 2 },
  ],
});
await still({
  file: path.join(root, "public/images/gallery/detail-door.jpg"),
  width: 1200,
  height: 1500,
  background: { r: 28, g: 26, b: 23 },
  layers: [
    { id: "wreath-base", x: 0.5, y: 0.46, w: 0.72, rotate: 0 },
    { id: "gold-leaves", x: 0.32, y: 0.58, w: 0.38, rotate: 20 },
    { id: "rose-ivory-b", x: 0.64, y: 0.32, w: 0.28, rotate: 8 },
    { id: "gold-berries", x: 0.72, y: 0.6, w: 0.3, rotate: -12 },
    { id: "ribbon", x: 0.56, y: 0.68, w: 0.3, rotate: 0 },
  ],
});
await still({
  file: path.join(root, "public/images/brand/signature.jpg"),
  width: 1800,
  height: 1400,
  background: ink,
  layers: [
    { id: "wreath-base", x: 0.64, y: 0.5, w: 0.46, rotate: 0 },
    { id: "eucalyptus-b", x: 0.5, y: 0.44, w: 0.3, rotate: -24 },
    { id: "hydrangea-a", x: 0.52, y: 0.34, w: 0.24, rotate: -10 },
    { id: "rose-ivory-a", x: 0.76, y: 0.3, w: 0.18, rotate: 12 },
    { id: "bloom-champagne-a", x: 0.8, y: 0.52, w: 0.2, rotate: 6 },
    { id: "ribbon", x: 0.66, y: 0.68, w: 0.2, rotate: 2 },
    { id: "gold-leaves", x: 0.46, y: 0.64, w: 0.22, rotate: 18 },
  ],
});
await still({
  file: path.join(root, "public/og.jpg"),
  width: 1200,
  height: 630,
  background: ink,
  layers: [
    { id: "eucalyptus-b", x: 0.72, y: 0.55, w: 0.36, rotate: -18 },
    { id: "rose-ivory-a", x: 0.6, y: 0.38, w: 0.22, rotate: -8 },
    { id: "ribbon", x: 0.78, y: 0.68, w: 0.18, rotate: 4 },
    { id: "bloom-champagne-b", x: 0.86, y: 0.32, w: 0.2, rotate: 10 },
  ],
});

await still({
  file: path.join(root, "public/images/brand/hero-check.jpg"),
  width: 900,
  height: 900,
  background: { r: 246, g: 242, b: 233 },
  layers: [
    { id: "wreath-base", x: 0.5, y: 0.46, w: 0.72, rotate: 0 },
    { id: "ribbon", x: 0.54, y: 0.7, w: 0.34, rotate: 2 },
  ],
});

console.log("Updated stills that use the wreath base or ribbon.");
