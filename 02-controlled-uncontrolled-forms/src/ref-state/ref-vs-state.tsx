/* eslint-disable react-hooks/refs */
import React from 'react'

function RefVsState() {
  const countRef = React.useRef<number>(0)
  const [count, setCount] = React.useState<number>(0)

  const handleRefIncrement = () => {
    countRef.current += 1
    console.log('Ref count: ', countRef.current)
  }

  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }

  console.log('RefVsState Rendered', countRef.current)

  return (
    <div className='flex w-full gap-5'>
      <div className='card'>
        <p>Ref Count: {countRef.current}</p>
        <button className='button' onClick={handleRefIncrement}>
          Increment
        </button>
      </div>
      <div className='card'>
        <p>State Count: {count}</p>
        <button className='button' onClick={handleIncrement}>
          Increment
        </button>
      </div>
    </div>
  )
}

export default RefVsState
