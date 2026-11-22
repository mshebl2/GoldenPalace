const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcImage = "C:/Users/mradd/.gemini/antigravity/brain/142af455-20c7-4c60-a3c9-bdf519fb3992/.user_uploaded/media_1794944890581_f155dd12.jpg";

const dirs = [
  'public/images/brand',
  'public/images/hero',
  'public/images/offers',
  'public/images/services',
  'public/images/portfolio',
  'public/images/about',
  'public/images/blog',
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

async function run() {
  const meta = await sharp(srcImage).metadata();
  console.log('Source dimension:', meta.width, 'x', meta.height);

  // Helper crop function
  async function crop(left, top, width, height, outPath) {
    // ensure bounds
    const safeLeft = Math.max(0, Math.min(left, meta.width - 1));
    const safeTop = Math.max(0, Math.min(top, meta.height - 1));
    const safeWidth = Math.min(width, meta.width - safeLeft);
    const safeHeight = Math.min(height, meta.height - safeTop);

    await sharp(srcImage)
      .extract({ left: safeLeft, top: safeTop, width: safeWidth, height: safeHeight })
      .toFile(outPath);
    console.log('Saved:', outPath, `(${safeWidth}x${safeHeight})`);
  }

  // 1. Logo
  // In hero header / badge:
  await crop(330, 50, 110, 80, 'public/images/brand/logo-raw.png');
  await crop(400, 20, 95, 30, 'public/images/brand/logo-header.png');
  await crop(400, 940, 90, 35, 'public/images/brand/logo-footer.png');

  // 2. Hero living room image
  // Left side of hero (approx x: 15 to 220, y: 55 to 195)
  await crop(15, 55, 205, 140, 'public/images/hero/living-room.webp');

  // 3. Offers images
  // In Offers section (y: ~260 to 320)
  // "3 غرف": x: 105, y: 260, w: 90, h: 50
  // "غرفتين": x: 205, y: 260, w: 85, h: 50
  // "الغرفة": x: 300, y: 260, w: 85, h: 50
  // "السقف": x: 210, y: 345, w: 55, h: 32
  // "الباب": x: 110, y: 345, w: 40, h: 32
  // Jotun paint can: x: 25, y: 330, w: 75, h: 50
  await crop(300, 260, 85, 50, 'public/images/offers/one-room.webp');
  await crop(205, 260, 85, 50, 'public/images/offers/two-rooms.webp');
  await crop(105, 260, 90, 50, 'public/images/offers/three-rooms.webp');
  await crop(210, 345, 55, 32, 'public/images/offers/ceiling.webp');
  await crop(110, 345, 40, 32, 'public/images/offers/door.webp');
  await crop(20, 325, 80, 58, 'public/images/offers/jotun-paint-can.webp');

  // 4. Services images
  // Around y: 415 to 480
  // 5 services visible across x: 10 to 490
  // 1. door: x: 25, y: 415, w: 85, h: 65
  // 2. ceilings: x: 115, y: 415, w: 90, h: 65
  // 3. wall decor: x: 210, y: 415, w: 90, h: 65
  // 4. interior/exterior: x: 305, y: 415, w: 95, h: 65
  // 5. facades: x: 405, y: 415, w: 85, h: 65
  await crop(25, 415, 85, 65, 'public/images/services/door.webp');
  await crop(115, 415, 90, 65, 'public/images/services/ceiling.webp');
  await crop(210, 415, 90, 65, 'public/images/services/decor.webp');
  await crop(305, 415, 95, 65, 'public/images/services/interior.webp');
  await crop(305, 415, 95, 65, 'public/images/services/exterior.webp');
  await crop(405, 415, 85, 65, 'public/images/services/facade.webp');

  // 5. Portfolio images
  // Around y: 530 to 595
  // 4 images across x: 30 to 475
  await crop(30, 530, 105, 65, 'public/images/portfolio/project-1.webp');
  await crop(145, 530, 105, 65, 'public/images/portfolio/project-2.webp');
  await crop(260, 530, 105, 65, 'public/images/portfolio/project-3.webp');
  await crop(370, 530, 105, 65, 'public/images/portfolio/project-4.webp');

  // Additional portfolio images from subpage preview on the right (x: 520 to 670, y: 360 to 460)
  await crop(525, 375, 45, 35, 'public/images/portfolio/project-5.webp');
  await crop(575, 375, 45, 35, 'public/images/portfolio/project-6.webp');
  await crop(625, 375, 45, 35, 'public/images/portfolio/project-7.webp');
  await crop(525, 420, 45, 35, 'public/images/portfolio/project-8.webp');

  // 6. About image
  // x: 35, y: 690, w: 160, h: 65
  await crop(35, 690, 160, 65, 'public/images/about/building.webp');
  // From about subpage on right (paint roller on yellow wall): x: 520, y: 48, w: 60, h: 55
  await crop(520, 48, 60, 55, 'public/images/about/about-hero.webp');

  // 7. Blog images
  // Subpage blog preview: x: 520 to 675, y: 665 to 710
  await crop(525, 665, 45, 35, 'public/images/blog/blog-3.webp');
  await crop(575, 665, 45, 35, 'public/images/blog/blog-2.webp');
  await crop(625, 665, 45, 35, 'public/images/blog/blog-1.webp');

  // 8. Paint roller visual in Why Choose Us & Quote section
  await crop(425, 630, 80, 55, 'public/images/brand/roller-decor.webp');
  await crop(0, 885, 105, 60, 'public/images/brand/quote-tools.webp');

  console.log('All reference slices generated successfully!');
}

run().catch(console.error);
