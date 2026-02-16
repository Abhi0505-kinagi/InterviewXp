
```markdown
# InterviewXP: A Community-Driven Interview Experience Platform

![Status](https://img.shields.io/badge/Status-Active-success)
![Clones](https://img.shields.io/badge/GitHub_Clones-202+-blue)
![Stack](https://img.shields.io/badge/Stack-MERN-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

**Developed by:** Abhishek Hanamant Kinagi

---

## 📖 Table of Contents
1. [Problem & Solution](#-problem--solution)
2. [Project Impact](#-project-impact)
3. [Tech Stack](#-tech-stack)
4. [System Architecture](#-system-architecture)
5. [Key Features](#-key-features)
6. [Security & Authentication (JWT)](#-security--authentication-jwt)
7. [Environment Configuration](#-environment-configuration)
8. [Project Structure](#-project-directory-structure)
9. [Future Roadmap](#-future-scope--roadmap)

---

## 🚀 Problem & Solution

### The Problem: "The Information Gap in Technical Recruitment"
Computer science students and job seekers often face significant anxiety and uncertainty during the recruitment process due to a lack of transparent, accessible information. While generic interview questions are widely available, specific insights into recent interview patterns, company-specific rounds, and real-world experiences are often scattered across fragmented forums or locked behind paywalls.

### The Solution: "InterviewXP"
We developed **InterviewXP**, a full-stack web application designed to democratize access to interview knowledge.
* **Centralized Knowledge Hub:** A dedicated social platform where students and professionals can document and share detailed interview experiences.
* **Peer-to-Peer Learning:** Fosters a collaborative community where successful candidates help aspirants navigate the complexities of technical interviews.

---

## 📈 Project Impact
The project has demonstrated significant initial interest within the developer community.

* **Traffic Analysis:** The repository recorded **202 Clones** and **95 Unique Cloners** in a recent 14-day period, indicating strong utility and intent to use the codebase.
* **Real-Time Engagement:** Successfully implemented a real-time room-based communication system supporting concurrent users through WebSocket architecture.

---

## 🛠 Tech Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, Context API |
| **Backend** | Node.js, Express.js (RESTful API) |
| **Database** | MongoDB (Atlas), Mongoose Schemas |
| **Real-Time** | Socket.io (WebSockets) |
| **Security** | JWT (JSON Web Tokens), Bcrypt |
| **Deployment** | Netlify (Frontend), Render (Backend) |

---

## 🏗 System Architecture

The application follows a **Monolithic MERN Architecture**, ensuring seamless communication between the client-side interface and the server-side database.

### Architecture Diagram

```mermaid
graph TD

%% ================= STYLING =================
classDef client fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,rx:6,font-weight:bold,color:#0d47a1;
classDef logic fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,rx:6,font-weight:bold,color:#e65100;
classDef data fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,rx:6,font-weight:bold,color:#1b5e20;
classDef socket fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,rx:6,font-weight:bold,color:#4a148c;
classDef deploy fill:#fce4ec,stroke:#c2185b,stroke-width:2px,rx:6,font-weight:bold,color:#880e4f;

%% ================= CLIENT LAYER =================
subgraph Client_Layer [User Browser / Netlify Deployment]
    direction TB
    Root[App.jsx : Root Controller]:::client
    subgraph UI_Layer [React UI Components]
        AuthUI[Login / Register]:::client
        ChatUI[Chat Dashboard]:::client
        RoomUI[Room Management]:::client
        FileUI[Image and File Upload UI]:::client
        AdminUI[Admin Delete Controls]:::client
    end
    APIService[API Service Layer Axios/Fetch]:::client
    Context[Global State and Toast Provider]:::client
end

%% ================= DEPLOYMENT =================
subgraph Deployment_Layer [Hosting and Environment]
    Netlify[Netlify Hosting]:::deploy
    ENV[Environment Variables<br>VITE_BACKEND_URL]:::deploy
end

%% ================= BACKEND =================
subgraph Backend_Layer [Node.js + Express Server]
    direction TB
    subgraph Route_Layer [REST API Routes]
        AuthRoute[auth.routes.js]:::logic
        RoomRoute[room.routes.js]:::logic
        ChatRoute[chat.routes.js]:::logic
    end
    Controller[Controller Layer Business Logic]:::logic
    Middleware[Auth Middleware JWT Validation]:::logic
    RBAC[Role-Based Access Control]:::logic
    UploadHandler[File Upload Handler /uploads]:::logic
    Logger[Developer Logging System]:::logic
    subgraph Socket_Layer [Socket.IO Real-Time Engine]
        SocketServer[Socket Connection Handler]:::socket
        RoomManager[Join / Leave Room Logic]:::socket
        Broadcaster[Message Broadcasting Engine]:::socket
        FileStream[Real-Time File Events]:::socket
    end
end

%% ================= DATABASE =================
subgraph Database_Layer [MongoDB Atlas]
    direction TB
    Users[(User Schema<br>Authentication Data)]:::data
    Rooms[(Room Schema<br>Admin Parameter + Members)]:::data
    Messages[(Message Schema<br>Chat History)]:::data
end

