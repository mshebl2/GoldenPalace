import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getArticleBySlug, getArticles } from '@/lib/db';
import { Calendar, User, ArrowRight, Share2, Clock, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'المقال غير موجود' };

  return {
    title: article.titleAr,
    description: article.excerptAr,
    openGraph: {
      title: article.titleAr,
      description: article.excerptAr,
      images: [article.coverImage],
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const related = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] font-madani">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Navigation back */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B1B1B] hover:text-[#C5A059]"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمدونة ونصائح الدهانات</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B1B1B] text-[#D8B369] text-xs font-bold">
              <span>{article.category || 'نصائح وأفكار دهانات'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-[#1B1B1B] leading-tight">
              {article.titleAr}
            </h1>

            <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-200 pb-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C5A059]" />
                <span className="font-medium text-gray-800">{article.author || 'القصر الذهبي'}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>{article.publishedAt || (article as any).date || '2026-02-15'}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>وقت القراءة: {article.readTime || '4 دقائق قراءة'}</span>
              </span>
            </div>
          </header>

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-[420px] border-4 border-white">
            <img
              src={article.coverImage || (article as any).image || '/images/hero/hero-living-room.webp'}
              alt={article.titleAr}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Rich Body Content */}
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-sm leading-relaxed text-gray-800 space-y-6 text-base prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.contentAr }} />
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-12 border-t border-gray-300 space-y-6">
              <h3 className="text-2xl font-bold text-[#1B1B1B]">مقالات ذات صلة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 group flex flex-col"
                  >
                    <div className="h-36 overflow-hidden">
                      <img
                        src={r.coverImage || (r as any).image || '/images/hero/hero-living-room.webp'}
                        alt={r.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-xs text-gray-900 group-hover:text-[#C5A059] line-clamp-2">
                        {r.titleAr}
                      </h4>
                      <p className="text-[11px] text-gray-500">{r.publishedAt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}

