import { NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const body = await request.json();
  const updated = await updateSiteSettings(body);
  
  // Instant search engine ping & cache revalidation
  triggerAutoReindex(['/', '/about', '/contact']);

  return NextResponse.json({ success: true, settings: updated });
}
