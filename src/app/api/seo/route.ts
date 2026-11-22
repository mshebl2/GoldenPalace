import { NextResponse } from 'next/server';
import { getSEOSettings, updateSEOSettings } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET() {
  const seo = await getSEOSettings();
  return NextResponse.json({ seo });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  const body = await request.json();
  const updated = await updateSEOSettings(body);

  // Trigger global search engine ping and sitemap revalidation
  triggerAutoReindex(['/', '/products', '/about', '/services', '/materials', '/projects', '/blog', '/contact']);

  return NextResponse.json({ success: true, seo: updated });
}

