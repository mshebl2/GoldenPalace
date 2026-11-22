import { NextResponse } from 'next/server';
import { getCategoryById, updateCategory, deleteCategory } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const category = await getCategoryById(id);
  if (!category) {
    return NextResponse.json({ error: 'التصنيف غير موجود' }, { status: 404 });
  }
  return NextResponse.json({ category });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await updateCategory(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'التصنيف غير موجود' }, { status: 404 });
    }
    return NextResponse.json({ success: true, category: updated });
  } catch (err) {
    return NextResponse.json({ error: 'فشل تحديث التصنيف' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const deleted = await deleteCategory(id);
    if (!deleted) {
      return NextResponse.json({ error: 'التصنيف غير موجود' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'فشل حذف التصنيف' }, { status: 500 });
  }
}

