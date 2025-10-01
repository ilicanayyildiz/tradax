'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const submit = async () => {
    if (!email) return
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/update-password` : undefined,
    })
    setLoading(false)
    if (error) return toast.error(error.message)
    toast.success('Password reset link sent if the email exists.')
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>We will send you a reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button onClick={submit} disabled={loading || !email}>{loading ? 'Sending...' : 'Send reset link'}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


