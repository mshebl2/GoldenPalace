'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const categories = [
  {
    num: '01',
    id: 'room-offers',
    titleAr: 'عروض وباقات الغرف',
    titleEn: 'Room Painting Packages',
    descAr: 'باقات متكاملة لدهان الغرف بجودة عالية وخامات جوتن الأصلية تشمل المعجون والسنفرة والأساس وجهين تشطيب.',
    descEn: 'Comprehensive room painting packages with genuine JOTUN paints starting from 500 SAR.',
    image: '/images/offers/one-room.webp',
    href: '/products',
    tagAr: 'تبدأ من 500 ريال',
    tagEn: 'From 500 SAR',
  },
  {
    num: '02',
    id: 'ceilings',
    titleAr: 'الأسقف وجبس بورد',
    titleEn: 'Ceilings & Gypsum Board',
    descAr: 'تصميم وتنفيذ أسقف الجبس بورد الحديثة مع فتحات بيوت النور والإضاءة المخفية بدهانات مطفية فائقة البياض.',
    descEn: 'Modern gypsum board ceilings with integrated cove lighting and dead-flat white paint.',
    image: '/images/offers/ceiling.webp',
    href: '/products',
    tagAr: '100 ريال للسقف',
    tagEn: '100 SAR / Ceiling',
  },
  {
    num: '03',
    id: 'wall-decor',
    titleAr: 'بديل الرخام والخشب',
    titleEn: 'Marble & Wood Alternatives',
    descAr: 'تكسيات جدارية عصرية مقاومة للرطوبة والحرارة مع قواطع ليزر وإضاءات ليد مخفية تمنح الصالات فخامة فندقية.',
    descEn: 'Acoustic wood slats, marble panels, and concealed LED lighting for luxury feature walls.',
    image: '/images/portfolio/project-2.webp',
    href: '/products',
    tagAr: 'تشطيب فندقي فاخر',
    tagEn: 'Luxury Hotel Finish',
  },
  {
    num: '04',
    id: 'doors',
    titleAr: 'دهان وتشطيب الأبواب',
    titleEn: 'Door Painting & Lacquer',
    descAr: 'تجديد ودهان الأبواب الخشبية والحديدية بأحدث تقنيات الرش الناري المقاوم للخدش والصدمات.',
    descEn: 'Factory-grade compressor spray lacquer and polyurethane finishes for doors.',
    image: '/images/offers/door.webp',
    href: '/products',
    tagAr: '90 ريال للباب',
    tagEn: '90 SAR / Door',
  },
  {
    num: '05',
    id: 'interior-paints',
    titleAr: 'الدهانات الداخلية والصالات',
    titleEn: 'Interior Living Paints',
    descAr: 'أحدث كتالوجات درجات الألوان الهادئة والعصرية القابلة للغسيل لغرف المعيشة ومجالس الاستقبال.',
    descEn: 'Washable, durable JOTUN interior colors tailored for contemporary living rooms and majlis.',
    image: '/images/portfolio/project-3.webp',
    href: '/services',
    tagAr: 'دهانات جوتن الأصلية',
    tagEn: 'Genuine JOTUN',
  },
  {
    num: '06',
    id: 'facades',
    titleAr: 'تشطيب الواجهات والمباني',
    titleEn: 'Facades & Exterior Finishes',
    descAr: 'تنفيذ بروفايل الواجهات ودهانات مقاومة للعوامل الجوية ورطوبة الساحل الشرقي لحماية وأناقة المبنى.',
    descEn: 'Textured profile exterior finishes engineered to endure Eastern Province weather.',
    image: '/images/services/facade.webp',
    href: '/services',
    tagAr: 'مقاومة تامة للعوامل الجوية',
    tagEn: 'Weather Resistant',
  },
];

export const CategoriesEditorial: React.FC = () => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

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
              <span>{lang === 'ar' ? 'تشكيلات وباقات القصر الذهبي' : 'Golden Palace Packages'}</span>
            </div>
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight">
              {lang === 'ar' ? 'اكتشف باقاتنا وخدماتنا' : 'Discover Our Packages & Services'}
            </h2>
            <p className="text-sm sm:text-base text-[#6E675D] max-w-xl mt-3 leading-relaxed">
              {lang === 'ar'
                ? 'استكشف عروض دهانات الغرف والأسقف والديكورات العصرية المنفذة بأعلى معايير الجودة وخامات جوتن الأصلية.'
                : 'Explore our certified room painting packages, gypsum ceilings, and bespoke modern decor.'}
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1E1D1B] hover:text-[#C5A059] transition-colors group shrink-0"
          >
            <span>{lang === 'ar' ? 'عرض الكتالوج الكامل' : 'View Full Catalog'}</span>
            <Arrow
              className={`w-4 h-4 text-[#C5A059] transition-transform ${
                lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </Link>
        </div>

        {/* Editorial Categories Layout — Clean, Open, Not Boxy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat, idx) => {
            const isWide = idx === 0;

            return (
              <motion.div
                key={cat.id}
                initial={{
                  opacity: 0,
                  x: idx % 2 === 0 ? 45 : -45,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: (idx % 4) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className={isWide ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <Link
                  href={cat.href}
                  className={`group flex flex-col justify-between h-full ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div>
                    {/* Frameless High-End Photo Frame */}
                    <div
                      className={`relative w-full overflow-hidden rounded-3xl bg-[#ECE7DC] shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-transparent group-hover:border-[#C5A059]/40 ${
                        isWide ? 'aspect-[16/10]' : 'aspect-[4/3]'
                      }`}
                    >
                      <img
                        src={cat.image}
                        alt={lang === 'ar' ? cat.titleAr : cat.titleEn}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108 filter contrast-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

                      {/* Corner Index Number */}
                      <div
                        className={`absolute top-3.5 sm:top-4 text-xs font-mono font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 ${
                          lang === 'ar' ? 'right-3.5 sm:right-4' : 'left-3.5 sm:left-4'
                        }`}
                      >
                        {cat.num}
                      </div>
                    </div>

                    {/* Clean Typographic Meta Below the Image */}
                    <div className="pt-4 sm:pt-5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1E1D1B] group-hover:text-[#C5A059] transition-colors leading-snug">
                          {lang === 'ar' ? cat.titleAr : cat.titleEn}
                        </h3>
                        <Arrow
                          className={`w-4 h-4 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-all transform ${
                            lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                          }`}
                        />
                      </div>

                      <p className="text-xs sm:text-sm text-[#6E675D] leading-relaxed line-clamp-2">
                        {lang === 'ar' ? cat.descAr : cat.descEn}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-b border-[#EAE5DC] group-hover:border-[#C5A059] transition-colors" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
