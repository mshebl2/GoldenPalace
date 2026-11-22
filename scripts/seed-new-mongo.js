const fs = require('fs');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://halahussien215299_db_user:p03e6VNKYbeapLjg@cluster0.zxeqqnk.mongodb.net/golden_palace_paints?retryWrites=true&w=majority';

const dbPath = 'data/db.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

async function seed() {
  console.log('Connecting to new MongoDB Atlas cluster...');
  await mongoose.connect(uri);
  console.log('Connected successfully to golden_palace_paints database!');

  const conn = mongoose.connection;

  // Generic schema
  const createModel = (name, collectionName) => {
    const s = new mongoose.Schema({}, { strict: false, timestamps: true });
    return mongoose.models[name] || mongoose.model(name, s, collectionName);
  };

  const Settings = createModel('Settings', 'settings');
  const SEO = createModel('SEO', 'seosettings');
  const User = createModel('User', 'users');
  const Category = createModel('Category', 'categories');
  const Product = createModel('Product', 'products');
  const Service = createModel('Service', 'services');
  const Project = createModel('Project', 'projects');
  const Material = createModel('Material', 'materials');
  const Article = createModel('Article', 'articles');
  const Quotation = createModel('Quotation', 'quotations');
  const Review = createModel('Review', 'reviews');

  // 1. Settings
  if (data.settings) {
    await Settings.deleteMany({});
    await Settings.create(data.settings);
    console.log('✓ Seeded Settings collection');
  }

  // 2. SEO
  if (data.seo) {
    await SEO.deleteMany({});
    await SEO.create(data.seo);
    console.log('✓ Seeded SEO collection');
  }

  // 3. Users
  if (data.users && data.users.length > 0) {
    await User.deleteMany({});
    await User.insertMany(data.users);
    console.log(`✓ Seeded ${data.users.length} Users collection`);
  }

  // 4. Categories
  if (data.categories && data.categories.length > 0) {
    await Category.deleteMany({});
    await Category.insertMany(data.categories);
    console.log(`✓ Seeded ${data.categories.length} Categories collection`);
  }

  // 5. Products
  if (data.products && data.products.length > 0) {
    await Product.deleteMany({});
    await Product.insertMany(data.products);
    console.log(`✓ Seeded ${data.products.length} Products collection`);
  }

  // 6. Services
  if (data.services && data.services.length > 0) {
    await Service.deleteMany({});
    await Service.insertMany(data.services);
    console.log(`✓ Seeded ${data.services.length} Services collection`);
  }

  // 7. Projects
  if (data.projects && data.projects.length > 0) {
    await Project.deleteMany({});
    await Project.insertMany(data.projects);
    console.log(`✓ Seeded ${data.projects.length} Projects collection`);
  }

  // 8. Materials
  if (data.materials && data.materials.length > 0) {
    await Material.deleteMany({});
    await Material.insertMany(data.materials);
    console.log(`✓ Seeded ${data.materials.length} Materials collection`);
  }

  // 9. Articles
  if (data.articles && data.articles.length > 0) {
    await Article.deleteMany({});
    await Article.insertMany(data.articles);
    console.log(`✓ Seeded ${data.articles.length} Articles collection`);
  }

  // 10. Quotations
  if (data.quotations && data.quotations.length > 0) {
    await Quotation.deleteMany({});
    await Quotation.insertMany(data.quotations);
    console.log(`✓ Seeded ${data.quotations.length} Quotations collection`);
  }

  // 11. Reviews
  if (data.reviews && data.reviews.length > 0) {
    await Review.deleteMany({});
    await Review.insertMany(data.reviews);
    console.log(`✓ Seeded ${data.reviews.length} Reviews collection`);
  }

  // Verify by counting collections
  const collections = await conn.db.listCollections().toArray();
  console.log('\n--- VERIFICATION OF ALL COLLECTIONS IN NEW CLUSTER ---');
  for (const c of collections) {
    const count = await conn.db.collection(c.name).countDocuments();
    console.log(`Collection [${c.name}]: ${count} documents`);
  }

  await mongoose.disconnect();
  console.log('\n✓ All data successfully seeded and verified in new MongoDB Atlas cluster!');
}

seed().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
