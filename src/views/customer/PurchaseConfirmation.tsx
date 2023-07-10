import { Link } from 'react-router-dom'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { ActionButton } from '../../components/core/Listing.tsx'

export function PurchaseConfirmation() {
  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <div className="finished">
        <h1>Your Purchase Has Been Confirmed :)</h1>
        <Link to={'/home'}>
          <ActionButton>Go Back</ActionButton>
        </Link>
      </div>
    </CustomerContainer>
  )
}
