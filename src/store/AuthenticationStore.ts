import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { User } from '../api/types.ts'
import { getUserById, login, register } from '../api/users.ts'
import { ApiError } from '../api/utils.ts'

export const tokenKey = 'authToken'

export interface AuthenticationStore {
  user: User | null
  loading: boolean

  refresh: () => Promise<void>
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  register: (
    name: string,
    email: string,
    password: string,
    walletAddress?: string,
  ) => Promise<void>
}

export const useAuthenticationStore = create(
  persist<AuthenticationStore>(
    (set) => ({
      user: null,
      loading: false,

      refresh: async () => {
        set({ loading: true })

        const storedToken = localStorage.getItem(tokenKey)

        if (!storedToken) {
          set({ loading: false })
          return
        }

        try {
          const { user } = await getUserById('me')
          set({ user })
        } catch (error) {
          const errMsg = (error || '').toString()

          if (
            errMsg === 'authentication failed' ||
            (error instanceof ApiError && error.status === 401)
          ) {
            localStorage.removeItem(tokenKey)
            set({ user: null })

            throw new ApiError('Your session has expired. Please log in again.')
          }

          throw error
        } finally {
          set({ loading: false })
        }
      },

      login: async (email: string, password: string) => {
        set({ loading: true })

        try {
          const { user, token } = await login(email, password)
          localStorage.setItem(tokenKey, token)
          set({ user })
          return user
        } finally {
          set({ loading: false })
        }
      },

      logout: async () => {
        localStorage.removeItem(tokenKey)
        set({ user: null })
      },

      register: async (
        name: string,
        email: string,
        password: string,
        walletAddress?: string,
      ) => {
        set({ loading: true })

        try {
          const { user, token } = await register(name, email, password, walletAddress)

          localStorage.setItem(tokenKey, token)
          set({ user })
        } finally {
          set({ loading: false })
        }
      },
    }),
    {
      name: 'authentication-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
