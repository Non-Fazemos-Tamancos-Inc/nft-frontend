import React, {useEffect, useState} from 'react';
import User, {UserData} from '../../api/User';
import Wallet, {WalletData} from '../../api/Wallet';
import {useNavigate} from 'react-router-dom';

import './profile.css';

function Profile() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [user, setUser] = useState<UserData | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        let user = await User.getData();

        if (user) {
            setPassword('');
            let updated_user = new UserData(username, name, email);
            User.update(username, password, updated_user).then((response) => {
                console.log(response);
                // if (response) {
                //     // Update the user's cookie
                //     const cookies = new Cookies();
                //     let session = cookies.get("session");
                //
                //     if (session) {
                //         let user = session as UserData;
                //         user.name = name;
                //         user.email = email;
                //         cookies.set("session", user);
                //     }
                // }
            });

        }


        // Exit edit mode
        setEditMode(false);
    };

    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault();

        User.logout();
        navigate(`/login`);
        window.location.reload();
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    useEffect(() => {
        User.getData().then(async (user) => {
            if (typeof user === "object") {
                setUser(user);
                setName(user.name);
                setEmail(user.email);
                setUsername(user.username);

                Wallet.get(user.username).then(wallet => {
                    if (typeof wallet === "object") {
                        setWallet(wallet);
                    } else {
                        console.log(wallet);
                    }
                });
            }
        })
    }, [navigate]);

    const handleNewNFT = () => {
    };

    const handleRemoveNFT = (nftId: string) => {
    };

    return (
        <div className="profile">
            <h2>Profile Page</h2>

            <div className="user-info">
                <h3>User Information</h3>

                {editMode ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" value={username} disabled/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <button type="submit">Save Changes</button>
                    </form>
                ) : (
                    <>
                        <div>
                            <strong>Name:</strong> {name}
                        </div>

                        <div>
                            <strong>Username:</strong> {username}
                        </div>

                        <div>
                            <strong>Email:</strong> {email}
                        </div>

                        <button onClick={toggleEditMode}>Edit</button>
                    </>
                )}

                <div>
                    <strong>Profile Image:</strong> <img src="/public/img/default-profile.png" alt="Profile"
                                                         className="profile-img"/>
                </div>
            </div>
            <div className="logout-section">
                <button onClick={handleLogout}>Logout</button>
            </div>
            {wallet ? (
                <div className="wallet-info">
                    <h3>Wallet Information</h3>

                    <p>Total Wallet in USD: {Object.keys(wallet.individualNfts).length}</p>

                    <h4>Currently Owned NFTs:</h4>
                    <div>
                        {Object.entries(wallet.individualNfts).map(([id, nft]) => (
                            <div key={id} className="nft-info">
                                <div>
                                    <strong>Name:</strong> {nft.name}
                                </div>

                                <div>
                                    <strong>Price:</strong> {nft.price}
                                </div>

                                <div>
                                    <strong>Creator:</strong> {nft.creator}
                                </div>

                                <div>
                                    <strong>Description:</strong> {nft.description}
                                </div>

                                <div>
                                    <img src={nft.img_path} alt="NFT" className="nft-image"/>
                                </div>

                                <button onClick={() => handleRemoveNFT(id)}>Remove NFT</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleNewNFT()}>Add NFT</button>
                </div>
            ) : null}
        </div>
    );
}

export default Profile;
