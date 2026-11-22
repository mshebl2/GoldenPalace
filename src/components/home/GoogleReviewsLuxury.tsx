'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../layout/LanguageContext';
import { Star, CheckCircle2, ExternalLink, Quote, Plus, X, MessageSquare, Send } from 'lucide-react';
import {
  ModernGoogleMapsIcon,
  ModernWhatsAppIcon,
  ModernPhoneIcon,
  GoogleLocalGuideStarBadge,
} from '../common/SocialIcons';

interface DisplayReview {
  id: string;
  name: string;
  initial: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  projectTag: string;
  projectImage?: string;
}

const fallbackReviews: DisplayReview[] = [
  {
    id: 'rev-1',
    name: 'أبو عبدالله - الدمام',
    initial: 'أ',
    role: 'عميل موثق • دهانات فيلا كاملة بالدمام',
    rating: 5,
    date: 'منذ أسبوعين',
    projectTag: 'دهانات داخلية وخارجية جوتن',
    projectImage: '/images/hero/hero-living-room.webp',
    comment:
      'ما شاء الله تبارك الله، قمة في الاحترافية والدقة! شغل نظيف جداً والتزام تام بالمواعيد، ودهانات جوتن مطابقة تماماً للكتالوج. أشكر فريق القصر الذهبي على التعامل الراقي.',
  },
  {
    id: 'rev-2',
    name: 'أم فهد - الخبر',
    initial: 'ف',
    role: 'عميلة موثقة • تجديد ديكورات ودهانات بالخبر',
    rating: 5,
    date: 'منذ شهر',
    projectTag: 'بديل رخام وبانوهات فوم مع ليد',
    projectImage: '/images/portfolio/project-2.webp',
    comment:
      'جودة الدهانات ممتازة والألوان متطابقة مع الكتالوج، واهتمام كبير بنظافة المكان بعد الانتهاء وسرعة عالية في الإنجاز. أنصح بالتعامل معهم بشدة.',
  },
  {
    id: 'rev-3',
    name: 'أبو خالد - القطيف',
    initial: 'خ',
    role: 'عميل موثق • باقة دهان شقة كاملة بالقطيف',
    rating: 5,
    date: 'مؤخراً',
    projectTag: 'باقة دهان 3 غرف وأسقف',
    projectImage: '/images/offers/three-rooms.webp',
    comment:
      'التزام تام بالمواعيد وسعر منافس جداً مقارنة بالجودة، وفريق العمل محترف وخلوق ونظافة تامة لمكان العمل بعد التسليم. شكراً لكم.',
  },
];

