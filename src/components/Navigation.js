// Navbar.js
import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../photos/iquest.png"

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header>
           <p className="logo">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="IQuest Logo" className="logo-img" />
                </Link>
            </p>
            <nav ref={navRef}>
                <Link to="/image-processing">Image Processing</Link>
                <Link to="/aviation">Aviation</Link>
                <Link to="/nlp-text-analyzer">NLP Text Analyzer</Link>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
