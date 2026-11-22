'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Paintbrush,
  Home,
  Building,
  Layers,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

export const GoldenPalaceServices: React.FC = () => {
  const services = [
    {
      id: 'home-paints',
      slug: 'home-paints',
      number: '01',
      title: 'دهانات المنازل',
      desc: 'تشطيب أنيق لمنزلك بألوان عصرية وخامات تدوم.',
      image: '/images/services/service-homes.webp',
      icon: Home,
    },
    {
      id: 'villa-paints',
      slug: 'villa-paints',
      number: '02',
      title: 'دهانات الفلل',
      desc: 'لمسة فاخرة للفلل من الداخل والخارج باحترافية.',
      image: '/images/services/service-villas.webp',
      icon: Building,
    },
    {
      id: 'apartment-paints',
      slug: 'apartment-paints',
      number: '03',
      title: 'دهانات الشقق',
      desc: 'تجديد كامل بدهانات جوتن تدوم لسنوات بنظافة.',
      image: '/images/services/service-apartments.webp',
      icon: Layers,
    },
    {
      id: 'majlis-paints',
      slug: 'majlis-paints',
      number: '04',
      title: 'دهانات المجالس',
      desc: 'أجواء راقية للمجالس تعكس كرم الضيافة والفخامة.',
      image: '/images/services/service-majlis.webp',
      icon: Layers,
    },
    {
      id: 'interior-paints',
      slug: 'interior-paints',
      number: '05',
      title: 'الدهانات الداخلية',
      desc: 'أسطح داخلية ناعمة بألوان هادئة ومتناسقة.',
      image: '/images/services/service-interior.webp',
      icon: Paintbrush,
    },
    {
      id: 'exterior-paints',
      slug: 'exterior-paints',
      number: '06',
      title: 'الدهانات الخارجية',
      desc: 'دهانات مقاومة للعوامل الجوية وتحمي الواجهات.',
      image: '/images/services/service-exterior.webp',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="services" className="w-full max-w-full py-16 md:py-24 bg-white relative overflow-hidden font-madani">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-2.5">
            <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#D4A63D]" />
            <h2 className="text-2xl sm:text-4xl font-black text-[#081B33] font-madani tracking-tight">
              خدماتنا
            </h2>
            <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#D4A63D]" />
          </div>
          <p className="text-sm sm:text-base font-bold text-[#A87818] mb-1">
            دهانات بمعايير احترافية لكل مساحة
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
            نغطي جميع أنواع أعمال الدهانات السكنية والفلل والمجالس بالدمام والخبر والقطيف بخامات جوتن الأصلية وتشطيب نظيف.
          </p>
        </motion.div>

        {/* 6 Services Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4">
          {services.map((svc, idx) => {
            const IconComponent = svc.icon;
            const waUrl = `https://wa.me/966561095508?text=${encodeURIComponent(
              `السلام عليكم، أود الاستفسار وطلب عرض سعر ومعاينة لخدمة: ${svc.title}`
            )}`;

            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between rounded-2xl bg-[#FCFBFA] border border-slate-200/90 hover:border-[#D4A63D] hover:shadow-2xl transition-all duration-300 overflow-hidden text-center pb-3.5 shadow-sm luxury-card"
              >
                <div>
                  {/* Image Container with Top Rounded Corners & Number Badge */}
                  <Link href={`/services/${svc.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                    />
                    
                    {/* Top Floating Number Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-[#081B33]/85 text-[#F5D77A] text-[11px] font-black tracking-wider border border-[#D4A63D]/40 backdrop-blur-sm shadow-sm">
                      {svc.number}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* Circular Icon Overlapping Boundary */}
                  <div className="-mt-6 relative z-10 w-12 h-12 mx-auto rounded-full bg-white group-hover:bg-[#081B33] text-[#D4A63D] group-hover:text-[#F5D77A] border-2 border-[#D4A63D]/40 shadow-md flex items-center justify-center transition-all duration-300 group-hover:rotate-6">
                    <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" />
                  </div>

                  {/* Content Container */}
                  <div className="px-2.5 sm:px-3 pt-3">
                    <Link href={`/services/${svc.slug}`}>
                      <h3 className="text-xs sm:text-sm font-bold text-[#081B33] group-hover:text-[#A87818] transition-colors leading-snug line-clamp-1">
                        {svc.title}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="mt-1.5 text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[32px]">
                      {svc.desc}
                    </p>
                  </div>
                </div>

                {/* Direct Action Link & WhatsApp Quote Trigger */}
                <div className="mt-3 px-2.5 sm:px-3 pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5">
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#D4A63D]/10 hover:bg-[#D4A63D] text-[#A87818] hover:text-white text-[11px] font-bold transition-all shadow-sm"
                    title={`طلب عرض سعر لـ ${svc.title}`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>طلب الخدمة</span>
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Fast Action Banner with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-14 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F8F7F4] via-[#F4F1EA] to-[#F8F7F4] border border-[#D4A63D]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right luxury-card"
        >
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#081B33]">
              هل تحتاج معاينة مجانية لموقعك في الشرقية؟
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              فريقنا جاهز لزيارة منزلك أو فيلتك في الدمام، الخبر، والقطيف لتقديم المعاينة واختيار درجات الألوان مجاناً.
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/966561095508?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9%20%D9%84%D9%84%D8%AF%D9%87%D8%A7%D9%86%D8%A7%D8%AA"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A63D] to-[#F5D77A] text-[#081B33] font-bold text-xs sm:text-sm hover:shadow-lg transition-all luxury-btn"
          >
            احجز معاينة موقع مجانية
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};
