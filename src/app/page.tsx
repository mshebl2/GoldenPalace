import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GoldenPalaceHero } from '@/components/golden-palace/GoldenPalaceHero';
import { GoldenPalaceOffers } from '@/components/golden-palace/GoldenPalaceOffers';
import { GoldenPalaceServices } from '@/components/golden-palace/GoldenPalaceServices';
import { GoldenPalacePortfolio } from '@/components/golden-palace/GoldenPalacePortfolio';
import { GoldenPalaceWhyUs } from '@/components/golden-palace/GoldenPalaceWhyUs';
import { GoldenPalaceAbout } from '@/components/golden-palace/GoldenPalaceAbout';
import { GoldenPalaceProcess } from '@/components/golden-palace/GoldenPalaceProcess';
import { GoldenPalaceReviews } from '@/components/golden-palace/GoldenPalaceReviews';
import { GoldenPalaceQuoteStrip } from '@/components/golden-palace/GoldenPalaceQuoteStrip';
import { EasternProvinceFloatingBadge } from '@/components/golden-palace/EasternProvinceFloatingBadge';
import { FloatingContactWidget } from '@/components/common/FloatingContactWidget';

import { getSiteSettings, getProducts, getServices, getProjects } from '@/lib/db';

export const metadata: Metadata = {
  title: 'القصر الذهبي للدهانات والديكورات الحديثة | دهانات جوتن وديكورات بالشرقية (الدمام - الخبر - القطيف)',
  description: 'القصر الذهبي للدهانات والديكورات الحديثة بالمنطقة الشرقية: دهانات داخلية وخارجية بخامات جوتن الأصلية، بديل الرخام وبديل الخشب، أسقف جبسية، ودهان الأبواب بأفضل الأسعار.',
};

export const revalidate = 60;

export default async function HomePage() {
  const [settings, products, services, projects] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getServices(),
    getProjects(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F4] w-full overflow-x-hidden font-madani">
      <Navbar settings={settings} />
      <main className="flex-1 w-full overflow-x-hidden">
        {/* SECTION 01 — MODERN LIGHT HERO */}
        <GoldenPalaceHero settings={settings} />

        {/* SECTION 02 — OFFERS & JOTUN PACKAGES */}
        <GoldenPalaceOffers settings={settings} products={products} />

        {/* SECTION 03 — PAINTING & DECOR SERVICES */}
        <GoldenPalaceServices />

        {/* SECTION 04 — PORTFOLIO GALLERY */}
        <GoldenPalacePortfolio />

        {/* SECTION 05 — WHY CHOOSE US PILLARS */}
        <GoldenPalaceWhyUs settings={settings} />

        {/* SECTION 06 — ABOUT US */}
        <GoldenPalaceAbout settings={settings} />

        {/* SECTION 07 — WORK PROCESS TIMELINE */}
        <GoldenPalaceProcess />

        {/* SECTION 08 — VERIFIED CLIENT REVIEWS */}
        <GoldenPalaceReviews />

        {/* SECTION 09 — FAST QUOTE & CONSULTATION STRIP */}
        <GoldenPalaceQuoteStrip settings={settings} />
      </main>
      <Footer />
      <EasternProvinceFloatingBadge />
      <FloatingContactWidget />
    </div>
  );
}
