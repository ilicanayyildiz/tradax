import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    // Subscribe to newsletter
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
          is_active: true,
        },
      ])

    if (error) {
      console.error('Newsletter subscription error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    // Log subscription (no email needed)
    console.log('✅ New newsletter subscription:', email, 'at', new Date().toISOString())

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
    })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// Email template is available in EMAIL_SETUP.md if needed in the future

