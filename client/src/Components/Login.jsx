import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav=useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        console.log(data.username);
        if (res.ok && data.message === "User login successfully") {
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("username", data.username);
          if (onLogin) onLogin({ userId: data.userId, username: data.username });
          nav("/");
        } else {
          setError(data.message || "Login failed");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }

      console.log("Email:", email, "Password:", password);
    };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
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
