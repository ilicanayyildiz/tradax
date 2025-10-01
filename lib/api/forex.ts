// Forex ve Crypto API entegrasyonu için utility fonksiyonlar

interface ExchangeRates {
  [key: string]: number
}

interface CryptoPrice {
  symbol: string
  price: number
  change24h: number
}

/**
 * Gerçek zamanlı döviz kurları - exchangerate-api.com (ücretsiz)
 * API Key: https://www.exchangerate-api.com/
 */
export async function fetchForexRates(baseCurrency: string = 'USD'): Promise<ExchangeRates | null> {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch forex rates')
    }

    const data = await response.json()
    return data.rates
  } catch (error) {
    console.error('Error fetching forex rates:', error)
    return null
  }
}

/**
 * Crypto fiyatları - CoinGecko API (ücretsiz, API key gerektirmez)
 * Limit: 10-50 requests/minute
 */
export async function fetchCryptoPrices(): Promise<CryptoPrice[] | null> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano&vs_currencies=usd&include_24hr_change=true',
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices')
    }

    const data = await response.json()
    
    return [
      {
        symbol: 'BTC/USD',
        price: data.bitcoin?.usd || 0,
        change24h: data.bitcoin?.usd_24h_change || 0,
      },
      {
        symbol: 'ETH/USD',
        price: data.ethereum?.usd || 0,
        change24h: data.ethereum?.usd_24h_change || 0,
      },
      {
        symbol: 'XRP/USD',
        price: data.ripple?.usd || 0,
        change24h: data.ripple?.usd_24h_change || 0,
      },
      {
        symbol: 'ADA/USD',
        price: data.cardano?.usd || 0,
        change24h: data.cardano?.usd_24h_change || 0,
      },
    ]
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    return null
  }
}

/**
 * Altın fiyatları - metals-api.com veya alternatif
 * Simülasyon verisi - gerçek API için API key gerekir
 */
export async function fetchCommodityPrices() {
  // Gerçek API entegrasyonu için:
  // const response = await fetch('https://metals-api.com/api/latest?access_key=YOUR_KEY&symbols=XAU,XAG,OIL')
  
  // Şimdilik simülasyon verisi
  return {
    gold: {
      symbol: 'GOLD',
      price: 2048.50 + (Math.random() - 0.5) * 20,
      change: (Math.random() - 0.5) * 2,
    },
    silver: {
      symbol: 'SILVER',
      price: 24.35 + (Math.random() - 0.5) * 0.5,
      change: (Math.random() - 0.5) * 0.2,
    },
    oil: {
      symbol: 'OIL',
      price: 78.35 + (Math.random() - 0.5) * 2,
      change: (Math.random() - 0.5) * 1,
    },
  }
}

/**
 * Tüm market verilerini birleştir
 */
export async function fetchAllMarketData() {
  const [forexRates, cryptoPrices, commodities] = await Promise.all([
    fetchForexRates(),
    fetchCryptoPrices(),
    fetchCommodityPrices(),
  ])

  return {
    forex: forexRates,
    crypto: cryptoPrices,
    commodities,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Belirli bir döviz çiftinin gerçek zamanlı fiyatını al
 */
export function calculatePairPrice(
  rates: ExchangeRates,
  base: string,
  quote: string
): number {
  if (!rates[quote] || !rates[base]) return 0
  return rates[quote] / rates[base]
}

