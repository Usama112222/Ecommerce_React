// src/Components/ProductCard/ProductCard.js
import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [expanded, setExpanded] = useState(false); // toggle expanded view

  // Destructure product
  const { _id, brand, title, description, price, images } = product;

  // Ensure images is an array
  const productImages = Array.isArray(images) && images.length > 0 ? images : ['/placeholder.png'];

  // Next/Prev Image Handlers
  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className={`product-card ${expanded ? 'expanded' : ''}`}>
      {/* IMAGE */}
      <div className="product-image-container">
        <img
          src={productImages[currentImage]}
          alt={title}
          className="product-image"
        />

        {productImages.length > 1 && (
          <div className="image-controls">
            <button onClick={handlePrevImage} className="image-btn">&lt;</button>
            <button onClick={handleNextImage} className="image-btn">&gt;</button>
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price}</p>

        {!expanded ? (
          <button
            className="view-more-btn"
            onClick={() => setExpanded(true)}
          >
            View More Details
          </button>
        ) : (
          <>
            {brand && <p className="product-brand"><strong>Brand:</strong> {brand}</p>}
            {description && <p className="product-description">{description}</p>}
            <p className="product-id"><strong>ID:</strong> {_id}</p>
            <button
              className="view-less-btn"
              onClick={() => setExpanded(false)}
            >
              Collapse
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