%% ================= STORAGE =================
subgraph Storage_Layer [Media Storage System]
    ImageStore[(Image Storage)]:::data
    FileStore[(File Storage)]:::data
end

%% ================= CONNECTION FLOW =================
Root --> Context
Context --> UI_Layer
UI_Layer -->|REST API Calls| APIService
APIService -->|HTTP JSON| Route_Layer
ChatUI <-->|WebSocket Events| SocketServer
Root --> Netlify
Netlify --> ENV
ENV -->|Backend URL Injection| APIService
Route_Layer --> Middleware
Middleware --> Controller
Controller --> RBAC
Controller --> UploadHandler
Controller --> Logger
Controller <-->|Read Write| Users
Controller <-->|Read Write| Rooms
Controller <-->|Read Write| Messages
SocketServer --> RoomManager
RoomManager --> Broadcaster
Broadcaster --> Messages
FileStream --> ImageStore
FileStream --> FileStore
RBAC -->|Validate Admin| Rooms
AdminUI -->|Delete Room Request| RBAC

```

---

## ✨ Key Features

### 1. Real-Time Group Chat System

* **Socket Technology:** Users can join and leave chat rooms dynamically without refreshing the page.
* **Broadcasting:** Messages are broadcasted to all active members in a room instantly.
* **Media Sharing:** Supports image and file sharing within groups, enhancing collaboration.

### 2. Role-Based Access Control (RBAC)

* **Admin Privileges:** Only the room creator (Admin) has permission to delete the room.
* **Dynamic UI:** The delete button is dynamically enabled or disabled based on user authorization parameters in the MongoDB schema.

### 3. Secure Authentication

* **Permission Management:** Replaced default browser alerts with user-friendly permission popups.
* **Validation:** Production-level CSS and routing issues were resolved to ensure smooth deployment.

### 4. Developer Logging & Debugging

* **Backend Logs:** Added developer-level logging to monitor server activity, socket connections, and database operations for easier troubleshooting.

---

## 🔐 Security & Authentication (JWT)

We use **JSON Web Tokens (JWT)** to implement secure, stateless authentication. This eliminates the need for server-side session storage.

### Authentication Flow

1. **Login:** Server verifies password using `bcrypt.compare`.
2. **Token Generation:** Server signs a JWT containing `User ID` and `Role` using `JWT_SECRET`.
3. **Access:** Client sends the token in the Header. Middleware verifies the signature before granting access to protected routes (e.g., Delete Room).

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Middleware
    participant Controller
    participant DB

    Note over Client, DB: PHASE 1: LOGIN
    Client->>Controller: POST /login (email, pass)
    Controller->>DB: Find User
    DB-->>Controller: User Hash
    Controller->>Controller: bcrypt.compare()
    Controller-->>Client: Return JWT Token

    Note over Client, DB: PHASE 2: PROTECTED ROUTE
    Client->>Middleware: DELETE /room (Bearer Token)
    Middleware->>Middleware: Verify Signature
    Middleware->>Controller: Token Valid -> Next()
    Controller->>DB: Delete Room (if Admin)
    DB-->>Controller: Success
    Controller-->>Client: 200 OK

```

---

## ⚙️ Environment Configuration

To ensure security, the application utilizes a `.env` file to manage sensitive credentials.

| Variable Name | Description |
| --- | --- |
| `VITE_BACKEND_URL` | Frontend API Endpoint (e.g., localhost:8000) |
| `JWT_SECRET` | Private Key for signing Auth Tokens |
| `MONGO_URI` | MongoDB Atlas Connection String |
| `PORT` | Server Port Number |
| `NODE_ENV` | Environment mode (Development/Production) |
| `CLIENT_URL` | Frontend URL for Socket CORS policy |

---

## 📂 Project Directory Structure

```text
InterviewXP/
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── Components/         # Chat, Login, Profile UI
│   │   ├── services/           # API Service Files
│   │   ├── App.jsx             # Main Routing
│   │   └── main.jsx            # Entry Point
│   └── .env                    # Frontend Secrets
│
├── server/                     # Backend (Node + Express)
│   ├── middleware/             # Auth & Upload Middleware
│   ├── models/                 # Mongoose Schemas (Users, Rooms)
│   ├── routes/                 # API Routes (Auth, Chat, Profile)
│   ├── uploads/                # User File Storage
│   ├── utils/                  # DB Connection & Control Logic
│   └── .env                    # Backend Secrets
│
└── ml_integration/             # Machine Learning Scripts

```

---

## 🔮 Future Scope & Roadmap

To elevate InterviewXP into a comprehensive recruitment ecosystem, the following modules are under development:

1. **AI-Driven Virtual Interviewer:** Integrating LLMs to create a virtual interviewer that asks context-aware questions based on the user's resume.
2. **Microservices Architecture:** Decoupling the backend into independent services (Auth, Chat, Assessment) using Docker for better scalability.
3. **Secured Assessment Protocol:** Implementing browser-locking mechanisms to conduct cheat-proof online coding tests.
4. **User Experience Enhancements:** Adding a "Trending in Tech" feed and secure "Forgot Password" flows using Nodemailer.

---

**© 2026 InterviewXP. All Rights Reserved.**

```
