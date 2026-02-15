import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";
import logImg from "../assets/user_11461171.png"
import Navbar from "./Navbar";
import { toast } from "react-toastify";
const BACKEND_URL =import.meta.env.VITE_BACKEND_URL;
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav=useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok && data.token) {
          toast.success("Login successful. Welcome back!”")
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("username", data.user.name);
          if (onLogin) onLogin({ userId: data.userId, username: data.username });
          nav("/");
        } else {
          toast.error("Login Failed:"+data.message);
          setEmail("");
          setPassword("");
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again "+err);
      }
    };


  return (
    <>
    <Navbar/>
      <div className="login-wrapper">
    <div className="login-image">
      <div className="image-header">
        <h3 style={{fontFamily:"Times"}}>Welcome Back To</h3>
        <h1 style={{color:"rgba(13, 167, 233, 0.93)",fontFamily:"Times"}}>InterviewXp</h1>
      </div>
    </div>

    <div className="login-container">
      
      <div className="login-box">
        <div style={{display:"flex",gap:"10%"}}> <img src={logImg} alt="" style={{width:"15%",height:"15%"}}/>
        <h2 style={{fontFamily:"Times"}}> User Login</h2></div>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account❓ <a href="/reg">Sign up</a>
        </p>
      </div>
    </div>
  </div>

    </>

  );
}

export default Login;
