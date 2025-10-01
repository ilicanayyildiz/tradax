import Link from 'next/link'
import { User, Twitter, Linkedin, Globe, Mail, Calendar } from 'lucide-react'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { formatDate } from '@/lib/utils'
import { FINANCE_IMAGES } from '@/lib/constants/images'
import type { Profile, Article } from '@/lib/types/database.types'

// Helpers to build diverse mock data per author
function getAuthorById(id: string): Profile {
  const authorIndex = Math.max(0, (parseInt(id, 10) || 1) - 1)
  const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Davis', 'James Wilson', 'Olivia Martinez']
  const bios = [
    'Expert FX analyst focusing on G10 currencies and macro trends.',
    'Crypto strategist covering Bitcoin, Ethereum and DeFi.',
    'Commodities specialist with emphasis on gold and oil.',
    'Equities analyst covering S&P 500 and tech sector.',
    'Macro researcher focused on central banks and rates.',
    'Education writer simplifying trading concepts for beginners.',
  ]
  const name = names[authorIndex % names.length]
  const bio = bios[authorIndex % bios.length]
  return {
    id,
    email: `${name.split(' ')[0].toLowerCase()}@example.com`,
    full_name: name,
    avatar_url: FINANCE_IMAGES.avatars[authorIndex % FINANCE_IMAGES.avatars.length],
    role: 'writer',
    bio,
    social_links: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://linkedin.com/',
      website: 'https://example.com',
    },
    created_at: new Date('2021-01-01').toISOString(),
    updated_at: new Date().toISOString(),
  }
}

function buildArticlesForAuthor(author: Profile): Article[] {
  // Assign a base category per author to diversify
  const categories = [
    { slug: 'forex', name: 'Forex', images: FINANCE_IMAGES.forex },
    { slug: 'crypto', name: 'Crypto', images: FINANCE_IMAGES.crypto },
    { slug: 'commodities', name: 'Commodities', images: FINANCE_IMAGES.commodities },
    { slug: 'stock-market', name: 'Stock Market', images: FINANCE_IMAGES.stockMarket },
    { slug: 'education', name: 'Education', images: FINANCE_IMAGES.education },
    { slug: 'forex', name: 'Forex', images: FINANCE_IMAGES.forex },
  ]
  const authorIdx = Math.max(0, (parseInt(author.id, 10) || 1) - 1)
  const base = categories[authorIdx % categories.length]

  const titleSets: string[][] = [
    ['EUR/USD Outlook', 'GBP/USD Levels', 'USD/JPY Movers', 'Trend Following Guide', 'Breakout Strategy', 'Risk Management 101'],
    ['Bitcoin Analysis', 'Ethereum Update', 'Altcoin Season?', 'DeFi Trends', 'On-chain Signals', 'Crypto Risk Guide'],
    ['Gold Forecast', 'Oil Market Update', 'Silver Insights', 'Commodity Cycles', 'Inflation Hedge?', 'Safe Haven Flows'],
    ['S&P 500 Levels', 'Nasdaq Rally', 'Dow Jones Watch', 'Earnings Preview', 'Tech Momentum', 'Market Breadth'],
    ['Pips Explained', 'Leverage Basics', 'Position Sizing', 'Trading Psychology', 'Backtesting 101', 'Chart Patterns'],
    ['FX Correlations', 'Carry Trade', 'Price Action Tips', 'News Trading', 'Swing vs Day', 'Risk:Reward Setup'],
  ]
  const titles = titleSets[authorIdx % titleSets.length]

  return Array.from({ length: 6 }, (_, i) => {
    const img = base.images[i % base.images.length]
    const id = `${author.id}-${i + 1}`
    return {
      id,
      title: titles[i % titles.length],
      slug: `author-${author.id}-article-${i + 1}`,
      content: 'Content coming soon... ',
      excerpt: 'A concise summary of the analysis and key takeaways.',
      featured_image: img,
      category_id: String((authorIdx % 5) + 1),
      author_id: author.id,
      tags: [base.name.toLowerCase()],
      is_featured: i === 0,
      is_published: true,
      views_count: 500 + Math.floor(Math.random() * 5000),
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      published_at: new Date(Date.now() - i * 86400000).toISOString(),
      category: { id: String((authorIdx % 5) + 1), name: base.name, slug: base.slug, description: null, icon: null, created_at: new Date().toISOString() },
      author,
    }
  })
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const a = getAuthorById(params.id)
  return {
    title: `${a.full_name} - Author`,
    description: a.bio || `Articles by ${a.full_name}`,
  }
}

export default function AuthorPage({ params }: { params: { id: string } }) {
  const a = getAuthorById(params.id)
  const articles = buildArticlesForAuthor(a)
  return (
    <div className="py-12">
      {/* Author Header */}
      <div className="border-b border-navy-200 bg-navy-50 dark:border-navy-800 dark:bg-navy-950">
        <div className="container py-12">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Avatar */}
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/20">
              {a.avatar_url ? (
                <img
                  src={a.avatar_url}
                  alt={a.full_name || ''}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="h-16 w-16" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold">{a.full_name}</h1>
              <span className="mt-2 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
                {a.role}
              </span>
              
              {a.bio && (
                <p className="mt-4 max-w-2xl text-navy-600 dark:text-navy-400">
                  {a.bio}
                </p>
              )}

              {/* Stats */}
              <div className="mt-6 flex flex-wrap justify-center gap-6 md:justify-start">
                <div>
                  <p className="text-2xl font-bold">{articles.length}</p>
                  <p className="text-sm text-navy-600 dark:text-navy-400">Articles</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {articles.reduce((sum, art) => sum + art.views_count, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-navy-600 dark:text-navy-400">Total Views</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-400">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(a.created_at)}</span>
                </div>
              </div>

              {/* Social Links - Disabled (coming soon) */}
              {a.social_links && (
                <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
                  {a.social_links.twitter && (
                    <div className="flex items-center gap-2 text-navy-400 dark:text-navy-600 cursor-not-allowed opacity-50" title="Coming soon">
                      <Twitter className="h-4 w-4" />
                      <span className="text-sm">Twitter</span>
                    </div>
                  )}
                  {a.social_links.linkedin && (
                    <div className="flex items-center gap-2 text-navy-400 dark:text-navy-600 cursor-not-allowed opacity-50" title="Coming soon">
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm">LinkedIn</span>
                    </div>
                  )}
                  {a.social_links.website && (
                    <div className="flex items-center gap-2 text-navy-400 dark:text-navy-600 cursor-not-allowed opacity-50" title="Coming soon">
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">Website</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-navy-400 dark:text-navy-600 cursor-not-allowed opacity-50" title="Coming soon">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Email</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="container mt-12">
        <h2 className="mb-6 text-2xl font-bold">Articles by {a.full_name}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

