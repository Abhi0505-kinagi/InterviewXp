
markdown
# InterviewXP: A Community-Driven Interview Experience Platform

![Status](https://img.shields.io/badge/Status-Active-success)
![Clones](https://img.shields.io/badge/GitHub_Clones-202+-blue)
![Stack](https://img.shields.io/badge/Stack-MERN-yellow)
![License](https://img.shields.io/badge/License-MIT-green)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://6991c4b4646d99f0b8ab966e--interviewxp.netlify.app/)
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

### Authenication Sequence
```mermaid
sequenceDiagram
    autonumber
    participant Client as 💻 Client (React)
    participant Mid as 🛡️ Middleware
    participant Control as ⚙️ Controller
    participant DB as 🗄️ MongoDB

    Note over Client, DB: PHASE 1: LOGIN & AUTH
    Client->>Control: POST /login (email, pass)
    Control->>DB: Find User by Email
    DB-->>Control: User Record (Hash + Role)
    Control->>Control: Bcrypt.compare(pass, hash)
    Control-->>Client: 200 OK + JWT Token

    Note over Client, DB: PHASE 2: PROTECTED DATABASE OPS
    Client->>Mid: DELETE /room (Bearer Token)
    Mid->>Mid: Verify Signature
    Mid->>Control: Valid -> {id, role}
    
    Note right of Control: RBAC: Check if Admin
    Control->>DB: deleteOne({ _id: roomId })
    DB-->>Control: Success
    Control-->>Client: 200 OK (Room Deleted)

```
### Internal Hashing Logic
```mermaid
    graph LR
    subgraph Registration_Storage
    P1[User Password] --> B1(Bcrypt + Salt)
    B1 --> H1[(Hashed Password)]
    H1 --> DB1[(Stored in MongoDB)]
    end

    subgraph Login_Verification
    P2[Input Password] --> B2{Bcrypt Compare}
    DB1 --> B2
    B2 -->|Match| V[Access Granted]
    B2 -->|No Match| X[Access Denied]
    end

    style B2 fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style H1 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style DB1 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
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
Here is the updated **Installation & Setup** section for your `README.md`. I’ve integrated the clone instructions with the specific technical details from your project structure to make it as professional as possible.

---

### **⚙️ Installation & Setup**

We welcome developers to explore and contribute to **InterviewXp**. To get a local copy up and running, follow these steps: 

#### **1. Clone the Repository**

Open your terminal and run the following command to download the full source code:

```bash
git clone [https://github.com/Abhi0505-kinagi/interview_xp__.git](https://github.com/Abhi0505-kinagi/interview_xp__).git
cd interviewxp

```

#### **2. Backend Configuration (Server)**

Navigate to the server directory and install the required Node.js dependencies: 

```bash
cd server
npm install

```
* 
**Environment Variables:** Create a `.env` file in the `server/` directory.
* 
**Setup Database:** Provide your **MONGO_URI** (Atlas or Local) and a **JWT_SECRET** in the `.env` file to enable authentication and database connectivity.

#### **3. Frontend Configuration (Client)**

Open a new terminal, navigate to the client directory, and install the React/Vite dependencies: 

```bash
cd client
npm install

```
* **Start Development Server:**

```bash
npm run dev

```
* 
**Connection:** The client will automatically connect to the backend using the `VITE_BACKEND_URL` defined in your environment variables.


**© 2026 InterviewXP. All Rights Reserved.**

```
