/* eslint-disable no-unused-vars */
export enum UserRole {
  Customer = 'CUSTOMER',
  Admin = 'ADMIN',
}
/* eslint-enable no-unused-vars */

export interface User {
  _id?: string
  name: string
  email: string
  password: string
  wallet?: string
  role: UserRole
}

export interface NFTCollection {
  _id?: string
  name: string
  image: string
}

export interface NFTItem {
  _id?: string
  collectionId: string
  name: string
  image: string
  description: string
  price: string
}
