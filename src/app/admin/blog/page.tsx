'use client';

import React, { useState, useEffect } from 'react';
import { IArticle } from '@/lib/models';
import { BookOpen, Plus, Edit2, Trash2, X, Calendar, User } from 'lucide-react';
import { ImageUpload } from '@/components/common/ImageUpload';

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<IArticle | null>(null);

  const [form, setForm] = useState({
    titleAr: '',
    titleEn: '',
    slug: '',
    excerptAr: '',
    excerptEn: '',
    contentAr: '',
    contentEn: '',
    coverImage: '/images/hero/hero-living-room.webp',
    category: 'نصائح وأفكار دهانات',
    author: 'فريق القصر الذهبي',
    publishedAt: new Date().toISOString().split('T')[0],
    isPublished: true,
    readTime: '5 دقائق',
  });

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/blog?admin=true');
      const data = await res.json();
      if (data.articles) setArticles(data.articles);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setEditingArticle(null);
    setForm({
      titleAr: '',
      titleEn: '',
      slug: '',
      excerptAr: '',
      excerptEn: '',
      contentAr: '<p>اكتب هنا محتوى المقال...</p>',
      contentEn: '',
      coverImage: '/images/products/tables-3.webp',
      category: 'أعمال معمارية',
      author: 'استوديو القصر الذهبي للدهانات',
      publishedAt: new Date().toISOString().split('T')[0],
      isPublished: true,
      readTime: '5 دقائق',
    });
    setModalOpen(true);
  };

  const openEditModal = (art: IArticle) => {
    setEditingArticle(art);
    setForm({
      titleAr: art.titleAr,
      titleEn: art.titleEn,
      slug: art.slug,
      excerptAr: art.excerptAr,
      excerptEn: art.excerptEn,
      contentAr: art.contentAr,
      contentEn: art.contentEn,
      coverImage: art.coverImage,
      category: art.category,
      author: art.author,
      publishedAt: art.publishedAt,
      isPublished: art.isPublished,
      readTime: art.readTime,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال نهائياً؟')) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (res.ok) setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingArticle) {
      const res = await fetch(`/api/blog/${editingArticle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });
      if (res.ok) {
        fetchArticles();
        setModalOpen(false);
      }
    } else {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });
      if (res.ok) {
        fetchArticles();
        setModalOpen(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">إدارة الأخبار والمدونة</h1>
          <p className="text-xs text-gray-400 mt-1">
            نشر المقالات المعمارية، إرشادات كود البناء، وتحديثات مشاريع الشركة
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>كتابة مقال جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-[#1B1B1B] rounded-2xl border border-gray-800 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-black">
                <img src={art.coverImage} alt={art.titleAr} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-[#D8B369] font-semibold">
                  {art.category}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{art.publishedAt}</span>
                  <span>•</span>
                  <span>{art.author}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{art.titleAr}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{art.excerptAr}</p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gray-800 flex items-center justify-between pt-3">
              <a href={`/blog/${art.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-white">
                معاينة المقال
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(art)}
                  className="p-2 rounded-lg bg-[#242424] hover:bg-[#C5A059] hover:text-black text-gray-300 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(art.id)}
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
                {editingArticle ? 'تعديل المقال' : 'كتابة مقال جديد'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">عنوان المقال (عربي)</label>
                <input
                  type="text"
                  required
                  value={form.titleAr}
                  onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">التصنيف</label>
                  <input
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">اسم الكاتب</label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="صورة غلاف المقال (رفع مباشر من جهازك)"
                  value={form.coverImage}
                  onChange={(url) => setForm({ ...form, coverImage: url })}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">مقدمة موجزة (Excerpt)</label>
                <textarea
                  rows={2}
                  required
                  value={form.excerptAr}
                  onChange={(e) => setForm({ ...form, excerptAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">نص ومحتوى المقال (HTML مدعوم)</label>
                <textarea
                  rows={6}
                  required
                  value={form.contentAr}
                  onChange={(e) => setForm({ ...form, contentAr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white font-mono"
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
                  نشر المقال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

