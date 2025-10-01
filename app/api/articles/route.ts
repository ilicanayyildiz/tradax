import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { slugify } from '@/lib/utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') || '50'

    const supabase = await createClient()
    
    let query = supabase
      .from('articles')
      .select(`
        *,
        category:categories(*),
        author:profiles(*)
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(parseInt(limit))

    if (category) {
      query = query.eq('category_id', category)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Get articles error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !['admin', 'editor', 'writer'].includes(profile.role)) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, content, excerpt, featured_image, category_id, tags, is_published } = body

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = slugify(title)

    // Create article
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          slug,
          content,
          excerpt,
          featured_image,
          category_id,
          author_id: user.id,
          tags: tags || [],
          is_published: is_published || false,
          published_at: is_published ? new Date().toISOString() : null,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Create article error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

