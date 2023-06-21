import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './Home.tsx'
import { Login } from './Login.tsx'
import { Register } from './Register.tsx'
import { Profile } from './Profile.tsx'
import { Collections } from './Collections.tsx'
import { Cart } from './Cart.tsx'
import { PayCard } from './PayCard.tsx'
import { PayCrypto } from './PayCrypto.tsx'
import { PurchaseConfirmation } from './PurchaseConfirmation.tsx'
import { NotFound } from '../error/NotFound.tsx'
import { CartProvider } from '../../hooks/useCart.tsx'

export const CustomerRoutes = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Navigate to="./home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/card" element={<PayCard />} />
        <Route path="/cart/crypto" element={<PayCrypto />} />
        <Route path="/cart/confirmation" element={<PurchaseConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  )
}
