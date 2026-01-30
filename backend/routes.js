// routes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User, Product, Order } = require('./models');
require('dotenv').config();

// ---------------- JWT Helpers ----------------
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// ---------------- USERS ----------------

// Signup
router.post(
  '/users/signup',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
      token: generateToken(user._id),
    });
  })
);

// Login
router.post(
  '/users/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);

// Get all users (Admin only)
router.get(
  '/users',
  protect,
  asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized as admin');
    }
    const users = await User.find().select('-password');
    res.json(users);
  })
);

// ---------------- PRODUCTS ----------------

// Get all products
router.get(
  '/products',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

// Create product (Admin only)
router.post(
  '/products',
  protect,
  asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized as admin');
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
  })
);

// Delete product (Admin only)
router.delete(
  '/products/:id',
  protect,
  asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized as admin');
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  })
);

// ---------------- ORDERS ----------------

// Get all orders (Admin only)
router.get(
  '/orders',
  protect,
  asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized as admin');
    }
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'title price');
    res.json(orders);
  })
);

// Create an order (Logged in users)
router.post(
  '/orders',
  protect,
  asyncHandler(async (req, res) => {
    const { orderItems, total } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      total,
      status: 'Pending',
    });

    res.status(201).json(order);
  })
);

// Get orders for a specific user (Logged in user only)
router.get(
  '/orders/user/:userId',
  protect,
  asyncHandler(async (req, res) => {
    if (req.user._id.toString() !== req.params.userId && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to view these orders');
    }
    const orders = await Order.find({ user: req.params.userId }).populate(
      'orderItems.product',
      'title price'
    );
    res.json(orders);
  })
);

module.exports = router;
