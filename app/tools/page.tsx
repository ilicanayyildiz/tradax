'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Calculator, TrendingUp, DollarSign, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ToolsPage() {
  // Popular currencies for converter
  const currencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
    'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'RUB', 'INR', 'BRL', 'ZAR',
    'DKK', 'PLN', 'THB', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED'
  ]

  // Currency Converter State
  const [amount, setAmount] = useState('1000')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [conversionRate, setConversionRate] = useState<number | null>(null)
  const [convertLoading, setConvertLoading] = useState(false)

  // Pip Calculator State
  const [pipPair, setPipPair] = useState('EUR/USD')
  const [lotSize, setLotSize] = useState('1')
  const [pipResult, setPipResult] = useState<number | null>(null)

  // Leverage Calculator State
  const [accountBalance, setAccountBalance] = useState('10000')
  const [riskPercent, setRiskPercent] = useState('2')
  const [stopLossPips, setStopLossPips] = useState('50')
  const [positionSize, setPositionSize] = useState<number | null>(null)

  // Exchange rates için
  const [exchangeRates, setExchangeRates] = useState<any>(null)

  // Sayfa yüklendiğinde exchange rates'i al
  useEffect(() => {
    fetchExchangeRates()
  }, [])

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      const data = await response.json()
      setExchangeRates(data.rates)
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error)
    }
  }

  // Currency Converter - Gerçek API
  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setConvertLoading(true)
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      const data = await response.json()
      
      const rate = data.rates[toCurrency]
      const converted = parseFloat(amount) * rate
      
      setConversionRate(rate)
      setConvertedAmount(converted)
      toast.success('Converted successfully!')
    } catch (error) {
      toast.error('Failed to convert currency')
      console.error(error)
    } finally {
      setConvertLoading(false)
    }
  }

  // Pip Calculator - Gerçek zamanlı hesaplama
  const calculatePipValue = () => {
    const lots = parseFloat(lotSize)
    if (isNaN(lots) || lots <= 0) {
      toast.error('Please enter valid lot size')
      return
    }

    if (!exchangeRates) {
      toast.error('Loading exchange rates... Please wait.')
      fetchExchangeRates()
      return
    }

    // Standard lot = 100,000 units
    const standardLot = 100000
    const contractSize = lots * standardLot
    
    // Pair'i ayır
    const [baseCurrency, quoteCurrency] = pipPair.split('/')
    
    let pipValue = 0
    let pipSize = 0.0001 // Default pip size
    
    // JPY ve JPY içeren çiftler için pip size farklı
    if (quoteCurrency === 'JPY') {
      pipSize = 0.01
    }
    
    // Gerçek kur hesaplama
    try {
      if (quoteCurrency === 'USD') {
        // XXX/USD çiftleri (EUR/USD, GBP/USD, AUD/USD)
        // Pip value = pip size * contract size
        pipValue = pipSize * contractSize
      } else if (baseCurrency === 'USD') {
        // USD/XXX çiftleri (USD/JPY, USD/CAD, USD/CHF)
        // Pip value in USD = (pip size / current rate) * contract size
        const rate = exchangeRates[quoteCurrency]
        if (rate) {
          pipValue = (pipSize / rate) * contractSize
        }
      } else {
        // Cross pairs (EUR/GBP, GBP/JPY, etc.)
        // Convert to USD first
        const baseToUsd = 1 / (exchangeRates[baseCurrency] || 1)
        const quoteToUsd = 1 / (exchangeRates[quoteCurrency] || 1)
        
        if (quoteCurrency === 'JPY') {
          pipValue = (pipSize * baseToUsd) * contractSize
        } else {
          pipValue = pipSize * contractSize * baseToUsd
        }
      }

      setPipResult(Math.abs(pipValue))
      
      // Detaylı log
      console.log('Pip Calculation:')
      console.log('- Pair:', pipPair)
      console.log('- Lot Size:', lots)
      console.log('- Contract Size:', contractSize)
      console.log('- Pip Size:', pipSize)
      console.log('- Pip Value (USD):', pipValue.toFixed(2))
      
      toast.success('Pip value calculated with real rates!')
    } catch (error) {
      console.error('Pip calculation error:', error)
      toast.error('Calculation error. Please try again.')
    }
  }

  // Leverage Calculator - Gerçek hesaplama
  const calculatePosition = () => {
    const balance = parseFloat(accountBalance)
    const risk = parseFloat(riskPercent)
    const stopLoss = parseFloat(stopLossPips)

    if (isNaN(balance) || isNaN(risk) || isNaN(stopLoss) || balance <= 0 || risk <= 0 || stopLoss <= 0) {
      toast.error('Please enter valid values')
      return
    }

    // Risk amount = Account Balance * Risk Percentage / 100
    const riskAmount = (balance * risk) / 100

    // Pip value hesaplama (major pairs için ortalama $10/lot)
    // Gerçek uygulamada pair seçimi olmalı
    const standardLot = 100000
    const pipValue = 10 // $10 per pip per standard lot (EUR/USD, GBP/USD için)

    // Position size (lots) = Risk Amount / (Stop Loss in pips * Pip Value per lot)
    const lots = riskAmount / (stopLoss * pipValue)

    setPositionSize(lots)
    
    // Detaylı bilgi
    const riskAmountValue = (balance * risk) / 100
    console.log('Risk Management Calculation:')
    console.log('- Account Balance:', balance)
    console.log('- Risk Percentage:', risk + '%')
    console.log('- Risk Amount:', riskAmountValue)
    console.log('- Stop Loss:', stopLoss, 'pips')
    console.log('- Position Size:', lots.toFixed(2), 'lots')
    
    toast.success('Position size calculated!')
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Trading Tools</h1>
        <p className="mt-2 text-navy-600 dark:text-navy-400">
          Professional calculators with real-time data
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Economic Calendar */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <CardTitle>Economic Calendar</CardTitle>
            </div>
            <CardDescription>Stay updated with important economic events (Live from Investing.com)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-navy-100 dark:bg-navy-800">
              <iframe
                src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=15&lang=1"
                className="h-full w-full"
                title="Economic Calendar"
              />
            </div>
          </CardContent>
        </Card>

        {/* Currency Converter - GERÇEK API */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary-600" />
              <CardTitle>Currency Converter</CardTitle>
            </div>
            <CardDescription>Real-time exchange rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input 
                  type="number" 
                  placeholder="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>From</Label>
                <select 
                  className="input"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <select 
                  className="input"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <Button 
                className="w-full" 
                onClick={handleConvert}
                disabled={convertLoading}
              >
                {convertLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  'Convert'
                )}
              </Button>
              {convertedAmount !== null && (
                <div className="space-y-2 rounded-lg bg-primary-50 p-4 dark:bg-primary-900/20">
                  <p className="text-2xl font-bold text-primary-600">
                    {convertedAmount.toFixed(2)} {toCurrency}
                  </p>
                  <p className="text-xs text-navy-600 dark:text-navy-400">
                    Rate: 1 {fromCurrency} = {conversionRate?.toFixed(4)} {toCurrency}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pip Calculator - GERÇEK HESAPLAMA */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary-600" />
              <CardTitle>Pip Calculator</CardTitle>
            </div>
            <CardDescription>Calculate pip value accurately</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Currency Pair</Label>
                <select 
                  className="input"
                  value={pipPair}
                  onChange={(e) => setPipPair(e.target.value)}
                >
                  <optgroup label="Major Pairs">
                    <option>EUR/USD</option>
                    <option>GBP/USD</option>
                    <option>USD/JPY</option>
                    <option>USD/CHF</option>
                  </optgroup>
                  <optgroup label="Minor Pairs">
                    <option>AUD/USD</option>
                    <option>NZD/USD</option>
                    <option>USD/CAD</option>
                    <option>EUR/GBP</option>
                    <option>EUR/JPY</option>
                    <option>GBP/JPY</option>
                  </optgroup>
                  <optgroup label="Exotic Pairs">
                    <option>USD/TRY</option>
                    <option>USD/MXN</option>
                    <option>USD/ZAR</option>
                  </optgroup>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Lot Size</Label>
                <Input
                  type="number"
                  value={lotSize}
                  onChange={(e) => setLotSize(e.target.value)}
                  placeholder="1.0"
                  step="0.01"
                />
                <p className="text-xs text-navy-500">1 lot = 100,000 units</p>
              </div>
              <Button className="w-full" onClick={calculatePipValue}>
                Calculate
              </Button>
              {pipResult !== null && (
                <div className="rounded-lg bg-primary-50 p-4 text-center dark:bg-primary-900/20">
                  <p className="text-sm text-navy-600 dark:text-navy-400">Pip Value</p>
                  <p className="text-2xl font-bold text-primary-600">${pipResult.toFixed(2)}</p>
                  <p className="mt-1 text-xs text-navy-500">Per 1 pip movement</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Leverage Calculator - GERÇEK HESAPLAMA */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary-600" />
              <CardTitle>Position Size Calculator</CardTitle>
            </div>
            <CardDescription>Calculate safe position size</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Account Balance ($)</Label>
                <Input 
                  type="number" 
                  placeholder="10000"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Risk Percentage (%)</Label>
                <Input 
                  type="number" 
                  placeholder="2" 
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                />
                <p className="text-xs text-navy-500">Recommended: 1-2%</p>
              </div>
              <div className="space-y-2">
                <Label>Stop Loss (pips)</Label>
                <Input 
                  type="number" 
                  placeholder="50"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={calculatePosition}>
                Calculate
              </Button>
              {positionSize !== null && (
                <div className="space-y-2 rounded-lg bg-primary-50 p-4 text-center dark:bg-primary-900/20">
                  <p className="text-sm text-navy-600 dark:text-navy-400">Safe Position Size</p>
                  <p className="text-2xl font-bold text-primary-600">{positionSize.toFixed(2)} Lots</p>
                  <p className="mt-1 text-xs text-navy-500">
                    Risk: ${(parseFloat(accountBalance) * parseFloat(riskPercent) / 100).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