export const GoogleReviewsLuxury: React.FC = () => {
  const { lang } = useLanguage();
  const [reviews, setReviews] = useState<DisplayReview[]>(fallbackReviews);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State for client submission
  const [clientForm, setClientForm] = useState({
    authorName: '',
    roleAr: '',
    rating: 5,
    projectOrProduct: '',
    comment: '',
  });

  const fetchApprovedReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.reviews && data.reviews.length > 0) {
        const mapped: DisplayReview[] = data.reviews.map((r: any) => {
          const rawName = (r.authorName || 'عميل').trim();
          // Extract first meaningful character (skip "د." or "م.")
          const cleanName = rawName.replace(/^(د\.?|م\.?|المهندس|الدكتور|الأستاذ)\s+/i, '');
          const initialChar = (cleanName[0] || rawName[0] || 'ع').toUpperCase();

          return {
            id: r.id,
            name: rawName,
            initial: initialChar,
            role: r.roleAr || (lang === 'ar' ? 'عميل موثق' : 'Verified Client'),
            rating: r.rating || 5,
            date: r.createdAt ? new Date(r.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US') : 'مؤخراً',
            comment: r.comment,
            projectTag: r.projectOrProduct || (lang === 'ar' ? 'أعمال رخام مخصصة' : 'Custom Stone Project'),
            projectImage: r.projectImage || (r.projectOrProduct?.includes('طعام') ? '/images/products/tables-3.webp' : r.projectOrProduct?.includes('أونيكس') ? '/images/materials_real/slab-onyx-gold.jpg' : '/images/products/sets-40.webp'),
          };
        });
        setReviews(mapped);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, [lang]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientForm),
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        setClientForm({
          authorName: '',
          roleAr: '',
          rating: 5,
          projectOrProduct: '',
          comment: '',
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] text-[#1E1D1B] relative overflow-hidden font-madani border-t border-[#EAE5DC]">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A059]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Strip with Google Badge & Add Review Action */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 sm:mb-16">
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 text-[#9E7A32] text-xs font-bold tracking-wider uppercase mb-3 border border-[#C5A059]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>{lang === 'ar' ? 'ثقة عملاؤنا هي فخرنا' : 'Verified Client Trust'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight font-serif">
              {lang === 'ar'
                ? 'تقييمات وآراء العملاء على Google'
                : 'Verified Google Client Reviews'}
            </h2>
            <p className="text-xs sm:text-sm text-[#706B62] mt-2 max-w-xl leading-relaxed">
              {lang === 'ar'
                ? 'تجارب حقيقية لعملاء وثقوا بالقصر الذهبي للدهانات لتفصيل وتوريد الرخام الطبيعي والمجالس الفاخرة بالرياض.'
                : 'Real feedback from patrons who entrusted Elegant East Towers for bespoke stone commissions in Riyadh.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Submit Review Button */}
            <button
              onClick={() => {
                setSubmittedSuccess(false);
                setModalOpen(true);
              }}
              className="px-5 py-3.5 rounded-2xl bg-[#1E1D1B] hover:bg-black text-[#D8B369] font-bold text-xs transition-all shadow-md flex items-center gap-2 border border-[#C5A059]/40 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" />
              <span>{lang === 'ar' ? 'شاركنا رأيك وتجربتك' : 'Submit Your Review'}</span>
            </button>

            {/* Google 5.0 Rating Badge Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#EAE5DC] shadow-md">
              <div className="w-11 h-11 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center shrink-0">
                <ModernGoogleMapsIcon className="w-6 h-6 text-[#EA4335]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-[#1E1D1B]">5.0</span>
                  <div className="flex items-center text-[#FBBC04]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <a
                    href="https://maps.app.goo.gl/R4hSwJcmPZLPbLFT6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#C5A059] hover:underline flex items-center gap-0.5 font-bold"
                  >
                    <span>{lang === 'ar' ? 'خرائط Google وتقييمات العملاء' : 'Google Maps Reviews'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid with Dynamic Left/Right Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{
                opacity: 0,
                x: idx % 2 === 0 ? 55 : -55,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: (idx % 2) * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5DC] hover:border-[#C5A059]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Quote Mark Watermark */}
              <Quote className="absolute top-6 left-6 w-12 h-12 text-[#C5A059]/15 pointer-events-none" />

              <div>
                {/* Author Info Strip */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3.5">
                    {/* Prestigious Royal Client Monogram */}
                    <div className="relative shrink-0">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#252420] to-[#161513] border-2 border-[#C5A059]/50 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="text-[#D8B369] font-bold text-lg sm:text-xl font-serif">
                          {rev.initial}
                        </span>
                      </div>
                      <div
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-md ring-2 ring-white text-[9px] font-bold"
                        title="Google Verified Review"
                      >
                        ★
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-[#1E1D1B] font-serif">
                          {rev.name}
                        </h4>
                        <span
                          className="p-0.5 rounded-full bg-emerald-100 text-emerald-700"
                          title="Verified Client"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#8C8377] mt-0.5 leading-snug">
                        {rev.role}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center text-[#FBBC04]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#A39C91]">
                          {rev.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Tag */}
                  {rev.projectTag && (
                    <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#FAF8F5] text-[11px] font-bold text-[#9E7A32] border border-[#EAE5DC]">
                      {rev.projectTag}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#4E4A44] leading-relaxed italic mb-5">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Commissioned Marble/Granite Piece Inset */}
                {rev.projectImage && (
                  <div className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] mb-5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#C5A059]/40 bg-[#1E1D1B]">
                      <img
                        src={rev.projectImage}
                        alt={rev.projectTag}
                        className="w-full h-full object-cover filter contrast-[1.05]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-[#9E7A32] uppercase tracking-wider block">
                        {lang === 'ar' ? 'القطعة المنفذة للعميل' : 'Commissioned Stone Work'}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-[#1E1D1B] truncate">
                        {rev.projectTag}
                      </h5>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Card Action Strip (Call / WhatsApp) */}
              <div className="pt-4 border-t border-[#F2EDE4] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[11px] text-gray-500 font-medium">
                  {lang === 'ar' ? 'هل تود تنفيذ مشروع مماثل؟' : 'Interested in a similar commission?'}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/966530200529"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#1EBE5D] hover:text-white transition-all font-bold text-[11px] group/btn"
                  >
                    <ModernWhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover/btn:text-white" />
                    <span>{lang === 'ar' ? 'استفسر عبر واتساب' : 'WhatsApp'}</span>
                  </a>

                  <a
                    href="tel:0530200529"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C5A059]/15 hover:bg-[#C5A059] text-[#9E7A32] hover:text-black transition-all font-bold text-[11px] group/btn"
                  >
                    <ModernPhoneIcon className="w-3.5 h-3.5 text-[#C5A059] group-hover/btn:text-black" />
                    <span>{lang === 'ar' ? 'اتصال مباشر' : 'Call'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Customer Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181716] border border-[#C5A059]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />
                  <span>{lang === 'ar' ? 'شاركنا رأيك وتجربتك' : 'Share Your Experience'}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {lang === 'ar'
                    ? 'رأيك يهمنا ويسهم في تطوير خدماتنا في تصنيع وتوريد الرخام والجرانيت'
                    : 'Your valuable feedback inspires our bespoke stone craftsmanship.'}
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white font-serif">
                  {lang === 'ar' ? 'شكراً جزيلاً لمشاركتك الكريمة!' : 'Thank you for your feedback!'}
                </h4>
                <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                  {lang === 'ar'
                    ? 'تم استلام تقييمك بنجاح، وسيظهر على الموقع فور مراجعته واعتماده من قبل الإدارة.'
                    : 'Your review has been received and will appear on the site once approved by management.'}
                </p>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs"
                >
                  {lang === 'ar' ? 'إغلاق النافذة' : 'Close'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                {/* Rating Stars Picker */}
                <div>
                  <label className="block text-gray-300 font-bold mb-2">
                    {lang === 'ar' ? 'تقييمك الإجمالي (اختر عدد النجوم):' : 'Overall Rating:'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setClientForm({ ...clientForm, rating: star })}
                        className="p-1 text-2xl transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= clientForm.rating
                              ? 'fill-[#FBBC04] text-[#FBBC04]'
                              : 'fill-gray-700 text-gray-700 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-[#D8B369] font-mono mr-2">
                      {clientForm.rating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    {lang === 'ar' ? 'الاسم الكريم *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'مثال: فهد الدوسري' : 'e.g. Fahad Al-Dossari'}
                    value={clientForm.authorName}
                    onChange={(e) => setClientForm({ ...clientForm, authorName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#222220] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      {lang === 'ar' ? 'الصفة أو المدينة (اختياري)' : 'Role / City (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'ar' ? 'مثال: مالك فيلا - حي النرجس' : 'e.g. Villa Owner - Riyadh'}
                      value={clientForm.roleAr}
                      onChange={(e) => setClientForm({ ...clientForm, roleAr: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#222220] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      {lang === 'ar' ? 'المنتج أو الخدمة' : 'Product / Project'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'ar' ? 'مثال: طاولة طعام كلكتا' : 'e.g. Calacatta Dining Table'}
                      value={clientForm.projectOrProduct}
                      onChange={(e) => setClientForm({ ...clientForm, projectOrProduct: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#222220] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">
                    {lang === 'ar' ? 'رأيك وتجربتك بالتفصيل *' : 'Your Review & Feedback *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      lang === 'ar'
                        ? 'تحدث عن تجربتك مع جودة القص، دقة التشطيب، التثبيت، والالتزام بالمواعيد...'
                        : 'Share your experience regarding stone precision, finish, and delivery...'
                    }
                    value={clientForm.comment}
                    onChange={(e) => setClientForm({ ...clientForm, comment: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#222220] border border-gray-700 text-white focus:border-[#C5A059] outline-none leading-relaxed"
                  />
                </div>

                <p className="text-[11px] text-gray-400">
                  {lang === 'ar'
                    ? 'ملاحظة: سيتم مراجعة التقييم من قبل إدارة الموقع قبل نشره.'
                    : 'Note: Reviews undergo editorial verification before being published.'}
                </p>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-gray-800 text-gray-300 font-medium hover:bg-gray-700 transition-colors"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? (lang === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : (lang === 'ar' ? 'إرسال التقييم' : 'Submit Review')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
