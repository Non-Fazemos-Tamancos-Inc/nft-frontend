import {NFTCollection, NFTItem, User, UserRole} from './types.ts'

export class ApiError extends Error {}

interface FakeAPIData {
  users: User[]
  collections: NFTCollection[]
  nfts: NFTItem[]
}

const fakeApi: FakeAPIData = {
  users: [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@mail.io',
      password: '123456',
      wallet: '0x1234567890',
      role: UserRole.Customer,
    },
    {
      _id: '2',
      name: 'Jane Doe',
      email: 'jane@mail.io',
      password: '123456',
      wallet: '0x1234567890',
      role: UserRole.Customer,
    },
    {
      _id: '3',
      name: 'Admin',
      email: 'admin',
      password: 'admin',
      wallet: '0x1234567890',
      role: UserRole.Admin,
    }
  ],
  collections: [
    {
      _id: '1',
      name: 'Collection 1',
      image: 'https://picsum.photos/seed/11/200/300',
    },
    {
      _id: '2',
      name: 'Collection 2',
      image: 'https://picsum.photos/seed/21/200/300',
    },
    {
      _id: '3',
      name: 'Collection 3',
      image: 'https://picsum.photos/seed/31/200/300',
    },
  ],
  nfts: [
    {
      _id: '1',
      collectionId: '1',
      name: 'NFT 1',
      image: 'https://picsum.photos/seed/1/200/300',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl.',
      price: '0.69 ETH',
    },
    {
      _id: '2',
      collectionId: '1',
      name: 'NFT 2',
      image: 'https://picsum.photos/seed/2/200/300',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl.',
      price: '0.69 ETH',
    },
    {
      _id: '3',
      collectionId: '1',
      name: 'NFT 3',
      image: 'https://picsum.photos/seed/3/200/300',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl.',
      price: '0.69 ETH',
    },
    {
      _id: '4',
      collectionId: '2',
      name: 'NFT 4',
      image: 'https://picsum.photos/seed/4/200/300',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl.',
      price: '0.69 ETH',
    },
    {
      _id: '5',
      collectionId: '2',
      name: 'NFT 5',
      image: 'https://picsum.photos/seed/5/200/300',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl.',
      price: '0.69 ETH',
    },
    {
      _id: '6',
      collectionId: '3',
      name: 'NFT 6',
      image: 'https://picsum.photos/seed/6/200/300',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl. Donec auctor, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc vitae nisl.',
      price: '0.69 ETH',
    }
  ]
}

function fakeDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function login(email: string, password: string): Promise<User> {
  await fakeDelay(100)

  const user = fakeApi.users.filter((user) => user.email === email)[0]

  if (!user) {
    throw new ApiError(`User with email: ${email} not found`)
  }

  if (user.password !== password) {
    throw new ApiError(`Invalid password`)
  }

  return user
}

export async function logout(userId: string): Promise<void> {
  console.log(`Try to imagine we logging out the user: ${userId}.`)
}

export async function register(user: User): Promise<void> {
  await fakeDelay(100)

  const existingUser = fakeApi.users.filter((u) => u.email === user.email)[0]

  if (existingUser) {
    throw new ApiError(`User with email: ${user.email} already exists`)
  }

  user._id = Math.random().toString(36).slice(2, 6)
  fakeApi.users.push(user)
}

export async function updateUser(
  id: string,
  email?: string,
  password?: string,
  wallet?: string,
) {
  await fakeDelay(100)

  const user = fakeApi.users.filter((user) => user._id === id)[0]

  if (!user) {
    throw new ApiError(`User with id: ${id} not found`)
  }

  if (email) {
    user.email = email
  }

  if (password) {
    user.password = password
  }

  if (wallet) {
    user.wallet = wallet
  }
}

export async function listCollections(): Promise<NFTCollection[]> {
  await fakeDelay(100)

  return fakeApi.collections
}

export async function listNfts(collectionId: string): Promise<NFTItem[]> {
  await fakeDelay(100)

  return fakeApi.nfts.filter((nft) => nft.collectionId === collectionId)
}
