import { createClient } from '@/lib/supabase/server'
import { ArticleCard } from '@/components/articles/ArticleCard'
import type { Article } from '@/lib/types/database.types'

export const revalidate = 60

export default async function TagPage({ params }: { params: { tag: string } }) {
  const supabase = await createClient()
  const tag = decodeURIComponent(params.tag)

  const { data } = await supabase
    .from('articles')
    .select(`*, category:categories(*), author:profiles(*)`)
    .contains('tags', [tag])
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(24)

  const articles = (data || []) as unknown as Article[]

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold">Tag: {tag}</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
        {articles.length === 0 && (
          <div className="rounded-lg border-2 border-dashed p-12 text-center">No articles for this tag</div>
        )}
      </div>
    </div>
  )
}


