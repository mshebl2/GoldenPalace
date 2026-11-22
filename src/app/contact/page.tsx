import React from 'react';
import type { Metadata } from 'next';
import { ContactClientView } from '@/components/contact/ContactClientView';

export const metadata: Metadata = {
  title: 'اتصل بنا | القصر الذهبي للدهانات والديكورات الحديثة بالشرقية',
  description: 'تواصل مباشرة مع القصر الذهبي للدهانات والديكورات بالخبر والدمام والقطيف. هاتف: 0561095508، استشارة ومعاينة مجانية وعروض خاصة على دهانات جوتن.',
};

export default function ContactPage() {
  return <ContactClientView />;
}
