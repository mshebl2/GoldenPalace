'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

const realProjects = [
  {
    id: 'proj-1',
    titleAr: 'تشطيب واجهة فيلا سكنية مودرن مع إضاءة معمارية',
    titleEn: 'Modern Villa Facade & Architectural Lighting',
    locationAr: 'حي الحزام الذهبي — الخبر',
    locationEn: 'Al-Hizam Al-Dhahabi — Khobar',
    categoryKey: 'facades',
    categoryAr: 'واجهات خارجية',
    categoryEn: 'Exterior Facades',
    materialAr: 'دهانات بروفايل مقاومة للرطوبة والحرارة بتشطيب حجري راقي',
    materialEn: 'Weather-resistant textured exterior coatings',
    image: '/images/portfolio/project-1.webp',
    spanClass: 'sm:col-span-2 lg:col-span-2 aspect-[16/10]',
  },
  {
    id: 'proj-2',
    titleAr: 'جدار خلفية مجلس ببديل الرخام وبديل الخشب وإضاءة ليد',
    titleEn: 'Marble & Wood Alternative Reception Feature Wall',
    locationAr: 'حي الشاطئ — الدمام',
    locationEn: 'Al-Shati — Dammam',
    categoryKey: 'decor',
    categoryAr: 'ديكورات جدارية',
    categoryEn: 'Wall Decor',
    materialAr: 'ألواح بديل رخام لامعة مع شرائح بديل الخشب وخطوط ليد',
    materialEn: 'Gloss marble sheets, acoustic wood slats, and recessed LED',
    image: '/images/portfolio/project-2.webp',
    spanClass: 'aspect-[4/3]',
  },
  {
    id: 'proj-3',
    titleAr: 'صالة معيشة بجدار كحلي ملكي وبانوهات فوم كلاسيك',
    titleEn: 'Living Room with Royal Navy Wall & Foam Mouldings',
    locationAr: 'حي المجيدية — القطيف',
    locationEn: 'Al-Majeediyah — Qatif',
    categoryKey: 'interior',
    categoryAr: 'دهانات داخلية',
    categoryEn: 'Interior Paints',
    materialAr: 'دهان جوتن كحلي مخملي فاخر مع إطارات بانوهات فوم ناصعة',
    materialEn: 'Velvet royal navy JOTUN finish with classic wall mouldings',
    image: '/images/portfolio/project-3.webp',
    spanClass: 'aspect-[4/3]',
  },
  {
    id: 'proj-4',
    titleAr: 'سقف جبس بورد مودرن بإضاءة دائرية مدمجة وبيوت نور',
    titleEn: 'Modern Gypsum Ceiling with Circular Recessed Lighting',
    locationAr: 'حي الظهران — الخبر',
    locationEn: 'Dhahran — Khobar',
    categoryKey: 'ceilings',
    categoryAr: 'أسقف وجبس بورد',
    categoryEn: 'Gypsum Ceilings',
    materialAr: 'جبس بورد نخب أول مع معالجة فواصل ودهان مطفي فائق البياض',
    materialEn: 'First-grade gypsum board, seamless seam finish, dead-flat paint',
    image: '/images/portfolio/project-4.webp',
    spanClass: 'sm:col-span-2 lg:col-span-2 aspect-[16/10]',
  },
];

export const PortfolioEditorial: React.FC = () => {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState('all');
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const categories = [
    { id: 'all', labelAr: 'كافة الأعمال', labelEn: 'All Projects' },
    { id: 'interior', labelAr: 'دهانات داخلية', labelEn: 'Interior' },
    { id: 'decor', labelAr: 'ديكورات وبديل رخام', labelEn: 'Wall Decor' },
    { id: 'ceilings', labelAr: 'أسقف وجبس بورد', labelEn: 'Ceilings' },
    { id: 'facades', labelAr: 'واجهات ومباني', labelEn: 'Facades' },
  ];

  const filtered = realProjects.filter((p) => {
    if (filter === 'all') return true;
    return p.categoryKey === filter;
  });

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-white text-[#1E1D1B] border-t border-[#EAE5DC] overflow-hidden">
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
              <span>{lang === 'ar' ? 'سجل الإنجازات والمشاريع' : 'Selected Projects'}</span>
            </div>
            {/* Heading exact as requested: من أعمالنا */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight">
              {lang === 'ar' ? 'من أعمالنا' : 'From Our Selected Portfolio'}
            </h2>
            <p className="text-sm sm:text-base text-[#6E675D] max-w-xl mt-3 leading-relaxed">
              {lang === 'ar'
                ? 'نماذج واقعية من مشاريع الفلل والمنازل والمجالس التي تولى فريق القصر الذهبي تنفيذ دهاناتها وديكوراتها بالمنطقة الشرقية (الدمام - الخبر - القطيف).'
                : 'Real photography from residential villas and modern spaces executed by the Golden Palace team in the Eastern Province.'}
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1E1D1B] hover:text-[#C5A059] transition-colors group shrink-0"
          >
            <span>{lang === 'ar' ? 'استعراض كافة الأعمال' : 'View All Projects'}</span>
            <Arrow
              className={`w-4 h-4 text-[#C5A059] transition-transform ${
                lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-14 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                filter === c.id
                  ? 'bg-[#1E1D1B] text-[#D8B369] shadow-lg border border-[#C5A059]/40'
                  : 'bg-[#FAF8F5] text-[#6E675D] hover:text-[#1E1D1B] hover:bg-[#F2EDE4] border border-[#EAE5DC]'
              }`}
            >
              {lang === 'ar' ? c.labelAr : c.labelEn}
            </button>
          ))}
        </div>

        {/* Editorial Masonry Grid with Dynamic Left/Right Motion */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filtered.map((proj, idx) => (
              <motion.div
                layout
                key={proj.id}
                initial={{
                  opacity: 0,
                  x: idx % 2 === 0 ? 50 : -50,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{ once: false, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.65,
                  delay: (idx % 2) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className={proj.spanClass}
              >
                <Link
                  href="/projects"
                  className="group relative rounded-3xl overflow-hidden border border-[#EAE5DC] bg-[#FAF8F5] shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 block w-full h-full"
                >
                  <img
                    src={proj.image}
                    alt={lang === 'ar' ? proj.titleAr : proj.titleEn}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-106 filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Overlaid Badges */}
                  <div
                    className={`absolute top-5 flex items-center gap-2 ${
                      lang === 'ar' ? 'right-5' : 'left-5'
                    }`}
                  >
                    <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-[#D8B369] border border-white/10">
                      {lang === 'ar' ? proj.categoryAr : proj.categoryEn}
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs text-white/90 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#C5A059]" />
                      <span>{lang === 'ar' ? proj.locationAr : proj.locationEn}</span>
                    </span>
                  </div>

                  {/* Bottom Meta */}
                  <div
                    className={`absolute bottom-6 right-6 left-6 text-white space-y-1.5 ${
                      lang === 'ar' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#D8B369] transition-colors">
                      {lang === 'ar' ? proj.titleAr : proj.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#EAE5DC]/80 line-clamp-1 font-normal">
                      {lang === 'ar' ? proj.materialAr : proj.materialEn}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
