'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { Layers, MapPin, Check, ArrowLeft, ArrowRight } from 'lucide-react';

const slabs = [
  {
    id: 'calacatta-viola',
    nameAr: 'رخام كلكتا فيولا (Calacatta Viola)',
    nameEn: 'Calacatta Viola Marble',
    typeAr: 'رخام طبيعي نخب أول',
    typeEn: 'First-Grade Natural Marble',
    originAr: 'محاجر كارارا — إيطاليا',
    originEn: 'Carrara — Italy',
    image: '/images/materials_real/slab-calacatta-viola.jpg',
    descAr: 'أرضية بيضاء عاجية كريستالية تتخللها عروق درامية ذهبية وعنابية، يعتبر الخيار الأرقى لطاولات الطعام والبوك ماتش.',
    descEn: 'Luminous ivory background woven with dramatic golden and burgundy ribbons, the quintessential choice for bespoke dining tables.',
    thickness: '20mm / 30mm',
    finishAr: 'مصقول كريستالي عالي اللمعان',
    finishEn: 'Mirror High-Gloss Polish',
    bestForAr: ['طاولات طعام ملكية', 'كونسول صالات الضيافة', 'تكسيات جدارية متناظرة'],
    bestForEn: ['Royal Dining Tables', 'Foyer Consoles', 'Bookmatched Cladding'],
  },
  {
    id: 'deep-river-marble',
    nameAr: 'رخام ديب ريفر الأبيض (Deep River Marble)',
    nameEn: 'Deep River White Marble',
    typeAr: 'رخام فائق النقاوة',
    typeEn: 'Ultra-Pure Elite Marble',
    originAr: 'جبال أبوان — إيطاليا',
    originEn: 'Apuan Alps — Italy',
    image: '/images/materials_real/slab-deep-river-marble.jpg',
    descAr: 'رمز الفخامة الكلاسيكية الخالدة، يتميز بنقاء لونه الساطع وتوزيع عروقه العريضة الجريئة التي تمنح الفراغ هيبة فورية.',
    descEn: 'Pristine pure white field dissected by bold sculptural slate-grey veins, commanding immediate architectural presence.',
    thickness: '20mm',
    finishAr: 'مصقول زجاجي / مطفي حريري',
    finishEn: 'Polished Gloss / Honed Satin',
    bestForAr: ['مكاتب مجالس الإدارة', 'مغاسل منحوتة فندقية', 'أرضيات قصور'],
    bestForEn: ['Boardroom Desks', 'Monolithic Sinks', 'Palatial Flooring'],
  },
  {
    id: 'absolute-black-granite',
    nameAr: 'جرانيت أبسولوت بلاك (Absolute Black Granite)',
    nameEn: 'Absolute Black Granite',
    typeAr: 'جرانيت طبيعي فائق الصلابة',
    typeEn: 'Deep Basalt Heavy-Duty Stone',
    originAr: 'محاجر بركانية فائقة الصلابة',
    originEn: 'Deep Basalt Quarries',
    image: '/images/materials_real/slab-absolute-black-granite.jpg',
    descAr: 'سواد ليلي عميق وصلابة ميكانيكية لا تتأثر بالخدوش أو الحرارة، يوفر خلفية معاصرة مذهلة عند دمجه مع الستانلس الذهبي وخشب الجوز.',
    descEn: 'Deep obsidian basalt with indestructible resilience against scratches and heat, forming striking contrast with brushed gold.',
    thickness: '20mm / 30mm',
    finishAr: 'تشطيب جلدي (Leathered) / مصقول',
    finishEn: 'Leathered Tactile / High Polished',
    bestForAr: ['مكاتب تنفيذية للمدراء', 'أسطح طاولات متينة', 'واجهات وأرضيات'],
    bestForEn: ['Executive Desks', 'Heavy-Duty Countertops', 'Architectural Facades'],
  },
  {
    id: 'roman-travertine',
    nameAr: 'ترافرتين بيج روماني (Roman Travertine)',
    nameEn: 'Roman Classic Travertine',
    typeAr: 'حجر جيري طبيعي معتق',
    typeEn: 'Ancient Sedimentary Stone',
    originAr: 'تيفولي — إيطاليا',
    originEn: 'Tivoli — Italy',
    image: '/images/materials_real/slab-travertine.jpg',
    descAr: 'الخامة الأكثر طلباً في الديكورات المودرن الهادئة، بمساماتها الطبيعية الدافئة وتدرجات البيج الرملي التي تضفي سكينة على طاولات القهوة.',
    descEn: 'Architectural sedimentary stone with warm linear pores and earthy sand tones, inspiring contemporary organic minimalism.',
    thickness: '20mm / 30mm',
    finishAr: 'مسامات مفتوحة معتقة / معبأة ومصقولة',
    finishEn: 'Open-Pore Honed / Filled & Honed',
    bestForAr: ['طاولات قهوة عضوية', 'قواعد أسطوانية', 'كونسول بطابع حجري'],
    bestForEn: ['Organic Coffee Tables', 'Fluted Plinths', 'Earthy Consoles'],
  },
  {
    id: 'natural-granite-grey',
    nameAr: 'جرانيت طبيعي حبيبي رمادي (Crystalline Granite)',
    nameEn: 'Natural Crystalline Granite',
    typeAr: 'جرانيت صخري طبيعي',
    typeEn: 'Natural Crystalline Stone',
    originAr: 'محاجر الجرانيت الطبيعي',
    originEn: 'Natural Granite Quarries',
    image: '/images/materials_real/slab-granite.jpg',
    descAr: 'حبيبات بلورية طبيعية دقيقة وصلابة استثنائية، خيار مثالي للأسطح التي تتطلب تحملاً عالياً للاستخدام اليومي الشاق.',
    descEn: 'Fine natural crystalline grains and exceptional mineral hardness, ideal for surfaces requiring heavy-duty daily performance.',
    thickness: '20mm / 30mm',
    finishAr: 'مصقول / مفرش بالرمال',
    finishEn: 'Polished / Sandblasted',
    bestForAr: ['أسطح طاولات كبرى', 'كونترات خارجية', 'مغاسل حجرية'],
    bestForEn: ['Grand Table Surfaces', 'Outdoor Counters', 'Carved Sinks'],
  },
  {
    id: 'natural-basalt',
    nameAr: 'حجر بازلت بركاني طبيعي (Natural Basalt)',
    nameEn: 'Natural Volcanic Basalt',
    typeAr: 'حجر بركاني صلب معتق',
    typeEn: 'Aged Volcanic Stone',
    originAr: 'محاجر البازلت الطبيعي',
    originEn: 'Natural Basalt Quarries',
    image: '/images/materials_real/slab-basalt.jpg',
    descAr: 'حجر طبيعي بركاني ذو لون رمادي فحمي عميق وبنية معدنية كثيفة، يضفي طابعاً أثرياً معاصراً على طاولات الحدائق والمجالس.',
    descEn: 'Natural volcanic stone featuring deep charcoal tonality and dense mineral structure, imparting ancient contemporary elegance.',
    thickness: '20mm / 30mm',
    finishAr: 'معتق / ملتهب Flamed',
    finishEn: 'Flamed / Honed Tactile',
    bestForAr: ['طاولات قهوة حجرية', 'قواعد منحوتة', 'مداخل المجالس'],
    bestForEn: ['Stone Coffee Tables', 'Carved Plinths', 'Majlis Foyers'],
  },
];

