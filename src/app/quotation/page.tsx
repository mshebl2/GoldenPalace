import React from 'react';
import type { Metadata } from 'next';
import { QuotationClientView } from '@/components/quotation/QuotationClientView';

export const metadata: Metadata = {
  title: 'طلب عرض سعر فوري ومعاينة مجانية | خصم 30% بالشرقية',
  description: 'احصل على عرض سعر دهانات فوري ومعاينة موقع مجانية لمنزلك أو فلتك بالخبر والدمام والقطيف. دهانات جوتن الأصلية وديكورات بديل الرخام والخشب مع ضمان رسمي.',
};

export default function QuotationPage() {
  return <QuotationClientView />;
}
