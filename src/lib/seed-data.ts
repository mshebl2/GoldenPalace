import {
  IService,
  IProject,
  IMaterial,
  IArticle,
  IQuotationRequest,
  ISiteSettings,
  IUser,
  IProductCategory,
  IProduct,
} from './models';

export const initialSiteSettings: ISiteSettings = {
  "companyNameAr": "القصر الذهبي للدهانات والديكورات الحديثة",
  "companyNameEn": "GOLDEN PALACE FOR PAINTS & MODERN DECOR",
  "heroHeadlineAr": "حلول متكاملة في الدهانات والديكورات الحديثة",
  "heroHeadlineEn": "Integrated Solutions in Modern Paints & Decor",
  "heroSubtextAr": "حلول متكاملة في أعمال الدهانات الداخلية والخارجية، الديكورات الجدارية، بديل الرخام والخشب، والأسقف الجبسية بجودة عالية وضمان معتمد بالمنطقة الشرقية (الخبر • الدمام • القطيف).",
  "heroSubtextEn": "Premium interior & exterior paints, decorative wall panels, marble & wood alternatives, and ceilings with certified quality in the Eastern Province.",
  "phone": "0561095508",
  "whatsapp": "0561095508",
  "email": "info@alqasraldhahabi.com",
  "locationAr": "المنطقة الشرقية (الدمام - الخبر - القطيف)",
  "locationEn": "Eastern Province (Dammam - Khobar - Qatif)",
  "mapUrl": "https://maps.app.goo.gl",
  "mapEmbedUrl": "",
  "unifiedNumber": "0561095508",
  "logoUrl": "/images/brand/golden-palace-logo.png",
  "logoHeight": 52,
  "heroSlides": [
    {
      "id": 1,
      "image": "/images/hero/hero-living-room.webp",
      "tagAr": "الخبر — الدمام — القطيف",
      "tagEn": "Khobar — Dammam — Qatif",
      "headlineAr": "القصر الذهبي للدهانات والديكورات الحديثة",
      "headlineEn": "Golden Palace Paints & Modern Decor",
      "subAr": "حلول متكاملة في أعمال الدهانات والديكورات للمنازل والفلل والمشاريع التجارية، بتشطيبات عصرية وجودة عالية.",
      "subEn": "Integrated painting and modern decor solutions for homes, villas, and commercial projects across the Eastern Province."
    },
    {
      "id": 2,
      "image": "/images/offers/paint-tools.webp",
      "tagAr": "دهانات جوتن الأصلية — باقات حصرية",
      "tagEn": "Original JOTUN Paints — Exclusive Packages",
      "headlineAr": "عروض حصرية وضمان معتمد\nعلى جودة التشطيب والتنفيذ",
      "headlineEn": "Certified Quality & Exclusive Paint Packages",
      "subAr": "باقات متكاملة لتشطيب الغرف تبدأ من 500 ريال للغرفة شاملة المعجون والسنفرة والأساس ووجهين تشطيب ونظافة مكان العمل.",
      "subEn": "Complete room packages starting from 500 SAR including putty, sanding, primer, and double finish coats with workspace cleaning."
    },
    {
      "id": 3,
      "image": "/images/portfolio/marble-decoration.webp",
      "tagAr": "ديكورات عصرية — بديل الرخام والخشب",
      "tagEn": "Modern Decor — Marble & Wood Alternatives",
      "headlineAr": "لمسات ديكورية راقية\nتحوّل مساحتك إلى تحفة فنية",
      "headlineEn": "Refined Decorative Touches for Your Space",
      "subAr": "أرقى تصاميم بديل الرخام، بديل الخشب، بانوهات الفوم، والأسقف الجبسية مع خطوط إضاءة ليد مخفية.",
      "subEn": "Premium marble and wood alternatives, wall moulding panels, and gypsum ceilings with recessed cove lighting."
    }
  ],
  "aboutMainImage": "/images/hero/living-room.webp",
  "aboutFloatingImage": "/images/portfolio/project-3.webp",
  "factoryShowroomImage": "/images/services/facade.webp",
  "workshopImage": "/images/services/interior.webp",
  "updatedAt": "2026-11-18T19:50:12.405Z",
  "serviceAreasAr": "الخبر — الدمام — القطيف — الظهران — سيهات",
  "topAnnouncementAr": "نخدم كافة مناطق الشرقية: الخبر - الدمام - القطيف | خصم 30% لفترة محدودة على دهانات الفلل والشقق",
  "faviconUrl": "/images/brand/emblem.png",
  "heroDiscountBadgeAr": "خصم 30% لفترة محدودة على دهانات الفلل والشقق",
  "heroGuaranteeBadgeAr": "ضمان 10 سنوات معتمد",
  "heroHeadlineLine1Ar": "أرقى أعمال الدهانات",
  "heroHeadlineLine2Ar": "والديكورات الحديثة",
  "heroLiveStatusAr": "فنيون وصباغون متاحون للمعاينة الفورية اليوم بالخبر والدمام والقطيف",
  "heroMainImage": "/images/hero/hero-living-room.webp",
  "heroCtaWhatsappTextAr": "احجز معاينة مجانية عبر واتساب",
  "heroCtaCallTextAr": "اتصل الآن: 0561095508",
  "heroProof1Title": "خامات أصلية 100%",
  "heroProof1Desc": "جوتن والجزيرة معتمدة",
  "heroProof2Title": "دقة والتزام بالمواعيد",
  "heroProof2Desc": "تشطيب فندقي نظيف",
  "heroProof3Title": "أفضل سعر بالمنطقة",
  "heroProof3Desc": "خصم 30% ومعاينة مجانية",
  "offersSectionTitleAr": "عروض وباقات دهانات جوتن وديكورات الفلل",
  "offersSectionSubtextAr": "باقات متكاملة تبدأ من 500 ريال للغرفة شاملة المعجون والأساس والسنفرة ووجهين دهان جوتن أصلي ونظافة تامة",
  "offersChecklist1Ar": "دهانات جوتن أصلية 100% مع ضمان رسمي معتمد",
  "offersChecklist2Ar": "معالجة الشقوق وسنفرة وتأسيس كامل بالمعجون الفاخر",
  "offersChecklist3Ar": "نظافة تامة للمكان وحماية المفروشات والأرضيات",
  "offersChecklist4Ar": "معاينة موقع واختيار عينات الألوان مجاناً بالمنزل",
  "whyUsSectionTitleAr": "لماذا يختارنا أصحاب المنازل والفلل بالشرقية؟",
  "whyUsSectionSubtextAr": "نلتزم بأعلى معايير الحرفية والسرعة والنظافة لتقديم تشطيب يرتقي لذوقكم الرفيع",
  "whyUsPillar1Title": "خامات جوتن والجزيرة الأصلية 100%",
  "whyUsPillar1Desc": "نعتمد دهانات أصلية ومقاومة للرطوبة وتغيرات الطقس بالشرقية مع بطاقة ضمان رسمية",
  "whyUsPillar2Title": "ضمان معتمد على جودة التشطيب",
  "whyUsPillar2Desc": "نمنح عملاءنا ضماناً موثقاً على ثبات الألوان وعدم التقشر والتشقق",
  "whyUsPillar3Title": "حماية تامة ونظافة فائقة",
  "whyUsPillar3Desc": "تغطية كاملة للأثاث والأرضيات ومفاتيح الكهرباء مع تسليم المكان نظيفاً تماماً",
  "whyUsPillar4Title": "التزام دقيق بالمواعيد والجدول",
  "whyUsPillar4Desc": "ننجز أعمال الدهانات بدقة وسرعة وفق الجدول المتفق عليه دون أي تأخير",
  "whyUsPillar5Title": "أفضل سعر وتوفير حقيقي 30%",
  "whyUsPillar5Desc": "أسعار تنافسية تبدأ من 500 ريال للغرفة، مع معاينة موقع مجانية وتحديد ألوان بدون أي رسوم",
  "aboutSectionTitleAr": "قصة القصر الذهبي للدهانات والديكورات الحديثة",
  "aboutStoryAr": "انطلقنا في المنطقة الشرقية برؤية واضحة: تقديم خدمات دهانات وديكورات تجمع بين الفخامة والاحترافية بأعلى جودة لخامات جوتن الأصلية، مع الحفاظ على أعلى معايير النظافة والسرعة والدقة. نفخر بخدمة مئات المنازل والفلل والمشاريع التجارية بالدمام والخبر والقطيف.",
  "aboutYearsExperience": "+15",
  "aboutCompletedProjects": "+1,200",
  "aboutCustomerSatisfaction": "99%",
  "aboutWarrantyYears": "10 سنوات",
  "quoteStripTitleAr": "هل ترغب في تجديد دهانات منزلك أو تشطيب فلتك بأعلى جودة؟",
  "quoteStripSubtextAr": "تواصل معنا الآن واحصل على معاينة مجانية وخصم حصري 30% في الخبر والدمام والقطيف",
  "quoteStripCtaWhatsappAr": "احصل على الخصم والمعاينة عبر واتساب",
  "quoteStripCtaCallAr": "اتصال مباشر: 0561095508",
  "snapchatUrl": "https://snapchat.com",
  "tiktokUrl": "https://tiktok.com",
  "instagramUrl": "https://instagram.com",
  "xUrl": "https://x.com",
  "youtubeUrl": "https://youtube.com"
};

