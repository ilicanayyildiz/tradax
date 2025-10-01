import Link from 'next/link'
import { TrendingUp, Bitcoin, DollarSign, BookOpen, Briefcase } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { NewsletterFormSidebar } from '@/components/newsletter/NewsletterFormSidebar'

const categories = [
  { name: 'Forex', slug: 'forex', icon: DollarSign, count: 145, color: 'text-blue-600' },
  { name: 'Crypto', slug: 'crypto', icon: Bitcoin, count: 98, color: 'text-orange-600' },
  { name: 'Commodities', slug: 'commodities', icon: TrendingUp, count: 67, color: 'text-green-600' },
  { name: 'Stock Market', slug: 'stock-market', icon: Briefcase, count: 123, color: 'text-purple-600' },
  { name: 'Education', slug: 'education', icon: BookOpen, count: 89, color: 'text-pink-600' },
]

export function CategorySidebar() {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-navy-100 dark:hover:bg-navy-800"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${category.color}`} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm text-navy-500">{category.count}</span>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['forex', 'bitcoin', 'trading', 'analysis', 'gold', 'EUR/USD', 'stocks', 'crypto'].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-navy-100 px-3 py-1 text-sm text-navy-600 dark:bg-navy-800 dark:text-navy-400"
                >
                  #{tag}
                </span>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <CardHeader>
          <CardTitle className="text-lg text-white">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-primary-50">
            Get the latest market insights delivered to your inbox weekly.
          </p>
          <NewsletterFormSidebar />
        </CardContent>
      </Card>
    </div>
  )
}

