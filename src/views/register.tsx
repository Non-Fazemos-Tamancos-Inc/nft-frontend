import React from 'react';

import './register.css';

function Register() {
    return (
        <div id="register">
            <div className="register-component" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/login-background.jpg'})` }}>
                <form>
                    <h2>Sign Up</h2>
                    <div>
                        <label htmlFor="email">Full name</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                        <label htmlFor="password">Repeat your password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button type="submit">Sign up</button>
                    <button id="already-button" type="button">I already have an account.</button>
                </form>
            </div>
        </div>
    );
}

export default Register;