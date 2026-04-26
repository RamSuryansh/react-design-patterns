import React, { useState, startTransition } from 'react';

type Props = {
  onSubmit: (body: string) => void;
  onErrorTest?: () => void;
};

const CommentForm: React.FC<Props> = ({ onSubmit, onErrorTest }) => {
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || isSubmitting) return;

    const trimmedBody = body.trim();
    setBody('');
    setIsSubmitting(true);

    startTransition(async () => {
      try {
        await onSubmit(trimmedBody);
      } catch {
        // Error is handled by parent via state
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  const handleErrorTest = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setBody('');

    startTransition(async () => {
      try {
        if (onErrorTest) {
          await onErrorTest();
        }
      } catch {
        // Error is handled by parent via state
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2'>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Write a comment...'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
          rows={3}
          disabled={isSubmitting}
        />
        <div className='flex items-center gap-2'>
          <button
            type='submit'
            disabled={!body.trim() || isSubmitting}
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
          {onErrorTest && (
            <button
              type='button'
              onClick={handleErrorTest}
              disabled={isSubmitting}
              className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
            >
              Test Error Rollback
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
