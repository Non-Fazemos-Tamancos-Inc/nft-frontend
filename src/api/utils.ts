import { tokenKey } from '../store/AuthenticationStore.ts'

export class ApiError extends Error {}

export async function apiCall<T>(uri: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(tokenKey)

  const headers = {
    'Content-Type': 'application/json',
    ...(token != null && { Authorization: `Bearer ${token}` }),
    ...(init.headers != null && init.headers),
  }

  const response = await fetch(`${import.meta.env.VITE_API_HOST}${uri}`, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new ApiError(await errorMessage(response))
  }

  return await response.json()
}

export async function errorMessage(response: Response): Promise<string> {
  try {
    const { message } = await response.json()
    return message
  } catch (error) {
    return 'Unexpected error'
  }
}
