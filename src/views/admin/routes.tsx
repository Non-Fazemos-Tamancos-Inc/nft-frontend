import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLogin } from './AdminLogin.tsx'
import { UserListing } from './UserListing.tsx'
import { ManageUser } from './ManageUser.tsx'
import { CollectionListing } from './CollectionListing.tsx'
import { ManageCollection } from './ManageCollection.tsx'
import { NftListing } from './NftListing.tsx'
import { ManageNft } from './ManageNft.tsx'
import { OrderListing } from './OrderListing.tsx'
import { NotFound } from '../error/NotFound.tsx'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="./login" replace />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/users" element={<UserListing />} />
      <Route path="/users/:userId" element={<ManageUser />} />
      <Route path="/collections" element={<CollectionListing />} />
      <Route path="/collections/:collectionId" element={<ManageCollection />} />
      <Route path="/collections/:collectionId/nfts" element={<NftListing />} />
      <Route path="/collections/:collectionId/nfts/:nftId" element={<ManageNft />} />
      <Route path="/orders" element={<OrderListing />} />
      <Route path={'*'} element={<NotFound admin />} />
    </Routes>
  )
}
