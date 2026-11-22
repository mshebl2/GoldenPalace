const sharp = require('sharp');
const fs = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#081B33"/>
  <!-- Palace Roof / House Outline in Gold -->
  <path d="M32 10 L52 26 L48 26 L48 50 L16 50 L16 26 L12 26 Z" fill="none" stroke="#D4A63D" stroke-width="3" stroke-linejoin="round"/>
  <!-- Paint Roller in Gold -->
  <rect x="22" y="22" width="20" height="10" rx="2.5" fill="#F5D77A" stroke="#D4A63D" stroke-width="1.5"/>
  <!-- Roller Handle -->
  <path d="M42 27 L46 27 L46 36 L32 36 L32 44" fill="none" stroke="#D4A63D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Paint drop -->
  <circle cx="32" cy="46" r="2.5" fill="#D4A63D"/>
</svg>`;

sharp(Buffer.from(svg))
  .resize(64, 64)
  .png()
  .toFile('src/app/icon.png')
  .then(() => {
    fs.copyFileSync('src/app/icon.png', 'public/favicon.ico');
    fs.copyFileSync('src/app/icon.png', 'src/app/favicon.ico');
    fs.copyFileSync('src/app/icon.png', 'public/images/brand/emblem.png');
    console.log('Golden Palace Favicon and Icons successfully generated and copied!');
  })
  .catch(err => console.error(err));
