import Link from 'next/link'
import { User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { FINANCE_IMAGES } from '@/lib/constants/images'
import type { Profile } from '@/lib/types/database.types'

// Build authors uniquely (no repeated name or avatar)
const authorNames = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Davis', 'James Wilson', 'Olivia Martinez']
const focuses = ['Forex', 'Crypto', 'Commodities', 'Stock Market', 'Macro', 'Education']

const uniqueCount = Math.min(authorNames.length, FINANCE_IMAGES.avatars.length)

const authors: Profile[] = Array.from({ length: uniqueCount }, (_, i) => {
  const focus = focuses[i % focuses.length]
  return {
    id: (i + 1).toString(),
    email: `author${i + 1}@example.com`,
    full_name: authorNames[i],
    avatar_url: FINANCE_IMAGES.avatars[i],
    role: 'writer' as const,
    bio: `${focus} analyst and market strategist.`,
    social_links: {
      twitter: 'twitter.com/author',
      linkedin: 'linkedin.com/in/author',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
})

export const metadata = {
  title: 'Authors',
  description: 'Meet our expert authors and analysts',
}

export default function AuthorsPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Our Authors</h1>
        <p className="mt-2 text-navy-600 dark:text-navy-400">
          Meet the experts behind our market analysis and insights
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <Link key={author.id} href={`/authors/${author.id}`}>
            <Card className="group h-full transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-transform group-hover:scale-105 dark:bg-primary-900/20">
                    {author.avatar_url ? (
                      <img
                        src={author.avatar_url}
                        alt={author.full_name || ''}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12" />
                    )}
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl font-bold transition-colors group-hover:text-primary-600">
                    {author.full_name}
                  </h3>
                  <span className="mt-1 inline-block rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-700 dark:bg-navy-800 dark:text-navy-300">
                    {author.role}
                  </span>

                  {/* Bio */}
                  {author.bio && (
                    <p className="mt-4 text-sm text-navy-600 dark:text-navy-400 line-clamp-3">
                      {author.bio}
                    </p>
                  )}

                  {/* Social Links - Disabled */}
                  <div className="mt-4 flex gap-2 text-xs text-navy-400 dark:text-navy-600 opacity-50">
                    <span>Twitter</span>
                    <span>•</span>
                    <span>LinkedIn</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

