import React, {useEffect, useState} from 'react';

import UserData, { getCurrentUser } from './User';
import API from "../Api";

import './register.css';
import './form.css';
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const user = new UserData(name, username, email, password1);

        // Validate email:
        if (!email.includes("@")) {
            setError("Invalid email!");
            return;
        }

        // Validate password:
        if (password1 !== password2) {
            setError("Passwords don't match!");
            return;
        }

        API.exists(user.username)
            .then(exists => {
                if (exists) {
                    setError("Username already exists!");
                    return;
                } else {
                    API.register(user.username, password1, user.email, user.name)
                        .then(response => response.json())
                        .then(_ => {
                            navigate("/login");
                        });
                }
            })
    }

    useEffect(() => {
        if (getCurrentUser() !== null) {
            navigate(`/profile`);
        }
    });

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <div>
                    <label htmlFor="name">Full name</label>
                    <input type="text" id="name" name="name" required onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required
                           onChange={e => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password1" name="password1" required
                           onChange={e => setPassword1(e.target.value)}/>
                    <label htmlFor="password">Repeat your password</label>
                    <input type="password" id="password2" name="password2" required
                           onChange={e => setPassword2(e.target.value)}/>
                </div>
                <button type="submit" className={"btn-primary"}>Sign up</button>
            </div>
            <a href={"/login"}>
                <button className={"btn-secondary login-link"} type="button">I already have an account.</button>
            </a>
            <div className={"form-error"}>{error}</div>
        </form>
    )
}

function Register() {
    return (
        <div id="register">
            <div className="form-component"
                 style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/login-background.jpg'})`}}>
                <RegisterForm/>
            </div>
        </div>
    );
}

export default Register;