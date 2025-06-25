# 🔐 Password Reset App - Backend

This is the **backend server** of a full-stack authentication and password reset application. It handles secure user registration, login, forgot password, and password reset via email using **Node.js**, **Express**, **MongoDB**, and **JWT**.

---

## 🚀 Features

- 📝 User Registration & Login
- 🔑 JWT-based Authentication
- 📩 Forgot Password (via email)
- ♻️ Secure Reset Password (token with expiry)
- 🔐 Password hashing with `bcryptjs`
- 💌 Email handling via `nodemailer`
- 🔐 Reset token securely generated using built-in `crypto` module
- 🌐 CORS enabled for frontend integration
- 📦 Environment variables for secure configs

---

## 🛠️ Tech Stack

- 🟢 **Node.js** – JavaScript runtime for backend
- 🚂 **Express.js** – Web framework
- 🗃️ **MongoDB** – NoSQL database
- 🔐 **JWT (jsonwebtoken)** – Token-based authentication
- 🔑 **bcryptjs** – For password hashing
- 🧪 **crypto** – Built-in Node module for generating secure tokens
- 💌 **Nodemailer** – For sending reset password emails
- 🧬 **dotenv** – Manage environment variables

---

## 🔗 API Endpoints

| Method | Route                     | Description              |
|--------|---------------------------|--------------------------|
| POST   | /api/register             | Register new user        |
| POST   | /api/login                | Login and get token      |
| POST   | /api/forgot-password      | Send reset link          |
| POST   | /api/reset-password       | Reset password           |

---

## 🧪 Testing

You can test the backend using:
- ✅ **Postman** (send requests manually)
- ✅ **Frontend React App** (connected via Axios)