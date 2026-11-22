'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/common/BrandLogo';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  Package,
  BookOpen,
  Settings,
  ShoppingBag,
  Tags,
  Wrench,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  SearchCheck,
  Star,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(pathname !== '/admin/login');

  React.useEffect(() => {
    if (pathname === '/admin/login') {
      setCheckingAuth(false);
      return;
    }
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          router.replace('/admin/login');
        } else {
          setCheckingAuth(false);
        }
      })
      .catch(() => {
        router.replace('/admin/login');
      });
  }, [pathname, router]);

  // If on login page, render without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center font-madani">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#C5A059] text-sm font-bold tracking-wider">جاري التحقق من الصلاحيات...</span>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { href: '/admin', label: 'الرئيسية والإحصائيات', icon: LayoutDashboard },
    { href: '/admin/quotations', label: 'طلبات عروض الأسعار', icon: FileText },
    { href: '/admin/products', label: 'عروض وباقات دهانات جوتن', icon: ShoppingBag },
    { href: '/admin/categories', label: 'تصنيفات العروض', icon: Tags },
    { href: '/admin/services', label: 'إدارة خدماتنا', icon: Wrench },
    { href: '/admin/projects', label: 'معرض أعمالنا ومشاريعنا', icon: Briefcase },
    { href: '/admin/reviews', label: 'آراء وتقييمات العملاء', icon: Star },
    { href: '/admin/blog', label: 'المدونة ونصائح الدهانات', icon: BookOpen },
    { href: '/admin/media', label: 'مكتبة الوسائط والصور', icon: ImageIcon },
    { href: '/admin/seo', label: 'تحسين محركات البحث SEO', icon: SearchCheck },
    { href: '/admin/content', label: 'التحكم الشامل بكامل الموقع', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col md:flex-row font-madani">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#1B1B1B] p-4 border-b border-[#C5A059]/30 flex items-center justify-between">
        <BrandLogo variant="horizontal" theme="gold" height={42} />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Admin Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 right-0 z-40 w-64 bg-[#181818] border-l border-[#C5A059]/20 flex flex-col justify-between p-4 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo Area */}
          <div className="p-3 border-b border-gray-800 text-center">
            <BrandLogo variant="horizontal" theme="gold" height={52} className="mx-auto" />
            <div className="mt-2 text-[11px] font-semibold text-[#D8B369] bg-[#222222] py-1 px-2.5 rounded-full inline-block border border-[#C5A059]/30">
              نظام إدارة المحتوى CMS
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#D8B369] text-black shadow-lg shadow-[#C5A059]/20'
                      : 'text-gray-300 hover:bg-[#222222] hover:text-[#C5A059]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#C5A059]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#C5A059]" />
            <span>معاينة الموقع المباشر</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 bg-[#141414] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

