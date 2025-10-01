'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react'

type MarketRow = {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export default function MarketsPage() {
  const [data, setData] = useState<MarketRow[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [limits, setLimits] = useState<Record<string, number>>({ forex: 12, crypto: 12, commodities: 2, indices: 1 })

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/market-data', { cache: 'no-store' })
      const json = await res.json()
      if (json?.success && Array.isArray(json.data)) {
        setData(json.data)
        setLastUpdated(new Date().toLocaleTimeString())
      }
    } catch (e) {
      console.error('Failed to load market data', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 60_000) // refresh every 60s
    return () => clearInterval(id)
  }, [])

  // Classifiers
  const cryptoSymbols = new Set([
    'BTC/USD', 'ETH/USD', 'BNB/USD', 'SOL/USD', 'XRP/USD', 'ADA/USD', 'DOGE/USD',
    'MATIC/USD', 'DOT/USD', 'LTC/USD', 'TRX/USD', 'LINK/USD',
  ])
  const fiatSet = new Set(['USD','EUR','GBP','JPY','AUD','CAD','CHF','NZD','TRY','MXN','ZAR','SEK','NOK','PLN'])

  const sections: { id: string; title: string; description: string; filter: (s: string) => boolean }[] = [
    { id: 'forex', title: 'Forex', description: 'Major currency pairs (real-time quotes)', filter: (s) => {
      if (!s.includes('/')) return false
      const [base, quote] = s.split('/')
      return fiatSet.has(base) && fiatSet.has(quote)
    } },
    { id: 'crypto', title: 'Crypto', description: 'Top crypto assets (24h % change)', filter: (s) => cryptoSymbols.has(s) },
    { id: 'commodities', title: 'Commodities', description: 'Gold and Oil spot prices', filter: (s) => s === 'GOLD' || s === 'OIL' },
    { id: 'indices', title: 'Indices', description: 'Key equity indices', filter: (s) => s.includes('S&P') },
  ]

  return (
    <div className="container py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Markets</h1>
          <p className="mt-2 text-navy-600 dark:text-navy-400">Live prices and percent changes</p>
          {lastUpdated && (
            <p className="mt-1 text-xs text-navy-500 dark:text-navy-400">Son güncelleme: {lastUpdated}</p>
          )}
        </div>
        <button onClick={fetchData} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-navy-100 dark:hover:bg-navy-800">
          <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* In-page navigation */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 text-sm">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-md bg-navy-100 px-3 py-1 hover:bg-navy-200 dark:bg-navy-800 dark:hover:bg-navy-700">
                {s.title}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Single column, scrollable list with section headers */}
      <div className="space-y-10">
        {sections.map((section) => {
          const allRows = data.filter((r) => section.filter(r.symbol))

          // For Forex: place each pair right above/below its inverse
          let arranged = allRows
          if (section.id === 'forex') {
            const bySymbol = new Map(allRows.map((r) => [r.symbol, r]))
            const seen = new Set<string>()
            const ordered: typeof allRows = []
            for (const row of allRows) {
              if (seen.has(row.symbol)) continue
              ordered.push(row)
              seen.add(row.symbol)
              const [base, quote] = row.symbol.split('/')
              const inv = `${quote}/${base}`
              const invRow = bySymbol.get(inv)
              if (invRow && !seen.has(invRow.symbol)) {
                ordered.push(invRow)
                seen.add(invRow.symbol)
              }
            }
            arranged = ordered
          }

          const limit = limits[section.id] ?? arranged.length
          const rows = arranged.slice(0, limit)
          return (
            <section key={section.id} id={section.id}>
              <div className="mb-3">
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <p className="text-sm text-navy-600 dark:text-navy-400">{section.description}</p>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <div className="grid grid-cols-12 text-xs text-navy-500 dark:text-navy-400">
                    <div className="col-span-5 sm:col-span-4">Symbol</div>
                    <div className="col-span-4 sm:col-span-4">Price</div>
                    <div className="col-span-3 sm:col-span-4">Change</div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-navy-200 dark:divide-navy-800">
                    {rows.map((row) => (
                      <div key={row.symbol} className="grid grid-cols-12 items-center px-4 py-3">
                        <div className="col-span-5 sm:col-span-4 font-medium">{row.symbol}</div>
                        <div className="col-span-4 sm:col-span-4 font-mono">
                          {row.price.toFixed(row.symbol.includes('JPY') ? 2 : 4)}
                        </div>
                        <div className={`col-span-3 sm:col-span-4 inline-flex items-center gap-2 ${row.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {row.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {row.changePercent >= 0 ? '+' : ''}{row.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    ))}
                    {rows.length === 0 && (
                      <div className="px-4 py-6 text-sm text-navy-500 dark:text-navy-400">No data</div>
                    )}
                  </div>
                </CardContent>
              </Card>
              {allRows.length > rows.length && (
                <div className="mt-3 flex justify-center">
                  <button
                    className="rounded-md border px-4 py-2 text-sm hover:bg-navy-100 dark:hover:bg-navy-800"
                    onClick={() => setLimits((l) => ({ ...l, [section.id]: (l[section.id] ?? rows.length) + (section.id === 'crypto' ? 12 : section.id === 'forex' ? 12 : 5) }))}
                  >
                    Show more
                  </button>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}


