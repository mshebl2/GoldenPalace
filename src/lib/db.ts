import fs from 'fs';
import path from 'path';
import {
  IService,
  IProject,
  IMaterial,
  IArticle,
  IQuotationRequest,
  ISiteSettings,
  ISEOSettings,
  IUser,
  IProductCategory,
  IProduct,
  IReview,
  IMachine,
} from './models';
import {
  initialSiteSettings,
  initialSEOSettings,
  initialServices,
  initialProjects,
  initialMaterials,
  initialArticles,
  initialQuotations,
  initialUsers,
  initialCategories,
  initialProducts,
  initialReviews,
} from './seed-data';
import {
  connectToDatabase,
  SettingsModel,
  SEOModel,
  ProductModel,
  CategoryModel,
  ServiceModel,
  ProjectModel,
  MaterialModel,
  MachineModelMongo,
  ReviewModel,
  ArticleModel,
  QuotationModel,
  UserModel,
} from './mongodb';

interface DatabaseSchema {
  settings: ISiteSettings;
  seo: ISEOSettings;
  services: IService[];
  projects: IProject[];
  materials: IMaterial[];
  articles: IArticle[];
  quotations: IQuotationRequest[];
  users: IUser[];
  categories: IProductCategory[];
  products: IProduct[];
  reviews: IReview[];
  machinery?: IMachine[];
}

const dataDir = path.join(process.cwd(), 'data');
const dbFilePath = path.join(dataDir, 'db.json');

function ensureDatabase(): DatabaseSchema {
  const defaultData: DatabaseSchema = {
    settings: initialSiteSettings,
    seo: initialSEOSettings,
    services: initialServices,
    projects: initialProjects,
    materials: initialMaterials,
    articles: initialArticles,
    quotations: initialQuotations,
    users: initialUsers,
    categories: initialCategories,
    products: initialProducts,
    reviews: initialReviews,
  };

  try {
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch {}
    }

    if (!fs.existsSync(dbFilePath)) {
      try {
        fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      } catch {}
      return defaultData;
    }

    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    const data: DatabaseSchema = JSON.parse(raw);
    return data;
  } catch (e) {
    console.warn('Filesystem fallback in ensureDatabase (safe for serverless):', e);
    return defaultData;
  }
}

function saveDatabase(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to save to db.json fallback:', e);
  }
}

function cleanDoc<T>(doc: any): T {
  if (!doc) return doc;
  const { _id, __v, ...clean } = doc;
  if (clean.createdAt) {
    try {
      clean.createdAt = clean.createdAt instanceof Date 
        ? clean.createdAt.toISOString() 
        : (typeof clean.createdAt === 'object' && clean.createdAt !== null)
          ? new Date(clean.createdAt).toISOString()
          : String(clean.createdAt);
    } catch {
      clean.createdAt = new Date().toISOString();
    }
  }
  if (clean.updatedAt) {
    try {
      clean.updatedAt = clean.updatedAt instanceof Date 
        ? clean.updatedAt.toISOString() 
        : (typeof clean.updatedAt === 'object' && clean.updatedAt !== null)
          ? new Date(clean.updatedAt).toISOString()
          : String(clean.updatedAt);
    } catch {
      clean.updatedAt = new Date().toISOString();
    }
  }
  return clean as T;
}

function cleanDocs<T>(docs: any[]): T[] {
  return (docs || []).map(cleanDoc<T>);
}

// ==========================================
// Site Settings
// ==========================================
export async function getSiteSettings(): Promise<ISiteSettings> {
  try {
    await connectToDatabase();
    const doc = await SettingsModel.findOne().lean();
    if (doc) return cleanDoc<ISiteSettings>(doc);
  } catch (err) {
    console.warn('MongoDB getSiteSettings fallback:', err);
  }
  const db = ensureDatabase();
  return db.settings;
}

export async function updateSiteSettings(updates: Partial<ISiteSettings>): Promise<ISiteSettings> {
  const db = ensureDatabase();
  db.settings = { ...db.settings, ...updates };
  saveDatabase(db);
  try {
    await connectToDatabase();
    await SettingsModel.updateOne({}, { $set: updates }, { upsert: true });
  } catch (err) {
    console.warn('MongoDB updateSiteSettings error:', err);
  }
  return db.settings;
}

