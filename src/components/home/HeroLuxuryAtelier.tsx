'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MoveDown } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/hero/hero-living-room.webp',
    tagAr: 'الخبر — الدمام — القطيف',
    tagEn: 'Khobar — Dammam — Qatif',
    headlineAr: 'القصر الذهبي للدهانات والديكورات الحديثة',
    headlineEn: 'Golden Palace Paints & Modern Decor',
    subAr: 'حلول متكاملة في أعمال الدهانات والديكورات للمنازل والفلل والمشاريع التجارية، بتشطيبات عصرية وجودة عالية.',
    subEn: 'Integrated painting and modern decor solutions for homes, villas, and commercial projects across the Eastern Province.',
  },
  {
    id: 2,
    image: '/images/offers/paint-tools.webp',
    tagAr: 'دهانات جوتن الأصلية — باقات حصرية',
    tagEn: 'Original JOTUN Paints — Exclusive Packages',
    headlineAr: 'عروض حصرية وضمان معتمد\nعلى جودة التشطيب والتنفيذ',
    headlineEn: 'Certified Quality & Exclusive Paint Packages',
    subAr: 'باقات متكاملة لتشطيب الغرف تبدأ من 500 ريال للغرفة شاملة المعجون والسنفرة والأساس ووجهين تشطيب ونظافة مكان العمل.',
    subEn: 'Complete room packages starting from 500 SAR including putty, sanding, primer, and double finish coats with workspace cleaning.',
  },
  {
    id: 3,
    image: '/images/portfolio/marble-decoration.webp',
    tagAr: 'ديكورات عصرية — بديل الرخام والخشب',
    tagEn: 'Modern Decor — Marble & Wood Alternatives',
    headlineAr: 'لمسات ديكورية راقية\nتحوّل مساحتك إلى تحفة فنية',
    headlineEn: 'Refined Decorative Touches for Your Space',
    subAr: 'أرقى تصاميم بديل الرخام، بديل الخشب، بانوهات الفوم، والأسقف الجبسية مع خطوط إضاءة ليد مخفية.',
    subEn: 'Premium marble and wood alternatives, wall moulding panels, and gypsum ceilings with recessed cove lighting.',
  },
];

export const HeroLuxuryAtelier: React.FC = () => {
  const { lang } = useLanguage();
  const [activeSlides, setActiveSlides] = useState(slides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (
          data.settings?.heroSlides &&
          Array.isArray(data.settings.heroSlides) &&
          data.settings.heroSlides.length > 0
        ) {
          setActiveSlides(data.settings.heroSlides);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= activeSlides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const prev = () => setCurrent((c) => (c === 0 ? activeSlides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c >= activeSlides.length - 1 ? 0 : c + 1));

  const slide = activeSlides[current] || activeSlides[0] || slides[0];
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#161513] text-white">
      {/* Cinematic Full-Bleed Imagery with Cross-Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={lang === 'ar' ? slide.headlineAr : slide.headlineEn}
            fetchPriority={current === 0 ? 'high' : 'auto'}
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.06]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Soft Light Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#161513] via-[#161513]/40 to-black/30 z-1 pointer-events-none" />
      <div
        className={`absolute inset-0 z-1 pointer-events-none ${
          lang === 'ar'
            ? 'bg-gradient-to-l from-[#161513]/95 via-[#161513]/60 to-transparent'
            : 'bg-gradient-to-r from-[#161513]/95 via-[#161513]/60 to-transparent'
        }`}
      />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 sm:pt-36 pb-20 sm:pb-28">
        <div
          className={`max-w-3xl space-y-5 sm:space-y-7 w-full ${
            lang === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          {/* Refined Atelier Pre-title */}
          <motion.div
            key={`tag-${slide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex items-center gap-3 ${lang === 'ar' ? 'justify-start' : 'justify-start'}`}
          >
            <span className="w-8 h-px bg-[#C5A059]" />
            <span className="text-[11px] sm:text-xs font-semibold text-[#D8B369] tracking-widest uppercase">
              {lang === 'ar' ? slide.tagAr : slide.tagEn}
            </span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            key={`head-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.4] sm:leading-[1.35] whitespace-pre-line drop-shadow-xl my-2 sm:my-3 break-words"
            style={{ letterSpacing: 'normal', wordSpacing: '0.04em' }}
          >
            {lang === 'ar' ? slide.headlineAr : slide.headlineEn}
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            key={`sub-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg text-[#EAE5DC] leading-relaxed sm:leading-loose max-w-2xl font-normal drop-shadow"
          >
            {lang === 'ar' ? slide.subAr : slide.subEn}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 sm:pt-4"
          >
            <a
              href="#featured-products"
              className="inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-sm sm:text-base shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 group text-center min-h-[48px]"
            >
              <span>{lang === 'ar' ? 'اكتشف منتجاتنا' : 'Discover Our Products'}</span>
              <Arrow className={`w-4 h-4 transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </a>

            <Link
              href="/quotation"
              className="inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-[#C5A059] font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-300 group text-center min-h-[48px]"
            >
              <span>{lang === 'ar' ? 'اطلب تصميمك' : 'Request Custom Design'}</span>
              <Arrow className={`w-4 h-4 text-[#C5A059] transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide Controllers */}
      <div
        className={`absolute bottom-6 sm:bottom-10 z-20 flex items-center gap-3.5 sm:gap-5 text-white ${
          lang === 'ar' ? 'right-4 sm:right-14' : 'left-4 sm:left-14'
        }`}
      >
        <div className="text-xs sm:text-sm font-bold tracking-widest text-[#EAE5DC]" dir="ltr">
          <span className="text-[#C5A059]">0{current + 1}</span>
          <span className="mx-2 text-white/40">/</span>
          <span>0{slides.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={lang === 'ar' ? next : prev}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C5A059] bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-[#C5A059] transition-all"
          >
            {lang === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={lang === 'ar' ? prev : next}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C5A059] bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-[#C5A059] transition-all"
          >
            {lang === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 items-center gap-2 text-white/60 text-xs tracking-wider">
        <span>{lang === 'ar' ? 'التمرير للاستكشاف' : 'Scroll to Explore'}</span>
        <MoveDown className="w-3.5 h-3.5 animate-bounce text-[#C5A059]" />
      </div>
    </section>
  );
};
