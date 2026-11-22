'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Lock, Mail, AlertCircle, ArrowLeft, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#11100F] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-madani">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#181716]/95 backdrop-blur-2xl rounded-3xl border border-[#C5A059]/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-8 sm:p-10 space-y-7">
          {/* Official Company Logo */}
          <div className="text-center space-y-3">
            <BrandLogo variant="horizontal" theme="gold" height={60} className="mx-auto" />
            <div className="pt-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                لوحة التحكم الإدارية
              </h1>
              <p className="text-xs text-[#8C8377] mt-1 leading-relaxed">
                القصر الذهبي للدهانات والديكورات الحديثة • تسجيل دخول المشرفين
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-700/60 text-red-200 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                البريد الإلكتروني / اسم الدخول
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute top-3.5 right-3.5" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-[#222120] border border-gray-700/80 text-white text-sm focus:border-[#C5A059] focus:outline-none transition-colors shadow-inner"
                  placeholder="name@domain.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute top-3.5 right-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-11 py-3 rounded-xl bg-[#222120] border border-gray-700/80 text-white text-sm focus:border-[#C5A059] focus:outline-none transition-colors shadow-inner font-mono"
                  placeholder="••••••••"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 left-3 text-gray-400 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-gray-800 border-gray-700 text-[#C5A059] focus:ring-0"
                />
                <span>تذكر بيانات الدخول</span>
              </label>

              <span className="text-[11px] text-[#C5A059] font-medium">جلسة مشفرة وآمنة</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#E8CD8C] to-[#C5A059] hover:from-[#E8CD8C] hover:to-[#D8B369] text-black font-bold text-sm shadow-[0_4px_18px_rgba(197,160,89,0.35)] transition-all duration-300 transform active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>{loading ? 'جاري التحقق والدخول...' : 'دخول إلى لوحة التحكم'}</span>
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-[#C5A059]/40 text-xs flex items-center justify-between gap-2">
            <div className="text-right">
              <span className="block text-[#E8CD8C] font-bold">بيانات المشرف الافتراضية:</span>
              <span className="block text-gray-300 font-mono text-[11px]">admin@alqasraldhahabi.com</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@alqasraldhahabi.com');
                setPassword('admin123456');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-[11px] transition-all shadow-sm shrink-0"
            >
              تعبئة تلقائية
            </button>
          </div>

          {/* Security Notice */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-gray-400 text-center flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>منطقة آمنة ومخصصة للإدارة فقط • الاتصال مشفر بالكامل</span>
          </div>

          <div className="pt-2 border-t border-gray-800 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>العودة إلى الموقع الرئيسي</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
