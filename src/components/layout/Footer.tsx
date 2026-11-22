'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { BrandLogo } from '../common/BrandLogo';
import {
  ModernPhoneIcon,
  ModernWhatsAppIcon,
  ModernInstagramIcon,
  ModernXIcon,
  ModernTikTokIcon,
  ModernYouTubeIcon,
  ModernLinkedInIcon,
  ModernGoogleMapsIcon,
} from '../common/SocialIcons';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface ISiteSettings {
  companyNameAr?: string;
  companyNameEn?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  locationAr?: string;
  locationEn?: string;
  googleMapsUrl?: string;
  googleMapsEmbedUrl?: string;
  instagramUrl?: string;
  xUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

export const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const [settings, setSettings] = useState<ISiteSettings>({
    companyNameAr: 'القصر الذهبي للدهانات والديكورات الحديثة',
    companyNameEn: 'Golden Palace for Modern Paints & Decors',
    phone: '0561095508',
    whatsapp: '966561095508',
    email: 'info@alqasraldhahabi.com',
    locationAr: 'المنطقة الشرقية (الخبر • الدمام • القطيف)',
    locationEn: 'Eastern Province (Khobar • Dammam • Qatif)',
    googleMapsUrl: 'https://maps.google.com',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114467.43398939223!2d50.119058!3d26.303912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e81b67efc461%3A0x6b6cfa4c68df8eb0!2sAl%20Khobar!5e0!3m2!1sen!2ssa!4v1700000000000',
    instagramUrl: 'https://instagram.com',
    xUrl: 'https://x.com',
    tiktokUrl: 'https://tiktok.com',
    youtubeUrl: 'https://youtube.com',
    linkedinUrl: 'https://linkedin.com',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  const rawWhatsapp = (settings.whatsapp || settings.phone || '0561095508').replace(/[^0-9]/g, '');
  const cleanWhatsapp = rawWhatsapp.startsWith('0') ? '966' + rawWhatsapp.substring(1) : (rawWhatsapp.startsWith('966') ? rawWhatsapp : '966' + rawWhatsapp);
  const rawPhone = (settings.phone || '0561095508').replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('0') ? '+966' + rawPhone.substring(1) : (rawPhone.startsWith('966') ? '+' + rawPhone : (rawPhone.startsWith('+') ? rawPhone : '+966' + rawPhone));
  const mapsUrl = settings.googleMapsUrl || (settings as any).mapUrl || 'https://maps.google.com';
  const mapsEmbed =
    settings.googleMapsEmbedUrl ||
    (settings as any).mapEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114467.43398939223!2d50.119058!3d26.303912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e81b67efc461%3A0x6b6cfa4c68df8eb0!2sAl%20Khobar!5e0!3m2!1sen!2ssa!4v1700000000000';

  return (
    <footer className="bg-[#081B33] text-[#A6B4C9] border-t border-[#D4A63D]/30 relative overflow-hidden font-madani">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Newsletter & Social */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white text-sm font-bold tracking-tight">
              {lang === 'ar' ? 'اشترك في نشرتنا والعروض' : 'Newsletter & Offers'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'تابع أحدث عروض دهانات جوتن وديكورات بديل الرخام بالمنطقة الشرقية.'
                : 'Receive curated updates on genuine JOTUN offers and modern interior decor.'}
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="w-full bg-[#0D233F] border border-slate-700 focus:border-[#D4A63D] rounded-md px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute left-1.5 top-1.5 bottom-1.5 px-3 bg-[#D4A63D] text-black font-bold rounded hover:bg-[#F5D77A] transition-colors flex items-center justify-center"
              >
                {subscribed ? <CheckCircle className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>

            {/* Modern Social Media Icons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3">
              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0D233F] border border-slate-700 hover:border-[#25D366] text-slate-300 hover:text-[#25D366] hover:bg-[#25D366]/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <ModernWhatsAppIcon className="w-4 h-4" />
              </a>

              <a
                href={settings.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0D233F] border border-slate-700 hover:border-[#E1306C] text-slate-300 hover:text-[#E1306C] hover:bg-[#E1306C]/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                aria-label="Instagram"
                title="Instagram"
              >
                <ModernInstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={settings.tiktokUrl || 'https://tiktok.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0D233F] border border-slate-700 hover:border-[#00f2fe] text-slate-300 hover:text-[#00f2fe] hover:bg-[#00f2fe]/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                aria-label="TikTok"
                title="TikTok"
              >
                <ModernTikTokIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={settings.youtubeUrl || 'https://youtube.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0D233F] border border-slate-700 hover:border-[#FF0000] text-slate-300 hover:text-[#FF0000] hover:bg-[#FF0000]/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                aria-label="YouTube"
                title="YouTube"
              >
                <ModernYouTubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-sm font-bold tracking-tight">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'من نحن' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'عروضنا وباقاتنا' : 'Packages & Offers'}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'أعمالنا' : 'Portfolio'}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'المدونة' : 'Blog'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services List */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white text-sm font-bold tracking-tight">
              {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/home-paints" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'دهانات المنازل' : 'Home Painting'}
                </Link>
              </li>
              <li>
                <Link href="/services/villa-paints" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'دهانات الفلل' : 'Villa Painting'}
                </Link>
              </li>
              <li>
                <Link href="/services/apartment-paints" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'دهانات الشقق' : 'Apartment Painting'}
                </Link>
              </li>
              <li>
                <Link href="/services/majlis-paints" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'دهانات المجالس' : 'Majlis Painting'}
                </Link>
              </li>
              <li>
                <Link href="/services/interior-paints" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'الدهانات الداخلية' : 'Interior Painting'}
                </Link>
              </li>
              <li>
                <Link href="/services/exterior-paints" className="hover:text-[#D4A63D] transition-colors">
                  {lang === 'ar' ? 'الدهانات الخارجية' : 'Exterior Painting'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Full Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-white text-sm font-bold tracking-tight">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <div className="space-y-2 text-xs">
              {/* Call Button */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D233F] border border-slate-700 hover:border-[#D4A63D] hover:bg-[#D4A63D]/10 text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#D4A63D]/20 flex items-center justify-center text-[#D4A63D] group-hover:bg-[#D4A63D] group-hover:text-black transition-colors shrink-0">
                    <ModernPhoneIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-xs font-mono" dir="ltr">{settings.phone || '0561095508'}</span>
                </div>
                <span className="text-[10px] text-[#D4A63D] font-medium">
                  {lang === 'ar' ? 'اتصال مباشر' : 'Call'}
                </span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  lang === 'ar'
                    ? 'مرحباً القصر الذهبي، أود الاستفسار عن عروض الدهانات والديكورات'
                    : 'Hello Golden Palace, I would like to inquire about painting and decor offers'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D233F] border border-slate-700 hover:border-[#25D366] hover:bg-[#25D366]/10 text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black transition-colors shrink-0">
                    <ModernWhatsAppIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-xs">
                    {lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp'}
                  </span>
                </div>
                <span className="text-[10px] text-[#25D366] font-medium">
                  {lang === 'ar' ? 'محادثة فورية' : 'Chat'}
                </span>
              </a>

              {/* Official Email */}
              <a
                href={`mailto:${settings.email || 'info@alqasraldhahabi.com'}`}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D233F] border border-slate-700 hover:border-[#D4A63D] hover:bg-[#D4A63D]/10 text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#D4A63D]/20 flex items-center justify-center text-[#D4A63D] group-hover:bg-[#D4A63D] group-hover:text-black transition-colors shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-xs font-mono" dir="ltr">
                    {settings.email || 'info@alqasraldhahabi.com'}
                  </span>
                </div>
                <span className="text-[10px] text-[#D4A63D] font-medium">
                  {lang === 'ar' ? 'البريد الرسمي' : 'Email'}
                </span>
              </a>

              {/* Physical Location */}
              <div className="flex items-start gap-2 pt-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#D4A63D] shrink-0 mt-0.5" />
                <span>
                  {lang === 'ar'
                    ? (settings.locationAr || 'المنطقة الشرقية (الخبر • الدمام • القطيف)')
                    : (settings.locationEn || 'Eastern Province (Khobar • Dammam • Qatif)')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Bar */}
        <div className="pt-8 mb-8 border-t border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <BrandLogo variant="horizontal" theme="gold" height={48} />
          </div>
          <p className="text-xs text-slate-300 max-w-xl text-center md:text-right leading-relaxed">
            {lang === 'ar'
              ? 'القصر الذهبي للدهانات والديكورات الحديثة: حلول متكاملة في أعمال الدهانات والديكورات للمنازل والفلل والمشاريع التجارية بالمنطقة الشرقية بتشطيبات عصرية وجودة عالية.'
              : 'Golden Palace for Modern Paints & Decors: Integrated residential and commercial painting finishes across the Eastern Province.'}
          </p>
        </div>

        {/* Bottom Copyright & Credit */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="text-center md:text-right">
            {lang === 'ar'
              ? 'جميع الحقوق محفوظة © 2026 القصر الذهبي للدهانات والديكورات الحديثة'
              : 'All Rights Reserved © 2026 Golden Palace for Modern Paints & Decors'}
          </div>

          {/* Designed by Rowad Digital */}
          <div className="flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-[#0D233F] border border-slate-700/70 text-slate-300 shadow-sm">
            <span>{lang === 'ar' ? 'صُمم بواسطة' : 'Designed by'}</span>
            <a
              href={`https://wa.me/966543907572?text=${encodeURIComponent(
                lang === 'ar'
                  ? 'السلام عليكم، أود الاستفسار عن خدمات تصميم وتطوير المواقع من رواد الرقمية'
                  : 'Hello, I would like to inquire about website design services from Rowad Digital'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#D4A63D] hover:text-[#F5D77A] hover:underline underline-offset-4 transition-all group"
              title={lang === 'ar' ? 'تواصل مع رواد الرقمية عبر واتساب' : 'Chat with Rowad Digital on WhatsApp'}
            >
              <span>{lang === 'ar' ? 'رواد الرقمية' : 'Rowad Digital'}</span>
              <ModernWhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
