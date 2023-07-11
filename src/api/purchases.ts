import { Purchase, CreatePurchaseBody } from './types.ts'
import { apiCall } from './utils.ts'

export interface GetPurchasesResponse {
  purchases: Purchase[]
}

export async function getPurchasesForUser(userId: string): Promise<GetPurchasesResponse> {
  return await apiCall(`/api/purchases/user/${userId}`, {})
}

export interface GetPurchaseResponse {
  purchase: Purchase
}

export async function getPurchase(id: string): Promise<GetPurchaseResponse> {
  return await apiCall(`/api/purchases/single/${id}`, {})
}

export async function getAllPurchases(): Promise<GetPurchasesResponse> {
  return await apiCall(`/api/purchases/`, {})
}

export interface CreatePurchaseResponse {
  purchases: Purchase[]
}

export async function createPurchase(
  purchaseBody: CreatePurchaseBody,
): Promise<CreatePurchaseResponse> {
  return await apiCall(`/api/purchases/`, {
    method: 'POST',
    body: JSON.stringify(purchaseBody),
  })
}

export async function markPurchaseAsSent(id: string): Promise<GetPurchaseResponse> {
  return await apiCall(`/api/purchases/${id}/sent`, { method: 'PUT' })
}

export async function unmarkPurchaseAsSent(id: string): Promise<GetPurchaseResponse> {
  return await apiCall(`/api/purchases/${id}/sent`, { method: 'DELETE' })
}

export async function cancelPurchase(id: string): Promise<GetPurchaseResponse> {
  return await apiCall(`/api/purchases/${id}`, { method: 'DELETE' })
}
