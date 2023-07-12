import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getNFTById } from '../../api/nfts.ts'
import { createPurchase, getPurchase } from '../../api/purchases.ts'
import { NFT, PurchaseStatus } from '../../api/types.ts'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { useLoginRequired } from '../../hooks/useLoginRequired.ts'
import { useCartStore } from '../../store/CartStore.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'

export function PayCrypto() {
  const navigate = useNavigate()

  useLoginRequired()
  const { items, clear } = useCartStore()
  const { addLoader, removeLoader } = useLoaderStore()
  const [nfts, setNfts] = useState<NFT[] | null>(null)
  const [initiated, setInitiated] = useState(false)

  useEffect(() => {
    if (nfts !== null || !items || items.length === 0) {
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
  }, [items, addLoader, removeLoader, setNfts, nfts])

  useEffect(() => {
    if (nfts === null) {
      return
    }

    if (initiated) {
      return
    }

    if (!items || items.length === 0 || !nfts || nfts.length === 0) {
      return
    }

    let intervalId: number | null = null

    const checkPurchaseStatus = async (purchaseId: string) => {
      try {
        const paymentInfo = await getPurchase(purchaseId)
        const { status } = paymentInfo.purchase

        if (status === PurchaseStatus.COMPLETED) {
          clear()
          toast.success('Purchase successful')
          navigate('/cart/confirmation')
          if (intervalId) {
            clearInterval(intervalId)
          }
        } else if (status === PurchaseStatus.CANCELLED) {
          toast.warn('Purchase failed')
          navigate('/cart/failure')
          if (intervalId) {
            clearInterval(intervalId)
          }
        } else {
          toast.info('Waiting for payment confirmation')
        }
      } catch (err) {
        toast.error(err?.toString() || 'An error occurred')
        navigate('/cart/failure')
      }
    }

    const makePurchase = async () => {
      try {
        addLoader('create-purchase')

        const paymentResult = await createPurchase({
          nfts: items,
          paymentMethod: 'crypto',
        })

        toast.success('Purchase initiated! Check your email for more details')

        intervalId = setInterval(
          () => checkPurchaseStatus(paymentResult.purchases[0]._id),
          5000,
        )
      } catch (err) {
        toast.error(err?.toString() || 'An error occurred')
        navigate('/cart/failure')
      } finally {
        removeLoader('create-purchase')
      }
    }

    setInitiated(true)
    makePurchase().then().catch(console.error)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfts])

  const price = nfts?.reduce((acc, nft) => acc + nft.price, 0)

  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <div className="payment-crypto">
        <h1>Almost There</h1>

        <h4>Now just transfer {price} ETH to the following address: </h4>
        <br />
        <h5>You have 30 minutes to complete your purchase! </h5>

        <input type="text" value={'0xD3FgH1JkLmN0PqRsT2VwXyZ1AxBc'} readOnly />

        <img src="/assets/qrcode.png" alt="qr code de pagamento" />
      </div>
    </CustomerContainer>
  )
}
