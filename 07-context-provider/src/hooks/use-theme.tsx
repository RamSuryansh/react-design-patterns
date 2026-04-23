import { use } from 'react'
import { ThemeContext } from '../context'

const useTheme = () => {
  const { theme, toggleTheme } = use(ThemeContext)

  return { theme, toggleTheme }
}

export { useTheme }
