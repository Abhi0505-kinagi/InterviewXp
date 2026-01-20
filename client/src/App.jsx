import './App.css'
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
import Posts from "./Components/Posts"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import Register from "./Components/Register"
//for testin add profile in prepare section
import Profile from "./Components/Profile"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crtposts" element={<CreatePost/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reg" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
