const Error = ({ error, title }: { error?: string; title?: string }) => {
  return (
    <div className='mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-red-700'>
          {title ?? 'Oops! Something went wrong'}
        </h3>
        <p className='mt-2 text-red-600'>{error ?? 'User not found'}</p>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700'
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Error
