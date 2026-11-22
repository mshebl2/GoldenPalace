'use client';

import React from 'react';
import { Star, Quote, User } from 'lucide-react';

export const GoldenPalaceReviews: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      name: 'أبو عبدالله',
      city: 'الدمام',
      text: 'شغل نظيف ودقة في التنفيذ وتعامل راقي.. أنصح بالتعامل معهم.',
      rating: 5,
    },
    {
      id: 'rev-2',
      name: 'أم فهد',
      city: 'الخبر',
      text: 'جودة الدهانات ممتازة والألوان مطابقة للتصميم.',
      rating: 5,
    },
    {
      id: 'rev-3',
      name: 'أبو خالد',
      city: 'القطيف',
      text: 'التزام بالمواعيد ونتيجة رائعة في كل التفاصيل.',
      rating: 5,
    },
  ];

  return (
    <section className="w-full max-w-full py-16 md:py-24 bg-[#F8F7F4] relative overflow-hidden font-madani">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-[#D4A63D]" />
            <h2 className="text-2xl sm:text-4xl font-black text-[#081B33] font-madani tracking-tight">
              آراء عملائنا
            </h2>
            <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-[#D4A63D]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
            ثقة عملائنا في الخبر والدمام والقطيف هي أكبر حافز لاستمرار تميزنا
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-[24px] bg-white border border-slate-200/90 hover:border-[#D4A63D]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-[#D4A63D]/25 group-hover:text-[#D4A63D]/50 transition-colors">
                <Quote className="w-8 h-8" />
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 text-[#D4A63D]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4A63D]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                &ldquo;{rev.text}&rdquo;
              </p>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D4A63D]/40 text-[#081B33] flex items-center justify-center font-bold text-xs shrink-0">
                  <User className="w-5 h-5 text-[#D4A63D]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#081B33]">
                    {rev.name}
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {rev.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
