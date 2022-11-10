import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useCart } from "react-use-cart";


export default function Navbar() {
    const { totalItems } = useCart();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-gp-primary-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Ecommerce</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbar-right" id="navbarNavAltMarkup">
                        <div className="nav navbar-nav">
                            <NavLink className="nav-link" to='' >Home</NavLink>
                            <NavLink className="nav-link" to="/about-us">About</NavLink>
                            <NavLink className="nav-link" to="/contact-us">Contact</NavLink>
                            {!sessionStorage.getItem('login') ?
                                <NavLink className="nav-link" to="/login">Login </NavLink>
                                : <>
                                    <NavLink className="nav-link cart" to="/cart">Cart
                                        <b className='noOfCart'>{totalItems}</b>
                                    </NavLink>
                                    <div className="nav-item mx-auto dropdown">
                                        <NavLink className="nav-link rounded-circle bg-white text-gp-primary text-center" style={{ textDecoration: 'none', width: '40px' }}
                                            id="dropdownMenuLink" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">
                                            {JSON.parse(sessionStorage['myDetails']).firstname?.slice(0, 1).toUpperCase()}
                                        </NavLink>
                                        <ul className="dropdown-menu px-0" aria-labelledby="dropdownMenuLink">
                                            <li><NavLink className="dropdown-item" to='/profile'>Profile</NavLink></li>
                                            <li><NavLink className="dropdown-item" to='/logout'>Log Out</NavLink></li>
                                        </ul>
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />

        </>
    );
}
