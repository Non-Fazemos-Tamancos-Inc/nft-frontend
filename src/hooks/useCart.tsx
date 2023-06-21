import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { NFTItem } from '../api/types.ts'

export interface CartContextData {
  items: NFTItem[]
  addItem: (item: NFTItem) => void
  removeItem: (id: string) => void
}

export const CartContext = createContext<CartContextData>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
})

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NFTItem[]>([])

  const addItem = useCallback((item: NFTItem) => {
    setItems((items) => [...items, item])
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((items) => items.filter((item) => item._id !== id))
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
