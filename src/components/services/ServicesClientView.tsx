'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/layout/LanguageContext';
import { CheckCircle, ArrowLeft, ArrowRight, Paintbrush, MessageCircle } from 'lucide-react';
import { PageHeroHeader } from '@/components/common/PageHeroHeader';

interface ServiceItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverImage: string;
  featuresAr: string[];
  featuresEn?: string[];
}

interface Props {
  services: ServiceItem[];
}

export const ServicesClientView: React.FC<Props> = ({ services }) => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <main className="flex-1 pb-16 sm:pb-24">
      {/* Hero Banner with Architectural Photo Background */}
      <PageHeroHeader
        badgeText={lang === 'ar' ? 'خدمات الدهانات والتشطيبات الحديثة' : 'Modern Painting & Decor Services'}
        badgeIcon={Paintbrush}
        title={lang === 'ar' ? 'خدمات القصر الذهبي للدهانات والديكورات' : 'Our Professional Painting & Decor Services'}
        description={
          lang === 'ar'
            ? 'مجموعة متكاملة من خدمات الدهانات السكنية والتجارية، تشطيبات جوتن الأصلية، ديكورات بديل الرخام وبديل الخشب، دهان الأسقف والأبواب بالخبر والدمام والقطيف.'
            : 'Complete residential and commercial painting solutions, genuine JOTUN finishes, marble & wood alternatives, and ceiling work across Eastern Province.'
        }
        bgImage="/images/services/service-interior.webp"
        ctaWhatsAppText={lang === 'ar' ? 'احجز الخدمة مع خصم 30%' : 'Book Service With 30% Off'}
      />

      {/* Services Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group ${
                lang === 'ar' ? 'text-right' : 'text-left'
              }`}
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-[#081B33]">
                  <img
                    src={svc.coverImage}
                    alt={lang === 'ar' ? svc.titleAr : svc.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081B33]/85 via-transparent to-transparent" />
                  <h2 className="absolute bottom-4 right-4 left-4 text-lg sm:text-xl font-bold text-white drop-shadow">
                    {lang === 'ar' ? svc.titleAr : svc.titleEn}
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {lang === 'ar' ? svc.shortDescAr : svc.shortDescEn}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    {(lang === 'ar' ? svc.featuresAr : (svc.featuresEn || svc.featuresAr))
                      .slice(0, 3)
                      .map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-4 h-4 text-[#D4A63D] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="flex-1 py-3 px-4 text-center rounded-xl bg-[#FAF8F5] hover:bg-[#F2EDE4] border border-slate-200 text-[#081B33] font-bold text-xs transition-colors"
                  >
                    {lang === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'}
                  </Link>
                  <a
                    href={`https://wa.me/966561095508?text=${encodeURIComponent(
                      lang === 'ar'
                        ? `مرحباً القصر الذهبي، أود الاستفسار وطلب تسعير لخدمة: ${svc.titleAr}`
                        : `Hello Golden Palace, I would like to inquire about: ${svc.titleEn}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-colors shadow-sm text-center flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'طلب تسعير' : 'Inquire'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
