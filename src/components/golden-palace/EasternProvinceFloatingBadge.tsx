'use client';

import React, { useState, useEffect } from 'react';
import { X, MapPin, MessageCircle, Gift, Phone } from 'lucide-react';

export const EasternProvinceFloatingBadge: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('gp_badge_dismissed');
      if (!dismissed) {
        setVisible(true);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('gp_badge_dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 inset-x-3 sm:inset-x-auto sm:right-6 sm:left-auto z-40 sm:max-w-[340px] animate-in fade-in slide-in-from-bottom-5 duration-500 font-madani">
      <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-[#D4A63D]/50 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] text-slate-800 space-y-2.5">
        
        {/* Header: Title with Gift Icon & Urgency */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5 text-[#081B33] font-black text-xs sm:text-sm">
            <span className="p-1 rounded-lg bg-[#D4A63D]/15 text-[#A87818]">
              <Gift className="w-4 h-4 text-[#D4A63D]" />
            </span>
            <span>هدية ترحيبية: خصم 30% ومعاينة مجانية</span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-100"
            aria-label="إغلاق التنبيه"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Text */}
        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
          احجز دهان شقتك أو فيلتك اليوم في <strong className="text-[#081B33]">الدمام • الخبر • القطيف</strong> واستفد من خصم 30% على التنفيذ + معاينة موقع وتحديد الألوان مجاناً!
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href="https://wa.me/966561095508?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A7%D9%84%D9%82%D8%B5%D8%B1%20%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D8%A9%20%D9%85%D9%86%20%D8%AE%D8%B5%D9%85%2030%25%20%D9%88%D8%AD%D8%AC%D8%B2%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>احجز خصمك الآن</span>
          </a>

          <a
            href="tel:0561095508"
            className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#081B33] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            title="اتصال مباشر"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4A63D]" />
            <span dir="ltr">اتصال</span>
          </a>
        </div>

      </div>
    </div>
  );
};
