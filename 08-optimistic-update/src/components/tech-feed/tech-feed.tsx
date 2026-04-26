import { useEffect, useState } from 'react'
import { fetchCommentsByPost } from '../../services/comment-service'
import { fetchTechPosts } from '../../services/post-service'
import type { PostComment, TechPost } from '../../types/feed'
import PostCard from './post-card'

type CommentsByPost = Record<number, PostComment[]>

export default function TechFeed() {
  const [posts, setPosts] = useState<TechPost[]>([])
  const [commentsByPost, setCommentsByPost] = useState<CommentsByPost>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    const load = async () => {
      try {
        const feedPosts = await fetchTechPosts()

        const commentsPairs = await Promise.all(
          feedPosts.map(async (post) => {
            const comments = await fetchCommentsByPost(post.id)
            return [post.id, comments] as const
          }),
        )

        if (!alive) return

        setPosts(feedPosts)
        setCommentsByPost(Object.fromEntries(commentsPairs))
      } catch (serviceError) {
        if (!alive) return

        setError(
          serviceError instanceof Error
            ? serviceError.message
            : 'Could not load live feed.',
        )
      } finally {
        if (alive) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      alive = false
    }
  }, [])

  if (loading) {
    return (
      <div className='mx-auto flex min-h-[40vh] max-w-5xl items-center justify-center px-6'>
        <div className='rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm'>
          <p className='text-sm font-semibold text-slate-600'>
            Loading live tech feed...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='mx-auto max-w-3xl px-6 py-10'>
        <div className='rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700'>
          {error}
        </div>
      </div>
    )
  }

  const totalLikes = posts.reduce((total, post) => total + post.likeCount, 0)

  return (
    <div className='mx-auto max-w-6xl px-6 pb-14 pt-10'>
      <header className='mb-8 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_20px_55px_-32px_rgba(15,23,42,0.45)] backdrop-blur'>
        <p className='mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600'>
          Realtime Interaction Demo
        </p>
        <h1 className='text-3xl font-semibold leading-tight text-slate-900 md:text-4xl'>
          Tech Pulse Feed with Optimistic Likes and Comments
        </h1>
        <p className='mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base'>
          This sample ships with 5 static tech posts and promise-based mock
          services. Every like and comment updates instantly with
          <code className='mx-1 rounded bg-slate-100 px-2 py-1 text-xs text-slate-700'>
            useOptimistic
          </code>
          while requests run in the background.
        </p>

        <div className='mt-6 grid gap-3 sm:grid-cols-3'>
          <div className='rounded-xl border border-slate-200 bg-slate-50 p-3'>
            <p className='text-xs uppercase tracking-wide text-slate-500'>Posts</p>
            <p className='mt-1 text-xl font-semibold text-slate-900'>{posts.length}</p>
          </div>
          <div className='rounded-xl border border-slate-200 bg-slate-50 p-3'>
            <p className='text-xs uppercase tracking-wide text-slate-500'>Comments</p>
            <p className='mt-1 text-xl font-semibold text-slate-900'>
              {Object.values(commentsByPost).flat().length}
            </p>
          </div>
          <div className='rounded-xl border border-slate-200 bg-slate-50 p-3'>
            <p className='text-xs uppercase tracking-wide text-slate-500'>Likes</p>
            <p className='mt-1 text-xl font-semibold text-slate-900'>{totalLikes}</p>
          </div>
        </div>
      </header>

      <section className='grid gap-5 lg:grid-cols-2'>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            initialComments={commentsByPost[post.id] ?? []}
          />
        ))}
      </section>
    </div>
  )
}
