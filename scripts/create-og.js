const sharp = require('sharp');
const path = require('path');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  const svgOverlay = `
  <svg width="${width}" height="${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#081B33" />
        <stop offset="100%" stop-color="#061426" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F5D77A" />
        <stop offset="50%" stop-color="#D4A63D" />
        <stop offset="100%" stop-color="#A87818" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <circle cx="950" cy="150" r="300" fill="#D4A63D" opacity="0.08" />
    <rect x="40" y="40" width="1120" height="550" rx="20" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.4" />
    <text x="600" y="240" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="url(#gold)" text-anchor="middle" direction="rtl">القصر الذهبي للدهانات والديكورات الحديثة</text>
    <text x="600" y="320" font-family="Arial, sans-serif" font-size="30" fill="#FFFFFF" text-anchor="middle" direction="rtl">حلول متكاملة في أعمال الدهانات والديكورات والتشطيبات</text>
    <text x="600" y="390" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#F5D77A" text-anchor="middle" direction="rtl">الخبر • الدمام • القطيف | هاتف: 0561095505</text>
    <rect x="420" y="440" width="360" height="60" rx="12" fill="url(#gold)" />
    <text x="600" y="480" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#061426" text-anchor="middle" direction="rtl">عروض تبدأ من 500 ريال للغرفة</text>
  </svg>
  `;

  await sharp(Buffer.from(svgOverlay))
    .jpeg({ quality: 90 })
    .toFile('public/images/brand/og-image.jpg');

  console.log('OG image created!');
}

createOgImage().catch(console.error);
