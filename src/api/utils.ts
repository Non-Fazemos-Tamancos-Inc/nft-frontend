import { tokenKey } from '../store/AuthenticationStore.ts'

export class ApiError extends Error {
  status?: number
}

export async function apiCall<T>(uri: string, init: RequestInit = {}, json = true): Promise<T> {
  const token = localStorage.getItem(tokenKey)

  const headers = new Headers()

  if (token != null) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (json) {
    headers.set('Content-Type', 'application/json')
  }

  if (init.headers != null) {
    for (const [key, value] of Object.entries(init.headers)) {
      headers.set(key, value)
    }
  }

  const response = await fetch(`${import.meta.env.VITE_API_HOST}${uri}`, {
    ...init,
    headers,
  })

  if (!response.ok) {
    const err = new ApiError(await errorMessage(response))
    err.status = response.status
    throw err
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
