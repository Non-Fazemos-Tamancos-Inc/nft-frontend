/* eslint-disable no-unused-vars */
export enum UserRole {
  Customer = 'CUSTOMER',
  Admin = 'ADMIN',
}
/* eslint-enable no-unused-vars */

export interface User {
  _id: string
  name: string
  email: string
  wallet?: string
  role: UserRole
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Upload {
  _id: string
  filename: string
  uri: string
  createdAt?: Date
}

export interface NFT {
  _id: string
  collectionId: string
  name: string
  description?: string
  image?: string
  price: number
  sold: boolean
}

/* eslint-disable no-unused-vars */
export enum PurchaseStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
/* eslint-enable no-unused-vars */

export interface Purchase {
  _id: string
  nftId: string
  userId: string
  status: PurchaseStatus
  sentAt?: Date
  createdAt?: Date
  updatedAt?: Date
  price?: number

  buyer?: User
  nft?: NFT
}

export interface Collection {
  _id: string
  name: string
  description: string
  image?: string
  releaseDate?: Date

  nfts?: NFT[]
}

export interface CreatePurchaseBody {
  nfts?: string[]
  paymentMethod?: string

  cardInfo?: {
    cardNumber: string
    cardHolder: string
    expirationDate: string
    cvv: string
  }
}
