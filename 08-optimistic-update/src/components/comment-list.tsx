import React from 'react'
import type { Comment } from '../api/comments'

type Props = {
  comments: Comment[]
}

const CommentList: React.FC<Props> = ({ comments }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (comments.length === 0) {
    return (
      <p className='text-gray-500 italic'>
        No comments yet. Be the first to comment!
      </p>
    )
  }

  return (
    <div className='space-y-4'>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className={`p-4 bg-gray-50 rounded-lg border ${
            comment.pending
              ? 'border-dashed border-blue-300 bg-blue-50'
              : 'border-gray-200'
          }`}
        >
          <div className='flex items-center justify-between mb-2'>
            <span className='font-semibold text-gray-700'>
              {comment.pending ? 'Sending...' : 'Anonymous'}
            </span>
            <span className='text-xs text-gray-500'>
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className='text-gray-800'>{comment.body}</p>
          {comment.pending && (
            <span className='text-xs text-blue-500 italic mt-2 block'>
              Sending...
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default CommentList
