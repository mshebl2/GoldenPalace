const sharp = require('sharp');
const fs = require('fs');

async function analyze() {
  const image = sharp('public/images/homepage-reference.png');
  const metadata = await image.metadata();
  console.log(`Image Dimension: ${metadata.width} x ${metadata.height}`);

  // Let's inspect the sections by Y-coordinate:
  // Top bar: y ~ 0 to 20
  // Navigation: y ~ 20 to 65
  // Hero: y ~ 65 to 285
  // Offers: y ~ 285 to 585
  // Services: y ~ 585 to 735
  // Portfolio: y ~ 735 to 890
  // Why Choose Us: y ~ 890 to 1024

  console.log("Analyzing sections coordinates and colors...");
}

analyze();
