import { techPostsDb } from './mock-db'
import { simulateApi } from './network'

export interface LikePostResponse {
  postId: number
  likeCount: number
}

// Replace body with your backend mutation when API is available.
export async function likePost(postId: number): Promise<LikePostResponse> {
  return simulateApi(
    () => {
      const target = techPostsDb.find((post) => post.id === postId)

      if (!target) {
        throw new Error('Post not found')
      }

      target.likeCount += 1

      return {
        postId,
        likeCount: target.likeCount,
      }
    },
    {
      failureRate: 0.16,
      errorMessage: 'Could not register your like right now.',
    },
  )
}
