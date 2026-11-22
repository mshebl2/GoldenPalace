import { NextResponse } from 'next/server';
import { getMachinery, createMachine } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET() {
  const machines = await getMachinery();
  return NextResponse.json({ machinery: machines });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      nameAr,
      nameEn,
      badgeAr,
      badgeEn,
      taglineAr,
      taglineEn,
      image,
      detailImage,
      isRealWorkshop,
      featuresAr,
      featuresEn,
      specs,
      order,
    } = body;

    if (!nameAr || !image) {
      return NextResponse.json(
        { error: 'اسم الماكينة بالعربية وصورة الماكينة مطلوبان' },
        { status: 400 }
      );
    }

    const newMachine = await createMachine({
      nameAr,
      nameEn: nameEn || nameAr,
      badgeAr: badgeAr || 'ماكينات ومعدات المصنع',
      badgeEn: badgeEn || 'Factory Machinery',
      taglineAr: taglineAr || '',
      taglineEn: taglineEn || '',
      image,
      detailImage: detailImage || '',
      isRealWorkshop: !!isRealWorkshop,
      featuresAr: featuresAr || [],
      featuresEn: featuresEn || [],
      specs: specs || {
        bladeDiameter: '',
        mainMotor: '',
        tableSize: '',
        tiltingDegree: '',
        rotatingDegree: '',
        maxCuttingSize: '',
        waterConsumption: '',
        weight: '',
      },
      order: order || 0,
    });

    triggerAutoReindex(['/', '/about']);
    return NextResponse.json({ success: true, machine: newMachine });
  } catch (err) {
    console.error('Error creating machine:', err);
    return NextResponse.json({ error: 'حدث خطأ في إنشاء الماكينة' }, { status: 500 });
  }
}

