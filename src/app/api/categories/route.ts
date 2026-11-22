import { NextResponse } from 'next/server';
import { getCategories, createCategory } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { nameAr, nameEn, slug, order } = body;

    if (!nameAr) {
      return NextResponse.json({ error: 'اسم التصنيف بالعربية مطلوب' }, { status: 400 });
    }

    const generatedSlug = slug || nameEn?.toLowerCase().replace(/\s+/g, '-') || `cat-${Date.now()}`;

    const newCategory = await createCategory({
      nameAr,
      nameEn: nameEn || nameAr,
      slug: generatedSlug,
      order: order || 0,
    });

    return NextResponse.json({ success: true, category: newCategory });
  } catch (err) {
    console.error('Error creating category:', err);
    return NextResponse.json({ error: 'حدث خطأ في إنشاء التصنيف' }, { status: 500 });
  }
}

