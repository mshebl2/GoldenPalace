'use client';

import React, { useState, useEffect } from 'react';
import { IService } from '@/lib/models';
import { Layers, Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import { ImageUpload } from '@/components/common/ImageUpload';

export default function AdminServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);

  const [form, setForm] = useState({
    titleAr: '',
    titleEn: '',
    slug: '',
    shortDescAr: '',
    shortDescEn: '',
    descriptionAr: '',
    descriptionEn: '',
    coverImage: '/images/services/service-villas.webp',
    featuresAr: 'دهانات جوتن أصلية 100%\nمعالجة الشقوق وسنفرة وتأسيس كامل\nضمان رسمي معتمد',
    active: true,
  });

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setForm({
      titleAr: '',
      titleEn: '',
      slug: '',
      shortDescAr: '',
      shortDescEn: '',
      descriptionAr: '',
      descriptionEn: '',
      coverImage: '/images/services/stone-facades.jpg',
      featuresAr: 'تثبيت ميكانيكي معتمد\nعزل حراري متكامل\nضمان شامل',
      active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (svc: IService) => {
    setEditingService(svc);
    setForm({
      titleAr: svc.titleAr,
      titleEn: svc.titleEn,
      slug: svc.slug,
      shortDescAr: svc.shortDescAr,
      shortDescEn: svc.shortDescEn,
      descriptionAr: svc.descriptionAr,
      descriptionEn: svc.descriptionEn,
      coverImage: svc.coverImage,
      featuresAr: svc.featuresAr.join('\n'),
      active: svc.active,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const featuresList = form.featuresAr.split('\n').filter((f) => f.trim().length > 0);

    const payload = {
      ...form,
      slug,
      featuresAr: featuresList,
      featuresEn: featuresList,
      gallery: [form.coverImage],
      order: editingService ? editingService.order : services.length + 1,
    };

    if (editingService) {
      const res = await fetch(`/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchServices();
        setModalOpen(false);
      }
    } else {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchServices();
        setModalOpen(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">إدارة خدماتنا</h1>
          <p className="text-xs text-gray-400 mt-1">
            إدارة خدمات تصنيع وقص وتركيب الرخام والجرانيت، التشطيبات الفندقية، والواجهات الميكانيكية
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-[#1B1B1B] rounded-2xl border border-gray-800 p-6 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D8B369]">الترتيب: {svc.order}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    svc.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {svc.active ? 'نشطة ومفعلة' : 'معطلة'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{svc.titleAr}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{svc.shortDescAr}</p>

              <div className="pt-2 border-t border-gray-800 space-y-1">
                {svc.featuresAr.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <a
                href={`/services/${svc.slug}`}
                target="_blank"
                className="text-xs text-[#C5A059] hover:underline"
              >
                معاينة الصفحة
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(svc)}
                  className="p-2 rounded-lg bg-[#242424] hover:bg-[#C5A059] hover:text-black text-gray-300 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(svc.id)}
                  className="p-2 rounded-lg bg-[#242424] hover:bg-red-600 hover:text-white text-gray-300 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#C5A059]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">اسم الخدمة (عربي)</label>
                  <input
                    type="text"
                    required
                    value={form.titleAr}
                    onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">اسم الخدمة (إنجليزي)</label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="صورة غلاف المنتج / التصميم (رفع مباشر من جهازك)"
                  value={form.coverImage}
                  onChange={(url) => setForm({ ...form, coverImage: url })}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">وصف مختصر</label>
                <input
                  type="text"
                  required
                  value={form.shortDescAr}
                  onChange={(e) => setForm({ ...form, shortDescAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">الوصف التفصيلي للخدمة</label>
                <textarea
                  rows={3}
                  required
                  value={form.descriptionAr}
                  onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  المميزات (اكتب كل ميزة في سطر منفصل)
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.featuresAr}
                  onChange={(e) => setForm({ ...form, featuresAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-800 text-gray-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold hover:bg-[#D8B369]"
                >
                  حفظ الخدمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

