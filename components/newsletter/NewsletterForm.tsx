'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('🎉 Successfully subscribed! Check your email.')
        setEmail('')
      } else {
        toast.error(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      console.error('Newsletter error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="input flex-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={loading}
      >
        <Mail className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">
          {loading ? 'Subscribing...' : 'Subscribe'}
        </span>
      </button>
    </form>
  )
}

