import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { NewsletterForm } from '@/components/newsletter/NewsletterForm'
import { SocialIcons } from './SocialIcons'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
  resources: [
    { name: 'Articles', href: '/articles' },
    { name: 'Authors', href: '/authors' },
    { name: 'Categories', href: '/categories' },
    { name: 'Tools', href: '/tools' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

// Social links moved to client component to avoid passing functions to client from server

export function Footer() {
  return (
    <footer className="border-t border-navy-200 bg-navy-50 dark:border-navy-800 dark:bg-navy-950">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              TradaX
            </Link>
            <p className="mt-4 text-sm text-navy-600 dark:text-navy-400">
              Your trusted source for forex, crypto, and financial market news, analysis, and educational content.
            </p>
            <SocialIcons />
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-navy-900 dark:text-navy-100">Company</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-600 hover:text-primary-600 dark:text-navy-400 dark:hover:text-primary-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-navy-900 dark:text-navy-100">Resources</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-600 hover:text-primary-600 dark:text-navy-400 dark:hover:text-primary-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-navy-900 dark:text-navy-100">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-600 hover:text-primary-600 dark:text-navy-400 dark:hover:text-primary-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-navy-200 pt-8 dark:border-navy-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-navy-900 dark:text-navy-100">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 text-sm text-navy-600 dark:text-navy-400">
                Get the latest market news and analysis delivered to your inbox.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-navy-200 pt-8 dark:border-navy-800">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-navy-600 dark:text-navy-400 md:flex-row">
            <p>© {new Date().getFullYear()} TradaX. All rights reserved.</p>
            <p className="text-center text-xs text-navy-500 dark:text-navy-500 md:text-right">
              <strong className="text-red-600">Risk Warning:</strong> Trading involves significant risk. This is not investment advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

