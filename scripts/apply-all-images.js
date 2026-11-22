const fs = require('fs');
const mongoose = require('mongoose');

// Read current db.json
const dbPath = 'data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('1. Updating Products in db.json...');
// Update existing products with real works images
db.products = db.products.map(p => {
  if (p.slug === 'three-rooms-offer' || p.id === 'prod-1') {
    return {
      ...p,
      image: '/images/portfolio/real-modern-room-parquet.jpg',
      coverImage: '/images/portfolio/real-modern-room-parquet.jpg',
      gallery: [
        '/images/portfolio/real-modern-room-parquet.jpg',
        '/images/brand/official-golden-palace-flyer.jpg',
        '/images/portfolio/real-breeze-limestone-foam.jpg',
        '/images/portfolio/real-classic-white-corridor.jpg'
      ]
    };
  }
  if (p.slug === 'two-rooms-offer' || p.id === 'prod-2') {
    return {
      ...p,
      image: '/images/portfolio/real-breeze-limestone-foam.jpg',
      coverImage: '/images/portfolio/real-breeze-limestone-foam.jpg',
      gallery: [
        '/images/portfolio/real-breeze-limestone-foam.jpg',
        '/images/catalog/real-color-comparison-swatch.jpg',
        '/images/brand/official-golden-palace-flyer.jpg'
      ]
    };
  }
  if (p.slug === 'one-room-offer' || p.id === 'prod-3') {
    return {
      ...p,
      image: '/images/portfolio/real-breeze-vanilla-latte.jpg',
      coverImage: '/images/portfolio/real-breeze-vanilla-latte.jpg',
      gallery: [
        '/images/portfolio/real-breeze-vanilla-latte.jpg',
        '/images/catalog/jotun-interior-swatches.jpg',
        '/images/brand/official-golden-palace-flyer.jpg'
      ]
    };
  }
  if (p.slug === 'ceiling-offer' || p.id === 'prod-4') {
    return {
      ...p,
      image: '/images/portfolio/real-hallway-wood-doors.jpg',
      coverImage: '/images/portfolio/real-hallway-wood-doors.jpg',
      gallery: [
        '/images/portfolio/real-hallway-wood-doors.jpg',
        '/images/portfolio/real-modern-room-parquet.jpg',
        '/images/brand/official-golden-palace-flyer.jpg'
      ]
    };
  }
  if (p.slug === 'door-offer' || p.id === 'prod-5') {
    return {
      ...p,
      image: '/images/portfolio/real-greige-painted-door.jpg',
      coverImage: '/images/portfolio/real-greige-painted-door.jpg',
      gallery: [
        '/images/portfolio/real-greige-painted-door.jpg',
        '/images/portfolio/real-hallway-wood-doors.jpg',
        '/images/brand/official-golden-palace-flyer.jpg'
      ]
    };
  }
  if (p.slug === 'foam-moulding-decor' || p.id === 'prod-7') {
    return {
      ...p,
      image: '/images/portfolio/real-luxury-foam-moldings.jpg',
      coverImage: '/images/portfolio/real-luxury-foam-moldings.jpg',
      gallery: [
        '/images/portfolio/real-luxury-foam-moldings.jpg',
        '/images/portfolio/real-breeze-limestone-foam.jpg',
        '/images/portfolio/real-breeze-vanilla-latte.jpg'
      ]
    };
  }
  return p;
});

