// src/Components/Cart/CartCard.js
import React, { useEffect, useState } from 'react';
import './CartCard.css';

const CartCard = () => {
  const [items, setItems] = useState([]);

  // Fetch user's orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.token) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/user/${userInfo._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'Failed to fetch orders');
        }

        const data = await res.json();

        // Flatten order items from all orders
        const orderItems = [];
        data.forEach(order => {
          order.orderItems.forEach(item => {
            orderItems.push({
              id: item.product._id,
              name: item.product.title,
              price: item.price,
              qty: item.qty,
              orderId: order._id,
              status: order.status,
            });
          });
        });

        setItems(orderItems);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setItems([]);
      }
    };

    fetchOrders();
  }, []);

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-card-container">
      <h2 className="cart-title">Your Orders</h2>

      {items.length === 0 ? (
        <p className="cart-empty">You have no orders yet</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div className="cart-item" key={`${item.id}-${item.orderId}`}>
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">
                    ${item.price} x {item.qty} ({item.status})
                  </p>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartCard;
