import type { JSX } from 'react'
import { useToggle } from '../hooks/use-toggle'

function ThemeSwitcher(): JSX.Element {
  const [isDark, toggleTheme] = useToggle()
  return (
    <button
      onClick={toggleTheme}
      className='px-2 py-1 mt-5 border rounded-full hover:shadow-lg transition'
    >
      {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )
}

export default ThemeSwitcher
