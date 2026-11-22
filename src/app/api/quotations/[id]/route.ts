import { NextResponse } from 'next/server';
import { updateQuotation, getQuotationById } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updated = await updateQuotation(id, body);
  if (!updated) {
    return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 });
  }

  return NextResponse.json({ success: true, quotation: updated });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }
  const { id } = await params;
  const quote = await getQuotationById(id);
  if (!quote) return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
  return NextResponse.json({ quotation: quote });
}

