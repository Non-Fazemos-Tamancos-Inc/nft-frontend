import React, {useEffect, useState} from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import API, {Status} from "../Api";
import { getCurrentUser } from '../User';

import './form.css';
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
                window.location.reload();
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
                <button type="submit" className={"btn-primary"}>Submit</button>
            </div>
            <div>
                <p>Don't have an account yet? </p>
                <a className={"alternative-link"}  href={"/register"}>Register now!</a>
            </div>
            <div className={"form-error"}>{error}</div>
        </form>
    )
}

function Login() {
    let [params] = useSearchParams();
    const param = params.get("msg");
    let msg = "";

    if (param === "timeout") {
        msg = "You have been logged out due to inactivity";
    }

    return (
        <div id="login">
            <div className="form-component"
                 style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/login-background.jpg'})`}}>
                <LoginForm/>
            </div>
            <div className={"msg-component"}>{msg}</div>
        </div>
    );
}

export default Login;