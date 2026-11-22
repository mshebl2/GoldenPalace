import { NextResponse } from 'next/server';
import { getMachineById, updateMachine, deleteMachine } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const machine = await getMachineById(id);
  if (!machine) {
    return NextResponse.json({ error: 'الماكينة غير موجودة' }, { status: 404 });
  }
  return NextResponse.json({ machine });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const body = await request.json();
    const updated = await updateMachine(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'الماكينة غير موجودة' }, { status: 404 });
    }
    triggerAutoReindex(['/', '/about']);
    return NextResponse.json({ success: true, machine: updated });
  } catch (err) {
    return NextResponse.json({ error: 'فشل تحديث بيانات الماكينة' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const deleted = await deleteMachine(id);
    if (!deleted) {
      return NextResponse.json({ error: 'الماكينة غير موجودة' }, { status: 404 });
    }
    triggerAutoReindex(['/', '/about']);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'فشل حذف الماكينة' }, { status: 500 });
  }
}

