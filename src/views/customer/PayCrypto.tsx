import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'

export function PayCrypto() {
  let price = 2.9
  let time = 30

  return (
    <CustomerContainer activePage={CustomerNavElements.CART} scoobyDoobyDoo>
      <div className="payment-crypto">
        <h1>Almost There</h1>

        <h4>Now just transfer {price} ETH to the following address: </h4>
        <br />
        <h5>You have {time} minutes to complete your purchase! </h5>

        <input type="text" value={'0xD3FgH1JkLmN0PqRsT2VwXyZ1AxBc'} readOnly />

        <img src="/assets/qrcode.png" alt="qr code de pagamento" />
      </div>
    </CustomerContainer>
  )
}
