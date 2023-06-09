import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>Av. Trabalhador São Carlense 400</li>
                            <li>São Carlos - SP, BR</li>
                            <li>Phone: 9900-8008</li>
                            <li>Email: grad@icmc.usp.br</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>Follow Us</h3>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>Subscribe</h3>
                        <form>
                            <input type="email" placeholder="Enter your email address"/>
                            <button type="submit">Subscribe</button>
                        </form>
                        <p>&copy; 2023 NFT Store. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
