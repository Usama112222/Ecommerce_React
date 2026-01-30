// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Hero/Hero';
import Shop from './Components/Shop/Shop';
import Blog from './Components/Blog/Blog';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import AuthForm from './Components/AuthForm/AuthForm';
import CartCard from './Components/Cart/CartCard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import UserProfile from './Components/Profile/UserProfile';

// ---------------- Protected Route ----------------
const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    return <Navigate to="/" />; // redirect to home if not logged in
  }
  return children;
};

// ---------------- Layout ----------------
const AppLayout = ({ children, onLoginClick, onCartClick }) => {
  const location = useLocation();

  // Hide navbar/footer on admin route
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar onLoginClick={onLoginClick} onCartClick={onCartClick} />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
};

// ---------------- App ----------------
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Example cart items
  const cartItems = [
    { id: 1, name: 'T-Shirt', price: 25, qty: 2 },
    { id: 2, name: 'Jeans', price: 50, qty: 1 },
  ];

  return (
    <Router>
      <AppLayout onLoginClick={() => setShowLogin(true)} onCartClick={() => setShowCart(true)}>
        <Routes>
          {/* Home page with sections */}
          <Route
            path="/"
            element={
              <main>
                <section id="home">
                  <Home />
                </section>

                <section id="shop">
                  <Shop />
                </section>

                <section id="blog">
                  <Blog />
                </section>

                <section id="about">
                  <About />
                </section>

                <section id="contact">
                  <Contact />
                </section>
              </main>
            }
          />

          {/* Profile page - protected */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Optional: catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Login Modal */}
        {showLogin && (
          <div className="modal-overlay" onClick={() => setShowLogin(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <AuthForm onClose={() => setShowLogin(false)} />
            </div>
          </div>
        )}

        {/* Cart Modal */}
        {showCart && (
          <div className="modal-overlay" onClick={() => setShowCart(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <CartCard items={cartItems} onClose={() => setShowCart(false)} />
            </div>
          </div>
        )}
      </AppLayout>
    </Router>
  );
}

export default App;
