'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { ArrowLeft, ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';

const articles = [
  {
    id: 'art-1',
    slug: 'calacatta-marble-tables-guide',
    titleAr: 'دليل اختيار وتصميم طاولات الطعام من رخام كلكتا الإيطالي',
    titleEn: 'The Connoisseur’s Guide to Italian Calacatta Dining Tables',
    excerptAr: 'كيف تختار لوح الرخام المثالي لطاولة طعامك وما هي أحدث صيحات الحواف المشطوفة والقواعد المعمارية المتناسقة.',
    excerptEn: 'How to select the perfect Calacatta slab and navigate the latest trends in beveled edges and pedestals.',
    image: '/images/products/tables-3.webp',
    categoryAr: 'طاولات وديكور',
    categoryEn: 'Tables & Decor',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    dateAr: '15 يناير 2025',
    dateEn: 'Jan 15, 2025',
  },
  {
    id: 'art-2',
    slug: 'backlit-onyx-interior-trends',
    titleAr: 'سحر الأونيكس الطبيعي المضيء في المجالس والصالات الراقية',
    titleEn: 'The Magic of Translucent Backlit Onyx in Luxury Majlis Spaces',
    excerptAr: 'كيف تحول الألواح شبه الشفافة ذات الإضاءة الخلفية الجدران وطاولات القهوة إلى قطع فنية تنبض بالحياة والسكينة.',
    excerptEn: 'How translucent backlit onyx panels turn walls and coffee tables into glowing architectural jewelry.',
    image: '/images/products/sets-40.webp',
    categoryAr: 'تصميم داخلي',
    categoryEn: 'Interior Architecture',
    readTimeAr: '5 دقائق قراءة',
    readTimeEn: '5 min read',
    dateAr: '20 يناير 2025',
    dateEn: 'Jan 20, 2025',
  },
  {
    id: 'art-3',
    slug: 'bespoke-marble-furniture-craft',
    titleAr: 'الأثاث الحجري حسب الطلب: من الفكرة إلى التحفة المنحوتة',
    titleEn: 'Bespoke Marble Furniture: From Concept to Sculpted Masterpiece',
    excerptAr: 'خطوات تفصيل طاولات المكاتب والمجالس والمغاسل الخاصة بدقة هندسية تلبي تطلعات كبار المصممين والعملاء.',
    excerptEn: 'The step-by-step artisanal journey of commissioning custom marble furniture and monolithic sinks.',
    image: '/images/products/decor-57.webp',
    categoryAr: 'تصنيع حسب الطلب',
    categoryEn: 'Bespoke Fabrication',
    readTimeAr: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    dateAr: '28 يناير 2025',
    dateEn: 'Jan 28, 2025',
  },
];

export const JournalEditorial: React.FC = () => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#FAF8F5] text-[#1E1D1B] border-t border-[#EAE5DC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 ${
            lang === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] tracking-wider uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'ar' ? 'المجلة والدراسات الحجرية' : 'The Stone Journal'}</span>
            </div>
            {/* Heading exact as requested: من عالم الرخام والتصميم */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight">
              {lang === 'ar' ? 'من عالم الرخام والتصميم' : 'From the World of Marble & Design'}
            </h2>
            <p className="text-base text-[#6E675D] max-w-xl mt-3 leading-relaxed">
              {lang === 'ar'
                ? 'مقالات وإرشادات معمارية متخصصة في اختيار الخامات الطبيعية، والعناية بالرخام، وأحدث صيحات الأثاث الحجري.'
                : 'Architectural insights on natural stone curation, marble maintenance, and bespoke interior living.'}
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1E1D1B] hover:text-[#C5A059] transition-colors group shrink-0"
          >
            <span>{lang === 'ar' ? 'تصفح كافة المقالات' : 'Read All Articles'}</span>
            <Arrow
              className={`w-4 h-4 text-[#C5A059] transition-transform ${
                lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </Link>
        </div>

        {/* 3 Articles Grid — Clean, Frameless Editorial Presentation with Dynamic Scroll Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => {
            const initialX = idx === 0 ? 60 : idx === 2 ? -60 : 0;
            const initialY = idx === 1 ? 50 : 25;

            return (
              <motion.div
                key={art.id}
                initial={{
                  opacity: 0,
                  x: initialX,
                  y: initialY,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="h-full"
              >
                <Link
                  href={`/blog/${art.slug}`}
                  className={`group flex flex-col justify-between h-full bg-white rounded-3xl overflow-hidden border border-[#EAE5DC] hover:border-[#C5A059] shadow-sm hover:shadow-2xl transition-all duration-500 ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div>
                    {/* Article Cover Frame */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE7DC]">
                      <img
                        src={art.image}
                        alt={lang === 'ar' ? art.titleAr : art.titleEn}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                      />
                      <div
                        className={`absolute top-4 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-[#D8B369] border border-white/10 ${
                          lang === 'ar' ? 'right-4' : 'left-4'
                        }`}
                      >
                        {lang === 'ar' ? art.categoryAr : art.categoryEn}
                      </div>
                    </div>

                    {/* Article Meta & Content */}
                    <div className="p-7 space-y-3">
                      <div className="flex items-center gap-4 text-xs text-[#8C8377]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>{lang === 'ar' ? art.dateAr : art.dateEn}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>{lang === 'ar' ? art.readTimeAr : art.readTimeEn}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-[#1E1D1B] group-hover:text-[#C5A059] transition-colors leading-snug">
                        {lang === 'ar' ? art.titleAr : art.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#6E675D] line-clamp-2 leading-relaxed">
                        {lang === 'ar' ? art.excerptAr : art.excerptEn}
                      </p>
                    </div>
                  </div>

                  <div className="p-7 pt-0">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] group-hover:underline">
                      <span>{lang === 'ar' ? 'قراءة المقال' : 'Read Article'}</span>
                      <Arrow
                        className={`w-3.5 h-3.5 transition-transform ${
                          lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                        }`}
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