// Add new dedicated catalog products so all 13 images are discoverable in products
const newProducts = [
  {
    id: 'prod-jotun-catalog-2027',
    slug: 'jotun-colors-guide-2027',
    titleAr: 'دليل ألوان جوتن الأكثر طلباً لعام 2026-2027',
    titleEn: 'Jotun Most Popular Colors Guide 2026-2027',
    categoryId: 'cat-3',
    categorySlug: 'wall-decor',
    categoryAr: 'الديكورات والبدائل العصرية',
    categoryEn: 'Wall Decor',
    price: 0,
    oldPrice: null,
    showPrice: false,
    priceUnitAr: 'معاينة مجانية',
    priceUnitEn: 'Free Survey',
    image: '/images/catalog/jotun-popular-colors-2027.jpg',
    coverImage: '/images/catalog/jotun-popular-colors-2027.jpg',
    gallery: [
      '/images/catalog/jotun-popular-colors-2027.jpg',
      '/images/catalog/jotun-interior-swatches.jpg',
      '/images/catalog/real-color-comparison-swatch.jpg'
    ],
    descriptionAr: 'دليل الألوان الأكثر طلباً في دهانات المنازل والفلل بالمنطقة الشرقية من الأبيض الهادئ والرمادي الفاتح إلى الجريج (لايمستون، أيفوري، تايملس، ساند، فانيلا لاتيه، سكاي لايت، سمر سنو، أكسفورد ريفر، كلاسيك وايت، بريز). نوفر عينات دهان حقيقية مجانية في موقعك.',
    descriptionEn: 'The most requested Jotun interior color palette for modern villas and apartments across Khobar, Dammam, and Qatif.',
    featured: true,
    order: 7
  },
  {
    id: 'prod-jotun-interior-swatches',
    slug: 'jotun-interior-swatches-collection',
    titleAr: 'كتالوج اختيارات ألوان الدهان الداخلية (10 درجات ملكية)',
    titleEn: 'Interior Paint Color Swatches Collection (10 Shades)',
    categoryId: 'cat-3',
    categorySlug: 'wall-decor',
    categoryAr: 'الديكورات والبدائل العصرية',
    categoryEn: 'Wall Decor',
    price: 0,
    oldPrice: null,
    showPrice: false,
    priceUnitAr: 'كتالوج معتمد',
    priceUnitEn: 'Certified Catalog',
    image: '/images/catalog/jotun-interior-swatches.jpg',
    coverImage: '/images/catalog/jotun-interior-swatches.jpg',
    gallery: [
      '/images/catalog/jotun-interior-swatches.jpg',
      '/images/catalog/real-color-comparison-swatch.jpg',
      '/images/portfolio/real-limestone-hallway.jpg'
    ],
    descriptionAr: 'اختيارات ألوان الدهان الداخلية المعتمدة بأرقامها الأصلية: 10341 لايمستون، 0567 أيفوري، 1024 تايملس، 1140 ساند، 1519 فانيلا لاتيه، 1624 سكاي لايت، 1928 سمر سنو، 9915 أكسفورد ريفر، 9918 كلاسيك وايت، 9938 بلاكند بلاك.',
    descriptionEn: 'Official swatch collection of top 10 interior shades with exact code reference numbers for flawless wall execution.',
    featured: true,
    order: 8
  },
  {
    id: 'prod-jotun-fenomastic-casho',
    slug: 'jotun-fenomastic-casho-1931',
    titleAr: 'دهان جوتن فينوماستيك الأصلي — كاشو 1931',
    titleEn: 'Jotun Fenomastic Pure Colours — Cashew 1931',
    categoryId: 'cat-1',
    categorySlug: 'room-offers',
    categoryAr: 'عروض وباقات الغرف',
    categoryEn: 'Room Packages',
    price: 550,
    oldPrice: 750,
    showPrice: true,
    priceUnitAr: 'ريال للغرفة',
    priceUnitEn: 'SAR/room',
    image: '/images/products/real-jotun-fenomastic-casho.jpg',
    coverImage: '/images/products/real-jotun-fenomastic-casho.jpg',
    gallery: [
      '/images/products/real-jotun-fenomastic-casho.jpg',
      '/images/catalog/jotun-interior-swatches.jpg',
      '/images/portfolio/real-modern-room-parquet.jpg'
    ],
    descriptionAr: 'دهان فينوماستيك الأصلي من جوتن بدرجة كاشو 1931 الراقية التي تمنح الغرف هدوءاً فندقياً ناعماً، قابل للغسيل الفائق ومقاوم للبقع مع مظهر حريري مطفي جذاب.',
    descriptionEn: 'Authentic Jotun Fenomastic paint in Cashew 1931 shade for luxury interior spaces.',
    featured: true,
    order: 9
  },
  {
    id: 'prod-limestone-hallway-finish',
    slug: 'limestone-hallway-interior-finish',
    titleAr: 'تشطيب الممرات والمداخل بدهان لايمستون 10341',
    titleEn: 'Hallway & Entrance Finish in Limestone 10341',
    categoryId: 'cat-1',
    categorySlug: 'room-offers',
    categoryAr: 'عروض وباقات الغرف',
    categoryEn: 'Room Packages',
    price: 450,
    oldPrice: 600,
    showPrice: true,
    priceUnitAr: 'ريال للممر',
    priceUnitEn: 'SAR/hallway',
    image: '/images/portfolio/real-limestone-hallway.jpg',
    coverImage: '/images/portfolio/real-limestone-hallway.jpg',
    gallery: [
      '/images/portfolio/real-limestone-hallway.jpg',
      '/images/portfolio/real-classic-white-corridor.jpg',
      '/images/portfolio/real-breeze-limestone-foam.jpg'
    ],
    descriptionAr: 'تشطيب ممرات ومداخل الفلل والشقق بلون لايمستون 10341 العصري الذي يوسع الأروقة والممرات الضيقة بتدرج بيج رمادي هادئ يعكس الإضاءات الخافتة بامتياز.',
    descriptionEn: 'Modern corridor and entrance finish using Jotun Limestone 10341 for spacious and relaxing hallway aesthetics.',
    featured: true,
    order: 10
  },
  {
    id: 'prod-classic-white-corridor-finish',
    slug: 'classic-white-corridor-finish',
    titleAr: 'تشطيب ممرات ومداخل بلون كلاسيك وايت 9918 المضيء',
    titleEn: 'Classic White 9918 Luminous Corridor Finish',
    categoryId: 'cat-1',
    categorySlug: 'room-offers',
    categoryAr: 'عروض وباقات الغرف',
    categoryEn: 'Room Packages',
    price: 450,
    oldPrice: 600,
    showPrice: true,
    priceUnitAr: 'ريال للممر',
    priceUnitEn: 'SAR/hallway',
    image: '/images/portfolio/real-classic-white-corridor.jpg',
    coverImage: '/images/portfolio/real-classic-white-corridor.jpg',
    gallery: [
      '/images/portfolio/real-classic-white-corridor.jpg',
      '/images/portfolio/real-limestone-hallway.jpg',
      '/images/portfolio/real-modern-room-parquet.jpg'
    ],
    descriptionAr: 'طلاء وتشطيب ممرات الفلل بلون كلاسيك وايت 9918 النقي مع نعلات عصرية، يوفر إشراقة وانشراحاً استثنائياً ويتناغم مع اللوحات الجدارية والمرايا.',
    descriptionEn: 'Pristine Classic White 9918 hallway painting for maximum light reflection and modern minimalism.',
    featured: false,
    order: 11
  }
];

