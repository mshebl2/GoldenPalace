import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getServiceBySlug, getServices, getProjects } from '@/lib/db';
import { CheckCircle2, FileText, ArrowRight, ArrowLeft, Phone, Building } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'الخدمة غير موجودة' };

  return {
    title: service.titleAr,
    description: service.shortDescAr,
    openGraph: {
      title: service.titleAr,
      description: service.shortDescAr,
      images: [service.coverImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, allServices, allProjects] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getProjects(),
  ]);

  if (!service) {
    notFound();
  }

  // Related projects
  const relatedProjects = allProjects.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Detail Hero */}
        <div className="relative h-[380px] bg-[#141414] text-white flex items-center mb-16 overflow-hidden">
          <img
            src={service.coverImage}
            alt={service.titleAr}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-3xl">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D8B369] mb-4 hover:underline"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة لقائمة الخدمات</span>
              </Link>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                {service.titleAr}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {service.shortDescAr}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Description */}
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#C5A059]/20 shadow-md space-y-6">
                <h2 className="text-2xl font-bold text-[#1B1B1B] border-b border-gray-100 pb-4">
                  نطاق العمل والمواصفات الفنية
                </h2>
                <div className="text-gray-700 leading-relaxed text-base space-y-4">
                  <p>{service.descriptionAr}</p>
                </div>

                <div className="pt-6">
                  <h3 className="text-lg font-bold text-[#1B1B1B] mb-4">
                    مميزات الخدمة والضمانات
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.featuresAr.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F3E7]/50 border border-gray-200"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-800 font-medium">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery */}
              {service.gallery && service.gallery.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1B1B1B]">معرض الصور التنفيذية</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden shadow-md h-60 border border-white"
                      >
                        <img
                          src={img}
                          alt={`${service.titleAr} - صورة ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1B1B1B]">مشاريع تم تنفيذها بهذه الخدمة</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedProjects.map((p) => (
                      <Link
                        key={p.id}
                        href={`/projects/${p.slug}`}
                        className="bg-white rounded-xl overflow-hidden shadow border border-gray-200 group flex flex-col"
                      >
                        <div className="h-44 overflow-hidden">
                          <img
                            src={p.coverImage}
                            alt={p.titleAr}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-sm text-[#1B1B1B] group-hover:text-[#C5A059]">
                            {p.titleAr}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{p.locationAr}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA & Other Services */}
            <div className="lg:col-span-4 space-y-8">
              {/* Request Quotation Widget */}
              <div className="bg-[#181818] text-white p-6 sm:p-8 rounded-2xl border border-[#C5A059]/40 shadow-xl space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">هل ترغب بطلب تسعير؟</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    احصل على دراسة تفصيلية لمخططاتك وعرض سعر هندسي مخصص لمشروعك.
                  </p>
                </div>

                <Link
                  href={`/quotation?service=${encodeURIComponent(service.titleAr)}`}
                  className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D8B369] text-black font-bold text-sm flex items-center justify-center gap-2 hover:from-[#D8B369] hover:to-[#C5A059] shadow-lg transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>طلب عرض سعر لهذه الخدمة</span>
                </Link>

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span>أو تواصل عبر الهاتف:</span>
                  <a href="tel:0561095508" className="text-[#C5A059] font-bold" dir="ltr">
                    0561095508
                  </a>
                </div>
              </div>

              {/* Other Services Navigation */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-[#1B1B1B] border-b border-gray-100 pb-2">
                  خدمات أخرى قد تهمك
                </h4>
                <div className="space-y-2">
                  {allServices
                    .filter((s) => s.id !== service.id)
                    .map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className="block p-3 rounded-lg hover:bg-[#F7F3E7] text-xs font-semibold text-gray-700 hover:text-[#C5A059] transition-colors"
                      >
                        {s.titleAr}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

