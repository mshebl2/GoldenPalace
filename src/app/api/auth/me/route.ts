import { NextResponse } from 'next/server';
import { getCurrentUser, hashPassword, verifyPassword, signToken } from '@/lib/auth';
import { getUserById, updateUser } from '@/lib/db';

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ authenticated: false, error: 'غير مسجل الدخول' }, { status: 401 });
  }

  const user = await getUserById(session.userId);
  if (!user || !user.active) {
    return NextResponse.json({ authenticated: false, error: 'المستخدم غير موجود أو غير نشط' }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

export async function PUT(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'غير مصرح به - يجب تسجيل الدخول أولاً' }, { status: 401 });
    }

    const user = await getUserById(session.userId);
    if (!user || !user.active) {
      return NextResponse.json({ error: 'المستخدم غير موجود أو غير نشط' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    const updates: { name?: string; email?: string; passwordHash?: string } = {};

    if (name && typeof name === 'string') {
      updates.name = name.trim();
    }

    if (email && typeof email === 'string' && email.includes('@')) {
      updates.email = email.trim().toLowerCase();
    }

    // Changing password requires strict verification of current password
    if (newPassword && typeof newPassword === 'string') {
      if (!currentPassword || typeof currentPassword !== 'string') {
        return NextResponse.json(
          { error: 'يجب إدخال كلمة المرور الحالية لتغيير كلمة المرور' },
          { status: 400 }
        );
      }

      const isMatch = await verifyPassword(currentPassword, user.passwordHash);
      if (!isMatch) {
        return NextResponse.json(
          { error: 'كلمة المرور الحالية غير صحيحة' },
          { status: 400 }
        );
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { error: 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل' },
          { status: 400 }
        );
      }

      updates.passwordHash = await hashPassword(newPassword);
    }

    const updated = await updateUser(user.id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'فشل تحديث البيانات' }, { status: 500 });
    }

    // Issue updated token
    const token = signToken({
      userId: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    });

    const response = NextResponse.json({
      success: true,
      message: 'تم تحديث بيانات الحساب وكلمة المرور بنجاح',
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
      },
    });

    response.cookies.set('eet_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
