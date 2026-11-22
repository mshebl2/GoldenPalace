'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutEditorialLuxury: React.FC = () => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const [mainImg, setMainImg] = React.useState('/images/products/tables-3.webp');
  const [floatingImg, setFloatingImg] = React.useState('/images/products/sets-40.webp');

  React.useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.aboutMainImage) setMainImg(data.settings.aboutMainImage);
        if (data.settings?.aboutFloatingImage) setFloatingImg(data.settings.aboutFloatingImage);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#FAF8F5] text-[#1E1D1B] relative overflow-hidden">
      {/* Subtle brand pattern background watermark */}
      <div
        className="absolute -right-20 -bottom-20 w-96 h-96 opacity-5 pointer-events-none mix-blend-multiply bg-no-repeat bg-contain"
        style={{ backgroundImage: `url('/brand/logos/logo-emblem-gold-trimmed.png')` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual Column: Large Open Asymmetric Photography */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative">
              {/* Main Image: Monolithic veined marble slab craftsmanship */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl bg-[#EAE5DC] aspect-[4/3] w-full group">
                <img
                  src={mainImg}
                  alt={lang === 'ar' ? 'طاولات وتفصيل الرخام الطبيعي الفاخر بالرياض' : 'Luxury bespoke natural marble craftsmanship'}
                  className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping Floating Inset Image: Curated Slab Yard */}
              <motion.div
                initial={{ opacity: 0, x: -60, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`hidden md:block absolute -bottom-10 w-3/5 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] bg-[#EAE5DC] ${
                  lang === 'ar' ? '-left-6' : '-right-6'
                }`}
              >
                <img
                  src={floatingImg}
                  alt={lang === 'ar' ? 'أطقم مجالس وضيافة رخام طبيعي فاخر' : 'Natural stone majlis reception suites'}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </motion.div>

              {/* Elegant Gold Hairline Corner Accent */}
              <div
                className={`absolute -top-3 w-16 sm:w-24 h-16 sm:h-24 border-t-2 border-[#C5A059]/50 pointer-events-none ${
                  lang === 'ar'
                    ? '-right-3 border-r-2 rounded-tr-2xl'
                    : '-left-3 border-l-2 rounded-tl-2xl'
                }`}
              />
            </div>
          </motion.div>

          {/* Text Column: Pure Quiet Luxury Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-6 space-y-6 sm:space-y-8 ${
              lang === 'ar' ? 'text-right' : 'text-left'
            }`}
          >
            <div className="inline-flex items-center gap-2.5 text-xs font-bold text-[#C5A059] tracking-wider uppercase">
              <span className="w-7 h-px bg-[#C5A059]" />
              <span>{lang === 'ar' ? 'القصر الذهبي — المنطقة الشرقية' : 'Golden Palace — Eastern Province'}</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-[1.3] sm:leading-[1.24]">
              {lang === 'ar' ? 'فخامة الألوان تصنعها دقة التفاصيل' : 'Luxury Colors Shaped by Fine Details'}
            </h2>

            <p className="text-[#55524B] text-sm sm:text-base leading-relaxed sm:leading-loose font-normal">
              {lang === 'ar'
                ? 'في القصر الذهبي للدهانات والديكورات الحديثة، نؤمن أن جمال المساحات لا يقتصر على نوعية الطلاء، بل يتجلى في دقة المعالجة، ونعومة التأسيس، وتناسق الألوان واختيار أرقى الخامات التي تمنح كل جدار وسقف طابعاً معمارياً استثنائياً.'
                : 'At Golden Palace for Modern Paints & Decor, we believe true luxury stems from surface perfection, seamless priming, and color harmony that elevates every living space.'}
            </p>

            <p className="text-[#6E675D] text-xs sm:text-sm leading-relaxed sm:leading-loose">
              {lang === 'ar'
                ? 'نعتمد على أجود دهانات جوتن العالمية، وأحدث تقنيات الرش والتشطيب الناري والبانوهات الجدارية وبديل الرخام، مع فريق من أمهر معلمي وفنيي الدهانات بالمنطقة الشرقية، لنقدم لعملائنا في الدمام والخبر والقطيف تشطيبات راقية تدوم طويلاً.'
                : 'We rely on genuine JOTUN coatings, modern polyurethane mouldings, and marble alternatives, backed by elite painters across Dammam, Khobar, and Qatif.'}
            </p>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-4 border-t border-[#EAE5DC]">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#252420]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'ar' ? 'دهانات جوتن الأصلية المعتمدة 100%' : '100% Genuine JOTUN Paints'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#252420]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'ar' ? 'معالجة دقيقة للشقوق والرطوبة بالمعجون' : 'Complete Crack & Putty Treatment'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#252420]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'ar' ? 'فريق فني متخصص وضمان على جودة التنفيذ' : 'Expert Painters & Guaranteed Quality'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#252420]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'ar' ? 'التزام بالمواعيد ونظافة مكان العمل' : 'Strict Deadlines & Spotless Cleanup'}</span>
              </div>
            </div>

            {/* Link to Complete About Us Page */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-sm sm:text-base font-bold text-[#1E1D1B] hover:text-[#C5A059] transition-colors group"
              >
                <span>{lang === 'ar' ? 'تعرف على قصة المصنع واستوديو التصميم' : 'Discover Our Atelier Story'}</span>
                <Arrow
                  className={`w-4 h-4 text-[#C5A059] transition-transform ${
                    lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
