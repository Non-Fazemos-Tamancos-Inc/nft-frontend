import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AdminRoutes } from './admin/routes.tsx'
import { CustomerRoutes } from './customer/routes.tsx'
import { NotFound } from './error/NotFound.tsx'

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
