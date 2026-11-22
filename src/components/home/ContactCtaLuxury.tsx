'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../layout/LanguageContext';
import { ArrowLeft, ArrowRight, MessageSquare, Phone, MapPin, ExternalLink } from 'lucide-react';
import { ModernPhoneIcon, ModernWhatsAppIcon } from '../common/SocialIcons';

export const ContactCtaLuxury: React.FC = () => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1E1D1B] text-white shadow-2xl border border-[#C5A059]/40 flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 lg:p-14 gap-8 sm:gap-10">
          {/* Subtle Logo Watermark */}
          <div
            className={`absolute -bottom-12 w-80 h-80 opacity-10 pointer-events-none mix-blend-screen ${
              lang === 'ar' ? '-left-12' : '-right-12'
            }`}
          >
            <img
              src="/brand/logos/logo-vertical-gold.png"
              alt="Brand watermark"
              className="w-full h-full object-contain filter brightness-200"
            />
          </div>

          {/* Decorative Marble Slab Image */}
          <div className="w-full lg:w-5/12 relative h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-black/40">
            <img
              src="/images/products/consoles-18.jpg"
              alt={lang === 'ar' ? 'رخام طبيعي مصنع القصر الذهبي للدهانات' : 'Natural stone craftsmanship'}
              className="w-full h-full object-cover object-center filter contrast-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 left-4 p-3 rounded-xl bg-black/60 backdrop-blur-md text-xs text-white flex items-center justify-between">
              <span>{lang === 'ar' ? 'مصنع واستوديو القصر الذهبي للدهانات' : 'Elegant East Stone Atelier'}</span>
              <span className="text-[#C5A059] font-bold">
                {lang === 'ar' ? 'الرياض • حي المناخ' : 'Riyadh • Al-Manakh'}
              </span>
            </div>
          </div>

          {/* Right/Left Content Area */}
          <div
            className={`flex-1 space-y-6 relative z-10 ${
              lang === 'ar' ? 'text-center lg:text-right' : 'text-center lg:text-left'
            }`}
          >
            {/* Headline exact as requested: خلّنا نحول فكرتك إلى قطعة مميزة */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {lang === 'ar' ? 'خلّنا نحول فكرتك إلى قطعة مميزة' : 'Let Us Sculpt Your Vision Into an Heirloom'}
            </h2>

            <p className="text-[#EAE5DC]/80 text-sm sm:text-base max-w-xl leading-relaxed">
              {lang === 'ar'
                ? 'شاركنا تصميمك أو مقاسات مساحتك، وسنساعدك في اختيار الخامة واللوح المثاليين وإعداد مقايسة تفصيلية تلبي تطلعاتك.'
                : 'Share your dimensions or architectural concept, and our stone specialists will assist in slab selection and tailored quotation.'}
            </p>

            {/* Address & Phone Quick Strip */}
            <div
              className={`flex flex-wrap items-center gap-4 text-xs text-[#B5ADA3] pt-1 ${
                lang === 'ar' ? 'justify-center lg:justify-start' : 'justify-center lg:justify-start'
              }`}
            >
              <a
                href="tel:0530200529"
                className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span dir="ltr">0530200529</span>
              </a>
              <span>•</span>
              <a
                href="https://maps.app.goo.gl/R4hSwJcmPZLPbLFT6"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{lang === 'ar' ? 'الرياض - طريق الخرج - حي المناخ' : 'Riyadh - Al-Kharj Rd - Al-Manakh'}</span>
                <ExternalLink className="w-3 h-3 text-[#C5A059]" />
              </a>
            </div>

            {/* Action Buttons: Request Quote + Modern WhatsApp + Modern Direct Call */}
            <div
              className={`pt-4 flex flex-wrap items-center gap-3.5 ${
                lang === 'ar' ? 'justify-center lg:justify-start' : 'justify-center lg:justify-start'
              }`}
            >
              <Link
                href="/quotation"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#E8CD8C] hover:from-[#E8CD8C] hover:to-[#C5A059] text-black font-bold text-sm shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group"
              >
                <span>{lang === 'ar' ? 'اطلب عرض سعر مخصص' : 'Request Quotation'}</span>
                <Arrow
                  className={`w-4 h-4 transition-transform ${
                    lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </Link>

              <a
                href="https://wa.me/966530200529"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/50 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-md"
              >
                <ModernWhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{lang === 'ar' ? 'واتساب فوري' : 'WhatsApp'}</span>
              </a>

              <a
                href="tel:0530200529"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 hover:border-[#C5A059] text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ModernPhoneIcon className="w-4 h-4 text-[#C5A059]" />
                <span dir="ltr">0530200529</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
