import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import API, {Status} from "../Api";
import {getCurrentUser} from './User';

import './login.css';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let login = API.login(username, password);

        login.then((response) => {
            if (response === Status.SUCCESS) {
                navigate(`/profile`);
            } else if (response === Status.AUTHENTICATION_ERROR) {
                setError("Invalid username or password");
            } else if (response === Status.NETWORK_ERROR) {
                setError("Network error")
            } else {
                setError("Unknown error")
            }
        });
    }

    useEffect(() => {
        if (getCurrentUser() !== null) {
            navigate(`/profile`);
        }
    });

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required onChange={e => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </div>
            <div>
                <p>Don't have an account yet? </p>
                <a className={"register-link"}  href={"/register"}>Register now!</a>
            </div>
            <div className={"form-error"}>{error}</div>
        </form>
    )
}

function Login() {

    return (
        <div id="login">
            <div className="login-component"
                 style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/login-background.jpg'})`}}>
                <LoginForm/>
            </div>
        </div>
    );
}

export default Login;