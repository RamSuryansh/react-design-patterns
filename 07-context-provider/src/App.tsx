import { useBrand } from './hooks/use-brand'
import { useTheme } from './hooks/use-theme'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { brand, color } = useBrand()

  console.log('App rendered', theme)

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#000',
        color: theme === 'light' ? '#000' : '#fff',
        height: '100vh',
      }}
    >
      <nav className='flex justify-between bg-slate-500 p-1'>
        <h1 className='text-3xl text-amber-500'>My App</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </nav>
      <main className='p-4 text-center'>
        <p className='text-xl m-3'>
          {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </p>
        My brand:<p className={`text-${color} text-2xl font-bold`}> {brand}</p>
      </main>
    </div>
  )
}

export default App
