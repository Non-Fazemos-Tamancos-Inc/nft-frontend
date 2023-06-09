import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './views/home';
import Store from './views/store';
import Cart from './views/cart';
import Login from './views/login';
import Register from './views/register';

function App() {
  return (
    <div className="App">
      <Header></Header>
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/store">
                    <Store />
                </Route>
                <Route path="/login">
                    <Cart />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/login">
                    <Register />
                </Route>
            </Switch>
        </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
