'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Paintbrush } from 'lucide-react';

import { ISiteSettings } from '@/lib/models';

interface Props {
  settings?: ISiteSettings;
}

export const GoldenPalaceQuoteStrip: React.FC<Props> = ({ settings }) => {
  const whatsappNum = settings?.whatsapp || '0561095508';
  const stripTitle = settings?.quoteStripTitleAr || 'جاهز لتجديد منزلك بأرقى الألوان؟';
  const stripSubtext = settings?.quoteStripSubtextAr || 'تواصل معنا الآن واحصل على عرض سعر مميز وتشطيب فندقي بجودة عالية.';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: 'عرض دهان 3 غرف (1000 ريال)',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setSubmitting(true);
    try {
      await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          city: 'المنطقة الشرقية',
          projectLocation: 'الشرقية',
          requiredService: formData.service,
          projectType: 'طلب عرض سعر سريع',
          description: `طلب عرض سعر سريع عبر الشريط السفلي لخدمة: ${formData.service}`,
          attachments: [],
          preferredContact: 'whatsapp',
        }),
      });
    } catch {
      // non-fatal
    }

    setSubmitted(true);
    setSubmitting(false);

    // Open WhatsApp
    const text = `مرحباً القصر الذهبي، اسمي ${formData.fullName} وأود الاستفسار وطلب عرض سعر لـ: ${formData.service}`;
    window.open(`https://wa.me/966${whatsappNum.replace(/^0+/, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="w-full py-12 md:py-16 bg-[#F8F7F4] relative overflow-hidden border-t border-slate-200 font-madani">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Light Luxury Card with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#D4A63D]/30 p-6 sm:p-10 shadow-xl relative overflow-hidden luxury-card"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visual Paint Tools on Far Left on Desktop */}
            <div className="hidden lg:block lg:col-span-2 relative h-28">
              <Image
                src="/images/brand/quote-tools.webp"
                alt="أدوات ودهانات القصر الذهبي"
                fill
                className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Interactive Fast Form */}
            <div className="lg:col-span-6">
              {submitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-emerald-800 font-bold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>تم إرسال طلبك بنجاح وجاري فتح واتساب للتواصل المباشر!</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  
                  {/* Name (3 cols) */}
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      required
                      placeholder="الاسم الكريم *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#D4A63D] focus:ring-1 focus:ring-[#D4A63D] text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
                    />
                  </div>

                  {/* Phone (3 cols) */}
                  <div className="sm:col-span-3">
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="05XXXXXXXX *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#D4A63D] focus:ring-1 focus:ring-[#D4A63D] text-xs text-slate-800 placeholder-slate-400 outline-none transition-all text-right font-mono"
                    />
                  </div>

                  {/* Service (3 cols) */}
                  <div className="sm:col-span-3">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full py-2.5 px-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#D4A63D] focus:ring-1 focus:ring-[#D4A63D] text-xs text-slate-800 outline-none transition-all"
                    >
                      <option value="عرض دهان 3 غرف (1000 ريال)">دهان 3 غرف (1,000 ريال)</option>
                      <option value="عرض دهان غرفتين (700 ريال)">دهان غرفتين (700 ريال)</option>
                      <option value="عرض دهان غرفة واحدة (500 ريال)">دهان غرفة واحدة (500 ريال)</option>
                      <option value="دهانات المنازل">دهانات المنازل</option>
                      <option value="دهانات الفلل">دهانات الفلل</option>
                      <option value="دهانات الشقق">دهانات الشقق</option>
                      <option value="دهانات المجالس">دهانات المجالس</option>
                      <option value="الدهانات الداخلية">الدهانات الداخلية</option>
                      <option value="الدهانات الخارجية">الدهانات الخارجية</option>
                      <option value="دهان وتشطيب أسقف (100 ريال)">دهان أسقف (100 ريال)</option>
                      <option value="دهان وتجديد أبواب (90 ريال)">دهان أبواب (90 ريال)</option>
                    </select>
                  </div>

                  {/* Submit Button (3 cols) */}
                  <div className="sm:col-span-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] hover:from-[#F5D77A] hover:to-[#D4A63D] text-[#081B33] font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 shrink-0 luxury-btn"
                    >
                      <span>{submitting ? 'إرسال...' : 'اطلب عرض سعر'}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                </form>
              )}
            </div>

            {/* Text Information on Right (4 Cols in RTL) */}
            <div className="lg:col-span-4 space-y-1 text-right">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-[#A87818] text-[11px] font-bold">
                <Paintbrush className="w-3 h-3 text-[#D4A63D]" />
                <span>معاينة موقعك فوراً بالشرقية</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#081B33] font-madani tracking-tight">
                {stripTitle}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {stripSubtext}
              </p>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};
