'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  dir: 'rtl' | 'ltr';
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'خدماتنا',
    projects: 'مشاريعنا',
    materials: 'المواد والتشطيبات',
    blog: 'الأخبار والمدونة',
    quotation: 'طلب عرض سعر',
    contact: 'تواصل معنا',
    admin_dashboard: 'لوحة التحكم',
    search_placeholder: 'ابحث عن خدمات، مشاريع، مواد...',
    request_quote_btn: 'طلب عرض سعر',
    explore_work: 'استكشف أعمالنا',
    view_all_projects: 'عرض جميع المشاريع',
    more_articles: 'المزيد من المقالات',
    read_more: 'اقرأ المزيد',
    download_specs: 'تحميل المواصفات الفنية',
    back_to_materials: 'العودة لكتالوج المواد',
    back_to_projects: 'العودة لمعرض المشاريع',
    back_to_services: 'العودة لقائمة الخدمات',

    // Official Details
    company_name: 'القصر الذهبي للدهانات والديكورات الحديثة',
    company_name_en: 'GOLDEN PALACE FOR PAINTS & MODERN DECOR',
    phone: '0561095508',
    whatsapp: '0561095508',
    email: 'info@alqasraldhahabi.com',
    location: 'المنطقة الشرقية (الدمام - الخبر - القطيف)',
    map_url: 'https://maps.app.goo.gl',
    unified_number: '0561095508',
    rights_reserved: 'جميع الحقوق محفوظة © 2026 القصر الذهبي للدهانات والديكورات الحديثة',

    // Trust Pillars
    expert_team: 'فريق متخصص',
    integrated_solutions: 'حلول متكاملة',
    high_quality: 'جودة عالية',
    trusted_partners: 'شراكات موثوقة',
    distinguished_projects: 'مشاريع مميزة',

    // Form
    full_name: 'الاسم الكامل',
    phone_number: 'رقم الجوال',
    city: 'المدينة',
    project_location: 'موقع المشروع',
    required_service: 'الخدمة المطلوبة',
    project_type: 'نوع المشروع',
    approx_area: 'المساحة التقريبية (م²)',
    material_preference: 'تفضيلات المواد والرخام',
    project_description: 'تفاصيل المشروع والملاحظات',
    attach_files: 'إرفاق مخططات أو صور (PDF, JPG, PNG)',
    preferred_contact: 'طريقة التواصل المفضلة',
    submit_request: 'إرسال طلب عرض السعر',
    submitting: 'جاري الإرسال...',
    request_success_title: 'تم استلام طلبك بنجاح!',
    reference_number: 'رقم المرجع الخاص بك',
    our_team_will_contact: 'سيتواصل معك فريقنا الهندسي لدراسة التفاصيل وتقديم عرض السعر الأمثل.',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    projects: 'Projects',
    materials: 'Materials & Finishes',
    blog: 'News & Blog',
    quotation: 'Request Quotation',
    contact: 'Contact Us',
    admin_dashboard: 'Admin Dashboard',
    search_placeholder: 'Search services, projects, materials...',
    request_quote_btn: 'Request a Quote',
    explore_work: 'Explore Our Work',
    view_all_projects: 'View All Projects',
    more_articles: 'More Articles',
    read_more: 'Read More',
    download_specs: 'Download Technical Specs',
    back_to_materials: 'Back to Materials Catalog',
    back_to_projects: 'Back to Projects',
    back_to_services: 'Back to Services',

    // Official Details
    company_name: 'GOLDEN PALACE FOR PAINTS & MODERN DECOR',
    company_name_en: 'القصر الذهبي للدهانات والديكورات الحديثة',
    phone: '0561095508',
    whatsapp: '0561095508',
    email: 'info@alqasraldhahabi.com',
    location: 'Eastern Province (Dammam - Khobar - Qatif)',
    map_url: 'https://maps.app.goo.gl',
    unified_number: '0561095508',
    rights_reserved: 'All Rights Reserved © 2026 Golden Palace Paints & Modern Decor',

    // Trust Pillars
    expert_team: 'Expert Team',
    integrated_solutions: 'Integrated Solutions',
    high_quality: 'High Quality',
    trusted_partners: 'Trusted Partnerships',
    distinguished_projects: 'Iconic Projects',

    // Form
    full_name: 'Full Name',
    phone_number: 'Mobile Phone',
    city: 'City',
    project_location: 'Project Location',
    required_service: 'Required Service',
    project_type: 'Project Type',
    approx_area: 'Approx. Area (m²)',
    material_preference: 'Material & Marble Preferences',
    project_description: 'Project Details & Scope',
    attach_files: 'Attach Blueprints or Images (PDF, JPG, PNG)',
    preferred_contact: 'Preferred Contact Method',
    submit_request: 'Submit Quotation Request',
    submitting: 'Submitting...',
    request_success_title: 'Quotation Request Received!',
    reference_number: 'Your Reference Number',
    our_team_will_contact: 'Our engineering team will review your specifications and contact you promptly.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  dir: 'rtl',
  setLang: () => {},
  toggleLang: () => {},
  t: (k: string) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('site_lang') as Language;
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLangState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    } else {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('site_lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['ar']?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir: lang === 'ar' ? 'rtl' : 'ltr',
        setLang,
        toggleLang,
        t,
      }}
    >
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

