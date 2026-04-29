import React, { useState } from 'react';

type Props = {
  onSubmit: (body: string) => void;
  onErrorTest?: () => void;
};

const CommentForm: React.FC<Props> = ({ onSubmit, onErrorTest }) => {
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    const trimmedBody = body.trim();
    setBody('');
    onSubmit(trimmedBody);
  };

  const handleErrorTest = () => {
    setBody('');
    if (onErrorTest) {
      onErrorTest();
    }
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
        />
        <div className='flex items-center gap-2'>
          <button
            type='submit'
            disabled={!body.trim()}
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
          >
            Post Comment
          </button>
          {onErrorTest && (
            <button
              type='button'
              onClick={handleErrorTest}
              className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors'
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
