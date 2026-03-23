import React from 'react'

const UCFormWithoutRef = () => {
  const [error, setError] = React.useState<string>('')

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name) {
      setError('Name is required')
      return
    }

    if (!email) {
      setError('Email is required')
      return
    }

    if (!message) {
      setError('Message is required')
      return
    }

    setError('')
    console.log('Form Data:', { name, email, message })
  }

  return (
    <form className='card shadow-sm space-y-2' onSubmit={handleSubmit}>
      <input className='input' name='name' placeholder='Name' />
      <input className='input' name='email' placeholder='Email' type='email' />
      <textarea className='input' name='message' placeholder='Message' />
      <button className='button' type='submit'>
        Submit
      </button>

      {error && <p className='text-red-500'>{error}</p>}
    </form>
  )
}

export default UCFormWithoutRef
