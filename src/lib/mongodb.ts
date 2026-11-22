import mongoose, { Schema, Document, Model } from 'mongoose';
import {
  ISiteSettings,
  ISEOSettings,
  IProduct,
  IProductCategory,
  IService,
  IProject,
  IMaterial,
  IMachine,
  IReview,
  IArticle,
  IQuotationRequest,
  IUser,
} from './models';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ [MONGODB] MONGODB_URI environment variable is not defined.');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// ==========================================
// Mongoose Schemas with Strict: false for flexibility
// ==========================================

const SettingsSchema = new Schema<any>(
  {
    companyNameAr: { type: String, default: 'القصر الذهبي للدهانات والديكورات الحديثة' },
    companyNameEn: { type: String, default: 'Golden Palace for Modern Paints & Decors' },
  },
  { strict: false, timestamps: true, collection: 'settings' }
);

const SEOSchema = new Schema<any>(
  {},
  { strict: false, timestamps: true, collection: 'seo' }
);

const ProductSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
    titleAr: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { strict: false, timestamps: true, collection: 'products' }
);

const CategorySchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    nameAr: { type: String, required: true },
  },
  { strict: false, timestamps: true, collection: 'categories' }
);

const ServiceSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    titleAr: { type: String, required: true },
  },
  { strict: false, timestamps: true, collection: 'services' }
);

const ProjectSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    titleAr: { type: String, required: true },
  },
  { strict: false, timestamps: true, collection: 'projects' }
);

const MaterialSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    nameAr: { type: String, required: true },
  },
  { strict: false, timestamps: true, collection: 'materials' }
);

const MachineSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
    nameAr: { type: String, required: true },
  },
  { strict: false, timestamps: true, collection: 'machinery' }
);

const ReviewSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
  },
  { strict: false, timestamps: true, collection: 'reviews' }
);

const ArticleSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
  },
  { strict: false, timestamps: true, collection: 'articles' }
);

const QuotationSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
  },
  { strict: false, timestamps: true, collection: 'quotations' }
);

const UserSchema = new Schema<any>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { strict: false, timestamps: true, collection: 'users' }
);

export const SettingsModel: Model<any> =
  mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

export const SEOModel: Model<any> =
  mongoose.models.SEO || mongoose.model('SEO', SEOSchema);

export const ProductModel: Model<any> =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

export const CategoryModel: Model<any> =
  mongoose.models.Category || mongoose.model('Category', CategorySchema);

export const ServiceModel: Model<any> =
  mongoose.models.Service || mongoose.model('Service', ServiceSchema);

export const ProjectModel: Model<any> =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export const MaterialModel: Model<any> =
  mongoose.models.Material || mongoose.model('Material', MaterialSchema);

export const MachineModelMongo: Model<any> =
  mongoose.models.Machine || mongoose.model('Machine', MachineSchema);

export const ReviewModel: Model<any> =
  mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export const ArticleModel: Model<any> =
  mongoose.models.Article || mongoose.model('Article', ArticleSchema);

export const QuotationModel: Model<any> =
  mongoose.models.Quotation || mongoose.model('Quotation', QuotationSchema);

export const UserModel: Model<any> =
  mongoose.models.User || mongoose.model('User', UserSchema);

