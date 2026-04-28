import type { ChangeEvent } from 'react'
import { useFormContext } from '../provider/form-provider'
import type { FormFieldName } from '../reducer/form-reducer'

export default function FormFields() {
  const { state, dispatch } = useFormContext()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        name: e.target.name as FormFieldName,
        value: e.target.value,
      },
    })
  }

  return (
    <div className='flex flex-col space-y-3'>
      <input
        name='name'
        value={state.values.name}
        onChange={handleChange}
        placeholder='Enter your name'
        className='border p-2 rounded'
      />
      <input
        name='email'
        value={state.values.email}
        onChange={handleChange}
        placeholder='Enter your email'
        className='border p-2 rounded'
      />

      <ul>
        {Object.entries(state.errors).map(([field, msg]) => (
          <li key={field} className='text-red-600 text-sm list-disc ml-5'>
            {msg}
          </li>
        ))}
      </ul>
    </div>
  )
}
