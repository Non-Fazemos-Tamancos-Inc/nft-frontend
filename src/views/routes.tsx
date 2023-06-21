import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './error/NotFound.tsx'
import { AdminRoutes } from './admin/routes.tsx'
import { CustomerRoutes } from './customer/routes.tsx'

export function Router() {
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
