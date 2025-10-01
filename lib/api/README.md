# API Entegrasyon Rehberi

Bu klasör gerçek zamanlı market verileri için API entegrasyonlarını içerir.

## Ücretsiz API'ler

### 1. Forex (Döviz Kurları)

**exchangerate-api.com** - Ücretsiz, API key gerekmez
- Limit: 1,500 requests/ay (free tier)
- Kullanım: `fetchForexRates('USD')`
```javascript
const rates = await fetchForexRates('USD')
// { EUR: 0.92, GBP: 0.79, JPY: 149.50, ... }
```

**Alternatif:**
- fixer.io (100 requests/ay ücretsiz)
- currencyapi.com (300 requests/ay ücretsiz)

### 2. Cryptocurrency

**CoinGecko API** - Ücretsiz, API key gerekmez
- Limit: 10-50 requests/dakika
- Kullanım: `fetchCryptoPrices()`
```javascript
const crypto = await fetchCryptoPrices()
// [{ symbol: 'BTC/USD', price: 43250, change24h: 1.47 }, ...]
```

**Alternatif:**
- CoinMarketCap API (10,000 calls/ay ücretsiz)
- Binance API (rate limits var)

### 3. Commodities (Emtia)

**metals-api.com** - 50 requests/ay ücretsiz
- Altın, gümüş, petrol fiyatları
- API key gerekir

**Alternatif:**
- Alpha Vantage (500 requests/gün)
- Twelve Data (800 API calls/gün)

## Ticker Component'i Gerçek API ile Kullanma

`components/home/Ticker.tsx` dosyasında, yorumlu olan kodu aktif et:

```typescript
useEffect(() => {
  const fetchRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      const data = await response.json()
      
      // Döviz çiftlerini hesapla
      const eurUsd = data.rates.EUR
      const gbpUsd = data.rates.GBP
      const usdJpy = data.rates.JPY
      
      // Crypto verilerini al
      const cryptoResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
      )
      const cryptoData = await cryptoResponse.json()
      
      setPairs([
        { symbol: 'EUR/USD', price: eurUsd, change: 0, changePercent: 0 },
        { symbol: 'GBP/USD', price: gbpUsd, change: 0, changePercent: 0 },
        { symbol: 'USD/JPY', price: usdJpy, change: 0, changePercent: 0 },
        { symbol: 'BTC/USD', price: cryptoData.bitcoin.usd, change: 0, changePercent: cryptoData.bitcoin.usd_24h_change },
        { symbol: 'ETH/USD', price: cryptoData.ethereum.usd, change: 0, changePercent: cryptoData.ethereum.usd_24h_change },
        // ... diğer çiftler
      ])
    } catch (error) {
      console.error('Error fetching rates:', error)
    }
  }
  
  fetchRates()
  const interval = setInterval(fetchRates, 60000) // Her 1 dakikada bir güncelle
  return () => clearInterval(interval)
}, [])
```

## Rate Limiting

API limitlerini aşmamak için:

1. **Cache kullan**: Next.js'in built-in cache'i
   ```typescript
   fetch(url, { next: { revalidate: 60 } }) // 60 saniye cache
   ```

2. **Interval'ları uzat**: 
   - Forex: 5 dakika (yavaş hareket eder)
   - Crypto: 30-60 saniye (hızlı hareket eder)
   - Commodities: 15 dakika

3. **Error handling**: API hatalarında fallback veri göster

## Örnek Kullanım

```typescript
// app/api/market-data/route.ts
import { fetchAllMarketData } from '@/lib/api/forex'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchAllMarketData()
  return NextResponse.json(data)
}
```

Sonra client'ta:
```typescript
const response = await fetch('/api/market-data')
const data = await response.json()
```

## Production İpuçları

1. Environment variables kullan API keys için
2. Error boundaries ekle
3. Loading states göster
4. Rate limit hatalarını handle et
5. WebSocket kullanmayı düşün (gerçek zamanlı için)

## Ücretsiz WebSocket Seçenekleri

Gerçek zamanlı veri için:
- Binance WebSocket (crypto)
- Finnhub WebSocket (forex, stocks)
- TradingView Widget (embed)

