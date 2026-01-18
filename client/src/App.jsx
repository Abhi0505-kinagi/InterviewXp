import './App.css'
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
import Posts from "./Components/Posts"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crtposts" element={<CreatePost/>} />
        <Route path="/posts" element={<Posts/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
