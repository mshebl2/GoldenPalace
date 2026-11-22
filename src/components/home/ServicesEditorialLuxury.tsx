'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { ArrowLeft, ArrowRight, ShieldCheck, Ruler, Award, Cpu, Layers } from 'lucide-react';

export const ServicesEditorialLuxury: React.FC = () => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const services = [
    {
      titleAr: 'دهانات داخلية وخارجية بأجود خامات جوتن',
      titleEn: 'Interior & Exterior Painting with Genuine JOTUN',
      descAr: 'تنفيذ دهانات الصالات والغرف والمجالس والواجهات بأحدث درجات الألوان الهادئة القابلة للغسيل والمقاومة للرطوبة وفق أعلى معايير التأسيس.',
      descEn: 'Comprehensive interior & exterior painting using premium washable JOTUN coatings with multi-layer surface prep.',
      image: '/images/services/interior.webp',
      badgeAr: 'دهانات جوتن الأصلية',
      badgeEn: 'Original JOTUN',
      link: '/services/interior-exterior-paints',
      initialX: 70,
    },
    {
      titleAr: 'الديكورات الجدارية وبديل الرخام والخشب',
      titleEn: 'Modern Wall Decor & Marble/Wood Alternatives',
      descAr: 'تركيب ألواح بديل الرخام وبديل الخشب المقاوم للرطوبة وبانوهات الفوم الجدارية مع خطوط إضاءة ليد مخفية تمنح الجدران فخامة فندقية.',
      descEn: 'Acoustic wood slats, moisture-resistant marble sheets, and polyurethane panel mouldings with concealed LED coves.',
      image: '/images/services/decor.webp',
      badgeAr: 'تشطيب فندقي مع ليد',
      badgeEn: 'Hotel-Grade Finish',
      link: '/services/wall-decorations',
      initialX: 0,
      initialY: 60,
    },
    {
      titleAr: 'تصاميم الأسقف الجبسية ودهان الأبواب الحديثة',
      titleEn: 'Gypsum Ceilings & Modern Door Refinishing',
      descAr: 'تنفيذ أسقف الجبس بورد الحديثة وبيوت النور بدهانات مطفية ناصعة البياض، مع تجديد ودهان الأبواب الخشبية بتقنيات الرش الناري الاحترافي.',
      descEn: 'Modern gypsum board ceilings with integrated cove lighting, plus scratch-resistant automotive spray lacquer for doors.',
      image: '/images/services/ceiling.webp',
      badgeAr: 'جبس بورد ورش ناري',
      badgeEn: 'Gypsum & Spray Lacquer',
      link: '/services/ceilings-gypsum',
      initialX: -70,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F4EFE6] relative overflow-hidden border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D5] border border-[#C5A059]/40 text-[#8C6D2E] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>{lang === 'ar' ? 'خدماتنا الهندسية والتنفيذية' : 'Engineering & Execution Services'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1D1B] tracking-tight leading-tight">
              {lang === 'ar' ? 'خدمات متكاملة في الدهانات والتشطيبات الحديثة' : 'Integrated Modern Painting & Finishing Services'}
            </h2>
            <p className="text-[#6E675D] text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'نجمع بين دقة المعالجة الفنية وأجود دهانات جوتن العالمية لنقدم خدمات دهانات وتشطيبات ترتقي بأدق معايير الفخامة والراحة.'
                : 'Combining meticulous surface preparation with certified JOTUN paints to deliver interior finishes that redefine elegance and comfort.'}
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 self-start md:self-auto px-6 py-3.5 rounded-full bg-[#1E1D1B] text-[#D8B369] hover:bg-[#2C2A26] hover:text-white font-medium text-xs sm:text-sm transition-all duration-300 shadow-md group shrink-0"
          >
            <span>{lang === 'ar' ? 'استكشف كافة الخدمات' : 'Explore All Services'}</span>
            <Arrow className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        {/* Services Cards Grid — Alternating dynamic slide from Left and Right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                x: svc.initialX !== undefined ? svc.initialX : (idx % 2 === 0 ? 50 : -50),
                y: svc.initialY || 0,
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
                duration: 0.75,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -10,
                scale: 1.015,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E3DBD0] hover:border-[#C5A059] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1E1D1B]">
                  <img
                    src={svc.image}
                    alt={lang === 'ar' ? svc.titleAr : svc.titleEn}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.96]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#1E1D1B]/85 backdrop-blur-md text-[#D8B369] text-[11px] font-semibold border border-[#C5A059]/30">
                    {lang === 'ar' ? svc.badgeAr : svc.badgeEn}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1E1D1B] leading-snug group-hover:text-[#C5A059] transition-colors">
                    {lang === 'ar' ? svc.titleAr : svc.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E675D] leading-relaxed">
                    {lang === 'ar' ? svc.descAr : svc.descEn}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-7 pt-0">
                <Link
                  href={svc.link}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-[#FAF8F5] group-hover:bg-[#1E1D1B] text-[#1E1D1B] group-hover:text-[#D8B369] border border-[#E3DBD0] group-hover:border-[#C5A059] text-xs font-semibold transition-all duration-300"
                >
                  <span>{lang === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'}</span>
                  <Arrow className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