// Append new products if not existing
newProducts.forEach(np => {
  if (!db.products.some(p => p.id === np.id || p.slug === np.slug)) {
    db.products.push(np);
  }
});

console.log('2. Updating Projects in db.json...');
// Real authentic projects to insert at the top of the projects gallery
const realProjects = [
  {
    id: 'proj-real-limestone',
    slug: 'real-limestone-hallway-khobar',
    category: 'interior',
    titleAr: 'تشطيب ممر ومداخل فيلا عصرية بدهان لايمستون 10341 — الخبر',
    titleEn: 'Modern Villa Hallway Finished in Limestone 10341 — Khobar',
    locationAr: 'الخبر - حي الحزام الذهبي',
    locationEn: 'Khobar - Golden Belt',
    scopeAr: 'دهانات داخلية جوتن فينوماستيك مطفي درجة لايمستون',
    scopeEn: 'Interior Jotun Fenomastic Matt Limestone 10341',
    image: '/images/portfolio/real-limestone-hallway.jpg',
    coverImage: '/images/portfolio/real-limestone-hallway.jpg',
    gallery: [
      '/images/portfolio/real-limestone-hallway.jpg',
      '/images/portfolio/real-classic-white-corridor.jpg',
      '/images/catalog/jotun-interior-swatches.jpg'
    ],
    shortDescAr: 'تنفيذ دهان ممر داخلي طويل بلون لايمستون 10341 مع إضاءات مدمجة كونسول وتناغم رائع مع الأرضيات الخشبية الفاتحة.',
    descriptionAr: 'تنفيذ كامل لأعمال معالجة الجدران والتأسيس والسنفرة وطلاء وجهين بدهان جوتن الأصلي لايمستون 10341، مما منح الممر اتساعاً بصرياً ودفئاً أنيقاً.',
    completionDate: '2026',
    order: 1
  },
  {
    id: 'proj-real-foam-breeze',
    slug: 'real-foam-moldings-breeze-limestone-dammam',
    category: 'decor',
    titleAr: 'تنفيذ بانوهات فوم ديكورية مع دهان بريز 0552 ولايمستون — الدمام',
    titleEn: 'Decorative Foam Moldings with Breeze & Limestone Paint — Dammam',
    locationAr: 'الدمام - حي الشاطئ الغربي',
    locationEn: 'Dammam - West Shore',
    scopeAr: 'تركيب إطارات فوم كلاسيكية مع دهانات بريز ولايمستون وإضاءة ليد مخفية',
    scopeEn: 'Foam molding wall frames, Breeze & Limestone paint with LED cove lighting',
    image: '/images/portfolio/real-breeze-limestone-foam.jpg',
    coverImage: '/images/portfolio/real-breeze-limestone-foam.jpg',
    gallery: [
      '/images/portfolio/real-breeze-limestone-foam.jpg',
      '/images/portfolio/real-luxury-foam-moldings.jpg',
      '/images/portfolio/real-breeze-vanilla-latte.jpg'
    ],
    shortDescAr: 'مقارنة وتنفيذ واقعي لدرجات بريز 0552 ولايمستون مع بانوهات فوم كلاسيكية ناعمة وإنارة ليد حائطية دافئة.',
    descriptionAr: 'تصميم وتنفيذ بانوهات فوم هندسية متناسقة بأبعاد دقيقة ودهانها بدهانات جوتن الأصلية مع إضاءة مخفية علوية وجانبية أضفت طابعاً فندقياً باهراً.',
    completionDate: '2026',
    order: 2
  },
  {
    id: 'proj-real-modern-parquet',
    slug: 'real-modern-living-room-parquet-khobar',
    category: 'interior',
    titleAr: 'تشطيب صالة وغرف نوم مع باركيه وإنارة أسقف مخفية — الخبر',
    titleEn: 'Living & Bedroom Finishes with Parquet & Ceiling Lighting — Khobar',
    locationAr: 'الخبر - حي الهدى',
    locationEn: 'Khobar - Al Huda',
    scopeAr: 'دهانات داخلية متناسقة مع أرضيات باركيه وأسقف جبسية بإنارة مخفية',
    scopeEn: 'Interior painting matched with parquet and cove ceiling lights',
    image: '/images/portfolio/real-modern-room-parquet.jpg',
    coverImage: '/images/portfolio/real-modern-room-parquet.jpg',
    gallery: [
      '/images/portfolio/real-modern-room-parquet.jpg',
      '/images/portfolio/real-hallway-wood-doors.jpg',
      '/images/brand/official-golden-palace-flyer.jpg'
    ],
    shortDescAr: 'تشطيب غرف سكنية فاخرة بألوان أوف وايت دافئة متوافقة مع باركيه البلوط والأبواب الخشبية وإنارة السقف المخفية.',
    descriptionAr: 'تنفيذ دهان شامل للغرف بأسلوب مينيماليست حديث يعزز الانشراح، مع ضبط أركان الجدران ونظافة تامة للمكان وحماية المفروشات.',
    completionDate: '2026',
    order: 3
  },
  {
    id: 'proj-real-breeze-vanilla',
    slug: 'real-breeze-vanilla-latte-wall-molding-qatif',
    category: 'interior',
    titleAr: 'تشطيب جداري دهان بريز 0552 وفانيلا لاتيه 1519 مع إطارات ديكورية — القطيف',
    titleEn: 'Breeze & Vanilla Latte Wall Paint with Decorative Moldings — Qatif',
    locationAr: 'القطيف - حي المجيدية',
    locationEn: 'Qatif - Al Majeediah',
    scopeAr: 'دهانات جوتن بريز 0552 وفانيلا لاتيه 1519 مع بانوهات فوم فخمة',
    scopeEn: 'Jotun Breeze 0552 & Vanilla Latte 1519 with luxury wall panels',
    image: '/images/portfolio/real-breeze-vanilla-latte.jpg',
    coverImage: '/images/portfolio/real-breeze-vanilla-latte.jpg',
    gallery: [
      '/images/portfolio/real-breeze-vanilla-latte.jpg',
      '/images/catalog/real-color-comparison-swatch.jpg',
      '/images/portfolio/real-luxury-foam-moldings.jpg'
    ],
    shortDescAr: 'تطبيق عملي لأكثر ألوان جوتن طلباً: بريز 0552 بالأعلى وفانيلا لاتيه 1519 مع إطارات ديكورية أنيقة.',
    descriptionAr: 'تشطيب فندقي متقن يجمع بين نعومة فانيلا لاتيه وهدوء لون بريز مع بانوهات فوم معالجة بدهان مطفي مقاوم للبصمات.',
    completionDate: '2026',
    order: 4
  },
  {
    id: 'proj-real-luxury-foam-moldings',
    slug: 'real-luxury-foam-moldings-detail-dammam',
    category: 'decor',
    titleAr: 'تنفيذ بانوهات الفوم الديكورية بدقة متناهية — الدمام',
    titleEn: 'High Precision Luxury Foam Moldings — Dammam',
    locationAr: 'الدمام - حي الشاطئ الشرقي',
    locationEn: 'Dammam - East Shore',
    scopeAr: 'تركيب بانوهات فوم متعددة الطبقات ودهان حريري عالي الجودة',
    scopeEn: 'Multi-layer foam molding installation with silky topcoat',
    image: '/images/portfolio/real-luxury-foam-moldings.jpg',
    coverImage: '/images/portfolio/real-luxury-foam-moldings.jpg',
    gallery: [
      '/images/portfolio/real-luxury-foam-moldings.jpg',
      '/images/portfolio/real-breeze-limestone-foam.jpg',
      '/images/brand/official-golden-palace-flyer.jpg'
    ],
    shortDescAr: 'لمسة فخامة في كل تفصيلة: زوايا هندسية 45 درجة دقيقة ونهايات ناعمة للجدران المودرن والكلاسيك.',
    descriptionAr: 'من أعمال القصر الذهبي المتميزة في تركيب بانوهات الفوم الكثيف المضاد للصدمات مع معالجة الفواصل بالمعجون المخصص وتشطيب دهان فاخر.',
    completionDate: '2026',
    order: 5
  },
  {
    id: 'proj-real-greige-door',
    slug: 'real-greige-interior-door-refinishing-khobar',
    category: 'doors',
    titleAr: 'دهان وتجديد أبواب خشبية راقية بلون الجريج العصري — الخبر',
    titleEn: 'Luxury Interior Wood Doors Painted in Modern Greige — Khobar',
    locationAr: 'الخبر - حي العقربية',
    locationEn: 'Khobar - Al Aqrabiyah',
    scopeAr: 'دهان أبواب داخلية مطفي ناعم بلون الجريج (Greige) العصري',
    scopeEn: 'Refinishing interior doors with sleek Greige smooth coating',
    image: '/images/portfolio/real-greige-painted-door.jpg',
    coverImage: '/images/portfolio/real-greige-painted-door.jpg',
    gallery: [
      '/images/portfolio/real-greige-painted-door.jpg',
      '/images/portfolio/real-hallway-wood-doors.jpg',
      '/images/brand/official-golden-palace-flyer.jpg'
    ],
    shortDescAr: 'لون الجريج يجمع بين دفء البيج وأناقة الرمادي لمنح الأبواب طابعاً فندقياً مريحاً مع الحفاظ على النعومة.',
    descriptionAr: 'سنفرة ومعالجة عيوب الأبواب الخشبية القديمة وتطبيق طبقات أساس ودهان تشطيب مقاوم للخدوش والتآكل اليومي بدرجة جريج ناعمة.',
    completionDate: '2026',
    order: 6
  },
  {
    id: 'proj-real-classic-white-corridor',
    slug: 'real-classic-white-corridor-dammam',
    category: 'interior',
    titleAr: 'تشطيب ممر ومداخل بلون كلاسيك وايت 9918 المضيء — الدمام',
    titleEn: 'Luminous Corridor Finished in Classic White 9918 — Dammam',
    locationAr: 'الدمام - حي المزروعية',
    locationEn: 'Dammam - Al Mazrouiyah',
    scopeAr: 'دهانات داخلية كلاسيك وايت 9918 مع نعلات عصرية وبياض ناصع',
    scopeEn: 'Classic White 9918 interior coating with modern skirting',
    image: '/images/portfolio/real-classic-white-corridor.jpg',
    coverImage: '/images/portfolio/real-classic-white-corridor.jpg',
    gallery: [
      '/images/portfolio/real-classic-white-corridor.jpg',
      '/images/portfolio/real-limestone-hallway.jpg',
      '/images/catalog/jotun-interior-swatches.jpg'
    ],
    shortDescAr: 'تشطيب ممر داخلي فاخر بلون كلاسيك وايت 9918 يعزز انتشار الإضاءة الطبيعية ويعطي إحساساً بالنقاء والرحابة.',
    descriptionAr: 'طلاء ممرات فيلا بالكامل بلون كلاسيك وايت 9918 من جوتن، مع سنفرة كاملة ومعالجة التشققات ودهان وجهين بجودة فائقة.',
    completionDate: '2026',
    order: 7
  },
  {
    id: 'proj-real-reception-ceilings',
    slug: 'real-reception-ceilings-wood-doors-qatif',
    category: 'ceilings',
    titleAr: 'تشطيب أسقف وجدران صالة استقبال بإنارة سبوتلايت وأبواب خشبية — القطيف',
    titleEn: 'Reception Hall Ceilings & Spotlights with Wooden Doors — Qatif',
    locationAr: 'القطيف - حي الناصرة',
    locationEn: 'Qatif - Al Nassera',
    scopeAr: 'دهان أسقف ناصعة البياض مطفية مع توزيع سبوتلايت وأبواب خشبية فاخرة',
    scopeEn: 'Ceiling painting with spotlight alignment and wood door harmony',
    image: '/images/portfolio/real-hallway-wood-doors.jpg',
    coverImage: '/images/portfolio/real-hallway-wood-doors.jpg',
    gallery: [
      '/images/portfolio/real-hallway-wood-doors.jpg',
      '/images/portfolio/real-modern-room-parquet.jpg',
      '/images/brand/official-golden-palace-flyer.jpg'
    ],
    shortDescAr: 'تشطيب أسقف وجدران صالة وممرات بإنارة سبوتلايت مدمجة وأرضيات رخامية وأبواب خشبية عصرية.',
    descriptionAr: 'معالجة فواصل الجبس بورد ودهان الأسقف باللون الأبيض المطفي المانع للانعكاسات المزعجة مع تناسق كامل مع ألوان الجدران الهادئة.',
    completionDate: '2026',
    order: 8
  },
  {
    id: 'proj-real-golden-palace-flyer',
    slug: 'real-official-golden-palace-verified-offers-flyer',
    category: 'interior',
    titleAr: 'باقات وعروض القصر الذهبي المعتمدة رسمياً — الخبر والدمام والقطيف',
    titleEn: 'Official Golden Palace Verified Packages & Offers — Eastern Province',
    locationAr: 'المنطقة الشرقية (الدمام • الخبر • القطيف)',
    locationEn: 'Eastern Province (Dammam • Khobar • Qatif)',
    scopeAr: 'عروض دهانات شاملة: الغرفة 500 ريال، غرفتين 700 ريال، 3 غرف 1000 ريال، السقف 100، الباب 90',
    scopeEn: 'Complete package: 1 room 500 SAR, 2 rooms 700 SAR, 3 rooms 1000 SAR, ceiling 100 SAR, door 90 SAR',
    image: '/images/brand/official-golden-palace-flyer.jpg',
    coverImage: '/images/brand/official-golden-palace-flyer.jpg',
    gallery: [
      '/images/brand/official-golden-palace-flyer.jpg',
      '/images/products/real-jotun-fenomastic-casho.jpg',
      '/images/catalog/jotun-popular-colors-2027.jpg'
    ],
    shortDescAr: 'البروشور الرسمي المعتمد للقصر الذهبي: زي الفريق الموحد، خامات جوتن الأصلية، معالجة معجون، سنفرة، أساس، وجهين تشطيب ونظافة تامة.',
    descriptionAr: 'وثيقة عروض القصر الذهبي المعتمدة التي تضمن للعميل تنفيذ العمل بخامات جوتن الأصلية 100% وبأيدي فنيين محترفين مع نظافة تامة وضمان رسمي.',
    completionDate: '2026',
    order: 9
  }
];

