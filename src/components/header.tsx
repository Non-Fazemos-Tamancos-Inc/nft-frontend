import React from 'react';

import { getCurrentUser } from '../User';

import './header.css';

function Header() {
    return (
        <header>
            <a href="/store" className="logo"
            ><img src="/img/LogotipoNFT.png" alt="logo nft aqui" srcSet=""
            /></a>
            <ul className="navmenu">
                <li><a href="/">Home</a></li>
                <li><a href="/store">Store</a></li>
                {getCurrentUser() ? <li><a href="/profile">Profile</a></li> : <li><a href="/register">Register</a></li>}
            </ul>
            { getCurrentUser() ? (
                    <div className="nav-icon">
                        <a href="/profile"><i className="bx bx-user"></i></a>
                        <a href="/cart"><i className="bx bx-cart"> 0</i></a>
                    </div>
            ) : (
              <></>
            )}

        </header>
    );
}

export default Header;
