import { AuthProvider } from '../hooks/useAuth.tsx'

import { Router } from './routes.tsx'

export function Index() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