export const initialSEOSettings: import('./models').ISEOSettings = {
  metaTitleAr: 'القصر الذهبي للدهانات والديكورات الحديثة | الخبر - الدمام - القطيف',
  metaTitleEn: 'Golden Palace for Modern Paints & Decors | Khobar, Dammam, Qatif',
  metaDescriptionAr: 'شركة القصر الذهبي للدهانات والديكورات بالمنطقة الشرقية (الدمام، الخبر، القطيف): عروض دهانات جوتن، ديكورات بديل الرخام والخشب، بانوهات فوم، دهان أبواب وأسقف.',
  metaDescriptionEn: 'Golden Palace Modern Paints & Decors: Luxury residential painting, JOTUN paint finishes, marble & wood alternatives, and ceiling work across Khobar, Dammam, and Qatif.',
  keywords: [
    'القصر الذهبي للدهانات والديكورات الحديثة',
    'دهانات الخبر',
    'دهانات الدمام',
    'دهانات القطيف',
    'صباغ بالدمام',
    'صباغ ممتاز بالخبر',
    'معلم دهانات وديكورات بالشرقية',
    'عروض دهانات جوتن',
    'دهان غرف نوم وصالات',
    'بديل الرخام للجدران',
    'بديل الخشب',
    'بانوهات فوم مودرن',
    'دهان ابواب خشب',
    'دهان اسقف وجبس بورد',
    'alqasraldhahabi.com'
  ],
  canonicalUrl: 'https://www.alqasraldhahabi.com',
  robotsIndexing: true,
  ogTitle: 'القصر الذهبي للدهانات والديكورات الحديثة | جدّد منزلك بأرقى التشطيبات',
  ogDescription: 'أفضل باقات دهانات جوتن وديكورات الجدران الحديثة بأسعار تنافسية وجودة متقنة بالمنطقة الشرقية.',
  ogImage: '/images/hero/hero-living-room.webp',
  googleSiteVerification: '',
};

