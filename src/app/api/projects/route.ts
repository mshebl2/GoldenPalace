import { NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  const body = await request.json();
  const created = await createProject(body);
  return NextResponse.json({ success: true, project: created });
}

