import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getArticles } from '@/lib/db';
import { BlogClientView } from '@/components/blog/BlogClientView';

export const metadata: Metadata = {
  title: 'مدونة نصائح وتنسيق ألوان الدهانات والديكورات الحديثة',
  description: 'مقالات ونصائح لاختيار ألوان الدهانات، معالجة الرطوبة، أحدث صيحات دهانات جوتن، وبدائل الرخام والخشب للمنازل والفلل بالمنطقة الشرقية.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <BlogClientView articles={articles} />
      <Footer />
    </div>
  );
}
