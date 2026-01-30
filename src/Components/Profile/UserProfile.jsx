// src/Components/UserProfile/UserProfile.js
import React, { useEffect, useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Get user info from localStorage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
      fetchOrders(userInfo._id, userInfo.token);
    }
  }, []);

  const fetchOrders = async (userId, token) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // <-- include JWT
        },
      });

      const data = await res.json();

      // Make sure data is an array
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]); // fallback
        console.error('Unexpected response:', data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    }
  };

  if (!user) return <p>Please login to see your profile</p>;

  return (
    <div className="profile-page">
      <h1>User Profile</h1>

      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="profile-orders">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.orderItems.map(item => (
                  <li key={item.product._id}>
                    {item.product.title} x {item.qty} (${item.price})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
