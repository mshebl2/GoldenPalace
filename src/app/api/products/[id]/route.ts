import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await updateProduct(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 });
    }
    triggerAutoReindex(['/products', '/']);
    return NextResponse.json({ success: true, product: updated });
  } catch (err) {
    return NextResponse.json({ error: 'فشل تحديث المنتج' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const deleted = await deleteProduct(id);
    if (!deleted) {
      return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 });
    }
    triggerAutoReindex(['/products', '/']);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'فشل حذف المنتج' }, { status: 500 });
  }
}

