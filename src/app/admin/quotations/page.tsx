'use client';

import React, { useState, useEffect } from 'react';
import { IQuotationRequest } from '@/lib/models';
import {
  FileText,
  Search,
  Download,
  Phone,
  MessageSquare,
  Mail,
  CheckCircle,
  Clock,
  Filter,
  Save,
  FileCheck,
  AlertCircle,
} from 'lucide-react';

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<IQuotationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedQuote, setSelectedQuote] = useState<IQuotationRequest | null>(null);
  const [internalNote, setInternalNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const fetchQuotations = async () => {
    try {
      const res = await fetch('/api/quotations');
      const data = await res.json();
      if (data.quotations) {
        setQuotations(data.quotations);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleStatusChange = async (id: string, newStatus: IQuotationRequest['status']) => {
    try {
      const res = await fetch(`/api/quotations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setQuotations((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (e) {
      console.error('Error updating status', e);
    }
  };

  const handleSaveNote = async () => {
    if (!selectedQuote) return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/quotations/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: internalNote }),
      });
      if (res.ok) {
        setQuotations((prev) =>
          prev.map((q) =>
            q.id === selectedQuote.id ? { ...q, internalNotes: internalNote } : q
          )
        );
        setSelectedQuote((prev) => (prev ? { ...prev, internalNotes: internalNote } : null));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingNote(false);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Reference Number',
      'Customer Name',
      'Phone',
      'Email',
      'City',
      'Location',
      'Required Service',
      'Project Type',
      'Area',
      'Material Preferences',
      'Description',
      'Status',
      'Created At',
    ];

    const rows = quotations.map((q) => [
      q.referenceNumber,
      `"${q.customerName.replace(/"/g, '""')}"`,
      `"${q.phone}"`,
      q.email,
      `"${q.city}"`,
      `"${q.projectLocation.replace(/"/g, '""')}"`,
      `"${q.requiredService.replace(/"/g, '""')}"`,
      `"${q.projectType.replace(/"/g, '""')}"`,
      q.approximateArea || '',
      `"${(q.materialPreferences || '').replace(/"/g, '""')}"`,
      `"${q.description.replace(/"/g, '""')}"`,
      q.status,
      q.createdAt,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `quotations_eet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = quotations.filter((q) => {
    const matchStatus = filterStatus === 'all' || q.status === filterStatus;
    const matchSearch =
      q.customerName.toLowerCase().includes(search.toLowerCase()) ||
      q.phone.includes(search) ||
      q.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      q.projectLocation.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statusLabels: Record<string, string> = {
    New: 'جديد',
    'Under Review': 'قيد المراجعة',
    Contacted: 'تم التواصل',
    Quoted: 'تم التسعير',
    Closed: 'مغلق',
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            إدارة طلبات عروض الأسعار
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            متابعة استفسارات العملاء، تحديث الحالات، تدوين الملاحظات الفنية، وتصدير السجلات
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2.5 rounded-xl bg-[#242424] hover:bg-[#C5A059] hover:text-black text-gray-200 border border-gray-700 text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>تصدير السجلات (CSV)</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#1B1B1B] p-4 rounded-2xl border border-gray-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute top-3.5 right-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم، رقم المرجع، أو الهاتف..."
            className="w-full pr-10 pl-4 py-2 rounded-xl bg-[#141414] border border-gray-700 text-white text-xs focus:border-[#C5A059] focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'New', label: 'جديد' },
            { id: 'Under Review', label: 'قيد المراجعة' },
            { id: 'Contacted', label: 'تم التواصل' },
            { id: 'Quoted', label: 'تم التسعير' },
            { id: 'Closed', label: 'مغلق' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === tab.id
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'bg-[#141414] text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table List */}
        <div className={`${selectedQuote ? 'lg:col-span-7' : 'lg:col-span-12'} bg-[#1B1B1B] rounded-2xl border border-gray-800 shadow-xl overflow-hidden transition-all`}>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#141414] text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="p-4">رقم المرجع</th>
                  <th className="p-4">العميل</th>
                  <th className="p-4">الخدمة</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => {
                      setSelectedQuote(q);
                      setInternalNote(q.internalNotes || '');
                    }}
                    className={`cursor-pointer hover:bg-[#222222] transition-colors ${
                      selectedQuote?.id === q.id ? 'bg-[#222222] border-r-4 border-r-[#C5A059]' : ''
                    }`}
                  >
                    <td className="p-4 font-mono font-bold text-[#D8B369]">
                      {q.referenceNumber}
                    </td>
                    <td className="p-4 font-semibold text-white">
                      <div>{q.customerName}</div>
                      <div className="text-[11px] text-gray-400" dir="ltr">{q.phone}</div>
                    </td>
                    <td className="p-4 text-gray-300">{q.requiredService}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#242424] border border-gray-700 text-[#D8B369]">
                        {statusLabels[q.status] || q.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="px-2.5 py-1 rounded bg-[#141414] hover:bg-[#C5A059] hover:text-black text-gray-300 transition-colors text-[11px]">
                        عرض
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Quote Details Drawer / Card */}
        {selectedQuote && (
          <div className="lg:col-span-5 bg-[#181818] rounded-2xl border border-[#C5A059]/40 shadow-2xl p-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs text-gray-400">تفاصيل الطلب رقم:</span>
                <h3 className="text-lg font-bold font-mono text-[#D8B369]">
                  {selectedQuote.referenceNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-400 hover:text-white text-xs bg-gray-800 px-2 py-1 rounded"
              >
                إغلاق
              </button>
            </div>

            {/* Quick Customer Action */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${selectedQuote.phone}`}
                className="py-2.5 px-3 rounded-xl bg-[#242424] hover:bg-green-600 hover:text-white border border-gray-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-green-400" />
                <span>اتصال بالعميل</span>
              </a>

              <a
                href={`https://wa.me/966${selectedQuote.phone.replace(/^0/, '')}?text=${encodeURIComponent(`السلام عليكم ${selectedQuote.customerName}، معكم القصر الذهبي للدهانات والديكورات الحديثة بخصوص طلب التسعير رقم ${selectedQuote.referenceNumber}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] hover:text-black border border-[#25D366]/40 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>مراسلة واتساب</span>
              </a>
            </div>

            {/* Status Switcher */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2">
                تحديث حالة الطلب:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['New', 'Under Review', 'Contacted', 'Quoted', 'Closed'] as const).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedQuote.id, st)}
                      className={`py-2 px-2 rounded-lg text-[11px] font-bold transition-all border ${
                        selectedQuote.status === st
                          ? 'bg-[#C5A059] text-black border-[#C5A059]'
                          : 'bg-[#141414] text-gray-400 border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      {statusLabels[st]}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Details Fields */}
            <div className="space-y-3 text-xs bg-[#141414] p-4 rounded-xl border border-gray-800">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">الاسم:</span>
                <span className="text-white font-semibold">{selectedQuote.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">الجوال:</span>
                <span className="text-white" dir="ltr">{selectedQuote.phone}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">البريد:</span>
                <span className="text-white">{selectedQuote.email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">الموقع / المدينة:</span>
                <span className="text-white">{selectedQuote.city} - {selectedQuote.projectLocation}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">الخدمة:</span>
                <span className="text-[#D8B369] font-semibold">{selectedQuote.requiredService}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">نوع المشروع:</span>
                <span className="text-white">{selectedQuote.projectType}</span>
              </div>
              {selectedQuote.approximateArea && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">المساحة التقريبية:</span>
                  <span className="text-white">{selectedQuote.approximateArea} م²</span>
                </div>
              )}
              {selectedQuote.materialPreferences && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">تفضيل المواد:</span>
                  <span className="text-white">{selectedQuote.materialPreferences}</span>
                </div>
              )}
              <div className="pt-1">
                <span className="text-gray-400 block mb-1">وصف العميل:</span>
                <p className="text-gray-200 leading-relaxed bg-[#1B1B1B] p-2.5 rounded-lg border border-gray-800">
                  {selectedQuote.description}
                </p>
              </div>

              {/* Attachments */}
              {selectedQuote.attachments && selectedQuote.attachments.length > 0 && (
                <div className="pt-2">
                  <span className="text-gray-400 block mb-1 font-semibold">المرفقات ({selectedQuote.attachments.length}):</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.attachments.map((att, i) => (
                      <a
                        key={i}
                        href={att}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded bg-[#242424] hover:bg-[#C5A059] hover:text-black text-xs text-[#D8B369] border border-gray-700 transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>فتح المرفق {i + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300">
                ملاحظات المهندس الداخلية:
              </label>
              <textarea
                rows={3}
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="أضف ملاحظات فنية، تاريخ المعاينة، أو تفاصيل التسعير..."
                className="w-full p-3 rounded-xl bg-[#141414] border border-gray-700 text-xs text-white focus:border-[#C5A059] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSaveNote}
                disabled={savingNote}
                className="w-full py-2.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingNote ? 'جاري الحفظ...' : 'حفظ الملاحظة'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

