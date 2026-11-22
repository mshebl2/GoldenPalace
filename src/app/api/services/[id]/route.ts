import { NextResponse } from 'next/server';
import { updateService, deleteService } from '@/lib/db';
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
  const updated = await updateService(id, body);
  triggerAutoReindex(['/services', '/']);
  return NextResponse.json({ success: true, service: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = await params;
  const deleted = await deleteService(id);
  triggerAutoReindex(['/services', '/']);
  return NextResponse.json({ success: deleted });
}

