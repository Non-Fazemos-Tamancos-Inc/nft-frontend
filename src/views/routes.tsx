import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AdminLogin } from './admin/AdminLogin'
import { CollectionListing } from './admin/CollectionListing.tsx'
import { ManageCollection } from './admin/ManageCollection.tsx'
import { ManageNft } from './admin/ManageNft.tsx'
import { ManageUser } from './admin/ManageUser.tsx'
import { NftListing } from './admin/NftListing.tsx'
import { OrderListing } from './admin/OrderListing.tsx'
import { UserListing } from './admin/UserListing.tsx'
import { Cart } from './customer/Cart.tsx'
import { Collections } from './customer/Collections.tsx'
import { Home } from './customer/Home.tsx'
import { Login } from './customer/Login.tsx'
import { PayCard } from './customer/PayCard.tsx'
import { PayCrypto } from './customer/PayCrypto.tsx'
import { Profile } from './customer/Profile.tsx'
import { PurchaseConfirmation } from './customer/PurchaseConfirmation.tsx'
import { Register } from './customer/Register.tsx'
import { NotFound } from './error/NotFound.tsx'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/card" element={<PayCard />} />
        <Route path="/cart/crypto" element={<PayCrypto />} />
        <Route path="/cart/confirmation" element={<PurchaseConfirmation />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<UserListing />} />
        <Route path="/admin/users/:userId" element={<ManageUser />} />
        <Route path="/admin/collections" element={<CollectionListing />} />
        <Route path="/admin/collections/:collectionId" element={<ManageCollection />} />
        <Route path="/admin/collections/:collectionId/nfts" element={<NftListing />} />
        <Route path="/admin/collections/:collectionId/nfts/:nftId" element={<ManageNft />} />
        <Route path="/admin/orders" element={<OrderListing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
