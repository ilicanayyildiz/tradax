import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'TradaX - Professional Finance & Forex Portal',
    template: '%s | TradaX',
  },
  description: 'Your trusted source for forex, crypto, and financial market news, analysis, and educational content.',
  keywords: ['forex', 'crypto', 'trading', 'finance', 'stock market', 'commodities', 'financial news'],
  authors: [{ name: 'TradaX Team' }],
  creator: 'TradaX',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'TradaX - Professional Finance & Forex Portal',
    description: 'Your trusted source for forex, crypto, and financial market news',
    siteName: 'TradaX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TradaX - Professional Finance & Forex Portal',
    description: 'Your trusted source for forex, crypto, and financial market news',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}

