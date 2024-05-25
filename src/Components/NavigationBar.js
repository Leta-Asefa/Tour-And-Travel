// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../output.css';  // Import the custom CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/">TT-Tour</Link>
                </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="navbar-link">About</Link>
                    </li>
                    <li>
                        <Link to="/services" className="navbar-link">Services</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="navbar-link">Contact</Link>
                    </li>
                    <li>
                    <Link to="/logout"className=" bg-white p-3 cursor-pointer text-red-600 rounded-xl hover:bg-slate-100" >Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
