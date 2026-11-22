import { NextResponse } from 'next/server';
import { getArticles, getAllArticlesAdmin, createArticle } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get('admin') === 'true';

  if (isAdmin) {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    const all = await getAllArticlesAdmin();
    return NextResponse.json({ articles: all });
  }

  const articles = await getArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const body = await request.json();
  const created = await createArticle(body);
  triggerAutoReindex(['/blog', `/blog/${created.slug}`, '/']);
  return NextResponse.json({ success: true, article: created });
}

