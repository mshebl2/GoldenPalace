'use client';

import React, { useState, useEffect } from 'react';
import { ISiteSettings } from '@/lib/models';
import {
  Settings,
  Save,
  CheckCircle,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Lock,
  User,
  Sliders,
  Image as ImageIcon,
  KeyRound,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  FileText,
  Share2,
  Palette,
  MessageCircle,
  Clock,
  ThumbsUp,
  Flame,
  Check,
} from 'lucide-react';
import { ImageUpload } from '@/components/common/ImageUpload';

type ContentTab = 'identity' | 'hero' | 'offers' | 'whyus' | 'about' | 'quotestrip' | 'security';

export default function AdminMasterContentPage() {
  const [activeTab, setActiveTab] = useState<ContentTab>('identity');
  const [settings, setSettings] = useState<ISiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Admin Account & Security State
  const [adminUser, setAdminUser] = useState({ name: '', email: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingAccount, setSavingAccount] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState('');
  const [accountError, setAccountError] = useState('');

  // Fetch all site content settings & admin user profile
  useEffect(() => {
    async function loadData() {
      try {
        const [contentRes, userRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/auth/me'),
        ]);

        if (contentRes.ok) {
          const data = await contentRes.json();
          if (data.settings) setSettings(data.settings);
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData.user) {
            setAdminUser({
              name: userData.user.name || '',
              email: userData.user.email || '',
            });
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
        setErrorMessage('تعذر تحميل الإعدادات من الخادم');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update a single setting field in state
  const handleChange = (field: keyof ISiteSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
    setSettingsSuccess(false);
  };

  // Save all site settings
  const handleSaveSettings = async () => {
    if (!settings) return;
    setSavingSettings(true);
    setSettingsSuccess(false);
    setErrorMessage('');

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error('فشل حفظ الإعدادات');
      }

      const result = await res.json();
      if (result.settings) {
        setSettings(result.settings);
      }
      setSettingsSuccess(true);
      setTimeout(() => setSettingsSuccess(false), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الحفظ');
    } finally {
      setSavingSettings(false);
    }
  };

  // Save admin user security credentials
  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccountSuccess('');
    setAccountError('');

    if (newPassword && newPassword !== confirmPassword) {
      setAccountError('كلمة المرور الجديدة وتأكيدها غير متطابقين');
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setAccountError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }

    if (newPassword && !currentPassword) {
      setAccountError('يجب إدخال كلمة المرور الحالية لتغيير كلمة المرور');
      return;
    }

    setSavingAccount(true);

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: adminUser.name,
          email: adminUser.email,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل تحديث بيانات الحساب');
      }

      setAccountSuccess('تم تحديث بيانات الحساب وكلمة المرور بنجاح');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setAccountSuccess(''), 5000);
    } catch (err: any) {
      setAccountError(err.message || 'حدث خطأ أثناء تحديث بيانات الحساب');
    } finally {
      setSavingAccount(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-[500px] flex items-center justify-center font-madani">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#C5A059] text-sm font-bold">جاري تحميل لوحة التحكم الشاملة...</span>
        </div>
      </div>
    );
  }

  const tabsConfig: Array<{ id: ContentTab; label: string; icon: React.ElementType }> = [
    { id: 'identity', label: 'الهوية والشعار والاتصال', icon: ShieldCheck },
    { id: 'hero', label: 'الواجهة الرئيسية والهيرو', icon: Palette },
    { id: 'offers', label: 'عروض وباقات جوتن', icon: Award },
    { id: 'whyus', label: 'لماذا القصر الذهبي؟', icon: ThumbsUp },
    { id: 'about', label: 'من نحن وقصة نجاحنا', icon: FileText },
    { id: 'quotestrip', label: 'شريط طلب السعر السريع', icon: MessageCircle },
    { id: 'security', label: 'أمان وحساب المشرف', icon: Lock },
  ];

  return (
    <div className="space-y-8 font-madani pb-20">
      
      {/* Top Header & Save Button Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                التحكم الشامل بكامل محتوى الموقع
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                تحكم في كل نص، شارة، زر، صورة، ورقم هاتف يظهر للزوار على الموقع مباشرة
              </p>
            </div>
          </div>
        </div>

        {activeTab !== 'security' && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveSettings}
              disabled={savingSettings}
              className="px-6 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-xs transition-all shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingSettings ? 'جاري الحفظ...' : 'حفظ ونشر التعديلات فوراً'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Global Success / Error Alerts */}
      {settingsSuccess && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>تم حفظ كافة التغييرات بنجاح وتحديث الموقع المباشر فوراً!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Tab Navigation Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-800">
        {tabsConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'bg-[#1B1B1B] text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: IDENTITY, LOGO, CONTACT, SOCIAL MEDIA                             */}
      {/* ========================================================================= */}
      {activeTab === 'identity' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Logo Management */}
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <Sliders className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">إدارة شعار الموقع (Logo)</h2>
                <p className="text-xs text-gray-400">تغيير صورة الشعار والتحكم في حجم الارتفاع في الشريط العلوي</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <ImageUpload
                  label="رفع شعار جديد (PNG بخلفية شفافة)"
                  value={settings.logoUrl || '/images/brand/golden-palace-logo.png'}
                  onChange={(url) => handleChange('logoUrl', url)}
                  aspectRatio="auto"
                />

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-gray-300 font-semibold">
                    <span>ارتفاع الشعار (Header Logo Height):</span>
                    <span className="text-[#C5A059] font-mono font-bold">{settings.logoHeight || 52} بكسل</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    step="2"
                    value={settings.logoHeight || 52}
                    onChange={(e) => handleChange('logoHeight', parseInt(e.target.value, 10))}
                    className="w-full accent-[#C5A059] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>صغير (30px)</span>
                    <span>افتراضي متناسق (52px)</span>
                    <span>كبير وبارز (90px)</span>
                  </div>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="bg-[#0F172A] p-6 rounded-2xl border border-gray-700/60 flex flex-col items-center justify-center min-h-[220px] text-center">
                <span className="text-[11px] text-gray-400 mb-4 block">معاينة حية لظهور الشعار في رأس الموقع:</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.logoUrl || '/images/brand/golden-palace-logo.png'}
                  alt="معاينة الشعار"
                  style={{ height: `${settings.logoHeight || 52}px`, width: 'auto' }}
                  className="object-contain filter drop-shadow-md transition-all"
                />
                <span className="text-[10px] text-gray-500 mt-4 font-mono">
                  {settings.companyNameAr}
                </span>
              </div>
            </div>
          </div>

          {/* Company Names & Official Contact Info */}
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <Phone className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">بيانات الشركة وأرقام التواصل</h2>
                <p className="text-xs text-gray-400">تظهر في الشريط العلوي، الفوتر، وأزرار الاتصال التلقائية</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">اسم المؤسسة (بالعربية):</label>
                <input
                  type="text"
                  value={settings.companyNameAr || ''}
                  onChange={(e) => handleChange('companyNameAr', e.target.value)}
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">اسم المؤسسة (بالإنجليزية):</label>
                <input
                  type="text"
                  dir="ltr"
                  value={settings.companyNameEn || ''}
                  onChange={(e) => handleChange('companyNameEn', e.target.value)}
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">رقم الجوال والاتصال المباشر:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={settings.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="0561095508"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">رقم الواتساب الرسمي (بدون مسافات):</label>
                <input
                  type="text"
                  dir="ltr"
                  value={settings.whatsapp || ''}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  placeholder="0561095508"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">البريد الإلكتروني الرسمي:</label>
                <input
                  type="email"
                  dir="ltr"
                  value={settings.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="info@alqasraldhahabi.com"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">نطاق التغطية والمدن:</label>
                <input
                  type="text"
                  value={settings.locationAr || ''}
                  onChange={(e) => handleChange('locationAr', e.target.value)}
                  placeholder="المنطقة الشرقية (الدمام - الخبر - القطيف)"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">نص الشريط الإعلاني العلوي (Top Announcement Strip):</label>
                <input
                  type="text"
                  value={settings.topAnnouncementAr || ''}
                  onChange={(e) => handleChange('topAnnouncementAr', e.target.value)}
                  placeholder="نخدم مناطق: الخبر - الدمام - القطيف | خصم 30% لفترة محدودة على دهانات الفلل والشقق"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <Share2 className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">حسابات التواصل الاجتماعي</h2>
                <p className="text-xs text-gray-400">تظهر أيقوناتها في أسفل الفوتر وأشرطة التواصل</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">رابط سناب شات (Snapchat):</label>
                <input
                  type="url"
                  dir="ltr"
                  value={settings.snapchatUrl || ''}
                  onChange={(e) => handleChange('snapchatUrl', e.target.value)}
                  placeholder="https://snapchat.com/add/..."
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">رابط تيك توك (TikTok):</label>
                <input
                  type="url"
                  dir="ltr"
                  value={settings.tiktokUrl || ''}
                  onChange={(e) => handleChange('tiktokUrl', e.target.value)}
                  placeholder="https://tiktok.com/@..."
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">رابط إنستغرام (Instagram):</label>
                <input
                  type="url"
                  dir="ltr"
                  value={settings.instagramUrl || ''}
                  onChange={(e) => handleChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">رابط منصة إكس / تويتر (X):</label>
                <input
                  type="url"
                  dir="ltr"
                  value={settings.xUrl || ''}
                  onChange={(e) => handleChange('xUrl', e.target.value)}
                  placeholder="https://x.com/..."
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HERO SECTION CONTROL                                              */}
      {/* ========================================================================= */}
      {activeTab === 'hero' && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <Palette className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">نصوص وشارات واجهة الهيرو الرئيسية</h2>
                <p className="text-xs text-gray-400">تتحكم في العناوين والخصومات والمؤشرات التي يراها العميل بمجرد فتح الموقع</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">شارة الخصم العلوية البارزة:</label>
                <input
                  type="text"
                  value={settings.heroDiscountBadgeAr || ''}
                  onChange={(e) => handleChange('heroDiscountBadgeAr', e.target.value)}
                  placeholder="خصم 30% لفترة محدودة على دهانات الفلل والشقق"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">شارة الضمان والاعتماد:</label>
                <input
                  type="text"
                  value={settings.heroGuaranteeBadgeAr || ''}
                  onChange={(e) => handleChange('heroGuaranteeBadgeAr', e.target.value)}
                  placeholder="ضمان 10 سنوات معتمد"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">العنوان الرئيسي — السطر الأول (داكن):</label>
                <input
                  type="text"
                  value={settings.heroHeadlineLine1Ar || ''}
                  onChange={(e) => handleChange('heroHeadlineLine1Ar', e.target.value)}
                  placeholder="أرقى أعمال الدهانات"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">العنوان الرئيسي — السطر الذهبي البارز:</label>
                <input
                  type="text"
                  value={settings.heroHeadlineLine2Ar || ''}
                  onChange={(e) => handleChange('heroHeadlineLine2Ar', e.target.value)}
                  placeholder="والديكورات الحديثة"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">الوصف التوضيحي للهيرو (Hero Subtitle):</label>
                <textarea
                  rows={3}
                  value={settings.heroSubtextAr || ''}
                  onChange={(e) => handleChange('heroSubtextAr', e.target.value)}
                  placeholder="حلول متكاملة في أعمال الدهانات الداخلية والخارجية..."
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl p-4 text-white focus:border-[#C5A059] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">مؤشر الجاهزية والتوفر الفوري (Live Status Indicator):</label>
                <input
                  type="text"
                  value={settings.heroLiveStatusAr || ''}
                  onChange={(e) => handleChange('heroLiveStatusAr', e.target.value)}
                  placeholder="فنيون وصباغون متاحون للمعاينة الفورية اليوم بالخبر والدمام والقطيف"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">نص زر الواتساب الرئيسي في الهيرو:</label>
                <input
                  type="text"
                  value={settings.heroCtaWhatsappTextAr || ''}
                  onChange={(e) => handleChange('heroCtaWhatsappTextAr', e.target.value)}
                  placeholder="احجز معاينة مجانية عبر واتساب"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">نص زر الاتصال الهاتفي في الهيرو:</label>
                <input
                  type="text"
                  value={settings.heroCtaCallTextAr || ''}
                  onChange={(e) => handleChange('heroCtaCallTextAr', e.target.value)}
                  placeholder="اتصل الآن: 0561095508"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3 Proof Cards under Hero */}
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <CheckCircle className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">بطاقات الثقة والضمان الثلاثة أسفل أزرار الهيرو</h2>
                <p className="text-xs text-gray-400">تظهر في أسفل الهيرو لزيادة طمأنينة العميل وتشجيعه على الطلب</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Card 1 */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 space-y-3">
                <span className="text-[#C5A059] font-bold block">البطاقة الأولى (الأصالة):</span>
                <input
                  type="text"
                  value={settings.heroProof1Title || ''}
                  onChange={(e) => handleChange('heroProof1Title', e.target.value)}
                  placeholder="خامات أصلية 100%"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-lg px-3 py-2 text-white font-bold"
                />
                <input
                  type="text"
                  value={settings.heroProof1Desc || ''}
                  onChange={(e) => handleChange('heroProof1Desc', e.target.value)}
                  placeholder="جوتن والجزيرة معتمدة"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-lg px-3 py-2 text-gray-300"
                />
              </div>

              {/* Card 2 */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 space-y-3">
                <span className="text-[#C5A059] font-bold block">البطاقة الثانية (الالتزام والنظافة):</span>
                <input
                  type="text"
                  value={settings.heroProof2Title || ''}
                  onChange={(e) => handleChange('heroProof2Title', e.target.value)}
                  placeholder="دقة والتزام بالمواعيد"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-lg px-3 py-2 text-white font-bold"
                />
                <input
                  type="text"
                  value={settings.heroProof2Desc || ''}
                  onChange={(e) => handleChange('heroProof2Desc', e.target.value)}
                  placeholder="تشطيب فندقي نظيف"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-lg px-3 py-2 text-gray-300"
                />
              </div>

              {/* Card 3 */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 space-y-3">
                <span className="text-[#C5A059] font-bold block">البطاقة الثالثة (الخصم والسعر):</span>
                <input
                  type="text"
                  value={settings.heroProof3Title || ''}
                  onChange={(e) => handleChange('heroProof3Title', e.target.value)}
                  placeholder="أفضل سعر بالمنطقة"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-lg px-3 py-2 text-white font-bold"
                />
                <input
                  type="text"
                  value={settings.heroProof3Desc || ''}
                  onChange={(e) => handleChange('heroProof3Desc', e.target.value)}
                  placeholder="خصم 30% ومعاينة مجانية"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-lg px-3 py-2 text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Hero Main Image */}
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <ImageIcon className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">صورة الهيرو المعمارية الفاخرة (Hero Image)</h2>
                <p className="text-xs text-gray-400">تظهر في الجانب الأيسر للهيرو بإطار فخم منحني</p>
              </div>
            </div>

            <div className="max-w-md">
              <ImageUpload
                label="تغيير صورة الهيرو الرئيسية"
                value={settings.heroMainImage || '/images/hero/hero-living-room.webp'}
                onChange={(url) => handleChange('heroMainImage', url)}
                aspectRatio="video"
              />
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OFFERS & JOTUN PACKAGES SECTION                                   */}
      {/* ========================================================================= */}
      {activeTab === 'offers' && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <Award className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">إعدادات قسم عروض وباقات جوتن</h2>
                <p className="text-xs text-gray-400">تعديل نصوص وبنود العرض شامل التالي المطبقة على باقات الدهانات</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">عنوان قسم العروض في الرئيسية:</label>
                <input
                  type="text"
                  value={settings.offersSectionTitleAr || ''}
                  onChange={(e) => handleChange('offersSectionTitleAr', e.target.value)}
                  placeholder="عروض وباقات دهانات جوتن وديكورات الفلل"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">الوصف التوضيحي لقسم العروض:</label>
                <textarea
                  rows={2}
                  value={settings.offersSectionSubtextAr || ''}
                  onChange={(e) => handleChange('offersSectionSubtextAr', e.target.value)}
                  placeholder="باقات متكاملة تبدأ من 500 ريال للغرفة شاملة المعجون والأساس..."
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl p-4 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">بند العرض الشامل 1 (الخامات والضمان):</label>
                <input
                  type="text"
                  value={settings.offersChecklist1Ar || ''}
                  onChange={(e) => handleChange('offersChecklist1Ar', e.target.value)}
                  placeholder="دهانات جوتن أصلية 100% مع ضمان رسمي معتمد"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">بند العرض الشامل 2 (التأسيس والسنفرة):</label>
                <input
                  type="text"
                  value={settings.offersChecklist2Ar || ''}
                  onChange={(e) => handleChange('offersChecklist2Ar', e.target.value)}
                  placeholder="معالجة الشقوق وسنفرة وتأسيس كامل بالمعجون الفاخر"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">بند العرض الشامل 3 (نظافة وحماية المفروشات):</label>
                <input
                  type="text"
                  value={settings.offersChecklist3Ar || ''}
                  onChange={(e) => handleChange('offersChecklist3Ar', e.target.value)}
                  placeholder="نظافة تامة للمكان وحماية المفروشات والأرضيات"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">بند العرض الشامل 4 (المعاينة والألوان المجانية):</label>
                <input
                  type="text"
                  value={settings.offersChecklist4Ar || ''}
                  onChange={(e) => handleChange('offersChecklist4Ar', e.target.value)}
                  placeholder="معاينة موقع واختيار عينات الألوان مجاناً بالمنزل"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 text-xs text-gray-400">
              <span className="text-[#C5A059] font-bold block mb-1">ملاحظة لإدارة أسعار وصور الباقات الفردية:</span>
              يمكنك تعديل كل باقة على حدة (مثل: عرض 3 غرف بـ 1000 ريال، عرض غرفتين، السقف، الأبواب، ديكورات بديل الرخام) من صفحة <span className="text-white underline">عروض وباقات دهانات جوتن</span> في القائمة الجانبية.
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: WHY US PILLARS SECTION                                            */}
      {/* ========================================================================= */}
      {activeTab === 'whyus' && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <ThumbsUp className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">إعدادات قسم لماذا القصر الذهبي؟</h2>
                <p className="text-xs text-gray-400">تعديل ركائز التميز الخمس التي تبرز مميزاتنا التنافسية أمام العميل</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">عنوان القسم الرئيسي:</label>
                <input
                  type="text"
                  value={settings.whyUsSectionTitleAr || ''}
                  onChange={(e) => handleChange('whyUsSectionTitleAr', e.target.value)}
                  placeholder="لماذا يختارنا أصحاب المنازل والفلل بالشرقية؟"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">الوصف التوضيحي للقسم:</label>
                <input
                  type="text"
                  value={settings.whyUsSectionSubtextAr || ''}
                  onChange={(e) => handleChange('whyUsSectionSubtextAr', e.target.value)}
                  placeholder="نلتزم بأعلى معايير الحرفية والسرعة والنظافة..."
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            {/* The 5 Pillars Form */}
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <span className="text-sm font-bold text-[#C5A059] block">الركائز الخمس:</span>

              {/* Pillar 1 */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 space-y-3">
                <span className="text-xs font-bold text-gray-300">الركيزة 1 (خامات أصلية 100%):</span>
                <input
                  type="text"
                  value={settings.whyUsPillar1Title || ''}
                  onChange={(e) => handleChange('whyUsPillar1Title', e.target.value)}
                  placeholder="خامات جوتن والجزيرة الأصلية 100%"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl px-3 py-2 text-white font-bold text-xs"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsPillar1Desc || ''}
                  onChange={(e) => handleChange('whyUsPillar1Desc', e.target.value)}
                  placeholder="نعتمد دهانات أصلية ومقاومة للرطوبة وتغيرات الطقس بالشرقية..."
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl p-3 text-gray-300 text-xs"
                />
              </div>

              {/* Pillar 2 */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 space-y-3">
                <span className="text-xs font-bold text-gray-300">الركيزة 2 (الضمان المعتمد):</span>
                <input
                  type="text"
                  value={settings.whyUsPillar2Title || ''}
                  onChange={(e) => handleChange('whyUsPillar2Title', e.target.value)}
                  placeholder="ضمان معتمد على جودة التشطيب"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl px-3 py-2 text-white font-bold text-xs"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsPillar2Desc || ''}
                  onChange={(e) => handleChange('whyUsPillar2Desc', e.target.value)}
                  placeholder="نمنح عملاءنا ضماناً موثقاً على ثبات الألوان وعدم التقشر..."
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl p-3 text-gray-300 text-xs"
                />
              </div>

              {/* Pillar 3 */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 space-y-3">
                <span className="text-xs font-bold text-gray-300">الركيزة 3 (نظافة المكان):</span>
                <input
                  type="text"
                  value={settings.whyUsPillar3Title || ''}
                  onChange={(e) => handleChange('whyUsPillar3Title', e.target.value)}
                  placeholder="حماية تامة ونظافة فائقة"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl px-3 py-2 text-white font-bold text-xs"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsPillar3Desc || ''}
                  onChange={(e) => handleChange('whyUsPillar3Desc', e.target.value)}
                  placeholder="تغطية كاملة للأثاث والأرضيات ومفاتيح الكهرباء..."
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl p-3 text-gray-300 text-xs"
                />
              </div>

              {/* Pillar 4 */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 space-y-3">
                <span className="text-xs font-bold text-gray-300">الركيزة 4 (المواعيد الدقيقة):</span>
                <input
                  type="text"
                  value={settings.whyUsPillar4Title || ''}
                  onChange={(e) => handleChange('whyUsPillar4Title', e.target.value)}
                  placeholder="التزام دقيق بالمواعيد والجدول"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl px-3 py-2 text-white font-bold text-xs"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsPillar4Desc || ''}
                  onChange={(e) => handleChange('whyUsPillar4Desc', e.target.value)}
                  placeholder="ننجز أعمال الدهانات بدقة وسرعة وفق الجدول المتفق عليه..."
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl p-3 text-gray-300 text-xs"
                />
              </div>

              {/* Pillar 5 */}
              <div className="p-4 bg-[#141414] rounded-2xl border border-gray-800 space-y-3">
                <span className="text-xs font-bold text-gray-300">الركيزة 5 (السعر المنافس والخصم):</span>
                <input
                  type="text"
                  value={settings.whyUsPillar5Title || ''}
                  onChange={(e) => handleChange('whyUsPillar5Title', e.target.value)}
                  placeholder="أفضل سعر وتوفير حقيقي 30%"
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl px-3 py-2 text-white font-bold text-xs"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsPillar5Desc || ''}
                  onChange={(e) => handleChange('whyUsPillar5Desc', e.target.value)}
                  placeholder="أسعار تنافسية تبدأ من 500 ريال للغرفة، مع معاينة مجانية..."
                  className="w-full bg-[#1B1B1B] border border-gray-700 rounded-xl p-3 text-gray-300 text-xs"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ABOUT US & STORY SECTION                                          */}
      {/* ========================================================================= */}
      {activeTab === 'about' && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <FileText className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">إعدادات قسم من نحن وقصة نجاحنا</h2>
                <p className="text-xs text-gray-400">تعديل القصة، الرؤية، والأرقام والإحصائيات التي تعكس خبرتنا الممتدة</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">عنوان قسم من نحن في الرئيسية:</label>
                <input
                  type="text"
                  value={settings.aboutSectionTitleAr || ''}
                  onChange={(e) => handleChange('aboutSectionTitleAr', e.target.value)}
                  placeholder="قصة القصر الذهبي للدهانات والديكورات الحديثة"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">نص القصة والرؤية:</label>
                <textarea
                  rows={4}
                  value={settings.aboutStoryAr || ''}
                  onChange={(e) => handleChange('aboutStoryAr', e.target.value)}
                  placeholder="انطلقنا في المنطقة الشرقية برؤية واضحة..."
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl p-4 text-white focus:border-[#C5A059] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Stat 1 */}
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">سنوات الخبرة (مثال: +15):</label>
                <input
                  type="text"
                  value={settings.aboutYearsExperience || ''}
                  onChange={(e) => handleChange('aboutYearsExperience', e.target.value)}
                  placeholder="+15"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              {/* Stat 2 */}
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">المشاريع المنجزة (مثال: +1,200):</label>
                <input
                  type="text"
                  value={settings.aboutCompletedProjects || ''}
                  onChange={(e) => handleChange('aboutCompletedProjects', e.target.value)}
                  placeholder="+1,200"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              {/* Stat 3 */}
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">نسبة رضا العملاء (مثال: 99%):</label>
                <input
                  type="text"
                  value={settings.aboutCustomerSatisfaction || ''}
                  onChange={(e) => handleChange('aboutCustomerSatisfaction', e.target.value)}
                  placeholder="99%"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              {/* Stat 4 */}
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">الضمان المعتمد (مثال: 10 سنوات):</label>
                <input
                  type="text"
                  value={settings.aboutWarrantyYears || ''}
                  onChange={(e) => handleChange('aboutWarrantyYears', e.target.value)}
                  placeholder="10 سنوات"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            {/* About Section Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
              <ImageUpload
                label="الصورة الرئيسية لقسم من نحن"
                value={settings.aboutMainImage || '/images/hero/living-room.webp'}
                onChange={(url) => handleChange('aboutMainImage', url)}
                aspectRatio="video"
              />

              <ImageUpload
                label="الصورة الفرعية المرافقة (المشروع المنجز)"
                value={settings.aboutFloatingImage || '/images/portfolio/project-3.webp'}
                onChange={(url) => handleChange('aboutFloatingImage', url)}
                aspectRatio="video"
              />
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: QUICK QUOTE CALLOUT STRIP                                         */}
      {/* ========================================================================= */}
      {activeTab === 'quotestrip' && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <MessageCircle className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">إعدادات شريط طلب السعر السريع (Quote Strip)</h2>
                <p className="text-xs text-gray-400">الشريط التحفيزي السفلي في الصفحة الرئيسية قبل الفوتر</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">عنوان الشريط التحفيزي:</label>
                <input
                  type="text"
                  value={settings.quoteStripTitleAr || ''}
                  onChange={(e) => handleChange('quoteStripTitleAr', e.target.value)}
                  placeholder="هل ترغب في تجديد دهانات منزلك أو تشطيب فلتك بأعلى جودة؟"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">النص الفرعي للشريط:</label>
                <input
                  type="text"
                  value={settings.quoteStripSubtextAr || ''}
                  onChange={(e) => handleChange('quoteStripSubtextAr', e.target.value)}
                  placeholder="تواصل معنا الآن واحصل على معاينة مجانية وخصم حصري 30% في الخبر والدمام والقطيف"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">نص زر الواتساب في الشريط:</label>
                <input
                  type="text"
                  value={settings.quoteStripCtaWhatsappAr || ''}
                  onChange={(e) => handleChange('quoteStripCtaWhatsappAr', e.target.value)}
                  placeholder="احصل على الخصم والمعاينة عبر واتساب"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">نص زر الاتصال المباشر:</label>
                <input
                  type="text"
                  value={settings.quoteStripCtaCallAr || ''}
                  onChange={(e) => handleChange('quoteStripCtaCallAr', e.target.value)}
                  placeholder="اتصال مباشر: 0561095508"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: ADMIN SECURITY & LOGIN CREDENTIALS                                */}
      {/* ========================================================================= */}
      {activeTab === 'security' && (
        <div className="space-y-8 animate-fade-in">
          
          <form onSubmit={handleSaveAccount} className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <KeyRound className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="text-base font-bold text-white">أمان وحساب المشرف</h2>
                <p className="text-xs text-gray-400">تعديل اسم المشرف، البريد الإلكتروني، وكلمة المرور الخاصة بالدخول</p>
              </div>
            </div>

            {accountSuccess && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{accountSuccess}</span>
              </div>
            )}

            {accountError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <span>{accountError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">اسم المشرف (Admin Name):</label>
                <input
                  type="text"
                  value={adminUser.name}
                  onChange={(e) => setAdminUser({ ...adminUser, name: e.target.value })}
                  placeholder="المشرف العام"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">البريد الإلكتروني للدخول (Admin Email):</label>
                <input
                  type="email"
                  dir="ltr"
                  value={adminUser.email}
                  onChange={(e) => setAdminUser({ ...adminUser, email: e.target.value })}
                  placeholder="admin@alqasraldhahabi.com"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2 md:col-span-2 pt-4 border-t border-gray-800">
                <span className="text-xs font-bold text-[#C5A059] block">تغيير كلمة المرور (اختياري - اتركه فارغاً إذا كنت لا ترغب بتغييرها):</span>
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">كلمة المرور الحالية (مطلوبة فقط عند التغيير):</label>
                <input
                  type="password"
                  dir="ltr"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">كلمة المرور الجديدة (8 أحرف على الأقل):</label>
                <input
                  type="password"
                  dir="ltr"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 font-semibold block">تأكيد كلمة المرور الجديدة:</label>
                <input
                  type="password"
                  dir="ltr"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none text-left"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={savingAccount}
                className="px-6 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D8B369] text-black font-bold text-xs transition-all shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{savingAccount ? 'جاري التحديث...' : 'حفظ بيانات الحساب والأمان'}</span>
              </button>
            </div>
          </form>

        </div>
      )}

    </div>
  );
}
