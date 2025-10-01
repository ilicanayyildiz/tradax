import { ArticleCard } from '@/components/articles/ArticleCard'
import { Ticker } from '@/components/home/Ticker'
import { Hero } from '@/components/home/Hero'
import { CategorySidebar } from '@/components/home/CategorySidebar'
import { FINANCE_IMAGES, getRandomImage } from '@/lib/constants/images'
import type { Article } from '@/lib/types/database.types'

// Mock data - will be replaced with actual Supabase queries
const featuredArticle: Article = {
  id: '1',
  title: 'EUR/USD Technical Analysis: Key Levels to Watch This Week',
  slug: 'eur-usd-technical-analysis-key-levels',
  content: 'Full article content...',
  excerpt: 'The EUR/USD pair shows strong momentum as it approaches critical resistance levels. Here\'s what traders need to know.',
  featured_image: FINANCE_IMAGES.forex[0], // Gerçek forex görseli
  category_id: '1',
  author_id: '1',
  tags: ['forex', 'EUR/USD', 'technical-analysis'],
  is_featured: true,
  is_published: true,
  views_count: 1250,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  published_at: new Date().toISOString(),
  category: { id: '1', name: 'Forex', slug: 'forex', description: null, icon: null, created_at: new Date().toISOString() },
  author: { id: '1', email: 'john@example.com', full_name: 'John Smith', avatar_url: FINANCE_IMAGES.avatars[0], role: 'writer', bio: null, social_links: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
}

const latestArticles: Article[] = Array.from({ length: 6 }, (_, i) => {
  const titles = ['Bitcoin Reaches New Highs', 'Gold Price Forecast', 'Stock Market Update', 'Crypto Trading Tips', 'Forex Strategy Guide', 'Commodities Outlook']
  const images = [
    getRandomImage('crypto'),      // Bitcoin
    getRandomImage('commodities'), // Gold
    getRandomImage('stockMarket'), // Stock Market
    getRandomImage('crypto'),      // Crypto Tips
    getRandomImage('forex'),       // Forex Strategy
    getRandomImage('commodities'), // Commodities
  ]
  
  return {
    ...featuredArticle,
    id: (i + 2).toString(),
    title: `Market Analysis: ${titles[i]}`,
    slug: `article-${i + 2}`,
    featured_image: images[i],
    is_featured: false,
  }
})

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Ticker */}
      <Ticker />

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left Column - Articles */}
          <div className="space-y-12">
            {/* Featured Article */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold">Featured Article</h2>
              </div>
              <ArticleCard article={featuredArticle} featured />
            </section>

            {/* Latest Articles */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold">Latest Articles</h2>
                <a href="/articles" className="text-primary-600 hover:text-primary-700">
                  View All →
                </a>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <CategorySidebar />
          </aside>
        </div>
      </div>
    </div>
  )
}

