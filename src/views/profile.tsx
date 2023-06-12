import React, {useEffect} from 'react';

import './profile.css';
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        if (getCurrentUser() === null) {
            navigate(`/login?msg=timeout`);
        }
    });

    return (
        <div id="profile">
            <h1>Profile</h1>
            <img className="profile-pic" src={getCurrentUser()?.profile_img ? getCurrentUser()?.profile_img : "/img/default-profile.png"} alt="Profile picture" />
        </div>
        
    );
}

export default Profile;