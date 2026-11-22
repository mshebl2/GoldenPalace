const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create a luxury Golden Palace Paint Roller SVG
const svgFavicon = `
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#081B33"/>
      <stop offset="50%" stop-color="#0D2545"/>
      <stop offset="100%" stop-color="#081B33"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F5D77A"/>
      <stop offset="50%" stop-color="#D4A63D"/>
      <stop offset="100%" stop-color="#AA771C"/>
    </linearGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#D4A63D" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Luxury Background with rounded corner -->
  <rect width="256" height="256" rx="56" fill="url(#bgGrad)"/>
  <rect x="8" y="8" width="240" height="240" rx="48" stroke="url(#goldGrad)" stroke-width="6" fill="none"/>

  <!-- Elegant Golden Crown / Palace Roof Accent -->
  <path d="M128 42 L168 68 L152 76 L128 62 L104 76 L88 68 Z" fill="url(#goldGrad)"/>

  <!-- Stylized Paint Roller -->
  <!-- Roller Body -->
  <rect x="72" y="88" width="112" height="42" rx="10" fill="url(#goldGrad)" filter="url(#goldGlow)"/>
  
  <!-- Wet paint stripe / highlights -->
  <rect x="84" y="96" width="24" height="26" rx="4" fill="#FFF4D0" opacity="0.8"/>
  <rect x="116" y="96" width="56" height="8" rx="4" fill="#FFF4D0" opacity="0.6"/>

  <!-- Roller Frame Arm (Golden metal rod) -->
  <path d="M184 109 H202 C206 109 210 113 210 117 V152 C210 158 205 163 199 163 H138 V180" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Roller Handle -->
  <rect x="120" y="180" width="16" height="44" rx="6" fill="url(#goldGrad)"/>
  <rect x="123" y="190" width="10" height="4" rx="2" fill="#081B33"/>
  <rect x="123" y="198" width="10" height="4" rx="2" fill="#081B33"/>
  <rect x="123" y="206" width="10" height="4" rx="2" fill="#081B33"/>

  <!-- Fresh Golden Paint Drip -->
  <circle cx="86" cy="142" r="5" fill="url(#goldGrad)"/>
  <circle cx="102" cy="146" r="3.5" fill="url(#goldGrad)"/>
</svg>
`;

async function main() {
  const svgBuffer = Buffer.from(svgFavicon);

  // Generate 256x256 PNG
  const png256 = await sharp(svgBuffer).png().toBuffer();

  // Generate 64x64 PNG
  const png64 = await sharp(svgBuffer).resize(64, 64).png().toBuffer();

  // Generate 32x32 PNG (for favicon.ico)
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  // Overwrite public/images/brand/emblem.png
  fs.writeFileSync('public/images/brand/emblem.png', png256);
  console.log('Saved public/images/brand/emblem.png');

  // Overwrite public/favicon.png
  fs.writeFileSync('public/favicon.png', png256);
  console.log('Saved public/favicon.png');

  // Overwrite src/app/icon.png
  fs.writeFileSync('src/app/icon.png', png256);
  console.log('Saved src/app/icon.png');

  // Overwrite public/favicon.ico and src/app/favicon.ico
  // PNG buffer is valid in modern browsers as favicon.ico
  fs.writeFileSync('public/favicon.ico', png32);
  fs.writeFileSync('src/app/favicon.ico', png32);
  console.log('Saved favicon.ico files');

  console.log('All brand favicon files replaced with Golden Palace paint roller brand emblem!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