// Prepend real projects to projects list
realProjects.forEach(rp => {
  const existingIdx = db.projects.findIndex(p => p.id === rp.id || p.slug === rp.slug);
  if (existingIdx >= 0) {
    db.projects[existingIdx] = rp;
  } else {
    db.projects.unshift(rp);
  }
});

// Update Articles with real color swatches and photos
console.log('3. Updating Articles in db.json...');
if (db.articles && db.articles.length > 0) {
  db.articles[0].coverImage = '/images/catalog/jotun-popular-colors-2027.jpg';
  db.articles[0].image = '/images/catalog/jotun-popular-colors-2027.jpg';
  db.articles[0].contentAr = `
    <p class="text-base text-slate-700 leading-relaxed mb-6 font-medium">
      يعتبر اختيار ألوان دهانات المنزل الخطوة الجوهرية في تحديد هوية مساحتك السكنية وروح المكان. في عام 2026 و 2027، تشهد اتجاهات التصميم الداخلي في الشرقية تحولاً نحو الألوان الطبيعية الهادئة من الأبيض الهادئ والرمادي الفاتح إلى الجريج (Greige)، مع الاعتماد التام على خامات دهانات جوتن فينوماستيك القابلة للغسيل.
    </p>

    <div class="my-8 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
      <img src="/images/catalog/jotun-popular-colors-2027.jpg" alt="دليل ألوان جوتن الأكثر طلباً لعام 2027" class="w-full object-cover" />
      <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-bold">
        دليل الألوان الأكثر طلباً: لايمستون، أيفوري، تايملس، ساند، فانيلا لاتيه، سكاي لايت، سمر سنو، أكسفورد ريفر، كلاسيك وايت، بريز
      </p>
    </div>

    <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
      1. درجات لايمستون (Limestone 10341) وبريز (Breeze 0552)
    </h3>
    <p class="text-slate-700 leading-relaxed mb-6">
      تعتبر درجة لايمستون 10341 الاختيار الأرقى حالياً لصالات الاستقبال والممرات؛ فهي تجمع بين دفء الحجر الطبيعي وأناقة اللون الهادئ المريح للأعصاب، بينما تعطي درجة بريز 0552 انتعاشاً ناعماً يتناسق بامتياز مع البانوهات الجدارية.
    </p>

    <div class="my-8 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
      <img src="/images/portfolio/real-breeze-limestone-foam.jpg" alt="مقارنة واقعية بين بريز ولايمستون مع بانوهات فوم" class="w-full object-cover" />
      <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-bold">
        تطبيق واقعي من أعمال القصر الذهبي: مقارنة لون بريز ولايمستون مع بانوهات فوم وإضاءة مخفية
      </p>
    </div>

    <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
      2. اختيارات ألوان الدهان الداخلية المعتمدة
    </h3>
    <p class="text-slate-700 leading-relaxed mb-6">
      نستعرض معكم درجات الألوان العشر المعتمدة بأكواد جوتن الرسمية لتختار منها ما يناسب أثاثك وإضاءة غرفتك:
    </p>

    <div class="my-8 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
      <img src="/images/catalog/jotun-interior-swatches.jpg" alt="كتالوج اختيارات ألوان الدهان الداخلية" class="w-full object-cover" />
      <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-bold">
        الكتالوج المعتمد لاختيارات ألوان الدهان الداخلية بأكواد جوتن الأصلية
      </p>
    </div>

    <div class="p-6 rounded-2xl bg-amber-50/80 border border-[#D4A63D]/40 text-slate-800 space-y-2 mb-8">
      <h4 class="font-bold text-[#A87818] text-sm flex items-center gap-2">
        <span>💡 نصيحة مهندس الديكور في القصر الذهبي:</span>
      </h4>
      <p class="text-xs text-slate-700 leading-relaxed">
        قبل أن تبدأ بدهان كامل الغرفة، يوفر لك فريق القصر الذهبي بالدمام والخبر والقطيف عينة دهان مجانية على جدارك لتختبر اللون مع إضاءة منزلك الفعلية صباحاً ومساءً. اتصل بنا على 0561095508 لحجز المعاينة المجانية.
      </p>
    </div>
  `;
}

