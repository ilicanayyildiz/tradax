'use client'

import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, BookOpen, Calculator } from 'lucide-react'
import { FINANCE_IMAGES } from '@/lib/constants/images'

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src={FINANCE_IMAGES.hero[0]}
          alt="Trading background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/80 to-primary-900/90" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-600/20 px-4 py-2 text-sm font-medium text-primary-300 backdrop-blur-sm">
            <TrendingUp className="h-4 w-4" />
            <span>Professional Trading Insights</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Your Gateway to
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {' '}Financial Markets
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-navy-300 md:text-xl">
            Expert analysis, real-time market data, and educational resources for forex, crypto, and commodities trading. Make informed decisions with TradaX.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/50"
            >
              <BookOpen className="h-5 w-5" />
              Browse Articles
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Calculator className="h-5 w-5" />
              Trading Tools
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">2.5K+</div>
              <div className="mt-1 text-sm text-navy-400">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">50+</div>
              <div className="mt-1 text-sm text-navy-400">Expert Authors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">100K+</div>
              <div className="mt-1 text-sm text-navy-400">Daily Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">24/7</div>
              <div className="mt-1 text-sm text-navy-400">Market Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-12 w-full text-white dark:text-navy-950"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}

