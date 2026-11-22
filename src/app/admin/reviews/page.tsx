'use client';

import React, { useState, useEffect } from 'react';
import { IReview } from '@/lib/models';
import {
  Star,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Filter,
  Search,
  MessageSquare,
  Clock,
  Award,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<IReview | null>(null);

  const [form, setForm] = useState({
    authorName: '',
    roleAr: 'عميل موثق',
    rating: 5,
    projectOrProduct: '',
    comment: '',
    isApproved: true,
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews?all=true');
      const data = await res.json();
      if (data.reviews) setReviews(data.reviews);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter((r) => r.isApproved).length;
  const pendingReviews = reviews.filter((r) => !r.isApproved).length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews).toFixed(1)
      : '5.0';

  const toggleApproval = async (review: IReview) => {
    const updatedStatus = !review.isApproved;
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: updatedStatus }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === review.id ? { ...r, isApproved: updatedStatus } : r))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف تقييم العميل "${name}"؟`)) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openCreateModal = () => {
    setEditingReview(null);
    setForm({
      authorName: '',
      roleAr: 'عميل موثق',
      rating: 5,
      projectOrProduct: '',
      comment: '',
      isApproved: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (review: IReview) => {
    setEditingReview(review);
    setForm({
      authorName: review.authorName,
      roleAr: review.roleAr || 'عميل موثق',
      rating: review.rating || 5,
      projectOrProduct: review.projectOrProduct || '',
      comment: review.comment,
      isApproved: review.isApproved,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      const res = await fetch(`/api/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        fetchReviews();
        setModalOpen(false);
      }
    } else {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'direct',
        }),
      });
      if (res.ok) {
        fetchReviews();
        setModalOpen(false);
      }
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === 'pending' && r.isApproved) return false;
    if (filter === 'approved' && !r.isApproved) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.authorName.toLowerCase().includes(q);
      const matchComment = r.comment.toLowerCase().includes(q);
      const matchRole = (r.roleAr || '').toLowerCase().includes(q);
      const matchProduct = (r.projectOrProduct || '').toLowerCase().includes(q);
      return matchName || matchComment || matchRole || matchProduct;
    }

    return true;
  });

  return (
    <div className="space-y-8 font-madani pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#202020] border border-[#C5A059]/40 text-[#D8B369] text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
            <span>نظام مراقبة واعتماد تقييمات العملاء</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span>إدارة آراء وتقييمات العملاء</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
            التحكم في نشر أو إخفاء تقييمات العملاء الواردة من الموقع أو خرائط Google، ومراجعة الآراء الجديدة قبل ظهورها للزوار.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D8B369] hover:from-[#d8b369] hover:to-[#e2c17d] text-black font-bold text-xs transition-all shadow-lg shadow-[#C5A059]/15 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة تقييم جديد يدوياً</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181818] p-5 rounded-2xl border border-gray-800 shadow-xl space-y-2">
          <span className="text-xs text-gray-400 font-bold block">إجمالي التقييمات</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-white font-mono">{totalReviews}</span>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#181818] p-5 rounded-2xl border border-green-500/20 shadow-xl space-y-2">
          <span className="text-xs text-green-400 font-bold block">منشورة على الموقع</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-green-400 font-mono">{approvedReviews}</span>
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#181818] p-5 rounded-2xl border border-yellow-500/20 shadow-xl space-y-2">
          <span className="text-xs text-yellow-400 font-bold block">بانتظار الاعتماد والمراجعة</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-yellow-400 font-mono">{pendingReviews}</span>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#181818] p-5 rounded-2xl border border-[#C5A059]/30 shadow-xl space-y-2">
          <span className="text-xs text-[#D8B369] font-bold block">متوسط التقييم العام</span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl font-black text-[#D8B369] font-mono">{avgRating}</span>
              <span className="text-xs text-gray-400">/ 5</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059]">
              <Star className="w-5 h-5 fill-[#C5A059]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex rounded-xl bg-[#1C1C1C] p-1 border border-gray-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#C5A059] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            الكل ({totalReviews})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'pending'
                ? 'bg-yellow-500 text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>بانتظار الاعتماد</span>
            {pendingReviews > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-yellow-400/20 text-yellow-300 font-bold">
                {pendingReviews}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filter === 'approved'
                ? 'bg-green-500 text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            المعتمدة والمنشورة ({approvedReviews})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="ابحث بالاسم أو نص التقييم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pr-9 pl-4 rounded-xl bg-[#1C1C1C] border border-gray-800 text-white placeholder-gray-500 text-xs focus:border-[#C5A059] outline-none"
          />
          <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="py-24 text-center text-gray-500">
          <div className="inline-block w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs">جاري تحميل التقييمات...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-[#181818] border border-gray-800 rounded-3xl p-12 text-center space-y-3">
          <MessageSquare className="w-10 h-10 text-gray-600 mx-auto" />
          <h3 className="text-base font-bold text-white">لا توجد تقييمات مطابقة</h3>
          <p className="text-xs text-gray-400">
            {filter === 'pending'
              ? 'ممتاز! لا توجد تقييمات معلقة بانتظار المراجعة حالياً.'
              : 'لم يتم العثور على أي آراء مطابقة للفلاتر المحددة.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden ${
                rev.isApproved
                  ? 'bg-[#181818] border-gray-800 hover:border-[#C5A059]/50'
                  : 'bg-[#1A1813] border-yellow-500/30 hover:border-yellow-500/60'
              }`}
            >
              {/* Status Ribbon / Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border ${
                    rev.isApproved
                      ? 'bg-green-500/15 text-green-400 border-green-500/30'
                      : 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40 animate-pulse'
                  }`}
                >
                  {rev.isApproved ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>منشور على الموقع</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5" />
                      <span>بانتظار الاعتماد (مخفي)</span>
                    </>
                  )}
                </span>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'fill-[#C5A059] text-[#C5A059]'
                          : 'fill-gray-700 text-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Author & Project Info */}
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center justify-between">
                    <span>{rev.authorName}</span>
                    {rev.source === 'google' && (
                      <span className="text-[10px] text-gray-400 bg-black/40 px-2 py-0.5 rounded-full border border-gray-700">
                        Google Reviews
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-[#D8B369] font-medium block mt-0.5">
                    {rev.roleAr || 'عميل موثق'}
                  </span>
                  {rev.projectOrProduct && (
                    <span className="inline-block text-[10px] text-gray-300 bg-[#252525] px-2.5 py-0.5 rounded-md mt-1.5 border border-gray-700">
                      {rev.projectOrProduct}
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-xs text-gray-300 leading-relaxed bg-[#141414] p-3.5 rounded-xl border border-gray-800/80 line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Actions Toolbar */}
              <div className="pt-4 mt-5 border-t border-gray-800 flex items-center justify-between gap-2">
                {/* Publish / Hide Toggle Button */}
                <button
                  onClick={() => toggleApproval(rev)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow ${
                    rev.isApproved
                      ? 'bg-gray-800 hover:bg-orange-600/30 hover:text-orange-300 text-gray-300 border border-gray-700'
                      : 'bg-[#C5A059] hover:bg-[#D8B369] text-black shadow-lg shadow-[#C5A059]/20 font-black'
                  }`}
                  title={rev.isApproved ? 'إخفاء التقييم من الموقع' : 'اعتماد ونشر التقييم فوراً'}
                >
                  {rev.isApproved ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                      <span>إخفاء من الموقع</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>اعتماد ونشر فوراً</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(rev)}
                    className="p-2 rounded-xl bg-[#222222] hover:bg-[#C5A059] hover:text-black text-gray-300 transition-colors"
                    title="تعديل"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id, rev.authorName)}
                    className="p-2 rounded-xl bg-[#222222] hover:bg-red-600 hover:text-white text-gray-300 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit Review */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#C5A059]/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                <span>{editingReview ? 'تعديل تقييم العميل' : 'إضافة تقييم جديد'}</span>
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
                <label className="block text-gray-300 font-bold mb-1">اسم العميل *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عبدالمحسن الراجحي"
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">الصفة / المدينة</label>
                  <input
                    type="text"
                    placeholder="مثال: مالك فيلا بحي النرجس"
                    value={form.roleAr}
                    onChange={(e) => setForm({ ...form, roleAr: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">التقييم بالنجوم</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-[#D8B369] font-bold focus:border-[#C5A059] outline-none"
                  >
                    <option value={5}>★★★★★ (5 نجوم - ممتاز)</option>
                    <option value={4}>★★★★☆ (4 نجوم - جيد جداً)</option>
                    <option value={3}>★★★☆☆ (3 نجوم - جيد)</option>
                    <option value={2}>★★☆☆☆ (2 نجمتان)</option>
                    <option value={1}>★☆☆☆☆ (1 نجمة)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">المنتج أو الخدمة المنفذة</label>
                <input
                  type="text"
                  placeholder="مثال: طاولة طعام رخام كلكتا مع كونسول"
                  value={form.projectOrProduct}
                  onChange={(e) => setForm({ ...form, projectOrProduct: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">نص التقييم والتجربة *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="اكتب تفاصيل تجربة العميل ورأيه في الجودة ومواعيد التسليم..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] outline-none leading-relaxed"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#222222] border border-gray-700 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="modalIsApproved"
                  checked={form.isApproved}
                  onChange={(e) => setForm({ ...form, isApproved: e.target.checked })}
                  className="w-4 h-4 text-[#C5A059] accent-[#C5A059] rounded"
                />
                <label htmlFor="modalIsApproved" className="text-xs text-white font-bold cursor-pointer">
                  نشر التقييم مباشرة في الموقع العام (إذا تم إلغاؤه سيبقى التقييم معلقاً ومخفياً)
                </label>
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
                  {editingReview ? 'حفظ التعديلات' : 'إضافة التقييم'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

