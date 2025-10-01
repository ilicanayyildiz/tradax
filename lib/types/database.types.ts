export type UserRole = 'admin' | 'editor' | 'writer' | 'reader'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  bio: string | null
  social_links: {
    twitter?: string
    linkedin?: string
    website?: string
  } | null
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  category_id: string
  author_id: string
  tags: string[]
  is_featured: boolean
  is_published: boolean
  views_count: number
  created_at: string
  updated_at: string
  published_at: string | null
  category?: Category
  author?: Profile
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  created_at: string
}

export interface Comment {
  id: string
  article_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  user?: Profile
}

export interface Newsletter {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
}