export const MaterialCollectionsLuxury: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedId, setSelectedId] = useState(slabs[0].id);

  const selected = slabs.find((s) => s.id === selectedId) || slabs[0];
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#F5F2EB] text-[#1E1D1B] border-t border-[#EAE5DC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`max-w-3xl mb-12 sm:mb-16 ${
            lang === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] tracking-wider uppercase mb-3">
            <Layers className="w-4 h-4" />
            <span>{lang === 'ar' ? 'معرض الخامات والألواح الحصرية' : 'Curated Natural Stone Portfolio'}</span>
          </div>
          {/* Heading exact as requested: خامات طبيعية بتفاصيل استثنائية */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight mb-4">
            {lang === 'ar' ? 'خامات طبيعية بتفاصيل استثنائية' : 'Natural Materials with Exceptional Nuances'}
          </h2>
          <p className="text-sm sm:text-base text-[#6E675D] leading-relaxed">
            {lang === 'ar'
              ? 'ننتقي أحجارنا مباشرة من أشهر المقالع الحجرية في إيطاليا وإسبانيا، ونفحص ألواح الرخام الطبيعي للتأكد من خلوها من الشروخ وتناسق تدفق عروقها.'
              : 'Directly sourced from prestigious quarries across Italy and Spain, inspected for structural integrity and harmonic vein continuity.'}
          </p>
        </div>

        {/* Interactive Master Stone Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Slabs Navigation with Dynamic Slide */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-5 flex flex-col gap-3 ${
              lang === 'ar' ? 'order-2 lg:order-1' : 'order-2 lg:order-1'
            }`}
          >
            {slabs.map((item) => {
              const active = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  } ${
                    active
                      ? 'bg-white border-[#C5A059] shadow-md scale-[1.01]'
                      : 'bg-white/60 hover:bg-white border-[#EAE5DC] hover:border-[#D8CDBB]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/10 shrink-0">
                      <img
                        src={item.image}
                        alt={lang === 'ar' ? item.nameAr : item.nameEn}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E1D1B]">
                        {lang === 'ar' ? item.nameAr : item.nameEn}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-[#8C8377] mt-0.5">
                        <MapPin className="w-3 h-3 text-[#C5A059]" />
                        <span>{lang === 'ar' ? item.originAr : item.originEn}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      active ? 'bg-[#C5A059] text-black' : 'bg-[#EAE5DC] text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Active Slab Large Display with Dynamic Slide */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 ${
              lang === 'ar' ? 'order-1 lg:order-2' : 'order-1 lg:order-2'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-[#EAE5DC] overflow-hidden shadow-xl flex flex-col justify-between h-full"
              >
                {/* Large Macro Texture Image */}
                <div className="relative aspect-[16/10] w-full bg-[#1E1D1B] overflow-hidden">
                  <img
                    src={selected.image}
                    alt={lang === 'ar' ? selected.nameAr : selected.nameEn}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter contrast-[1.05]"
                  />
                  <div
                    className={`absolute top-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-[#D8B369] ${
                      lang === 'ar' ? 'right-4' : 'left-4'
                    }`}
                  >
                    {lang === 'ar' ? selected.originAr : selected.originEn}
                  </div>
                  <div className="absolute bottom-4 right-4 left-4 p-3 rounded-xl bg-black/50 backdrop-blur-md text-white text-xs flex items-center justify-between">
                    <span>{lang === 'ar' ? 'متوفر بالمستودع للمعاينة' : 'In-Stock for In-Person Inspection'}</span>
                    <span className="text-[#C5A059] font-bold">
                      {lang === 'ar' ? 'الرياض - حي المناخ' : 'Riyadh - Al-Manakh'}
                    </span>
                  </div>
                </div>

                {/* Content & Specs */}
                <div
                  className={`p-6 sm:p-8 space-y-6 ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E1D1B]">
                      {lang === 'ar' ? selected.nameAr : selected.nameEn}
                    </h3>
                    <p className="text-sm text-[#6E675D] leading-relaxed mt-2">
                      {lang === 'ar' ? selected.descAr : selected.descEn}
                    </p>
                  </div>

                  {/* Specs Columns */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#EAE5DC]">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#8C8377] uppercase tracking-wider block">
                        {lang === 'ar' ? 'السماكات المتاحة' : 'Available Thickness'}
                      </span>
                      <span className="text-xs font-bold text-[#1E1D1B]">{selected.thickness}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#8C8377] uppercase tracking-wider block">
                        {lang === 'ar' ? 'التشطيب السطحي' : 'Surface Finish'}
                      </span>
                      <span className="text-xs font-bold text-[#1E1D1B]">
                        {lang === 'ar' ? selected.finishAr : selected.finishEn}
                      </span>
                    </div>
                  </div>

                  {/* Recommended uses */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-[#1E1D1B] block">
                      {lang === 'ar' ? 'أفضل التطبيقات في مصنعنا:' : 'Recommended Applications:'}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {(lang === 'ar' ? selected.bestForAr : selected.bestForEn).map((item, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-xs font-medium text-[#4A453E]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={`/quotation?material=${selected.id}`}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>{lang === 'ar' ? 'طلب تفصيل قطعة من هذا الحجر' : 'Commission a Piece in This Stone'}</span>
                      <Arrow
                        className={`w-4 h-4 transition-transform ${
                          lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                        }`}
                      />
                    </Link>

                    <Link
                      href="/materials"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white border border-[#D8CDBB] hover:border-[#C5A059] text-[#1E1D1B] font-semibold text-xs sm:text-sm transition-all text-center"
                    >
                      {lang === 'ar' ? 'استعراض جميع الخامات' : 'Explore All Materials'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
