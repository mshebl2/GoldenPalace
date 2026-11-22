import { NextResponse } from 'next/server';
import { updateMaterial, deleteMaterial } from '@/lib/db';
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
  const updated = await updateMaterial(id, body);
  triggerAutoReindex(['/materials', '/']);
  return NextResponse.json({ success: true, material: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = await params;
  const deleted = await deleteMaterial(id);
  triggerAutoReindex(['/materials', '/']);
  return NextResponse.json({ success: deleted });
}

