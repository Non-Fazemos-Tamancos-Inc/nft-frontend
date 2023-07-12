import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'

export function Home() {
  return (
    <CustomerContainer activePage={CustomerNavElements.HOME} scoobyDoobyDoo>
      <div id="home">
        <section className="home-section">
          <div className="main-text">
            <h1 style={{ fontWeight: '900' }}>N.F.T.</h1>
            <p>
              We are an exclusive NFT initiative with the goal of revolutionizing the world
              through visionary concepts and ideas.
            </p>
            <p>
              We don't just sell digital art - we sell ideas and visions that will change the
              world.
            </p>
            <p>
              Our mission is to create a revolution in the digital experience, merging the
              virtual and physical worlds like never before. Join us and be a part of something
              truly groundbreaking.
            </p>
            <a href="/collections">
              <button className="button-nft">BECOME THE REVOLUTION</button>
            </a>
          </div>
        </section>
      </div>
    </CustomerContainer>
  )
}
