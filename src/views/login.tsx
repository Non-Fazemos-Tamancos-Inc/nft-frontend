import React from 'react';

import './login.css';

function Login() {
    return (
        <div id="login">
            <div className="login-component" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/login-background.jpg'})` }}>
                <form>
                    <h2>Login</h2>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;