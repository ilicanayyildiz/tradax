import { Users, Target, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

export const metadata = {
  title: 'About Us',
  description: 'Learn more about TradaX and our mission to provide reliable financial market information',
}

const stats = [
  { label: 'Articles Published', value: '2,500+', icon: TrendingUp },
  { label: 'Expert Authors', value: '50+', icon: Users },
  { label: 'Daily Readers', value: '100K+', icon: Award },
  { label: 'Years of Experience', value: '10+', icon: Target },
]

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container py-20">
          <h1 className="text-4xl font-bold md:text-5xl">About TradaX</h1>
          <p className="mt-4 max-w-2xl text-xl text-primary-100">
            Your trusted source for forex, crypto, and financial market news, analysis, and educational content since 2014.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container -mt-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="bg-white dark:bg-navy-900">
                <CardContent className="p-6 text-center">
                  <Icon className="mx-auto h-8 w-8 text-primary-600" />
                  <p className="mt-4 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm text-navy-600 dark:text-navy-400">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Mission */}
      <div className="container mt-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 text-lg text-navy-600 dark:text-navy-400">
            At TradaX, we believe that everyone deserves access to high-quality financial market information and analysis. Our mission is to empower traders and investors with the knowledge they need to make informed decisions in the dynamic world of forex, cryptocurrencies, and commodities trading.
          </p>
          
          <h2 className="mt-12 text-3xl font-bold">What We Do</h2>
          <div className="mt-4 space-y-4 text-lg text-navy-600 dark:text-navy-400">
            <p>
              We provide comprehensive coverage of global financial markets, including:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Real-time market analysis and trading insights</li>
              <li>Educational content for traders of all levels</li>
              <li>Technical and fundamental analysis</li>
              <li>Economic calendar and market news</li>
              <li>Trading tools and calculators</li>
            </ul>
          </div>

          <h2 className="mt-12 text-3xl font-bold">Our Team</h2>
          <p className="mt-4 text-lg text-navy-600 dark:text-navy-400">
            Our team consists of experienced traders, analysts, and financial experts who are passionate about sharing their knowledge. With decades of combined experience in financial markets, we bring you insights that matter.
          </p>

          <h2 className="mt-12 text-3xl font-bold">Our Values</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Accuracy</h3>
              <p className="mt-2 text-navy-600 dark:text-navy-400">
                We prioritize accurate, fact-checked information backed by thorough research and analysis.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Transparency</h3>
              <p className="mt-2 text-navy-600 dark:text-navy-400">
                We're transparent about our sources, methodologies, and the risks involved in trading.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Education</h3>
              <p className="mt-2 text-navy-600 dark:text-navy-400">
                We're committed to educating our readers and helping them grow as traders.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Integrity</h3>
              <p className="mt-2 text-navy-600 dark:text-navy-400">
                We maintain the highest standards of journalistic integrity and ethical conduct.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

