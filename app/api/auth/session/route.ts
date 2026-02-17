import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { isVipUser } from '@/lib/access';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: session.user,
      is_vip: isVipUser(session.user),
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
