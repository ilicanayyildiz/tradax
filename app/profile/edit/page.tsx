'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function ProfileEditPage() {
  const supabase = createClient()
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setLoading(false)
        return
      }
      const { data } = await supabase.from('profiles').select('full_name, bio').eq('id', user.id).single()
      setFullName(data?.full_name || '')
      setBio(data?.bio || '')
      setLoading(false)
    })
  }, [])

  const save = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('profiles').update({ full_name: fullName, bio }).eq('id', user.id)
    setLoading(false)
    if (error) return toast.error(error.message)
    toast.success('Profile updated')
  }

  return (
    <div className="container py-12">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your public information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={5} />
            <Button onClick={save} disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


