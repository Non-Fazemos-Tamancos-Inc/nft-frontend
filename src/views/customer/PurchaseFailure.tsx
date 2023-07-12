import { Link } from 'react-router-dom'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { ActionButton } from '../../components/core/Listing.tsx'

export function PurchaseFailure() {
  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <div className="finished">
        <h1>Your Purchase Has Failed :(</h1>
        <Link to={'/home'}>
          <ActionButton>Go Back</ActionButton>
        </Link>
      </div>
    </CustomerContainer>
  )
}
