import { useState, type JSX } from 'react'
import { useAuth } from '../hooks/use-auth'

type FormState = { username: string; password: string }

export default function AuthPanel(): JSX.Element {
  const { user, login, logout, isAuthenticated } = useAuth()
  const [form, setForm] = useState<FormState>({ username: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(form.username, form.password)
  }

  return (
    <div className='m-2 p-1 rounded'>
      <h2 className='text-3xl my-2'>🧑‍💻 Authentication Panel</h2>

      {isAuthenticated ? (
        <>
          <p>
            Welcome, <strong>{user?.name}</strong> 🎉
          </p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={form.username}
            onChange={handleChange}
            className='border rounded-xl p-1 my-3'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={form.password}
            onChange={handleChange}
            className='border rounded-xl p-1'
            required
          />
          <button type='submit'>Login</button>
        </form>
      )}
    </div>
  )
}
