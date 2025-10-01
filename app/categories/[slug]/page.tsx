import Image from 'next/image'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { DollarSign } from 'lucide-react'
import { getRandomImage, FINANCE_IMAGES } from '@/lib/constants/images'
import type { Article } from '@/lib/types/database.types'

// Mock data
const category = {
  id: '1',
  name: 'Forex',
  slug: 'forex',
  description: 'Foreign exchange market news, analysis, and trading strategies',
  icon: 'DollarSign',
  created_at: new Date().toISOString(),
}

const articleTitles = ['EUR/USD Analysis', 'GBP/USD Forecast', 'USD/JPY Update', 'Trading Strategies', 'Market News']

// Her makale için farklı görsel (forex koleksiyonundan sırayla)
const forexImages = FINANCE_IMAGES.forex

const articles: Article[] = Array.from({ length: 12 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Forex Article ${i + 1}: ${articleTitles[i % 5]}`,
  slug: `forex-article-${i + 1}`,
  content: 'Full content...',
  excerpt: 'Brief excerpt about this forex article.',
  featured_image: forexImages[i % forexImages.length], // Sırayla farklı görseller
  category_id: '1',
  author_id: '1',
  tags: ['forex', 'trading'],
  is_featured: false,
  is_published: true,
  views_count: Math.floor(Math.random() * 1000),
  created_at: new Date(Date.now() - i * 86400000).toISOString(),
  updated_at: new Date().toISOString(),
  published_at: new Date(Date.now() - i * 86400000).toISOString(),
  category: category,
  author: { id: '1', email: 'john@example.com', full_name: 'John Smith', avatar_url: FINANCE_IMAGES.avatars[0], role: 'writer', bio: null, social_links: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
}))

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${category.name} Articles`,
    description: category.description,
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div className="py-12">
      {/* Category Header with Background Image */}
      <div className="relative border-b border-navy-200 bg-gradient-to-br from-primary-600 to-primary-700 dark:border-navy-800">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={getRandomImage('forex')}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-700/90" />
        </div>

        <div className="container relative py-16">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-white/20 p-4 backdrop-blur-sm">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
              <p className="mt-2 text-xl text-primary-100">
                {category.description}
              </p>
              <p className="mt-4 text-primary-200">
                {articles.length} articles in this category
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="container mt-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-navy-600 dark:text-navy-400">
            Showing {articles.length} articles
          </p>
          <select className="input w-auto">
            <option>Latest</option>
            <option>Most Popular</option>
            <option>Oldest</option>
          </select>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
