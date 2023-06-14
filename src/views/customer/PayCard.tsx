import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { useNavigate } from 'react-router-dom'
import { FormEvent } from 'react'

export function PayCard() {
  const navigate = useNavigate()

  let value = '5657.00'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate('/cart/confirmation')
  }

  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <div className="payment-credit">
        <h1>Almost There</h1>

        <h3>Now, fill your credit card information:</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full name</label>
            <input type="text" required />
          </div>
          <div>
            <label htmlFor="card number">Card Number</label>
            <input type="text" required />
          </div>
          <div className="splits">
            <div>
              <label htmlFor="cvv">CVV</label>
              <input type="password" id="cvv" name="cvv" required />
            </div>
            <div>
              <label htmlFor="expiry">Expiry</label>
              <input type="text" id="expiry" name="expiry" required />
            </div>
          </div>
          <button type="submit" className={'btn-primary'}>
            Pay {value} USD
          </button>
        </form>
      </div>
    </CustomerContainer>
  )
}
