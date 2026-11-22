const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const images = [
  {
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    out: "public/images/hero/living-room.webp",
    width: 1200,
    height: 800,
  },
  {
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
    out: "public/images/offers/one-room.webp",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
    out: "public/images/offers/two-rooms.webp",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    out: "public/images/offers/three-rooms.webp",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    out: "public/images/offers/ceiling.webp",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?q=80&w=800&auto=format&fit=crop",
    out: "public/images/offers/door.webp",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    out: "public/images/services/facade.webp",
    width: 600,
    height: 450,
  },
  {
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
    out: "public/images/services/interior.webp",
    width: 600,
    height: 450,
  },
  {
    url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop",
    out: "public/images/services/exterior.webp",
    width: 600,
    height: 450,
  },
  {
    url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
    out: "public/images/services/decor.webp",
    width: 600,
    height: 450,
  },
  {
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    out: "public/images/services/ceiling.webp",
    width: 600,
    height: 450,
  },
  {
    url: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?q=80&w=800&auto=format&fit=crop",
    out: "public/images/services/door.webp",
    width: 600,
    height: 450,
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop",
    out: "public/images/portfolio/project-1.webp",
    width: 800,
    height: 550,
  },
  {
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=900&auto=format&fit=crop",
    out: "public/images/portfolio/project-2.webp",
    width: 800,
    height: 550,
  },
  {
    url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=900&auto=format&fit=crop",
    out: "public/images/portfolio/project-3.webp",
    width: 800,
    height: 550,
  },
  {
    url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=900&auto=format&fit=crop",
    out: "public/images/portfolio/project-4.webp",
    width: 800,
    height: 550,
  },
  {
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop",
    out: "public/images/about/building.webp",
    width: 900,
    height: 550,
  },
  {
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
    out: "public/images/about/about-hero.webp",
    width: 800,
    height: 600,
  }
];

function downloadAndProcess(item) {
  return new Promise((resolve) => {
    https.get(item.url, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          const chunks = [];
          redirectRes.on('data', c => chunks.push(c));
          redirectRes.on('end', async () => {
            try {
              const buffer = Buffer.concat(chunks);
              await sharp(buffer)
                .resize(item.width, item.height, { fit: 'cover' })
                .webp({ quality: 88 })
                .toFile(item.out);
              console.log('✅ Downloaded & saved:', item.out);
              resolve(true);
            } catch (err) {
              console.error('Error saving', item.out, err.message);
              resolve(false);
            }
          });
        });
        return;
      }

      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          await sharp(buffer)
            .resize(item.width, item.height, { fit: 'cover' })
            .webp({ quality: 88 })
            .toFile(item.out);
          console.log('✅ Downloaded & saved:', item.out);
          resolve(true);
        } catch (err) {
          console.error('Error saving', item.out, err.message);
          resolve(false);
        }
      });
    }).on('error', err => {
      console.error('Download error for', item.out, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading high resolution architectural & interior photos...');
  for (const item of images) {
    await downloadAndProcess(item);
  }
  console.log('All high resolution photos processed!');
}

run();