export const initialServices: IService[] = [
  {
    id: 'srv-home-paints',
    slug: 'home-paints',
    titleAr: 'دهانات المنازل',
    titleEn: 'Home Painting',
    shortDescAr: 'تشطيب أنيق لمنزلك بألوان عصرية وخامات تدوم.',
    shortDescEn: 'Elegant home painting with modern colors and durable premium finishes.',
    fullDescAr: 'خدمات دهان متكاملة للمنازل السكنية بأحدث تقنيات الدهان وأجود خامات جوتن الأصلية في الدمام والخبر والقطيف. نعتني بكافة التفاصيل من معالجة الأسطح والشروخ بالمعجون وتطبيق الأساس المتين وحتى اللمسات النهائية التي تضفي الدفء والأناقة على منزلك.',
    fullDescEn: 'Comprehensive residential painting solutions using genuine JOTUN paints across Eastern Province. From crack repair and primer to flawless final coats.',
    icon: 'Home',
    image: '/images/services/service-homes.webp',
    coverImage: '/images/services/service-homes.webp',
    gallery: [
      '/images/services/service-homes.webp',
      '/images/services/service-interior.webp',
      '/images/hero/hero-living-room.webp'
    ],
    featuresAr: [
      'تشطيب أنيق بألوان عصرية هادئة ومتناسقة',
      'دهانات جوتن فينوماستيك قابلة للغسيل ومقاومة للبقع',
      'معالجة متقنة لعيوب الجدران والشروخ بالمعجون',
      'حماية تامة للأثاث والأرضيات أثناء العمل',
      'تسليم سريع ونظافة كاملة للمكان'
    ],
    featuresEn: [
      'Modern aesthetic finishes with harmonious tones',
      'Washable, stain-resistant JOTUN Fenomastic paints',
      'Precision putty and surface crack repairs',
      'Complete protection for furniture and flooring',
      'Fast turnaround and thorough post-job cleaning'
    ],
    order: 1,
    active: true,
  },
  {
    id: 'srv-villa-paints',
    slug: 'villa-paints',
    titleAr: 'دهانات الفلل',
    titleEn: 'Villa Painting',
    shortDescAr: 'لمسة فاخرة للفلل من الداخل والخارج باحترافية.',
    shortDescEn: 'A luxurious professional touch for villas, inside and out.',
    fullDescAr: 'تنفيذ أرقى أعمال الدهانات والديكورات للفلل والقصور السكنية في الدمام والخبر والقطيف. تشطيبات فندقية راقية تشمل الصالات الكبرى، المداخل، الدرج، والواجهات الخارجية المقاومة للعوامل الجوية.',
    fullDescEn: 'Hotel-grade luxury finishes for villas and palaces across Dammam, Khobar, and Qatif, covering majestic halls, grand staircases, and weather-defying facades.',
    icon: 'Building',
    image: '/images/services/service-villas.webp',
    coverImage: '/images/services/service-villas.webp',
    gallery: [
      '/images/services/service-villas.webp',
      '/images/services/service-exterior.webp',
      '/images/portfolio/project-1.webp'
    ],
    featuresAr: [
      'تشطيب فندقي فاخر يليق بالمساحات الكبيرة والفلل',
      'فرق عمل متخصصة ومحترفة بخبرة تتجاوز 10 سنوات',
      'تنسيق متكامل للألوان والديكورات الداخلية والخارجية',
      'تنفيذ الواجهات بدهانات بروفايل وعوازل جوتاشيلد',
      'ضمان معتمد وشامل على ثبات الألوان وعدم التقشر'
    ],
    featuresEn: [
      'Luxury hotel finish suited for large villas',
      'Specialized teams with 10+ years field experience',
      'Coordinated palettes for interior and exterior spaces',
      'Exterior facades with Jotashield profile coatings',
      'Certified warranty on adhesion and color retention'
    ],
    order: 2,
    active: true,
  },
  {
    id: 'srv-apartment-paints',
    slug: 'apartment-paints',
    titleAr: 'دهانات الشقق',
    titleEn: 'Apartment Painting',
    shortDescAr: 'دهان سريع ونظيف للشقق بمظهر راقٍ ومتناسق.',
    shortDescEn: 'Fast, immaculate apartment painting with a refined, cohesive look.',
    fullDescAr: 'حلول سريعة وعالية الدقة لتجديد دهانات الشقق والوحدات السكنية بمظهر عصري متناسق وتسليم في وقت قياسي دون إحداث فوضى، مع توفير أفضل درجات الألوان الهادئة والمريحة التي تمنح رحابة واتساعاً للمكان.',
    fullDescEn: 'Rapid and meticulous painting solutions for apartments and modern residences, delivering cohesive color harmony on tight schedules with zero mess.',
    icon: 'Building2',
    image: '/images/services/service-apartments.webp',
    coverImage: '/images/services/service-apartments.webp',
    gallery: [
      '/images/services/service-apartments.webp',
      '/images/services/service-homes.webp',
      '/images/hero/hero-living-room.webp'
    ],
    featuresAr: [
      'دهان سريع ونظيف وتسليم في غضون أيام محددة',
      'دهانات بدون رائحة نفاذة صديقة للبيئة والأسرة',
      'اختيار درجات ألوان مدروسة تعطي رحابة واتساعاً',
      'باقات أسعار منافسة تناسب الشقق بمختلف المساحات',
      'تسليم نظيف وجاهز للسكن الفوري'
    ],
    featuresEn: [
      'Quick and clean execution with on-time handover',
      'Low-odor, eco-safe paints for families',
      'Curated colors designed to expand perceived space',
      'Competitive packages for apartments of all sizes',
      'Spotless move-in ready finish'
    ],
    order: 3,
    active: true,
  },
  {
    id: 'srv-majlis-paints',
    slug: 'majlis-paints',
    titleAr: 'دهانات المجالس',
    titleEn: 'Majlis Painting & Decor',
    shortDescAr: 'ألوان تليق بمجالسك وتبرز ديكورها بذوق رفيع.',
    shortDescEn: 'Majestic colors that honor your majlis and highlight its decor with exquisite taste.',
    fullDescAr: 'تصميم وتنفيذ دهانات المجالس الرجالية وصالات الضيافة بألوان فخمة وديكورات جدارية راقية تعكس كرم الضيافة وأصالة المجلس السعودي، مع دمج الإضاءات المخفية والبانوهات الكلاسيكية وبديل الرخام.',
    fullDescEn: 'Bespoke painting and decor for Saudi guest majlis rooms, blending royal color palettes, concealed lighting, foam mouldings, and marble alternatives.',
    icon: 'Armchair',
    image: '/images/services/service-majlis.webp',
    coverImage: '/images/services/service-majlis.webp',
    gallery: [
      '/images/services/service-majlis.webp',
      '/images/portfolio/project-2.webp',
      '/images/services/service-interior.webp'
    ],
    featuresAr: [
      'ألوان ملكية وفخمة تليق بمجالس الضيافة السعودية',
      'دمج البانوهات الجدارية وبديل الرخام والخشب',
      'إبراز تفاصيل الإضاءة المخفية والأسقف الجبسية',
      'تشطيب مخملي وحريري يعكس الذوق الرفيع',
      'تناسق تام مع الأثاث والمفروشات'
    ],
    featuresEn: [
      'Royal palette honoring Saudi hospitality tradition',
      'Seamless fusion of wall trims, marble and wood slats',
      'Cove lighting and gypsum accent enhancement',
      'Velvet-smooth silk finish of elevated luxury',
      'Harmonious match with furniture and carpets'
    ],
    order: 4,
    active: true,
  },
  {
    id: 'srv-interior-paints',
    slug: 'interior-paints',
    titleAr: 'الدهانات الداخلية',
    titleEn: 'Interior Painting',
    shortDescAr: 'أسطح داخلية ناعمة بألوان هادئة ومتناسقة.',
    shortDescEn: 'Smooth interior surfaces with serene, harmonious shades.',
    fullDescAr: 'تطبيق أرقى الدهانات الداخلية للصالات، غرف النوم، والممرات بأعلى معايير النعومة والتسوية الدقيقة للأسطح، باستخدام دهانات جوتن فينوماستيك المقاومة للغسيل والبقع مع تشكيلة واسعة من الألوان العصرية.',
    fullDescEn: 'Refined interior coating for living spaces, bedrooms, and corridors with silky smoothness, utilizing washable JOTUN Fenomastic formulas.',
    icon: 'Paintbrush',
    image: '/images/services/service-interior.webp',
    coverImage: '/images/services/service-interior.webp',
    gallery: [
      '/images/services/service-interior.webp',
      '/images/services/service-homes.webp',
      '/images/portfolio/project-3.webp'
    ],
    featuresAr: [
      'أسطح حريرية ناعمة خالية تماماً من التموجات والعيوب',
      'دهانات قابلة للغسيل ومقاومة للاحتكاك والبقع',
      'درجات ألوان محايدة وعصرية مختارة بدقة',
      'تأسيس قوي بمعجون جوتن لمعالجة الرطوبة والتشققات',
      'تطبيق احترافي برول وفرش مخصصة لمنع الآثار'
    ],
    featuresEn: [
      'Silky flawless surfaces without waviness or seams',
      'Washable, scrub-resistant stain protection',
      'Curated contemporary neutral and warm palettes',
      'Moisture-proof substrate prep with quality putty',
      'Professional roller application free of brush marks'
    ],
    order: 5,
    active: true,
  },
  {
    id: 'srv-exterior-paints',
    slug: 'exterior-paints',
    titleAr: 'الدهانات الخارجية',
    titleEn: 'Exterior Painting',
    shortDescAr: 'دهانات مقاومة للعوامل الجوية وتحمي الواجهات.',
    shortDescEn: 'Weather-resistant exterior paints engineered to protect facades.',
    fullDescAr: 'دهانات الواجهات الخارجية والبروفايل وعوازل الرطوبة والحرارة التي تحمي المباني من حرارة الصيف ورطوبة الشرقية وأشعة الشمس الحارقة، مع الحفاظ على بريق اللون وثباته لسنوات طويلة.',
    fullDescEn: 'Heavy-duty exterior facade paints, textured profile coatings, and thermal/moisture barriers protecting buildings against Eastern Province climate.',
    icon: 'ShieldCheck',
    image: '/images/services/service-exterior.webp',
    coverImage: '/images/services/service-exterior.webp',
    gallery: [
      '/images/services/service-exterior.webp',
      '/images/services/service-villas.webp',
      '/images/portfolio/project-1.webp'
    ],
    featuresAr: [
      'مقاومة فائقة لحرارة ورطوبة وأملاح المنطقة الشرقية',
      'استخدام دهانات جوتاشيلد Jotashield وبروفايل عالي التحمل',
      'عزل مائي وحراري للواجهات يحمي الجدران من التسريب',
      'ثبات فائق للألوان ومقاومة لتغير درجات الشمس',
      'سقالات آمنة وفريق متخصص بارتفاعات المباني'
    ],
    featuresEn: [
      'Maximum resistance against humidity, heat and coastal salts',
      'Certified Jotun Jotashield and heavy profile systems',
      'Waterproofing and thermal shielding for exterior walls',
      'UV-stable pigments preventing color fading',
      'Certified scaffolding safety and high-elevation pros'
    ],
    order: 6,
    active: true,
  },
  {
    id: 'interior-exterior-paints',
    slug: 'interior-exterior-paints',
    titleAr: 'دهانات داخلية وخارجية',
    titleEn: 'Interior & Exterior Paints',
    shortDescAr: 'تنفيذ أرقى الدهانات السكنية والتجارية بدهانات جوتن الأصلية ومقاومة للعوامل الجوية.',
    shortDescEn: 'Premium interior and exterior painting services using certified JOTUN long-lasting coats.',
    fullDescAr: 'نقدم حلولاً متكاملة للدهانات الداخلية والخارجية للمنازل والفلل والمشاريع التجارية بالدمام والخبر والقطيف. تشمل المعالجة الدقيقة للشروخ والعيوب بالمعجون، وسنفرة الجدران، ودهان الأساس، وطبقتي تشطيب بألوان جوتن الأصلية.',
    fullDescEn: 'Comprehensive interior and exterior painting solutions. From thorough wall preparation and putty treatment to premium primers and double top-coat finishes.',
    icon: 'Paintbrush',
    image: '/images/services/interior-paint.webp',
    gallery: [
      '/images/services/interior-paint.webp',
      '/images/portfolio/navy-wall.webp',
      '/images/hero/hero-living-room.webp'
    ],
    featuresAr: [
      'استخدام دهانات جوتن JOTUN الأصلية 100%',
      'معالجة دقيقة لجميع شروخ الجدران بالمعجون المقاوم',
      'طبقات أساس وسنفرة ناعمة تضمن نعومة الملمس',
      'نظافة تامة للمكان وحماية الأثاث والأرضيات',
      'ضمان شامل على ثبات الألوان وعدم التقشر'
    ],
    featuresEn: [
      '100% Genuine JOTUN paints and certified tints',
      'Crack filling and professional wall smoothing',
      'Premium primer and dust-free sanding',
      'Complete furniture & floor masking and protection',
      'Quality warranty on color retention and adhesion'
    ],
    metaTitleAr: 'دهانات داخلية وخارجية بالخبر والدمام والقطيف | القصر الذهبي',
    metaTitleEn: 'Interior & Exterior Painting Khobar Dammam | Golden Palace',
    metaDescAr: 'أفضل معلم دهانات بالدمام والخبر والقطيف. دهانات داخلية وخارجية بجودة عالية وأسعار منافسة.',
    metaDescEn: 'Leading interior and exterior painting contractors in Khobar and Dammam.',
    order: 1,
    isActive: true,
  },
  {
    id: 'wall-decor-marble-wood',
    slug: 'wall-decor-marble-wood',
    titleAr: 'الديكورات الجدارية وبديل الرخام والخشب',
    titleEn: 'Wall Decor & Marble/Wood Alternatives',
    shortDescAr: 'تركيب ألواح بديل الرخام وبديل الخشب وبانوهات الفوم الجدارية العصرية مع إضاءات LED.',
    shortDescEn: 'Installation of marble alternative sheets, WPC fluted panels, and modern foam mouldings.',
    fullDescAr: 'نحول الجدران العادية إلى تحف معمارية عصرية من خلال تشكيلات بديل الرخام اللامع المقاوم للرطوبة، والشرائح الجدارية لبديل الخشب، وبانوهات الفوم الكلاسيكية، وتوزيع خطوط الإضاءة المخفية لتعطي طابعاً فندقياً فخماً.',
    fullDescEn: 'Turn standard walls into architectural masterpieces with high-gloss moisture-resistant marble alternatives, wood fluted panels, and classical wall mouldings.',
    icon: 'Layers',
    image: '/images/services/wall-decoration.webp',
    gallery: [
      '/images/services/wall-decoration.webp',
      '/images/portfolio/marble-decoration.webp',
      '/images/portfolio/navy-wall.webp'
    ],
    featuresAr: [
      'ألواح بديل رخام عالية اللمعان ومقاومة للماء والحرارة',
      'شرائح بديل خشب WPC بألوان البني الدافئ والرمادي العصري',
      'بانوهات فوم كورية وألمانية مقاومة للرطوبة والصدمات',
      'دمج خطوط الإضاءة المخفية LED ومفاتيح الإنارة الفاخرة'
    ],
    featuresEn: [
      'High-gloss, heat & moisture resistant marble alternative panels',
      'WPC fluted panels in natural oak, walnut, and charcoal grey',
      'High-density PU wall mouldings and wainscoting',
      'Seamless integrated LED strip channels'
    ],
    metaTitleAr: 'تركيب بديل الرخام وبديل الخشب بالدمام والخبر | القصر الذهبي',
    metaTitleEn: 'Marble & Wood Alternatives Installation Eastern Province',
    metaDescAr: 'أحدث ديكورات بديل الرخام وبديل الخشب والفوم الجداري بالمنطقة الشرقية.',
    metaDescEn: 'Modern wall panelling, marble sheets, and fluted wood decor in Khobar & Dammam.',
    order: 2,
    isActive: true,
  },
  {
    id: 'ceiling-finishes',
    slug: 'ceiling-finishes',
    titleAr: 'دهانات وتشطيبات الأسقف',
    titleEn: 'Ceiling Paints & Gypsum Lighting',
    shortDescAr: 'تشطيب ودهان الأسقف الجبسية، إضاءات الكوف المخفية، ومعالجة فواصل الجبسون بورد.',
    shortDescEn: 'Gypsum board ceiling painting, joint taping, and cove lighting integration.',
    fullDescAr: 'تنفيذ احترافي لدهانات الأسقف المستعارة والجبس بورد، معالجة الفواصل بشريط الفايبر والمعجون الخاص، وضمان استواء السطح التام بدون أي تموجات، مع دهان أبيض مطفي فائق البياض عاكس للضوء.',
    fullDescEn: 'Professional ceiling finishes for gypsum boards, fiber joint treatment, ultra-flat ceiling whites, and ambient cove lighting preparation.',
    icon: 'LampCeiling',
    image: '/images/services/ceiling-design.webp',
    gallery: [
      '/images/services/ceiling-design.webp',
      '/images/portfolio/luxury-ceiling.webp'
    ],
    featuresAr: [
      'معالجة فواصل الجبس بورد بشريط الفايبر لمنع التشققات نهائياً',
      'دهانات أسقف مطفية متجانسة خالية من اللمعان والتموجات',
      'تجهيز وتوزيع مسارات الإضاءة المخفية والسبوت لايت'
    ],
    featuresEn: [
      'Crack-prevention fiber tape and specialised gypsum compound',
      'Flawless dead-flat ceiling paint with zero glare or roller marks',
      'Preparation for magnetic track rails and recessed downlights'
    ],
    metaTitleAr: 'دهان أسقف وجبس بورد بالدمام والخبر | القصر الذهبي',
    metaTitleEn: 'Ceiling Painting & Gypsum Board Finishing Khobar Dammam',
    metaDescAr: 'تشطيب ودهانات الأسقف الجبسية بأحدث التقنيات وأفضل الخامات بالشرقية.',
    metaDescEn: 'High-end ceiling painting and gypsum board finishing in Eastern Province.',
    order: 3,
    isActive: true,
  },
  {
    id: 'doors-refinishing',
    slug: 'doors-refinishing',
    titleAr: 'دهان وتجديد الأبواب',
    titleEn: 'Door Painting & Lacquer Refinishing',
    shortDescAr: 'رش وتجديد أبواب الخشب والحديد بدهانات الدوكو واللكر المقاومة للخدش.',
    shortDescEn: 'Spray painting and lacquer refinishing for interior wooden and exterior metal doors.',
    fullDescAr: 'تجديد كامل لأبواب المنازل والفلل الخشبية والحديدية، يشمل الصنفرة وإزالة الطبقات القديمة، معالجة الخدوش، ورش أحدث دهانات اللكر المقاومة للحرارة والرطوبة بألوان ناصعة وثابتة.',
    fullDescEn: 'Comprehensive door restoration: old paint stripping, fine sanding, spray-applied scratch-resistant polyurethane lacquer in satin or semi-gloss.',
    icon: 'DoorClosed',
    image: '/images/services/painted-door.webp',
    gallery: [
      '/images/services/painted-door.webp',
      '/images/offers/door.webp'
    ],
    featuresAr: [
      'رش بالمسدس الهوائي Airless بدون أي أثر لفرشاة أو رولة',
      'مقاومة عالية للخدوش وسهولة التنظيف بالماء',
      'إمكانية مطابقة أي كود لون تفضله'
    ],
    featuresEn: [
      'Airless spray application for ultra-smooth factory finish',
      'Scratch-resistant washable polyurethane formula',
      'Custom color matching to any Ralph Lauren or Jotun code'
    ],
    metaTitleAr: 'دهان وتجديد أبواب خشب بالدمام والخبر | القصر الذهبي',
    metaTitleEn: 'Door Painting & Wood Refinishing Khobar Dammam',
    metaDescAr: 'رش وتجديد أبواب الفلل والمنازل بدهانات اللكر والدوكو بالمنطقة الشرقية.',
    metaDescEn: 'Professional door lacquer spray painting in Khobar, Dammam, and Qatif.',
    order: 4,
    isActive: true,
  },
  {
    id: 'facades-finishes',
    slug: 'facades-finishes',
    titleAr: 'تشطيب واجهات الفلل والمباني',
    titleEn: 'Modern Facades & Profile Finishes',
    shortDescAr: 'تنفيذ دهانات البروفايل، الجرافيت، والدهانات الخارجية المقاومة للرطوبة والحرارة.',
    shortDescEn: 'Exterior profile paints, weather-proof graphite textures, and architectural facade finishes.',
    fullDescAr: 'تشطيب وتجديد واجهات الفلل والعمائر السكنية والمقرات التجارية بأحدث أنواع البروفايل الخارجي ودهانات جوتن المقاومة لأشعة الشمس القوية وعوامل الرطوبة العالية في المنطقة الشرقية.',
    fullDescEn: 'Facade renovation and modern textured profile painting designed specifically to withstand harsh Gulf climate and coastal humidity.',
    icon: 'Building2',
    image: '/images/services/villa-facade.webp',
    gallery: [
      '/images/services/villa-facade.webp',
      '/images/portfolio/villa.webp'
    ],
    featuresAr: [
      'دهانات بروفايل وجرافيت معتمدة ومقاومة لملوحة الشرقية',
      'عزل مائي متكامل يحمي الجدران الخارجية من التسربات',
      'ضمان رسمي لعدة سنوات على ثبات الألوان ضد الشمس'
    ],
    featuresEn: [
      'Certified profile paints resistant to coastal salinity',
      'Integrated waterproofing primers preventing dampness',
      'Multi-year written warranty on UV protection and adherence'
    ],
    metaTitleAr: 'دهانات واجهات وبروفايل خارجي بالخبر والدمام | القصر الذهبي',
    metaTitleEn: 'Exterior Facade Painting & Profile Khobar Dammam',
    metaDescAr: 'تشطيب واجهات الفلل بدهانات البروفايل والجرافيت المقاومة للرطوبة بالشرقية.',
    metaDescEn: 'Modern villa facade finishes and textured exterior profile painting in Eastern Province.',
    order: 5,
    isActive: true,
  },
];

