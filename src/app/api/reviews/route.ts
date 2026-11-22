import { NextResponse } from 'next/server';
import { getReviews, createReview } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const showAll = searchParams.get('all') === 'true';

  // If showAll is requested (admin view), return all reviews; otherwise return only approved reviews
  const reviews = await getReviews(!showAll);
  return NextResponse.json({ reviews });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.authorName || !body.comment) {
      return NextResponse.json(
        { error: 'يرجى كتابة الاسم ورأيك الكريم' },
        { status: 400 }
      );
    }

    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));

    // Notice: New reviews submitted by customers ALWAYS default to isApproved: false
    // so the admin has full control to approve them from the dashboard!
    const newReview = await createReview({
      authorName: String(body.authorName).trim(),
      roleAr: body.roleAr ? String(body.roleAr).trim() : 'عميل موثق',
      rating,
      comment: String(body.comment).trim(),
      projectOrProduct: body.projectOrProduct ? String(body.projectOrProduct).trim() : 'خدمات الرخام والجرانيت',
      isApproved: false,
      source: 'website',
    });

    return NextResponse.json({
      success: true,
      message: 'شكراً لمشاركتك رأيك! تم استلام تقييمك وسيظهر على الموقع فور مراجعته واعتماده من الإدارة.',
      review: newReview,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حفظ التقييم' },
      { status: 500 }
    );
  }
}

