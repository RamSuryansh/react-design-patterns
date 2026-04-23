import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import BrandProvider from './providers/brand-provider.tsx'
import ThemeProvider from './providers/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrandProvider>
        <App />
      </BrandProvider>
    </ThemeProvider>
  </StrictMode>,
)
