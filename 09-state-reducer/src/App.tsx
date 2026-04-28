import FormFields from './components/form-fields'
import Toggle from './components/toggle'
import { FormProvider } from './provider/form-provider'
import { customFormReducer } from './reducer/form-reducer'
import { customToggleReducer, toggleReducer } from './reducer/toggle'

function App() {
  return (
    <div className=''>
      <div className='container m-auto p-5 space-x-10'>
        <h1 className='text-2xl text-blue-500 mb-5'>
          Reducer pattern: Custom Toggle
        </h1>
        <Toggle
          reducer={customToggleReducer}
          onToggle={(v) => console.log(v)}
        />
        <Toggle reducer={toggleReducer} onToggle={(v) => console.log(v)} />
      </div>
      <div className='c'>
        <FormProvider reducer={customFormReducer}>
          <FormFields />
        </FormProvider>
      </div>
    </div>
  )
}

export default App
