'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/layout/LanguageContext';
import { BookOpen, Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { PageHeroHeader } from '@/components/common/PageHeroHeader';

interface ArticleItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn?: string;
  excerptAr: string;
  excerptEn?: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  readTime: string;
}

interface Props {
  articles: ArticleItem[];
}

export const BlogClientView: React.FC<Props> = ({ articles }) => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <main className="flex-1 pb-16 sm:pb-24">
      {/* Hero Header with Architectural Photo Background */}
      <PageHeroHeader
        badgeText={lang === 'ar' ? 'مدونة القصر الذهبي للدهانات' : 'Golden Palace Paint & Decor Journal'}
        badgeIcon={BookOpen}
        title={lang === 'ar' ? 'أفكار ونصائح الدهانات والديكورات الحديثة' : 'Modern Paint & Interior Decor Insights'}
        description={
          lang === 'ar'
            ? 'دليل شامل لاختيار ألوان دهانات جوتن الأصلية، تنسيق ديكورات بديل الرخام وبديل الخشب، وتشطيب الأسقف والأبواب بالمنطقة الشرقية.'
            : 'Expert guides on selecting JOTUN colors, styling marble & wood alternative panelling, and ceiling finishing in Eastern Province.'
        }
        bgImage="/images/services/service-apartments.webp"
        ctaWhatsAppText={lang === 'ar' ? 'استشارة مجانية مع مهندس الديكور' : 'Free Decor Consultation'}
      />

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -7 }}
              className="luxury-card rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl border border-[#EAE5DC] transition-all duration-300"
            >
              <Link
                href={`/blog/${art.slug}`}
                className={`group flex flex-col justify-between h-full ${
                  lang === 'ar' ? 'text-right' : 'text-left'
                }`}
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#1E1D1B]">
                    <img
                      src={art.coverImage || (art as any).image || '/images/hero/hero-living-room.webp'}
                      alt={lang === 'ar' ? art.titleAr : (art.titleEn || art.titleAr)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter contrast-[1.04] ease-out"
                    />
                    <div
                      className={`absolute top-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-[#D8B369] border border-white/10 ${
                        lang === 'ar' ? 'right-4' : 'left-4'
                      }`}
                    >
                      {art.category || 'نصائح وأفكار دهانات'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className={`flex items-center gap-3 text-xs text-[#8C8377] ${lang === 'ar' ? 'justify-start' : 'justify-start'}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{art.publishedAt || (art as any).date || '2026-02-15'}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{lang === 'ar' ? (art.readTime || '4 دقائق قراءة') : '4 min read'}</span>
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-[#1E1D1B] group-hover:text-[#C5A059] transition-colors line-clamp-2 leading-snug">
                      {lang === 'ar' ? art.titleAr : (art.titleEn || art.titleAr)}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#6E675D] line-clamp-3 leading-relaxed">
                      {lang === 'ar' ? art.excerptAr : (art.excerptEn || art.excerptAr)}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#EAE5DC] flex items-center justify-between text-xs font-bold text-[#1E1D1B] group-hover:text-[#C5A059] transition-colors">
                    <span>{lang === 'ar' ? 'قراءة المقال كاملاً' : 'Read Full Article'}</span>
                    <Arrow
                      className={`w-4 h-4 text-[#C5A059] transition-transform ${
                        lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

