import { User } from './types.ts'
import { apiCall } from './utils.ts'

export interface RegisterResponse {
  user: User
  token: string
}

export async function register(
  name: string,
  email: string,
  password: string,
  walletAddress?: string,
): Promise<RegisterResponse> {
  return await apiCall(`/api/users/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password, walletAddress }),
  })
}

export interface LoginResponse {
  user: User
  token: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return await apiCall(`/api/users/login`, {
    method: 'PUT',
    body: JSON.stringify({ email, password }),
  })
}

export interface GetUserResponse {
  user: User
}

export async function getUserById(id: string): Promise<GetUserResponse> {
  return await apiCall(`/api/users/${id}`, {})
}

export interface UpdateUserResponse {
  user: User
}

export async function updateUser(
  id: string,
  name: string,
  email: string,
  password?: string,
  wallet?: string,
  active?: boolean,
): Promise<UpdateUserResponse> {
  return await apiCall(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name, email, password, wallet, active }),
  })
}

export interface ListUsersResponse {
  users: User[]
}

export async function listUsers(): Promise<ListUsersResponse> {
  return await apiCall(`/api/users`, {})
}

export interface DeactivateUserResponse {
  user: User
}

export async function deactivateUser(id: string): Promise<DeactivateUserResponse> {
  return await apiCall(`/api/users/${id}/deactivate`, { method: 'DELETE' })
}

export interface ActivateUserResponse {
  user: User
}

export async function activateUser(id: string): Promise<ActivateUserResponse> {
  return await apiCall(`/api/users/${id}/activate`, { method: 'PUT' })
}
