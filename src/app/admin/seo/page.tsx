'use client';

import React, { useState, useEffect } from 'react';
import { ISEOSettings } from '@/lib/models';
import { ImageUpload } from '@/components/common/ImageUpload';
import {
  SearchCheck,
  Globe,
  Share2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  X,
  Smartphone,
  Monitor,
  Award,
  MapPin,
  FileCode,
  Save,
  Check,
  TrendingUp,
  Tag,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';

export default function AdminSEOPage() {
  const [seo, setSeo] = useState<ISEOSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'meta' | 'keywords' | 'social' | 'local' | 'tools'>('meta');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [newKeyword, setNewKeyword] = useState('');

  // Suggested high-intent keywords for marble business in Riyadh
  const suggestedKeywords = [
    'طاولات رخام طبيعي بالرياض',
    'تفصيل مغاسل رخام فندقية',
    'طاولات طعام رخام ملكية',
    'رخام كلكتا إيطالي',
    'واجهات حجر ميكانيكي بالرياض',
    'جرانيت طبيعي للمطابخ',
    'كونسول رخام مودرن',
    'قص رخام بالووترجيت CNC',
    'أطقم طاولات مجالس رخام',
    'جلي وتلميع الرخام الإيطالي',
    'مغاسل رخام حوضين',
    'تفصيل رخام حسب الطلب الرياض',
  ];

  const fetchSEO = async () => {
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      if (data.seo) setSeo(data.seo);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSEO();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!seo) return;

    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seo),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const addKeyword = (kw: string) => {
    if (!seo) return;
    const clean = kw.trim();
    if (!clean) return;
    if (seo.keywords.includes(clean)) return;

    setSeo({
      ...seo,
      keywords: [...seo.keywords, clean],
    });
    setNewKeyword('');
  };

  const removeKeyword = (kw: string) => {
    if (!seo) return;
    setSeo({
      ...seo,
      keywords: seo.keywords.filter((k) => k !== kw),
    });
  };

  if (loading || !seo) {
    return (
      <div className="py-24 text-center text-gray-400">
        <div className="inline-block w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm">جاري تحميل إعدادات تحسين محركات البحث SEO...</p>
      </div>
    );
  }

  // Calculate Title and Description health
  const titleLen = (seo.metaTitleAr || '').length;
  const descLen = (seo.metaDescriptionAr || '').length;
  const isTitleGood = titleLen >= 45 && titleLen <= 70;
  const isDescGood = descLen >= 120 && descLen <= 170;

  // Calculate SEO Health Score
  let score = 50;
  if (isTitleGood) score += 12;
  if (isDescGood) score += 12;
  if (seo.keywords.length >= 6) score += 10;
  if (seo.ogImage) score += 8;
  if (seo.robotsIndexing) score += 4;
  if (seo.canonicalUrl) score += 4;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#202020] border border-[#C5A059]/40 text-[#D8B369] text-xs font-semibold mb-2">
            <SearchCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>نظام ضبط وتحسين محركات البحث المتقدم</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span>تحسين محركات البحث (SEO Suite)</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
            تحكم كامل في وسوم الميتا لنتائج قوقل، والكلمات الدلالية للرياض، وصور المشاركة في واتساب، وملفات الفهرسة الفورية.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {savedSuccess && (
            <span className="text-xs font-bold text-green-400 flex items-center gap-1.5 bg-green-500/10 px-3 py-2 rounded-xl border border-green-500/20">
              <Check className="w-4 h-4" />
              <span>تم حفظ إعدادات الـ SEO بنجاح!</span>
            </span>
          )}

          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D8B369] hover:from-[#d8b369] hover:to-[#e2c17d] text-black font-bold text-xs transition-all shadow-lg shadow-[#C5A059]/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
          </button>
        </div>
      </div>

      {/* SEO Health Score & Audit Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400">مؤشر جودة الـ SEO الإجمالي</span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
              جاهز لتصدر نتائج قوقل
            </span>
          </div>

          <div className="flex items-center gap-5 my-2">
            <div className="relative w-20 h-20 rounded-full bg-black/60 border-4 border-[#C5A059] flex items-center justify-center shrink-0 shadow-lg shadow-[#C5A059]/10">
              <span className="text-2xl font-black text-white font-mono">{score}%</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">التهيئة ممتازة</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                موقعك مهيأ تقنياً بالكامل ويدعم البيانات المنظمة (Schema.org) للأنشطة التجارية في الرياض.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
            <span>الفهرسة: {seo.robotsIndexing ? 'مفعلة (Index, Follow)' : 'معطلة'}</span>
            <span>الكلمات النشطة: {seo.keywords.length} كلمة</span>
          </div>
        </div>

        {/* Live Audit Quick Checks */}
        <div className="lg:col-span-2 bg-[#181818] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>فحص سلامة معايير محركات البحث الرئيسية</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
              isTitleGood ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'
            }`}>
              {isTitleGood ? (
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              )}
              <div>
                <strong className="block text-white">طول عنوان قوقل ({titleLen} حرف)</strong>
                <span className="text-gray-400 text-[11px]">
                  {isTitleGood ? 'طول ممتاز يمنع اقتطاع العنوان في نتائج البحث.' : 'المثالي بين 50 إلى 70 حرفاً.'}
                </span>
              </div>
            </div>

            <div className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
              isDescGood ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'
            }`}>
              {isDescGood ? (
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              )}
              <div>
                <strong className="block text-white">طول وصف الميتا ({descLen} حرف)</strong>
                <span className="text-gray-400 text-[11px]">
                  {isDescGood ? 'وصف احترافي يشجع الزائر على النقر.' : 'المثالي بين 130 إلى 160 حرفاً.'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl border bg-green-500/5 border-green-500/20 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">خريطة الموقع التلقائية (Sitemap.xml)</strong>
                <span className="text-gray-400 text-[11px]">
                  مربوطة ديناميكياً مع المنتجات والخدمات والمقالات.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl border bg-green-500/5 border-green-500/20 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Schema.org LocalBusiness</strong>
                <span className="text-gray-400 text-[11px]">
                  معلومات الشركة بالرياض مدمجة لتعزيز الظهور في Google Maps.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Live SERP Simulator */}
      <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800/80 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#C5A059]" />
              <span>محاكي نتائج قوقل المباشر (Google SERP Preview)</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              هكذا يظهر موقعك بالضبط للعملاء والباحثين في محرك بحث Google عند كتابة كلماتك المفتاحية
            </p>
          </div>

          <div className="inline-flex rounded-xl bg-[#222222] p-1 border border-gray-700">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                previewDevice === 'desktop'
                  ? 'bg-[#C5A059] text-black shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>كمبيوتر</span>
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                previewDevice === 'mobile'
                  ? 'bg-[#C5A059] text-black shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>جوال</span>
            </button>
          </div>
        </div>

        {/* Google Card Simulation */}
        <div className="bg-[#202124] rounded-2xl p-5 border border-gray-700/80 font-sans max-w-3xl text-right" dir="rtl">
          {/* URL & Favicon */}
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shrink-0">
              <img src="/brand/logos/logo-emblem-gold.png" alt="Favicon" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#dadce0] font-medium leading-none">
                {seo.businessNameAr || 'القصر الذهبي للدهانات والديكورات الحديثة'}
              </span>
              <span className="text-[11px] text-[#bdc1c6] font-mono leading-tight" dir="ltr">
                {seo.canonicalUrl || 'https://www.eleganteast.com'}
              </span>
            </div>
          </div>

          {/* Clickable Title in Google Blue */}
          <h4 className="text-lg sm:text-xl font-medium text-[#8ab4f8] hover:underline cursor-pointer mb-1 leading-snug">
            {seo.metaTitleAr || 'القصر الذهبي للدهانات والديكورات الحديثة | استوديو وتفصيل الرخام والجرانيت بالرياض'}
          </h4>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#bdc1c6] leading-relaxed line-clamp-2">
            {seo.metaDescriptionAr ||
              'استوديو ومصنع تفصيل وتوريد الرخام الطبيعي والجرانيت بالرياض: طاولات طعام ملكية، أطقم مجالس، مكاتب، مغاسل منحوتة، وتشطيبات معمارية فندقية بأعلى دقة حرفية.'}
          </p>

          {/* Google Sitelinks */}
          <div className="mt-4 pt-3 border-t border-gray-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2 rounded-lg bg-[#292a2d] hover:bg-[#333438] cursor-pointer">
              <span className="text-[#8ab4f8] font-bold block">منتجاتنا</span>
              <span className="text-[10px] text-gray-400">طاولات ومغاسل حجرية</span>
            </div>
            <div className="p-2 rounded-lg bg-[#292a2d] hover:bg-[#333438] cursor-pointer">
              <span className="text-[#8ab4f8] font-bold block">خدماتنا</span>
              <span className="text-[10px] text-gray-400">قص وتركيب ميكانيكي</span>
            </div>
            <div className="p-2 rounded-lg bg-[#292a2d] hover:bg-[#333438] cursor-pointer">
              <span className="text-[#8ab4f8] font-bold block">الرخام والجرانيت</span>
              <span className="text-[10px] text-gray-400">كتالوج خامات الرخام</span>
            </div>
            <div className="p-2 rounded-lg bg-[#292a2d] hover:bg-[#333438] cursor-pointer">
              <span className="text-[#8ab4f8] font-bold block">تواصل معنا</span>
              <span className="text-[10px] text-gray-400">الرياض - طريق الخرج</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('meta')}
          className={`px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'meta'
              ? 'border-[#C5A059] text-[#C5A059]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <SearchCheck className="w-4 h-4" />
          <span>وسوم الميتا الأساسية</span>
        </button>

        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'keywords'
              ? 'border-[#C5A059] text-[#C5A059]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>الكلمات المفتاحية واقتراحات الرياض</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#D8B369] text-[10px] font-mono">
            {seo.keywords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'social'
              ? 'border-[#C5A059] text-[#C5A059]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>مشاركة واتساب وشبكات التواصل</span>
        </button>

        <button
          onClick={() => setActiveTab('local')}
          className={`px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'local'
              ? 'border-[#C5A059] text-[#C5A059]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>السيو المحلي والخرائط (Schema.org)</span>
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'tools'
              ? 'border-[#C5A059] text-[#C5A059]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>ملفات الفهرسة وأدوات مشرفي قوقل</span>
        </button>
      </div>

      {/* Tab 1: Meta Tags */}
      {activeTab === 'meta' && (
        <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>عنوان الموقع في قوقل (Meta Title - عربي)</span>
                  <span className="text-red-400">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    isTitleGood ? 'text-green-400 font-bold' : 'text-yellow-400'
                  }`}
                >
                  {titleLen} / 60 حرف (الموصى به 50 - 60)
                </span>
              </div>
              <input
                type="text"
                value={seo.metaTitleAr}
                onChange={(e) => setSeo({ ...seo, metaTitleAr: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs sm:text-sm focus:border-[#C5A059] outline-none"
                placeholder="عنوان جذاب يوضح النشاط والمدينة..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-300">
                  عنوان الموقع في قوقل (Meta Title - إنجليزي)
                </label>
                <span className="text-[11px] text-gray-400 font-mono">
                  {(seo.metaTitleEn || '').length} حرف
                </span>
              </div>
              <input
                type="text"
                value={seo.metaTitleEn}
                onChange={(e) => setSeo({ ...seo, metaTitleEn: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs sm:text-sm focus:border-[#C5A059] outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>وصف الموقع في قوقل (Meta Description - عربي)</span>
                  <span className="text-red-400">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    isDescGood ? 'text-green-400 font-bold' : 'text-yellow-400'
                  }`}
                >
                  {descLen} / 160 حرف (الموصى به 140 - 160)
                </span>
              </div>
              <textarea
                rows={3}
                value={seo.metaDescriptionAr}
                onChange={(e) => setSeo({ ...seo, metaDescriptionAr: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs sm:text-sm focus:border-[#C5A059] outline-none leading-relaxed"
                placeholder="اكتب وصفاً موجزاً يحتوي أهم الكلمات والخدمات وأرقام الاتصال..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-300">
                  وصف الموقع في قوقل (Meta Description - إنجليزي)
                </label>
              </div>
              <textarea
                rows={2}
                value={seo.metaDescriptionEn}
                onChange={(e) => setSeo({ ...seo, metaDescriptionEn: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs sm:text-sm focus:border-[#C5A059] outline-none leading-relaxed"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5">
                  النطاق الرسمي الأساسي (Canonical URL)
                </label>
                <input
                  type="url"
                  value={seo.canonicalUrl}
                  onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs font-mono focus:border-[#C5A059] outline-none"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">
                  سماحية الفهرسة والأرشفة لقوقل (Robots Indexing)
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#222222] border border-gray-700">
                  <input
                    type="checkbox"
                    id="robotsIndexing"
                    checked={seo.robotsIndexing}
                    onChange={(e) => setSeo({ ...seo, robotsIndexing: e.target.checked })}
                    className="w-4 h-4 text-[#C5A059] accent-[#C5A059] rounded"
                  />
                  <label htmlFor="robotsIndexing" className="text-xs text-gray-200 cursor-pointer">
                    السماح لبرامج زحف قوقل بفهرسة وأرشفة كافة صفحات الموقع (موصى به دائماً)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Keywords */}
      {activeTab === 'keywords' && (
        <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">الكلمات الدلالية المعتمدة (Focus Keywords)</h3>
            <p className="text-xs text-gray-400">
              الكلمات والعبارات التي يبحث بها العملاء في قوقل عند البحث عن خدمات الرخام والجرانيت في الرياض.
            </p>
          </div>

          {/* Add keyword bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="اكتب كلمة مفتاحية جديدة واضغط إضافة..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addKeyword(newKeyword);
                }
              }}
              className="flex-1 p-3.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs sm:text-sm focus:border-[#C5A059] outline-none"
            />
            <button
              type="button"
              onClick={() => addKeyword(newKeyword)}
              className="px-5 py-3.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة كلمة</span>
            </button>
          </div>

          {/* Active Keywords list */}
          <div className="p-4 rounded-2xl bg-[#202020] border border-gray-800 min-h-[100px] space-y-2">
            <span className="text-[11px] text-gray-400 block font-semibold mb-2">
              الكلمات المفتاحية النشطة حالياً بالموقع ({seo.keywords.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {seo.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-[#C5A059]/40 text-xs text-white group hover:border-red-500/50 transition-colors"
                >
                  <Tag className="w-3 h-3 text-[#C5A059]" />
                  <span>{kw}</span>
                  <button
                    type="button"
                    onClick={() => removeKeyword(kw)}
                    className="text-gray-400 hover:text-red-400 mr-1 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Bank of high-intent suggestions */}
          <div className="space-y-3 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <h4 className="text-xs font-bold text-[#D8B369]">
                بنك الكلمات المفتاحية المقترحة الأكثر بحثاً في الرياض (انقر للإضافة الفورية):
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.map((skw, i) => {
                const isAdded = seo.keywords.includes(skw);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => !isAdded && addKeyword(skw)}
                    disabled={isAdded}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                      isAdded
                        ? 'bg-gray-800/50 text-gray-500 border-gray-800 cursor-default'
                        : 'bg-[#222222] hover:bg-[#C5A059] hover:text-black text-gray-200 border-gray-700'
                    }`}
                  >
                    {isAdded ? <Check className="w-3 h-3 text-green-400" /> : <Plus className="w-3 h-3" />}
                    <span>{skw}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Social & WhatsApp OG */}
      {activeTab === 'social' && (
        <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              معاينة المشاركة في واتساب ومنصات التواصل (Open Graph)
            </h3>
            <p className="text-xs text-gray-400">
              تحديد الصورة والعناوين التي تظهر للعميل كبطاقة أنيقة عند إرسال رابط موقعك في تطبيق واتساب، تويتر، أو فيسبوك.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div>
                <ImageUpload
                  label="صورة المشاركة الرسمية (OG Image) — اختر صورة من جهازك"
                  value={seo.ogImage || '/images/factory/hero-luxury-dining.jpg'}
                  onChange={(url) => setSeo({ ...seo, ogImage: url })}
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  المقاس المثالي لصورة واتساب وقوقل هو 1200 × 630 بكسل.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">
                  عنوان المشاركة (Social Title)
                </label>
                <input
                  type="text"
                  value={seo.ogTitle}
                  onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">
                  وصف المشاركة (Social Description)
                </label>
                <textarea
                  rows={2}
                  value={seo.ogDescription}
                  onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs focus:border-[#C5A059] outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* WhatsApp Card Simulator */}
            <div className="bg-[#0b141a] rounded-2xl p-4 border border-gray-800 space-y-3 max-w-sm mx-auto w-full shadow-2xl">
              <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span className="text-xs font-bold text-gray-300">محاكي بطاقة واتساب التفاعلية</span>
              </div>

              <div className="rounded-xl overflow-hidden bg-[#1f2c34] border border-[#2a3942]">
                <div className="relative aspect-[16/9] w-full bg-black">
                  <img
                    src={seo.ogImage || '/images/factory/hero-luxury-dining.jpg'}
                    alt="WhatsApp Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-bold text-[#e9edef] line-clamp-1">{seo.ogTitle}</h4>
                  <p className="text-[11px] text-[#8696a0] line-clamp-2">{seo.ogDescription}</p>
                  <span className="text-[10px] text-[#00a884] block font-mono pt-1">eleganteast.com</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                هكذا تظهر رسالتك تماماً عند مشاركة رابط الموقع في محادثات الواتساب.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Local SEO & Schema */}
      {activeTab === 'local' && (
        <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              البيانات المنظمة لخرائط قوقل والبحث المحلي (Schema LocalBusiness)
            </h3>
            <p className="text-xs text-gray-400">
              تتيح لقوقل ربط موقعك بموقعك الفعلي على خرائط Google Maps وإظهار ساعات العمل والتقييمات للعملاء في الرياض.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white mb-1.5">اسم المنشأة التجاري (عربي)</label>
              <input
                type="text"
                value={seo.businessNameAr}
                onChange={(e) => setSeo({ ...seo, businessNameAr: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs focus:border-[#C5A059] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5">اسم المنشأة التجاري (إنجليزي)</label>
              <input
                type="text"
                value={seo.businessNameEn}
                onChange={(e) => setSeo({ ...seo, businessNameEn: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs focus:border-[#C5A059] outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5">المدينة</label>
              <input
                type="text"
                value={seo.city}
                onChange={(e) => setSeo({ ...seo, city: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs focus:border-[#C5A059] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5">العنوان الفعلي (المصنع / المعرض)</label>
              <input
                type="text"
                value={seo.streetAddress}
                onChange={(e) => setSeo({ ...seo, streetAddress: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs focus:border-[#C5A059] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5">رقم الاتصال المعتمد في قوقل</label>
              <input
                type="text"
                value={seo.phone}
                onChange={(e) => setSeo({ ...seo, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs font-mono focus:border-[#C5A059] outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5">رابط خرائط قوقل (Google Maps)</label>
              <input
                type="url"
                value={seo.googleMapsUrl}
                onChange={(e) => setSeo({ ...seo, googleMapsUrl: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs font-mono focus:border-[#C5A059] outline-none"
                dir="ltr"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <h4 className="text-xs font-bold text-[#D8B369] mb-2 flex items-center gap-1.5">
              <FileCode className="w-4 h-4" />
              <span>كود Schema.org المولد تلقائياً لصفحات الموقع (JSON-LD):</span>
            </h4>
            <pre className="p-4 rounded-2xl bg-black/70 border border-gray-800 text-[11px] font-mono text-gray-300 overflow-x-auto" dir="ltr">
{JSON.stringify(
  {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: seo.businessNameAr,
    alternateName: seo.businessNameEn,
    url: seo.canonicalUrl,
    telephone: seo.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: seo.streetAddress,
      addressLocality: seo.city,
      addressCountry: 'SA',
    },
    hasMap: seo.googleMapsUrl,
  },
  null,
  2
)}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 5: Sitemap & Webmaster Tools */}
      {activeTab === 'tools' && (
        <div className="bg-[#181818] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              ملفات الفهرسة وأدوات مشرفي قوقل (Webmaster & Sitemap)
            </h3>
            <p className="text-xs text-gray-400">
              روابط فحص خريطة الموقع التلقائية وربط أدوات التحليل Google Search Console و Google Analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#222222] border border-gray-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#C5A059]" />
                  <span>خريطة الموقع XML (Sitemap)</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400">
                  نشطة ومحدثة
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                ملف ديناميكي يجمع كافة صفحات المنتجات والخدمات والمقالات لتسهيل أرشفتها بسرعة في محرك بحث Google.
              </p>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#D8B369] hover:underline font-mono"
              >
                <span>فتح ملف /sitemap.xml</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#222222] border border-gray-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#C5A059]" />
                  <span>ملف توجيه الروبوتات (Robots.txt)</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400">
                  سليم ومؤمن
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                يسمح لقوقل بالدخول لكافة الصفحات العامة بينما يحمي مسارات الإدارة والأمان (/admin و /api).
              </p>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#D8B369] hover:underline font-mono"
              >
                <span>فتح ملف /robots.txt</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            <div>
              <label className="block text-xs font-bold text-white mb-1.5">
                كود إثبات الملكية في Google Search Console (Verification Meta Tag)
              </label>
              <input
                type="text"
                placeholder="مثال: google-site-verification=XXXXXXXXXXXXXXXXX"
                value={seo.googleSiteVerification || ''}
                onChange={(e) => setSeo({ ...seo, googleSiteVerification: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs font-mono focus:border-[#C5A059] outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5">
                معرف إحصائيات قوقل Google Analytics (GA4 Measurement ID)
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={seo.googleAnalyticsId || ''}
                onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs font-mono focus:border-[#C5A059] outline-none"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      )}

      {/* SEO Golden Tips Guide */}
      <div className="bg-gradient-to-br from-[#1E1B15] to-[#161616] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-7 space-y-4">
        <h3 className="text-sm font-bold text-[#D8B369] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#C5A059]" />
          <span>4 نصائح ذهبية ليتصدر موقع القصر الذهبي للدهانات نتائج البحث في الرياض:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1">
            <strong className="text-white block font-bold">1. التركيز على النية الشرائية (High-Intent Keywords):</strong>
            <p className="text-gray-300 leading-relaxed">
              استخدم كلمات مثل "تفصيل طاولات طعام رخام بالرياض" أو "توريد رخام فلل وقصور" في عناوين المنتجات والمقالات لأنها تجذب العملاء الجاهزين للطلب مباشرة.
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1">
            <strong className="text-white block font-bold">2. إثراء وصف المنتجات والخدمات:</strong>
            <p className="text-gray-300 leading-relaxed">
              كلما احتوت صفحة المنتج على نوع الرخام (مثل كلكتا أو ترافنتينو) والمقاسات وطريقة الصيانة، فضّلها قوقل وأظهرها في مقدمة نتائج البحث.
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1">
            <strong className="text-white block font-bold">3. التقييمات على خرائط قوقل (Google Maps):</strong>
            <p className="text-gray-300 leading-relaxed">
              اطلب من عملائك في الرياض تقييم المعرض والمصنع على خرائط قوقل؛ حيث ترتبط تلقائياً بموقعك وتعزز تصنيف السيو المحلي (Local SEO).
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1">
            <strong className="text-white block font-bold">4. سرعة التجاوب على الجوال:</strong>
            <p className="text-gray-300 leading-relaxed">
              الموقع مصمم وفق أحدث معايير Core Web Vitals وخفيف الوزن ومتجاوب مع جميع أحجام الشاشات مما يمنحه الأولوية في فهرسة قوقل للموبايل (Mobile-First Indexing).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

