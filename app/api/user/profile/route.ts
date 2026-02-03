import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { name, company, email } = await request.json();

    // Check if email is being changed and if it's already taken
    if (email && email !== session.user.email) {
      const { data: existing } = await supabaseAdmin
        .from('social0n_users')
        .select('id')
        .eq('email', email.toLowerCase())
        .neq('id', session.user.id)
        .single();

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Email is already in use' },
          { status: 400 }
        );
      }
    }

    const { error } = await supabaseAdmin
      .from('social0n_users')
      .update({
        name: name || session.user.name,
        company: company || null,
        email: email ? email.toLowerCase() : session.user.email,
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.user.id);

    if (error) {
      console.error('Error updating profile:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
