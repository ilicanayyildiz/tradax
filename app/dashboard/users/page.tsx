import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Users, Shield } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatDate } from '@/lib/utils'

export default async function UsersManagementPage() {
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

  // Only admins and editors can manage users
  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    redirect('/dashboard')
  }

  // Get all users
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  const roleColors: Record<string, string> = {
    admin: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    editor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    writer: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    reader: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Manage Users</h1>
          <p className="mt-2 text-navy-600 dark:text-navy-400">
            {users?.length || 0} total users
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-400">
          <Shield className="h-4 w-4" />
          <span>Your role: <strong className="text-primary-600">{profile.role}</strong></span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users && users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-navy-200 dark:border-navy-800">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Role</th>
                    <th className="pb-3 font-semibold">Joined</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: any) => (
                    <tr key={u.id} className="border-b border-navy-100 dark:border-navy-900">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                            {u.avatar_url ? (
                              <img src={u.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                            ) : (
                              <Users className="h-5 w-5 text-primary-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{u.full_name || 'Unknown'}</div>
                            {u.bio && (
                              <div className="text-xs text-navy-500 line-clamp-1">{u.bio}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{u.email}</td>
                      <td className="py-4">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${roleColors[u.role] || roleColors.reader}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 text-sm">{formatDate(u.created_at)}</td>
                      <td className="py-4">
                        {profile.role === 'admin' && u.id !== user.id ? (
                          <button className="text-sm text-primary-600 hover:underline">
                            Change Role
                          </button>
                        ) : (
                          <span className="text-sm text-navy-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-navy-600 dark:text-navy-400">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Legend */}
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">Admin</div>
              <p className="mt-1 text-xs text-navy-600 dark:text-navy-400">Full access</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Editor</div>
              <p className="mt-1 text-xs text-navy-600 dark:text-navy-400">Manage all content</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Writer</div>
              <p className="mt-1 text-xs text-navy-600 dark:text-navy-400">Create articles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">Reader</div>
              <p className="mt-1 text-xs text-navy-600 dark:text-navy-400">View only</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

