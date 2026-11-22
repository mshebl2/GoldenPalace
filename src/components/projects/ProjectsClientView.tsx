'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Award, ArrowLeft, ArrowRight, Eye, Calendar, MapPin, Paintbrush, MessageCircle } from 'lucide-react';
import { PageHeroHeader } from '@/components/common/PageHeroHeader';

interface ProjectItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: string;
  locationAr: string;
  locationEn: string;
  shortDescAr: string;
  shortDescEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverImage: string;
  completionDate?: string;
}

interface Props {
  projects: ProjectItem[];
}

export const ProjectsClientView: React.FC<Props> = ({ projects }) => {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveFilter(cat);
    }
  }, [searchParams]);

  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const categories = [
    { id: 'all', labelAr: 'كافة الأعمال', labelEn: 'All Works' },
    { id: 'interior', labelAr: 'دهانات داخلية', labelEn: 'Interior' },
    { id: 'exterior', labelAr: 'دهانات خارجية وواجهات', labelEn: 'Exterior & Facades' },
    { id: 'decor', labelAr: 'ديكورات وبديل رخام', labelEn: 'Wall Decor' },
    { id: 'ceilings', labelAr: 'أسقف وجبس بورد', labelEn: 'Ceilings' },
    { id: 'doors', labelAr: 'دهان وتجديد أبواب', labelEn: 'Doors' },
  ];

  const matchesCategory = (projCat: string, filterId: string) => {
    if (filterId === 'all') return true;
    const cat = (projCat || '').toLowerCase();

    if (filterId === 'interior' || filterId === 'دهانات داخلية') {
      return cat.includes('داخل') || cat.includes('interior');
    }
    if (filterId === 'exterior' || filterId === 'دهانات خارجية') {
      return cat.includes('خارج') || cat.includes('واجه') || cat.includes('بروفايل');
    }
    if (filterId === 'decor' || filterId === 'ديكورات') {
      return cat.includes('ديكور') || cat.includes('رخام') || cat.includes('خشب');
    }
    if (filterId === 'ceilings' || filterId === 'أسقف') {
      return cat.includes('سقف') || cat.includes('جبس') || cat.includes('ceiling');
    }
    if (filterId === 'doors' || filterId === 'أبواب') {
      return cat.includes('باب') || cat.includes('أبواب') || cat.includes('door');
    }

    return cat.includes(filterId);
  };

  const filtered = projects.filter((p) => matchesCategory(p.category, activeFilter));

  return (
    <main className="flex-1 pb-16 sm:pb-24">
      {/* Hero Header with Architectural Photo Background */}
      <PageHeroHeader
        badgeText={lang === 'ar' ? 'معرض الأعمال والمشاريع المنفذة' : 'Completed Projects & Works'}
        badgeIcon={Award}
        title={lang === 'ar' ? 'معرض أعمال القصر الذهبي' : 'Our Executed Projects'}
        description={
          lang === 'ar'
            ? 'نماذج حقيقية من تشطيبات الفلل والمنازل السكنية، دهانات جوتن الحديثة، ديكورات بديل الرخام والخشب، وتشطيب الأسقف والأبواب بالخبر والدمام والقطيف.'
            : 'Showcasing our completed residential painting, JOTUN wall finishes, marble & wood panelling, and ceilings across Eastern Province.'
        }
        bgImage="/images/services/service-villas.webp"
        ctaWhatsAppText={lang === 'ar' ? 'طلب معاينة لمشروعك' : 'Request Project Survey'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Filters Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-3 scrollbar-none">
          {categories.map((c) => {
            const isActive = activeFilter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                className={`py-2.5 px-5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${isActive
                  ? 'bg-[#D4A63D] text-black shadow-md'
                  : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                  }`}
              >
                {lang === 'ar' ? c.labelAr : c.labelEn}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, idx) => {
              const projectImg = proj.coverImage || (proj as any).image || '/images/hero/hero-living-room.webp';
              const catMap: Record<string, string> = {
                exterior: 'دهانات خارجية وواجهات',
                interior: 'دهانات داخلية',
                decor: 'ديكورات وبديل رخام',
                ceilings: 'أسقف وجبس بورد',
                doors: 'دهان وتجديد أبواب',
              };
              const catLabel = catMap[proj.category] || proj.category;
              const waQuoteUrl = `https://wa.me/966561095508?text=${encodeURIComponent(
                `مرحباً القصر الذهبي، أود الاستفسار وطلب تنفيذ عمل مماثل لمشروع: ${proj.titleAr} المعروض في معرض أعمالكم.`
              )}`;

              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -7 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group luxury-card"
                >
                  <div>
                    <Link href={`/projects/${proj.slug}`} className="block relative aspect-[16/11] overflow-hidden bg-slate-100">
                      <img
                        src={projectImg}
                        alt={lang === 'ar' ? proj.titleAr : proj.titleEn}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081B33]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#081B33]/90 text-[11px] font-bold text-[#F5D77A] border border-[#D4A63D]/40 backdrop-blur-sm shadow-sm">
                        {catLabel}
                      </span>
                    </Link>

                    <div className="p-5 sm:p-6 space-y-3">
                      <Link href={`/projects/${proj.slug}`}>
                        <h3 className="text-base sm:text-lg font-bold text-[#081B33] group-hover:text-[#A87818] transition-colors line-clamp-1">
                          {lang === 'ar' ? proj.titleAr : proj.titleEn}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {lang === 'ar' ? (proj.shortDescAr || proj.descriptionAr) : (proj.shortDescEn || proj.descriptionEn)}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#D4A63D]" />
                          <span>{lang === 'ar' ? proj.locationAr : proj.locationEn}</span>
                        </span>
                        {proj.completionDate && (
                          <span className="font-mono text-slate-400 text-[11px]">{proj.completionDate}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 flex items-center gap-2">
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="flex-1 py-2.5 px-3 text-center rounded-xl bg-slate-50 hover:bg-slate-100 text-[#081B33] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
                    >
                      <span>{lang === 'ar' ? 'تفاصيل المشروع' : 'View Project'}</span>
                      <Arrow className="w-3.5 h-3.5" />
                    </Link>

                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      href={waQuoteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-sm shrink-0"
                      title="طلب تنفيذ مماثل عبر واتساب"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>طلب مماثل</span>
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};
