import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { User } from '../api/types.ts'
import { login, logout, register } from '../api/api.ts'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, setCurrentUser } from '../store/AuthenticationStore.ts'

export interface AuthContextData {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name?: string, email?: string, password?: string, wallet?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: false,
  logout: async () => {},
  login: async () => {},
  register: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const useAuthRequired = () => {
  const { user, loading, ...data } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      return
    }

    if (user == null) {
      navigate('/login')
    }
  }, [user, loading])

  return { user, ...data }
}

export const useNoAuth = () => {
  const { user, loading, ...data } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      return
    }

    if (user != null) {
      navigate('/profile')
    }
  }, [user])

  return { user, ...data }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const user = getCurrentUser()
    setUser(user)
    setLoading(false)
  }, [])

  const localLogin = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await login(email, password)
      setUser(response)
      if (response) {
        setCurrentUser(response)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const localRegister = useCallback(
    async (name?: string, email?: string, password?: string, wallet?: string) => {
      try {
        setLoading(true)
        const response = await register(name, email, password, wallet)
        setUser(response)
        if (response) {
          setCurrentUser(response)
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const localLogout = useCallback(async () => {
    try {
      setLoading(true)

      if (user?._id == null) {
        return
      }

      await logout(user._id)
      setUser(null)
      setLoading(false)
      setCurrentUser()
    } finally {
      setLoading(false)
    }
  }, [user?._id])

  return (
    <AuthContext.Provider
      value={{ user, login: localLogin, logout: localLogout, register: localRegister, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
