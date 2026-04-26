import { bumpCommentId, commentsDb } from './mock-db'
import { simulateApi } from './network'
import type { CreateCommentInput, PostComment } from '../types/feed'

// Replace with GET /posts/:postId/comments when backend is available.
export async function fetchCommentsByPost(postId: number): Promise<PostComment[]> {
  return simulateApi(() =>
    commentsDb
      .filter((item) => item.postId === postId)
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
  )
}

// Replace with POST /posts/:postId/comments when backend is available.
export async function createComment(
  input: CreateCommentInput,
): Promise<PostComment> {
  return simulateApi(
    () => {
      const newComment: PostComment = {
        id: bumpCommentId(),
        postId: input.postId,
        author: input.author ?? 'Guest User',
        body: input.body,
        createdAt: new Date().toISOString(),
      }

      commentsDb.push(newComment)
      return newComment
    },
    {
      failureRate: 0.2,
      errorMessage: 'Comment failed to send. Please try again.',
    },
  )
}
