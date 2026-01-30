// src/Components/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: 'Men',
    images: [],
  });

  // Get admin info
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

  // Fetch data inside useEffect
  useEffect(() => {
    if (!adminInfo || !adminInfo.token) {
      alert('Please login as admin');
      return;
    }

    // Config inside effect
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products', config);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err.response?.data?.message || err.message);
      }
    };

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders', config);
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err.response?.data?.message || err.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users', config);
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err.response?.data?.message || err.message);
      }
    };

    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, [adminInfo]); // only depend on adminInfo

  // --- ADD PRODUCT ---
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || newProduct.images.length === 0) {
      alert('Please fill all fields and upload at least one image.');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/products',
        newProduct,
        config
      );
      setProducts([...products, data]);
      setNewProduct({ title: '', price: '', category: 'Men', images: [] });
      alert('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err.response?.data?.message || err.message);
      alert('Error adding product: ' + (err.response?.data?.message || err.message));
    }
  };

  // --- DELETE PRODUCT ---
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err.response?.data?.message || err.message);
      alert('Error deleting product');
    }
  };

  // --- HANDLE IMAGE UPLOAD ---
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewProduct({ ...newProduct, images: urls });
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      {/* PRODUCTS */}
      {activeTab === 'products' && (
        <div className="admin-section">
          <h2>Manage Products</h2>
          <form onSubmit={handleAddProduct} className="admin-form">
            <input
              type="text"
              placeholder="Product Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
            <button type="submit" className="btn-add">Add Product</button>
          </form>

          <div className="product-cards">
            {products.map((p) => (
              <div key={p._id} className="product-card">
                {p.images && p.images.length > 0 ? (
                  <img src={p.images[0]} alt={p.title} className="product-img" />
                ) : (
                  <div className="product-img-placeholder">No Image</div>
                )}
                <div className="product-details">
                  <h3>{p.title}</h3>
                  <p className="price">${p.price}</p>
                  <p className="product-id">ID: {p._id}</p>
                  <p className="category">Category: {p.category}</p>
                  <button className="btn-delete" onClick={() => handleDeleteProduct(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ORDERS */}
      {activeTab === 'orders' && (
        <div className="admin-section">
          <h2>Orders</h2>
          <div className="orders-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o._id}</td>
                    <td>{o.user?.name || 'N/A'}</td>
                    <td>{o.orderItems?.map((i) => i.product?.title || 'Unknown').join(', ') || 'N/A'}</td>
                    <td>${o.total}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USERS */}
      {activeTab === 'users' && (
        <div className="admin-section">
          <h2>Users</h2>
          <div className="users-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u._id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
