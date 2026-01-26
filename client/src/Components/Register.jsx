import React, { useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function generateAnonymousName() {
  const adjectives = ["Silent", "Curious", "Brave", "Wise", "Swift"];
  const animals = ["Tiger", "Panda", "Fox", "Wolf", "Eagle"];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];

  const unique = Date.now().toString(36).slice(-4); 
  // time-based uniqueness

  return `${adj}${animal}_${unique}`;
}


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    displayName: generateAnonymousName(), // 👈 auto anonymous
  });
  const nav=useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      displayName: generateAnonymousName(), // regenerate
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields")
      return;
    }

    fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Registration successfull, please logIn")
          nav("/login");
        } else {
        resetForm();
        toast.error("Registration failed,"+data.message)
        }
      })
      .catch(() =>{
        toast.error("An unexpected error occurred,please try again later");
        resetForm();
        }
      );
  };

  return (
    
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Name (private)</label>
          <input
            type="text"
            name="name"
            placeholder="Your real name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Anonymous Name</label>
          <input
            type="text"
            value={formData.displayName}
            disabled
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
