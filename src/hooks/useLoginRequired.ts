import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuthenticationStore } from '../store/AuthenticationStore.ts'

export function useLoginRequired() {
  const navigate = useNavigate()

  const { user } = useAuthenticationStore(({ user }) => ({ user }))

  useEffect(() => {
    if (user === undefined) {
      return
    }

    if (user === null) {
      toast('You need to be logged in to access this page', { type: 'error' })
      navigate('/login')
    }
  }, [user, navigate])

  return { user }
}
