import { create } from 'zustand'

export interface CartStore {
  items: string[]

  addItem: (item: string) => void
  removeItem: (item: string) => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (item) => set((state) => ({ items: state.items.filter((i) => i !== item) })),
}))
