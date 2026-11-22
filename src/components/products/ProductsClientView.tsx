'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeroHeader } from '@/components/common/PageHeroHeader';
import { IProduct, IProductCategory } from '@/lib/models';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
  Layers,
  X,
  Phone,
  Tag,
  CheckCircle2,
  Percent,
  Palette,
  Sparkles,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  initialProducts: IProduct[];
  categories: IProductCategory[];
}

export const ProductsClientView: React.FC<Props> = ({ initialProducts, categories }) => {
  const [products] = useState<IProduct[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const catMatch =
          p.categorySlug === selectedCategory ||
          p.categoryAr === selectedCategory ||
          p.categoryId === selectedCategory;
        if (!catMatch) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = p.titleAr.toLowerCase().includes(q) || (p.titleEn || '').toLowerCase().includes(q);
        const descMatch = (p.descriptionAr || '').toLowerCase().includes(q);
        const catMatch = (p.categoryAr || '').toLowerCase().includes(q);
        return titleMatch || descMatch || catMatch;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const openLightbox = (prod: IProduct) => {
    setSelectedProduct(prod);
    setActiveImageIndex(0);
  };

  const getProductWhatsAppUrl = (prod: IProduct) => {
    const priceText = prod.price
      ? ` (السعر: ${Number(prod.price).toLocaleString('en-US')} ${prod.priceUnitAr || 'ريال'})`
      : '';
    const text = `مرحباً القصر الذهبي، أود الاستفسار وحجز: ${prod.titleAr}${priceText} المعروض على موقعكم.`;
    return `https://wa.me/966561095508?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="flex-1 pb-20 font-madani">
      {/* Page Hero Header with Luxury Architectural Photo Background */}
      <PageHeroHeader
        badgeText="عروض وباقات دهانات جوتن وديكورات الجدران الحديثة"
        badgeIcon={Percent}
        title="عروض وباقات القصر الذهبي"
        description="أقوى باقات دهانات الغرف والشقق السكنية والفلل بأجود خامات جوتن الأصلية وتشطيب متقن مع معاينة مجانية بالمنطقة الشرقية (الخبر • الدمام • القطيف)."
        bgImage="/images/hero/hero-living-room.webp"
        ctaWhatsAppText="احجز العرض مع خصم 30% الآن"
      />

      {/* Categories & Search Controls */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 overflow-hidden">
        
        {/* Live Search Bar */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث بالعرض أو الخدمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-w-0 py-3.5 pr-11 pl-11 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:border-[#D4A63D] focus:ring-1 focus:ring-[#D4A63D] outline-none transition-all shadow-sm"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded bg-slate-100"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Categories Filter Tabs */}
        <div className="w-full max-w-full min-w-0 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#D4A63D] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            جميع العروض ({products.length})
          </button>

          {categories.map((cat) => {
            const count = products.filter(
              (p) =>
                p.categorySlug === cat.slug ||
                p.categoryAr === cat.nameAr ||
                p.categoryId === cat.id
            ).length;
            const isSelected = selectedCategory === cat.slug || selectedCategory === cat.nameAr;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug || cat.nameAr)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#D4A63D] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat.nameAr} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Active Filter indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            عرض <strong className="text-[#081B33]">{filteredProducts.length}</strong> عرض وباقة
            {searchQuery && ` يطابق "${searchQuery}"`}
          </span>
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#A87818] font-bold hover:underline"
            >
              إعادة ضبط الفلاتر
            </button>
          )}
        </div>

        {/* Verified Jotun Color Swatches & Real Posters Showcase */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#081B33] via-[#0E2749] to-[#081B33] border-2 border-[#D4A63D]/40 text-white shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4A63D]/20 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#D4A63D]/20 border border-[#D4A63D]/40 text-[#F5D77A] text-xs font-bold">
                  <Palette className="w-3.5 h-3.5 text-[#D4A63D]" />
                  <span>دليل وكتالوج درجات ألوان جوتن المعتمدة 2026-2027</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  ألوان تزيّن بيتك وتريح بالك — دليل الألوان الأكثر طلباً في الشرقية
                </h3>
              </div>
              <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                نوفر لعملائنا في الخبر والدمام والقطيف عينات دهان حقيقية مجانية في موقعك لاختيار درجاتك المفضلة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: 2027 Colors Guide */}
              <div
                onClick={() =>
                  setPreviewImage({
                    src: '/images/catalog/jotun-popular-colors-2027.jpg',
                    title: 'دليل ألوان جوتن الأكثر طلباً لعام 2026-2027',
                    desc: 'من الأبيض الهادئ والرمادي الفاتح إلى الجريج (لايمستون، أيفوري، تايملس، ساند، فانيلا لاتيه، سكاي لايت، سمر سنو، أكسفورد ريفر، كلاسيك وايت، بريز)',
                  })
                }
                className="group cursor-pointer rounded-2xl bg-[#0D233F] border border-white/10 hover:border-[#D4A63D] overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/catalog/jotun-popular-colors-2027.jpg"
                    alt="دليل الألوان الأكثر طلباً 2027"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-[#F5D77A] flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>تكبير الدليل</span>
                    </span>
                  </div>
                </div>
                <div className="p-3.5 space-y-1 flex-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#F5D77A] transition-colors line-clamp-1">
                    دليل درجات 2027 الأكثر طلباً
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    بالفرش والألوان (لايمستون، بريز، فانيلا لاتيه)
                  </p>
                </div>
              </div>

              {/* Card 2: Interior Swatches */}
              <div
                onClick={() =>
                  setPreviewImage({
                    src: '/images/catalog/jotun-interior-swatches.jpg',
                    title: 'اختيارات ألوان الدهان الداخلية (10 درجات ملكية)',
                    desc: 'الكتالوج المعتمد بالأكواد الرسمية: 10341 لايمستون، 0567 أيفوري، 1024 تايملس، 1140 ساند، 1519 فانيلا لاتيه، 1624 سكاي لايت، 1928 سمر سنو، 9915 أكسفورد ريفر، 9918 كلاسيك وايت، 9938 بلاكند بلاك.',
                  })
                }
                className="group cursor-pointer rounded-2xl bg-[#0D233F] border border-white/10 hover:border-[#D4A63D] overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/catalog/jotun-interior-swatches.jpg"
                    alt="اختيارات ألوان الدهان الداخلية"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-[#F5D77A] flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>تكبير الكتالوج</span>
                    </span>
                  </div>
                </div>
                <div className="p-3.5 space-y-1 flex-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#F5D77A] transition-colors line-clamp-1">
                    أكواد ألوان الدهان الداخلية (10 درجات)
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    أرقام درجات جوتن المعتمدة للصالات والغرف
                  </p>
                </div>
              </div>

              {/* Card 3: Real Wall Comparison */}
              <div
                onClick={() =>
                  setPreviewImage({
                    src: '/images/portfolio/real-breeze-limestone-foam.jpg',
                    title: 'مقارنة واقعية: دهان بريز vs لايمستون مع بانوهات فوم',
                    desc: 'تنفيذ فعلي على جدران منازل بالشرقية يوضح الفرق البصري بين إشراقة بريز وفخامة لايمستون مع إطارات فوم كلاسيكية ناعمة وإنارة مخفية.',
                  })
                }
                className="group cursor-pointer rounded-2xl bg-[#0D233F] border border-white/10 hover:border-[#D4A63D] overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/portfolio/real-breeze-limestone-foam.jpg"
                    alt="تطبيق واقعي لبريز ولايمستون"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-[#F5D77A] flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة التطبيق</span>
                    </span>
                  </div>
                </div>
                <div className="p-3.5 space-y-1 flex-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#F5D77A] transition-colors line-clamp-1">
                    مقارنة جدارية: بريز vs لايمستون
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    تطبيق عملي مع بانوهات فوم وإضاءة مخفية
                  </p>
                </div>
              </div>

              {/* Card 4: Official Golden Palace Flyer */}
              <div
                onClick={() =>
                  setPreviewImage({
                    src: '/images/brand/official-golden-palace-flyer.jpg',
                    title: 'بروشور عروض القصر الذهبي المعتمد رسمياً',
                    desc: 'وثيقة عروض وباقات دهانات جوتن الأصلية بالمنطقة الشرقية: الغرفة 500 ريال، غرفتين 700 ريال، 3 غرف 1000 ريال، السقف 100 ريال، الباب 90 ريال، شامل التأسيس والمعجون والسنفرة ووجهين تشطيب ونظافة مكان العمل.',
                  })
                }
                className="group cursor-pointer rounded-2xl bg-[#0D233F] border-2 border-[#D4A63D]/60 hover:border-[#D4A63D] overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col relative"
              >
                <div className="absolute top-2 right-2 z-10 py-0.5 px-2 rounded-full bg-[#D4A63D] text-[#081B33] text-[10px] font-black shadow">
                  وثيقة معتمدة
                </div>
                <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden">
                  <Image
                    src="/images/brand/official-golden-palace-flyer.jpg"
                    alt="بروشور القصر الذهبي المعتمد"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-[#F5D77A] flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة البروشور الرسمي</span>
                    </span>
                  </div>
                </div>
                <div className="p-3.5 space-y-1 flex-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#F5D77A] transition-colors line-clamp-1">
                    بروشور وباقات القصر الذهبي المعتمد
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    الزي الموحد، الأسعار، وخامات جوتن الأصلية
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products / Offers Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#081B33]">لم يتم العثور على عروض مطابقة</h3>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              جرّب تغيير كلمات البحث أو تواصل معنا مباشرة لطلب عرض سعر مخصص لمنزلك بالدمام والخبر والقطيف.
            </p>
            <a
              href="https://wa.me/966561095508?text=مرحباً القصر الذهبي، أود الاستفسار عن باقات الدهانات"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba59] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>طلب عرض سعر عبر واتساب</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod, idx) => {
                const cardImage =
                  (prod.gallery && prod.gallery.length > 0 ? prod.gallery[0] : null) ||
                  prod.coverImage ||
                  (prod as any).image ||
                  '/images/offers/three-rooms.webp';

                return (
                  <motion.div
                    key={prod.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -7 }}
                    className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#D4A63D] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl luxury-card"
                  >
                    {/* Image Box */}
                    <div
                      className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
                      onClick={() => openLightbox(prod)}
                    >
                    <Image
                      src={cardImage}
                      alt={prod.titleAr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                    {/* Category & Badge */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end z-10">
                      <span className="px-3 py-1 rounded-full bg-[#081B33]/85 backdrop-blur-md text-[11px] font-bold text-[#F5D77A] border border-[#D4A63D]/40 shadow-sm">
                        {prod.categoryAr}
                      </span>
                    </div>

                    {/* Price Badge on Image */}
                    {prod.price ? (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D82323] text-white font-black text-xs shadow-lg flex items-center gap-1.5 z-10">
                        <Tag className="w-3 h-3 text-white" />
                        <span>{Number(prod.price).toLocaleString('en-US')} {prod.priceUnitAr || 'ريال'}</span>
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#081B33]/85 backdrop-blur-md text-[#F5D77A] text-[10px] font-bold border border-[#D4A63D]/30 z-10">
                        <span>عرض خاص</span>
                      </div>
                    )}

                    {/* Quick view indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-[#081B33] text-xs font-bold border border-[#D4A63D]/40 flex items-center gap-2 shadow-lg">
                        <Eye className="w-4 h-4 text-[#D4A63D]" />
                        <span>معاينة العرض والمواصفات</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3
                        onClick={() => openLightbox(prod)}
                        className="text-base sm:text-lg font-bold text-[#081B33] group-hover:text-[#A87818] transition-colors cursor-pointer line-clamp-1"
                      >
                        {prod.titleAr}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {prod.descriptionAr}
                      </p>
                    </div>

                    {/* Specifications / Included Points */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A63D] shrink-0" />
                        <span>دهانات جوتن أصلية 100% مع ضمان رسمي</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A63D] shrink-0" />
                        <span>معالجة الشقوق وسنفرة وتأسيس كامل</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A63D] shrink-0" />
                        <span>نظافة تامة للمكان وحماية المفروشات</span>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">قيمة العرض:</span>
                      {prod.price ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-[#D82323] font-mono">
                            {Number(prod.price).toLocaleString('en-US')}
                          </span>
                          <span className="text-xs text-slate-700 font-bold">
                            {prod.priceUnitAr || 'ريال'}
                          </span>
                          {(prod as any).oldPrice && (
                            <span className="text-xs text-slate-400 line-through font-mono">
                              {(prod as any).oldPrice} ريال
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-[#A87818] font-bold bg-[#D4A63D]/10 px-2.5 py-0.5 rounded-lg">
                          سعر خاص بالمعاينة
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => openLightbox(prod)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#081B33] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4A63D]" />
                        <span>التفاصيل</span>
                      </button>

                      <a
                        href={getProductWhatsAppUrl(prod)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                        title="حجز العرض عبر واتساب"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>احجز الآن</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Lightbox / Details Modal (Light Luxury) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 font-madani">
          <div className="bg-white border border-[#D4A63D]/40 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-[#FCFBFA]">
              <div>
                <span className="text-xs text-[#A87818] font-bold">{selectedProduct.categoryAr}</span>
                <h2 className="text-lg sm:text-2xl font-black text-[#081B33]">{selectedProduct.titleAr}</h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-[#081B33] hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {(() => {
                const gallery =
                  selectedProduct.gallery && selectedProduct.gallery.length > 0
                    ? selectedProduct.gallery
                    : [(selectedProduct as any).coverImage || (selectedProduct as any).image || '/images/offers/three-rooms.webp'];
                const currentImg = gallery[activeImageIndex] || gallery[0];

                return (
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <Image
                        src={currentImg}
                        alt={selectedProduct.titleAr}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1200px) 100vw, 900px"
                      />

                      {gallery.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#081B33] border border-slate-200 shadow-md transition-all"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              setActiveImageIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#081B33] border border-slate-200 shadow-md transition-all"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {gallery.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                              activeImageIndex === idx
                                ? 'border-[#D4A63D] scale-105 shadow-md'
                                : 'border-slate-200 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <Image src={img} alt="Thumbnail" fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Description & Included Services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-sm font-bold text-[#A87818]">تفاصيل العرض</h4>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedProduct.descriptionAr}
                  </p>
                  <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#D4A63D]/20 space-y-2 text-xs">
                    <span className="font-bold text-[#081B33] block">العرض شامل التالي:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#D4A63D]" /> معالجة أركان الجدران بالمعجون</span>
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#D4A63D]" /> وجه سنفرة ناعمة</span>
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#D4A63D]" /> وجه أساس جوتن أصلي</span>
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#D4A63D]" /> وجهين تشطيب نهائي</span>
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#D4A63D]" /> نظافة مكان العمل بالكامل</span>
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#D4A63D]" /> نوع الصبغ: JOTUN الأصلي</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-slate-200 space-y-3.5 text-xs">
                  <h4 className="font-bold text-[#081B33] border-b border-slate-200 pb-2">بيانات الباقة</h4>
                  <div>
                    <span className="text-slate-500 block text-[11px]">التصنيف:</span>
                    <strong className="text-[#081B33]">{selectedProduct.categoryAr}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">نطاق الخدمة:</span>
                    <strong className="text-[#081B33]">الدمام • الخبر • القطيف</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">المعاينة:</span>
                    <strong className="text-emerald-700">مجانية خلال 24 ساعة</strong>
                  </div>

                  {/* Price in Lightbox */}
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-slate-500 block text-[11px] mb-0.5">السعر الإجمالي للعرض:</span>
                    {selectedProduct.price ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-[#D82323] font-mono">
                          {Number(selectedProduct.price).toLocaleString('en-US')}
                        </span>
                        <span className="text-xs text-[#081B33] font-bold">
                          {selectedProduct.priceUnitAr || 'ريال'}
                        </span>
                        {(selectedProduct as any).oldPrice && (
                          <span className="text-xs text-slate-400 line-through font-mono mr-1">
                            {(selectedProduct as any).oldPrice} ريال
                          </span>
                        )}
                      </div>
                    ) : (
                      <strong className="text-[#A87818] font-bold">يُحدد بالمعاينة المجانية</strong>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-[#FCFBFA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-right">
                <span>العرض ساري لفترة محدودة ويشمل المواد والأيدي العاملة بالكامل.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:0561095508`}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#D4A63D] text-[#081B33] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4A63D]" />
                  <span dir="ltr">0561095508</span>
                </a>

                <a
                  href={getProductWhatsAppUrl(selectedProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>احجز هذا العرض فوراً عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Lightbox Modal for Color Swatches & Official Posters */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full max-h-[92vh] bg-[#081B33] border-2 border-[#D4A63D] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#D4A63D]/30 bg-[#0A2240] text-white">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#D4A63D]" />
                <span className="font-black text-sm text-[#F5D77A] line-clamp-1">
                  {previewImage.title}
                </span>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative flex-1 min-h-[380px] max-h-[65vh] w-full bg-black/40 overflow-y-auto p-3 flex items-center justify-center">
              <div className="relative w-full h-[60vh] max-h-[550px]">
                <Image
                  src={previewImage.src}
                  alt={previewImage.title}
                  fill
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
            </div>

            {/* Description & Action */}
            <div className="p-4 sm:p-5 border-t border-[#D4A63D]/30 bg-[#0A2240] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-300 leading-relaxed text-center sm:text-right flex-1">
                {previewImage.desc}
              </p>
              <a
                href={`https://wa.me/966561095508?text=${encodeURIComponent(
                  `مرحباً القصر الذهبي، أود الاستفسار وطلب عينة من: ${previewImage.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] text-[#081B33] font-black text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-all shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#081B33]" />
                <span>طلب عينة مجانية بالواتساب</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