// ==========================================
// SEO Settings
// ==========================================
export async function getSEOSettings(): Promise<ISEOSettings> {
  try {
    await connectToDatabase();
    const doc = await SEOModel.findOne().lean();
    if (doc) return cleanDoc<ISEOSettings>(doc);
  } catch (err) {
    console.warn('MongoDB getSEOSettings fallback:', err);
  }
  const db = ensureDatabase();
  return db.seo || initialSEOSettings;
}

export async function updateSEOSettings(updates: Partial<ISEOSettings>): Promise<ISEOSettings> {
  const db = ensureDatabase();
  db.seo = { ...(db.seo || initialSEOSettings), ...updates };
  saveDatabase(db);
  try {
    await connectToDatabase();
    await SEOModel.updateOne({}, { $set: updates }, { upsert: true });
  } catch (err) {
    console.warn('MongoDB updateSEOSettings error:', err);
  }
  return db.seo;
}

// ==========================================
// Services
// ==========================================
export async function getServices(): Promise<IService[]> {
  try {
    await connectToDatabase();
    const docs = await ServiceModel.find().lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IService>(docs).sort((a, b) => a.order - b.order);
    }
  } catch (err) {
    console.warn('MongoDB getServices fallback:', err);
  }
  const db = ensureDatabase();
  return (db.services || []).sort((a, b) => a.order - b.order);
}

export async function getServiceBySlug(slug: string): Promise<IService | null> {
  try {
    await connectToDatabase();
    const doc = await ServiceModel.findOne({ slug }).lean();
    if (doc) return cleanDoc<IService>(doc);
  } catch (err) {
    console.warn('MongoDB getServiceBySlug fallback:', err);
  }
  const db = ensureDatabase();
  return db.services.find((s) => s.slug === slug) || null;
}

export async function createService(service: Omit<IService, 'id'>): Promise<IService> {
  const newService: IService = {
    ...service,
    id: 'srv-' + Date.now(),
  };
  const db = ensureDatabase();
  db.services.push(newService);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await ServiceModel.create(newService);
  } catch (err) {
    console.warn('MongoDB createService error:', err);
  }
  return newService;
}

export async function updateService(id: string, updates: Partial<IService>): Promise<IService | null> {
  const db = ensureDatabase();
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx !== -1) {
    db.services[idx] = { ...db.services[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await ServiceModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IService>(updated);
  } catch (err) {
    console.warn('MongoDB updateService error:', err);
  }
  return idx !== -1 ? db.services[idx] : null;
}

export async function deleteService(id: string): Promise<boolean> {
  const db = ensureDatabase();
  const len = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  if (db.services.length !== len) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await ServiceModel.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteService error:', err);
  }
  return db.services.length !== len;
}

// ==========================================
// Categories
// ==========================================
export async function getCategories(): Promise<IProductCategory[]> {
  try {
    await connectToDatabase();
    const docs = await CategoryModel.find().lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IProductCategory>(docs).sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.warn('MongoDB getCategories fallback:', err);
  }
  const db = ensureDatabase();
  return (db.categories || []).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getCategoryById(id: string): Promise<IProductCategory | null> {
  try {
    await connectToDatabase();
    const doc = await CategoryModel.findOne({ id }).lean();
    if (doc) return cleanDoc<IProductCategory>(doc);
  } catch (err) {
    console.warn('MongoDB getCategoryById fallback:', err);
  }
  const db = ensureDatabase();
  return (db.categories || []).find((c) => c.id === id) || null;
}

export async function createCategory(cat: Omit<IProductCategory, 'id'>): Promise<IProductCategory> {
  const newCat: IProductCategory = {
    ...cat,
    id: 'cat-' + Date.now(),
  };
  const db = ensureDatabase();
  if (!db.categories) db.categories = [];
  db.categories.push(newCat);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await CategoryModel.create(newCat);
  } catch (err) {
    console.warn('MongoDB createCategory error:', err);
  }
  return newCat;
}

export async function updateCategory(id: string, updates: Partial<IProductCategory>): Promise<IProductCategory | null> {
  const db = ensureDatabase();
  if (!db.categories) db.categories = [];
  const idx = db.categories.findIndex((c) => c.id === id);
  if (idx !== -1) {
    db.categories[idx] = { ...db.categories[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await CategoryModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IProductCategory>(updated);
  } catch (err) {
    console.warn('MongoDB updateCategory error:', err);
  }
  return idx !== -1 ? db.categories[idx] : null;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const db = ensureDatabase();
  if (!db.categories) return false;
  const initLen = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== id);
  if (db.categories.length !== initLen) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await CategoryModel.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteCategory error:', err);
  }
  return db.categories.length !== initLen;
}

