const fs = require('fs');

const dbPath = 'data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.articles = [
  {
    id: "art-1",
    slug: "modern-paint-colors-guide-2026",
    titleAr: "دليل اختيار ألوان الدهانات العصرية للمنازل والفلل في 2026",
    titleEn: "Modern Paint Colors Guide for Homes 2026",
    category: "ألوان ودهانات 2026",
    coverImage: "/images/hero/hero-living-room.webp",
    image: "/images/hero/hero-living-room.webp",
    date: "2026-02-15",
    publishedAt: "15 فبراير 2026",
    readTime: "5 دقائق قراءة",
    author: "مهندس الديكور — القصر الذهبي",
    excerptAr: "تعرف على أبرز درجات الألوان الهادئة والفخمة من جوتن (Greige & Royal Navy) التي تمنح الصالات وغرف النوم وسعاً وراحة نفسية راقية.",
    excerptEn: "Explore trending paint palettes that add space, serenity, and luxury to living rooms and bedrooms.",
    contentAr: `
      <p class="text-base text-slate-700 leading-relaxed mb-6 font-medium">
        يعتبر اختيار ألوان دهانات المنزل الخطوة الجوهرية في تحديد هوية مساحتك السكنية وروح المكان. في عام 2026، تشهد اتجاهات التصميم الداخلي تحولاً لافتاً نحو الألوان الطبيعية الهادئة التي تجمع بين الدفء والعصرية، مع التركيز على خامات دهانات جوتن القابلة للغسيل ومقاومة البقع.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/services/service-interior.webp" alt="تناسق ألوان الدهانات في الصالات العصرية" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          نموذج لتطبيق درجات البيج الدافئ (Warm Greige) لإعطاء انشراح وإضاءة طبيعية
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        1. درجات الجريج والبيج الهادئ (Warm Greige)
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        يجمع لون الجريج بين أناقة الرمادي ودفء البيج، وهو الاختيار الأول حالياً لصالات الاستقبال والممرات. يتميز بأنه يعكس الضوء بشكل متوازن جداً ويتناغم بسهولة مع مختلف ألوان الأثاث الخشبي والمعدني المذهب.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/portfolio/navy-wall.webp" alt="جدار كحلي ملكي مميز Accent Wall" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          تطبيق الجدار الكحلي الملكي (Royal Navy) مع إضاءة جدارية دافئة
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        2. الجدران المميزة (Accent Walls) بالكحلي الملكي
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        لإضفاء لمسة فندقية فخمة، ينصح خبراء القصر الذهبي بطلاء جدار واحد في غرفة النوم الرئيسية أو خلفية الصالون بدرجة الكحلي الملكي أو الأخضر الزيتوني المطفي (Fenomastic)، مع إحاطته ببانوهات فوم كلاسيكية أو إضاءات ليد ناعمة.
      </p>

      <div class="p-6 rounded-2xl bg-amber-50/70 border border-[#D4A63D]/40 text-slate-800 space-y-2 mb-8">
        <h4 class="font-bold text-[#A87818] text-sm flex items-center gap-2">
          <span>💡 نصيحة خبراء القصر الذهبي:</span>
        </h4>
        <p class="text-xs text-slate-700 leading-relaxed">
          قبل طلاء كامل الغرفة، نتيح لعملائنا في الدمام والخبر والقطيف عينة دهان مجانية على الجدار للتأكد من تفاعل اللون مع إضاءة منزلك الفعلية صباحاً ومساءً.
        </p>
      </div>
    `
  },
  {
    id: "art-2",
    slug: "marble-wood-alternatives-ideas",
    titleAr: "أفكار تنسيق بديل الرخام وبديل الخشب في المجالس والصالات الفاخرة",
    titleEn: "Styling Marble and Wood Alternatives in Majlis",
    category: "ديكورات وبدائل عصرية",
    coverImage: "/images/portfolio/marble-decoration.webp",
    image: "/images/portfolio/marble-decoration.webp",
    date: "2026-02-10",
    publishedAt: "10 فبراير 2026",
    readTime: "4 دقائق قراءة",
    author: "قسم الديكور — القصر الذهبي",
    excerptAr: "كيف تدمج ألواح بديل الرخام اللامعة مع بديل الخشب المضلع وخطوط الإضاءة المخفية للحصول على جدار خلفية شاشة فاخر.",
    excerptEn: "How to combine gloss marble sheets with acoustic wood slats and LED channels.",
    contentAr: `
      <p class="text-base text-slate-700 leading-relaxed mb-6 font-medium">
        يعد الجمع بين فخامة بديل الرخام ودفء بديل الخشب من أكثر صيحات الديكور الحديث طلباً في المنطقة الشرقية. يمنح هذا التناسق جدران التلفزيون ومداخل المجالس مظهراً عصرياً فائق الأناقة بتكلفة اقتصادية مقارنة بالرخام الطبيعي وبدون وزن ثقيل على الجدران.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/portfolio/project-2.webp" alt="جدار شاشة متكامل ببديل الرخام والخشب" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          تنفيذ خلفية تلفزيون تجمع بديل الرخام في المنتصف مع شرائح بديل الخشب الجانبية
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        أسرار التنسيق الهندسي المتكامل
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        للحصول على نتيجة تضاهي أرقى الفنادق، يتم تثبيت لوح بديل الرخام (غالباً بنقشة عروق رمادية أو ذهبية) في منتصف الجدار خلف الشاشة المعلقة، وإحاطته من الجانبين بشرائح بديل الخشب (WPC) المعالجة ضد الرطوبة والحشرات.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/portfolio/clean-p3.webp" alt="جدار رخامي مضيء في صالة استقبال" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          إضاءة وورم لايت (Warm Light) مخفية خلف حواف بديل الرخام تبرز التفاصيل
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        دور بروفيلات الألمنيوم الذهبية وشرائط الليد
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        تكمن اللمسة الاحترافية في إضافة قواطع استانلس ستيل ذهبية مقاومة للصدأ بين الألواح مع دفن شرائط إضاءة ليد غير مرئية مباشرة، مما يخلق تبايناً ضوئياً ساحراً يبرز نعومة الرخام وبروزات الخشب.
      </p>
    `
  },
  {
    id: "art-3",
    slug: "ceiling-painting-guide",
    titleAr: "خطوات دهان الأسقف الجبسية ومعالجة فواصل الجبس بورد بدون تشققات",
    titleEn: "Steps to Paint Gypsum Ceilings & Seam Treatment",
    category: "تشطيب الأسقف والجبس",
    coverImage: "/images/portfolio/luxury-ceiling.webp",
    image: "/images/portfolio/luxury-ceiling.webp",
    date: "2026-02-02",
    publishedAt: "2 فبراير 2026",
    readTime: "4 دقائق قراءة",
    author: "فريق التنفيذ — القصر الذهبي",
    excerptAr: "أهم النصائح الهندسية لضمان سقف مستوٍ تماماً بدون عيوب أو فواصل ظاهرة مع إبراز بيوت النور والإضاءة المخفية.",
    excerptEn: "Key technical tips for flawless, crack-free gypsum ceiling finish.",
    contentAr: `
      <p class="text-base text-slate-700 leading-relaxed mb-6 font-medium">
        دهان الأسقف الجبسية من أكثر مراحل التشطيب حساسية، حيث تكشف الإضاءات المباشرة والمخفية (بيوت النور) أي تعرجات أو فواصل غير معالجة بدقة. إليكم المراحل الاحترافية التي يعتمدها فنيو القصر الذهبي.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/services/gold-service-ceiling.webp" alt="تشطيب سقف جبسي ناصع البياض" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          سقف جبس بورد مستوٍ تماماً بدهان مطفي فائق البياض يمنع الانعكاسات المزعجة
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        1. شريط الفواصل (Mesh Tape) ومعجون الجبس المقاوم
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        تبدأ معالجة السقف بتثبيت شريط الفواصل الفيبر عالي الالتصاق على كافة نقاط التقاء ألواح الجبس، ثم سحب طبقتين من معجون الفواصل المخصص وتركه يجف تماماً لمنع حدوث شروخ مستقبلية نتيجة التمدد الحراري.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/portfolio/project-4.webp" alt="إضاءات دائرية مدمجة وسقف مودرن" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          توزيع إضاءات سبوت لايت مدمجة بسلاسة داخل الأسقف المنفذة
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        2. الصنفرة الميكانيكية والدهان المطفي فائق البياض
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        بعد مرحلة المعجون، تتم الصنفرة باستخدام ماكينات شفط الغبار لضمان سطح أملس كالحرير، تليها طبقة أساس مائي (Primer)، ثم وجهين من دهان جوتن المطفي الناصع (Dead Flat Matte) الذي يخفي أي تموجات بصرية.
      </p>
    `
  },
  {
    id: "art-4",
    slug: "villa-facades-jotashield-profile-guide",
    titleAr: "أفضل دهانات الواجهات الخارجية المقاومة لرطوبة وحرارة الشرقية (بروفايل وجوتاشيلد)",
    titleEn: "Exterior Facade Paint Guide for Eastern Province",
    category: "دهانات خارجية وواجهات",
    coverImage: "/images/services/service-exterior.webp",
    image: "/images/services/service-exterior.webp",
    date: "2026-01-25",
    publishedAt: "25 يناير 2026",
    readTime: "6 دقائق قراءة",
    author: "استشاري الواجهات — القصر الذهبي",
    excerptAr: "دليلك لحماية واجهة فيلتك من الرطوبة الساحلية والتملح والأشعة فوق البنفسجية في الدمام والخبر والقطيف.",
    excerptEn: "Protect your villa exterior from coastal humidity, UV rays, and salt with Jotashield and profile textures.",
    contentAr: `
      <p class="text-base text-slate-700 leading-relaxed mb-6 font-medium">
        تفرض الظروف المناخية في المنطقة الشرقية (ارتفاع الرطوبة الساحلية والحرارة المرتفعة) متطلبات صارمة على دهانات الواجهات الخارجية للفلل والمباني. اختيار خامة مقاومة للتشققات والتملح يحمي استثمارك العقاري لعشرات السنين.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/portfolio/project-1.webp" alt="واجهة فيلا معمارية بتشطيب دهان خارجي مودرن" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          واجهة فيلا سكنية حديثة بالخبر منفذة بأنظمة جوتاشيلد المقاومة للحرارة
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        مميزات دهان البروفايل الإسمنتي المحبب
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        يعتبر دهان البروفايل (Profile Texture) من أنجح الحلول للواجهات؛ فهو يشكل طبقة بسماكة ملموسة تعزل الجدران، وتخفي عيوب اللياسة، وتقاوم الخدوش والعوامل الجوية بكفاءة متناهية مع خيارات متعددة من درجات التدرج الرملي والبيج.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/services/facade.webp" alt="تشطيب مبنى تجاري ودهانات عازلة" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          عزل مائي وحراري للواجهات باستخدام دهانات جوتن تكس كولور المضادة للأشعة فوق البنفسجية
        </p>
      </div>
    `
  },
  {
    id: "art-5",
    slug: "wooden-doors-lacquer-restoration",
    titleAr: "طريقة تجديد ودهان الأبواب الخشبية القديمة بتقنية اللاكيه والرش الفندقي",
    titleEn: "Restoring and Spraying Wooden Doors with Lacquer",
    category: "تجديد ودهان الأبواب",
    coverImage: "/images/services/gold-service-door-clean.webp",
    image: "/images/services/gold-service-door-clean.webp",
    date: "2026-01-18",
    publishedAt: "18 يناير 2026",
    readTime: "4 دقائق قراءة",
    author: "ورشة الدهانات — القصر الذهبي",
    excerptAr: "وفر تكلفة شراء أبواب جديدة؛ جدد أبواب شقتك أو فيلتك بدهان لاكيه تركي ناعم بملمس فندقي يبدأ من 90 ريال للباب.",
    excerptEn: "Restoring your interior wooden doors with Turkish lacquer spray finish from 90 SAR.",
    contentAr: `
      <p class="text-base text-slate-700 leading-relaxed mb-6 font-medium">
        تتعرض الأبواب الداخلية والخارجية للاحتكاك المستمر وتغير اللون مع مرور الوقت. بدلاً من استبدال الأبواب بتكاليف باهظة، توفر خدمة دهان وتجديد الأبواب لدى القصر الذهبي إعادة إحياء كاملة للباب بمظهر فندقي جديد كلياً.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/offers/door.webp" alt="باب خشبي بعد التجديد والدهان بالرش" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          باب شقة داخلي بعد سنفرة الدهان القديم ورشه بدهان لاكيه حريري ناعم
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        خطوات العمل: معالجة، تأسيس، ورش متجانس
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        يتم فك المقابض وحماية الإطارات، تليها معالجة الخدوش بمعجون الخشب الخاص وسنفرة السطح حتى زوال الشوائب، ثم رش طبقة الأساس البولي يوريثان، وانتهاءً برشه بطبقتين من اللاكيه المقاوم للماء بمكبس هوائي متطور بدون أي أثر لآثار الفرشاة.
      </p>
    `
  },
  {
    id: "art-6",
    slug: "wall-foam-moulding-classic-decor",
    titleAr: "دليل تركيب وتنسيق بانوهات الفوم الكلاسيكية في المداخل والممرات وصالات الاستقبال",
    titleEn: "Wall Foam Mouldings Guide for Hallways & Majlis",
    category: "بانوهات الفوم الكلاسيكية",
    coverImage: "/images/services/gold-service-decor-clean.webp",
    image: "/images/services/gold-service-decor-clean.webp",
    date: "2026-01-10",
    publishedAt: "10 يناير 2026",
    readTime: "5 دقائق قراءة",
    author: "فريق التصميم — القصر الذهبي",
    excerptAr: "أسرار قياس وتوزيع إطارات الفوم الديكورية على الجدران وتنسيقها مع الإضاءات الجدارية والدهانات الحريرية.",
    excerptEn: "Proportional spacing and layout of classic wall moulding panels with sconce lighting.",
    contentAr: `
      <p class="text-base text-slate-700 leading-relaxed mb-6 font-medium">
        تعتبر بانوهات الفوم الكلاسيكية (Wall Mouldings) من أجمل اللمسات المعمارية التي تحول الجدران الصامتة في الممرات والصالات إلى لوحات فنية راقية بتناغم بصري مدروس.
      </p>

      <div class="my-8 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/portfolio/project-3.webp" alt="بانوهات فوم كلاسيكية في صالة معيشة" class="w-full h-80 object-cover" />
        <p class="text-xs text-center text-slate-500 py-3 bg-slate-50 border-t border-slate-100 font-semibold">
          إطارات فوم مزدوجة مع إنارة جدارية تعطي عمقاً وفخامة للجدار
        </p>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-[#081B33] mb-4">
        قواعد التوزيع والنسب الهندسية
      </h3>
      <p class="text-slate-700 leading-relaxed mb-6">
        يحرص فنيونا على قياس الجدار بدقة بالليزر لضمان مسافات متساوية بين الإطارات (بين 10 إلى 15 سم بين كل إطار وآخر)، مع دهان الفوم بنفس درجة دهان الجدار لدمجه بسلاسة كأنه جزء أصيل من الجدار المعماري.
      </p>
    `
  }
];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated 6 rich articles with verified photos in db.json!');
