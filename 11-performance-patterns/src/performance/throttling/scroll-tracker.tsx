import { useEffect, useState } from 'react'
import { useThrottle } from './hooks/use-throttle'

export default function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0)
  const throttledY = useThrottle(scrollY, 1000)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='border rounded h-48 p-5 flex items-center justify-center flex-col gap-2'>
      <p className=''>Scroll Position (Throttled)- {throttledY}</p>
      <p className='text-xs'>Tracking the web page scroll position</p>
    </div>
  )
}
