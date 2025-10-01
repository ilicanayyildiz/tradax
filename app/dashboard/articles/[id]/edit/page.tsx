'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { ImageUpload } from '@/components/editor/ImageUpload'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import toast from 'react-hot-toast'
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tags, setTags] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchArticle()
    fetchCategories()
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.id}`)
      const result = await response.json()

      if (result.success && result.data) {
        const article = result.data
        setTitle(article.title)
        setExcerpt(article.excerpt || '')
        setContent(article.content)
        setFeaturedImage(article.featured_image || '')
        setCategoryId(article.category_id || '')
        setTags(article.tags?.join(', ') || '')
        setIsPublished(article.is_published)
      }
    } catch (error) {
      toast.error('Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name')
    if (data) setCategories(data)
  }

  const handleUpdate = async (publish?: boolean) => {
    if (!title || !content) {
      toast.error('Title and content are required')
      return
    }

    setSaving(true)

    try {
      const response = await fetch(`/api/articles/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          featured_image: featuredImage,
          category_id: categoryId || null,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          is_published: publish !== undefined ? publish : isPublished,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Article updated successfully!')
        router.push('/dashboard/articles')
        router.refresh()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update article')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return
    }

    setSaving(true)

    try {
      const response = await fetch(`/api/articles/${params.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Article deleted successfully!')
        router.push('/dashboard/articles')
        router.refresh()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete article')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container flex min-h-[50vh] items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/dashboard/articles" className="inline-flex items-center gap-2 text-primary-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={saving}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Article
        </Button>
      </div>

      <h1 className="mb-8 text-4xl font-bold">Edit Article</h1>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the article..."
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="input"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="forex, trading, analysis"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              onUploadComplete={setFeaturedImage}
              currentImage={featuredImage}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content *</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor content={content} onChange={setContent} />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => handleUpdate(false)}
            variant="secondary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button
            type="button"
            onClick={() => handleUpdate(true)}
            disabled={saving}
          >
            {saving ? 'Publishing...' : isPublished ? 'Update & Publish' : 'Publish'}
          </Button>
        </div>
      </form>
    </div>
  )
}

