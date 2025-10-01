'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

type Comment = {
  id: string
  content: string
  created_at: string
  author?: { id: string; full_name: string; avatar_url?: string | null }
}

export function Comments({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    try {
      const res = await fetch(`/api/comments?articleId=${articleId}`, { cache: 'no-store' })
      const json = await res.json()
      if (json?.success) setComments(json.data)
    } catch {}
  }

  useEffect(() => {
    load()
  }, [articleId])

  const submit = async () => {
    if (!content.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, content }),
      })
      const json = await res.json()
      if (json?.success) {
        setContent('')
        setComments((prev) => [...prev, json.data])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={submit} disabled={loading || !content.trim()}>
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>

          <div className="divide-y divide-navy-200 dark:divide-navy-800">
            {comments.map((c) => (
              <div key={c.id} className="py-3">
                <div className="text-sm text-navy-500 dark:text-navy-400">
                  {new Date(c.created_at).toLocaleString()}
                </div>
                <div className="mt-1 whitespace-pre-wrap">{c.content}</div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className="py-6 text-sm text-navy-500 dark:text-navy-400">No comments yet</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