// Save db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('✓ Successfully updated data/db.json with all real works, products and articles!');

// Sync with MongoDB Atlas
async function syncMongo() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://halahussien215299_db_user:5jxL4wQyTJZcLgfb@cluster0.7wja7i0.mongodb.net/golden_palace_paints?retryWrites=true&w=majority';
  try {
    console.log('Connecting to MongoDB Atlas to sync...');
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully!');

    // Product Model
    const productSchema = new mongoose.Schema({}, { strict: false });
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');
    
    // Project Model
    const projectSchema = new mongoose.Schema({}, { strict: false });
    const Project = mongoose.models.Project || mongoose.model('Project', projectSchema, 'projects');

    // Article Model
    const articleSchema = new mongoose.Schema({}, { strict: false });
    const Article = mongoose.models.Article || mongoose.model('Article', articleSchema, 'articles');

    // Upsert products
    for (const prod of db.products) {
      await Product.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true, new: true });
    }
    console.log(`✓ Synced ${db.products.length} products to MongoDB Atlas!`);

    // Upsert projects
    for (const proj of db.projects) {
      await Project.findOneAndUpdate({ slug: proj.slug }, proj, { upsert: true, new: true });
    }
    console.log(`✓ Synced ${db.projects.length} projects to MongoDB Atlas!`);

    // Upsert articles
    for (const art of db.articles) {
      await Article.findOneAndUpdate({ slug: art.slug }, art, { upsert: true, new: true });
    }
    console.log(`✓ Synced ${db.articles.length} articles to MongoDB Atlas!`);

    await mongoose.disconnect();
    console.log('✓ MongoDB connection closed.');
  } catch (err) {
    console.warn('MongoDB Sync Warning (will rely on db.json):', err.message);
  }
}

syncMongo().then(() => {
  console.log('All updates complete!');
  process.exit(0);
});
