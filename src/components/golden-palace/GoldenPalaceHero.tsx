'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, MessageCircle, ShieldCheck, CheckCircle2, Award, Paintbrush, MapPin } from 'lucide-react';

import { ISiteSettings } from '@/lib/models';

interface Props {
  settings?: ISiteSettings;
}

export const GoldenPalaceHero: React.FC<Props> = ({ settings }) => {
  const phone = settings?.phone || '0561095508';
  const whatsapp = settings?.whatsapp || '0561095508';
  const waUrl = `https://wa.me/966${whatsapp.replace(/^0+/, '')}?text=${encodeURIComponent(
    'مرحباً القصر الذهبي، أود الاستفادة من خصم 30% وحجز معاينة مجانية'
  )}`;

  const discountBadge = settings?.heroDiscountBadgeAr || 'خصم ترحيبي 30% + استشارة ألوان ومعاينة مجانية بالشرقية';
  const guaranteeBadge = settings?.heroGuaranteeBadgeAr || 'دهانات جوتن الأصلية 100% • إشراف فني متخصص • ضمان معتمد';
  const line1 = settings?.heroHeadlineLine1Ar || 'فخامة الألوان والتشطيبات الحديثة';
  const line2 = settings?.heroHeadlineLine2Ar || settings?.companyNameAr || 'القصر الذهبي للدهانات والديكورات';
  const description = settings?.heroSubtextAr || 'حلول متكاملة في تنفيذ أعمال الدهانات الداخلية والخارجية للمنازل والفلل والمشاريع التجارية، توريد وتركيب بديل الرخام وبديل الخشب، والبانوهات الجدارية بأرقى تصاميم 2026 في الدمام والخبر والقطيف.';
  const liveStatus = settings?.heroLiveStatusAr || 'فنيونا متواجدون الآن بالدمام والخبر والقطيف — المعاينة وتحديد الألوان مجاناً اليوم';
  const heroImage = settings?.heroMainImage || '/images/hero/hero-living-room.webp';

  const proof1Title = settings?.heroProof1Title || 'جوتن أصلية 100%';
  const proof1Desc = settings?.heroProof1Desc || 'معجون وسنفرة متقنة';
  const proof2Title = settings?.heroProof2Title || 'عروض من 500 ريال';
  const proof2Desc = settings?.heroProof2Desc || 'باقات تشطيب الغرفة';
  const proof3Title = settings?.heroProof3Title || 'معاينة مجانية';
  const proof3Desc = settings?.heroProof3Desc || 'الدمام • الخبر • القطيف';
  return (
    <section className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-[#FBF9F6] via-white to-[#F8F7F4] pt-24 sm:pt-36 pb-10 sm:pb-20 font-madani">
      
      {/* Subtle Golden Ambient Glows contained safely inside overflow container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4A63D] rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4A63D] rounded-full blur-3xl pointer-events-none"
        />
      </div>

      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 1. RIGHT COLUMN (In RTL): Content & Call to Actions */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-right">
            
            {/* Urgent Welcome Discount Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50/80 to-amber-50 border-2 border-[#D4A63D]/60 shadow-sm flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A63D] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4A63D]"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-black text-[#081B33]">
                  {discountBadge}
                </span>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap px-3 py-1 rounded-xl bg-[#D4A63D] hover:bg-[#b88c28] text-white text-[11px] font-black transition-all shadow-sm shrink-0"
              >
                احجز الخصم
              </motion.a>
            </motion.div>

            {/* Verified Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[#081B33] text-xs font-bold shadow-sm max-w-full"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4A63D] shrink-0" />
              <span className="truncate">{guaranteeBadge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1 sm:space-y-1.5"
            >
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#081B33] font-madani leading-snug sm:leading-[1.2] tracking-tight">
                {line1}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4A63D] via-[#A87818] to-[#D4A63D] mt-1 sm:mt-1.5">
                  {line2}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl"
            >
              {description}
            </motion.p>

            {/* Quick Live Availability Reassurance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{liveStatus}</span>
            </motion.div>

            {/* CTA Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
            >
              
              {/* Primary Gold CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/quotation"
                  className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] hover:from-[#F5D77A] hover:to-[#D4A63D] text-[#081B33] font-black text-xs sm:text-sm shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-center"
                >
                  <FileText className="w-4 h-4 text-[#081B33]" />
                  <span>اطلب معاينة وعرض سعر فوري</span>
                </Link>
              </motion.div>

              {/* Secondary WhatsApp CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-[#D4A63D] font-bold text-xs sm:text-sm shadow-sm transition-all duration-300 flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>تواصل واتساب مباشرة</span>
                </a>
              </motion.div>

            </motion.div>

            {/* 3 Proof Metric Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-slate-200/80"
            >
              
              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-right flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-1.5 text-[#081B33] font-bold text-xs sm:text-sm">
                  <Paintbrush className="w-4 h-4 text-[#D4A63D]" />
                  <span>{proof1Title}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500">{proof1Desc}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-right flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-1.5 text-[#081B33] font-bold text-xs sm:text-sm">
                  <Award className="w-4 h-4 text-[#D4A63D]" />
                  <span>{proof2Title}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500">{proof2Desc}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-right flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-1.5 text-[#081B33] font-bold text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-[#D4A63D]" />
                  <span>{proof3Title}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500">{proof3Desc}</p>
              </motion.div>

            </motion.div>

          </div>

          {/* 2. LEFT COLUMN (In RTL): Modern Architectural Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative mt-4 lg:mt-0 max-w-full"
          >
            
            {/* Background Decorative Frame Accent (Hidden on mobile to eliminate any horizontal overflow) */}
            <div className="hidden sm:block absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-[#D4A63D]/25 via-transparent to-[#081B33]/10 rounded-[28px] sm:rounded-[40px] transform rotate-1 pointer-events-none" />

            {/* Main Luxury Room Photo Frame */}
            <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl border-4 sm:border-8 border-white bg-slate-100 aspect-[4/3] group luxury-card">
              <Image
                src={heroImage}
                alt="تصميم صالة معيشة فاخرة بدهانات وديكورات القصر الذهبي بالشرقية"
                fill
                priority
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quality Pill at Top-Right */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D4A63D]/40 shadow-lg flex items-center gap-1.5 sm:gap-2 z-10"
              >
                <div className="w-2 h-2 rounded-full bg-[#D4A63D] animate-ping" />
                <span className="text-[10px] sm:text-xs font-bold text-[#081B33]">
                  أحدث كتالوجات دهانات جوتن 2026
                </span>
              </motion.div>

              {/* Floating Guarantee Badge at Bottom-Left */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-[#081B33]/90 backdrop-blur-md border border-[#D4A63D]/40 shadow-xl text-white flex items-center gap-2 z-10"
              >
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4A63D] shrink-0" />
                <div className="text-right leading-none">
                  <span className="block text-[10px] sm:text-xs font-bold text-white">ضمان معتمد على التنفيذ</span>
                  <span className="block text-[8px] sm:text-[9px] text-slate-300 mt-0.5">نظافة تامة للمكان ودقة بالمواعيد</span>
                </div>
              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
