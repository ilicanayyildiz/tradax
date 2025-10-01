import Link from 'next/link'
import Image from 'next/image'
import { Clock, User, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { formatDate, getReadingTime } from '@/lib/utils'
import type { Article } from '@/lib/types/database.types'

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const readingTime = getReadingTime(article.content)

  if (featured) {
    return (
      <Link href={`/articles/${article.slug}`}>
        <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto">
              <Image
                src={article.featured_image || '/placeholder-article.jpg'}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {article.category && (
                <span className="absolute left-4 top-4 rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white">
                  {article.category.name}
                </span>
              )}
            </div>
            <CardContent className="flex flex-col justify-center p-6">
              <h2 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary-600 md:text-3xl">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="mb-4 text-navy-600 dark:text-navy-400 line-clamp-3">
                  {article.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500 dark:text-navy-500">
                {article.author && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{article.author.full_name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.published_at || article.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-video">
          <Image
            src={article.featured_image || '/placeholder-article.jpg'}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {article.category && (
            <span className="absolute left-4 top-4 rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white">
              {article.category.name}
            </span>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary-600 line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mb-4 text-sm text-navy-600 dark:text-navy-400 line-clamp-3">
              {article.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-xs text-navy-500 dark:text-navy-500">
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{article.author.full_name}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(article.published_at || article.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

