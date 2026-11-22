'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { BrandLogo } from '../common/BrandLogo';
import { ModernPhoneIcon, ModernWhatsAppIcon } from '../common/SocialIcons';
import {
  Search,
  Menu,
  X,
  Globe,
  MapPin,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import { ISiteSettings } from '@/lib/models';

export const Navbar: React.FC<{ settings?: ISiteSettings }> = ({ settings }) => {
  const phone = settings?.phone || '0561095508';
  const whatsapp = settings?.whatsapp || '0561095508';
  const waUrl = `https://wa.me/966${whatsapp.replace(/^0+/, '')}`;
  const serviceAreas = settings?.serviceAreasAr || 'الخبر - الدمام - القطيف';
  const announcement = settings?.topAnnouncementAr || 'حلول متكاملة في الدهانات والديكورات الحديثة وتشطيبات جوتن الأصلية';
  const logoHeight = settings?.logoHeight || 52;
  const { lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesSublinks = [
    { href: '/services/home-paints', label: 'دهانات المنازل' },
    { href: '/services/villa-paints', label: 'دهانات الفلل' },
    { href: '/services/apartment-paints', label: 'دهانات الشقق' },
    { href: '/services/majlis-paints', label: 'دهانات المجالس' },
    { href: '/services/interior-paints', label: 'الدهانات الداخلية' },
    { href: '/services/exterior-paints', label: 'الدهانات الخارجية' },
  ];

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'من نحن' },
    { href: '/services', label: 'خدماتنا', hasDropdown: true },
    { href: '/products', label: 'عروضنا الحالية' },
    { href: '/projects', label: 'معرض أعمالنا' },
    { href: '/blog', label: 'المدونة' },
    { href: '/contact', label: 'تواصل معنا' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/services?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-madani">
      
      {/* 1. TOP LIGHT STRIP (Desktop & Tablet) */}
      <div
        className={`hidden md:block w-full bg-[#F9F8F6] border-b border-slate-200/90 text-slate-700 text-xs transition-all duration-300 ${
          isScrolled ? 'max-h-0 opacity-0 overflow-hidden py-0 border-b-0' : 'max-h-12 opacity-100 py-1.5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Service Area Badge */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 text-slate-800 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D4A63D]" />
              <span className="font-bold">نخدم مناطق: {serviceAreas}</span>
            </div>
          </div>

          {/* Slogan Pill */}
          <div className="hidden lg:flex items-center gap-2 text-slate-500 font-normal text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A63D] shrink-0" />
            <span>{announcement}</span>
          </div>

          {/* Contact Quick Pills */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-800 font-mono font-bold text-xs shadow-sm transition-all"
              dir="ltr"
              title="اتصال مباشر"
            >
              <ModernPhoneIcon className="w-3.5 h-3.5 text-[#D4A63D]" />
              <span>{phone}</span>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs transition-all shadow-sm"
              title="واتساب مباشر"
            >
              <ModernWhatsAppIcon className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </a>

            <span className="text-slate-300 hidden sm:inline-block">|</span>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-[#A87818] transition-colors text-xs font-semibold"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4A63D]" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN LIGHT NAVIGATION BAR */}
      <nav
        dir="rtl"
        className={`w-full max-w-full overflow-hidden transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/80 py-2 sm:py-3'
            : 'bg-white/90 backdrop-blur-lg border-b border-slate-200/70 py-2.5 sm:py-4'
        }`}
      >
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo on Light Background */}
          <div className="flex items-center shrink-0">
            <BrandLogo
              variant="horizontal"
              theme="light"
              height={logoHeight}
              className="py-0.5"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        pathname.startsWith('/services')
                          ? 'text-[#A87818] bg-amber-50/80 font-black'
                          : 'text-slate-700 hover:text-[#A87818] hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-300" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full right-0 mt-1 w-64 p-2 bg-white rounded-2xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {servicesSublinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-amber-50/80 text-xs font-bold text-slate-700 hover:text-[#A87818] transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A63D]" />
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'text-[#A87818] bg-amber-50/80 font-black'
                      : 'text-slate-700 hover:text-[#A87818] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Action Area: Search & Quote Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#081B33] transition-colors"
              aria-label="بحث في الموقع"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Request Quote Button (Gold Gradient) */}
            <Link
              href="/quotation"
              className="hidden sm:inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] hover:from-[#F5D77A] hover:to-[#D4A63D] text-[#081B33] font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>اطلب عرض سعر</span>
            </Link>

            {/* Mobile Menu Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              aria-label="فتح القائمة الرئيسية"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <div className="border-t border-slate-200 bg-white p-3 shadow-inner">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن دهانات داخلية، بديل الرخام، عروض الغرف، دهان الأبواب..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#D4A63D] focus:ring-1 focus:ring-[#D4A63D] text-xs sm:text-sm text-slate-800 outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="py-2 px-5 rounded-xl bg-[#081B33] text-white text-xs font-bold hover:bg-[#0E2749] transition-colors"
              >
                بحث
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* 3. MOBILE MENU DRAWER (Light, Sleek, Ultra-Modern) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            
            <div>
              {/* Header with Logo and Close */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <BrandLogo variant="horizontal" theme="light" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Service Areas Pill */}
              <div className="my-4 p-3 rounded-2xl bg-[#F8F7F4] border border-slate-200/80 flex items-center gap-2 text-xs font-bold text-slate-700">
                <MapPin className="w-4 h-4 text-[#D4A63D] shrink-0" />
                <span>الدمام • الخبر • القطيف</span>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1.5 py-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  if (link.hasDropdown) {
                    return (
                      <div key={link.href} className="space-y-1">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50"
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              mobileServicesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {mobileServicesOpen && (
                          <div className="pr-4 space-y-1 pb-1">
                            {servicesSublinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block p-2 text-xs font-semibold text-slate-600 hover:text-[#A87818]"
                              >
                                • {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block p-3 rounded-xl text-sm font-bold transition-colors ${
                        isActive
                          ? 'bg-amber-50 text-[#A87818] font-black'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link
                href="/quotation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] text-[#081B33] font-black text-sm text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>اطلب عرض سعر الآن</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:0561095508"
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <ModernPhoneIcon className="w-3.5 h-3.5 text-[#D4A63D]" />
                  <span>اتصال</span>
                </a>
                <a
                  href="https://wa.me/966561095508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <ModernWhatsAppIcon className="w-3.5 h-3.5" />
                  <span>واتساب</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
