import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProducts, getCategories } from '@/lib/db';
import { ProductsClientView } from '@/components/products/ProductsClientView';

export const metadata: Metadata = {
  title: 'عروض وباقات دهانات جوتن وديكورات الفلل بالشرقية',
  description: 'أفضل عروض وباقات دهانات جوتن الأصلية للشقق والفلل بالدمام والخبر والقطيف. دهان الغرفة من 500 ريال، باقات شاملة المواد والعمالة والنظافة مع ضمان رسمي.',
};

export const revalidate = 60;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen pt-32 text-center text-gray-500">جاري التحميل...</div>}>
        <ProductsClientView initialProducts={products} categories={categories} />
      </Suspense>
      <Footer />
    </div>
  );
}
