'use client';

import React from 'react';
import { FileText, Search, Calculator, Paintbrush, CheckCircle2, ChevronLeft } from 'lucide-react';

export const GoldenPalaceProcess: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'طلب العرض',
      desc: 'تواصل معنا وحدد المساحة أو الباقة',
      icon: FileText,
    },
    {
      num: 2,
      title: 'معاينة الموقع',
      desc: 'زيارة ميدانية مجانية لفحص الجدران',
      icon: Search,
    },
    {
      num: 3,
      title: 'تقديم السعر',
      desc: 'عرض سعر تفصيلي يشمل المواد والعمل',
      icon: Calculator,
    },
    {
      num: 4,
      title: 'التنفيذ باحترافية',
      desc: 'معجون، سنفرة، وطبقات جوتن بأعلى دقة',
      icon: Paintbrush,
    },
    {
      num: 5,
      title: 'التسليم النهائي',
      desc: 'فحص الجودة ونظافة تامة للمكان',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="w-full max-w-full py-16 md:py-24 bg-white relative overflow-hidden font-madani">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-[#D4A63D]" />
            <h2 className="text-2xl sm:text-4xl font-black text-[#081B33] font-madani tracking-tight">
              خطوات تنفيذ المشروع
            </h2>
            <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-[#D4A63D]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
            منهجية واضحة ومدروسة من أول اتصال حتى استلام منزلك بأرقى حُلة
          </p>
        </div>

        {/* 5 Steps Linear Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((st, idx) => {
            const IconComp = st.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={st.num} className="relative flex flex-col items-center text-center space-y-3 group">
                
                {/* Arrow to Next Step on Desktop (pointing left in RTL) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-7 -left-4 z-20 text-[#D4A63D]">
                    <ChevronLeft className="w-6 h-6 animate-pulse" />
                  </div>
                )}

                {/* Circle Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] group-hover:bg-[#081B33] text-[#D4A63D] group-hover:text-[#F5D77A] border-2 border-[#D4A63D]/40 shadow-md flex items-center justify-center transition-all duration-300 relative">
                  <IconComp className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D4A63D] text-[#061426] text-[10px] font-black flex items-center justify-center shadow">
                    {st.num}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#081B33] group-hover:text-[#D4A63D] transition-colors">
                  {st.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed px-2">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
