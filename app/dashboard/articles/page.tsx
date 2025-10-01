import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Eye } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatDate } from '@/lib/utils'
import { DeleteArticleButton } from '@/components/dashboard/DeleteArticleButton'

export default async function ArticlesManagementPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user profile with role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'editor', 'writer'].includes(profile.role)) {
    redirect('/dashboard')
  }

  // Get all articles (admin/editor see all, writers see only their own)
  let query = supabase
    .from('articles')
    .select(`
      *,
      category:categories(name),
      author:profiles(full_name)
    `)
    .order('created_at', { ascending: false })

  if (profile.role === 'writer') {
    query = query.eq('author_id', user.id)
  }

  const { data: articles } = await query

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Manage Articles</h1>
          <p className="mt-2 text-navy-600 dark:text-navy-400">
            {articles?.length || 0} total articles
          </p>
        </div>
        <Link href="/dashboard/articles/new" className="btn btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Article
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {articles && articles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-navy-200 dark:border-navy-800">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Author</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article: any) => (
                    <tr key={article.id} className="border-b border-navy-100 dark:border-navy-900">
                      <td className="py-4">
                        <div className="font-medium">{article.title}</div>
                        <div className="text-xs text-navy-500">{article.slug}</div>
                      </td>
                      <td className="py-4 text-sm">{article.author?.full_name || 'Unknown'}</td>
                      <td className="py-4">
                        <span className="inline-block rounded-full bg-primary-100 px-2 py-1 text-xs dark:bg-primary-900/20">
                          {article.category?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="py-4">
                        {article.is_published ? (
                          <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            Published
                          </span>
                        ) : (
                          <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-sm">{formatDate(article.created_at)}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/articles/${article.slug}`}
                            className="rounded p-1 hover:bg-navy-100 dark:hover:bg-navy-800"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/dashboard/articles/${article.id}/edit`}
                            className="rounded p-1 hover:bg-navy-100 dark:hover:bg-navy-800"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          {(profile.role === 'admin' || profile.role === 'editor') && (
                            <DeleteArticleButton id={article.id} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-navy-600 dark:text-navy-400">No articles yet</p>
              <Link href="/dashboard/articles/new" className="mt-4 inline-flex btn btn-primary">
                Create your first article
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

