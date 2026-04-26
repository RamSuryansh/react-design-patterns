import React, {
  startTransition,
  useEffect,
  useOptimistic,
  useState,
} from 'react'
import type { Comment } from '../api/comments'
import { getComments, postComment } from '../api/comments'
import CommentForm from './comment-form'
import CommentList from './comment-list'

const POST_ID = 1

// Reducer for optimistic updates - adds a pending comment at the top
function commentsReducer(current: Comment[], newComment: Comment): Comment[] {
  return [newComment, ...current]
}

const PostView: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Optimistic state reflects the list including any pending changes
  const [optimisticComments, dispatchOptimistic] = useOptimistic(
    comments,
    commentsReducer,
  )

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(POST_ID)
        setComments(data)
      } catch (err) {
        console.error('Failed to load comments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [])

  const handleAddComment = async (body: string) => {
    const tempComment: Comment = {
      id: Date.now(), // temporary id
      postId: POST_ID,
      body,
      createdAt: new Date().toISOString(),
      pending: true,
    }

    setErrorMsg(null)

    startTransition(async () => {
      // Immediately show optimistic comment in the list
      dispatchOptimistic(tempComment)

      try {
        const savedComment = await postComment(POST_ID, body)
        // Replace with real comment on success
        setComments((prev) => [savedComment, ...prev])
      } catch (err) {
        // Optimistic comment is automatically removed when transition ends
        // Show error message
        setErrorMsg(
          err instanceof Error ? err.message : 'Failed to post comment',
        )
      }
    })
  }

  const handleErrorTest = async () => {
    const tempComment: Comment = {
      id: Date.now(),
      postId: POST_ID,
      body: 'This comment will fail (test error rollback)',
      createdAt: new Date().toISOString(),
      pending: true,
    }

    setErrorMsg(null)

    startTransition(async () => {
      // Immediately show optimistic comment
      dispatchOptimistic(tempComment)

      try {
        // Always throw to simulate a guaranteed failure
        await new Promise((_, reject) => {
          setTimeout(
            () => reject(new Error('Simulated error for testing rollback')),
            8000,
          )
        })
      } catch (err) {
        // Optimistic comment gets automatically removed
        setErrorMsg(err instanceof Error ? err.message : 'Test failed')
      }
    })
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-40'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Understanding useOptimistic in React
        </h1>
        <p className='text-gray-600 leading-relaxed'>
          The{' '}
          <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
            useOptimistic
          </code>{' '}
          hook allows you to update the UI immediately while an async action is
          in progress, creating a smoother user experience by showing the
          expected outcome right away.
        </p>
      </div>

      <div className='border-t border-gray-200 pt-6'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Comments</h2>
        {errorMsg && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm'>
            {errorMsg}
          </div>
        )}
        <CommentForm
          onSubmit={handleAddComment}
          onErrorTest={handleErrorTest}
        />
        <div className='mt-4'>
          <CommentList comments={optimisticComments} />
        </div>
      </div>
    </div>
  )
}

export default PostView
