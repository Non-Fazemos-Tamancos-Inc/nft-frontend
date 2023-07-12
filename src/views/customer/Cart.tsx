import { styled } from '@stitches/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getNFTById } from '../../api/nfts.ts'
import { NFT } from '../../api/types.ts'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { NftCartCard } from '../../components/core/NftCartCard.tsx'
import { useAuthenticationStore } from '../../store/AuthenticationStore.ts'
import { useCartStore } from '../../store/CartStore.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'
import { formatCurrency } from '../../utils/number.ts'

export function Cart() {
  const { user } = useAuthenticationStore(({ user }) => ({ user }))
  const { items, removeItem } = useCartStore()
  const { addLoader, removeLoader } = useLoaderStore()
  const [nfts, setNfts] = useState<NFT[]>([])

  useEffect(() => {
    if (!items || items.length === 0) {
      return
    }

    const fetchNfts = async () => {
      addLoader('fetch-nfts')
      try {
        const nfts = await Promise.all(items.map((item) => getNFTById(item)))
        setNfts(nfts.map((nft) => nft.nft))
      } catch (err) {
        toast(err?.toString() || 'Failed to fetch NFTs', { type: 'error' })
      } finally {
        removeLoader('fetch-nfts')
      }
    }

    fetchNfts().then().catch(console.error)
  }, [items, addLoader, removeLoader, setNfts])

  const price = nfts.reduce((acc, nft) => acc + nft.price, 0)

  const handleRemove = (id: string) => {
    removeItem(id)
    setNfts(nfts.filter((nft) => nft._id !== id))
  }

  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <CentralizeAll>
        <h1>Your Cart</h1>

        <ProductsContainer>
          {nfts.length === 0 ? (
            <EmptyCartText>Your cart is empty :(</EmptyCartText>
          ) : (
            <>
              {nfts.map((nft) => (
                <NftCartCard
                  id={nft._id}
                  name={nft.name}
                  price={nft.price}
                  image={nft.image}
                  key={nft._id}
                  onRemove={() => handleRemove(nft._id)}
                />
              ))}
            </>
          )}
        </ProductsContainer>
        {nfts.length > 0 && (
          <>
            <div className="cart-description">
              <ItemValues>Item Values: {formatCurrency(price)} ETH</ItemValues>
            </div>
            <Link to={user ? '/cart/crypto' : '/login'}>
              <button className="btn-primary" type="button">
                INVEST WITH CRYPTO
              </button>
            </Link>
            <Link to={user ? '/cart/card' : '/login'}>
              <button className="btn-secondary" type="button">
                INVEST WITH A CREDIT CARD
              </button>
            </Link>
          </>
        )}
      </CentralizeAll>
    </CustomerContainer>
  )
}

// Styles
const CentralizeAll = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const ItemValues = styled('p', {
  fontWeight: 'bold',
})

const ProductsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  minHeight: '50vh',
  maxHeight: '80vh',
  overflowY: 'auto',
})

const EmptyCartText = styled('p', {
  fontSize: '2rem',
})
