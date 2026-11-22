'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { Layers, FileDown, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface MaterialItem {
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
  thicknessOptions: string[];
  technicalSpecsAr?: string[];
  technicalSpecsEn?: string[];
}

interface Props {
  materials: MaterialItem[];
}

export const MaterialsClientView: React.FC<Props> = ({ materials }) => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <main className="flex-1 pt-28 sm:pt-32 pb-16 sm:pb-24">
      {/* Hero Header */}
      <div className="bg-[#081B33] text-white py-14 sm:py-20 mb-12 sm:mb-16 relative overflow-hidden border-b border-[#D4A63D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D233F] border border-[#D4A63D]/40 text-[#D4A63D] text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5 text-[#D4A63D]" />
            <span>{lang === 'ar' ? 'كتالوج الخامات والتشطيبات' : 'Finishes & Materials Catalog'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            {lang === 'ar' ? 'كتالوج دهانات جوتن وخامات الديكور الحديثة' : 'JOTUN Paints & Modern Decor Materials'}
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'تشكيلة معتمدة من أجود دهانات جوتن فينوماستيك، وألواح بديل الرخام، وشرائح بديل الخشب WPC وبانوهات الفوم بالمنطقة الشرقية.'
              : 'Certified selection of premium JOTUN Fenomastic paints, marble alternative sheets, WPC fluted wood, and foam mouldings.'}
          </p>
        </div>
      </div>

      {/* Materials Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className={`bg-white rounded-3xl overflow-hidden border border-[#EAE5DC] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group ${
                lang === 'ar' ? 'text-right' : 'text-left'
              }`}
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-[#1E1D1B]">
                  <img
                    src={mat.coverImage}
                    alt={lang === 'ar' ? mat.titleAr : mat.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter contrast-[1.04]"
                  />
                  <div
                    className={`absolute top-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-[#D8B369] border border-white/10 ${
                      lang === 'ar' ? 'right-4' : 'left-4'
                    }`}
                  >
                    {lang === 'ar' ? mat.categoryAr : mat.categoryEn}
                  </div>
                </div>

                <div className="p-6 space-y-3.5">
                  <h2 className="text-lg sm:text-xl font-bold text-[#1E1D1B] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {lang === 'ar' ? mat.titleAr : mat.titleEn}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#6E675D] line-clamp-3 leading-relaxed">
                    {lang === 'ar' ? mat.descriptionAr : mat.descriptionEn}
                  </p>

                  {/* Thickness tags */}
                  <div className="space-y-2 pt-3 border-t border-[#EAE5DC]">
                    <div className="flex items-center gap-2 text-xs text-[#1E1D1B]">
                      <span className="text-[#8C8377] font-semibold">
                        {lang === 'ar' ? 'السماكات:' : 'Thickness:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {mat.thicknessOptions.map((th, i) => (
                          <span
                            key={i}
                            className="bg-[#FAF8F5] px-2 py-0.5 rounded text-[11px] font-medium border border-[#EAE5DC] text-[#4A453E]"
                          >
                            {th}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#1E1D1B]">
                      <span className="text-[#8C8377] font-semibold">
                        {lang === 'ar' ? 'الألوان:' : 'Colors:'}
                      </span>
                      <span className="text-xs text-[#6E675D]">
                        {mat.colors.join(lang === 'ar' ? '، ' : ', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/materials/${mat.slug}`}
                    className="flex-1 py-3 px-4 text-center rounded-xl bg-[#FAF8F5] hover:bg-[#F2EDE4] border border-[#EAE5DC] text-[#1E1D1B] font-bold text-xs transition-colors"
                  >
                    {lang === 'ar' ? 'المواصفات الفنية' : 'Technical Specs'}
                  </Link>
                  <Link
                    href={`/contact?material=${encodeURIComponent(lang === 'ar' ? mat.titleAr : mat.titleEn)}`}
                    className="py-3 px-5 rounded-xl bg-[#1E1D1B] hover:bg-black text-[#D8B369] font-bold text-xs transition-colors shadow-sm text-center whitespace-nowrap shrink-0"
                  >
                    <span className="whitespace-nowrap">{lang === 'ar' ? 'طلب عرض سعر' : 'Get Quote'}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

