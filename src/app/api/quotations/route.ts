import { NextResponse } from 'next/server';
import { getQuotations, createQuotation } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

const quoteRequestSchema = z.object({
  customerName: z.string().min(2, 'الاسم مطلوب'),
  phone: z.string().min(8, 'رقم الجوال غير صحيح'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  city: z.string().optional().default('الرياض'),
  projectLocation: z.string().optional().default('الرياض'),
  requiredService: z.string().min(1, 'الخدمة مطلوبة'),
  projectType: z.string().min(1, 'نوع المشروع مطلوب'),
  approximateArea: z.string().optional(),
  materialPreferences: z.string().optional(),
  description: z.string().min(5, 'يرجى كتابة وصف موجز للمشروع'),
  attachments: z.array(z.string()).optional().default([]),
  preferredContact: z.enum(['phone', 'whatsapp', 'email']).default('phone'),
});

// GET quotations (Admin only)
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 });
  }

  const quotes = await getQuotations();
  return NextResponse.json({ quotations: quotes });
}

// POST quotation (Public)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = quoteRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'بيانات غير مكتملة', details: result.error.errors },
        { status: 400 }
      );
    }

    const newQuote = await createQuotation({
      ...result.data,
      attachments: result.data.attachments || [],
      internalNotes: '',
    });

    return NextResponse.json({
      success: true,
      referenceNumber: newQuote.referenceNumber,
      quotation: newQuote,
    });
  } catch (error) {
    console.error('Error creating quotation:', error);
    return NextResponse.json({ error: 'تعذر إرسال الطلب' }, { status: 500 });
  }
}

