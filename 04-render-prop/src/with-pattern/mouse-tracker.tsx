import { useState } from 'react'
function MouseTracker({
  render,
}: {
  render: (pos: { x: number; y: number }) => React.ReactNode
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div className='border p-2 w-full h-48 my-2' onMouseMove={handleMouseMove}>
      {render(pos)}
    </div>
  )
}

export default MouseTracker
