import MemoizedProfileTracker from './performance/memoization/memo/memoized-profile-tracker'

function App() {
  return (
    <div className='container m-auto p-5'>
      <div className=''>
        <h1 className='text-2xl text-blue-500'>Performance Patterns</h1>
        <MemoizedProfileTracker />
      </div>
    </div>
  )
}

export default App
