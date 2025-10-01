'use client'

import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function DeleteArticleButton({ id }: { id: string }) {
  const router = useRouter()

  const onDelete = async () => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) return
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json?.success) {
        toast.success('Article deleted')
        router.refresh()
      } else {
        throw new Error(json?.error || 'Delete failed')
      }
    } catch (e: any) {
      toast.error(e.message || 'Delete failed')
    }
  }

  return (
    <button
      onClick={onDelete}
      className="rounded p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
      title="Delete"
      aria-label="Delete article"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}


