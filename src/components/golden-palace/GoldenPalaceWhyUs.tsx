'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tag, Calendar, Users, Layers, ShieldCheck } from 'lucide-react';

import { ISiteSettings } from '@/lib/models';

interface Props {
  settings?: ISiteSettings;
}

export const GoldenPalaceWhyUs: React.FC<Props> = ({ settings }) => {
  const sectionTitle = settings?.whyUsSectionTitleAr || 'لماذا تختارنا؟';
  const sectionSubtext = settings?.whyUsSectionSubtextAr || 'نلتزم بأعلى معايير الحرفية والسرعة والنظافة لتقديم تشطيب يرتقي لذوقكم الرفيع';

  const items = [
    {
      icon: ShieldCheck,
      title: settings?.whyUsPillar1Title || 'خامات جوتن والجزيرة الأصلية 100%',
      desc: settings?.whyUsPillar1Desc || 'أفضل الخامات المعتمدة مع ضمان رسمي ضد التقشر',
    },
    {
      icon: Calendar,
      title: settings?.whyUsPillar4Title || 'الالتزام التام بالمواعيد',
      desc: settings?.whyUsPillar4Desc || 'تسليم الأعمال بدقة بالغة وفق الجدول المتفق عليه',
    },
    {
      icon: Users,
      title: settings?.whyUsPillar3Title || 'حماية تامة ونظافة فائقة',
      desc: settings?.whyUsPillar3Desc || 'تغطية المفروشات وتسليم موقع العمل نظيفاً تماماً',
    },
    {
      icon: Layers,
      title: settings?.whyUsPillar2Title || 'ضمان معتمد حتى 10 سنوات',
      desc: settings?.whyUsPillar2Desc || 'حلول ديكورية فاخرة تدوم طويلاً',
    },
    {
      icon: Tag,
      title: settings?.whyUsPillar5Title || 'أسعار تنافسية وتوفير 30%',
      desc: settings?.whyUsPillar5Desc || 'باقات تبدأ من 500 ريال للغرفة مع معاينة مجانية',
    },
  ];

  return (
    <section className="w-full max-w-full py-14 sm:py-20 bg-white border-y border-slate-200/80 relative overflow-hidden font-madani">
      
      {/* Decorative Paint Roller on the Far Right Edge */}
      <div className="hidden 2xl:block absolute -right-8 top-1/2 -translate-y-1/2 w-44 h-44 pointer-events-none opacity-50 z-0">
        <Image
          src="/images/brand/roller-decor.webp"
          alt="زخرفة رول الدهان"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center text-2xl sm:text-3xl font-black text-[#081B33] font-madani mb-12 sm:mb-16"
        >
          {sectionTitle}
        </motion.h2>

        {/* 5 Columns with subtle vertical dividers on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-200">
          {items.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center text-center px-3 pt-4 sm:pt-0 space-y-3 group cursor-default transition-all"
              >
                {/* Gold Circle Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] group-hover:bg-[#081B33] text-[#D4A63D] group-hover:text-[#F5D77A] border border-[#D4A63D]/30 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:rotate-6">
                  <IconComp className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="text-sm font-bold text-[#081B33] group-hover:text-[#D4A63D] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