export const initialProductCategories: IProductCategory[] = [
  {
    id: 'offers-packages',
    slug: 'offers-packages',
    nameAr: 'باقات وعروض الغرف',
    nameEn: 'Room Packages & Offers',
    descAr: 'عروض الدهانات الحصرية للغرف والشقق السكنية شاملة المواد واليد العاملة.',
    descEn: 'Exclusive turnkey room and apartment painting packages including materials and labor.',
    image: '/images/offers/three-rooms.webp',
    order: 1,
    isActive: true,
  },
  {
    id: 'single-items',
    slug: 'single-items',
    nameAr: 'الأسقف والأبواب',
    nameEn: 'Ceilings & Doors',
    descAr: 'خدمات دهان وتشطيب الأبواب والأسقف بالقطعة والمتر بأسعار خاصة.',
    descEn: 'Individual ceiling and door refinishing services at competitive rates.',
    image: '/images/offers/ceiling.webp',
    order: 2,
    isActive: true,
  },
  {
    id: 'wall-decorations',
    slug: 'wall-decorations',
    nameAr: 'الديكورات وبديل الرخام',
    nameEn: 'Wall Decor & Panels',
    descAr: 'تشكيلات بديل الرخام وبديل الخشب وبانوهات الفوم الجدارية العصرية.',
    descEn: 'Marble sheets, WPC fluted panels, and modern polyurethane mouldings.',
    image: '/images/portfolio/marble-decoration.webp',
    order: 3,
    isActive: true,
  },
];

