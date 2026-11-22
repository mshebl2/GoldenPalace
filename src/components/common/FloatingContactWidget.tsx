'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import { ModernPhoneIcon, ModernWhatsAppIcon } from './SocialIcons';

export const FloatingContactWidget: React.FC = () => {
  const { lang } = useLanguage();
  const [phone, setPhone] = useState('0561095508');
  const [whatsapp, setWhatsapp] = useState('0561095508');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          if (data.settings.phone) setPhone(data.settings.phone);
          if (data.settings.whatsapp) setWhatsapp(data.settings.whatsapp);
          else if (data.settings.phone) setWhatsapp(data.settings.phone);
        }
      })
      .catch(() => {});
  }, []);

  const rawPhone = phone.replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('0') ? '+966' + rawPhone.substring(1) : (rawPhone.startsWith('966') ? '+' + rawPhone : (rawPhone.startsWith('+') ? rawPhone : '+966' + rawPhone));

  const rawWhatsapp = whatsapp.replace(/[^0-9]/g, '');
  const cleanWhatsapp = rawWhatsapp.startsWith('0') ? '966' + rawWhatsapp.substring(1) : (rawWhatsapp.startsWith('966') ? rawWhatsapp : '966' + rawWhatsapp);

  const whatsappUrl =
    `https://wa.me/${cleanWhatsapp}?text=` +
    encodeURIComponent(
      lang === 'ar'
        ? 'السلام عليكم، أود الاستفسار عن عروض وخدمات الدهانات والديكورات الحديثة لدى القصر الذهبي.'
        : 'Hello, I would like to inquire about paints and modern decor from Golden Palace.'
    );

  return (
    <aside
      aria-label={lang === 'ar' ? 'أزرار التواصل السريع' : 'Quick Contact Actions'}
      className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-50 print:hidden pointer-events-auto max-w-[calc(100vw-24px)]"
      dir="ltr"
    >
      {/* UNIFIED LUXURY GLASS DOCK — Single elegant pill, zero clutter */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#141312]/95 backdrop-blur-2xl border border-[#C5A059]/40 shadow-[0_12px_40px_rgba(0,0,0,0.75)] hover:border-[#C5A059]/70 transition-all duration-300">
        {/* 1. WHATSAPP ACTION BUTTON */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat via WhatsApp'}
          className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#1EBE5D] to-[#25D366] hover:from-[#25D366] hover:to-[#34E77B] text-white shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 group"
        >
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white" />
          </span>
          <ModernWhatsAppIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 filter drop-shadow" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wide">
            {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
          </span>
        </a>

        {/* Subtle Luxury Gold Divider */}
        <span className="w-px h-4 sm:h-5 bg-[#C5A059]/30" />

        {/* 2. DIRECT CALL ACTION BUTTON */}
        <a
          href={`tel:${cleanPhone}`}
          aria-label={lang === 'ar' ? 'اتصال هاتفي مباشر' : 'Call directly'}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-full bg-white/[0.04] hover:bg-[#C5A059]/20 text-[#D8B369] hover:text-[#F3D794] border border-[#C5A059]/25 hover:border-[#C5A059]/50 hover:scale-105 active:scale-95 transition-all duration-300 group"
          title={phone}
        >
          <ModernPhoneIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#C5A059] group-hover:rotate-12 transition-transform" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wide">
            {lang === 'ar' ? 'اتصال' : 'Call'}
          </span>
        </a>
      </div>
    </aside>
  );
};
