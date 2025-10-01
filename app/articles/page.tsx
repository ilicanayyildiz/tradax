import { ArticleCard } from '@/components/articles/ArticleCard'
import { CategorySidebar } from '@/components/home/CategorySidebar'
import { createClient } from '@/lib/supabase/server'
import { FINANCE_IMAGES } from '@/lib/constants/images'
import type { Article } from '@/lib/types/database.types'

export const metadata = {
  title: 'Articles',
  description: 'Browse all financial market articles, news, and analysis',
}

export const revalidate = 60 // Revalidate every 60 seconds

// Mock data as fallback
const mockArticles: Article[] = Array.from({ length: 12 }, (_, i) => {
  const titles = ['Forex Trading Strategies', 'Bitcoin Market Analysis', 'Gold Price Forecast', 'Stock Market Update', 'Crypto Trends', 'EUR/USD Analysis']
  const images = [
    FINANCE_IMAGES.forex[0], FINANCE_IMAGES.crypto[0], FINANCE_IMAGES.commodities[0],
    FINANCE_IMAGES.stockMarket[0], FINANCE_IMAGES.crypto[1], FINANCE_IMAGES.forex[1],
    FINANCE_IMAGES.forex[2], FINANCE_IMAGES.crypto[2], FINANCE_IMAGES.commodities[1],
    FINANCE_IMAGES.stockMarket[1], FINANCE_IMAGES.crypto[3], FINANCE_IMAGES.forex[3],
  ]
  
  return {
    id: `mock-${i + 1}`,
    title: `${titles[i % 6]}`,
    slug: `article-${i + 1}`,
    content: 'Sample content...',
    excerpt: 'This is a sample article for demonstration purposes.',
    featured_image: images[i],
    category_id: '1',
    author_id: '1',
    tags: ['forex', 'trading'],
    is_featured: false,
    is_published: true,
    views_count: Math.floor(Math.random() * 1000),
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date(Date.now() - i * 86400000).toISOString(),
    category: { id: '1', name: 'Forex', slug: 'forex', description: null, icon: null, created_at: new Date().toISOString() },
    author: { id: '1', email: 'john@example.com', full_name: 'John Smith', avatar_url: FINANCE_IMAGES.avatars[0], role: 'writer', bio: null, social_links: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  }
})

export default async function ArticlesPage() {
  const supabase = await createClient()
  
  // Fetch real articles from Supabase
  const { data: realArticles } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      author:profiles(*)
    `)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(12)
  
  // Combine real articles with mock data (real articles first)
  const articles = realArticles && realArticles.length > 0 
    ? [...realArticles, ...mockArticles].slice(0, 12) 
    : mockArticles
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">All Articles</h1>
        <p className="mt-2 text-navy-600 dark:text-navy-400">
          Explore the latest news, analysis, and insights from financial markets
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Articles Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-navy-600 dark:text-navy-400">
              Showing {articles?.length || 0} articles
            </p>
            <select className="input w-auto">
              <option>Latest</option>
              <option>Most Popular</option>
              <option>Oldest</option>
            </select>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article as Article} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <CategorySidebar />
        </aside>
      </div>
    </div>
  )
}

