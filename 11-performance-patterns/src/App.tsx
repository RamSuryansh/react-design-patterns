import SearchDemo from './performance/debouncing/search-demo'
import WithLazyLoading from './performance/lazy-loading/with-lazy-loading'
// import WithoutLazyLoading from './performance/lazy-loading/without-lazy-loading'
import MemoizedProfileTracker from './performance/memoization/memo/memoized-profile-tracker'
import CallbackParent from './performance/memoization/use-callback/parent'
import UsersSortingWithUseMemo from './performance/memoization/use-memo/user-sorting'
import ScrollTracker from './performance/throttling/scroll-tracker'

function App() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='container p-5'>
        <h1 className='text-2xl text-blue-500'>Performance Patterns</h1>
        <div className='mt-5 border rounded p-2'>
          <h1 className='text-blue-500'>Use Memo:</h1>
          <MemoizedProfileTracker />
        </div>
        <div className='mt-5 border rounded p-2'>
          <h1 className='text-blue-500'>Use Callback:</h1>
          <CallbackParent />
        </div>
        <div className='mt-5 border rounded p-2'>
          <h1 className='text-blue-500'>
            Use Memo for expensive calculations:
          </h1>
          <UsersSortingWithUseMemo />
        </div>
        <div className='mt-5 border rounded p-2'>
          <h1 className='text-blue-500'>Debouncing:</h1>
          <SearchDemo />
        </div>
        <div className='mt-5 border rounded p-2'>
          <h1 className='text-blue-500'>Throttling:</h1>
          <ScrollTracker />
        </div>
      </div>
      <div className='container p-5'>
        <h1 className='text-2xl text-green-500'>Lazy Loading</h1>
        {/* <WithoutLazyLoading /> */}
        <WithLazyLoading />
      </div>
    </div>
  )
}

export default App
