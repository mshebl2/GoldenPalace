const fs = require('fs');
const mongoose = require('mongoose');

const dbPath = 'data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('Services count:', db.services.length);
db.services.forEach(s => {
  console.log(`- ${s.titleAr} (${s.slug}) -> ${s.coverImage || s.image}`);
});

// Update services with real works images
db.services = db.services.map(s => {
  if (s.slug === 'home-paints' || s.id === 'srv-homes') {
    return {
      ...s,
      image: '/images/portfolio/real-modern-room-parquet.jpg',
      coverImage: '/images/portfolio/real-modern-room-parquet.jpg',
      gallery: [
        '/images/portfolio/real-modern-room-parquet.jpg',
        '/images/portfolio/real-limestone-hallway.jpg',
        '/images/portfolio/real-breeze-limestone-foam.jpg'
      ]
    };
  }
  if (s.slug === 'interior-paints' || s.id === 'srv-interior') {
    return {
      ...s,
      image: '/images/portfolio/real-limestone-hallway.jpg',
      coverImage: '/images/portfolio/real-limestone-hallway.jpg',
      gallery: [
        '/images/portfolio/real-limestone-hallway.jpg',
        '/images/portfolio/real-classic-white-corridor.jpg',
        '/images/catalog/jotun-interior-swatches.jpg'
      ]
    };
  }
  if (s.slug === 'apartment-paints' || s.id === 'srv-apartments') {
    return {
      ...s,
      image: '/images/portfolio/real-breeze-vanilla-latte.jpg',
      coverImage: '/images/portfolio/real-breeze-vanilla-latte.jpg',
      gallery: [
        '/images/portfolio/real-breeze-vanilla-latte.jpg',
        '/images/portfolio/real-modern-room-parquet.jpg',
        '/images/brand/official-golden-palace-flyer.jpg'
      ]
    };
  }
  if (s.slug === 'door-paints' || s.id === 'srv-doors') {
    return {
      ...s,
      image: '/images/portfolio/real-greige-painted-door.jpg',
      coverImage: '/images/portfolio/real-greige-painted-door.jpg',
      gallery: [
        '/images/portfolio/real-greige-painted-door.jpg',
        '/images/portfolio/real-hallway-wood-doors.jpg',
        '/images/brand/official-golden-palace-flyer.jpg'
      ]
    };
  }
  if (s.slug === 'ceiling-paints' || s.id === 'srv-ceilings') {
    return {
      ...s,
      image: '/images/portfolio/real-hallway-wood-doors.jpg',
      coverImage: '/images/portfolio/real-hallway-wood-doors.jpg',
      gallery: [
        '/images/portfolio/real-hallway-wood-doors.jpg',
        '/images/portfolio/real-modern-room-parquet.jpg',
        '/images/brand/official-golden-palace-flyer.jpg'
      ]
    };
  }
  if (s.slug === 'foam-mouldings' || s.slug === 'decorations' || s.id === 'srv-decor') {
    return {
      ...s,
      image: '/images/portfolio/real-luxury-foam-moldings.jpg',
      coverImage: '/images/portfolio/real-luxury-foam-moldings.jpg',
      gallery: [
        '/images/portfolio/real-luxury-foam-moldings.jpg',
        '/images/portfolio/real-breeze-limestone-foam.jpg',
        '/images/portfolio/real-breeze-vanilla-latte.jpg'
      ]
    };
  }
  return s;
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('✓ Successfully updated db.services with real images!');

// Sync with MongoDB
async function syncServicesMongo() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://halahussien215299_db_user:5jxL4wQyTJZcLgfb@cluster0.7wja7i0.mongodb.net/golden_palace_paints?retryWrites=true&w=majority';
  try {
    await mongoose.connect(mongoUri);
    const serviceSchema = new mongoose.Schema({}, { strict: false });
    const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema, 'services');

    for (const s of db.services) {
      await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true, new: true });
    }
    console.log(`✓ Synced ${db.services.length} services to MongoDB Atlas!`);
    await mongoose.disconnect();
  } catch (err) {
    console.warn('MongoDB Sync Warning:', err.message);
  }
}

syncServicesMongo().then(() => {
  console.log('Services sync complete.');
  process.exit(0);
});
