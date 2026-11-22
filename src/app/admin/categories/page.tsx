'use client';

import React, { useState, useEffect } from 'react';
import { IProductCategory } from '@/lib/models';
import { Tag, Plus, Edit2, Trash2, ArrowUpDown, X, Check } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<IProductCategory | null>(null);

  const [form, setForm] = useState({
    nameAr: '',
    nameEn: '',
    slug: '',
    descriptionAr: '',
    descriptionEn: '',
    order: 1,
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setForm({
      nameAr: '',
      nameEn: '',
      slug: '',
      descriptionAr: '',
      descriptionEn: '',
      order: categories.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (cat: IProductCategory) => {
    setEditingCategory(cat);
    setForm({
      nameAr: cat.nameAr,
      nameEn: cat.nameEn,
      slug: cat.slug,
      descriptionAr: cat.descriptionAr || '',
      descriptionEn: cat.descriptionEn || '',
      order: cat.order || 1,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف تصنيف "${name}"؟`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      form.slug ||
      form.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
      `category-${Date.now()}`;

    const payload = {
      ...form,
      slug,
      order: Number(form.order) || 1,
    };

    if (editingCategory) {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchCategories();
        setModalOpen(false);
      }
    } else {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchCategories();
        setModalOpen(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <Tag className="w-6 h-6 text-[#C5A059]" />
            <span>تصنيفات المنتجات</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            إدارة وتخصيص تصنيفات عروض وباقات الدهانات والديكورات الحديثة
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-[#C5A059]/10"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة تصنيف جديد</span>
        </button>
      </div>

      {/* Categories Table / List */}
      <div className="bg-[#181818] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#202020] text-gray-400 uppercase font-medium border-b border-gray-800">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">الترتيب</th>
                <th className="py-3.5 px-4">اسم التصنيف (عربي)</th>
                <th className="py-3.5 px-4">اسم التصنيف (إنجليزي)</th>
                <th className="py-3.5 px-4">المعرف (Slug)</th>
                <th className="py-3.5 px-4">الوصف</th>
                <th className="py-3.5 px-4 text-center w-28">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    جاري تحميل التصنيفات...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    لا توجد تصنيفات حالياً. قم بإضافة أول تصنيف الآن!
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 text-center font-mono text-[#D8B369] font-bold">
                      {cat.order || 0}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white text-sm">
                      {cat.nameAr}
                    </td>
                    <td className="py-3.5 px-4 text-gray-300 font-medium" dir="ltr">
                      {cat.nameEn}
                    </td>
                    <td className="py-3.5 px-4">
                      <code className="px-2 py-0.5 rounded bg-black/40 text-[#D8B369] text-[11px] font-mono border border-gray-800">
                        {cat.slug}
                      </code>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 max-w-xs truncate">
                      {cat.descriptionAr || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          title="تعديل"
                          className="p-1.5 rounded-lg bg-[#242424] hover:bg-[#C5A059] hover:text-black text-gray-300 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.nameAr)}
                          title="حذف"
                          className="p-1.5 rounded-lg bg-[#242424] hover:bg-red-600 hover:text-white text-gray-300 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#C5A059]/40 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#C5A059]" />
                <span>{editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">اسم التصنيف (عربي) *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: باقات وعروض الغرف"
                  value={form.nameAr}
                  onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">اسم التصنيف (إنجليزي) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxury Dining Tables"
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">المعرف (Slug)</label>
                  <input
                    type="text"
                    placeholder="dining-tables"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white font-mono focus:border-[#C5A059] outline-none"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">الترتيب في القائمة</label>
                  <input
                    type="number"
                    min="1"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">وصف التصنيف (اختياري)</label>
                <textarea
                  rows={2}
                  placeholder="وصف مختصر لمجموعة المنتجات التابعة لهذا التصنيف..."
                  value={form.descriptionAr}
                  onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-medium hover:bg-gray-700 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C5A059] text-black font-bold hover:bg-[#D8B369] transition-all"
                >
                  {editingCategory ? 'حفظ التعديلات' : 'إضافة التصنيف'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

