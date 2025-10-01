import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Calendar, Eye, ArrowLeft } from 'lucide-react'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { formatDate, getReadingTime } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Article } from '@/lib/types/database.types'
import { Comments } from '@/components/comments/Comments'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  
  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, featured_image')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.excerpt || 'Expert analysis and market insights',
    openGraph: {
      title: article.title,
      description: article.excerpt || 'Expert analysis and market insights',
      images: article.featured_image ? [article.featured_image] : [],
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  
  // Fetch article from Supabase
  const { data: article } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      author:profiles(*)
    `)
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  // If no real article, try mock data
  let typedArticle: Article
  let typedRelated: Article[] = []
  
  if (article) {
    // Real article from Supabase
    typedArticle = article as unknown as Article
    
    // Fetch related articles (same category)
    const { data: relatedArticles } = await supabase
      .from('articles')
      .select(`
        *,
        category:categories(*),
        author:profiles(*)
      `)
      .eq('category_id', article.category_id)
      .eq('is_published', true)
      .neq('id', article.id)
      .limit(3)
    
    typedRelated = (relatedArticles || []) as unknown as Article[]
  } else {
    // Fallback to mock data
    const { getArticleBySlug } = await import('@/lib/article-data')
    const articleData = getArticleBySlug(params.slug)
    
    typedArticle = {
      id: params.slug,
      title: articleData.title,
      slug: params.slug,
      content: articleData.content,
      excerpt: articleData.excerpt,
      featured_image: articleData.image,
      category_id: '1',
      author_id: '1',
      tags: articleData.tags,
      is_featured: false,
      is_published: true,
      views_count: 1250,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      category: { id: '1', name: articleData.category, slug: articleData.category.toLowerCase(), description: null, icon: null, created_at: new Date().toISOString() },
      author: { id: '1', email: 'john@example.com', full_name: 'John Smith', avatar_url: (await import('@/lib/constants/images')).FINANCE_IMAGES.avatars[0], role: 'writer', bio: 'Expert forex trader and analyst', social_links: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    }
  }
  
  const readingTime = getReadingTime(typedArticle.content)

  return (
    <div className="py-12">
      {/* Back Button */}
      <div className="container mb-6">
        <Link href="/articles" className="inline-flex items-center gap-2 text-primary-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>
      </div>

      {/* Article Header */}
      <article className="container max-w-4xl">
        {/* Category */}
        {typedArticle.category && (
          <Link
            href={`/categories/${typedArticle.category.slug}`}
            className="inline-block rounded-full bg-primary-600 px-3 py-1 text-sm font-medium text-white hover:bg-primary-700"
          >
            {typedArticle.category.name}
          </Link>
        )}

        {/* Title */}
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">{typedArticle.title}</h1>

        {/* Meta Information */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-navy-600 dark:text-navy-400">
          {typedArticle.author && (
            <Link href={`/authors/${typedArticle.author.id}`} className="flex items-center gap-2 hover:text-primary-600">
              <User className="h-4 w-4" />
              <span>{typedArticle.author.full_name}</span>
            </Link>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(typedArticle.published_at || typedArticle.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{typedArticle.views_count.toLocaleString()} views</span>
          </div>
        </div>

        {/* Featured Image */}
        {typedArticle.featured_image && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-lg">
            <Image
              src={typedArticle.featured_image}
              alt={typedArticle.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg mt-8 max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: typedArticle.content }}
        />

        {/* Tags */}
        {typedArticle.tags && typedArticle.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {typedArticle.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-full bg-navy-100 px-3 py-1 text-sm hover:bg-primary-100 hover:text-primary-600 dark:bg-navy-800"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Author Bio */}
        {typedArticle.author && (
          <div className="mt-12 rounded-lg border border-navy-200 p-6 dark:border-navy-800">
            <h3 className="text-lg font-semibold">About the Author</h3>
            <div className="mt-4 flex gap-4">
              <div className="h-16 w-16 rounded-full bg-navy-200 dark:bg-navy-700" />
              <div>
                <Link href={`/authors/${typedArticle.author.id}`} className="font-semibold hover:text-primary-600">
                  {typedArticle.author.full_name}
                </Link>
                {typedArticle.author.bio && (
                  <p className="mt-1 text-sm text-navy-600 dark:text-navy-400">
                    {typedArticle.author.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm text-red-900 dark:text-red-200">
            <strong>Disclaimer:</strong> The information provided is for educational purposes only and should not be considered financial advice. Trading involves significant risk of loss.
          </p>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <Comments articleId={typedArticle.id} />
        </div>
      </article>

      {/* Related Articles */}
      {typedRelated && typedRelated.length > 0 && (
        <div className="container mt-16 max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {typedRelated.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

