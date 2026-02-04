import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { hashPassword, createSession, setSessionCookie } from '@/lib/auth';
import { createGHLClient } from '@/lib/ghl/client';

export async function POST(request: NextRequest) {
  try {
    const { name, company, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: existing } = await supabaseAdmin
      .from('social0n_users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Create user
    const passwordHash = await hashPassword(password);
    const { data: user, error } = await supabaseAdmin
      .from('social0n_users')
      .insert({
        name,
        company: company || null,
        email: email.toLowerCase(),
        password_hash: passwordHash,
      })
      .select('id')
      .single();

    if (error || !user) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Create session
    const sessionToken = await createSession(user.id);
    await setSessionCookie(sessionToken);

    // Optional: Create GHL contact on signup
    if (process.env.GHL_LOCATION_PIT && process.env.GHL_LOCATION_ID) {
      try {
        const ghl = createGHLClient(process.env.GHL_LOCATION_PIT, process.env.GHL_LOCATION_ID);
        await ghl.createContact({
          email: email.toLowerCase(),
          name,
          tags: ['social0n_signup'],
          source: 'social0n',
          customFields: company ? { company } : undefined,
        });
      } catch (ghlError) {
        console.error('GHL contact create error:', ghlError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
