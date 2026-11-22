'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { ISiteSettings } from '@/lib/models';

interface Props {
  settings?: ISiteSettings;
}

export const GoldenPalaceAbout: React.FC<Props> = ({ settings }) => {
  const title = settings?.aboutSectionTitleAr || 'من نحن';
  const story = settings?.aboutStoryAr || 'القصر الذهبي شركة متخصصة في أعمال الدهانات والديكورات الحديثة. نقدم حلولاً إبداعية تجمع بين الجودة والذوق العصري لتلبية احتياجات المنازل والفلل والمشاريع التجارية بتصاميم عصرية.';
  const mainImage = settings?.aboutMainImage || '/images/about/building.webp';
  const years = settings?.aboutYearsExperience || '+15';
  const projects = settings?.aboutCompletedProjects || '+1,200';
  return (
    <section className="w-full max-w-full py-16 md:py-24 bg-[#F8F7F4] relative overflow-hidden font-madani">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-[#D4A63D]" />
            <h2 className="text-2xl sm:text-4xl font-black text-[#081B33] font-madani tracking-tight">
              {title}
            </h2>
            <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-[#D4A63D]" />
          </div>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Right Text Column (RTL Start) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {story}
            </p>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              نلتزم باستخدام أفضل خامات دهانات جوتن JOTUN الأصلية المقاومة للرطوبة وثابتة الألوان، مع كادر فني محترف يضمن نظافة المكان وسرعة الإنجاز ودقة المواعيد في الدمام والخبر والقطيف.
            </p>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 py-3 px-7 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] hover:from-[#F5D77A] hover:to-[#D4A63D] text-[#061426] font-bold text-xs sm:text-sm shadow-md transition-all duration-300"
              >
                <span>تعرف علينا</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Left Architectural Villa Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200 group">
              <Image
                src={mainImage}
                alt="فلل ومشاريع القصر الذهبي للدهانات والديكورات"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-white text-xs font-bold px-3 py-1.5 rounded-xl bg-[#081B33]/85 backdrop-blur-sm border border-[#D4A63D]/40">
                <span>الخبر • الدمام • القطيف</span>
                <span className="text-[#D4A63D]">تنفيذ وإشراف هندسي</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
