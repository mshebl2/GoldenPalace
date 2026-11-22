import { NextResponse } from 'next/server';
import { updateArticle, deleteArticle } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const updated = await updateArticle(id, body);
  triggerAutoReindex(['/blog', '/']);
  return NextResponse.json({ success: true, article: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = await params;
  const deleted = await deleteArticle(id);
  triggerAutoReindex(['/blog', '/']);
  return NextResponse.json({ success: deleted });
}

