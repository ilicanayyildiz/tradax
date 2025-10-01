import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, Bitcoin, DollarSign, BookOpen, Briefcase } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { getRandomImage } from '@/lib/constants/images'
import type { Category } from '@/lib/types/database.types'

const categories: (Category & { count: number; color: string })[] = [
  {
    id: '1',
    name: 'Forex',
    slug: 'forex',
    description: 'Foreign exchange market news, analysis, and trading strategies',
    icon: 'DollarSign',
    created_at: new Date().toISOString(),
    count: 145,
    color: 'text-blue-600',
  },
  {
    id: '2',
    name: 'Crypto',
    slug: 'crypto',
    description: 'Cryptocurrency news, market updates, and blockchain technology',
    icon: 'Bitcoin',
    created_at: new Date().toISOString(),
    count: 98,
    color: 'text-orange-600',
  },
  {
    id: '3',
    name: 'Commodities',
    slug: 'commodities',
    description: 'Gold, oil, and other commodities trading insights',
    icon: 'TrendingUp',
    created_at: new Date().toISOString(),
    count: 67,
    color: 'text-green-600',
  },
  {
    id: '4',
    name: 'Stock Market',
    slug: 'stock-market',
    description: 'Stock market news, company analysis, and investment strategies',
    icon: 'Briefcase',
    created_at: new Date().toISOString(),
    count: 123,
    color: 'text-purple-600',
  },
  {
    id: '5',
    name: 'Education',
    slug: 'education',
    description: 'Trading education, tutorials, and learning resources',
    icon: 'BookOpen',
    created_at: new Date().toISOString(),
    count: 89,
    color: 'text-pink-600',
  },
]

const iconMap = {
  DollarSign,
  Bitcoin,
  TrendingUp,
  Briefcase,
  BookOpen,
}

export const metadata = {
  title: 'Categories',
  description: 'Browse articles by category',
}

export default function CategoriesPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Categories</h1>
        <p className="mt-2 text-navy-600 dark:text-navy-400">
          Explore articles organized by topic
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap]
          const categoryImages: Record<string, 'forex' | 'crypto' | 'commodities' | 'stockMarket' | 'education'> = {
            'forex': 'forex',
            'crypto': 'crypto',
            'commodities': 'commodities',
            'stock-market': 'stockMarket',
            'education': 'education',
          }
          
          return (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
                {/* Category Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={getRandomImage(categoryImages[category.slug] || 'forex')}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Icon className={`h-6 w-6 text-white`} />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold transition-colors group-hover:text-primary-600">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-navy-600 dark:text-navy-400">
                    {category.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-primary-600">
                    {category.count} articles →
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

