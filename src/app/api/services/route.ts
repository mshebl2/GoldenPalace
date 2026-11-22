import { NextResponse } from 'next/server';
import { getServices, createService } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET() {
  const services = await getServices();
  return NextResponse.json({ services });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const body = await request.json();
  const created = await createService(body);
  triggerAutoReindex(['/services', `/services/${created.slug}`, '/']);
  return NextResponse.json({ success: true, service: created });
}

