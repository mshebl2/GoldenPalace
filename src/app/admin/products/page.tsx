'use client';

import React, { useState, useEffect } from 'react';
import { IProduct, IProductCategory } from '@/lib/models';
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  Filter,
  Star,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  DollarSign,
  Eye,
  EyeOff,
  Tag,
} from 'lucide-react';
import { MultiImageUpload } from '@/components/common/MultiImageUpload';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [form, setForm] = useState({
    titleAr: '',
    titleEn: '',
    slug: '',
    categoryId: '',
    materialAr: '',
    materialEn: '',
    dimensionsAr: '',
    dimensionsEn: '',
    descriptionAr: '',
    descriptionEn: '',
    coverImage: '',
    gallery: [] as string[],
    featured: false,
    order: 0,
    price: '' as string | number,
    showPrice: false,
    priceUnitAr: 'ر.س',
    priceUnitEn: 'SAR',
  });

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (prodData.products) setProducts(prodData.products);
      if (catData.categories) setCategories(catData.categories);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTogglePriceVisibility = async (prod: IProduct) => {
    const newShowPrice = !prod.showPrice;
    try {
      setProducts((prev) =>
        prev.map((p) => (p.id === prod.id ? { ...p, showPrice: newShowPrice } : p))
      );
      await fetch(`/api/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showPrice: newShowPrice }),
      });
    } catch (e) {
      console.error(e);
      fetchData();
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm({
      titleAr: '',
      titleEn: '',
      slug: '',
      categoryId: categories[0]?.id || 'cat-dining',
      materialAr: '',
      materialEn: '',
      dimensionsAr: '',
      dimensionsEn: '',
      descriptionAr: '',
      descriptionEn: '',
      coverImage: '',
      gallery: [],
      featured: false,
      order: products.length + 1,
      price: '',
      showPrice: false,
      priceUnitAr: 'ر.س',
      priceUnitEn: 'SAR',
    });
    setModalOpen(true);
  };

  const openEditModal = (prod: IProduct) => {
    setEditingProduct(prod);
    setForm({
      titleAr: prod.titleAr || '',
      titleEn: prod.titleEn || '',
      slug: prod.slug || '',
      categoryId: prod.categoryId || (categories[0]?.id || ''),
      materialAr: prod.materialAr || '',
      materialEn: prod.materialEn || '',
      dimensionsAr: prod.dimensionsAr || '',
      dimensionsEn: prod.dimensionsEn || '',
      descriptionAr: prod.descriptionAr || '',
      descriptionEn: prod.descriptionEn || '',
      coverImage: prod.coverImage || '',
      gallery: Array.isArray(prod.gallery) && prod.gallery.length > 0 ? prod.gallery : prod.coverImage ? [prod.coverImage] : [],
      featured: !!prod.featured,
      order: prod.order || 0,
      price: prod.price !== undefined ? prod.price : '',
      showPrice: !!prod.showPrice,
      priceUnitAr: prod.priceUnitAr || 'ر.س',
      priceUnitEn: prod.priceUnitEn || 'SAR',
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCat = categories.find((c) => c.id === form.categoryId);
    const cover = form.gallery[0] || form.coverImage || '/images/offers/three-rooms.webp';

    const payload = {
      ...form,
      coverImage: cover,
      categoryAr: selectedCat?.nameAr || 'منتجات عامة',
      categoryEn: selectedCat?.nameEn || 'General Products',
    };

    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setModalOpen(false);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts = products.filter((prod) => {
    const matchesCat = selectedCategory === 'all' || prod.categoryId === selectedCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      prod.titleAr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.categoryAr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.materialAr?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  if (loading) {
    return <div className="text-gray-400 p-8 font-madani">جاري تحميل كتالوج المنتجات...</div>;
  }

  return (
    <div className="space-y-6 font-madani">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-[#C5A059]" />
            <span>إدارة عروض وباقات الدهانات والديكورات</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            إضافة وتعديل المنتجات، رفع صور متعددة لكل منتج، والتحكم في تصنيفاتها ومواصفاتها
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E8CD8C] text-black font-bold text-xs hover:from-[#E8CD8C] hover:to-[#C5A059] transition-all flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-[#C5A059]/20"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#1B1B1B] p-4 rounded-2xl border border-gray-800">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute top-3 right-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في المنتجات بالاسم أو المادة أو التصنيف..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#141414] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Category Filter Select */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-[#C5A059] shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2.5 rounded-xl bg-[#141414] border border-gray-700 text-white text-xs focus:border-[#C5A059] focus:outline-none"
          >
            <option value="all">جميع التصنيفات ({products.length})</option>
            {categories.map((cat) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.nameAr} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const galleryCount = prod.gallery?.length || (prod.coverImage ? 1 : 0);
          return (
            <div
              key={prod.id}
              className="bg-[#1B1B1B] border border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:border-[#C5A059]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Product Cover Image with Gallery Pill */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={prod.coverImage || prod.gallery?.[0] || '/images/offers/three-rooms.webp'}
                    alt={prod.titleAr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Category Tag */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D8B369] font-bold text-[11px] border border-white/10">
                    {prod.categoryAr}
                  </span>

                  {/* Multi-image Count Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10px] flex items-center gap-1 border border-white/10">
                    <ImageIcon className="w-3 h-3 text-[#C5A059]" />
                    <span>{galleryCount} صور</span>
                  </div>

                  {prod.featured && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#C5A059] text-black font-bold text-[10px] flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-current" />
                      <span>مميز في الواجهة</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#D8B369] transition-colors">
                      {prod.titleAr}
                    </h3>
                    <p className="text-[11px] text-[#A69F94] font-mono mt-0.5" dir="ltr">
                      {prod.titleEn}
                    </p>
                  </div>

                  {prod.materialAr && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-[11px] text-[#D8B369] border border-white/5">
                      <span>الخامة:</span>
                      <span className="font-bold text-gray-200">{prod.materialAr}</span>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {prod.descriptionAr}
                  </p>

                  {/* Price & Show/Hide Quick Toggle */}
                  <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                      {prod.price ? (
                        <span className="text-xs font-bold text-white font-mono">
                          {Number(prod.price).toLocaleString('en-US')} {prod.priceUnitAr || 'ر.س'}
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-500">لم يُحدد سعر</span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTogglePriceVisibility(prod)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
                        prod.showPrice
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                          : 'bg-white/5 text-gray-400 border-gray-700 hover:bg-white/10 hover:text-white'
                      }`}
                      title={prod.showPrice ? 'انقر لإخفاء السعر عن العملاء' : 'انقر لإظهار السعر للعملاء'}
                    >
                      {prod.showPrice ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-400" />
                          <span>ظاهر للعملاء</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-gray-400" />
                          <span>السعر مخفي</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-gray-800/80 flex items-center justify-between">
                <a
                  href={`/products`}
                  target="_blank"
                  className="text-[11px] text-[#C5A059] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>معاينة في المتجر</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(prod)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-[#C5A059] text-gray-300 hover:text-black transition-colors"
                    title="تعديل المنتج والصور"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-600 text-gray-300 hover:text-white transition-colors"
                    title="حذف المنتج"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-[#1B1B1B] border border-gray-800 text-gray-400 space-y-3">
          <ShoppingBag className="w-12 h-12 text-[#C5A059] mx-auto opacity-40" />
          <h4 className="text-white font-bold text-sm">لا توجد منتجات مطابقة للبحث</h4>
          <p className="text-xs text-gray-500">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً</p>
        </div>
      )}

      {/* ============================================================ */}
      {/* PRODUCT CREATE / EDIT MODAL WITH MULTI-IMAGE UPLOADER        */}
      {/* ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#C5A059]/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingProduct ? 'تعديل بيانات المنتج والصور' : 'إضافة منتج جديد'}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  ارفع عدة صور للمنتج من جهازك، وحدد التصنيف والمواصفات
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* Product Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">اسم المنتج (عربي) *</label>
                  <input
                    type="text"
                    required
                    value={form.titleAr}
                    onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                    placeholder="مثال: عرض دهان 3 غرف جوتن"
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">اسم المنتج (إنجليزي)</label>
                  <input
                    type="text"
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    placeholder="Royal Calacatta Dining Table"
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Category & Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">تصنيف المنتج *</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameAr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">نوع الدهان / المواصفة</label>
                  <input
                    type="text"
                    value={form.materialAr}
                    onChange={(e) => setForm({ ...form, materialAr: e.target.value })}
                    placeholder="مثال: دهانات جوتن فينوماستيك أصلية"
                    className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              {/* Scope & Rooms */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">نطاق الغرف ومحتوى العرض</label>
                <input
                  type="text"
                  value={form.dimensionsAr}
                  onChange={(e) => setForm({ ...form, dimensionsAr: e.target.value })}
                  placeholder="مثال: تشطيب 3 غرف شامل معجون، سنفرة، أساس، ووجهين دهان"
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              {/* Price & Price Visibility Control (مفتاح التحكم في السعر وظهوره) */}
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#C5A059]/40 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">إدارة السعر وظهوره للعملاء</h4>
                      <p className="text-[11px] text-gray-400">حدد السعر وتحكم إذا كان يظهر للزوار أو يظل مخفياً</p>
                    </div>
                  </div>

                  {/* Elegant Toggle Switch */}
                  <label className="relative inline-flex items-center gap-3 cursor-pointer select-none self-start sm:self-auto bg-black/40 px-3 py-1.5 rounded-xl border border-gray-800">
                    <span className="text-xs font-bold">
                      {form.showPrice ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          السعر ظاهر بالموقع
                        </span>
                      ) : (
                        <span className="text-gray-400 flex items-center gap-1">
                          <EyeOff className="w-3.5 h-3.5" />
                          السعر مخفي (طلب تسعير)
                        </span>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={form.showPrice}
                      onChange={(e) => setForm({ ...form, showPrice: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      سعر المنتج (رقم أو مبلغ)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        placeholder="مثال: 1000"
                        className="w-full p-2.5 pr-8 rounded-xl bg-[#222222] border border-gray-700 text-white font-mono text-sm focus:border-[#C5A059] focus:outline-none"
                      />
                      <DollarSign className="w-4 h-4 text-[#C5A059] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">
                      العملة / وحدة التسعير
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={form.priceUnitAr}
                        onChange={(e) => setForm({ ...form, priceUnitAr: e.target.value })}
                        placeholder="ر.س"
                        className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white text-xs focus:border-[#C5A059] focus:outline-none"
                      />
                      <select
                        onChange={(e) => setForm({ ...form, priceUnitAr: e.target.value })}
                        value={form.priceUnitAr}
                        className="p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-gray-300 text-xs focus:border-[#C5A059] focus:outline-none"
                      >
                        <option value="ر.س">ر.س (قطعة)</option>
                        <option value="ر.س / م²">ر.س / م²</option>
                        <option value="ر.س / طقم">ر.س / طقم</option>
                        <option value="ر.س / متر طولي">ر.س / متر طولي</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-gray-400 flex items-center gap-2">
                  <span className="text-[#C5A059] font-bold shrink-0">حالة العرض:</span>
                  <span>
                    {form.showPrice
                      ? '✓ سيظهر السعر للعميل على البطاقة وتفاصيل المنتج وداخل رسالة الواتساب عند الاستفسار.'
                      : '✕ السعر مخفي تماماً ولن يظهر أي رقم مالي للعميل، بل سيظهر زر "طلب تسعير واستفسار".'}
                  </span>
                </div>
              </div>

              {/* MULTI-IMAGE UPLOAD COMPONENT (وعايز اقدر اضيف لكل منتج اكثر من صورة) */}
              <div className="p-4 rounded-2xl bg-[#141414] border border-gray-800 space-y-2">
                <MultiImageUpload
                  images={form.gallery}
                  onChange={(newGallery) =>
                    setForm({
                      ...form,
                      gallery: newGallery,
                      coverImage: newGallery[0] || form.coverImage,
                    })
                  }
                  label="صور المنتج ومعرض الصور (رفع مباشر من جهازك)"
                  helperText="يمكنك رفع عدة صور بضغطة واحدة، وتعيين أي صورة كغلاف رئيسي للمنتج"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">الوصف المعماري والتفاصيل</label>
                <textarea
                  rows={3}
                  value={form.descriptionAr}
                  onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
                  placeholder="وصف تفصيلي للقطعة وتفاصيل القص والتشطيب..."
                  className="w-full p-2.5 rounded-xl bg-[#222222] border border-gray-700 text-white focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredProductCheck"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded bg-gray-800 border-gray-700 text-[#C5A059] focus:ring-0"
                />
                <label htmlFor="featuredProductCheck" className="text-gray-300 font-bold cursor-pointer">
                  عرض هذا المنتج في قسم المنتجات المميزة على الصفحة الرئيسية
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E8CD8C] text-black font-bold shadow-lg hover:from-[#E8CD8C] hover:to-[#C5A059] transition-all"
                >
                  {editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

