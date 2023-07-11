import { Collection } from './types.ts'
import { apiCall } from './utils.ts'

export interface GetCollectionsResponse {
  collections: Collection[]
}

export async function getCollections(): Promise<GetCollectionsResponse> {
  return await apiCall(`/api/collections`, {})
}

export interface GetCollectionResponse {
  collection: Collection
}

export async function getCollectionById(id: string): Promise<GetCollectionResponse> {
  return await apiCall(`/api/collections/${id}`, {})
}

export interface CreateCollectionResponse {
  collection: Collection
}

export async function createCollection(
  name: string,
  description: string,
  image: string,
  releaseDate: string,
): Promise<CreateCollectionResponse> {
  return await apiCall(`/api/collections`, {
    method: 'POST',
    body: JSON.stringify({ name, description, image, releaseDate }),
  })
}

export interface UpdateCollectionResponse {
  collection: Collection
}

export async function updateCollection(
  id: string,
  name: string,
  description: string,
  releaseDate: string,
  image?: string,
): Promise<UpdateCollectionResponse> {
  return await apiCall(`/api/collections/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, description, image, releaseDate }),
  })
}

export interface DeleteCollectionResponse {
  collection: Collection
}

export async function deleteCollection(id: string): Promise<DeleteCollectionResponse> {
  return await apiCall(`/api/collections/${id}`, { method: 'DELETE' })
}
