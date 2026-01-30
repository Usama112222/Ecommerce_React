// src/Components/Shop/Shop.js
import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Shop.css';

const Shop = () => {
  const menRef = useRef(null);
  const womenRef = useRef(null);
  const kidsRef = useRef(null);

  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleSelect = (value) => {
    if (value === 'Men') menRef.current.scrollIntoView({ behavior: 'smooth' });
    if (value === 'Women') womenRef.current.scrollIntoView({ behavior: 'smooth' });
    if (value === 'Kids') kidsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuy = async (product) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
      alert('Please login to buy items');
      return;
    }

    const orderItem = {
      product: product._id,
      qty: 1,
      price: product.price,
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(orderItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          orderItems: [orderItem],
          total: product.price,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create order');
      }

      const data = await res.json();
      alert(`Order created! Order ID: ${data._id}`);
    } catch (err) {
      console.error(err);
      alert('Something went wrong: ' + err.message);
    }
  };

  const menProducts = products.filter((p) => p.category === 'Men');
  const womenProducts = products.filter((p) => p.category === 'Women');
  const kidsProducts = products.filter((p) => p.category === 'Kids');

  return (
    <div className="shop-page">
      <h1 className="shop-title">Shop</h1>

      <div className="shop-dropdown">
        <select onChange={(e) => handleSelect(e.target.value)}>
          <option value="">Shop Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <section ref={menRef} className="shop-section">
        <h2>Men</h2>
        <div className="product-grid">
          {menProducts.map((product) => (
            <div key={product._id} className="product-wrapper">
              <ProductCard product={product} />
              <button className="buy-btn" onClick={() => handleBuy(product)}>
                Buy
              </button>
            </div>
          ))}
        </div>
      </section>

      <section ref={womenRef} className="shop-section">
        <h2>Women</h2>
        <div className="product-grid">
          {womenProducts.map((product) => (
            <div key={product._id} className="product-wrapper">
              <ProductCard product={product} />
              <button className="buy-btn" onClick={() => handleBuy(product)}>
                Buy
              </button>
            </div>
          ))}
        </div>
      </section>

      <section ref={kidsRef} className="shop-section">
        <h2>Kids</h2>
        <div className="product-grid">
          {kidsProducts.map((product) => (
            <div key={product._id} className="product-wrapper">
              <ProductCard product={product} />
              <button className="buy-btn" onClick={() => handleBuy(product)}>
                Buy
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
