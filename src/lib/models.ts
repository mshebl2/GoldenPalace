export interface IProductCategory {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  order: number;
}

export interface IProduct {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  categoryId: string;
  categorySlug?: string;
  categoryAr: string;
  categoryEn: string;
  materialAr: string;
  materialEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverImage: string;
  gallery: string[];
  specsAr?: string[];
  specsEn?: string[];
  dimensionsAr?: string;
  dimensionsEn?: string;
  dimensions?: string;
  finishAr?: string;
  finishEn?: string;
  featured?: boolean;
  order?: number;
  price?: number | string;
  showPrice?: boolean;
  priceUnitAr?: string;
  priceUnitEn?: string;
}

export interface IProject {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: string; // 'residential' | 'commercial' | 'facades' | 'interior'
  locationAr: string;
  locationEn: string;
  scopeAr: string;
  scopeEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverImage: string;
  gallery: string[];
  completionDate?: string;
  featured: boolean;
  order: number;
}

export interface IService {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverImage: string;
  gallery: string[];
  featuresAr: string[];
  featuresEn: string[];
  order: number;
  active: boolean;
}

export interface IMaterial {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverImage: string;
  colors: string[];
  availableDimensions: string[];
  thicknessOptions: string[];
  technicalSpecsAr: string[];
  technicalSpecsEn: string[];
  pdfSpecSheet?: string;
  inStock: boolean;
  order: number;
}

export interface IArticle {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  coverImage: string;
  category: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  readTime: string;
}

export interface IQuotationRequest {
  id: string;
  referenceNumber: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  projectLocation: string;
  requiredService: string;
  projectType: string;
  approximateArea?: string;
  materialPreferences?: string;
  description: string;
  attachments: string[];
  preferredContact: 'phone' | 'whatsapp' | 'email';
  status: 'New' | 'Under Review' | 'Contacted' | 'Quoted' | 'Closed';
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISiteSettings {
  companyNameAr: string;
  companyNameEn: string;
  heroHeadlineAr: string;
  heroHeadlineEn: string;
  heroSubtextAr: string;
  heroSubtextEn: string;
  phone: string;
  whatsapp?: string;
  email: string;
  locationAr: string;
  locationEn: string;
  serviceAreasAr?: string;
  unifiedNumber: string;
  topAnnouncementAr?: string;
  logoUrl?: string;
  logoHeight?: number;
  faviconUrl?: string;

  // Hero Section Customization
  heroDiscountBadgeAr?: string;
  heroGuaranteeBadgeAr?: string;
  heroHeadlineLine1Ar?: string;
  heroHeadlineLine2Ar?: string;
  heroLiveStatusAr?: string;
  heroMainImage?: string;
  heroCtaWhatsappTextAr?: string;
  heroCtaCallTextAr?: string;

  // 3 Proof Metrics Cards
  heroProof1Title?: string;
  heroProof1Desc?: string;
  heroProof2Title?: string;
  heroProof2Desc?: string;
  heroProof3Title?: string;
  heroProof3Desc?: string;

  // Offers Section (باقات وعروض جوتن)
  offersSectionTitleAr?: string;
  offersSectionSubtextAr?: string;
  offersChecklist1Ar?: string;
  offersChecklist2Ar?: string;
  offersChecklist3Ar?: string;
  offersChecklist4Ar?: string;

  // Why Us Section (لماذا القصر الذهبي)
  whyUsSectionTitleAr?: string;
  whyUsSectionSubtextAr?: string;
  whyUsPillar1Title?: string;
  whyUsPillar1Desc?: string;
  whyUsPillar2Title?: string;
  whyUsPillar2Desc?: string;
  whyUsPillar3Title?: string;
  whyUsPillar3Desc?: string;
  whyUsPillar4Title?: string;
  whyUsPillar4Desc?: string;
  whyUsPillar5Title?: string;
  whyUsPillar5Desc?: string;

  // About Section (من نحن وقصة نجاحنا)
  aboutSectionTitleAr?: string;
  aboutStoryAr?: string;
  aboutYearsExperience?: string;
  aboutCompletedProjects?: string;
  aboutCustomerSatisfaction?: string;
  aboutWarrantyYears?: string;
  aboutMainImage?: string;
  aboutFloatingImage?: string;

  // Quote Strip Section (الشريط السريع السفلي)
  quoteStripTitleAr?: string;
  quoteStripSubtextAr?: string;
  quoteStripCtaWhatsappAr?: string;
  quoteStripCtaCallAr?: string;

  // Social Media Links
  snapchatUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  xUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  googleMapsUrl?: string;
  googleMapsEmbedUrl?: string;

  // Legacy fields
  heroSlides?: Array<{
    id: string | number;
    image: string;
    headlineAr: string;
    headlineEn?: string;
    subAr: string;
    subEn?: string;
    tagAr?: string;
    tagEn?: string;
  }>;
  factoryShowroomImage?: string;
  workshopImage?: string;
  architecturalImage?: string;
  updatedAt?: string;
}

export interface IMachine {
  id: string;
  nameAr: string;
  nameEn: string;
  badgeAr?: string;
  badgeEn?: string;
  taglineAr?: string;
  taglineEn?: string;
  image: string;
  detailImage?: string;
  isRealWorkshop?: boolean;
  featuresAr?: string[];
  featuresEn?: string[];
  specs?: {
    bladeDiameter?: string;
    mainMotor?: string;
    tableSize?: string;
    tiltingDegree?: string;
    rotatingDegree?: string;
    maxCuttingSize?: string;
    waterConsumption?: string;
    weight?: string;
    [key: string]: string | undefined;
  };
  order?: number;
}

export interface ISEOSettings {
  metaTitleAr: string;
  metaTitleEn: string;
  metaDescriptionAr: string;
  metaDescriptionEn: string;
  keywords: string[];
  canonicalUrl: string;
  robotsIndexing: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  googleSiteVerification?: string;
  googleAnalyticsId?: string;
  businessNameAr: string;
  businessNameEn: string;
  city: string;
  streetAddress: string;
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  commercialRegistration?: string;
  vatNumber?: string;
}

export interface IReview {
  id: string;
  authorName: string;
  roleAr?: string;
  roleEn?: string;
  avatarUrl?: string;
  projectImage?: string;
  rating: number; // 1 to 5
  comment: string;
  projectOrProduct?: string;
  isApproved: boolean; // Controls whether it appears on the public website
  source?: 'website' | 'google' | 'direct';
  createdAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'super_admin' | 'admin' | 'editor';
  active: boolean;
  createdAt: string;
}

