
# 🚀 InterviewXp – Social Interview Experience Platform

InterviewXp is a **full-stack social platform** where users can **share interview experiences**, **interact through likes, comments, and follows**, and **maintain anonymous professional profiles**.

This project is built to understand **real-world application development**, not just isolated features.
It focuses on **end-to-end flow**: frontend → backend → database → security.

> 📘 This repository is intentionally documented like a **learning guide** so beginners can understand *how real applications are built*.

---

## 📌 Project Motivation

Most beginner projects stop at CRUD operations.
InterviewXp goes further by implementing:

* Authentication with JWT
* User relationships (followers/following)
* Protected routes
* Real user interaction flow
* Scalable backend design

This project helped me **think like a developer**, not just a coder.

---

## 🎯 What Problem Does It Solve?

* Interview experiences are scattered and unstructured
* No safe anonymous sharing
* No real interaction system

InterviewXp provides a **structured, anonymous, interactive platform** for interview discussions.

---

## ✨ Features

### ✅ Implemented

* User Registration & Login
* JWT Authentication
* Anonymous Display Names
* Create Interview Posts
* Like & Comment on Posts
* User Profiles
* Followers & Following
* Pagination
* Secure APIs
* MongoDB integration

### 🔜 Upcoming

* Comment Replies (threaded comments)
* Advanced search & filters
* Notifications
* Rate limiting & abuse protection
* UI/UX polish

---

## 🏗️ System Architecture

```
┌────────────┐
│  Frontend  │  (React)
└─────┬──────┘
      │ HTTP Requests
      ▼
┌────────────┐
│  Backend   │  (Node.js + Express)
│            │
│ JWT Auth   │
└─────┬──────┘
      │ Mongoose
      ▼
┌────────────┐
│  MongoDB   │
└────────────┘
```

---

## 🔐 Authentication Using JWT (Beginner Friendly)

### 🔹 What is JWT?

**JWT (JSON Web Token)** is a secure way to authenticate users **without storing sessions on the server**.

Once logged in, the user receives a **token** that proves identity for future requests.

---

### 🧠 Real-World Analogy

JWT is like a **concert wristband 🎫**:

* You get it once at entry
* You show it everywhere
* Security checks the band, not your name
* No repeated database verification

---

## 🧩 JWT Structure

```
HEADER.PAYLOAD.SIGNATURE
```

| Part      | Purpose                |
| --------- | ---------------------- |
| Header    | Algorithm & token type |
| Payload   | User ID & metadata     |
| Signature | Prevents tampering     |

---

## 🔄 JWT Authentication Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │ Login
     ▼
┌──────────┐
│Frontend  │
└────┬─────┘
     │ POST /login
     ▼
┌──────────┐
│ Backend  │
│ Verify   │
└────┬─────┘
     │ Generate JWT
     ▼
┌──────────┐
│ JWT Token│
└────┬─────┘
     │ Send token
     ▼
┌──────────┐
│Frontend  │
│ Store JWT│
└────┬─────┘
     │ Authorization: Bearer token
     ▼
┌──────────┐
│Protected │
│ Routes   │
└──────────┘
```

---

## 🛡️ Why JWT is Used?

✔ Stateless
✔ Scalable
✔ Secure
✔ Industry Standard
✔ Ideal for REST APIs

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Fetch API
* React Toastify

### Backend

* Node.js
* Express.js
* JWT (jsonwebtoken)
* bcryptjs

### Database

* MongoDB
* Mongoose

---

## 📂 Project Structure

```
InterviewXp/
│
├── client/          # React frontend
├── server/          # Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── control.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Abhi0505-kinagi/InterviewXp.git
cd InterviewXp
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_super_secret_key
```

Run backend:

```bash
node control.js
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 📊 Project Status

**🟡 In Progress – ~70% Complete**

### ✔ Completed

* Authentication system
* Core social features
* Profile management

### 🚧 In Development

* Comment replies
* Security hardening
* UX improvements

---

## 📘 Learning Outcomes

This project helped me learn:

* Full-stack request flow
* JWT authentication & authorization
* Backend architecture
* Database modeling
* Debugging real production-like issues
* Writing clear documentation

---

## ⭐ Final Words

This project is built **step by step**, just like real applications.

> If a beginner reads this repo, they should understand
> **how modern web applications actually work.**

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📖 Read it like a book

---

