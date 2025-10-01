'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Search, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Markets', href: '/markets' },
  { name: 'Categories', href: '/categories' },
  { name: 'Authors', href: '/authors' },
  { name: 'Tools', href: '/tools' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-navy-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-navy-800 dark:bg-navy-900/95">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary-600">
          TradaX
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded-md px-2 py-2 text-base font-semibold transition-colors hover:text-primary-600 ${
                pathname === item.href
                  ? 'text-primary-600'
                  : 'text-navy-600 dark:text-navy-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <Link href="/search" className="text-navy-300 hover:text-primary-400">
            <Search className="h-6 w-6" />
          </Link>

          {/* User Menu */}
          {user ? (
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-base font-semibold text-white hover:bg-primary-700"
            >
              <User className="h-4 w-4" />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="hidden md:inline-flex rounded-md bg-primary-600 px-5 py-2.5 text-base font-semibold text-white hover:bg-primary-700"
            >
              Sign In
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-navy-600 dark:text-navy-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-navy-200 dark:border-navy-800">
          <div className="container space-y-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'
                    : 'text-navy-600 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Link
                href="/dashboard"
                className="block rounded-md bg-primary-600 px-3 py-2 text-base font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="block rounded-md bg-primary-600 px-3 py-2 text-base font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

