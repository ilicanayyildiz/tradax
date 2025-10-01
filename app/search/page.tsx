'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getRandomImage, FINANCE_IMAGES } from '@/lib/constants/images'
import type { Article } from '@/lib/types/database.types'

// Mock data
const titles = ['EUR/USD Analysis', 'Bitcoin Forecast', 'Gold Trading', 'Stock Market Update', 'Forex Strategy', 'Crypto News']
const imageCategories = ['forex', 'crypto', 'commodities', 'stockMarket', 'forex', 'crypto'] as const

const allArticles: Article[] = Array.from({ length: 12 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Article ${i + 1}: ${titles[i % 6]}`,
  slug: `article-${i + 1}`,
  content: 'Full content with keywords...',
  excerpt: 'Brief excerpt about the article.',
  featured_image: getRandomImage(imageCategories[i % 6]),
  category_id: '1',
  author_id: '1',
  tags: ['forex', 'trading', 'bitcoin', 'crypto'],
  is_featured: false,
  is_published: true,
  views_count: Math.floor(Math.random() * 1000),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  published_at: new Date().toISOString(),
  category: { id: '1', name: 'Forex', slug: 'forex', description: null, icon: null, created_at: new Date().toISOString() },
  author: { id: '1', email: 'john@example.com', full_name: 'John Smith', avatar_url: FINANCE_IMAGES.avatars[0], role: 'writer', bio: null, social_links: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
}))

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
    
    if (!query.trim()) {
      setResults([])
      return
    }

    // Simple search implementation - will be replaced with actual Supabase search
    const filtered = allArticles.filter((article) => {
      const searchLower = query.toLowerCase()
      return (
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt?.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    })
    
    setResults(filtered)
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Search Articles</h1>
        <p className="mt-2 text-navy-600 dark:text-navy-400">
          Find articles, analysis, and insights
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for articles, topics, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg"
          />
          <Button type="submit" size="lg">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </form>

      {/* Popular Searches */}
      {!searched && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {['EUR/USD', 'Bitcoin', 'Gold', 'Forex Strategy', 'Technical Analysis', 'Crypto Trading'].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term)
                    setSearched(true)
                    const filtered = allArticles.filter((article) =>
                      article.title.toLowerCase().includes(term.toLowerCase())
                    )
                    setResults(filtered)
                  }}
                  className="rounded-full bg-navy-100 px-4 py-2 text-sm hover:bg-primary-100 hover:text-primary-600 dark:bg-navy-800"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {searched && (
        <div>
          <div className="mb-6">
            <p className="text-lg">
              {results.length > 0 ? (
                <>
                  Found <strong>{results.length}</strong> {results.length === 1 ? 'result' : 'results'} for "{query}"
                </>
              ) : (
                <>No results found for "{query}"</>
              )}
            </p>
          </div>

          {results.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {results.length === 0 && (
            <div className="rounded-lg border border-navy-200 p-12 text-center dark:border-navy-800">
              <Search className="mx-auto h-16 w-16 text-navy-300 dark:text-navy-700" />
              <h3 className="mt-4 text-xl font-semibold">No results found</h3>
              <p className="mt-2 text-navy-600 dark:text-navy-400">
                Try different keywords or browse our categories
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

