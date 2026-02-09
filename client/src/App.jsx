import "./App.css";
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
import Posts from "./Components/Posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import CommentPage from "./Components/Commenting";
import PeopleProfile from "./Components/PeopleProfile";
import Prepare from "./Components/Prepare";
import ToastProvider from "./Components/TostProvider";
import ProtectedRoute from "./routes/ProtectedRoutes"
import ChatPage from "./Components/Chat"
import Rooms from "./Components/Rooms"
function App() {
  return (
    <>
      <ToastProvider />
      <BrowserRouter>
        <Routes>

          {/* 🌐 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/" element={<Home />} />

          {/* 🔐 Protected Routes */}

          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/crtpost"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cmntpage"
            element={
              <ProtectedRoute>
                <CommentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/userprofls/:username"
            element={
              <ProtectedRoute>
                <PeopleProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/prepare"
            element={
              <ProtectedRoute>
                <Prepare />
              </ProtectedRoute>
            }
          />
         <Route path="/chat-rooms/:roomId" element={<ChatPage/>} />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Rooms/>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
