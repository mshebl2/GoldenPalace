import { NextResponse } from 'next/server';
import { getMaterials, createMaterial } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET() {
  const materials = await getMaterials();
  return NextResponse.json({ materials });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const body = await request.json();
  const created = await createMaterial(body);
  triggerAutoReindex(['/materials', `/materials/${created.slug}`, '/']);
  return NextResponse.json({ success: true, material: created });
}

