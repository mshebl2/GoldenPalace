import { NextResponse } from 'next/server';
import { updateReview, deleteReview } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updated = await updateReview(id, body);
  if (!updated) {
    return NextResponse.json({ error: 'التقييم غير موجود' }, { status: 404 });
  }

  return NextResponse.json({ success: true, review: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteReview(id);
  if (!deleted) {
    return NextResponse.json({ error: 'التقييم غير موجود' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'تم حذف التقييم بنجاح' });
}

