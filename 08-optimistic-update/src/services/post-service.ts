import { techPostsDb } from './mock-db'
import { simulateApi } from './network'
import type { TechPost } from '../types/feed'

// Swap implementation with your real API call when backend is ready.
export async function fetchTechPosts(): Promise<TechPost[]> {
  return simulateApi(() =>
    techPostsDb
      .slice()
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      ),
  )
}
