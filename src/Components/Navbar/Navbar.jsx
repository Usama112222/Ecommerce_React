// src/Components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';

function Navbar({ onLoginClick, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(storedUser);
  }, []);

  // Smooth scroll function
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // close mobile menu after click
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Left: Logo */}
        <div className="navbar-left">
          <a
            href="#home"
            className="navbar-brand"
            onClick={(e) => handleScroll(e, 'home')}
          >
            <img src={logo} alt="Logo" className="logo" />
          </a>
        </div>

        {/* Center: Links */}
        <ul className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <a
              href="#home"
              className="nav-link"
              onClick={(e) => handleScroll(e, 'home')}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#shop"
              className="nav-link"
              onClick={(e) => handleScroll(e, 'shop')}
            >
              Shop
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#blog"
              className="nav-link"
              onClick={(e) => handleScroll(e, 'blog')}
            >
              Blog
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#about"
              className="nav-link"
              onClick={(e) => handleScroll(e, 'about')}
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#contact"
              className="nav-link"
              onClick={(e) => handleScroll(e, 'contact')}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Right: Login / Cart / Profile */}
        <div className="navbar-right">
          {!userInfo ? (
            <button className="nav-link login" onClick={onLoginClick}>
              Login / Sign Up
            </button>
          ) : (
            <>
              <button
                className="nav-link profile"
                onClick={() => navigate('/profile')}
              >
                Profile
              </button>
              <button className="nav-link logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          <button className="nav-link cart" onClick={onCartClick}>
            🛒 <span className="bag">1</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
