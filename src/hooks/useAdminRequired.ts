import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { UserRole } from '../api/types.ts'
import { useAuthenticationStore } from '../store/AuthenticationStore.ts'

export function useAdminRequired() {
  const navigate = useNavigate()

  const { user } = useAuthenticationStore(({ user }) => ({ user }))

  useEffect(() => {
    if (user === undefined) {
      return
    }

    if (user === null) {
      toast('You need to be logged in to access this page', { type: 'error' })
      navigate('/admin/login')
    }

    if (user && user.role !== UserRole.Admin) {
      toast('You are not allowed to access this page', { type: 'error' })
      navigate('/admin/login')
    }
  }, [user, navigate])

  return { user }
}
