import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav=useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok && data.token) {
          console.log(data.user.name)
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
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
          Don't have an account? <a href="/reg">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
