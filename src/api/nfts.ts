import { Collection, NFT } from './types.ts'
import { apiCall } from './utils.ts'

export interface GetNFTsByCollectionResponse {
  nfts: NFT[]
}

export async function getNFTsByCollection(
  collectionId: string,
): Promise<GetNFTsByCollectionResponse> {
  return await apiCall(`/api/nfts/collection/${collectionId}`, {})
}

export interface GetNFTResponse {
  nft: NFT
  collection: Collection
}

export async function getNFTById(id: string): Promise<GetNFTResponse> {
  return await apiCall(`/api/nfts/single/${id}`, {})
}

export interface CreateNFTResponse {
  nft: NFT
}

export async function createNFT(
  name: string,
  description: string,
  image: string,
  collectionId: string,
  price: number,
): Promise<CreateNFTResponse> {
  return await apiCall(`/api/nfts`, {
    method: 'POST',
    body: JSON.stringify({ name, description, image, collectionId, price, sold: false }),
  })
}

export interface UpdateNFTResponse {
  nft: NFT
}

export async function updateNFT(
  id: string,
  name: string,
  description: string,
  image: string,
  price: number,
): Promise<UpdateNFTResponse> {
  return await apiCall(`/api/nfts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, description, image, price }),
  })
}

export interface DeleteNFTResponse {
  nft: NFT
}

export async function deleteNFT(id: string): Promise<DeleteNFTResponse> {
  return await apiCall(`/api/nfts/${id}`, { method: 'DELETE' })
}
