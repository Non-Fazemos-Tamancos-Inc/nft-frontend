import React, {useEffect, useState} from 'react';
import {getCurrentUser, logoutUser, UserWallet} from '../User';
import API from '../Api';
import {useNavigate} from 'react-router-dom';

import './profile.css';

function Profile() {
    const [name, setName] = useState(getCurrentUser()?.name);
    const [username] = useState(getCurrentUser()?.username);
    const [email, setEmail] = useState(getCurrentUser()?.email);
    const [password, setPassword] = useState('');
    const [profileImg] = useState(getCurrentUser()?.profile_img);
    const [editMode, setEditMode] = useState(false);
    const [wallet, setWallet] = useState<UserWallet | null>(null);

    const navigate = useNavigate();

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // Perform update operations here, such as changing password, email, and name
        // You can use the state values (name, email, password) to update the UserData object or make API calls

        // Reset password field
        setPassword('');

        API.update_user(getCurrentUser()?.username, name, email, password).then(
            response => {
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
            }
        )

        // Exit edit mode
        setEditMode(false);
    };

    const handleLogout = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        logoutUser();
        navigate(`/login`);
        window.location.reload();
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const getUserWallet = async () => {
        let currentUser = getCurrentUser();

        if (currentUser === null) {
            navigate(`/login?msg=timeout`);
        } else {
            API.get_wallet(currentUser.username).then(response => {
                if (response) {
                    setWallet(response);
                }
            });
        }
    };

    useEffect(() => {
        let currentUser = getCurrentUser();

        if (currentUser === null) {
            navigate(`/login?msg=timeout`);
        } else {
            getUserWallet().then(() => {});
        }
    }, []);

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
                    <strong>Profile Image:</strong> <img src={profileImg} alt="Profile" className="profile-img"/>
                </div>
            </div>
            <div className="logout-section">
                <button onClick={handleLogout}>Logout</button>
            </div>
            {wallet ? (
                <div className="wallet-info">
                    <h3>Wallet Information</h3>

                    <p>Total Wallet in USD: {Object.keys(wallet.nfts).length}</p>

                    <h4>Currently Owned NFTs:</h4>
                    <div>
                        {Object.entries(wallet.nfts).map(([id, nft]) =>
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
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}


export default Profile;
