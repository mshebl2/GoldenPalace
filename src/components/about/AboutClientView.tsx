'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/components/layout/LanguageContext';
import {
  Eye,
  Target,
  ShieldCheck,
  CheckCircle2,
  Paintbrush,
  Award,
  Clock,
  ThumbsUp,
  ArrowLeft,
  ArrowRight,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { PageHeroHeader } from '@/components/common/PageHeroHeader';

export function AboutClientView() {
  const { lang } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const whyChooseItems = [
    {
      icon: Award,
      titleAr: 'دهانات جوتن الأصلية 100%',
      titleEn: '100% Genuine JOTUN Paints',
      descAr: 'نعتمد أجود خامات جوتن فينوماستيك والدهانات المقاومة للرطوبة وثابتة الألوان.',
      descEn: 'We use certified JOTUN Fenomastic paints known for color retention and washability.',
    },
    {
      icon: Clock,
      titleAr: 'التزام صارم بالمواعيد',
      titleEn: 'Strict Timeline Commitment',
      descAr: 'جدول زمني محدد ودقيق لتسليم الشقق والفلل مع الحفاظ على أعلى معايير الجودة.',
      descEn: 'Strict adherence to project schedules with zero compromise on execution quality.',
    },
    {
      icon: Paintbrush,
      titleAr: 'كادر فني محترف ومدرب',
      titleEn: 'Expert Master Painters',
      descAr: 'فريق من أمهر المعلمين المتخصصين في معالجة الجدران، الصنفرة، ورش الأبواب والأسقف.',
      descEn: 'Skilled craftsmen specialized in wall preparation, airless spraying, and trim refinishing.',
    },
    {
      icon: CheckCircle2,
      titleAr: 'نظافة تامة وحماية الأثاث',
      titleEn: 'Spotless Cleanup & Protection',
      descAr: 'تغطية وعزل كامل لجميع الأرضيات والمفروشات قبل البدء، وتسليم المكان نظيفاً تماماً.',
      descEn: 'Complete masking and floor protection before starting, with tidy final handover.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* Page Hero Header with Architectural Photo Background */}
        <PageHeroHeader
          badgeText={lang === 'ar' ? 'القصر الذهبي للدهانات والديكورات الحديثة' : 'Golden Palace Paints & Decors'}
          badgeIcon={ShieldCheck}
          title={lang === 'ar' ? 'من نحن — مسيرة إتقان وتميز بالشرقية' : 'About Us — Crafting Modern Living Spaces'}
          description={
            lang === 'ar'
              ? 'القصر الذهبي شركة رائدة متخصصة في أعمال الدهانات والتشطيبات والديكورات الحديثة للمنازل والفلل والمشاريع التجارية بالخبر والدمام والقطيف، نجمع بين الجودة العالية والذوق العصري الرفيع.'
              : 'Golden Palace is a premier painting contractor and modern decor specialist serving residences and commercial properties across Khobar, Dammam, and Qatif.'
          }
          bgImage="/images/hero/hero-living-room.webp"
          ctaWhatsAppText={lang === 'ar' ? 'تواصل مع فريقنا الآن' : 'Contact Our Team'}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          {/* Section 1: Company Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className={`lg:col-span-6 space-y-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-3">
                <span className="w-10 h-0.5 bg-[#D4A63D]" />
                <span className="text-[#D4A63D] font-bold text-xs uppercase tracking-wider">
                  {lang === 'ar' ? 'حرفية التنفيذ وجودة التشطيب' : 'Master Craftsmanship'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#081B33] leading-snug">
                {lang === 'ar'
                  ? 'حلول إبداعية في الدهانات والديكورات العصرية'
                  : 'Creative Paint & Decor Solutions for Every Space'}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {lang === 'ar'
                  ? 'منذ انطلاقتنا في المنطقة الشرقية، حرصنا في "القصر الذهبي" على تقديم تجربة استثنائية لكل عميل. لا نكتفي بالدهان التقليدي، بل نبدأ بمعالجة أركان الجدران والشروخ بمعجون مقاوم، واستخدام أجهزة الصنفرة الحديثة، وتطبيق طبقات الأساس وطبقتي التشطيب بأجود دهانات جوتن JOTUN، بالإضافة إلى تركيب بديل الرخام وبديل الخشب وبانوهات الفوم الجدارية العصرية.'
                  : 'Based in the Eastern Province, Golden Palace is dedicated to delivering flawless painting and interior decor results. We ensure rigorous surface preparation, dust-free sanding, premium JOTUN paints, and modern wall panelling with marble & timber alternatives.'}
              </p>

              {/* Service Areas Badge */}
              <div className="p-4 rounded-xl bg-white border border-[#D4A63D]/30 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#081B33]">
                    {lang === 'ar' ? 'نطاق الخدمة والتغطية الميدانية' : 'Service Coverage Area'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'ar' ? 'الخبر • الدمام • القطيف وسائر مدن الشرقية' : 'Khobar • Dammam • Qatif & Eastern Province'}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-lg bg-[#D4A63D] text-black font-bold text-xs hover:bg-[#F5D77A] transition-colors"
                >
                  {lang === 'ar' ? 'تواصل معنا' : 'Contact'}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group h-[340px] sm:h-[420px]">
                <Image
                  src="/images/about/building.webp"
                  alt="مشاريع وفلل القصر الذهبي للدهانات والديكورات"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B33]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-white">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#081B33]/90 backdrop-blur-sm border border-[#D4A63D]/50 text-[#D4A63D]">
                    {lang === 'ar' ? 'فلل ومشاريع سكنية منفذة بالمنطقة الشرقية' : 'Completed Residential Projects in Eastern Province'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vision, Mission, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className={`p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 ${
              lang === 'ar' ? 'text-right' : 'text-left'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#F8F7F4] border border-[#D4A63D]/30 flex items-center justify-center text-[#D4A63D]">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#081B33]">
                {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'أن نكون الخيار الأول والأكثر موثوقية في أعمال الدهانات والديكورات المنزلية والتشطيبات الحديثة في المنطقة الشرقية، بتقديم حلول متكاملة تجمع بين الجمال والجودة المستدامة.'
                  : 'To be the most trusted and preferred partner for residential painting and modern interior wall decor across the Eastern Province.'}
              </p>
            </div>

            <div className={`p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 ${
              lang === 'ar' ? 'text-right' : 'text-left'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#F8F7F4] border border-[#D4A63D]/30 flex items-center justify-center text-[#D4A63D]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#081B33]">
                {lang === 'ar' ? 'رسالتنا' : 'Our Mission'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'تحويل كل مساحة سكنية وتجارية إلى بيئة راقية تعكس ذوق أصحابها، من خلال استخدام أفضل الدهانات الأصلية وتطبيق أحدث أساليب التشطيب بدقة واحترافية عالية.'
                  : 'Transforming residential and commercial interiors into elegant spaces through certified materials, precise application, and outstanding craftsmanship.'}
              </p>
            </div>

            <div className={`p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 ${
              lang === 'ar' ? 'text-right' : 'text-left'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-[#F8F7F4] border border-[#D4A63D]/30 flex items-center justify-center text-[#D4A63D]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#081B33]">
                {lang === 'ar' ? 'قيمنا' : 'Our Values'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'الشفافية في الأسعار، المصداقية في المواعيد، الإتقان في كل زاوية، ونظافة تامة للمكان تحترم راحة العميل وخصوصيته.'
                  : 'Price transparency, schedule punctuality, flawless craftsmanship, and absolute respect for your home environment.'}
              </p>
            </div>
          </div>

          {/* Why Choose Us Grid */}
          <div className="pt-8">
            <div className="text-center mb-12">
              <span className="text-[#D4A63D] font-bold text-xs uppercase tracking-wider block mb-2">
                {lang === 'ar' ? 'لماذا القصر الذهبي؟' : 'Why Golden Palace?'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#081B33]">
                {lang === 'ar' ? 'معايير ثابتة تميز أعمالنا في كل مشروع' : 'Core Standards Defining Our Work'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#D4A63D]/60 hover:shadow-lg transition-all text-center space-y-3 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#081B33] text-[#D4A63D] flex items-center justify-center mx-auto group-hover:bg-[#D4A63D] group-hover:text-black transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-[#081B33]">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {lang === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#081B33] to-[#0D233F] border border-[#D4A63D]/40 p-8 sm:p-12 text-center text-white space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {lang === 'ar' ? 'جاهز لتجديد منزلك بأفضل عروض الدهانات؟' : 'Ready to Refresh Your Home With Top Paint Offers?'}
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto text-sm">
              {lang === 'ar'
                ? 'تواصل معنا الآن لمعاينة موقعك وتقديم عرض سعر فوري ومجاني بالخبر أو الدمام أو القطيف.'
                : 'Contact us today for a free on-site consultation and instant quote in Khobar, Dammam, or Qatif.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="tel:0561095508"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4A63D] hover:bg-[#F5D77A] text-black font-bold text-sm transition-all shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>0561095508</span>
              </a>
              <a
                href="https://wa.me/966561095508"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#22bf5b] text-white font-bold text-sm transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
