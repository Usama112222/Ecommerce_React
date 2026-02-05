# 🛒 Full-Stack E-commerce Web Application | React, Node.js, Express, MongoDB

## 📌 Project Overview
This is a **full-stack e-commerce web application** built with:

- **Frontend:** React, React Router, CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  

The application features a **modern, responsive design** and includes:

- User authentication and admin login  
- Product management  
- Shopping cart functionality  
- Admin dashboard to manage products, orders, and users  

The project demonstrates a complete **MERN stack workflow** with a live deployment.  

---

## 🖥️ Screenshots

### Home Page
<img src="screenshots/home.png" width="80%" />

### Blog Page
<img src="screenshots/blog.png" width="80%" />

### Product Page (Kind)
<img src="screenshots/kind.png" width="80%" />

### Login Page
<img src="screenshots/login.png" width="80%" />

---

## ✨ Key Features

### User Features
- Sign up / Login functionality  
- Browse products by category  
- Add/remove products from shopping cart  
- View cart details in a modal  
- Responsive UI for desktop, tablet, and mobile  

### Admin Features
- Admin login panel  
- Add, update, or delete products  
- Manage orders and user information  
- Full CRUD functionality on products and orders  

### Backend & Security
- RESTful API endpoints with Node.js & Express  
- MongoDB database for secure data storage  
- JWT-based authentication for users and admins  
- Axios for HTTP client requests  

---

## 🛠️ Technologies Used

| Layer        | Technology |
| ------------ | ---------- |
| Frontend     | React, React Router, CSS |
| Backend      | Node.js, Express |
| Database     | MongoDB |
| Auth         | JWT (JSON Web Token) |
| HTTP Client  | Axios |
| Deployment   | Vercel (frontend), Node/Express server (backend) |

---

## 🚀 Live Demo
Check the live site here: [E-commerce Demo](https://ecommerce-psi-tan-85.vercel.app/)  

---

## 📥 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Usama112222/Ecommerce_React
cd YOUR_REPO
2️⃣ Install Frontend Dependencies
cd client
npm install
3️⃣ Install Backend Dependencies
cd ../server
npm install
4️⃣ Configure Environment Variables
Create a .env file in the server folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
5️⃣ Run the Backend Server
npm run server
6️⃣ Run the Frontend Locally
cd ../client
npm start