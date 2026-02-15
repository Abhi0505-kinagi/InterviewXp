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
import ToastProvider from "./Components/TostProvider";
import ChatPage from "./Components/Chat"
import Rooms from "./Components/Rooms"
import Assessment from "./Components/AssessmentPage";
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
        {/* Routes under protection  */}
          <Route path="/posts" element={<Posts />}/>
          <Route path="/crtpost" element={ <CreatePost />}/>
          <Route path="/profile"element={<Profile />} />
          <Route path="/cmntpage" element={<CommentPage /> }/>
          <Route path="/userprofls/:username" element={<PeopleProfile />} />
          <Route path="/chat-rooms/:roomId" element={<ChatPage/>} />
          <Route path="/virtual/assessments/examId" element={<Assessment/>} />
          <Route path="/rooms" element={<Rooms/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
