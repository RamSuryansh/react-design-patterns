import React from 'react'

type FormData = {
  name: string
  email: string
  message: string
}

/**
 * In this implementation, we have a single state object `form` that holds all the form data. We also have individual refs for each input field to manage focus when validation fails, it is just for DOM manipulation. The `handleFormValueChange` function updates the corresponding field in the `form` state whenever an input value changes. The `handleSubmit` function validates the form data and sets focus to the first invalid field if any validation fails. If all validations pass, it logs the form data to the console.
 *
 */

const ControlledFeedbackForm = () => {
  const [form, setForm] = React.useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [error, setError] = React.useState<string>('')
  const messageRef = React.useRef<HTMLTextAreaElement>(null)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)

  const handleFormValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.name) {
      setError('Name is required')
      nameRef.current?.focus()
      return
    }

    if (!form.email) {
      setError('Email is required')
      emailRef.current?.focus()
      return
    }

    if (!form.message) {
      setError('Message is required')
      messageRef.current?.focus()
      return
    }

    setError('')
    console.log('Form Data:', form)
  }

  return (
    <form className='card shadow-sm space-y-2' onSubmit={handleSubmit}>
      <input
        className='input'
        ref={nameRef}
        name='name'
        placeholder='Name'
        value={form.name}
        onChange={handleFormValueChange}
      />
      <input
        className='input'
        ref={emailRef}
        name='email'
        placeholder='Email'
        value={form.email}
        onChange={handleFormValueChange}
        type='email'
      />
      <textarea
        className='input'
        ref={messageRef}
        name='message'
        placeholder='Message'
        value={form.message}
        onChange={handleFormValueChange}
      />
      <button className='button' type='submit'>
        Submit
      </button>

      {error && <p className='text-red-500'>{error}</p>}

      {/* show submitted data */}
      {form.name && form.email && form.message && (
        <div className='mt-4 card bg-green-100 p-3'>
          <h3 className='font-bold'>Submitted Data:</h3>
          <p>Name: {form.name}</p>
          <p>Email: {form.email}</p>
          <p>Message: {form.message}</p>
        </div>
      )}
    </form>
  )
}

export default ControlledFeedbackForm
