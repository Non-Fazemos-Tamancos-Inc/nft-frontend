import React from 'react';

import './register.css';

function Register() {
    return (
        <div id="register">
            <div className="register-component" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/register-background.jpg'})` }}>
                <form>
                    <h2>Register</h2>
                    <div>
                        <label htmlFor="email">Full Name</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                        <label htmlFor="password">Repeat password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button type="submit">register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;