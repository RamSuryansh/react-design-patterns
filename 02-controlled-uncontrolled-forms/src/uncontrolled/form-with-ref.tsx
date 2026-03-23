/* eslint-disable react-hooks/refs */
import React from 'react'

const UCFormWithRef = () => {
  const messageRef = React.useRef<HTMLTextAreaElement>(null)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const [error, setError] = React.useState<string>('')

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const message = messageRef.current?.value

    if (!name) {
      setError('Name is required')
      nameRef.current?.focus()
      return
    }

    if (!email) {
      setError('Email is required')
      emailRef.current?.focus()
      return
    }

    if (!message) {
      setError('Message is required')
      messageRef.current?.focus()
      return
    }

    setError('')
    console.log('Form Data:', { name, email, message })
  }

  return (
    <form className='card shadow-sm space-y-2' onSubmit={handleSubmit}>
      <input className='input' ref={nameRef} name='name' placeholder='Name' />
      <input
        className='input'
        ref={emailRef}
        name='email'
        placeholder='Email'
        type='email'
      />
      <textarea
        className='input'
        ref={messageRef}
        name='message'
        placeholder='Message'
      />
      <button className='button' type='submit'>
        Submit
      </button>

      {error && <p className='text-red-500'>{error}</p>}

      {/* show submitted data */}
      {nameRef.current?.value &&
        emailRef.current?.value &&
        messageRef.current?.value && (
          <div className='mt-4 card bg-green-100 p-3'>
            <h3 className='font-bold'>Submitted Data:</h3>
            <p>Name: {nameRef.current?.value}</p>
            <p>Email: {emailRef.current?.value}</p>
            <p>Message: {messageRef.current?.value}</p>
          </div>
        )}
    </form>
  )
}

export default UCFormWithRef
