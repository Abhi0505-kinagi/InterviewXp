import './App.css'
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
import Posts from "./Components/Posts"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import Register from "./Components/Register"
import Postcreation from "./Components/CreatePost"
//for testin add profile in prepare section
import Profile from "./Components/Profile"
import CommentPage from "./Components/Commenting"
import PeopleProfile from './Components/PeopleProfile';
import Prepare from "./Components/Prepare"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/crtposts" element={<CreatePost/>} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reg" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/crtpost" element={<CreatePost/>} />
        <Route path="/cmntpage" element={<CommentPage/>} />
        <Route path="/userprofls/:username" element={<PeopleProfile/>} />
        <Route path="/prepare" element={<Prepare/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
