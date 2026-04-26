import {
  startTransition,
  useOptimistic,
  useState,
  type FormEvent,
} from 'react'
import { createComment } from '../../services/comment-service'
import { likePost } from '../../services/like-service'
import type { PostComment, TechPost } from '../../types/feed'

type Props = {
  post: TechPost
  initialComments: PostComment[]
}

const categoryStyles: Record<TechPost['category'], string> = {
  AI: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  Cloud: 'bg-sky-100 text-sky-800 border-sky-200',
  Security: 'bg-amber-100 text-amber-800 border-amber-200',
  Frontend: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
  Robotics: 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

function formatRelativeTime(isoDate: string) {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const diffMin = Math.floor(diffMs / (1000 * 60))

  if (diffMin < 60) return `${diffMin}m ago`

  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`

  const diffDay = Math.floor(diffHr / 24)
  return `${diffDay}d ago`
}

export default function PostCard({ post, initialComments }: Props) {
  const [likes, setLikes] = useState(post.likeCount)
  const [comments, setComments] = useState(initialComments)
  const [commentInput, setCommentInput] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isCommenting, setIsCommenting] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, delta: number) => current + delta,
  )

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (current, optimisticEntry: PostComment) => [optimisticEntry, ...current],
  )

  const commentCount = optimisticComments.length

  const handleLike = () => {
    if (isLiking) return

    setFeedback(null)
    setIsLiking(true)

    startTransition(async () => {
      addOptimisticLike(1)

      try {
        const result = await likePost(post.id)
        setLikes(result.likeCount)
      } catch (error) {
        setFeedback(
          error instanceof Error
            ? error.message
            : 'Unable to process like at the moment.',
        )
      } finally {
        setIsLiking(false)
      }
    })
  }

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const body = commentInput.trim()
    if (!body || isCommenting) return

    const optimisticEntry: PostComment = {
      id: `temp-${Date.now()}`,
      postId: post.id,
      author: 'You',
      body,
      createdAt: new Date().toISOString(),
      pending: true,
    }

    setCommentInput('')
    setFeedback(null)
    setIsCommenting(true)

    startTransition(async () => {
      addOptimisticComment(optimisticEntry)

      try {
        const saved = await createComment({
          postId: post.id,
          body,
          author: 'You',
        })

        setComments((previous) => [saved, ...previous])
      } catch (error) {
        setFeedback(
          error instanceof Error
            ? error.message
            : 'Unable to publish comment right now.',
        )
      } finally {
        setIsCommenting(false)
      }
    })
  }

  return (
    <article className='group rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-[0_18px_40px_-24px_rgba(14,20,28,0.35)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-22px_rgba(14,20,28,0.38)]'>
      <header className='mb-4'>
        <div className='mb-3 flex items-center justify-between gap-3'>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${categoryStyles[post.category]}`}
          >
            {post.category}
          </span>
          <span className='text-xs font-medium text-slate-500'>
            {formatRelativeTime(post.publishedAt)}
          </span>
        </div>

        <h2 className='text-xl font-semibold leading-tight text-slate-900'>
          {post.title}
        </h2>

        <p className='mt-3 text-sm leading-relaxed text-slate-600'>
          {post.summary}
        </p>

        <p className='mt-4 text-xs font-medium uppercase tracking-wide text-slate-400'>
          by {post.author} · {post.readMinutes} min read
        </p>
      </header>

      <div className='mb-4 flex items-center gap-4 border-y border-slate-100 py-3'>
        <button
          type='button'
          onClick={handleLike}
          disabled={isLiking}
          className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <span aria-hidden='true'>+</span>
          <span>{optimisticLikes} likes</span>
        </button>

        <span className='text-sm font-medium text-slate-500'>
          {commentCount} comments
        </span>

        <span className='ml-auto inline-flex items-center gap-2 text-xs font-semibold text-emerald-600'>
          <span className='h-2 w-2 animate-pulse rounded-full bg-emerald-500'></span>
          Live updates
        </span>
      </div>

      <form onSubmit={handleCommentSubmit} className='mb-4'>
        <label htmlFor={`comment-input-${post.id}`} className='sr-only'>
          Add comment
        </label>
        <div className='rounded-xl border border-slate-200 bg-slate-50 p-3'>
          <textarea
            id={`comment-input-${post.id}`}
            value={commentInput}
            onChange={(event) => setCommentInput(event.target.value)}
            rows={3}
            placeholder='Share your take...'
            className='w-full resize-none rounded-lg border border-transparent bg-white p-3 text-sm text-slate-700 outline-none ring-cyan-500 transition placeholder:text-slate-400 focus:border-slate-200 focus:ring'
            disabled={isCommenting}
          />
          <div className='mt-3 flex justify-end'>
            <button
              type='submit'
              disabled={!commentInput.trim() || isCommenting}
              className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300'
            >
              {isCommenting ? 'Posting...' : 'Post comment'}
            </button>
          </div>
        </div>
      </form>

      {feedback && (
        <p className='mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700'>
          {feedback}
        </p>
      )}

      <div className='space-y-3'>
        {optimisticComments.length === 0 ? (
          <p className='rounded-lg border border-dashed border-slate-200 px-3 py-4 text-center text-sm text-slate-500'>
            No comments yet. Start the discussion.
          </p>
        ) : (
          optimisticComments.map((comment) => (
            <div
              key={comment.id}
              className={`rounded-lg border px-3 py-2 transition ${
                comment.pending
                  ? 'border-cyan-200 bg-cyan-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className='mb-1 flex items-center justify-between text-xs'>
                <span className='font-semibold uppercase tracking-wide text-slate-600'>
                  {comment.pending ? 'Sending' : comment.author}
                </span>
                <span className='text-slate-400'>
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
              <p className='text-sm text-slate-700'>{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </article>
  )
}
