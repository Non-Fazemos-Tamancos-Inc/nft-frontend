import React from 'react';

import './home.css';

function Home() {
    return (
        <div id="home" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/background.jpg'})` }}>
            <section className="home-section">
                <div className="main-text">
                    <h1>N.F.T</h1>
                    <p>
                        We are an exclusive NFT initiative with the goal of revolutionizing
                        the world through visionary concepts and ideas.
                    </p>
                    <p>
                        We don't just sell digital art - we sell ideas and visions that will
                        change the world.
                    </p>
                    <p>
                        Our mission is to create a revolution in the digital experience,
                        merging the virtual and physical worlds like never before. Join us
                        and be a part of something truly groundbreaking.
                    </p>
                    <a href="/register"><button className="button-nft" >BECOME THE REVOLUTION</button></a>
                </div>
                <div className="latest-collection">
                    <h2>Latest Collection</h2>
                    <div className="collection-row">
                        <div className="collection-col">
                            <a href="/store"
                            ><img src="/nft/animals.jpg" alt="nft de bichinho rosa"
                            /></a>
                            <h3>Cute Thingies</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus malesuada, lacus nec commodo rhoncus, felis enim
                                consequat ex, eget consequat nisi urna sed lorem.
                            </p>
                            <button className="button-nft">BUY NOW</button>
                        </div>
                        <div className="collection-col">
                            <a href="/store"
                            ><img src="/nft/space.jpg" alt="nft de nave espacial"
                            /></a>
                            <h3>Space Odyssey</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus malesuada, lacus nec commodo rhoncus, felis enim
                                consequat ex, eget consequat nisi urna sed lorem.
                            </p>
                            <button className="button-nft">BUY NOW</button>
                        </div>
                        <div className="collection-col">
                            <a href="/store"
                            ><img src="/nft/fantasy.jpg" alt="nft de dragão"
                            /></a>
                            <h3>Fantasy Realm</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Phasellus malesuada, lacus nec commodo rhoncus, felis enim
                                consequat ex, eget consequat nisi urna sed lorem.
                            </p>
                            <button className="button-nft">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;