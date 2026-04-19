import React from 'react'
import { ThemeContext } from '../context'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    document.body.classList.toggle(theme)
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}

export default ThemeProvider
