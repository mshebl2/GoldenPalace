const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = 'public/images/homepage-reference.png';

const requiredDirs = [
  'public/images/brand',
  'public/images/hero',
  'public/images/offers',
  'public/images/services',
  'public/images/portfolio',
];

requiredDirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function crop(left, top, width, height, outPath, scale = 2) {
  const meta = await sharp(src).metadata();
  const safeL = Math.max(0, Math.min(left, meta.width - 1));
  const safeT = Math.max(0, Math.min(top, meta.height - 1));
  const safeW = Math.min(width, meta.width - safeL);
  const safeH = Math.min(height, meta.height - safeT);

  await sharp(src)
    .extract({ left: safeL, top: safeT, width: safeW, height: safeH })
    .resize(safeW * scale, safeH * scale, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1, m1: 0.5, m2: 1.5 })
    .webp({ quality: 95 })
    .toFile(outPath);

  console.log('✅ Cropped & saved:', outPath, `(${safeW * scale}x${safeH * scale})`);
}

async function run() {
  console.log('Slicing exact assets from homepage-reference.png ...');

  // 1. Brand Logo
  await crop(500, 25, 145, 40, 'public/images/brand/golden-palace-logo.png', 2);
  await crop(505, 75, 60, 45, 'public/images/brand/emblem.png', 3);

  // 2. Hero living room photo (x: 0 to 385, y: 68 to 286)
  await crop(0, 68, 385, 218, 'public/images/hero/hero-living-room.webp', 3);

  // 3. Offers images
  // One room: (x: 320, y: 360, w: 125, h: 48)
  await crop(320, 360, 125, 48, 'public/images/offers/one-room.webp', 3);
  // Two rooms: (x: 195, y: 360, w: 120, h: 48)
  await crop(195, 360, 120, 48, 'public/images/offers/two-rooms.webp', 3);
  // Three rooms: (x: 60, y: 360, w: 125, h: 48)
  await crop(60, 360, 125, 48, 'public/images/offers/three-rooms.webp', 3);
  // Ceiling: (x: 260, y: 490, w: 50, h: 45)
  await crop(260, 490, 50, 45, 'public/images/offers/ceiling.webp', 4);
  // Door: (x: 90, y: 490, w: 50, h: 45)
  await crop(90, 490, 50, 45, 'public/images/offers/door.webp', 4);
  // Paint tools & Jotun can: (x: 585, y: 510, w: 80, h: 72)
  await crop(585, 510, 80, 72, 'public/images/offers/paint-tools.webp', 3);

  // 4. Services images (x across row, y: 620 to 690)
  // 1. interior-paint (Right): x: 535, y: 620, w: 110, h: 70
  await crop(535, 620, 110, 70, 'public/images/services/interior-paint.webp', 3);
  // 2. ceiling-design: x: 410, y: 620, w: 110, h: 70
  await crop(410, 620, 110, 70, 'public/images/services/ceiling-design.webp', 3);
  // 3. wall-decoration: x: 285, y: 620, w: 110, h: 70
  await crop(285, 620, 110, 70, 'public/images/services/wall-decoration.webp', 3);
  // 4. painted-door: x: 160, y: 620, w: 110, h: 70
  await crop(160, 620, 110, 70, 'public/images/services/painted-door.webp', 3);
  // 5. villa-facade: x: 38, y: 620, w: 110, h: 70
  await crop(38, 620, 110, 70, 'public/images/services/villa-facade.webp', 3);

  // 5. Portfolio images (y: 805 to 885)
  // 1. villa (Right): x: 500, y: 805, w: 155, h: 80
  await crop(500, 805, 155, 80, 'public/images/portfolio/villa.webp', 3);
  // 2. navy-wall: x: 340, y: 805, w: 155, h: 80
  await crop(340, 805, 155, 80, 'public/images/portfolio/navy-wall.webp', 3);
  // 3. marble-decoration: x: 190, y: 805, w: 145, h: 80
  await crop(190, 805, 145, 80, 'public/images/portfolio/marble-decoration.webp', 3);
  // 4. luxury-ceiling: x: 30, y: 805, w: 155, h: 80
  await crop(30, 805, 155, 80, 'public/images/portfolio/luxury-ceiling.webp', 3);

  console.log('🎉 All reference assets sliced successfully!');
}

run();
