export type FormFieldName = 'name' | 'email'

export type FormValues = Record<FormFieldName, string>

export type FormErrors = Partial<Record<FormFieldName, string>>

export type FormState = {
  values: FormValues
  errors: FormErrors
}

export type ChangeFieldAction = {
  type: 'CHANGE_FIELD'
  payload: {
    name: FormFieldName
    value: string
  }
}

export type ResetFormAction = {
  type: 'RESET_FORM'
}

export type FormAction = ChangeFieldAction | ResetFormAction

export type FormReducer = (state: FormState, action: FormAction) => FormState

export const initialFormState: FormState = {
  values: { name: '', email: '' },
  errors: {},
}

const defaultFormReducer: FormReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const { name, value } = action.payload
      const errors = { ...state.errors }

      // Simple inline validation rules
      if (name === 'email' && !value.includes('@')) {
        errors.email = 'Invalid email address'
      } else {
        delete errors[name]
      }

      return {
        ...state,
        values: { ...state.values, [name]: value },
        errors,
      }
    }

    case 'RESET_FORM':
      return initialFormState

    default:
      return state
  }
}

const customFormReducer: FormReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const { name, value } = action.payload
      const base = {
        ...state,
        values: { ...state.values, [name]: value },
        errors: { ...state.errors },
      }

      // Custom logic: restrict name to letters only
      if (name === 'name' && /\d/.test(value)) {
        base.errors.name = 'Name cannot contain numbers'
      } else if (name === 'email' && !value.endsWith('.com')) {
        base.errors.email = 'Email must end with .com'
      } else {
        delete base.errors[name]
      }

      return base
    }

    default:
      return state
  }
}

export { customFormReducer, defaultFormReducer }
