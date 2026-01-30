import React from 'react';
import './Footer.css';
import Logo from '../Assets/logo.png'; // Replace with your logo path

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo */}
      <div className="footer-logo">
        <img src={Logo} alt="Fashion Store Logo" />
      </div>

      {/* Navigation Links */}
      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#shop">Shop</a>
        <a href="#blog">Blog</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Social Media Links */}
      <div className="footer-social">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest"
        >
          <i className="fab fa-pinterest"></i>
        </a>
      </div>

      {/* Copyright */}
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Fashion Store. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
