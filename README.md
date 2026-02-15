
#  InterviewXp – Social Interview Experience Platform
## 🚀 Live Demo
🔗[ https://69808565cba0dec12b1c5507--interviewxp.netlify.app](https://6991c4b4646d99f0b8ab966e--interviewxp.netlify.app/)
(due to free tier hosting the website speed is low so wait for response)


![Tech Stack](https://img.shields.io/badge/Stack-MERN-success)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-brightgreen)
![Database](https://img.shields.io/badge/Database-MongoDB-green)
![Auth](https://img.shields.io/badge/Auth-JWT-blue)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

**InterviewXp** is a full-stack social platform that enables users to **share interview experiences**, **interact through likes, comments, and follows**, and **maintain anonymous professional profiles** in a secure environment.

This project is designed to go beyond basic CRUD applications and demonstrate **real-world system design**, **authentication workflows**, and **scalable backend architecture**.

> 📘 This repository is intentionally documented as a **learning-oriented project**, making it beginner-friendly while still following industry practices.

---

## 📌 Project Motivation

Most beginner projects stop at implementing isolated features.  
InterviewXp focuses on building a **complete, production-style workflow**, including:

- Secure authentication and authorization
- User-to-user interactions
- Protected APIs
- Scalable data modeling
- Clear separation of frontend and backend concerns

This project helped me transition from *writing code* to *thinking like a developer*.

---

## 🎯 Problem Statement

Interview experiences are often:
- Scattered across platforms
- Difficult to organize
- Lacking anonymity
- Missing meaningful interaction

**InterviewXp** solves this by providing a **structured, anonymous, and interactive platform** dedicated to interview discussions.

---

## ✨ Features

### ✅ Implemented

- User Registration & Login
- JWT-based Authentication
- Anonymous Display Names
- Create & Manage Interview Posts
- Like and Comment System
- User Profiles
- Followers & Following
- Pagination for scalable feeds
- Secure REST APIs
- MongoDB Integration

### 🔜 Planned Enhancements

- Threaded Comment Replies
- Advanced Search & Filters
- Notification System
- Rate Limiting & Abuse Protection
- UI/UX Improvements

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
│ Mongoose ODM
▼
┌────────────┐
│  MongoDB   │
└────────────┘

```

---

## 🔐 Authentication (JWT Explained Simply)

### What is JWT?

**JWT (JSON Web Token)** is a stateless authentication mechanism where the server issues a signed token after successful login.  
The client uses this token to access protected routes without maintaining server-side sessions.

---

### Real-World Analogy

JWT works like a **verified event wristband 🎫**:

- Issued once after identity verification
- Shown on every entry
- Security checks the band, not your identity again
- No repeated database lookups

---

## 🧩 JWT Structure

```

HEADER.PAYLOAD.SIGNATURE

```

| Component  | Purpose |
|-----------|--------|
| Header    | Token type & algorithm |
| Payload   | User data & metadata |
| Signature | Prevents tampering |

---

## 🔄 Authentication Flow

```

User → Frontend → Backend
Login Request
Backend → Verify Credentials
Backend → Generate JWT
Frontend → Store Token
Frontend → Access Protected APIs

```

---

## 🛡️ Why JWT?

- Stateless and scalable
- Secure when implemented correctly
- Industry standard for REST APIs
- Ideal for distributed systems

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Fetch API
- React Toastify

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcryptjs

### Database
- MongoDB
- Mongoose

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

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abhi0505-kinagi/InterviewXp.git
cd InterviewXp
````

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

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

**🟡 In Progress — ~70% Complete**

### ✔ Completed

* Authentication system
* Core social features
* Profile management

### 🚧 In Development

* Threaded comments
* Security hardening
* UI/UX refinement

---

## 📘 Key Learning Outcomes

Through this project, I gained hands-on experience with:

* End-to-end full-stack workflows
* JWT authentication & authorization
* Backend architecture design
* MongoDB schema modeling
* Debugging production-like issues
* Writing clear, structured documentation

---

## ⭐ Final Notes

InterviewXp is built **incrementally**, mirroring how real-world applications evolve.

> The goal is that a beginner can read this repository
> and understand **how modern web applications are actually built**.

If you find this project useful:

* ⭐ Star the repository
* 🍴 Fork it
* 📖 Explore it as a learning resource

```
