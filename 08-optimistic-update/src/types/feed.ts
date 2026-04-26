export interface TechPost {
  id: number
  title: string
  summary: string
  category: 'AI' | 'Cloud' | 'Security' | 'Frontend' | 'Robotics'
  author: string
  readMinutes: number
  publishedAt: string
  likeCount: number
}

export interface PostComment {
  id: number | string
  postId: number
  author: string
  body: string
  createdAt: string
  pending?: boolean
}

export interface CreateCommentInput {
  postId: number
  body: string
  author?: string
}
