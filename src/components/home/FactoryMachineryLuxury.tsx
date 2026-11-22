'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import {
  Cpu,
  Layers,
  Award,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Settings,
  Wifi,
  Smartphone,
  ShieldCheck,
  Maximize2,
  Table,
  Gauge,
  Factory
} from 'lucide-react';
import { ModernWhatsAppIcon, ModernPhoneIcon } from '../common/SocialIcons';

interface MachineModel {
  id: string;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  taglineAr: string;
  taglineEn: string;
  image: string;
  detailImage: string;
  isRealWorkshop?: boolean;
  featuresAr: string[];
  featuresEn: string[];
  specs: {
    bladeDiameter: string;
    mainMotor: string;
    tableSize: string;
    tiltingDegree: string;
    rotatingDegree: string;
    maxCuttingSize: string;
    waterConsumption: string;
    weight: string;
  };
}

const machinesData: MachineModel[] = [
  {
    id: 'qsj-laser',
    nameAr: 'ماكينة المنشار الجسري الذكي بالليزر وإنترنت الأشياء (QSJ-Series)',
    nameEn: 'Intelligent Laser & IoT Bridge Cutting Machine (QSJ Series)',
    badgeAr: 'تقنية ليزر وإنترنت الأشياء 4G',
    badgeEn: 'Laser Guided & 4G IoT',
    taglineAr: 'قص آلي عالي الدقة بتحكم رقمي PLC ومحاذاة ليزرية للشطفات المعمارية المعقدة',
    taglineEn: 'Automated PLC precision stone cutting with signing laser and remote 4G mobile monitoring',
    image: '/images/machinery/laser-bridge-saw-dinosaw.jpg',
    detailImage: '/images/machinery/laser-bridge-specs-iot.jpg',
    featuresAr: [
      'نظام توجيه ومحاذاة بالليزر عالي الدقة (Signing Laser) لضبط خطوط القص بنسبة خطأ متناهية الصغر.',
      'وحدة اتصال مدمجة 4G وتقنية إنترنت الأشياء (IoT) لمراقبة أداء الماكينة على مدار 24 ساعة عبر الهاتف.',
      'نظام رفع هيدروليكي رباعي الأعمدة (4-Pillars Lifting) يضمن ثباتاً مطلقاً ويمنع الاهتزاز أثناء القص.',
      'طاولة عمل فولاذية هيدروليكية تميل من 0 إلى 85 درجة لتسهيل تحميل الألواح الضخمة وحمايتها من الكسر.',
      'دوران طاولة العمل هيدروليكياً بزاوية 90° و360° لتنفيذ كافة الزوايا والشطفات الهندسية بدقة تامة.',
      'مكتبة رسومات مدمجة (Drawing Library) تمكن الفنيين من تنفيذ أحدث أشكال الطاولات والديكورات دون الحاجة لبرمجة معقدة.'
    ],
    featuresEn: [
      'Precision signing laser alignment ensuring micro-millimeter cut line accuracy.',
      'Integrated 4G IoT module for 24/7 real-time operational diagnostics and mobile fleet monitoring.',
      'Heavy-duty 4-pillar hydraulic lifting mechanism preventing structural vibration during deep blade penetration.',
      'Hydraulic tilting worktable (0° to 85°) enabling safe loading of fragile monumental marble slabs.',
      'Automatic 90° and full 360° rotating table for seamless compound bevels and architectural angles.',
      'Pre-loaded parametric drawing library for immediate luxury table silhouettes without manual CAD programming.'
    ],
    specs: {
      bladeDiameter: '400 / 600 / 800 مم',
      mainMotor: '15 / 18.5 / 22 كيلوواط',
      tableSize: '3200 × 2000 مم',
      tiltingDegree: 'من 0 إلى 85 درجة هيدروليكياً',
      rotatingDegree: '90° إلى 360° أوتوماتيكي',
      maxCuttingSize: 'حتى 3200 × 3200 × 280 مم',
      waterConsumption: '3 متر مكعب / ساعة',
      weight: '5000 إلى 5500 كجم'
    }
  },
  {
    id: 'weiai-600',
    nameAr: 'ماكينة القص والشطف الصناعية ورشة العمل (WEIAI 600#)',
    nameEn: 'Heavy-Duty Workshop Manual & Bridge Cutter (WEIAI 600#)',
    badgeAr: 'خط الإنتاج الميداني بالرياض',
    badgeEn: 'Active Riyadh Workshop Line',
    taglineAr: 'الماكينة الأساسية في خطوط تصنيع وطحن وشطف حواف الرخام والجرانيت بمصنعنا',
    taglineEn: 'Primary industrial fabrication workhorse for straight, beveled, and profile stone sawing',
    image: '/images/machinery/workshop-cutter-weiai-real.jpg',
    detailImage: '/images/machinery/manual-cutter-600-specs.jpg',
    isRealWorkshop: true,
    featuresAr: [
      'ماكينة مثبتة ميدانياً في ورشة التصنيع بحي المناخ بالرياض ومجهزة لإنتاج كميات ضخمة يومياً.',
      'قرص منشار ماسي بقطر يصل إلى 600 مم لقص أثقل كتل الرخام والجرانيت الطبيعي فائق الصلابة.',
      'طاولة تشغيل بطول 3000 مم تتيح تفصيل أطول طاولات الطعام والمجالس والمغاسل المنحوتة كقطعة واحدة.',
      'عجلة توجيه يدوية ومجاري انزلاق مسننة معالجة حرارياً تمنح الفني دقة تامة في تغذية القرص.',
      'محرك رئيسي صناعي بقوة 15 كيلوواط يوفر عزماً ثابتاً لمنع تكسر أطراف الرخام الحساس.',
      'مثالية لقص ألواح البوك ماتش والدرج والنعلات والشطفات الإيطالية بزاوية 45 درجة.'
    ],
    featuresEn: [
      'Physically operating on our Riyadh factory floor in Al-Manakh, delivering high-volume output daily.',
      'Industrial diamond saw blade up to 600mm capable of conquering dense natural granite and basalt.',
      'Generous 3,000mm worktable accommodating seamless full-length monolithic dining tops and majlis suites.',
      'Handwheel gear-rack guidance giving stonemasons total tactile finesse over feed rate and edge purity.',
      'High-torque 15 kW motor ensuring splinter-free edges even on fragile crystalline onyx and statuario.',
      'Specialized for 45-degree mitered apron cuts, custom stair treads, and bookmatched panels.'
    ],
    specs: {
      bladeDiameter: '350 - 600 مم',
      mainMotor: '15 كيلوواط (Heavy Duty)',
      tableSize: '3000 مم (Worktable Length)',
      tiltingDegree: 'شطف بزوايا مخصصة (45° / 90°)',
      rotatingDegree: 'توجيه يدوي وميكانيكي مرن',
      maxCuttingSize: '4600 × 1500 × 1500 مم (أبعاد الماكينة)',
      waterConsumption: 'تبريد مستمر بنظام إعادة التدوير',
      weight: 'هيكل حديدي صلب ضد الاهتزاز'
    }
  }
];

