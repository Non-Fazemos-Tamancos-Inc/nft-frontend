import { Navigate, Route, Routes } from 'react-router-dom'

import { NotFound } from '../error/NotFound.tsx'

import { Cart } from './Cart.tsx'
import { Collections } from './Collections.tsx'
import { Home } from './Home.tsx'
import { Login } from './Login.tsx'
import { NftDetails } from './NftDetails.tsx'
import { Nfts } from './Nfts.tsx'
import { PayCard } from './PayCard.tsx'
import { PayCrypto } from './PayCrypto.tsx'
import { Profile } from './Profile.tsx'
import { PurchaseConfirmation } from './PurchaseConfirmation.tsx'
import { PurchaseFailure } from './PurchaseFailure.tsx'
import { Register } from './Register.tsx'

export const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="./home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/:collectionId" element={<Nfts />} />
      <Route path="/collections/:collectionId/:id" element={<NftDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cart/card" element={<PayCard />} />
      <Route path="/cart/crypto" element={<PayCrypto />} />
      <Route path="/cart/confirmation" element={<PurchaseConfirmation />} />
      <Route path="/cart/failure" element={<PurchaseFailure />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
