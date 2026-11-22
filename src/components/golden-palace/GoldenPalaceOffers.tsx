'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, CheckCircle2, Eye, X, Award, ShieldCheck } from 'lucide-react';

import { ISiteSettings, IProduct } from '@/lib/models';

interface Props {
  settings?: ISiteSettings;
  products?: IProduct[];
}

export const GoldenPalaceOffers: React.FC<Props> = ({ settings, products }) => {
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const whatsappNum = settings?.whatsapp || '0561095508';
  const getWhatsAppUrl = (offerName: string, price: number | string) => {
    const text = `مرحباً القصر الذهبي، أود حجز ${offerName} بسعر ${price} ريال`;
    return `https://wa.me/966${whatsappNum.replace(/^0+/, '')}?text=${encodeURIComponent(text)}`;
  };

  const sectionTitle = settings?.offersSectionTitleAr || 'عروضنا الحالية';
  const sectionSubtext = settings?.offersSectionSubtextAr || 'جدّد منزلك بأفضل عروض الدهانات والتشطيبات الأصلية من جوتن';

  const prodOne = products?.find((p) => p.slug === 'one-room-offer' || p.id === 'prod-3');
  const prodTwo = products?.find((p) => p.slug === 'two-rooms-offer' || p.id === 'prod-2');
  const prodThree = products?.find((p) => p.slug === 'three-rooms-offer' || p.id === 'prod-1');
  const prodCeiling = products?.find((p) => p.slug === 'ceiling-offer' || p.id === 'prod-4');
  const prodDoor = products?.find((p) => p.slug === 'door-offer' || p.id === 'prod-5');

  // In RTL, the cards in the grid will be laid out from Right to Left:
  // 1st item (Right): "الغرفة" (500 SAR)
  // 2nd item (Center): "غرفتان" (700 SAR)
  // 3rd item (Left): "3 غرف" (1000 SAR)
  const roomOffers = [
    {
      id: 'one-room',
      title: prodOne?.titleAr?.replace('عرض دهان ', '') || 'الغرفة',
      price: (typeof prodOne?.price === 'number' ? prodOne.price : 500),
      oldPrice: (prodOne as any)?.oldPrice || 700,
      image: prodOne?.coverImage || (prodOne as any)?.image || '/images/portfolio/real-breeze-vanilla-latte.jpg',
    },
    {
      id: 'two-rooms',
      title: prodTwo?.titleAr?.replace('عرض دهان ', '') || 'غرفتان',
      price: (typeof prodTwo?.price === 'number' ? prodTwo.price : 700),
      oldPrice: (prodTwo as any)?.oldPrice || 1000,
      image: prodTwo?.coverImage || (prodTwo as any)?.image || '/images/portfolio/real-breeze-limestone-foam.jpg',
    },
    {
      id: 'three-rooms',
      title: prodThree?.titleAr?.replace('عرض دهان ', '') || '3 غرف',
      price: (typeof prodThree?.price === 'number' ? prodThree.price : 1000),
      oldPrice: (prodThree as any)?.oldPrice || 1300,
      image: prodThree?.coverImage || (prodThree as any)?.image || '/images/portfolio/real-modern-room-parquet.jpg',
    },
  ];

  // Bottom row (Right to Left):
  // 1st item (Right, under "الغرفة"): "السقف" (100 SAR)
  // 2nd item (Left, under "غرفتان"): "الباب" (90 SAR)
  const singleOffers = [
    {
      id: 'ceiling',
      title: prodCeiling?.titleAr?.replace('عرض دهان وتشطيب ', '') || 'السقف',
      price: (typeof prodCeiling?.price === 'number' ? prodCeiling.price : 100),
      image: prodCeiling?.coverImage || (prodCeiling as any)?.image || '/images/portfolio/real-hallway-wood-doors.jpg',
    },
    {
      id: 'door',
      title: prodDoor?.titleAr?.replace('عرض دهان وتجديد ', '') || 'الباب',
      price: (typeof prodDoor?.price === 'number' ? prodDoor.price : 90),
      image: prodDoor?.coverImage || (prodDoor as any)?.image || '/images/portfolio/real-greige-painted-door.jpg',
    },
  ];

  const includedItems = [
    settings?.offersChecklist1Ar || 'معالجة أركان الجدران بالمعجون',
    settings?.offersChecklist2Ar || 'وجه سنفرة وتأسيس كامل',
    settings?.offersChecklist3Ar || 'وجهين تشطيب خامات جوتن أصلية',
    settings?.offersChecklist4Ar || 'نظافة مكان العمل وحماية المفروشات',
  ];

  return (
    <section id="offers" className="w-full py-16 md:py-20 bg-[#F8F7F4] relative overflow-hidden font-madani">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#D4A63D]" />
            <h2 className="text-2xl sm:text-4xl font-black text-[#081B33] font-madani tracking-tight">
              {sectionTitle}
            </h2>
            <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#D4A63D]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
            {sectionSubtext}
          </p>
        </motion.div>

        {/* Main Flex/Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* RIGHT SIDE: What the Offer Includes + Official JOTUN Branding (w-full lg:w-[32%]) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[32%] flex flex-col gap-4"
          >
            
            {/* Dark Navy Checklist Card with Golden Border */}
            <div className="rounded-[24px] bg-[#081B33] text-white border-2 border-[#D4A63D]/40 p-5 sm:p-6 shadow-xl flex flex-col space-y-4 luxury-card">
              {/* Header Badge */}
              <div className="text-center">
                <div className="inline-block py-1.5 px-6 rounded-full bg-gradient-to-r from-[#D4A63D] to-[#F5D77A] text-[#081B33] font-black text-sm shadow-md">
                  العرض شامل التالي
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2.5 pt-2">
                {includedItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + idx * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0D233F] border border-white/5 text-xs font-bold text-slate-100 hover:border-[#D4A63D]/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#D4A63D]/20 text-[#D4A63D] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* JOTUN Paint Specification Card with Genuine Product Photo */}
            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-[22px] bg-white border border-[#D4A63D]/40 p-3.5 sm:p-4 shadow-md flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg"
            >
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-bold block">نوع الصبغ المعتمد:</span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFCC00] text-[#081B33] font-black text-sm shadow-sm border border-[#E6B800]">
                  <span className="tracking-wider">JOTUN فينوماستيك</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">أصلي 100% قابل للغسيل الفائق</p>
              </div>

              <div className="w-20 h-20 sm:w-24 sm:h-24 relative shrink-0 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                <Image
                  src="/images/products/real-jotun-fenomastic-casho.jpg"
                  alt="دهانات جوتن الأصلية - القصر الذهبي"
                  fill
                  className="object-cover drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Official Golden Palace Flyer Banner with Lightbox Trigger */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowFlyerModal(true)}
              className="cursor-pointer rounded-[22px] bg-gradient-to-br from-[#081B33] via-[#0E2749] to-[#081B33] border-2 border-[#D4A63D]/60 p-4 shadow-xl text-white flex items-center justify-between gap-3 group relative overflow-hidden"
            >
              <div className="space-y-1.5 relative z-10 flex-1">
                <div className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-[#D4A63D]/20 border border-[#D4A63D]/40 text-[#F5D77A] text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-[#D4A63D]" />
                  <span>وثيقة العروض والأسعار الرسمية</span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#F5D77A] transition-colors leading-snug">
                  بروشور القصر الذهبي بالزي الموحد والأسعار
                </h4>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#D4A63D]" />
                  <span>انقر هنا لتكبير البروشور الرسمي</span>
                </p>
              </div>

              <div className="w-16 h-22 relative shrink-0 rounded-xl overflow-hidden border-2 border-[#D4A63D] shadow-md group-hover:rotate-2 transition-transform aspect-[9/16]">
                <Image
                  src="/images/brand/official-golden-palace-flyer.jpg"
                  alt="بروشور عروض القصر الذهبي المعتمد"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

          </motion.div>

          {/* LEFT SIDE: Room Offers Area (w-full lg:w-[68%]) */}
          <div className="w-full lg:w-[68%] flex flex-col gap-5">
            
            {/* Row 1: Rooms Offers (3 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
              {roomOffers.map((offer, idx) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -7 }}
                  className="rounded-[22px] bg-white border border-[#D4A63D]/40 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col text-center group luxury-card"
                >
                  {/* Card Title Header with Dark Gold Gradient */}
                  <div className="py-2.5 px-4 bg-gradient-to-r from-[#081B33] via-[#0E2749] to-[#081B33] text-white border-b border-[#D4A63D]/30">
                    <span className="text-base sm:text-lg font-black text-[#F5D77A] tracking-wide">
                      {offer.title}
                    </span>
                  </div>

                  {/* Room Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>

                  {/* Pricing Box */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      <div className="flex items-baseline justify-center gap-1.5 text-[#D82323] font-black text-2xl sm:text-3xl leading-none">
                        <span>{offer.price}</span>
                        <span className="text-xs font-bold text-[#D82323]">ريال</span>
                      </div>

                      {offer.oldPrice && (
                        <div className="mt-1 text-slate-400 font-bold text-xs relative inline-block">
                          <span className="line-through decoration-[#D82323] decoration-2">
                            {offer.oldPrice} ريال
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Order Button */}
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={getWhatsAppUrl(offer.title, offer.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] hover:from-[#F5D77A] hover:to-[#D4A63D] text-[#081B33] font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 group-hover:shadow-lg luxury-btn"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#081B33]" />
                      <span>اطلب العرض</span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 2: Ceiling & Door Offers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
              {singleOffers.map((offer, idx) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: 0.25 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -7 }}
                  className="rounded-[22px] bg-white border border-[#D4A63D]/40 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col text-center group luxury-card"
                >
                  <div className="py-2 px-4 bg-gradient-to-r from-[#081B33] via-[#0E2749] to-[#081B33] text-white border-b border-[#D4A63D]/30">
                    <span className="text-sm sm:text-base font-black text-[#F5D77A]">
                      {offer.title}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>

                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="flex items-baseline justify-center gap-1 text-[#D82323] font-black text-xl sm:text-2xl leading-none">
                      <span>{offer.price}</span>
                      <span className="text-xs font-bold text-[#D82323]">ريال</span>
                    </div>

                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={getWhatsAppUrl(offer.title, offer.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] hover:from-[#F5D77A] hover:to-[#D4A63D] text-[#081B33] font-black text-xs transition-all shadow flex items-center justify-center gap-1 luxury-btn"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#081B33]" />
                      <span>اطلب العرض</span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
              <div className="hidden sm:block" />
            </div>

          </div>

        </div>

      </div>

      {/* Official Flyer Lightbox Modal */}
      <AnimatePresence>
        {showFlyerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFlyerModal(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[90vh] bg-[#081B33] border-2 border-[#D4A63D] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#D4A63D]/30 bg-[#0A2240] text-white">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D4A63D]" />
                  <span className="font-black text-sm text-[#F5D77A]">بروشور عروض القصر الذهبي المعتمد رسمياً</span>
                </div>
                <button
                  onClick={() => setShowFlyerModal(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Flyer Image Container */}
              <div className="relative flex-1 min-h-[420px] max-h-[70vh] w-full bg-black/40 overflow-y-auto p-2 flex items-center justify-center">
                <div className="relative w-full aspect-[9/16] max-h-[65vh]">
                  <Image
                    src="/images/brand/official-golden-palace-flyer.jpg"
                    alt="بروشور عروض القصر الذهبي المعتمد"
                    fill
                    className="object-contain rounded-xl"
                    priority
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-4 border-t border-[#D4A63D]/30 bg-[#0A2240] flex items-center justify-between gap-3">
                <span className="text-xs text-slate-300">نخدم مناطق الخبر • الدمام • القطيف</span>
                <a
                  href={`https://wa.me/966${whatsappNum.replace(/^0+/, '')}?text=${encodeURIComponent('مرحباً القصر الذهبي، اطلعت على البروشور الرسمي وأود حجز العرض الآن')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] text-[#081B33] font-black text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#081B33]" />
                  <span>حجز العرض بالواتساب</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
