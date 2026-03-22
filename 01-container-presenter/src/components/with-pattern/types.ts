export type UserProfileProps = {
  userId: number
}

export type ApiUser = {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company?: {
    catchPhrase?: string
  }
}

export type ApiPost = {
  id: number
  userId: number
  title: string
  body: string
}

export type UserFormData = {
  name: string
  email: string
  bio: string
}
