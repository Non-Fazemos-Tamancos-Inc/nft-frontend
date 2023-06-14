import { Router } from './routes.tsx'

import { AuthProvider } from '../hooks/useAuth.tsx'

export function Index() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  )
}
