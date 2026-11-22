import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getMaterials } from '@/lib/db';
import { MaterialsClientView } from '@/components/materials/MaterialsClientView';

export const revalidate = 60;

export default async function MaterialsPage() {
  const materials = await getMaterials();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <MaterialsClientView materials={materials} />
      <Footer />
    </div>
  );
}
