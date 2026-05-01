import { memo } from 'react'

const Child = memo(function Child({ onClick }: { onClick: () => void }) {
  console.log('Child Rendered')
  return (
    <button
      className='bg-green-500 text-white px-4 py-2 rounded'
      onClick={onClick}
    >
      Click Me
    </button>
  )
})

export default Child
