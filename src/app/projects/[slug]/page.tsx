import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProjectBySlug, getProjects } from '@/lib/db';
import { MapPin, Calendar, FileText, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'المشروع غير موجود' };

  return {
    title: project.titleAr,
    description: project.descriptionAr,
    openGraph: {
      title: project.titleAr,
      description: project.descriptionAr,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Project Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B1B1B] hover:text-[#C5A059] mb-6"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمعرض المشاريع</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-gray-300">
            <div>
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                <span className="flex items-center gap-1 font-semibold text-[#C5A059]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{project.locationAr}</span>
                </span>
                {project.completionDate && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>سنة الإنجاز: {project.completionDate}</span>
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#1B1B1B]">
                {project.titleAr}
              </h1>
            </div>

            <Link
              href={`/quotation?projectRef=${encodeURIComponent(project.titleAr)}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-sm shadow-md transition-all self-start lg:self-auto"
            >
              <FileText className="w-4 h-4" />
              <span>طلب عرض سعر مماثل</span>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="rounded-2xl overflow-hidden shadow-2xl h-[480px] border-4 border-white">
            <img
              src={project.coverImage}
              alt={project.titleAr}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content & Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-[#1B1B1B]">نطاق العمل والتفاصيل</h2>
                <p className="text-gray-700 leading-relaxed text-base">{project.descriptionAr}</p>
                <div className="p-4 rounded-xl bg-[#F7F3E7] border border-[#C5A059]/30">
                  <h4 className="font-bold text-sm text-[#1B1B1B] mb-1">ملخص نطاق التنفيذ:</h4>
                  <p className="text-xs text-gray-700">{project.scopeAr}</p>
                </div>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1B1B1B]">لقطات وصور إضافية</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden shadow-md h-64 border border-white"
                      >
                        <img
                          src={img}
                          alt={`${project.titleAr} - ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#181818] text-white p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 shadow-xl space-y-6">
                <h3 className="text-xl font-bold text-white">معلومات المشروع</h3>
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">التصنيف:</span>
                    <span className="text-white font-semibold">
                      {project.category === 'residential' ? 'سكني وقصور' : 'تجاري وإداري'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">الموقع:</span>
                    <span className="text-white font-semibold">{project.locationAr}</span>
                  </div>
                  {project.completionDate && (
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400">سنة التنفيذ:</span>
                      <span className="text-white font-semibold">{project.completionDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">نظام التثبيت:</span>
                    <span className="text-[#D8B369] font-semibold">ميكانيكي معزول معتمد</span>
                  </div>
                </div>

                <Link
                  href="/quotation"
                  className="w-full py-3 text-center rounded-lg bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all block"
                >
                  طلب تسعير لمشروعك
                </Link>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-[#1B1B1B] border-b border-gray-100 pb-2">
                    مشاريع أخرى
                  </h4>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/projects/${r.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <img
                          src={r.coverImage}
                          alt={r.titleAr}
                          className="w-16 h-12 object-cover rounded-lg shrink-0"
                        />
                        <div>
                          <h5 className="font-bold text-xs text-gray-800 group-hover:text-[#C5A059] transition-colors line-clamp-1">
                            {r.titleAr}
                          </h5>
                          <span className="text-[11px] text-gray-500">{r.locationAr}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