export const FactoryMachineryLuxury: React.FC = () => {
  const { lang } = useLanguage();
  const [machines, setMachines] = useState<MachineModel[]>(machinesData);
  const [activeTab, setActiveTab] = useState<string>(machinesData[0]?.id || 'qsj-laser');
  const [showSpecsModal, setShowSpecsModal] = useState(false);

  useEffect(() => {
    fetch('/api/machinery')
      .then((res) => res.json())
      .then((data) => {
        if (data.machinery && Array.isArray(data.machinery) && data.machinery.length > 0) {
          setMachines(data.machinery);
          setActiveTab(data.machinery[0].id);
        }
      })
      .catch(() => {});
  }, []);

  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;
  const currentMachine = machines.find((m) => m.id === activeTab) || machines[0];

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAF8F5] text-[#1E1D1B] border-t border-[#EAE5DC] relative overflow-hidden">
      {/* Background Technical Watermark Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1E1D1B 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 ${
            lang === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-bold text-[#C5A059] tracking-wider uppercase mb-3">
              <Factory className="w-4 h-4 text-[#C5A059]" />
              <span className="w-6 h-px bg-[#C5A059]" />
              <span>
                {lang === 'ar'
                  ? 'التجهيزات الصناعية وخطوط الإنتاج — الرياض'
                  : 'Industrial Machinery & Production Lines — Riyadh'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight">
              {lang === 'ar'
                ? 'ماكينات متطورة تضمن دقة القص بالمليمتر'
                : 'Advanced Machinery Guaranteeing Millimeter Precision'}
            </h2>
            <p className="text-sm sm:text-base text-[#6E675D] max-w-2xl mt-3.5 leading-relaxed">
              {lang === 'ar'
                ? 'نستثمر في مصنعنا بالرياض في أحدث ماكينات المناشير الجسرية الليزرية المدعومة بأنظمة إنترنت الأشياء (IoT) والتحكم الرقمي PLC، إلى جانب خطوط القص والشطف الميكانيكي، لنقدم أعلى درجات الدقة الهندسية وأسرع تسليم.'
                : 'We equip our Riyadh factory with state-of-the-art laser-guided IoT bridge saws and industrial shaping machinery, ensuring microscopic accuracy, flawless edge profiling, and expedited execution.'}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/966530200529?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D9%82%D8%B5%20%D9%88%D8%A7%D9%84%D8%AA%D8%B4%D9%83%D9%8A%D9%84%20%D8%A8%D9%85%D8%A7%D9%83%D9%8A%D9%86%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D8%B5%D9%86%D8%A7%D8%B9%D9%8A%D8%A9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1E1D1B] hover:bg-[#C5A059] text-white hover:text-black font-bold text-xs sm:text-sm transition-all shadow-md group"
            >
              <ModernWhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-black" />
              <span>{lang === 'ar' ? 'استفسر عن خدمات القص والتفصيل' : 'Inquire on Cutting Services'}</span>
            </a>
          </div>
        </motion.div>

        {/* Machine Switcher Tabs */}
        <div className="flex items-center justify-start gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {machines.map((m) => {
            const isActive = m.id === activeTab;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-[#1E1D1B] text-[#D8B369] border-[#C5A059] shadow-xl'
                    : 'bg-white text-[#5E5A54] border-[#EAE5DC] hover:border-[#C5A059]/50 hover:bg-[#F5F0E8]'
                }`}
              >
                <Cpu className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#8C8377]'}`} />
                <span>{lang === 'ar' ? m.nameAr : m.nameEn}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[#C5A059]/20 text-[#D8B369]' : 'bg-[#EAE5DC] text-[#7A7267]'
                  }`}
                >
                  {lang === 'ar' ? m.badgeAr : m.badgeEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Machine Showcase Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMachine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Visual Column — Dual Photography with Real Equipment Proof */}
            <motion.div
              initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-5"
            >
              {/* Primary Image Frame */}
              <div className="relative aspect-[16/11] rounded-3xl overflow-hidden bg-[#1E1D1B] border border-[#EAE5DC] shadow-xl group">
                <img
                  src={currentMachine.image}
                  alt={lang === 'ar' ? currentMachine.nameAr : currentMachine.nameEn}
                  className="w-full h-full object-cover object-center filter contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Overlaid Badges */}
                <div
                  className={`absolute top-4 flex items-center gap-2 ${
                    lang === 'ar' ? 'right-4' : 'left-4'
                  }`}
                >
                  <span className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-bold text-[#D8B369] border border-[#C5A059]/40 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{lang === 'ar' ? currentMachine.badgeAr : currentMachine.badgeEn}</span>
                  </span>
                  {currentMachine.isRealWorkshop && (
                    <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{lang === 'ar' ? 'صورة حية من ورشتنا بالرياض' : 'Live From Riyadh Workshop'}</span>
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Title */}
                <div
                  className={`absolute bottom-5 right-5 left-5 text-white ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  }`}
                >
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                    {lang === 'ar' ? currentMachine.nameAr : currentMachine.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EAE5DC]/85 mt-1 line-clamp-1">
                    {lang === 'ar' ? currentMachine.taglineAr : currentMachine.taglineEn}
                  </p>
                </div>
              </div>

              {/* Secondary Diagram / Technical Inset Frame */}
              <div className="relative aspect-[16/8] sm:aspect-[16/7] rounded-3xl overflow-hidden bg-white border border-[#EAE5DC] shadow-md p-3 group">
                <img
                  src={currentMachine.detailImage}
                  alt={lang === 'ar' ? 'مخطط ومواصفات الماكينة' : 'Machine technical schematic'}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div
                  className={`absolute bottom-3 ${
                    lang === 'ar' ? 'left-4' : 'right-4'
                  } bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/90 font-mono`}
                >
                  {lang === 'ar' ? 'المخطط الهندسي والمكونات التشغيلية' : 'Engineering Schematics & Components'}
                </div>
              </div>

              {/* Quick Contact Bar for Factory Tours */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#EAE5DC] shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center text-[#C5A059]">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E1D1B] block">
                      {lang === 'ar' ? 'مستودع ومصنع القصر الذهبي للدهانات' : 'Elegant East Towers Factory'}
                    </span>
                    <span className="text-[11px] text-[#7A7267]">
                      {lang === 'ar' ? 'الرياض — حي المناخ (طريق الخرج)' : 'Riyadh — Al-Manakh District'}
                    </span>
                  </div>
                </div>

                <a
                  href="tel:0530200529"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#C5A059] text-[#1E1D1B] hover:text-black font-bold text-xs border border-[#EAE5DC] transition-all"
                >
                  <ModernPhoneIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span dir="ltr">0530200529</span>
                </a>
              </div>
            </motion.div>

            {/* Content & Specs Column */}
            <motion.div
              initial={{ opacity: 0, x: lang === 'ar' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:col-span-6 space-y-6 ${
                lang === 'ar' ? 'text-right' : 'text-left'
              }`}
            >
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-2">
                  <Settings className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'المزايا التشغيلية والقدرات' : 'Operational Capabilities'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1E1D1B] leading-snug">
                  {lang === 'ar' ? currentMachine.nameAr : currentMachine.nameEn}
                </h3>
                <p className="text-sm text-[#6E675D] leading-relaxed mt-2.5">
                  {lang === 'ar' ? currentMachine.taglineAr : currentMachine.taglineEn}
                </p>
              </div>

              {/* Key Features Bullet List */}
              <div className="space-y-3 pt-2">
                {currentMachine.featuresAr.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#EAE5DC] shadow-sm hover:border-[#C5A059]/60 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#3E3A34] leading-relaxed">
                      {lang === 'ar' ? feat : currentMachine.featuresEn[idx]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technical Specifications Grid (Exact Manufacturer Data) */}
              <div className="pt-3">
                <div className="flex items-center justify-between mb-3.5">
                  <h4 className="text-sm font-bold text-[#1E1D1B] flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-[#C5A059]" />
                    <span>{lang === 'ar' ? 'المواصفات الفنية المعتمدة' : 'Technical Specifications'}</span>
                  </h4>
                  <span className="text-[11px] font-mono text-[#8C8377]">ISO & CE Certified</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE5DC] shadow-sm">
                    <span className="text-[10px] font-bold text-[#8C8377] uppercase block mb-1">
                      {lang === 'ar' ? 'أقصى قطر لقرص المنشار' : 'Blade Diameter'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1E1D1B] font-mono">
                      {currentMachine.specs.bladeDiameter}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE5DC] shadow-sm">
                    <span className="text-[10px] font-bold text-[#8C8377] uppercase block mb-1">
                      {lang === 'ar' ? 'قدرة المحرك الرئيسي' : 'Main Motor Power'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1E1D1B] font-mono">
                      {currentMachine.specs.mainMotor}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE5DC] shadow-sm">
                    <span className="text-[10px] font-bold text-[#8C8377] uppercase block mb-1">
                      {lang === 'ar' ? 'أبعاد طاولة العمل' : 'Worktable Size'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1E1D1B] font-mono">
                      {currentMachine.specs.tableSize}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE5DC] shadow-sm">
                    <span className="text-[10px] font-bold text-[#8C8377] uppercase block mb-1">
                      {lang === 'ar' ? 'إمالة الطاولة الهيدروليكية' : 'Table Tilting'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1E1D1B]">
                      {currentMachine.specs.tiltingDegree}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE5DC] shadow-sm">
                    <span className="text-[10px] font-bold text-[#8C8377] uppercase block mb-1">
                      {lang === 'ar' ? 'دوران الطاولة الميكانيكي' : 'Table Rotation'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1E1D1B]">
                      {currentMachine.specs.rotatingDegree}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE5DC] shadow-sm">
                    <span className="text-[10px] font-bold text-[#8C8377] uppercase block mb-1">
                      {lang === 'ar' ? 'أقصى أبعاد للقص' : 'Max Cutting Size'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1E1D1B] font-mono">
                      {currentMachine.specs.maxCuttingSize}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call to action for custom cutting */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/quotation"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-xs sm:text-sm shadow-md transition-all text-center group"
                >
                  <span>{lang === 'ar' ? 'طلب تفصيل رخام بمقاساتك الخاصة' : 'Commission Custom Cut Stone'}</span>
                  <Arrow
                    className={`w-4 h-4 transition-transform ${
                      lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                    }`}
                  />
                </Link>

                <a
                  href="https://wa.me/966530200529?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%B2%D9%8A%D8%A7%D8%B1%D8%A9%20%D9%85%D8%B5%D9%86%D8%B9%20%D8%A3%D8%A8%D8%B1%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B4%D8%B1%D9%82%20%D9%88%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D8%AE%D8%B7%D9%88%D8%B7%20%D8%A7%D9%84%D9%82%D8%B5%20%D9%88%D8%A7%D9%84%D8%A3%D9%84%D9%88%D8%A7%D8%AD%20%D8%A8%D8%AD%D9%8A%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%AE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1E1D1B] font-semibold text-xs sm:text-sm border border-[#EAE5DC] hover:border-[#C5A059] transition-all text-center"
                >
                  <ModernWhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>{lang === 'ar' ? 'حجز موعد زيارة المصنع' : 'Book Factory Visit'}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

