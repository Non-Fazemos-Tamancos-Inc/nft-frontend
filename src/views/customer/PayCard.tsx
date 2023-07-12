import { FormEvent, useEffect, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getNFTById } from '../../api/nfts.ts'
import { createPurchase } from '../../api/purchases.ts'
import { NFT, PurchaseStatus } from '../../api/types.ts'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { useLoginRequired } from '../../hooks/useLoginRequired.ts'
import { useCartStore } from '../../store/CartStore.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'
import { formatCurrency } from '../../utils/number.ts'

export function PayCard() {
  const nameId = useId()
  const cardNumberId = useId()
  const cvvId = useId()
  const expiryId = useId()

  const navigate = useNavigate()

  useLoginRequired()
  const { items, clear } = useCartStore()
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nameEl = e.currentTarget.elements.namedItem('name') as HTMLInputElement
    const cardNumberEl = e.currentTarget.elements.namedItem('cardnumber') as HTMLInputElement
    const cvvEl = e.currentTarget.elements.namedItem('cvv') as HTMLInputElement
    const expiryEl = e.currentTarget.elements.namedItem('expiry') as HTMLInputElement

    if (!nameEl || !cardNumberEl || !cvvEl || !expiryEl) {
      toast.error('All fields are required')
      return
    }

    try {
      addLoader('pay-card')

      const paymentResult = await createPurchase({
        nfts: items,
        paymentMethod: 'card',
        cardInfo: {
          cardHolder: nameEl.value,
          cardNumber: cardNumberEl.value,
          cvv: cvvEl.value,
          expirationDate: expiryEl.value,
        },
      })

      const status = paymentResult.purchases[0].status

      if (status === PurchaseStatus.COMPLETED) {
        clear()
        toast.success('Purchase successful')
        navigate('/cart/confirmation')
      } else {
        toast.warn('Purchase failed')
        navigate('/cart/failure')
      }
    } catch (err) {
      toast.error(err?.toString() || 'An error occurred')
      navigate('/cart/failure')
    } finally {
      removeLoader('pay-card')
    }
  }

  const price = nfts.reduce((acc, nft) => acc + nft.price, 0)

  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <div className="payment-credit">
        <h1>Almost There</h1>

        <h3>Now, fill your credit card information:</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor={nameId}>Full name</label>
            <input type="text" name="name" required id={nameId} />
          </div>
          <div>
            <label htmlFor={cardNumberId}>Card Number</label>
            <input type="text" name="cardnumber" required id={cardNumberId} />
          </div>
          <div className="splits">
            <div>
              <label htmlFor={cvvId}>CVV</label>
              <input type="password" name="cvv" required id={cvvId} />
            </div>
            <div>
              <label htmlFor={expiryId}>Expiry</label>
              <input type="text" name="expiry" required id={expiryId} />
            </div>
          </div>
          <button type="submit" className={'btn-primary'}>
            Pay {formatCurrency(price)} ETH
          </button>
        </form>
      </div>
    </CustomerContainer>
  )
}
