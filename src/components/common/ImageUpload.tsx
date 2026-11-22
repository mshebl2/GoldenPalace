'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'رفع صورة من جهازك',
  helperText = 'الصيغ المدعومة: PNG, JPG, WebP بحجم أقصى 15 ميجابايت',
  aspectRatio = 'video',
  className = '',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('يرجى اختيار ملف صورة صالح (PNG, JPG, WebP)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('حجم الصورة كبير جداً (الحد الأقصى 15 ميجابايت)');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || 'فشل رفع الصورة');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال أثناء رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square max-w-[200px]';
      case 'wide':
        return 'aspect-[21/9]';
      case 'auto':
        return 'min-h-[160px]';
      case 'video':
      default:
        return 'aspect-[16/9] max-w-[380px]';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-gray-300">
          {label}
        </label>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        onChange={onInputChange}
        className="hidden"
      />

      {value ? (
        /* Image Preview Box with Controls */
        <div className="relative group rounded-2xl overflow-hidden border border-[#C5A059]/40 bg-[#161514] shadow-md p-2">
          <div className={`relative rounded-xl overflow-hidden bg-black/50 ${getAspectClass()} mx-auto`}>
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full h-full object-contain"
            />

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-3.5 py-1.5 rounded-xl bg-[#C5A059] text-black font-bold text-xs hover:bg-[#D8B369] transition-all flex items-center gap-1.5 shadow-lg"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>تغيير الصورة</span>
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
                disabled={uploading}
                className="p-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-all shadow-lg"
                title="حذف الصورة"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 px-1">
            <span className="truncate max-w-[200px]" dir="ltr">{value}</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <Check className="w-3 h-3" /> تم الاعتماد
            </span>
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all p-6 text-center flex flex-col items-center justify-center gap-2.5 ${
            dragOver
              ? 'border-[#C5A059] bg-[#C5A059]/10'
              : 'border-gray-700 hover:border-[#C5A059]/60 bg-[#161514] hover:bg-[#1E1D1B]'
          } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
              <span className="text-xs font-bold text-[#E8CD8C]">جاري رفع الصورة من جهازك...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] shadow-inner">
                <Upload className="w-5 h-5" />
              </div>

              <div>
                <span className="text-xs font-bold text-white block">
                  اضغط لاختيار صورة من جهازك، أو اسحب الملف هنا
                </span>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  {helperText}
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 font-medium pt-1">
          {error}
        </p>
      )}
    </div>
  );
};

