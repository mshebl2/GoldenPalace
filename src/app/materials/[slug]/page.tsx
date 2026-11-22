import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getMaterialBySlug, getMaterials } from '@/lib/db';
import { Layers, FileDown, CheckCircle2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const material = await getMaterialBySlug(slug);
  if (!material) return { title: 'المادة غير موجودة' };

  return {
    title: `${material.titleAr} | القصر الذهبي للدهانات والديكورات الحديثة`,
    description: material.descriptionAr,
    openGraph: {
      title: `${material.titleAr} | القصر الذهبي للدهانات والديكورات الحديثة`,
      description: material.descriptionAr,
      images: [material.coverImage],
    },
  };
}

export default async function MaterialDetailPage({ params }: Props) {
  const { slug } = await params;
  const [material, allMaterials] = await Promise.all([
    getMaterialBySlug(slug),
    getMaterials(),
  ]);

  if (!material) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3E7]">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Header navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/materials"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B1B1B] hover:text-[#C5A059]"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لكتالوج المواد والتشطيبات</span>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Gallery / Image showcase */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white h-[440px] bg-black">
                <img
                  src={material.coverImage}
                  alt={material.titleAr}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Color swatch & specs preview */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-[#1B1B1B]">الألوان والدرجات المتوفرة:</h4>
                <div className="flex flex-wrap gap-2">
                  {material.colors.map((color, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[#F7F3E7] text-xs font-semibold text-gray-800 border border-gray-300"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Information & Specs */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B1B1B] text-[#D8B369] text-xs font-bold mb-3">
                  <span>{material.categoryAr}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1B1B1B] mb-4">
                  {material.titleAr}
                </h1>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {material.descriptionAr}
                </p>
              </div>

              {/* Dimensions & Thickness */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-[#1B1B1B] border-b border-gray-100 pb-2">
                  المقاسات والسماكات المتاحة
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block mb-1">المقاسات القياسية:</span>
                    <ul className="space-y-1 font-medium text-gray-800">
                      {material.availableDimensions.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">السماكات المعتمدة:</span>
                    <ul className="space-y-1 font-medium text-gray-800">
                      {material.thicknessOptions.map((th, i) => (
                        <li key={i}>• {th}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-[#1B1B1B] border-b border-gray-100 pb-2">
                  المواصفات والخواص الفيزيائية
                </h3>
                <div className="space-y-2">
                  {material.technicalSpecsAr.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href={`/quotation?material=${encodeURIComponent(material.titleAr)}`}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D8B369] text-black font-bold text-sm text-center shadow-lg hover:from-[#D8B369] hover:to-[#C5A059] transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>طلب تسعير وتوريد هذه المادة</span>
                </Link>

                <a
                  href="/brand/stationery/riyadh-white-specs.pdf"
                  target="_blank"
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#1B1B1B] text-[#D8B369] font-bold text-xs text-center hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  <span>تحميل البطاقة الفنية (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

