const fs = require('fs');
const path = require('path');

const imgPath = "C:/Users/mradd/.gemini/antigravity/brain/142af455-20c7-4c60-a3c9-bdf519fb3992/.user_uploaded/media_1794944890581_f155dd12.jpg";

try {
  const sharp = require('sharp');
  sharp(imgPath).metadata().then(meta => {
    console.log("IMAGE_METADATA:", JSON.stringify(meta, null, 2));
  }).catch(err => {
    console.error("SHARP_ERR:", err);
  });
} catch (e) {
  console.log("Sharp not yet available, checking file size:", fs.statSync(imgPath).size);
}
