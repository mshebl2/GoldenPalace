'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { ArrowLeft, ArrowRight, Eye, FileText, X, CheckCircle2, Tag } from 'lucide-react';
import { IProduct } from '@/lib/models';

interface ProductItem {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  categoryKey: string;
  materialAr: string;
  materialEn: string;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  specsAr: string[];
  specsEn: string[];
  dimensionsAr: string;
  dimensionsEn: string;
  price?: number | string;
  showPrice?: boolean;
  priceUnitAr?: string;
  priceUnitEn?: string;
}

const luxuryProducts: ProductItem[] = [
  {
    id: 'prod-dining-calacatta',
    titleAr: 'طاولة طعام ملكية كلكتا جولد (10-14 مقعد)',
    titleEn: 'Royal Calacatta Gold Dining Table (10-14 Seats)',
    categoryAr: 'طاولات الطعام',
    categoryEn: 'Dining Tables',
    categoryKey: 'dining',
    materialAr: 'رخام كلكتا جولد إيطالي نخب أول',
    materialEn: 'First-Grade Italian Calacatta Gold',
    image: '/images/products/tables-3.webp',
    descriptionAr: 'تحفة معمارية لصالات الطعام الفارهة، من لوح كلكتا إيطالي كامل بعروق ذهبية متدفقة، مع حواف دائرية ناعمة وقواعد هرمية مكسوة بالرخام والبرونز.',
    descriptionEn: 'Monumental dining centerpiece sculpted from pure Calacatta Gold slab with soft mitered bevels and architectural bronze bases.',
    specsAr: ['معالجة نانو عازلة للسوائل والحرارة', 'قواعد ستانلس ذهبي عيار 304 PVD', 'سماكة سطح الرخام 30 مم مع تدعيم مخفي'],
    specsEn: ['Hydrophobic nano-sealant treatment', 'Grade 304 PVD brushed gold substructure', '30mm solid stone top with concealed sub-frame'],
    dimensionsAr: '300 × 120 سم (تفصيل حسب الطلب)',
    dimensionsEn: '300 × 120 cm (Customizable)',
    price: 28500,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  },
  {
    id: 'prod-console-half-round',
    titleAr: 'كونسول رخام نصف دائري معلق للمداخل',
    titleEn: 'Floating Semi-Circular Entryway Console',
    categoryAr: 'الديكورات الرخامية',
    categoryEn: 'Marble Decor',
    categoryKey: 'decor',
    materialAr: 'رخام مقدوني طبيعي / ستاتوريو',
    materialEn: 'Natural Macedonian / Statuario Marble',
    image: '/images/products/consoles-18.jpg',
    descriptionAr: 'كونسول جداري طافٍ بنصف قطر ناعم، يضفي هيبة فورية على بهو المدخل وممرات القصور بتشطيب يدوي حريري فائق النعومة.',
    descriptionEn: 'Sculptural floating crescent console with hand-honed edges, tailored for prestigious foyer corridors.',
    specsAr: ['نظام تثبيت حديدي مخفي فائق التحمل', 'حواف مشطوفة يدوياً بحرفية إيطالية', 'متوفر بروفايل شريط إضاءة LED مخفي'],
    specsEn: ['Concealed heavy-duty structural wall anchor', 'Artisanal hand-beveled edges', 'Integrated hidden LED channel available'],
    dimensionsAr: '140 × 40 سم • ارتفاع 15 سم',
    dimensionsEn: '140 × 40 cm • Height 15 cm',
    price: 5400,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  },
  {
    id: 'prod-coffee-organic',
    titleAr: 'طاولة تقديم رخامية عضوية بتعريقات كثيفة',
    titleEn: 'Organic Form Dramatic Vein Coffee Table',
    categoryAr: 'طاولات المجالس',
    categoryEn: 'Majlis Tables',
    categoryKey: 'majlis',
    materialAr: 'رخام أبيض وأسود طبيعي بنقوش درامية',
    materialEn: 'Natural High-Contrast Graphic Marble',
    image: '/images/products/tables-6.webp',
    descriptionAr: 'منحوتة هندسية بتعرجات حجرية عضوية تكسر جمود الخطوط المستقيمة، مقصوصة بماكينات الووترجيت المائية ومرتكزة على أسطوانات رخامية صلبة.',
    descriptionEn: 'Fluid organic stone silhouette cut via waterjet jetting, resting on dual solid stone monolithic cylinders.',
    specsAr: ['قص مائي بالووترجيت بدقة 0.2 مم', 'قواعد أسطوانية مصمتة مستقرة', 'سطح معالج ضد بقع القهوة والشاي'],
    specsEn: ['0.2mm precision waterjet cutting', 'Solid monolithic stone cylinder bases', 'Anti-stain coffee and tea sealant protection'],
    dimensionsAr: '130 × 80 سم • ارتفاع 38 سم',
    dimensionsEn: '130 × 80 cm • Height 38 cm',
    price: 6900,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  },
  {
    id: 'prod-console-brass',
    titleAr: 'كونسول رخامي بقاعدة ستانلس ذهبي مصقول',
    titleEn: 'Marble Console with Brushed Gold Metalwork',
    categoryAr: 'الديكورات الرخامية',
    categoryEn: 'Marble Decor',
    categoryKey: 'decor',
    materialAr: 'رخام طبيعي إسباني نخب أول',
    materialEn: 'First-Grade Spanish Natural Marble',
    image: '/images/products/consoles-19.webp',
    descriptionAr: 'مزيج استثنائي يجمع بين برودة وصلابة الرخام الطبيعي ودفء الستانلس الذهبي المطفي المقاوم للبصمات، مثالي للمجالس وصالات الاستقبال.',
    descriptionEn: 'Refined dialogue between organic veined stone and brushed champagne gold stainless steel geometry.',
    specsAr: ['ستانلس ستيل 304 معالج PVD ضد الخدش', 'لحام ليزري مخفي للزوايا', 'سطح رخام طبيعي مصقول حريرياً'],
    specsEn: ['PVD scratch-resistant stainless steel 304', 'Concealed micro-laser weld seams', 'Satin-honed natural marble top'],
    dimensionsAr: '150 × 45 سم • ارتفاع 85 سم',
    dimensionsEn: '150 × 45 cm • Height 85 cm',
    price: 7800,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  },
  {
    id: 'prod-basin-fluted',
    titleAr: 'حوض مغسلة رخام فصي منحوت من كتلة مصمتة',
    titleEn: 'Hand-Carved Fluted Solid Marble Basin',
    categoryAr: 'الديكورات الرخامية',
    categoryEn: 'Marble Decor',
    categoryKey: 'decor',
    materialAr: 'رخام ترافنتين بيج روماني نخب أول',
    materialEn: 'First-Grade Roman Beige Travertine',
    image: '/images/products/basins-22.webp',
    descriptionAr: 'مغسلة ديكورية فاخرة منحوتة كلياً من كتلة ترافنتين حجرية واحدة بأضلاع طولية متموجة (Fluted) تحاكي الأعمدة الرومانية العريقة.',
    descriptionEn: 'Monumental powder room vanity sculpted from a single solid block of sedimentary Travertine with ribbed classical fluting.',
    specsAr: ['نحت آلي 5 محاور CNC مع صقل يدوي', 'حوض داخلي مصمت غير ملحوم مانع للتسريب', 'تصريف مائي خفي أنيق'],
    specsEn: ['5-axis CNC monolithic carving with hand-finish', 'Seamless one-piece leak-proof bowl', 'Minimalist concealed drain cover'],
    dimensionsAr: '50 × 40 سم • ارتفاع 85 سم',
    dimensionsEn: '50 × 40 cm • Height 85 cm',
    price: 4200,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  },
  {
    id: 'prod-desk-executive',
    titleAr: 'مكتب وكونسول تنفيذي من الرخام الإيطالي Black 3D',
    titleEn: 'Prestige Executive Desk in Italian Black 3D Marble',
    categoryAr: 'المكاتب',
    categoryEn: 'Executive Desks',
    categoryKey: 'desks',
    materialAr: 'رخام إيطالي فاخر Black 3D',
    materialEn: 'Italian Black 3D Sculpted Marble',
    image: '/images/products/consoles-21.jpg',
    descriptionAr: 'مكتب فخم لرؤساء مجالس الإدارة والقيادات، يدمج صلابة الرخام الطبيعي بعروقه البارزة مع التصميم الهندسي الإيطالي الراقي.',
    descriptionEn: 'Authoritative desk designed for chairpersons, pairing midnight veined sculpted stone with Italian geometric precision.',
    specsAr: ['سطح رخام طبيعي مصقول بحواف مشطوفة', 'تدعيم ميكانيكي صلب للقواعد', 'تشطيب حريري غير عاكس'],
    specsEn: ['Polished natural stone top with beveled edges', 'Heavy-duty structural substructure', 'Satin tactile stone finish'],
    dimensionsAr: '240 × 100 سم • ارتفاع 76 سم',
    dimensionsEn: '240 × 100 cm • Height 76 cm',
    price: 22000,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  },
  {
    id: 'prod-coffee-dual-tier',
    titleAr: 'طقم طاولات رخام للقهوة والضيافة 5 قطع للمجالس',
    titleEn: '5-Piece Luxury Marble Majlis Hospitality Set',
    categoryAr: 'طاولات المجالس',
    categoryEn: 'Majlis Tables',
    categoryKey: 'majlis',
    materialAr: 'رخام طبيعي عالي النقاوة مع أطقم جانبية',
    materialEn: 'First-Grade Natural Veined Marble',
    image: '/images/products/sets-40.webp',
    descriptionAr: 'طقم ضيافة ومجالس متكامل يتألف من طاولة وسطية كبرى و4 طاولات خدمة جانبية متناسقة، يوفر تجربة ضيافة ملكية رحبة.',
    descriptionEn: 'Complete hospitality ensemble comprising a central coffee table and 4 matching nesting service side tables.',
    specsAr: ['طقم متكامل 5 قطع', 'معالجة نانو ضد التصبغ والحرارة', 'قواعد صخرية مستقرة ومتينة'],
    specsEn: ['Complete 5-piece configuration', 'Anti-stain and thermal shield protection', 'Weighted solid stone pedestals'],
    dimensionsAr: 'طاولة وسطية قطر 100 سم + 4 طاولات خدمة',
    dimensionsEn: 'Center Table Dia 100 cm + 4 Service Tables',
    price: 16800,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  },
  {
    id: 'prod-basin-round-statuario',
    titleAr: 'حوض مغسلة رخام دائري بتخديدات رأسية من الرخام الطبيعي',
    titleEn: 'Fluted Cylindrical Solid Marble Basin',
    categoryAr: 'الديكورات الرخامية',
    categoryEn: 'Marble Decor',
    categoryKey: 'decor',
    materialAr: 'رخام كريمي وأبيض طبيعي ناصع',
    materialEn: 'Pure Natural Cream & White Marble',
    image: '/images/products/basins-25.webp',
    descriptionAr: 'حوض سطحي دائري بتضليع رأسي منحوت بدقة، يمنح دورات مياه الضيوف والمجالس هيبة فندقية استثنائية.',
    descriptionEn: 'Sculptural fluted round stone basin meticulously carved from natural stone block for luxury powder rooms.',
    specsAr: ['رخام طبيعي نخب أول عالي النقاوة', 'طبقة حماية نانو كريستالية تمنع التكلس', 'صقل يدوي كامل من الداخل والخارج'],
    specsEn: ['Top-grade high-purity natural stone', 'Hydrophobic anti-calcification nano coating', 'Hand-polished mirror finish interior and exterior'],
    dimensionsAr: 'قطر 40 سم • ارتفاع 15 سم',
    dimensionsEn: 'Diameter 40 cm • Height 15 cm',
    price: 3800,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  },
];

