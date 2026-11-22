'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeroHeader } from '@/components/common/PageHeroHeader';
import {
  FileText,
  MessageCircle,
  Phone,
  MapPin,
  Paintbrush,
  CheckCircle2,
  ShieldCheck,
  Building,
  User,
  Send,
  Gift,
  Check,
} from 'lucide-react';

export function QuotationClientView() {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'الخبر',
    district: '',
    service: 'عرض دهان 3 غرف (1000 ريال)',
    propertyType: 'فيلا',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const servicesList = [
    'عرض دهان 3 غرف (1000 ريال)',
    'عرض دهان غرفتين (700 ريال)',
    'عرض دهان غرفة واحدة (500 ريال)',
    '01 — دهانات المنازل',
    '02 — دهانات الفلل',
    '03 — دهانات الشقق',
    '04 — دهانات المجالس',
    '05 — الدهانات الداخلية',
    '06 — الدهانات الخارجية',
    'دهان وتشطيب أسقف وجبس (100 ريال)',
    'دهان وتجديد أبواب (90 ريال)',
    'ديكورات بديل الرخام وبديل الخشب',
  ];

  const citiesList = [
    'الخبر',
    'الدمام',
    'القطيف',
    'الظهران',
    'سيهات',
    'الجبيل',
    'المنطقة الشرقية (أخرى)',
  ];

  const propertyTypes = ['فيلا', 'شقة', 'مجلس', 'دور كامل', 'مبنى تجاري', 'أخرى'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Prepare WhatsApp Message (No field is mandatory)
    const name = formData.customerName.trim() || 'عميل كريم';
    const phone = formData.phone.trim() || 'سيتم التواصل عبر هذا الرقم';
    const city = formData.city || 'المنطقة الشرقية';
    const district = formData.district.trim() ? ` - ${formData.district.trim()}` : '';
    const service = formData.service || 'دهانات وتشطيبات';
    const prop = formData.propertyType || 'غير محدد';
    const notes = formData.notes.trim() ? `\n📝 ملاحظات: ${formData.notes.trim()}` : '';

    const waText =
      `السلام عليكم ورحمة الله وبركاته\n` +
      `أود الاستفسار وطلب معاينة وعرض سعر من موقع القصر الذهبي للدهانات:\n\n` +
      `👤 الاسم: ${name}\n` +
      `📱 رقم الجوال: ${phone}\n` +
      `📍 الموقع: ${city}${district}\n` +
      `🎨 الخدمة المطلوبة: ${service}\n` +
      `🏡 نوع العقار: ${prop}` +
      `${notes}\n\n` +
      `🎁 العرض المطلوب: الاستفادة من خصم 30% + معاينة موقع مجانية`;

    const waUrl = `https://wa.me/966561095508?text=${encodeURIComponent(waText)}`;

    // Background logging to internal API (non-blocking)
    try {
      fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName.trim() || 'عميل بدون اسم',
          phone: formData.phone.trim() || 'واتساب مباشر',
          city: formData.city,
          projectLocation: `${formData.city}${district}`,
          requiredService: formData.service,
          projectType: formData.propertyType,
          description: formData.notes.trim() || 'طلب معاينة سريع عبر صفحة واحدة',
          preferredContact: 'whatsapp',
        }),
      }).catch(() => {});
    } catch {}

    setSubmitted(true);
    setIsSending(false);

    // Open WhatsApp immediately
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col justify-between font-madani">
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* Page Hero Header with Luxury Architectural Photo */}
        <PageHeroHeader
          badgeText="نموذج طلب عرض السعر والمعاينة المجانية"
          badgeIcon={FileText}
          title="اطلب معاينتك وعرض السعر بدقيقة واحدة"
          description="املأ النموذج البسيط أدناه بكل سهولة وبدون تعقيد، وسيتم إرسال كافة التفاصيل مباشرة لفريقنا عبر واتساب للتواصل وتحديد موعد المعاينة فوراً."
          bgImage="/images/hero/hero-living-room.webp"
          ctaWhatsAppText="تواصل واتساب فوري مع الفني"
        />

        {/* Form Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white border border-[#D4A63D]/30 shadow-xl p-6 sm:p-10 relative overflow-hidden luxury-card"
          >
            
            {/* Top Gift / Welcome Banner */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-[#D4A63D]/40 flex items-center justify-between gap-3 text-right">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-[#D4A63D]/20 text-[#A87818] shrink-0">
                  <Gift className="w-5 h-5 text-[#D4A63D]" />
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-[#081B33]">
                    عرض حصري: خصم 30% على أعمال الدهان + معاينة موقع مجانية
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                    الدمام • الخبر • القطيف • سيهات • الظهران — لا يلزم ملء جميع الحقول، اكتب ما يناسبك واضغط إرسال!
                  </p>
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#081B33]">
                  تم استلام طلبك وجاري فتح واتساب للتواصل المباشر!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  إذا لم تفتح نافذة واتساب تلقائياً، يمكنك الضغط على الزر أدناه لبدء المحادثة ومشاركة تفاصيل طلبك مع الفني فوراً.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/966561095508"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>فتح محادثة واتساب الآن</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    تعديل البيانات أو إرسال طلب جديد
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-right">
                
                {/* 1. Name & Phone (Optional, easy) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#081B33]">
                      الاسم الكريم <span className="text-slate-400 font-normal">(اختياري)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="مثال: أبو فهد"
                        className="w-full pr-10 pl-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4A63D] focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#081B33]">
                      رقم الجوال <span className="text-slate-400 font-normal">(للتواصل أو فتح واتساب)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05XXXXXXXX"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4A63D] focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all font-mono text-right"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* 2. City & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#081B33]">
                      المدينة بالمنطقة الشرقية
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4A63D] focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all"
                    >
                      {citiesList.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#081B33]">
                      الحي السكني <span className="text-slate-400 font-normal">(اختياري)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        placeholder="مثال: الحزام الذهبي، الشاطئ، الراكة..."
                        className="w-full pr-10 pl-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4A63D] focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* 3. Service Choice */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#081B33]">
                    الخدمة أو العرض المطلوب
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4A63D] focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all font-bold text-[#A87818]"
                  >
                    {servicesList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Quick Property Type Chips */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#081B33]">
                    نوع العقار <span className="text-slate-400 font-normal">(اضغط للاختيار)</span>
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {propertyTypes.map((pt) => {
                      const isSelected = formData.propertyType === pt;
                      return (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => setFormData({ ...formData, propertyType: pt })}
                          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-[#081B33] text-[#F5D77A] shadow-md border-2 border-[#D4A63D]'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {pt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Notes / Specifics */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#081B33]">
                    أي ملاحظات أو تفاصيل إضافية <span className="text-slate-400 font-normal">(اختياري)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="مثال: أريد دهان غرفة نوم وصالة بدهانات جوتن فينوماستيك، أو تحديد موعد المعاينة غداً بعد العصر..."
                    className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#D4A63D] focus:bg-white text-xs sm:text-sm text-slate-800 outline-none transition-all resize-none"
                  />
                </div>

                {/* Assurance Points */}
                <div className="p-4 rounded-2xl bg-[#FCFBFA] border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A63D] shrink-0" />
                    <span>معاينة وتحديد ألوان مجاناً</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A63D] shrink-0" />
                    <span>دهانات جوتن أصلية 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A63D] shrink-0" />
                    <span>ضمان معتمد 5 سنوات</span>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1ebd5a] hover:from-[#20ba59] hover:to-[#1aa34e] text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>إرسال الطلب عبر واتساب مباشرة</span>
                  </button>

                  <a
                    href="tel:0561095508"
                    className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-[#081B33] hover:bg-[#102743] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
                  >
                    <Phone className="w-4 h-4 text-[#F5D77A]" />
                    <span dir="ltr">0561095508</span>
                  </a>
                </div>

                <p className="text-center text-[11px] text-slate-400">
                  بمجرد الضغط على الزر، سيتم فتح محادثة واتساب الرسمية مع الفني مباشرة لمتابعة موعد المعاينة المجانية.
                </p>

              </form>
            )}

          </motion.div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
