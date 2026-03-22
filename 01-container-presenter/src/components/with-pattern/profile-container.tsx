import axios from 'axios'
import { useEffect, useState } from 'react'

import Error from '../ui/error'
import Loader from '../ui/loader'
import UserPosts from './user-posts'
import UserProfile from './user-profile'

import { API_BASE_URL } from './constants'
import type { ApiPost, ApiUser, UserFormData } from './types'

function ProfileContainer({ userId }: { userId: number }) {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [posts, setPosts] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    bio: '',
  })

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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

  if (loading) {
    return <Loader loadingText='Loading user profile...' />
  }

  if (error || !user) {
    return <Error error={error || 'User not found'} />
  }

  return (
    <div className='mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 lg:px-8'>
      <UserProfile
        formData={formData}
        handleInputChange={handleInputChange}
        user={user}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSaveProfile={handleSaveProfile}
      />
      <UserPosts posts={posts} />
    </div>
  )
}

export default ProfileContainer
