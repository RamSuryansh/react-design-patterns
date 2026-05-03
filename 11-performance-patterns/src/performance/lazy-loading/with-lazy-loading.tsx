import { lazy, Suspense, useState } from 'react'
import Light from './light'

const LazyHeavy = lazy(() => import('./heavy')) // dynamic import for lazy loading

const WithLazyLoading = () => {
  const [show, setShow] = useState(false)

  return (
    <div className='p-5 border rounded flex flex-col gap-5'>
      <h1 className='text-blue-500'>Lazy Demo</h1>
      <p>Heavy component is loaded lazily when needed.</p>

      <Light />

      <button
        onClick={() => setShow((s) => !s)}
        className='bg-blue-500 text-white p-2 rounded'
      >
        {show ? 'Hide Heavy' : 'Show Heavy'}
      </button>

      <Suspense fallback={<div>Loading Heavy Component...</div>}>
        {show && <LazyHeavy />}
      </Suspense>
    </div>
  )
}

export default WithLazyLoading
