'use client';

import React, { useState } from 'react';
import { Upload, Copy, Check, Image as ImageIcon, Trash2 } from 'lucide-react';

const initialMedia = [
  { name: 'logo-horizontal-gold.png', url: '/brand/logos/logo-horizontal-gold.png', cat: 'brand' },
  { name: 'logo-horizontal-white.png', url: '/brand/logos/logo-horizontal-white.png', cat: 'brand' },
  { name: 'logo-vertical-gold.png', url: '/brand/logos/logo-vertical-gold.png', cat: 'brand' },
  { name: 'hero-villa.jpg', url: '/images/hero-villa.jpg', cat: 'general' },
  { name: 'about-stone.jpg', url: '/images/about-stone.jpg', cat: 'general' },
  { name: 'stone-facades.jpg', url: '/images/services/stone-facades.jpg', cat: 'services' },
  { name: 'architectural-plans.jpg', url: '/images/services/architectural-plans.jpg', cat: 'services' },
  { name: 'structural-studies.jpg', url: '/images/services/structural-studies.jpg', cat: 'services' },
  { name: 'interior-design.jpg', url: '/images/services/interior-design.jpg', cat: 'services' },
  { name: 'surveying-works.jpg', url: '/images/services/surveying-works.jpg', cat: 'services' },
  { name: 'qairawan-villa.jpg', url: '/images/projects/qairawan-villa.jpg', cat: 'projects' },
  { name: 'hittin-palace.jpg', url: '/images/projects/hittin-palace.jpg', cat: 'projects' },
  { name: 'malqa-complex.jpg', url: '/images/projects/malqa-complex.jpg', cat: 'projects' },
  { name: 'elegant-tower.jpg', url: '/images/projects/elegant-tower.jpg', cat: 'projects' },
  { name: 'riyadh-white.jpg', url: '/images/materials/riyadh-white.jpg', cat: 'materials' },
  { name: 'riyadh-yellow.jpg', url: '/images/materials/riyadh-yellow.jpg', cat: 'materials' },
  { name: 'travertine.jpg', url: '/images/materials/travertine.jpg', cat: 'materials' },
  { name: 'facades-guide.jpg', url: '/images/blog/facades-guide.jpg', cat: 'blog' },
  { name: 'interior-trends.jpg', url: '/images/blog/interior-trends.jpg', cat: 'blog' },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState(initialMedia);
  const [filter, setFilter] = useState('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setMediaList([
          { name: data.filename, url: data.url, cat: 'uploads' },
          ...mediaList,
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const filtered = mediaList.filter((m) => filter === 'all' || m.cat === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">مكتبة الوسائط والملفات</h1>
          <p className="text-xs text-gray-400 mt-1">
            رفع وإدارة الصور المعمارية، الشعارات، والمخططات واستخدام روابطها في الموقع
          </p>
        </div>

        <label className="px-4 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'جاري الرفع...' : 'رفع صورة جديدة'}</span>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'brand', label: 'الشعارات والهوية' },
          { id: 'services', label: 'منتجاتنا' },
          { id: 'projects', label: 'أعمالنا' },
          { id: 'materials', label: 'الرخام والجرانيت' },
          { id: 'blog', label: 'المدونة' },
          { id: 'uploads', label: 'المرفوعات الحديثة' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filter === tab.id
                ? 'bg-[#C5A059] text-black'
                : 'bg-[#1B1B1B] text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="group bg-[#1B1B1B] rounded-2xl border border-gray-800 overflow-hidden shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-32 bg-black overflow-hidden flex items-center justify-center p-2">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-3 border-t border-gray-800/80 space-y-2">
              <p className="text-[11px] text-gray-300 font-mono truncate" title={item.name}>
                {item.name}
              </p>

              <button
                onClick={() => handleCopy(item.url)}
                className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                  copiedUrl === item.url
                    ? 'bg-green-600 text-white'
                    : 'bg-[#242424] text-gray-300 hover:bg-[#C5A059] hover:text-black'
                }`}
              >
                {copiedUrl === item.url ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>نسخ الرابط</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

