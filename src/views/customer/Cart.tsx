import { styled } from '@stitches/react'
import { Link } from 'react-router-dom'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { NftCardMock } from '../../components/core/NftCardMock.tsx'

export function Cart() {
  const price = 0.4
  const fee = 2.5

  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <CentralizeAll>
        <h1>Your Cart</h1>

        <div className="products">
          <NftCardMock idx={1} />
          <NftCardMock idx={2} />
        </div>
        <div className="cart-description">
          <ItemValues>Item Values: {price} ETH</ItemValues>
          <ItemFees>Conceptual Fee: {fee} ETH</ItemFees>
          <ItemFees>Total Investment: {price + fee} ETH</ItemFees>
        </div>
        <Link to={'/cart/crypto'}>
          <button className="btn-primary" type="button">
            INVEST WITH CRYPTO
          </button>
        </Link>
        <Link to={'/cart/card'}>
          <button className="btn-secondary" type="button">
            INVEST WITH A CREDIT CARD
          </button>
        </Link>
        <br />
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

const ItemFees = styled('p', {
  fontSize: '0.75rem',
})