export const initialProducts: IProduct[] = [
  {
    id: 'offer-3-rooms',
    slug: 'offer-3-rooms',
    titleAr: 'عرض دهان 3 غرف شامل المواد والتنفيذ',
    titleEn: '3 Rooms Painting Package (Jotun Materials Included)',
    categoryId: 'offers-packages',
    categoryNameAr: 'باقات وعروض الغرف',
    shortDescAr: 'دهان كامل لـ 3 غرف يشمل المعجون، الصنفرة، الأساس، ووجهين تشطيب جوتن.',
    shortDescEn: 'Complete 3-room painting package including wall treatment, primer, and double JOTUN finish coats.',
    price: 1000,
    priceOld: 1300,
    unit: 'باقة متكاملة',
    badge: 'الأكثر طلباً',
    images: [
      '/images/offers/three-rooms.webp',
      '/images/hero/hero-living-room.webp',
      '/images/portfolio/navy-wall.webp'
    ],
    featuresAr: [
      'معالجة أركان الجدران والشروخ بالمعجون المقاوم',
      'وجه سنفرة ناعم للجدران بالكامل',
      'وجه أساس مائي لضمان قوة التماسك',
      'وجهين تشطيب بدهانات جوتن الأصلية',
      'نظافة تامة لمكان العمل وتسليم فوري'
    ],
    featuresEn: [
      'Wall crack compound treatment',
      'Smooth surface sanding',
      'Water-based primer application',
      'Two coats of genuine JOTUN finish',
      'Complete post-work cleanup and tidy handover'
    ],
    isFeatured: true,
    inStock: true,
    order: 1,
  },
  {
    id: 'offer-2-rooms',
    slug: 'offer-2-rooms',
    titleAr: 'عرض دهان غرفتين شامل المواد والتنفيذ',
    titleEn: '2 Rooms Painting Package',
    categoryId: 'offers-packages',
    categoryNameAr: 'باقات وعروض الغرف',
    shortDescAr: 'دهان متكامل لغرفتين بأحدث ألوان جوتن العصرية مع المعجون والأساس.',
    shortDescEn: 'Turnkey 2-room painting package with full putty prep and original JOTUN paint.',
    price: 700,
    priceOld: 1000,
    unit: 'باقة متكاملة',
    badge: 'عرض خاص',
    images: [
      '/images/offers/two-rooms.webp',
      '/images/portfolio/navy-wall.webp'
    ],
    featuresAr: [
      'معالجة أركان الجدران بالمعجون',
      'وجه سنفرة ناعم',
      'وجه أساس',
      'وجهين تشطيب جوتن',
      'نظافة مكان العمل'
    ],
    featuresEn: [
      'Putty prep and crack repair',
      'Surface sanding',
      'Primer coat',
      '2 JOTUN top coats',
      'Worksite cleanup'
    ],
    isFeatured: true,
    inStock: true,
    order: 2,
  },
  {
    id: 'offer-1-room',
    slug: 'offer-1-room',
    titleAr: 'عرض دهان الغرفة الواحدة',
    titleEn: 'Single Room Painting Package',
    categoryId: 'offers-packages',
    categoryNameAr: 'باقات وعروض الغرف',
    shortDescAr: 'دهان غرفة واحدة متكاملة بمعجون جوتن وطبقتي تشطيب بأعلى معايير الإتقان.',
    shortDescEn: 'Single room package with complete putty smoothing and JOTUN top coats.',
    price: 500,
    priceOld: 700,
    unit: 'باقة للغرفة',
    badge: 'سعر مميز',
    images: [
      '/images/offers/one-room.webp',
      '/images/hero/hero-living-room.webp'
    ],
    featuresAr: [
      'معالجة أركان الجدران بالمعجون',
      'وجه سنفرة ناعم',
      'وجه أساس',
      'وجهين تشطيب جوتن',
      'نظافة مكان العمل'
    ],
    featuresEn: [
      'Putty prep and smoothing',
      'Fine sanding',
      'Primer coat',
      '2 JOTUN top coats',
      'Worksite cleanup'
    ],
    isFeatured: true,
    inStock: true,
    order: 3,
  },
  {
    id: 'offer-ceiling',
    slug: 'offer-ceiling',
    titleAr: 'دهان وتشطيب السقف للغرفة',
    titleEn: 'Ceiling Painting (Per Room)',
    categoryId: 'single-items',
    categoryNameAr: 'الأسقف والأبواب',
    shortDescAr: 'تشطيب ودهان أبيض مطفي للسقف مع معالجة الشروخ والجبس بورد.',
    shortDescEn: 'Dead-flat ceiling painting including joint prep per room.',
    price: 100,
    unit: 'للسقف',
    badge: 'عرض حصري',
    images: [
      '/images/offers/ceiling.webp',
      '/images/portfolio/luxury-ceiling.webp'
    ],
    featuresAr: [
      'دهان أبيض مطفي عاكس للنور',
      'معالجة فواصل الجبسون بورد',
      'نظافة المكان بعد الانتهاء'
    ],
    featuresEn: [
      'Dead flat optical white finish',
      'Joint compound repair',
      'Spotless cleanup'
    ],
    isFeatured: true,
    inStock: true,
    order: 4,
  },
  {
    id: 'offer-door',
    slug: 'offer-door',
    titleAr: 'دهان ورش الباب الخشبي',
    titleEn: 'Door Spray Refinishing (Per Door)',
    categoryId: 'single-items',
    categoryNameAr: 'الأسقف والأبواب',
    shortDescAr: 'رش وتجديد الباب الداخلي بأجود دهانات اللكر المقاومة للخدش.',
    shortDescEn: 'Lacquer spray refinishing for interior doors.',
    price: 90,
    unit: 'للباب',
    badge: 'توفير',
    images: [
      '/images/offers/door.webp',
      '/images/services/painted-door.webp'
    ],
    featuresAr: [
      'رش ناعم ومقاوم للخدوش',
      'معالجة النقر والخدوش القديمة',
      'تشطيب مطفي أو نصف لمعة حسب اختيارك'
    ],
    featuresEn: [
      'Smooth scratch-resistant spray',
      'Dent and scratch restoration',
      'Satin or semi-gloss finish'
    ],
    isFeatured: true,
    inStock: true,
    order: 5,
  },
  {
    id: 'product-marble-alternative',
    slug: 'product-marble-alternative',
    titleAr: 'تركيب ألواح بديل الرخام الفاخرة للجدران',
    titleEn: 'Luxury Marble Alternative Wall Panelling',
    categoryId: 'wall-decorations',
    categoryNameAr: 'الديكورات وبديل الرخام',
    shortDescAr: 'ألواح PVC رخامية عالية اللمعان مع شرائح ستانلس ستيل ذهبية وإضاءة مخفية.',
    shortDescEn: 'High-gloss PVC marble sheets with golden stainless steel profiles and indirect LED.',
    price: 150,
    unit: 'للمتر المربع',
    badge: 'ديكور عصري',
    images: [
      '/images/portfolio/marble-decoration.webp',
      '/images/services/wall-decoration.webp'
    ],
    featuresAr: [
      'مقاوم للماء والرطوبة والحرارة بنسبة 100%',
      'عروق رخامية كلكتا وإمبرادور طبيعية المظهر',
      'تركيب سريع ونظيف بدون تكسير أو فوضى'
    ],
    featuresEn: [
      '100% waterproof and moisture resistant',
      'Authentic Calacatta and Emperador veining',
      'Clean, dust-free installation without demolitions'
    ],
    isFeatured: true,
    inStock: true,
    order: 6,
  },
];