// ==========================================
// Products
// ==========================================
export async function getProducts(): Promise<IProduct[]> {
  try {
    await connectToDatabase();
    const docs = await ProductModel.find().lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IProduct>(docs).sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.warn('MongoDB getProducts fallback:', err);
  }
  const db = ensureDatabase();
  return (db.products || []).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getProductById(id: string): Promise<IProduct | null> {
  try {
    await connectToDatabase();
    const doc = await ProductModel.findOne({ id }).lean();
    if (doc) return cleanDoc<IProduct>(doc);
  } catch (err) {
    console.warn('MongoDB getProductById fallback:', err);
  }
  const db = ensureDatabase();
  return (db.products || []).find((p) => p.id === id) || null;
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  try {
    await connectToDatabase();
    const doc = await ProductModel.findOne({ slug }).lean();
    if (doc) return cleanDoc<IProduct>(doc);
  } catch (err) {
    console.warn('MongoDB getProductBySlug fallback:', err);
  }
  const db = ensureDatabase();
  return (db.products || []).find((p) => p.slug === slug) || null;
}

export async function createProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
  const newProduct: IProduct = {
    ...product,
    id: 'prod-' + Date.now(),
  };
  const db = ensureDatabase();
  if (!db.products) db.products = [];
  db.products.push(newProduct);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await ProductModel.create(newProduct);
  } catch (err) {
    console.warn('MongoDB createProduct error:', err);
  }
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<IProduct>): Promise<IProduct | null> {
  const db = ensureDatabase();
  if (!db.products) db.products = [];
  const idx = db.products.findIndex((p) => p.id === id);
  if (idx !== -1) {
    db.products[idx] = { ...db.products[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await ProductModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IProduct>(updated);
  } catch (err) {
    console.warn('MongoDB updateProduct error:', err);
  }
  return idx !== -1 ? db.products[idx] : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = ensureDatabase();
  if (!db.products) return false;
  const initLen = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== initLen) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await ProductModel.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteProduct error:', err);
  }
  return db.products.length !== initLen;
}

// ==========================================
// Projects
// ==========================================
export async function getProjects(): Promise<IProject[]> {
  try {
    await connectToDatabase();
    const docs = await ProjectModel.find().lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IProject>(docs).sort((a, b) => a.order - b.order);
    }
  } catch (err) {
    console.warn('MongoDB getProjects fallback:', err);
  }
  const db = ensureDatabase();
  return db.projects.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<IProject | null> {
  try {
    await connectToDatabase();
    const doc = await ProjectModel.findOne({ slug }).lean();
    if (doc) return cleanDoc<IProject>(doc);
  } catch (err) {
    console.warn('MongoDB getProjectBySlug fallback:', err);
  }
  const db = ensureDatabase();
  return db.projects.find((p) => p.slug === slug) || null;
}

export async function createProject(project: Omit<IProject, 'id'>): Promise<IProject> {
  const newProj: IProject = {
    ...project,
    id: 'proj-' + Date.now(),
  };
  const db = ensureDatabase();
  db.projects.push(newProj);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await ProjectModel.create(newProj);
  } catch (err) {
    console.warn('MongoDB createProject error:', err);
  }
  return newProj;
}

export async function updateProject(id: string, updates: Partial<IProject>): Promise<IProject | null> {
  const db = ensureDatabase();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    db.projects[idx] = { ...db.projects[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await ProjectModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IProject>(updated);
  } catch (err) {
    console.warn('MongoDB updateProject error:', err);
  }
  return idx !== -1 ? db.projects[idx] : null;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = ensureDatabase();
  const len = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length !== len) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await ProjectModel.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteProject error:', err);
  }
  return db.projects.length !== len;
}

// ==========================================
// Materials
// ==========================================
export async function getMaterials(): Promise<IMaterial[]> {
  try {
    await connectToDatabase();
    const docs = await MaterialModel.find().lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IMaterial>(docs).sort((a, b) => a.order - b.order);
    }
  } catch (err) {
    console.warn('MongoDB getMaterials fallback:', err);
  }
  const db = ensureDatabase();
  return db.materials.sort((a, b) => a.order - b.order);
}

