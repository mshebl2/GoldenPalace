import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProjects } from '@/lib/db';
import { ProjectsClientView } from '@/components/projects/ProjectsClientView';

export const metadata: Metadata = {
  title: 'معرض أعمال وتشطيبات الدهانات والديكورات بالشرقية',
  description: 'معرض أعمال القصر الذهبي للدهانات والديكورات الحديثة: تشطيب فلل، شقق، مجالس، دهانات جوتن، ديكورات بديل الرخام وبديل الخشب بالخبر والدمام والقطيف.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen pt-32 text-center text-gray-500">جاري التحميل...</div>}>
        <ProjectsClientView projects={projects} />
      </Suspense>
      <Footer />
    </div>
  );
}
