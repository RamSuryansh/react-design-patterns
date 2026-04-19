import { useState } from 'react'
import { doLogin } from '../action'

type User = { name: string }

function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string): Promise<void> => {
    const loggedIn = await doLogin(username, password)
    if (loggedIn) setUser({ name: username })
  }

  const logout = (): void => setUser(null)

  return { user, login, logout, isAuthenticated: !!user }
}

export { useAuth }
