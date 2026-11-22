import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { getCurrentUser } from '@/lib/auth';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

// Allowed MIME types
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'application/pdf',
]);

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.pdf']);

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'لم يتم تحديد ملف' }, { status: 400 });
    }

    // 1. Strict File Type Validation (MIME & Extension)
    const fileType = file.type ? file.type.toLowerCase() : '';
    const ext = path.extname(file.name || '').toLowerCase();

    if (!ALLOWED_MIME_TYPES.has(fileType) || !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        {
          error: 'نوع الملف غير مدعوم لأسباب أمنية. الأنواع المسموحة فقط: صور (JPG, PNG, WEBP, AVIF) أو مستندات (PDF)',
        },
        { status: 400 }
      );
    }

    // 2. Strict File Size Validation
    const maxSize = user ? 25 * 1024 * 1024 : 10 * 1024 * 1024; // 25MB for admin, 10MB for public customer attachments
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `حجم الملف يتجاوز الحد الأقصى المسموح (${user ? '25' : '10'} ميجابايت)` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Primary: Upload to Cloudinary Storage
    if (cloudName && apiKey && apiSecret) {
      try {
        const targetFolder = user ? 'golden-palace/admin' : 'golden-palace/quotations';
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: targetFolder,
              resource_type: fileType === 'application/pdf' ? 'raw' : 'image',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });

        if (uploadResult && uploadResult.secure_url) {
          return NextResponse.json({
            success: true,
            url: uploadResult.secure_url,
            filename: uploadResult.public_id,
            size: file.size,
            provider: 'cloudinary',
          });
        }
      } catch (cloudErr) {
        console.warn('Cloudinary upload error, attempting local fallback:', cloudErr);
      }
    }

    // 4. Safe Fallback: Local Upload (Guarded against serverless read-only crashes)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const cleanBaseName = path
        .basename(file.name, ext)
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .substring(0, 50);
      const filename = `${Date.now()}_${cleanBaseName}${ext}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
        filename,
        size: file.size,
        provider: 'local',
      });
    } catch (fsErr) {
      console.warn('Local filesystem write failed (likely serverless read-only):', fsErr);
      return NextResponse.json(
        { error: 'تعذر حفظ الملف مؤقتاً، يرجى التحقق من اتصال السحابة' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Upload general error:', error);
    return NextResponse.json({ error: 'فشل رفع الملف' }, { status: 500 });
  }
}
