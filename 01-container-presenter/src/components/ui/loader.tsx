const Loader = ({ loadingText }: { loadingText?: string }) => {
  return (
    <div className='mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-4'>
      <div className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
        <p className='text-slate-700'>{loadingText || 'Loading...'}</p>
      </div>
    </div>
  )
}

export default Loader
