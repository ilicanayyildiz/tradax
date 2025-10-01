import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LogOut, FileText, Users, Settings } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Link from 'next/link'

export default async function DashboardPage() {
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

  const isAdmin = profile?.role === 'admin'
  const stats = [
    { label: 'Total Articles', value: '42', icon: FileText, href: '/dashboard/articles' },
    { label: 'Total Users', value: '1,234', icon: Users, href: '/dashboard/users' },
    { label: 'Pending Review', value: '5', icon: FileText, href: '/dashboard/articles?status=pending' },
  ]

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-navy-600 dark:text-navy-400">
            Welcome back, {profile?.full_name || user.email}
          </p>
          {profile?.role && (
            <span className="mt-2 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
              {profile.role}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <form action="/auth/signout" method="post">
            <button className="btn btn-outline flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
          <Link href="/profile/edit" className="btn btn-outline">
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Grid (Admin only) */}
      {isAdmin && (
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link key={stat.label} href={stat.href}>
                <Card className="transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-navy-600 dark:text-navy-400">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                      </div>
                      <Icon className="h-12 w-12 text-primary-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dashboard/articles/new"
              className="rounded-lg border-2 border-dashed border-navy-300 p-6 text-center transition-colors hover:border-primary-600 dark:border-navy-700"
            >
              <FileText className="mx-auto h-8 w-8 text-primary-600" />
              <p className="mt-2 font-medium">New Article</p>
            </Link>
            <Link
              href="/dashboard/articles"
              className="rounded-lg border-2 border-dashed border-navy-300 p-6 text-center transition-colors hover:border-primary-600 dark:border-navy-700"
            >
              <FileText className="mx-auto h-8 w-8 text-primary-600" />
              <p className="mt-2 font-medium">Manage Articles</p>
            </Link>
            {(profile?.role === 'admin' || profile?.role === 'editor') && (
              <>
                <Link
                  href="/dashboard/users"
                  className="rounded-lg border-2 border-dashed border-navy-300 p-6 text-center transition-colors hover:border-primary-600 dark:border-navy-700"
                >
                  <Users className="mx-auto h-8 w-8 text-primary-600" />
                  <p className="mt-2 font-medium">Manage Users</p>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="rounded-lg border-2 border-dashed border-navy-300 p-6 text-center transition-colors hover:border-primary-600 dark:border-navy-700"
                >
                  <Settings className="mx-auto h-8 w-8 text-primary-600" />
                  <p className="mt-2 font-medium">Settings</p>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-navy-200 pb-4 dark:border-navy-800">
              <div>
                <p className="font-medium">Article published: EUR/USD Analysis</p>
                <p className="text-sm text-navy-600 dark:text-navy-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-navy-200 pb-4 dark:border-navy-800">
              <div>
                <p className="font-medium">New comment on: Bitcoin Forecast</p>
                <p className="text-sm text-navy-600 dark:text-navy-400">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Article edited: Gold Price Analysis</p>
                <p className="text-sm text-navy-600 dark:text-navy-400">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