export const initialProjects: IProject[] = [
  {
    id: 'project-khobar-villa',
    slug: 'project-khobar-villa',
    titleAr: 'تشطيب فيلا مودرن فاخرة - حي الحزام الذهبي، الخبر',
    titleEn: 'Luxury Modern Villa Finishing - Al Hizam Al Thahabi, Khobar',
    category: 'دهانات داخلية وديكورات',
    location: 'الخبر - حي الحزام الذهبي',
    year: '2026',
    client: 'فيلا خاصة',
    image: '/images/hero/hero-living-room.webp',
    gallery: [
      '/images/hero/hero-living-room.webp',
      '/images/portfolio/navy-wall.webp',
      '/images/portfolio/luxury-ceiling.webp'
    ],
    shortDescAr: 'تنفيذ دهانات داخلية كاملة بألوان جوتن فينوماستيك الهادئة، مع بانوهات جدارية كحلية وخطوط ذهبية عصرية.',
    shortDescEn: 'Complete interior painting with neutral JOTUN Fenomastic shades, complemented by deep navy wall mouldings and gold accents.',
    fullDescAr: 'تم تنفيذ المشروع وفق أعلى مواصفات الجودة السكنية: معالجة شاملة لكافة الجدران، دهان طبقات الأساس المقاومة، وتنفيذ ألوان متناسقة تجمع بين الأوف وايت والرمادي الدافئ مع جدارية كحلية مميزة في الصالة الرئيسية.',
    fullDescEn: 'Executed to the highest residential standards: comprehensive wall smoothing, moisture-resistant primers, and a refined color palette.',
    featuresAr: [
      'دهانات جوتن فينوماستيك ناعمة الملمس قابلة للغسيل',
      'بانوهات فوم كورية كلاسيكية متناسقة مع إضاءة الأبليكات',
      'تشطيب أسقف بألوان مطفية ناصعة مع إضاءة ليد مخفية'
    ],
    featuresEn: [
      'Washable JOTUN Fenomastic matte paints',
      'High-precision wall wainscoting mouldings',
      'Flawless flat ceiling finish with integrated LED'
    ],
    isFeatured: true,
    order: 1,
  },
  {
    id: 'project-dammam-duplex',
    slug: 'project-dammam-duplex',
    titleAr: 'دهانات وديكورات شقة دوبلكس - حي الشاطئ، الدمام',
    titleEn: 'Duplex Painting & Wall Decor - Al Shati, Dammam',
    category: 'ديكورات وبديل رخام',
    location: 'الدمام - حي الشاطئ',
    year: '2026',
    client: 'سكن عائلي',
    image: '/images/portfolio/marble-decoration.webp',
    gallery: [
      '/images/portfolio/marble-decoration.webp',
      '/images/services/wall-decoration.webp'
    ],
    shortDescAr: 'تركيب بديل الرخام وبديل الخشب لشاشات التلفزيون والمجالس مع دهان جدران ناعم.',
    shortDescEn: 'Installation of marble and wood alternative TV feature walls with silky wall painting.',
    fullDescAr: 'إعادة تصميم وتشطيب الصالات الرئيسية باستخدام ألواح بديل الرخام الرمادي مع شرائح الخشب الداكن والإضاءة المخفية، بالإضافة إلى دهان الغرف بأحدث ألوان البيج الهادئ.',
    fullDescEn: 'Redesign of primary living areas with grey marble sheets, dark fluted wood profiles, and soothing warm neutral room paints.',
    featuresAr: [
      'جدارية تلفزيون فخمة ببديل الرخام والشرائح الخشبية',
      'دهان مقاوم للبقع في الممرات والمجالس',
      'تسليم نظيف ومنتظم خلال 4 أيام فقط'
    ],
    featuresEn: [
      'Bespoke TV feature wall with marble and timber accents',
      'Stain-resistant paints in hallways and majlis areas',
      'Delivered in just 4 days with spotless cleanup'
    ],
    isFeatured: true,
    order: 2,
  },
  {
    id: 'project-qatif-villa',
    slug: 'project-qatif-villa',
    titleAr: 'تجديد دهانات فيلا سكنية - حي الشاطئ، القطيف',
    titleEn: 'Residential Villa Repainting - Al Shati, Qatif',
    category: 'تجديد دهانات وأبواب',
    location: 'القطيف - حي الشاطئ',
    year: '2025',
    client: 'فيلا سكنية',
    image: '/images/portfolio/luxury-ceiling.webp',
    gallery: [
      '/images/portfolio/luxury-ceiling.webp',
      '/images/services/ceiling-design.webp'
    ],
    shortDescAr: 'معالجة رطوبة الجدران، تجديد دهانات الأسقف، ورش أبواب الفيلا الداخلية باللكر الأبيض.',
    shortDescEn: 'Moisture treatment, ceiling repainting, and door lacquer spray refinishing.',
    fullDescAr: 'مشروع تجديد شامل شمل كشط الدهانات القديمة المتأثرة بالرطوبة، تطبيق عوازل مائية أساسية، إعادة المعجون والسنفرة، ودهان طبقتين من جوتن المقاوم للرطوبة، ورش 14 باباً داخلياً.',
    fullDescEn: 'Complete refurbishment: scraping aged paint, anti-damp primer treatment, resurfacing, and high-durability JOTUN top coats plus 14 sprayed doors.',
    featuresAr: [
      'عزل مائي متخصص لجدران وسراديب الفيلا',
      'رش 14 باباً باللكر الأبيض المطفي عالي التحمل',
      'ضمان عدم رجوع الرطوبة أو تقشر الدهان'
    ],
    featuresEn: [
      'Specialised anti-damp wall sealers',
      '14 interior doors spray-refinished in crisp satin white',
      'Anti-peel and moisture resistance guarantee'
    ],
    isFeatured: true,
    order: 3,
  },
  {
    id: 'project-khobar-facade',
    slug: 'project-khobar-facade',
    titleAr: 'تشطيب واجهة فيلا معمارية - حي الراكة، الخبر',
    titleEn: 'Architectural Villa Facade - Rakah, Khobar',
    category: 'دهانات خارجية وبروفايل',
    location: 'الخبر - حي الراكة',
    year: '2025',
    client: 'فيلا معمارية',
    image: '/images/portfolio/villa.webp',
    gallery: [
      '/images/portfolio/villa.webp',
      '/images/services/villa-facade.webp'
    ],
    shortDescAr: 'تشطيب خارجي متكامل بدهانات البروفايل الإيطالي المقاوم للعوامل الجوية والرطوبة الساحلية.',
    shortDescEn: 'Turnkey exterior finish using weather-proof profile coatings tailored for coastal humidity.',
    fullDescAr: 'تنفيذ البروفايل الخارجي وتدرجات الألوان البيضاء والرمادية الفاتحة على واجهات الفيلا، مع عزل كامل ضد الملوحة والشمس الحارقة.',
    fullDescEn: 'Exterior profile application with UV-reflective coats that protect against high solar heat and sea breeze salinity.',
    featuresAr: [
      'بروفايل خارجي نخب أول مقاوم لأشعة الشمس القوية',
      'عزل مائي حراري للجدران الخارجية',
      'تناغم معماري فخم مع الإضاءات الخارجية'
    ],
    featuresEn: [
      'Premium UV-resistant exterior profile coating',
      'Hydrophobic and thermal exterior protection',
      'Harmonious integration with architectural spotlights'
    ],
    isFeatured: true,
    order: 4,
  },
];

