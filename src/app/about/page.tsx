import React from 'react';
import type { Metadata } from 'next';
import { AboutClientView } from '@/components/about/AboutClientView';

export const metadata: Metadata = {
  title: 'من نحن | القصر الذهبي للدهانات والديكورات الحديثة بالشرقية',
  description: 'تعرف على شركة القصر الذهبي للدهانات والديكورات الحديثة. خبرة عريقة في تشطيب المنازل والفلل والمشاريع التجارية بالدمام والخبر والقطيف بخامات جوتن وضمان معتمد.',
};

export default function AboutPage() {
  return <AboutClientView />;
}
