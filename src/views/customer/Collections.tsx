import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'

export function Collections() {
  return (
    <CustomerContainer activePage={CustomerNavElements.COLLECTIONS} scoobyDoobyDoo>
      <div id="store">
        <section className="store-section">
          <div className="container">
            <div className="row">
              <div className="col nft-sales">
                <h2>NFTs for Sale</h2>
                <ul className="row nft-list">
                  <li className="col nft-item">
                    <img src="/assets/nft/shoe.jpg" alt="NFT 1" />
                    <h3>THE Shoe</h3>
                    <p>Price: $50</p>
                    <button className="button-nft">BUY NOW</button>
                  </li>
                  <li className="col nft-item">
                    <img src="/assets/nft/greek.jpg" alt="NFT 2" />
                    <h3>Le Greek</h3>
                    <p>Price: $75</p>
                    <button className="button-nft">BUY NOW</button>
                  </li>
                  <li className="col nft-item">
                    <img src="/assets/nft/painting.jpg" alt="NFT 3" />
                    <h3>Mono Lisa</h3>
                    <p>Price: $100</p>
                    <button className="button-nft">BUY NOW</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h2>Orders Sent</h2>
                <p>No orders have been sent yet.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CustomerContainer>
  )
}
