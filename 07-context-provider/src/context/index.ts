import { createContext } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

const BrandContext = createContext<{ brand: string; color: string }>({
  brand: 'My Brand',
  color: 'blue-500',
})

export { BrandContext, ThemeContext }
