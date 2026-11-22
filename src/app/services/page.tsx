import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getServices } from '@/lib/db';
import { ServicesClientView } from '@/components/services/ServicesClientView';

export const metadata: Metadata = {
  title: 'خدمات الدهانات والديكورات الحديثة بالخبر والدمام',
  description: 'خدمات دهانات المنازل والفلل والشقق والمجالس والدهانات الداخلية والخارجية بأحدث تقنيات جوتن الأصلية بالمنطقة الشرقية.',
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <ServicesClientView services={services} />
      <Footer />
    </div>
  );
}