function getCategoryKey(catStr?: string): string {
  const c = (catStr || '').toLowerCase();
  if (c.includes('dining') || c.includes('طعام')) return 'dining';
  if (c.includes('majlis') || c.includes('مجالس') || c.includes('ضيافة') || c.includes('قهوة')) return 'majlis';
  if (c.includes('console') || c.includes('basin') || c.includes('decor') || c.includes('مغاسل') || c.includes('كونسول') || c.includes('ديكور')) return 'decor';
  if (c.includes('desk') || c.includes('مكاتب')) return 'desks';
  return 'decor';
}

function mapProductToItem(p: IProduct): ProductItem {
  return {
    id: p.id,
    titleAr: p.titleAr || '',
    titleEn: p.titleEn || p.titleAr || '',
    categoryAr: p.categoryAr || 'منتجات حصرية',
    categoryEn: p.categoryEn || 'Bespoke Pieces',
    categoryKey: getCategoryKey(p.categoryId || p.categorySlug || p.categoryAr || p.categoryEn),
    materialAr: p.materialAr || 'رخام طبيعي نخب أول',
    materialEn: p.materialEn || 'First-Grade Natural Marble',
    image: p.coverImage || (p.gallery && p.gallery[0]) || '/images/products/tables-3.webp',
    descriptionAr: p.descriptionAr || '',
    descriptionEn: p.descriptionEn || p.descriptionAr || '',
    specsAr: (p.specsAr && p.specsAr.length > 0)
      ? p.specsAr
      : ['معالجة نانو عازلة للسوائل والحرارة', 'قص وتشكيل بالووترجيت وCNC', 'رخام طبيعي نخب أول عالي المتانة'],
    specsEn: (p.specsEn && p.specsEn.length > 0)
      ? p.specsEn
      : ['Hydrophobic nano-sealant treatment', 'High-precision CNC sculpting', 'Top-grade natural stone'],
    dimensionsAr: p.dimensionsAr || p.dimensions || 'تفصيل حسب مقاس العميل والمخطط',
    dimensionsEn: p.dimensionsEn || p.dimensions || 'Custom Dimensions Per Blueprint',
    price: p.price,
    showPrice: Boolean(p.showPrice) && Number(p.price) > 0,
    priceUnitAr: p.priceUnitAr || 'ر.س',
    priceUnitEn: p.priceUnitEn || 'SAR',
  };
}

