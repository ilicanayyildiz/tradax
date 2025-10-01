import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// GET /api/comments?articleId=...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('articleId')
    if (!articleId) {
      return NextResponse.json({ success: false, error: 'Missing articleId' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('comments')
      .select('id, content, created_at, author:profiles(id, full_name, avatar_url)')
      .eq('article_id', articleId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

// POST /api/comments  { articleId, content }
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { articleId, content } = body || {}
    if (!articleId || !content || String(content).trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({ article_id: articleId, author_id: user.id, content })
      .select('id, content, created_at, author:profiles(id, full_name, avatar_url)')
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}


