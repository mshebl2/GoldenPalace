import React from 'react';
import Link from 'next/link';
import { getQuotations, getProjects, getArticles, getServices, getProducts } from '@/lib/db';
import {
  FileText,
  Briefcase,
  BookOpen,
  ShoppingBag,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  User,
  Wrench,
} from 'lucide-react';

export const revalidate = 0; // Always fresh in admin

export default async function AdminDashboardPage() {
  const [quotations, projects, articles, services, products] = await Promise.all([
    getQuotations(),
    getProjects(),
    getArticles(),
    getServices(),
    getProducts(),
  ]);

  const quoteList = quotations || [];
  const projectList = projects || [];
  const articleList = articles || [];
  const serviceList = services || [];
  const productList = products || [];

  const newQuotationsCount = quoteList.filter((q) => q && q.status === 'New').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            لوحة تحكم القصر الذهبي للدهانات والديكورات
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            مرحباً بك، المشرف العام — نظرة شاملة على مؤشرات الأداء والطلبات الحديثة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/quotations"
            className="px-4 py-2 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>عرض كافة الطلبات ({quoteList.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid matching Image 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Quotations */}
        <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-[#C5A059]/30 shadow-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>طلبات عروض الأسعار</span>
            <FileText className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white">
            {quoteList.length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#D8B369]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>{newQuotationsCount} طلبات جديدة بحاجة للمراجعة</span>
          </div>
        </div>

        {/* Works / Projects */}
        <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>أعمالنا المنشورة</span>
            <Briefcase className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white">
            {projectList.length}
          </div>
          <div className="text-[11px] text-gray-400">
            {projectList.filter((p) => p && p.featured).length} أعمال مميزة في الواجهة
          </div>
        </div>

        {/* Articles */}
        <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>المقالات والأخبار</span>
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white">
            {articleList.length}
          </div>
          <div className="text-[11px] text-gray-400">
            منشورة في المدونة الرسمية
          </div>
        </div>

        {/* Products & Packages */}
        <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>باقات وعروض الدهانات</span>
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white">
            {productList.length}
          </div>
          <div className="text-[11px] text-gray-400">
            {productList.length} باقة معتمدة • {serviceList.length} خدمات تشطيب
          </div>
        </div>
      </div>

      {/* Visual Chart / Trend Representation matching Image 2 */}
      <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">طلبات عروض الأسعار خلال 30 يوم</h3>
            <p className="text-xs text-gray-400">معدل الإقبال واستفسارات المشاريع السكنية والتجارية</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#C5A059] font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>+38% نمو الطلبات</span>
          </div>
        </div>

        {/* Stylized CSS Area Chart */}
        <div className="h-44 flex items-end gap-2 sm:gap-4 pt-6 pb-2 px-2">
          {[35, 45, 60, 50, 75, 90, 80, 110, 130, 95, 120, 140, 160].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <div
                style={{ height: `${(val / 160) * 100}%` }}
                className="w-full bg-gradient-to-t from-[#C5A059]/20 to-[#C5A059] rounded-t-md group-hover:from-[#D8B369]/40 group-hover:to-[#D8B369] transition-all relative"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-[#D8B369] px-1.5 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </div>
              </div>
              <span className="text-[10px] text-gray-500">
                {idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quotation Requests Table matching Image 2 */}
      <div className="bg-[#1B1B1B] rounded-3xl border border-gray-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">أحدث طلبات عروض الأسعار</h3>
          <Link
            href="/admin/quotations"
            className="text-xs text-[#C5A059] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>إدارة جميع الطلبات</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#141414] text-gray-400 font-semibold border-b border-gray-800">
              <tr>
                <th className="p-4">رقم المرجع</th>
                <th className="p-4">العميل</th>
                <th className="p-4">الخدمة المطلوبة</th>
                <th className="p-4">المدينة / الموقع</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {quoteList.slice(0, 5).map((q) => {
                const statusStyles: Record<string, string> = {
                  New: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
                  'Under Review': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                  Contacted: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                  Quoted: 'bg-green-500/10 text-green-400 border-green-500/30',
                  Closed: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
                };

                const statusLabels: Record<string, string> = {
                  New: 'جديد',
                  'Under Review': 'قيد المراجعة',
                  Contacted: 'تم التواصل',
                  Quoted: 'تم التسعير',
                  Closed: 'مغلق',
                };

                const formattedDate = (() => {
                  if (!q.createdAt) return '—';
                  try {
                    return typeof q.createdAt === 'string'
                      ? q.createdAt.split('T')[0]
                      : new Date(q.createdAt).toISOString().split('T')[0];
                  } catch {
                    return '—';
                  }
                })();

                return (
                  <tr key={q.id} className="hover:bg-[#222222] transition-colors">
                    <td className="p-4 font-mono font-bold text-[#D8B369]">
                      {q.referenceNumber}
                    </td>
                    <td className="p-4 font-semibold text-white">
                      <div>{q.customerName}</div>
                      <div className="text-[11px] text-gray-400" dir="ltr">{q.phone}</div>
                    </td>
                    <td className="p-4 text-gray-300">{q.requiredService}</td>
                    <td className="p-4 text-gray-400">{q.projectLocation}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusStyles[q.status] || ''}`}>
                        {statusLabels[q.status] || q.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      {formattedDate}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/admin/quotations?id=${q.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#C5A059] hover:text-black text-gray-300 font-semibold transition-colors"
                      >
                        معاينة وتعديل
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