export async function getMaterialBySlug(slug: string): Promise<IMaterial | null> {
  try {
    await connectToDatabase();
    const doc = await MaterialModel.findOne({ slug }).lean();
    if (doc) return cleanDoc<IMaterial>(doc);
  } catch (err) {
    console.warn('MongoDB getMaterialBySlug fallback:', err);
  }
  const db = ensureDatabase();
  return db.materials.find((m) => m.slug === slug) || null;
}

export async function createMaterial(mat: Omit<IMaterial, 'id'>): Promise<IMaterial> {
  const newMat: IMaterial = {
    ...mat,
    id: 'mat-' + Date.now(),
  };
  const db = ensureDatabase();
  db.materials.push(newMat);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await MaterialModel.create(newMat);
  } catch (err) {
    console.warn('MongoDB createMaterial error:', err);
  }
  return newMat;
}

export async function updateMaterial(id: string, updates: Partial<IMaterial>): Promise<IMaterial | null> {
  const db = ensureDatabase();
  const idx = db.materials.findIndex((m) => m.id === id);
  if (idx !== -1) {
    db.materials[idx] = { ...db.materials[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await MaterialModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IMaterial>(updated);
  } catch (err) {
    console.warn('MongoDB updateMaterial error:', err);
  }
  return idx !== -1 ? db.materials[idx] : null;
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const db = ensureDatabase();
  const len = db.materials.length;
  db.materials = db.materials.filter((s) => s.id !== id);
  if (db.materials.length !== len) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await MaterialModel.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteMaterial error:', err);
  }
  return db.materials.length !== len;
}

// ==========================================
// Machinery & Factory Equipment
// ==========================================
export async function getMachinery(): Promise<IMachine[]> {
  try {
    await connectToDatabase();
    const docs = await MachineModelMongo.find().lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IMachine>(docs).sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.warn('MongoDB getMachinery fallback:', err);
  }
  const db = ensureDatabase();
  return (db.machinery || []).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getMachineById(id: string): Promise<IMachine | null> {
  try {
    await connectToDatabase();
    const doc = await MachineModelMongo.findOne({ id }).lean();
    if (doc) return cleanDoc<IMachine>(doc);
  } catch (err) {
    console.warn('MongoDB getMachineById fallback:', err);
  }
  const db = ensureDatabase();
  return (db.machinery || []).find((m) => m.id === id) || null;
}

export async function createMachine(machine: Omit<IMachine, 'id'>): Promise<IMachine> {
  const newMachine: IMachine = {
    ...machine,
    id: 'mach-' + Date.now(),
  };
  const db = ensureDatabase();
  if (!db.machinery) db.machinery = [];
  db.machinery.push(newMachine);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await MachineModelMongo.create(newMachine);
  } catch (err) {
    console.warn('MongoDB createMachine error:', err);
  }
  return newMachine;
}

export async function updateMachine(id: string, updates: Partial<IMachine>): Promise<IMachine | null> {
  const db = ensureDatabase();
  if (!db.machinery) db.machinery = [];
  const idx = db.machinery.findIndex((m) => m.id === id);
  if (idx !== -1) {
    db.machinery[idx] = { ...db.machinery[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await MachineModelMongo.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IMachine>(updated);
  } catch (err) {
    console.warn('MongoDB updateMachine error:', err);
  }
  return idx !== -1 ? db.machinery[idx] : null;
}

export async function deleteMachine(id: string): Promise<boolean> {
  const db = ensureDatabase();
  if (!db.machinery) return false;
  const initLen = db.machinery.length;
  db.machinery = db.machinery.filter((m) => m.id !== id);
  if (db.machinery.length !== initLen) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await MachineModelMongo.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteMachine error:', err);
  }
  return db.machinery.length !== initLen;
}

// ==========================================
// Articles
// ==========================================
export async function getArticles(): Promise<IArticle[]> {
  try {
    await connectToDatabase();
    const docs = await ArticleModel.find().lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IArticle>(docs);
    }
  } catch (err) {
    console.warn('MongoDB getArticles fallback:', err);
  }
  const db = ensureDatabase();
  return db.articles || [];
}

export async function getAllArticlesAdmin(): Promise<IArticle[]> {
  return getArticles();
}

export async function getArticleBySlug(slug: string): Promise<IArticle | null> {
  try {
    await connectToDatabase();
    const doc = await ArticleModel.findOne({ slug }).lean();
    if (doc) return cleanDoc<IArticle>(doc);
  } catch (err) {
    console.warn('MongoDB getArticleBySlug fallback:', err);
  }
  const db = ensureDatabase();
  return db.articles.find((a) => a.slug === slug) || null;
}

export async function createArticle(article: Omit<IArticle, 'id'>): Promise<IArticle> {
  const newArticle: IArticle = {
    ...article,
    id: 'art-' + Date.now(),
  };
  const db = ensureDatabase();
  db.articles.push(newArticle);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await ArticleModel.create(newArticle);
  } catch (err) {
    console.warn('MongoDB createArticle error:', err);
  }
  return newArticle;
}

