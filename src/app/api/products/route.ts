import { NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { triggerAutoReindex } from '@/lib/indexing';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('category');
  const q = searchParams.get('q');

  let products = await getProducts();

  if (categoryId && categoryId !== 'all') {
    products = products.filter((p) => p.categoryId === categoryId);
  }

  if (q && q.trim()) {
    const query = q.toLowerCase().trim();
    products = products.filter(
      (p) =>
        p.titleAr?.toLowerCase().includes(query) ||
        p.titleEn?.toLowerCase().includes(query) ||
        p.categoryAr?.toLowerCase().includes(query) ||
        p.materialAr?.toLowerCase().includes(query) ||
        p.descriptionAr?.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      titleAr,
      titleEn,
      slug,
      categoryId,
      categoryAr,
      categoryEn,
      materialAr,
      materialEn,
      descriptionAr,
      descriptionEn,
      coverImage,
      gallery,
      specsAr,
      specsEn,
      dimensionsAr,
      dimensionsEn,
      featured,
      order,
      price,
      showPrice,
      priceUnitAr,
      priceUnitEn,
    } = body;

    if (!titleAr) {
      return NextResponse.json({ error: 'اسم المنتج بالعربية مطلوب' }, { status: 400 });
    }

    const generatedSlug =
      slug ||
      titleEn?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ||
      `prod-${Date.now()}`;

    const finalGallery = Array.isArray(gallery) && gallery.length > 0 ? gallery : coverImage ? [coverImage] : [];
    const finalCover = coverImage || finalGallery[0] || '/images/products/tables-3.webp';

    const newProduct = await createProduct({
      slug: generatedSlug,
      titleAr,
      titleEn: titleEn || titleAr,
      categoryId: categoryId || 'cat-general',
      categoryAr: categoryAr || 'منتجات عامة',
      categoryEn: categoryEn || 'General Products',
      materialAr: materialAr || 'رخام طبيعي نخب أول',
      materialEn: materialEn || 'Natural Marble',
      descriptionAr: descriptionAr || '',
      descriptionEn: descriptionEn || '',
      coverImage: finalCover,
      gallery: finalGallery,
      specsAr: specsAr || [],
      specsEn: specsEn || [],
      dimensionsAr: dimensionsAr || '',
      dimensionsEn: dimensionsEn || '',
      featured: !!featured,
      order: order || 0,
      price: price ?? '',
      showPrice: typeof showPrice === 'boolean' ? showPrice : false,
      priceUnitAr: priceUnitAr || 'ر.س',
      priceUnitEn: priceUnitEn || 'SAR',
    });

    triggerAutoReindex(['/products', '/']);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    console.error('Error creating product:', err);
    return NextResponse.json({ error: 'حدث خطأ في إنشاء المنتج' }, { status: 500 });
  }
}

