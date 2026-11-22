import { NextResponse } from 'next/server';
import { POST as handleQuotationsPost, GET as handleQuotationsGet } from '../quotations/route';

// Alias route: forwards /api/quotation to /api/quotations seamlessly
export async function POST(request: Request) {
  return handleQuotationsPost(request);
}

export async function GET(request: Request) {
  return handleQuotationsGet();
}

