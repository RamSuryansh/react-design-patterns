import FormFields from './components/form-fields'
import Toggle from './components/toggle'
import { FormProvider } from './provider/form-provider'
import { customFormReducer } from './reducer/form-reducer'
import { customToggleReducer, toggleReducer } from './reducer/toggle'

function App() {
  return (
    <div className='container m-auto p-5 space-y-10'>
      <div className=' m-auto p-5 space-x-10'>
        <h1 className='text-2xl text-blue-500 mb-5'>
          Reducer pattern: Custom Toggle
        </h1>
        <Toggle
          reducer={customToggleReducer}
          onToggle={(v) => console.log(v)}
        />
        <Toggle reducer={toggleReducer} onToggle={(v) => console.log(v)} />
      </div>
      <div className='p-5 space-x-10 max-w-2xl'>
        <h1 className='text-2xl text-blue-500 mb-5'>
          Reducer pattern: Custom Form
        </h1>
        <FormProvider reducer={customFormReducer}>
          <FormFields />
        </FormProvider>
      </div>
    </div>
  )
}

export default App
