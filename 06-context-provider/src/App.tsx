import AuthPanel from './components/auth-panel'
import MoviesList from './components/movie-list'
import ThemeSwitcher from './components/theme-switcher'

function App() {
  return (
    <div className='flex flex-col items-center'>
      <ThemeSwitcher />
      <MoviesList />
      <AuthPanel />
    </div>
  )
}

export default App