export const initialMaterials: IMaterial[] = [
  {
    id: 'jotun-fenomastic',
    slug: 'jotun-fenomastic',
    nameAr: 'دهانات جوتن فينوماستيك الحريرية',
    nameEn: 'Jotun Fenomastic Silk & Matte',
    category: 'دهانات داخلية',
    origin: 'النرويج / مصانع جوتن السعودية',
    color: 'أوف وايت، رمادي دافئ، بيج هادئ',
    finish: 'حريري / مطفي ناعم',
    shortDescAr: 'الدهان الأكثر تميزاً للجدران الداخلية، ناعم كالحرير، قابل للغسيل المتكرر، وثابت اللون لسنوات طويلة.',
    shortDescEn: 'The benchmark of interior luxury paints: silky smooth, highly washable, and exceptional color fidelity.',
    image: '/images/offers/jotun-paint-can.webp',
    gallery: [
      '/images/offers/jotun-paint-can.webp',
      '/images/hero/hero-living-room.webp'
    ],
    isFeatured: true,
    order: 1,
  },
  {
    id: 'marble-sheets-calacatta',
    slug: 'marble-sheets-calacatta',
    nameAr: 'ألواح بديل الرخام عروق كلكتا الذهبية',
    nameEn: 'Calacatta Gold Marble Alternative Sheets',
    category: 'ديكورات جدارية',
    origin: 'نخب أول مقاوم للرطوبة',
    color: 'أبيض بعروق ذهبية ورمادية',
    finish: 'شديد اللمعان UV Coated',
    shortDescAr: 'بديل الرخام الطبيعي بسماكة متينة ولمعان كريستالي، يعطي فخامة الرخام الطبيعي بخفة وسهولة تركيب وتكلفة أقل.',
    shortDescEn: 'High-gloss UV-coated marble alternative sheets replicating Italian Calacatta Gold with waterproof durability.',
    image: '/images/portfolio/marble-decoration.webp',
    gallery: [
      '/images/portfolio/marble-decoration.webp'
    ],
    isFeatured: true,
    order: 2,
  },
  {
    id: 'wpc-wood-panels',
    slug: 'wpc-wood-panels',
    nameAr: 'شرائح بديل الخشب WPC المضلعة',
    nameEn: 'Fluted WPC Wood Alternative Panels',
    category: 'ديكورات جدارية',
    origin: 'مقاوم للماء والنمل الأبيض',
    color: 'خشب الجوز، البلوط، الرمادي الفحمي',
    finish: 'ملمس خشبي طبيعي 3D',
    shortDescAr: 'شرائح خشبية مضلعة عصرية تمنح الصالات وغرف النوم دفئاً وفخامة معمارية لا تتأثر بالرطوبة أو الحشرات.',
    shortDescEn: 'Fluted composite wood panels delivering warmth and textural elegance without swelling or termite concerns.',
    image: '/images/services/wall-decoration.webp',
    gallery: [
      '/images/services/wall-decoration.webp'
    ],
    isFeatured: true,
    order: 3,
  },
];

