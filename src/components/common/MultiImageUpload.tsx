'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Star, Plus, Loader2, Image as ImageIcon } from 'lucide-react';

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  helperText?: string;
}

export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  images,
  onChange,
  label = 'صور المنتج (يمكنك رفع أكثر من صورة)',
  helperText = 'ارفع عدة صور لإظهار تفاصيل المنتج من كافة الزوايا (PNG, JPG, WebP)',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 15 * 1024 * 1024) continue;

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          newUrls.push(data.url);
        }
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    } else {
      setError('تعذر رفع بعض الصور، تأكد من الصيغة والحجم');
    }

    setUploading(false);
  };

  const removeImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const setAsCover = (indexToPromote: number) => {
    if (indexToPromote === 0) return;
    const item = images[indexToPromote];
    const rest = images.filter((_, idx) => idx !== indexToPromote);
    onChange([item, ...rest]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-300">
          {label}
        </label>
        <span className="text-[11px] text-[#C5A059] font-medium font-mono">
          {images.length} صور مرفوعة
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {images.map((url, idx) => (
          <div
            key={`${url}-${idx}`}
            className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-700 bg-[#161514] shadow-sm hover:border-[#C5A059]/60 transition-all"
          >
            <img
              src={url}
              alt={`Product preview ${idx + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Primary Cover Badge on First Image */}
            {idx === 0 && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#C5A059] text-black font-bold text-[10px] shadow-md flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>الغلاف</span>
              </div>
            )}

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-1">
              {idx !== 0 && (
                <button
                  type="button"
                  onClick={() => setAsCover(idx)}
                  className="p-1.5 rounded-xl bg-[#C5A059] text-black text-[11px] font-bold hover:bg-[#D8B369] transition-all shadow"
                  title="تعيين كصورة غلاف رئيسية"
                >
                  <Star className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="p-1.5 rounded-xl bg-red-600/90 text-white hover:bg-red-600 transition-all shadow"
                title="حذف هذه الصورة"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Add More Button Box */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="aspect-square rounded-2xl border-2 border-dashed border-gray-700 hover:border-[#C5A059] bg-[#141414] hover:bg-[#1C1B19] flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:text-white transition-all p-3 text-center"
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-[#C5A059] animate-spin" />
          ) : (
            <>
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#C5A059]">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold">رفع صور من الجهاز</span>
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-gray-400">
        {helperText}
      </p>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

