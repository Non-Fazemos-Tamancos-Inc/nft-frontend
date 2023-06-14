import { NftCard } from '../../components/core/NftCard.tsx'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { styled } from '@stitches/react'
import { Link } from 'react-router-dom'

export function Cart() {
  let price = 0.4
  let fee = 2.5

  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <CentralizeAll>
        <h1>Your Cart</h1>

        <div className="products">
          <NftCard idx={1} />
          <NftCard idx={2} />
        </div>
        <div className="cart-description">
          <h5>Item Values: {price} ETH</h5>
          <h6>Conceptual Fee: {fee} ETH</h6>
          <h6>Total Investment: {price + fee} ETH</h6>
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
