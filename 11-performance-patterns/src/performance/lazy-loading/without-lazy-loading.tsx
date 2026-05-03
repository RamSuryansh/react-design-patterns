import { useState } from 'react'
import Heavy from './heavy'
import Light from './light'

const WithoutLazyLoading = () => {
  const [show, setShow] = useState(false)

  return (
    <div className='p-5 border rounded flex flex-col gap-5'>
      <h1 className='text-blue-500'>Non-Lazy Demo</h1>
      <p>Heavy component is bundled with the app (non-lazy).</p>

      <Light />

      <button
        onClick={() => setShow((s) => !s)}
        className='bg-blue-500 text-white p-2 rounded'
      >
        {show ? 'Hide Heavy' : 'Show Heavy'}
      </button>

      {show && <Heavy />}
    </div>
  )
}

export default WithoutLazyLoading
