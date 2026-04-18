import { useState } from 'react'
import { doLogin } from '../action'

function useAuth() {
  const [user, setUser] = useState<{ name: string } | null>({ name: '' })

  const login = async (username: string, password: string) => {
    // fake API call
    const loggedIn = await doLogin(username, password)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    loggedIn && setUser({ name: username! })
  }

  const logout = () => setUser(null)

  return { user, login, logout, isAuthenticated: !!user }
}

export { useAuth }
