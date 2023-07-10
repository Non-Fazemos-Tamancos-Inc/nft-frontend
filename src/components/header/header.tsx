import React, {useEffect, useState} from 'react';

import User, {UserData} from '../../api/User';

import './header.css';

function Header() {
    const [user, setUser] = useState<UserData | null>(null);
    useEffect(() => {
        User.getData().then(logged_user => {
            if (typeof logged_user === "object") {
                setUser(logged_user);
            }
        })


    }, []);
    return (
        <header>
            <a href="/store" className="logo"
            ><img src="/img/LogotipoNFT.png" alt="logo nft aqui" srcSet=""
            /></a>
            <ul className="navmenu">
                <li><a href="/">Home</a></li>
                <li><a href="/store">Store</a></li>
                {user ?
                    <li><a href="/profile">Profile</a></li> :
                    <li><a href="/login">Login</a></li>}
            </ul>
            { user ? (
                    <div className="nav-icon">
                        <a href="/profile"><i className="bx bx-user"></i></a>
                        <a href="/cart"><i className="bx bx-cart"> 0</i></a>
                    </div>
            ) : <></>}

        </header>
    );
}

export default Header;
