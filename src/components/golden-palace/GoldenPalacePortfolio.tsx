'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const GoldenPalacePortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'interior' | 'exterior' | 'decor' | 'ceilings'>('all');

  const tabs = [
    { id: 'all', label: 'الكل' },
    { id: 'interior', label: 'دهانات داخلية' },
    { id: 'exterior', label: 'دهانات خارجية' },
    { id: 'decor', label: 'ديكورات' },
    { id: 'ceilings', label: 'أسقف' },
  ];

  const projects = [
    {
      id: 'p-limestone',
      title: 'تشطيب ممر ومداخل فيلا عصرية بدهان لايمستون 10341 — الخبر',
      category: 'interior',
      image: '/images/portfolio/real-limestone-hallway.jpg',
      link: '/projects',
    },
    {
      id: 'p-foam-breeze',
      title: 'تنفيذ بانوهات فوم ديكورية مع دهان بريز 0552 ولايمستون — الدمام',
      category: 'decor',
      image: '/images/portfolio/real-breeze-limestone-foam.jpg',
      link: '/projects',
    },
    {
      id: 'p-modern-parquet',
      title: 'تشطيب صالة وغرف نوم مع باركيه وإنارة أسقف مخفية — الخبر',
      category: 'interior',
      image: '/images/portfolio/real-modern-room-parquet.jpg',
      link: '/projects',
    },
    {
      id: 'p-luxury-foam',
      title: 'تفاصيل بانوهات فوم ناعمة وتشطيب فندقي متقن — الدمام',
      category: 'decor',
      image: '/images/portfolio/real-luxury-foam-moldings.jpg',
      link: '/projects',
    },
    {
      id: 'p-breeze-vanilla',
      title: 'تشطيب جداري دهان بريز 0552 وفانيلا لاتيه 1519 — القطيف',
      category: 'interior',
      image: '/images/portfolio/real-breeze-vanilla-latte.jpg',
      link: '/projects',
    },
    {
      id: 'p-greige-door',
      title: 'دهان وتجديد أبواب خشبية راقية بلون الجريج العصري — الخبر',
      category: 'interior',
      image: '/images/portfolio/real-greige-painted-door.jpg',
      link: '/projects',
    },
    {
      id: 'p-classic-white',
      title: 'تشطيب ممر ومداخل بلون كلاسيك وايت 9918 المضيء — الدمام',
      category: 'interior',
      image: '/images/portfolio/real-classic-white-corridor.jpg',
      link: '/projects',
    },
    {
      id: 'p-hallway-ceilings',
      title: 'تشطيب أسقف وجدران صالة بإنارة سبوتلايت وأبواب خشبية — القطيف',
      category: 'ceilings',
      image: '/images/portfolio/real-hallway-wood-doors.jpg',
      link: '/projects',
    },
    {
      id: 'p-exterior',
      title: 'تشطيب واجهة فيلا معمارية مودرن عوازل جوتاشيلد — الخبر',
      category: 'exterior',
      image: '/images/portfolio/clean-p1.webp',
      link: '/projects',
    },
  ];

  const filtered = activeTab === 'all' ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="w-full max-w-full py-16 md:py-20 bg-[#F8F7F4] relative overflow-hidden font-madani">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#D4A63D]" />
            <h2 className="text-2xl sm:text-4xl font-black text-[#081B33] font-madani tracking-tight">
              من أعمالنا
            </h2>
            <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#D4A63D]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
            اكتشف نماذج من أعمال الدهانات والديكورات الحديثة بالمنطقة الشرقية
          </p>
        </motion.div>

        {/* Filter Tabs with Motion */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-6 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#D4A63D] text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* 4 Cards Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 bg-white aspect-[4/3] block border border-slate-200/80 luxury-card group"
                >
                  <Link href={proj.link} className="relative block w-full h-full">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow-md">
                        <Eye className="w-4 h-4 text-[#D4A63D]" />
                        <span>معاينة تفاصيل المشروع</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View Full Portfolio Button */}
          <div className="flex items-center justify-center mt-8">
            <Link
              href="/projects"
              className="py-3 px-8 rounded-full bg-[#081B33] hover:bg-[#0D233F] border border-[#D4A63D]/60 text-[#F5D77A] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>استعرض كافة أعمالنا ومشاريعنا المنفذة</span>
              <ChevronLeft className="w-4 h-4 text-[#D4A63D]" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
