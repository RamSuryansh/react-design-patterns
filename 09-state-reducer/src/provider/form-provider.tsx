/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import {
  defaultFormReducer,
  initialFormState,
  type FormAction,
  type FormReducer,
  type FormState,
} from '../reducer/form-reducer'

type FormContextValue = {
  state: FormState
  dispatch: Dispatch<FormAction>
}

type FormProviderProps = {
  reducer?: FormReducer
  children: ReactNode
}

const FormContext = createContext<FormContextValue | undefined>(undefined)

export function FormProvider({
  reducer = defaultFormReducer,
  children,
}: FormProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialFormState)

  const value = { state, dispatch }
  return <FormContext value={value}>{children}</FormContext>
}

export function useFormContext(): FormContextValue {
  const context = useContext(FormContext)
  if (!context)
    throw new Error('useFormContext must be used within a FormProvider')
  return context
}
