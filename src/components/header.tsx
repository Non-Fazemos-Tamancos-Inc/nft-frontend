import React from 'react';

function Header() {
    return (
        <header>
            <a href="#" className="logo"
            ><img src="../../public/nft/img/LogotipoNFT.png" alt="logo nft aqui" srcSet=""
            /></a>
            <ul className="navmenu">
                <li><a href="/home">Home</a></li>
                <li><a href="/store">Store</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
            <div className="nav-icon">
                <a href="/profile"><i className="bx bx-user"></i></a>
                <a href="/cart"><i className="bx bx-cart"> 0</i></a>
            </div>
        </header>
    );
}

export default Header;
