'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/components/layout/LanguageContext';
import { ModernPhoneIcon, ModernWhatsAppIcon, ModernGoogleMapsIcon } from '@/components/common/SocialIcons';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';
import { PageHeroHeader } from '@/components/common/PageHeroHeader';

export function ContactClientView() {
  const { lang, t } = useLanguage();
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'الخبر',
    service: 'عرض دهان 3 غرف (1000 ريال)',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          city: formData.city,
          projectLocation: formData.city,
          requiredService: formData.service,
          projectType: 'طلب عرض سعر عبر صفحة اتصل بنا',
          description: formData.message.trim(),
          attachments: [],
          preferredContact: 'phone',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSent(true);
      } else {
        setErrorMsg(data.error || 'تعذر إرسال الرسالة، يرجى المحاولة مرة أخرى.');
      }
    } catch {
      setErrorMsg('حدث خطأ في الاتصال، يرجى المحاولة لاحقاً أو التواصل عبر الواتساب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* Header with Architectural Photo Background */}
        <PageHeroHeader
          badgeText={lang === 'ar' ? 'نخدمكم بالمنطقة الشرقية' : 'Serving Eastern Province'}
          badgeIcon={MapPin}
          title={lang === 'ar' ? 'تواصل معنا — احصل على عرض سعر فوري' : 'Contact Us — Get An Instant Quote'}
          description={
            lang === 'ar'
              ? 'يسعدنا تواصلكم لمعاينة موقعك وتقديم استشارة مجانية وعرض سعر فوري لجميع أعمال الدهانات والديكورات وتشطيبات جوتن بالخبر والدمام والقطيف.'
              : 'Reach out to schedule a free on-site survey and get an instant quote for all painting and decor projects across Khobar, Dammam, and Qatif.'
          }
          bgImage="/images/services/service-majlis.webp"
          ctaWhatsAppText={lang === 'ar' ? 'تواصل واتساب مع الفني مباشرة' : 'Chat on WhatsApp'}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Information & Channels */}
            <div className={`lg:col-span-5 space-y-6 sm:space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className="bg-[#081B33] text-white p-6 sm:p-8 rounded-3xl border border-[#D4A63D]/30 shadow-2xl space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {lang === 'ar' ? 'القصر الذهبي للدهانات والديكورات الحديثة' : 'Golden Palace for Modern Paints & Decors'}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0D233F] text-[#D4A63D] text-xs font-semibold border border-[#D4A63D]/30">
                    <ShieldCheck className="w-4 h-4 text-[#D4A63D]" />
                    <span>{lang === 'ar' ? 'ضمان رسمي وجودة معتمدة' : 'Certified Quality & Warranty'}</span>
                  </div>
                </div>

                <div className="space-y-3.5 pt-2">
                  {/* Phone */}
                  <a
                    href="tel:0561095508"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D233F] border border-slate-700 hover:border-[#D4A63D] transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#D4A63D]/20 flex items-center justify-center text-[#D4A63D] group-hover:bg-[#D4A63D] group-hover:text-black transition-colors shrink-0">
                      <ModernPhoneIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'الاتصال المباشر' : 'Direct Call'}</span>
                      <span className="text-white font-bold text-sm sm:text-base font-mono" dir="ltr">0561095508</span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/966561095508"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D233F] border border-slate-700 hover:border-[#25D366] transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black transition-colors shrink-0">
                      <ModernWhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'واتساب المباشر' : 'WhatsApp Instant Chat'}</span>
                      <span className="text-white font-bold text-xs sm:text-sm">
                        {lang === 'ar' ? 'محادثة فورية مع فني الدهانات' : 'Chat with Paint Specialist'}
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@alqasraldhahabi.com"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D233F] border border-slate-700 hover:border-[#D4A63D] transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#D4A63D]/20 flex items-center justify-center text-[#D4A63D] group-hover:bg-[#D4A63D] group-hover:text-black transition-colors shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'البريد الإلكتروني' : 'Official Email'}</span>
                      <span className="text-white font-bold text-xs sm:text-sm truncate block">info@alqasraldhahabi.com</span>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D233F] border border-slate-700">
                    <div className="w-11 h-11 rounded-xl bg-[#D4A63D]/20 flex items-center justify-center text-[#D4A63D] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'نطاق الخدمة الميدانية' : 'Service Areas'}</span>
                      <span className="text-white font-medium text-xs block">
                        {lang === 'ar' ? 'المنطقة الشرقية (الخبر • الدمام • القطيف)' : 'Eastern Province (Khobar • Dammam • Qatif)'}
                      </span>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D233F] border border-slate-700">
                    <div className="w-11 h-11 rounded-xl bg-[#D4A63D]/20 flex items-center justify-center text-[#D4A63D] shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'أوقات العمل' : 'Working Hours'}</span>
                      <span className="text-white font-medium text-xs">
                        {lang === 'ar' ? 'السبت - الخميس: 8:00 ص إلى 10:00 م' : 'Sat - Thu: 8:00 AM - 10:00 PM'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className={`lg:col-span-7 space-y-6 sm:space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-[#081B33] mb-2">
                  {lang === 'ar' ? 'اطلب معاينة أو عرض سعر فوري' : 'Request Site Visit or Instant Quote'}
                </h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  {lang === 'ar'
                    ? 'املأ بياناتك أدناه وسيتواصل معك فني القصر الذهبي فوراً لتحديد موعد المعاينة المجانية وتقديم السعر.'
                    : 'Fill out the form below and our paint supervisor will contact you to schedule a free on-site survey.'}
                </p>

                {formSent ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="font-bold text-lg">
                      {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Your Request Has Been Received!'}
                    </h4>
                    <p className="text-xs">
                      {lang === 'ar'
                        ? 'شكراً لتواصلك مع القصر الذهبي. سيتواصل معك فريقنا خلال وقت قصير.'
                        : 'Thank you for reaching out to Golden Palace. Our team will contact you shortly.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={lang === 'ar' ? 'أدخل اسمك الكريم' : 'Your name'}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4A63D] focus:ring-1 focus:ring-[#D4A63D] text-xs text-gray-900 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          {lang === 'ar' ? 'رقم الجوال *' : 'Mobile Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="05XXXXXXXX"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4A63D] focus:ring-1 focus:ring-[#D4A63D] text-xs text-gray-900 bg-white text-right"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          {lang === 'ar' ? 'المدينة بالمنطقة الشرقية *' : 'City *'}
                        </label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4A63D] text-xs text-gray-900 bg-white"
                        >
                          <option value="الخبر">الخبر</option>
                          <option value="الدمام">الدمام</option>
                          <option value="القطيف">القطيف</option>
                          <option value="الظهران">الظهران</option>
                          <option value="سيهات">سيهات</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          {lang === 'ar' ? 'نوع الخدمة المطلوبة *' : 'Service Required *'}
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4A63D] text-xs text-gray-900 bg-white"
                        >
                          <option value="عرض دهان 3 غرف (1000 ريال)">عرض دهان 3 غرف (1000 ريال)</option>
                          <option value="عرض دهان غرفتين (700 ريال)">عرض دهان غرفتين (700 ريال)</option>
                          <option value="عرض دهان غرفة واحدة (500 ريال)">عرض دهان غرفة واحدة (500 ريال)</option>
                          <option value="دهان وتشطيب أسقف (100 ريال)">دهان وتشطيب أسقف (100 ريال)</option>
                          <option value="دهان وتجديد أبواب (90 ريال)">دهان وتجديد أبواب (90 ريال)</option>
                          <option value="تركيب بديل الرخام وبديل الخشب">تركيب بديل الرخام وبديل الخشب</option>
                          <option value="تشطيب واجهات وبروفايل خارجي">تشطيب واجهات وبروفايل خارجي</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {lang === 'ar' ? 'تفاصيل إضافية عن الموقع والمساحة' : 'Additional Details'}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={lang === 'ar' ? 'اكتب أي ملاحظات مثل عدد الغرف، حالة الجدران، أو الوقت المناسب للمعاينة...' : 'Notes about rooms count, location, or preferred survey timing...'}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4A63D] text-xs text-gray-900 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] hover:from-[#F5D77A] hover:to-[#D4A63D] text-black font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (lang === 'ar' ? 'إرسال طلب عرض السعر' : 'Send Quote Request')}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