export const initialArticles: IArticle[] = [
  {
    id: 'paint-trends-2026',
    slug: 'paint-trends-2026',
    titleAr: 'أحدث صيحات ألوان الدهانات الداخلية لعام 2026 بالمنطقة الشرقية',
    titleEn: '2026 Interior Paint Color Trends for Eastern Province Homes',
    excerptAr: 'دليل شامل لاختيار درجات الأوف وايت، البيج الدافئ، والكحلي الملكي بما يتناسب مع الإضاءة الطبيعية لفلل الخبر والدمام.',
    excerptEn: 'Complete guide to warm neutrals, greige, and royal navy tones for Saudi residential architecture.',
    contentAr: 'تتجه التصاميم العصرية الحديثة في المنطقة الشرقية نحو الألوان الهادئة التي تعكس الضوء الطبيعي وتمنح المساحات رحابة وأناقة. يعتبر لون الأوف وايت الدافئ (Warm Off-White) والبيج الرمادي (Greige) الخيار الأول في غرف المعيشة وصالات الاستقبال، في حين تبرز الجداريات الكحلية والزيتية كلمسات مميزة تمنح الغرفة عمقاً وفخامة.',
    contentEn: 'Modern architectural trends in the Eastern Province lean towards subtle warm neutrals that maximize natural light and create spacious tranquility.',
    image: '/images/hero/hero-living-room.webp',
    category: 'نصائح وأفكار',
    author: 'فريق القصر الذهبي',
    date: '2026-03-01',
    isPublished: true,
    order: 1,
  },
  {
    id: 'marble-vs-wood-decor',
    slug: 'marble-vs-wood-decor',
    titleAr: 'كيف تختار بين بديل الرخام وبديل الخشب لجدران منزلك؟',
    titleEn: 'Choosing Between Marble and Wood Alternative Wall Panelling',
    excerptAr: 'مقارنة عملية بين مزايا ألواح بديل الرخام اللامعة وشرائح بديل الخشب الدافئة، وكيفية الدمج بينهما باحترافية.',
    excerptEn: 'Practical comparison of high-gloss marble alternatives versus warm fluted wood panels and how to combine both.',
    contentAr: 'يعتبر الدمج بين بديل الرخام وبديل الخشب من أرقى أساليب الديكور الحديثة حالياً، حيث توفر ألواح بديل الرخام خلفية فخمة عاكسة للضوء بينما تضفي شرائح بديل الخشب عمقاً ولمسة دفء طبيعية تكسر برودة الجدران.',
    contentEn: 'Combining marble sheets with fluted wood panelling delivers the ultimate balance of contemporary luxury and cozy warmth.',
    image: '/images/portfolio/marble-decoration.webp',
    category: 'ديكورات وتصاميم',
    author: 'فريق القصر الذهبي',
    date: '2026-02-20',
    isPublished: true,
    order: 2,
  },
  {
    id: 'ceiling-lighting-tips',
    slug: 'ceiling-lighting-tips',
    titleAr: 'أسرار دهان الأسقف وتنسيق الإضاءة المخفية لغرف أكثر ارتفاعاً',
    titleEn: 'Ceiling Painting Secrets & Cove Lighting for Visual Height',
    excerptAr: 'نصائح المعلمين المحترفين في اختيار نوع دهان السقف المطفي وطريقة توزيع الإضاءة المخفية لتبدو الغرف أكثر اتساعاً.',
    excerptEn: 'Professional tips on selecting dead-flat ceiling finishes and lighting coves to visually heighten living spaces.',
    contentAr: 'للحصول على سقف مستوٍ ومثالي، يجب دائماً استخدام دهانات مطفية تماماً بدون أي لمعان لمنع ظهور تموجات الجبس بورد أو خطوط الرولة تحت الإضاءة المباشرة.',
    contentEn: 'A dead-flat ceiling paint is essential to diffuse light evenly and prevent glare or surface imperfections from showing.',
    image: '/images/portfolio/luxury-ceiling.webp',
    category: 'إرشادات تشطيب',
    author: 'فريق القصر الذهبي',
    date: '2026-02-10',
    isPublished: true,
    order: 3,
  },
];

export const initialUsers: IUser[] = [
  {
    id: 'user-super-admin',
    email: 'admin@alqasraldhahabi.com',
    passwordHash: '$2b$10$UoWpTz47R07zYqO8VjF4.OTk3R86L5e7MvE.mIeD9B8dGf9B0qKTC', // bcrypt hash for 'admin123456'
    name: 'المشرف العام - القصر الذهبي',
    role: 'super_admin',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

export const initialCategories = initialProductCategories;

export const initialQuotations: IQuotationRequest[] = [];

export const initialReviews = [
  {
    id: 'rev-1',
    customerName: 'أبو عبدالله',
    location: 'الدمام',
    rating: 5,
    commentAr: 'شغل نظيف ودقة في التنفيذ وتعامل راقي.. أنصح بالتعامل معهم.',
    commentEn: 'Clean work, precise execution, and professional conduct.',
    createdAt: '2026-02-15T00:00:00.000Z',
    isApproved: true,
  },
  {
    id: 'rev-2',
    customerName: 'أم فهد',
    location: 'الخبر',
    rating: 5,
    commentAr: 'جودة الدهانات ممتازة والألوان مطابقة للتصميم واحترافية عالية بالموعد.',
    commentEn: 'Excellent paint quality, exact color match, and punctual delivery.',
    createdAt: '2026-02-20T00:00:00.000Z',
    isApproved: true,
  },
  {
    id: 'rev-3',
    customerName: 'أبو خالد',
    location: 'القطيف',
    rating: 5,
    commentAr: 'التزام بالمواعيد ونتيجة رائعة في كل التفاصيل، صبغ جوتن نظيف وسريع.',
    commentEn: 'Great commitment to deadlines and spotless JOTUN painting result.',
    createdAt: '2026-03-01T00:00:00.000Z',
    isApproved: true,
  },
];

