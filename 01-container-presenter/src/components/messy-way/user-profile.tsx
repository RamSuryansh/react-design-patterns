import axios from 'axios'
import { useEffect, useState } from 'react'

type UserProfileProps = {
  userId: number
}

type ApiUser = {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company?: {
    catchPhrase?: string
  }
}

type ApiPost = {
  id: number
  userId: number
  title: string
  body: string
}

type FormData = {
  name: string
  email: string
  bio: string
}

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

const UserProfile = ({ userId }: UserProfileProps) => {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [posts, setPosts] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    bio: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [userResponse, postsResponse] = await Promise.all([
          axios.get<ApiUser>(`${API_BASE_URL}/users/${userId}`),
          axios.get<ApiPost[]>(`${API_BASE_URL}/posts`, {
            params: { userId },
          }),
        ])

        setUser(userResponse.data)
        setPosts(postsResponse.data)
        setFormData({
          name: userResponse.data.name,
          email: userResponse.data.email,
          bio: userResponse.data.company?.catchPhrase ?? '',
        })
      } catch {
        setError('Failed to fetch user data')
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [userId])

  const handleSaveProfile = async () => {
    try {
      setError(null)

      const response = await axios.put<ApiUser>(
        `${API_BASE_URL}/users/${userId}`,
        {
          ...user,
          name: formData.name,
          email: formData.email,
          company: {
            ...(user?.company ?? {}),
            catchPhrase: formData.bio,
          },
        },
      )

      setUser(response.data)
      setIsEditing(false)
    } catch {
      setError('Failed to update profile')
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (loading) {
    return (
      <div className='mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-4'>
        <div className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
          <p className='text-slate-700'>Loading user profile...</p>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className='mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-4'>
        <div className='w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-red-700'>
            Oops! Something went wrong
          </h3>
          <p className='mt-2 text-red-600'>{error ?? 'User not found'}</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700'
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 lg:px-8'>
      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-start'>
          <img
            src={`https://i.pravatar.cc/160?img=${user.id}`}
            alt={`${user.name}'s avatar`}
            className='h-28 w-28 rounded-2xl border border-slate-200 object-cover shadow-sm'
          />

          {!isEditing ? (
            <div className='flex-1'>
              <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
                {user.name}
              </h1>
              <p className='mt-1 text-slate-600'>{user.email}</p>
              <p className='mt-1 text-sm text-slate-500'>{user.phone}</p>
              <p className='mt-4 rounded-xl bg-slate-50 p-4 text-slate-700'>
                {formData.bio || 'No bio yet.'}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className='mt-5 rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700'
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className='flex-1 space-y-4'>
              <input
                type='text'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder='Name'
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-slate-500'
              />
              <input
                type='email'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder='Email'
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-slate-500'
              />
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder='Bio'
                rows={4}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-slate-500'
              />
              <div className='flex gap-3'>
                <button
                  onClick={() => setIsEditing(false)}
                  className='rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className='rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700'
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8'>
        <h2 className='text-2xl font-semibold tracking-tight text-slate-900'>
          Recent Posts ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <p className='mt-4 text-slate-600'>No posts yet.</p>
        ) : (
          <div className='mt-6 grid gap-4'>
            {posts.map((post) => (
              <div
                key={post.id}
                className='rounded-2xl border border-slate-200 bg-slate-50 p-5'
              >
                <h3 className='text-lg font-semibold text-slate-900'>
                  {post.title}
                </h3>
                <p className='mt-2 text-slate-700'>
                  {post.body.length > 150
                    ? `${post.body.substring(0, 150)}...`
                    : post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
