import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './views/home/home';
import Store from './views/store/store';
import Cart from './views/cart/cart';
import Profile from './views/profile/profile';
import Login from './views/login/login';
import Register from './views/register/register';

import './App.css';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/store" element={<Store/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </div>
            </Router>
            <Footer></Footer>
        </div>
    );
}

export default App;
