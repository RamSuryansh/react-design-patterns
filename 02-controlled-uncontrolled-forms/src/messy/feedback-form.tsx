/* eslint-disable react-hooks/refs */
import React from 'react'

const MessyFeedbackForm = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const messageRef = React.useRef<HTMLTextAreaElement>(null)
  const [error, setError] = React.useState<string>('')

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name) {
      setError('Name is required')
      return
    }

    if (!email) {
      setError('Email is required')
      return
    }

    if (!messageRef.current?.value) {
      setError('Message is required')
      messageRef.current?.focus()
      return
    }

    setError('')

    const message = messageRef.current?.value
    console.log('Form Data:', { name, email, message })
  }

  return (
    <form className='card shadow-sm space-y-2' onSubmit={handleSubmit}>
      <input
        className='input'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='input'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea ref={messageRef} className='input' placeholder='Message' />
      <button className='button' type='submit'>
        Submit
      </button>

      {error && <p className='text-red-500'>{error}</p>}

      {/* show submitted data */}
      {name && email && messageRef.current?.value && (
        <div className='mt-4 card bg-green-100 p-3'>
          <h3 className='font-bold'>Submitted Data:</h3>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Message: {messageRef.current.value}</p>
        </div>
      )}
    </form>
  )
}

export default MessyFeedbackForm