interface FeaturedProductsLuxuryProps {
  initialProducts?: IProduct[];
}

export const FeaturedProductsLuxury: React.FC<FeaturedProductsLuxuryProps> = ({ initialProducts }) => {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const [items, setItems] = useState<ProductItem[]>(() => {
    if (initialProducts && initialProducts.length > 0) {
      return initialProducts.map(mapProductToItem);
    }
    return luxuryProducts;
  });

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setItems(initialProducts.map(mapProductToItem));
    }
  }, [initialProducts]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          setItems(data.products.map(mapProductToItem));
        }
      })
      .catch((err) => {
        console.warn('Live products fetch fallback:', err);
      });
  }, []);

  const filters = [
    { id: 'all', labelAr: 'كافة المعروضات', labelEn: 'All Creations' },
    { id: 'dining', labelAr: 'طاولات الطعام', labelEn: 'Dining Tables' },
    { id: 'majlis', labelAr: 'طاولات المجالس', labelEn: 'Majlis Tables' },
    { id: 'decor', labelAr: 'الكونسول والمغاسل', labelEn: 'Consoles & Basins' },
    { id: 'desks', labelAr: 'المكاتب', labelEn: 'Desks' },
  ];

  const filtered = items.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categoryKey === activeFilter;
  });

  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section id="featured-products" className="py-16 sm:py-24 lg:py-28 bg-[#FAF8F5] text-[#1E1D1B] border-t border-[#EAE5DC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 ${
            lang === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] tracking-wider uppercase mb-3">
              <span className="w-6 h-px bg-[#C5A059]" />
              <span>{lang === 'ar' ? 'معرض القطع المميزة' : 'Signature Masterpieces'}</span>
            </div>
            {/* Heading exact as requested: منتجات تجمع بين الفخامة والتفاصيل */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight">
              {lang === 'ar' ? 'منتجات تجمع بين الفخامة والتفاصيل' : 'Creations Blending Grandeur with Detail'}
            </h2>
            <p className="text-sm sm:text-base text-[#6E675D] max-w-xl mt-3 leading-relaxed">
              {lang === 'ar'
                ? 'تشكيلة مختارة من أحدث أعمالنا المنفذة في مصنع القصر الذهبي للدهانات، مصممة بأجود خامات الرخام الطبيعي وفق المقاسات المعتمدة.'
                : 'A curated selection of our bespoke furniture and sculpted stone creations tailored to custom architectural orders.'}
            </p>
          </div>

          <Link
            href="/quotation"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1E1D1B] hover:text-[#C5A059] transition-colors group shrink-0"
          >
            <span>{lang === 'ar' ? 'طلب تفصيل قطعة خاصة بمقاسك' : 'Commission a Bespoke Piece'}</span>
            <Arrow
              className={`w-4 h-4 text-[#C5A059] transition-transform ${
                lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </Link>
        </div>

        {/* Minimalist Filter Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 mb-10 sm:mb-14 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[40px] ${
                activeFilter === f.id
                  ? 'bg-[#1E1D1B] text-[#D8B369] shadow-lg border border-[#C5A059]/40'
                  : 'bg-white text-[#6E675D] hover:text-[#1E1D1B] hover:bg-[#F2EDE4] border border-[#EAE5DC]'
              }`}
            >
              {lang === 'ar' ? f.labelAr : f.labelEn}
            </button>
          ))}
        </div>

        {/* Product Cards Gallery — Clean, Frameless Luxury Presentation */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{
                  opacity: 0,
                  x: idx % 2 === 0 ? 50 : -50,
                  y: 30,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: false, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 4) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#EAE5DC] hover:border-[#C5A059]"
              >
                <div>
                  {/* High-Resolution Photo Frame */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#ECE7DC]">
                    <img
                      src={item.image}
                      alt={lang === 'ar' ? item.titleAr : item.titleEn}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                    />
                    <div
                      className={`absolute top-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-[#D8B369] border border-white/10 ${
                        lang === 'ar' ? 'right-4' : 'left-4'
                      }`}
                    >
                      {lang === 'ar' ? item.categoryAr : item.categoryEn}
                    </div>

                    {/* Price Tag on Image (ظاهر فقط إذا تم تفعيل خيار إظهار السعر) */}
                    {item.showPrice && item.price && (
                      <div
                        className={`absolute top-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-[#E8CD8C] border border-[#C5A059]/40 flex items-center gap-1.5 font-mono shadow-md ${
                          lang === 'ar' ? 'left-4' : 'right-4'
                        }`}
                      >
                        <Tag className="w-3 h-3 text-[#C5A059]" />
                        <span>{Number(item.price).toLocaleString('en-US')} {lang === 'ar' ? (item.priceUnitAr || 'ر.س') : (item.priceUnitEn || 'SAR')}</span>
                      </div>
                    )}
                  </div>

                  {/* Product Card Details */}
                  <div
                    className={`p-6 space-y-2 ${
                      lang === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider block">
                      {lang === 'ar' ? item.materialAr : item.materialEn}
                    </span>

                    <h3 className="text-base font-bold text-[#1E1D1B] group-hover:text-[#C5A059] transition-colors leading-snug">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>

                    <p className="text-xs text-[#6E675D] line-clamp-2 leading-relaxed">
                      {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                    </p>

                    <div className="pt-3 border-t border-[#EAE5DC] text-[11px] text-[#8C8377] flex items-center justify-between">
                      <span>{lang === 'ar' ? item.dimensionsAr : item.dimensionsEn}</span>
                      <span className="text-[#C5A059] font-bold">{lang === 'ar' ? 'نخب أول' : 'First-Grade'}</span>
                    </div>

                    {/* Price Row / حالة السعر */}
                    {item.showPrice && item.price ? (
                      <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between text-xs">
                        <span className="text-[#8C8377]">{lang === 'ar' ? 'السعر المعلن:' : 'Starting Price:'}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-bold text-[#1E1D1B] font-mono text-sm">
                            {Number(item.price).toLocaleString('en-US')}
                          </span>
                          <span className="text-[#C5A059] font-bold text-[11px]">
                            {lang === 'ar' ? (item.priceUnitAr || 'ر.س') : (item.priceUnitEn || 'SAR')}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between text-xs">
                        <span className="text-[#8C8377]">{lang === 'ar' ? 'التسعير:' : 'Pricing:'}</span>
                        <span className="text-[11px] text-[#C5A059] font-semibold bg-[#C5A059]/10 px-2.5 py-0.5 rounded-lg border border-[#C5A059]/20">
                          {lang === 'ar' ? 'حسب المقاس والطلب' : 'Custom Quoted'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions (Strictly NO PRICES, NO CART) */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="px-3 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EDE4] border border-[#EAE5DC] text-[#1E1D1B] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
                  </button>

                  <Link
                    href={`/contact?piece=${encodeURIComponent(lang === 'ar' ? item.titleAr : item.titleEn)}`}
                    className="px-4 py-2.5 rounded-xl bg-[#1E1D1B] hover:bg-black text-[#D8B369] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="whitespace-nowrap">{lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick View Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#C5A059]/40 relative ${
                lang === 'ar' ? 'text-right' : 'text-left'
              }`}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                aria-label="Close"
                className={`absolute top-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-all ${
                  lang === 'ar' ? 'left-4' : 'right-4'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-[#1E1D1B]">
                <img
                  src={selectedProduct.image}
                  alt={lang === 'ar' ? selectedProduct.titleAr : selectedProduct.titleEn}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute bottom-4 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-[#D8B369] ${
                    lang === 'ar' ? 'right-4' : 'left-4'
                  }`}
                >
                  {lang === 'ar'
                    ? `${selectedProduct.categoryAr} • ${selectedProduct.materialAr}`
                    : `${selectedProduct.categoryEn} • ${selectedProduct.materialEn}`}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E1D1B]">
                    {lang === 'ar' ? selectedProduct.titleAr : selectedProduct.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E675D] leading-relaxed mt-2">
                    {lang === 'ar' ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#EAE5DC]">
                  <span className="text-xs font-bold text-[#C5A059] block">
                    {lang === 'ar' ? 'المواصفات الفنية ومميزات التصنيع:' : 'Technical Specifications & Craftsmanship:'}
                  </span>
                  {(lang === 'ar' ? selectedProduct.specsAr : selectedProduct.specsEn).map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#252420]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-[#8C8377] flex items-center justify-between pt-2 border-t border-[#EAE5DC]">
                  <span>
                    {lang === 'ar'
                      ? `المقاس المعتمد: ${selectedProduct.dimensionsAr}`
                      : `Standard Dimensions: ${selectedProduct.dimensionsEn}`}
                  </span>
                  <span className="text-[#1E1D1B] font-semibold">
                    {lang === 'ar' ? 'إمكانية التعديل حسب المخطط متوفرة' : 'Custom Dimensions Available Upon Request'}
                  </span>
                </div>

                {/* Price Box inside Modal */}
                {selectedProduct.showPrice && selectedProduct.price ? (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#C5A059]/15 text-[#C5A059]">
                        <Tag className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#1E1D1B]">
                        {lang === 'ar' ? 'السعر الاسترشادي المعتمد:' : 'Certified Reference Price:'}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#1E1D1B] font-mono">
                        {Number(selectedProduct.price).toLocaleString('en-US')}
                      </span>
                      <span className="text-xs font-bold text-[#C5A059]">
                        {lang === 'ar' ? (selectedProduct.priceUnitAr || 'ر.س') : (selectedProduct.priceUnitEn || 'SAR')}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#6E675D] flex items-center justify-between">
                    <span>{lang === 'ar' ? 'التسعير:' : 'Pricing:'}</span>
                    <strong className="text-[#C5A059]">
                      {lang === 'ar' ? 'يُحدد حسب المخطط والمقاس المختار (طلب تسعير)' : 'Quoted per approved blueprint & sizes'}
                    </strong>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href={`/quotation?piece=${encodeURIComponent(lang === 'ar' ? selectedProduct.titleAr : selectedProduct.titleEn)}`}
                    className="flex-1 py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-sm text-center shadow-lg transition-all"
                  >
                    {lang === 'ar' ? 'طلب عرض سعر لهذه القطعة بمقاسك' : 'Request Quotation for Custom Size'}
                  </Link>

                  <a
                    href={`https://wa.me/966530200529?text=${encodeURIComponent(
                      lang === 'ar'
                        ? `مرحباً، أود الاستفسار وطلب تسعير لقطعة: ${selectedProduct.titleAr}`
                        : `Hello, I would like to inquire about: ${selectedProduct.titleEn}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 rounded-full bg-[#1E1D1B] hover:bg-black text-[#D8B369] font-semibold text-sm transition-all"
                  >
                    {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