export async function updateArticle(id: string, updates: Partial<IArticle>): Promise<IArticle | null> {
  const db = ensureDatabase();
  const idx = db.articles.findIndex((a) => a.id === id);
  if (idx !== -1) {
    db.articles[idx] = { ...db.articles[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await ArticleModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IArticle>(updated);
  } catch (err) {
    console.warn('MongoDB updateArticle error:', err);
  }
  return idx !== -1 ? db.articles[idx] : null;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const db = ensureDatabase();
  const len = db.articles.length;
  db.articles = db.articles.filter((a) => a.id !== id);
  if (db.articles.length !== len) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await ArticleModel.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteArticle error:', err);
  }
  return db.articles.length !== len;
}

// ==========================================
// Quotations
// ==========================================
export async function getQuotations(): Promise<IQuotationRequest[]> {
  try {
    await connectToDatabase();
    const docs = await QuotationModel.find().lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IQuotationRequest>(docs).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  } catch (err) {
    console.warn('MongoDB getQuotations fallback:', err);
  }
  const db = ensureDatabase();
  return (db.quotations || []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getQuotationById(id: string): Promise<IQuotationRequest | null> {
  try {
    await connectToDatabase();
    const doc = await QuotationModel.findOne({ id }).lean();
    if (doc) return cleanDoc<IQuotationRequest>(doc);
  } catch (err) {
    console.warn('MongoDB getQuotationById fallback:', err);
  }
  const db = ensureDatabase();
  return (db.quotations || []).find((q) => q.id === id) || null;
}

export async function createQuotation(
  quote: Omit<IQuotationRequest, 'id' | 'createdAt' | 'updatedAt' | 'referenceNumber' | 'status'> &
    Partial<Pick<IQuotationRequest, 'status' | 'referenceNumber' | 'updatedAt'>>
): Promise<IQuotationRequest> {
  const now = new Date().toISOString();
  const randomRef = 'EET-' + Math.floor(100000 + Math.random() * 900000);
  const newQuote: IQuotationRequest = {
    ...quote,
    id: 'quote-' + Date.now(),
    referenceNumber: quote.referenceNumber || randomRef,
    status: quote.status || 'New',
    createdAt: now,
    updatedAt: quote.updatedAt || now,
  };
  const db = ensureDatabase();
  if (!db.quotations) db.quotations = [];
  db.quotations.push(newQuote);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await QuotationModel.create(newQuote);
  } catch (err) {
    console.warn('MongoDB createQuotation error:', err);
  }
  return newQuote;
}

export async function updateQuotation(id: string, updates: Partial<IQuotationRequest>): Promise<IQuotationRequest | null> {
  const db = ensureDatabase();
  if (!db.quotations) db.quotations = [];
  const idx = db.quotations.findIndex((q) => q.id === id);
  if (idx !== -1) {
    db.quotations[idx] = { ...db.quotations[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await QuotationModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IQuotationRequest>(updated);
  } catch (err) {
    console.warn('MongoDB updateQuotation error:', err);
  }
  return idx !== -1 ? db.quotations[idx] : null;
}

export async function deleteQuotation(id: string): Promise<boolean> {
  const db = ensureDatabase();
  if (!db.quotations) return false;
  const initialLen = db.quotations.length;
  db.quotations = db.quotations.filter((q) => q.id !== id);
  if (db.quotations.length !== initialLen) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await QuotationModel.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteQuotation error:', err);
  }
  return db.quotations.length !== initialLen;
}

// ==========================================
// Users & Auth
// ==========================================
export async function getUsers(): Promise<IUser[]> {
  try {
    await connectToDatabase();
    const docs = await UserModel.find().lean();
    if (docs && docs.length > 0) return cleanDocs<IUser>(docs);
  } catch (err) {
    console.warn('MongoDB getUsers fallback:', err);
  }
  const db = ensureDatabase();
  return db.users || [];
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  const normalized = email.toLowerCase().trim();
  try {
    await connectToDatabase();
    const doc = await UserModel.findOne({ email: normalized }).lean();
    if (doc) return cleanDoc<IUser>(doc);
  } catch (err) {
    console.warn('MongoDB getUserByEmail fallback:', err);
  }
  const db = ensureDatabase();
  return (db.users || []).find((u) => u.email.toLowerCase().trim() === normalized) || null;
}

export async function getUserById(id: string): Promise<IUser | null> {
  try {
    await connectToDatabase();
    const doc = await UserModel.findOne({ id }).lean();
    if (doc) return cleanDoc<IUser>(doc);
  } catch (err) {
    console.warn('MongoDB getUserById fallback:', err);
  }
  const db = ensureDatabase();
  return (db.users || []).find((u) => u.id === id) || null;
}

export async function getFirstAdminUser(): Promise<IUser | null> {
  const users = await getUsers();
  return users.find((u) => u.role === 'admin') || users[0] || null;
}

export async function createUser(user: Omit<IUser, 'id'>): Promise<IUser> {
  const newUser: IUser = {
    ...user,
    id: 'user-' + Date.now(),
  };
  const db = ensureDatabase();
  if (!db.users) db.users = [];
  db.users.push(newUser);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await UserModel.create(newUser);
  } catch (err) {
    console.warn('MongoDB createUser error:', err);
  }
  return newUser;
}

export async function updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
  const db = ensureDatabase();
  if (!db.users) db.users = [];
  const idx = db.users.findIndex((u) => u.id === id);
  if (idx !== -1) {
    db.users[idx] = { ...db.users[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await UserModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IUser>(updated);
  } catch (err) {
    console.warn('MongoDB updateUser error:', err);
  }
  return idx !== -1 ? db.users[idx] : null;
}

// ==========================================
// Reviews
// ==========================================
export async function getReviews(onlyApproved: boolean = false): Promise<IReview[]> {
  try {
    await connectToDatabase();
    const query = onlyApproved ? { isApproved: true } : {};
    const docs = await ReviewModel.find(query).lean();
    if (docs && docs.length > 0) {
      return cleanDocs<IReview>(docs).sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }
  } catch (err) {
    console.warn('MongoDB getReviews fallback:', err);
  }
  const db = ensureDatabase();
  const all = db.reviews || [];
  return (onlyApproved ? all.filter((r) => r.isApproved) : all).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
}

export async function createReview(
  review: Omit<IReview, 'id' | 'createdAt'> & { createdAt?: string }
): Promise<IReview> {
  const newReview: IReview = {
    ...review,
    id: 'rev-' + Date.now(),
    createdAt: review.createdAt || new Date().toISOString(),
  };
  const db = ensureDatabase();
  if (!db.reviews) db.reviews = [];
  db.reviews.push(newReview);
  saveDatabase(db);
  try {
    await connectToDatabase();
    await ReviewModel.create(newReview);
  } catch (err) {
    console.warn('MongoDB createReview error:', err);
  }
  return newReview;
}

export async function updateReview(id: string, updates: Partial<IReview>): Promise<IReview | null> {
  const db = ensureDatabase();
  if (!db.reviews) db.reviews = [];
  const idx = db.reviews.findIndex((r) => r.id === id);
  if (idx !== -1) {
    db.reviews[idx] = { ...db.reviews[idx], ...updates };
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    const updated = await ReviewModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    if (updated) return cleanDoc<IReview>(updated);
  } catch (err) {
    console.warn('MongoDB updateReview error:', err);
  }
  return idx !== -1 ? db.reviews[idx] : null;
}

export async function deleteReview(id: string): Promise<boolean> {
  const db = ensureDatabase();
  if (!db.reviews) return false;
  const initialLen = db.reviews.length;
  db.reviews = db.reviews.filter((r) => r.id !== id);
  if (db.reviews.length !== initialLen) {
    saveDatabase(db);
  }
  try {
    await connectToDatabase();
    await ReviewModel.deleteOne({ id });
    return true;
  } catch (err) {
    console.warn('MongoDB deleteReview error:', err);
  }
  return db.reviews.length !== initialLen;
}
