'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon, MessageCircle, Phone, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageContext';

interface PageHeroHeaderProps {
  badgeText: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  bgImage?: string;
  ctaWhatsAppText?: string;
  showUrgencyNotice?: boolean;
}

export const PageHeroHeader: React.FC<PageHeroHeaderProps> = ({
  badgeText,
  badgeIcon: BadgeIcon,
  title,
  description,
  bgImage = '/images/hero/hero-living-room.webp',
  ctaWhatsAppText = 'احصل على خصم 30% ومعاينة مجانية',
  showUrgencyNotice = true,
}) => {
  const { lang } = useLanguage();

  const waUrl = `https://wa.me/966561095508?text=${encodeURIComponent(
    `مرحباً القصر الذهبي، أود الاستفسار والحصول على عرض السعر والخصم لـ: ${title}`
  )}`;

  return (
    <div className="relative w-full max-w-full pt-24 sm:pt-32 pb-10 sm:pb-16 mb-6 sm:mb-12 overflow-hidden font-madani">
      {/* Background Architectural Photo with Subtle Warm Tint */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover object-center filter brightness-[0.85] contrast-[1.05] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#FAF8F5]/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/40 via-transparent to-[#FAF8F5]" />
      </div>

      {/* Floating Center Luxury Glass Card */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#D4A63D]/40 p-5 sm:p-10 shadow-[0_20px_50px_rgba(8,27,51,0.08)] text-center relative overflow-hidden"
        >
          
          {/* Subtle Ambient Gold Glow Top Edge */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A63D] to-transparent" />

          {/* Floating Urgency Tag */}
          {showUrgencyNotice && (
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#D4A63D]/50 text-[#8C5D07] text-[10px] sm:text-xs font-bold mb-3 shadow-sm max-w-full text-center leading-snug">
              <span className="w-2 h-2 rounded-full bg-[#D4A63D] shrink-0 animate-ping" />
              <span>خصم 30% على دهانات الفلل والشقق + معاينة مجانية بالشرقية</span>
            </div>
          )}

          {/* Category / Scope Badge */}
          <div className="flex justify-center mb-2.5 sm:mb-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4A63D]/40 text-[#9B7018] text-[11px] sm:text-xs font-bold shadow-sm">
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#D4A63D]" />}
              <span>{badgeText}</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-black text-[#081B33] mb-3 tracking-tight leading-tight">
            {title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-medium">
            {description}
          </p>

          {/* Direct Action Buttons to Encourage Immediate Booking */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 max-w-md mx-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{ctaWhatsAppText}</span>
            </a>

            <a
              href="tel:0561095508"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#081B33] font-bold text-xs sm:text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-[#D4A63D]" />
              <span dir="ltr">0561095508</span>
            </a>
          </div>

          {/* 3 Quick Assurance Bullets */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[11px] sm:text-xs text-slate-500 font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A63D]" />
              معاينة وتحديد ألوان مجاناً
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A63D]" />
              دهانات جوتن أصلية 100%
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A63D]" />
              ضمان رسمي معتمد
            </span>
          </div>

        </motion.div>
      </div>
    </div>
  );
};
