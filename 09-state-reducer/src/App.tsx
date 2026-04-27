import Toggle from './components/toggle'
import { customToggleReducer, toggleReducer } from './reducer/toggle'

function App() {
  return (
    <div className='container m-auto p-5 space-x-10'>
      <h1 className='text-2xl text-blue-500 mb-5'>
        Reducer pattern: Custom Toggle
      </h1>
      <Toggle reducer={customToggleReducer} onToggle={(v) => console.log(v)} />
      <Toggle reducer={toggleReducer} onToggle={(v) => console.log(v)} />
    </div>
  )
}

export default App
