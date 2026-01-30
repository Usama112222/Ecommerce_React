// src/Pages/Home/Home.jsx
import React from 'react';
import './Hero.css';
import heroImage from '../Assets/hero_image.png';

const Home = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="split-hero">

        {/* LEFT: Text */}
        <div className="hero-text">
          <h1>New Collection For Everyone</h1>
          <p>Opportunities don't happen, you create them.</p>

          <div className="hero-buttons">
            <button
              className="btn primary"
              onClick={() => scrollToSection('shop')}
            >
              Shop Now
            </button>

            <button
              className="btn secondary"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="hero-image">
          <img src={heroImage} alt="New Collection" />
        </div>

      </section>

    </div>
  );
};

export default Home;

