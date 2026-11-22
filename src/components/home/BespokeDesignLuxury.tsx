'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  PenTool,
  Layers,
  Cog,
  Truck,
  MessageSquare,
  CheckCircle2,
  Award,
} from 'lucide-react';

const steps = [
  {
    num: '01',
    titleAr: 'معاينة الموقع ورفع المقاسات',
    titleEn: 'Site Survey & Inspection',
    descAr: 'معاينة ميدانية متخصصة في الدمام أو الخبر أو القطيف لفحص حالة الجدران والأسقف ورفع المقاسات بدقة.',
    descEn: 'On-site technical survey across Dammam, Khobar, or Qatif assessing surfaces and dimensions.',
    tagAr: 'معاينة ميدانية دقيقة',
    tagEn: 'Site Inspection',
    icon: Eye,
  },
  {
    num: '02',
    titleAr: 'تنسيق الألوان والديكور 3D',
    titleEn: 'Color & Decor Curation',
    descAr: 'استعراض كتالوجات جوتن الأصلية وتنسيق ألوان الجدران وبديل الرخام والخشب بما يتناسب مع ذوقك.',
    descEn: 'Exploring genuine JOTUN palettes, wood slats, and marble alternatives to match your vision.',
    tagAr: 'كتالوجات جوتن الأصلية',
    tagEn: 'JOTUN Palettes',
    icon: PenTool,
  },
  {
    num: '03',
    titleAr: 'تجهيز وتأسيس الأسطح بالمعجون',
    titleEn: 'Surface Prep & Putty',
    descAr: 'معالجة الشقوق، تطبيق معجون الزوايا والأركان، والسنفرة الناعمة المتقنة لضمان جدار مستوٍ تماماً.',
    descEn: 'Filling cracks, corner putty application, and fine sanding to ensure perfectly level surfaces.',
    tagAr: 'معالجة الشقوق والسنفرة',
    tagEn: 'Smooth Sanding',
    icon: Layers,
  },
  {
    num: '04',
    titleAr: 'التنفيذ والرش والتشطيب الفاخر',
    titleEn: 'Paint Spray & Finishing',
    descAr: 'تطبيق وجه الأساس ووجهين تشطيب بدهانات جوتن والرش الناري للأبواب وتشطيب بديل الرخام.',
    descEn: 'Applying primer, double JOTUN finish coats, and smooth spray lacquer for doors.',
    tagAr: 'وجهين تشطيب جوتن',
    tagEn: 'Double Finish Coat',
    icon: Cog,
  },
  {
    num: '05',
    titleAr: 'التسليم النهائي ونظافة المكان',
    titleEn: 'Handover & Spotless Clean',
    descAr: 'فحص الجودة والمطابقة التامة للتصميم، وتسليم الموقع نظيفاً وجاهزاً للسكن مع الضمان المعتمد.',
    descEn: 'Quality inspection, spotless workspace cleanup, and verified guarantee handover.',
    tagAr: 'نظافة مكان العمل وضمان',
    tagEn: 'Verified Clean',
    icon: Truck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: any = {
  hidden: (idx: number) => ({
    opacity: 0,
    x: idx % 2 === 0 ? 45 : -45,
    y: 25,
    scale: 0.96,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const BespokeDesignLuxury: React.FC = () => {
  const { lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAF8F5] text-[#1E1D1B] border-t border-[#EAE5DC] relative overflow-hidden">
      {/* Decorative background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-3xl mb-14 sm:mb-20 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] tracking-wider uppercase mb-3 bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#C5A059]/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span>{lang === 'ar' ? 'خدمة التصنيع والتفصيل الحصري' : 'Bespoke Atelier Commission'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight mb-4 font-serif">
            {lang === 'ar' ? 'خطوات تنفيذ متقنة تُصنع خصيصًا لك' : 'Execution Steps Tailored for You'}
          </h2>

          <p className="text-sm sm:text-base text-[#6E675D] leading-relaxed">
            {lang === 'ar'
              ? 'سواء كنت ترغب في تجديد دهانات منزلك بالكامل أو تنفيذ ديكورات جدارية وبديل رخام راقية، نرافقك خطوة بخطوة من المعاينة الأولى حتى التسليم النهائي المتكامل.'
              : 'Whether refreshing your entire villa paint or executing modern wall decor, we accompany you through every step from initial inspection to final handover.'}
          </p>
        </motion.div>

        {/* 5-Step Architectural Animated Timeline */}
        <div className="relative mb-20">
          {/* Subtle animated connecting beam between cards on desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/25 to-transparent z-0 pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;

              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  onMouseEnter={() => setActiveStep(idx)}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className={`relative rounded-3xl p-7 border transition-all duration-500 flex flex-col justify-between group cursor-pointer overflow-hidden ${
                    isCurrent
                      ? 'bg-white border-[#C5A059] shadow-2xl shadow-[#C5A059]/20'
                      : 'bg-white/80 backdrop-blur-sm border-[#EAE5DC] hover:border-[#C5A059]/60 shadow-sm hover:shadow-xl'
                  } ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  {/* Top glowing accent bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#C5A059] via-[#D8B369] to-[#C5A059] opacity-100'
                        : 'bg-transparent opacity-0 group-hover:opacity-60 group-hover:bg-[#C5A059]'
                    }`}
                  />

                  {/* Corner ambient golden glow on hover/active */}
                  <div
                    className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#C5A059]/10 blur-2xl transition-opacity duration-500 pointer-events-none ${
                      isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                    }`}
                  />

                  <div>
                    {/* Header: Step Number & Animated Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`text-3xl font-black font-mono tracking-tighter transition-all duration-300 ${
                          isCurrent
                            ? 'text-[#C5A059] scale-110 drop-shadow-sm'
                            : 'text-[#D8B369]/50 group-hover:text-[#C5A059] group-hover:scale-105'
                        }`}
                      >
                        {step.num}
                      </span>

                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                          isCurrent
                            ? 'bg-gradient-to-br from-[#1E1D1B] to-[#2B2926] text-[#D8B369] border-[#C5A059] shadow-md shadow-[#C5A059]/20 rotate-[-4deg] scale-105'
                            : 'bg-[#FAF8F5] text-[#C5A059] border-[#EAE5DC] group-hover:border-[#C5A059] group-hover:bg-[#1E1D1B] group-hover:text-[#D8B369] group-hover:rotate-[-4deg]'
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Technical badge */}
                    <div className="mb-3">
                      <span
                        className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'bg-[#C5A059]/15 text-[#9E7B35] border border-[#C5A059]/40'
                            : 'bg-[#F2EDE4] text-[#7A7267] group-hover:bg-[#C5A059]/10 group-hover:text-[#9E7B35]'
                        }`}
                      >
                        {lang === 'ar' ? step.tagAr : step.tagEn}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`text-base font-bold mb-2.5 transition-colors duration-300 leading-snug font-serif ${
                        isCurrent
                          ? 'text-[#1E1D1B] text-[#9E7B35]'
                          : 'text-[#1E1D1B] group-hover:text-[#9E7B35]'
                      }`}
                    >
                      {lang === 'ar' ? step.titleAr : step.titleEn}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-[#6E675D] leading-relaxed group-hover:text-[#4A453E] transition-colors">
                      {lang === 'ar' ? step.descAr : step.descEn}
                    </p>
                  </div>

                  {/* Footer: Phase Status & Pulsing Dot */}
                  <div className="pt-5 mt-6 border-t border-[#EAE5DC] text-[11px] text-[#8C8377] flex items-center justify-between">
                    <span className="font-medium group-hover:text-[#1E1D1B] transition-colors">
                      {lang === 'ar' ? `المرحلة ${step.num}` : `Phase ${step.num}`}
                    </span>

                    {/* Animated pulse dot */}
                    <div className="relative flex items-center justify-center w-3.5 h-3.5">
                      {isCurrent ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C5A059] shadow-sm shadow-[#C5A059]" />
                        </>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[#C5A059]/50 group-hover:bg-[#C5A059] transition-all group-hover:scale-125" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Quiet Luxury Direct Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-3xl bg-[#1E1D1B] text-white p-8 sm:p-14 border border-[#C5A059]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden ${
            lang === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#C5A059]/30 text-[#D8B369] text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{lang === 'ar' ? 'استشارة هندسية ومقايسة دقيقة' : 'Engineering Consultation'}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white font-serif">
              {lang === 'ar' ? 'هل لديك فكرة أو مخطط تود تنفيذه؟' : 'Have a Custom Sketch or Floorplan?'}
            </h3>
            <p className="text-sm text-[#EAE5DC]/80 leading-relaxed">
              {lang === 'ar'
                ? 'شاركنا أبعاد القطعة والمادة المفضلة، وسيقوم مهندسونا بمراجعة المخطط وتقديم مقايسة وتكلفة دقيقة مع معاينة الألواح.'
                : 'Share your dimensions and stone preference to receive a detailed engineering quote and slab preview.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto relative z-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group hover:shadow-2xl hover:shadow-[#C5A059]/20"
            >
              <span>{lang === 'ar' ? 'اطلب استشارة وتفصيل قطعتك' : 'Request Custom Piece'}</span>
              <Arrow
                className={`w-4 h-4 transition-transform ${
                  lang === 'ar' ? 'group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'
                }`}
              />
            </Link>

            <a
              href={`https://wa.me/966530200529?text=${encodeURIComponent(
                lang === 'ar'
                  ? 'مرحباً، أود استشارة مهندسيكم بخصوص تفصيل قطعة رخام خاصة لمشروعي.'
                  : 'Hello, I would like to consult your engineers regarding a custom stone commission.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#D8B369] font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>{lang === 'ar' ? 'استشارة فورية عبر واتساب' : 'WhatsApp Consultation'}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
