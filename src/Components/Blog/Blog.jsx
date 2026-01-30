import React from 'react';
import './Blog.css';
import BannerWomen from '../Assets/banner_women.png';
import BannerMens from '../Assets/banner_mens.png';
import BannerKids from '../Assets/banner_kids.png';

const Blog = () => {
  return (
    <div className="blog-page">
      {/* Centered Heading */}
      <h1 className="blog-title">Fashion Blog</h1>

      {/* Men’s Fashion */}
      <section className="blog-section">
        <img src={BannerMens} alt="Men's Fashion" className="blog-banner" />
        <div className="blog-text">
          <h2>Men’s Fashion</h2>
          <p>
            Discover the latest trends in men’s fashion, from casual streetwear 
            to sophisticated outfits. Explore style tips and outfit inspirations 
            to look your best every day.
          </p>
        </div>
      </section>

      {/* Women’s Fashion */}
      <section className="blog-section">
        <img src={BannerWomen} alt="Women's Fashion" className="blog-banner" />
        <div className="blog-text">
          <h2>Women’s Fashion</h2>
          <p>
            Stay ahead with the latest women’s fashion trends. From chic dresses 
            to casual wear, discover ideas and inspiration for every occasion 
            and season.
          </p>
        </div>
      </section>

      {/* Kids’ Fashion */}
      <section className="blog-section">
        <img src={BannerKids} alt="Kids' Fashion" className="blog-banner" />
        <div className="blog-text">
          <h2>Kids’ Fashion</h2>
          <p>
            Fun, comfortable, and stylish outfits for kids! Explore colorful 
            clothing, playful designs, and fashion tips for the little ones.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
