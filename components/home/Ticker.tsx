'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface CurrencyPair {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function Ticker() {
  const [pairs, setPairs] = useState<CurrencyPair[]>([
    { symbol: 'EUR/USD', price: 1.0847, change: 0.0013, changePercent: 0.12 },
    { symbol: 'GBP/USD', price: 1.2634, change: -0.0010, changePercent: -0.08 },
    { symbol: 'USD/JPY', price: 149.82, change: 0.37, changePercent: 0.25 },
    { symbol: 'AUD/USD', price: 0.6521, change: 0.0018, changePercent: 0.28 },
    { symbol: 'USD/CAD', price: 1.3745, change: -0.0023, changePercent: -0.17 },
    { symbol: 'BTC/USD', price: 43250, change: 625, changePercent: 1.47 },
    { symbol: 'ETH/USD', price: 2280, change: -13, changePercent: -0.57 },
    { symbol: 'GOLD', price: 2048.50, change: 7.15, changePercent: 0.35 },
    { symbol: 'OIL', price: 78.35, change: -0.45, changePercent: -0.57 },
    { symbol: 'S&P 500', price: 4783.45, change: 12.30, changePercent: 0.26 },
  ])

  useEffect(() => {
    // Gerçek zamanlı veri simülasyonu - Her 5 saniyede güncelle (daha az render)
    const interval = setInterval(() => {
      setPairs((prevPairs) =>
        prevPairs.map((pair) => {
          // Rastgele küçük değişimler oluştur
          const priceChange = (Math.random() - 0.5) * 0.001
          const newPrice = pair.price * (1 + priceChange)
          const change = newPrice - pair.price
          const changePercent = (change / pair.price) * 100

          return {
            ...pair,
            price: newPrice,
            change: pair.change + change,
            changePercent: pair.changePercent + changePercent,
          }
        })
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Gerçek API entegrasyonu - Tüm market verileri (Forex, Crypto, Gold, Oil)
  useEffect(() => {
    const fetchAllMarketData = async () => {
      try {
        // Kendi API route'umuzu kullan (CORS yok, hızlı)
        const response = await fetch('/api/market-data')
        const result = await response.json()

        if (result.success && result.data) {
          setPairs(result.data)
          console.log('✅ Tüm market verileri güncellendi:', new Date().toLocaleTimeString())
          console.log('📊 Gerçek veriler:', result.data.map((p: any) => `${p.symbol}: $${p.price.toFixed(2)}`))
        }
      } catch (error) {
        console.error('❌ Market verileri alınamadı:', error)
      }
    }
    
    // İlk yüklemede hemen çalıştır
    fetchAllMarketData()
    
    // Her 60 saniyede bir güncelle
    const interval = setInterval(fetchAllMarketData, 60000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden border-y border-navy-200 bg-navy-900 py-3 dark:border-navy-800">
      <div className="relative will-change-transform">
        <div className="ticker-wrapper">
          {/* Çift render et sonsuz scroll için */}
          {[...pairs, ...pairs].map((pair, index) => (
            <div
              key={`${pair.symbol}-${index}`}
              className="ticker-item"
            >
              <span className="text-sm font-semibold">{pair.symbol}</span>
              <span className="font-mono text-base font-medium">
                {pair.price.toFixed(pair.symbol.includes('JPY') ? 2 : 4)}
              </span>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  pair.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {pair.changePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {pair.changePercent >= 0 ? '+' : ''}
                {pair.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          display: flex;
          gap: 2rem;
          white-space: nowrap;
          animation: scroll 45s linear infinite;
          will-change: transform;
        }
        
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
        }

        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        
        .ticker-wrapper:hover {
          animation-play-state: paused;
        }

        /* GPU acceleration için */
        @media (prefers-reduced-motion: no-preference) {
          .ticker-wrapper {
            backface-visibility: hidden;
            perspective: 1000px;
          }
        }
      `}</style>
    </div>
  )
}

