/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from 'react'
import { defaultFormReducer } from '../reducer/form-reducer'

const FormContext = createContext()

export function FormProvider({ reducer = defaultFormReducer, children }) {
  const [state, dispatch] = useReducer(reducer, {
    values: { name: '', email: '' },
    errors: {},
  })

  const value = { state, dispatch }
  return <FormContext value={value}>{children}</FormContext>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context)
    throw new Error('useFormContext must be used within a FormProvider')
  return context
}
