'use client';

import React, { useState, useEffect } from 'react';
import { IProject } from '@/lib/models';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { ImageUpload } from '@/components/common/ImageUpload';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);

  const [form, setForm] = useState({
    titleAr: '',
    titleEn: '',
    slug: '',
    category: 'residential',
    locationAr: 'الرياض',
    locationEn: 'Riyadh',
    scopeAr: '',
    scopeEn: '',
    descriptionAr: '',
    descriptionEn: '',
    coverImage: '/images/projects/qairawan-villa.jpg',
    completionDate: '2025',
    featured: true,
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setForm({
      titleAr: '',
      titleEn: '',
      slug: '',
      category: 'residential',
      locationAr: 'الرياض',
      locationEn: 'Riyadh',
      scopeAr: '',
      scopeEn: '',
      descriptionAr: '',
      descriptionEn: '',
      coverImage: '/images/projects/qairawan-villa.jpg',
      completionDate: '2025',
      featured: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (proj: IProject) => {
    setEditingProject(proj);
    setForm({
      titleAr: proj.titleAr,
      titleEn: proj.titleEn,
      slug: proj.slug,
      category: proj.category,
      locationAr: proj.locationAr,
      locationEn: proj.locationEn,
      scopeAr: proj.scopeAr,
      scopeEn: proj.scopeEn,
      descriptionAr: proj.descriptionAr,
      descriptionEn: proj.descriptionEn,
      coverImage: proj.coverImage,
      completionDate: proj.completionDate || '2025',
      featured: proj.featured,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع نهائياً؟')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingProject) {
      // update
      const res = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });
      if (res.ok) {
        fetchProjects();
        setModalOpen(false);
      }
    } else {
      // create
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug,
          gallery: [form.coverImage],
          order: projects.length + 1,
        }),
      });
      if (res.ok) {
        fetchProjects();
        setModalOpen(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">إدارة أعمالنا</h1>
          <p className="text-xs text-gray-400 mt-1">
            إضافة وتعديل وحذف أعمال الشركة وتحديد الأعمال المميزة على الواجهة
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عمل جديد</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-[#1B1B1B] rounded-2xl border border-gray-800 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={proj.coverImage}
                  alt={proj.titleAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-[#D8B369] font-semibold">
                    {proj.category === 'residential' ? 'سكني' : 'تجاري'}
                  </span>
                  {proj.featured && (
                    <span className="bg-[#C5A059] text-black px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black" />
                      <span>مميز</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{proj.locationAr}</span>
                </div>

                <h3 className="text-base font-bold text-white">{proj.titleAr}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{proj.scopeAr}</p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gray-800/80 flex items-center justify-between gap-3 pt-3">
              <a
                href={`/projects/${proj.slug}`}
                target="_blank"
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>معاينة</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(proj)}
                  className="p-2 rounded-lg bg-[#242424] hover:bg-[#C5A059] hover:text-black text-gray-300 transition-colors"
                  title="تعديل"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg bg-[#242424] hover:bg-red-600 hover:text-white text-gray-300 transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#C5A059]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">اسم المشروع (عربي)</label>
                  <input
                    type="text"
                    required
                    value={form.titleAr}
                    onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">اسم المشروع (إنجليزي)</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">التصنيف</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                  >
                    <option value="residential">سكني وقصور</option>
                    <option value="commercial">تجاري وإداري</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">الموقع (عربي)</label>
                  <input
                    type="text"
                    value={form.locationAr}
                    onChange={(e) => setForm({ ...form, locationAr: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">سنة الإنجاز</label>
                  <input
                    type="text"
                    value={form.completionDate}
                    onChange={(e) => setForm({ ...form, completionDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="صورة غلاف العمل (رفع مباشر من جهازك)"
                  value={form.coverImage}
                  onChange={(url) => setForm({ ...form, coverImage: url })}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">ملخص نطاق العمل (عربي)</label>
                <input
                  type="text"
                  required
                  value={form.scopeAr}
                  onChange={(e) => setForm({ ...form, scopeAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">الوصف المعماري الكامل (عربي)</label>
                <textarea
                  rows={3}
                  required
                  value={form.descriptionAr}
                  onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#C5A059]"
                />
                <label htmlFor="featuredCheck" className="text-gray-300 font-bold">
                  عرض هذا المشروع في قسم المشاريع المميزة على الصفحة الرئيسية
                </label>
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
                  حفظ المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

