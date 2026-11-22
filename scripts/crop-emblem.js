const sharp = require('sharp');

const srcImage = "C:/Users/mradd/.gemini/antigravity/brain/142af455-20c7-4c60-a3c9-bdf519fb3992/.user_uploaded/media_1794944890581_f155dd12.jpg";

async function cropEmblem() {
  // Crop only the house and paint roller (no text)
  await sharp(srcImage)
    .extract({ left: 345, top: 50, width: 80, height: 42 })
    .resize(240, 126, { kernel: sharp.kernel.lanczos3 })
    .sharpen()
    .toFile('public/images/brand/emblem.png');
  console.log('✅ Cropped emblem successfully!');
}

cropEmblem();
