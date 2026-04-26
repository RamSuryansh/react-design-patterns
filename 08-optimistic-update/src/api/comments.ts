// Comment type definition
export interface Comment {
  id: number
  postId: number
  body: string
  createdAt: string
  pending?: boolean // for optimistic state
}

// Fake server delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Simulated database of comments
const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    body: 'Great post! Thanks for sharing.',
    createdAt: '2026-04-24T10:00:00Z',
  },
  {
    id: 2,
    postId: 1,
    body: 'This was really helpful 🙏',
    createdAt: '2026-04-24T11:30:00Z',
  },
  {
    id: 3,
    postId: 1,
    body: 'Looking forward to more content like this!',
    createdAt: '2026-04-24T14:15:00Z',
  },
]

let nextId = 4

// API simulation - GET comments for a post
export async function getComments(postId: number): Promise<Comment[]> {
  await delay(500) // simulate network latency
  return comments.filter((c) => c.postId === postId)
}

// API simulation - POST a new comment
export async function postComment(
  postId: number,
  body: string,
): Promise<Comment> {
  await delay(1000) // simulate network latency

  // Simulate 20% failure rate for testing error handling
  if (Math.random() < 0.2) {
    throw new Error('Failed to post comment. Please try again.')
  }

  const newComment: Comment = {
    id: nextId++,
    postId,
    body,
    createdAt: new Date().toISOString(),
  }

  comments.push(newComment)
  return newComment
}
