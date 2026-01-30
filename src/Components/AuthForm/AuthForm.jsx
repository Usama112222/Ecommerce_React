import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isLogin
      ? 'http://localhost:5000/api/users/login'
      : 'http://localhost:5000/api/users/signup';

    const body = isLogin
      ? { email: email.trim(), password }
      : { name: name.trim(), email: email.trim(), password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Save user in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));

      alert(isLogin ? 'Login successful 🎉' : 'Signup successful 🎉');

      // Redirect to home
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h1>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={submitHandler}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              required
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleForm}>{isLogin ? 'Sign Up' : 'Login'}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
