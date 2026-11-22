const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      await processDir(full);
    } else if (file.endsWith('.webp') || file.endsWith('.png')) {
      const buffer = fs.readFileSync(full);
      const meta = await sharp(buffer).metadata();
      // If width < 600, upscale 2x-3x with lanczos3 and mild sharpening
      if (meta.width < 500) {
        const factor = Math.min(4, Math.ceil(800 / meta.width));
        const newW = meta.width * factor;
        const newH = meta.height * factor;
        const upscaled = await sharp(buffer)
          .resize(newW, newH, { kernel: sharp.kernel.lanczos3 })
          .sharpen({ sigma: 1, m1: 0.5, m2: 1.5 })
          .toBuffer();
        fs.writeFileSync(full, upscaled);
        console.log(`Upscaled ${full} to ${newW}x${newH}`);
      }
    }
  }
}

processDir('public/images').then(() => console.log('Upscaling complete!')).catch(console.error);
