import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuthenticationStore } from '../store/AuthenticationStore.ts'
import { useLoaderStore } from '../store/LoaderStore.ts'

import { AdminRoutes } from './admin/routes.tsx'
import { CustomerRoutes } from './customer/routes.tsx'
import { NotFound } from './error/NotFound.tsx'

export function Router() {
  const [firstLoad, setFirstLoad] = useState(true)
  const { user, refresh } = useAuthenticationStore(({ user, refresh }) => ({
    user,
    refresh,
  }))
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    if (!firstLoad) return
    if (!refresh || !setFirstLoad || !addLoader || !removeLoader) {
      return
    }

    const handleRefresh = async () => {
      try {
        addLoader('auth-refresh')
        await refresh()
        setFirstLoad(false)
      } catch (err) {
        toast(err?.toString() || 'An error occurred', { type: 'error' })
      } finally {
        removeLoader('auth-refresh')
      }
    }

    handleRefresh().then().catch(console.error)
  }, [firstLoad, setFirstLoad, addLoader, removeLoader, refresh, user])

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Customer Routes */}
        <Route path="/*" element={<CustomerRoutes />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
