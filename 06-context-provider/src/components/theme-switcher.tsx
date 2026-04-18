import type { JSX } from 'react'
import { useToggle } from '../hooks/use-toggle'

function ThemeSwitcher(): JSX.Element {
  const [isDark, toggleTheme] = useToggle()
  return (
    <button onClick={toggleTheme}>
      {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )
}

export default ThemeSwitcher
