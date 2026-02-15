import React, { useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BACKEND_URL =import.meta.env.VITE_BACKEND_URL;
import Navbar from "./Navbar";
import logImg from "../assets/user_11461171.png"
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

    fetch(`${BACKEND_URL}/api/auth/register`, {
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
        <>
        <Navbar/>
        <div className="register-wrapper">
          <div className="register-image">
            <div className="image-header">
               <h3 style={{fontFamily:"Times"}}>Be a Part Of</h3>
              <h1 style={{color:"rgba(13, 167, 233, 0.93)",fontFamily:"Times"}}>InterviewXp</h1>
              <p style={{fontFamily:"Times",fontSize:"16px"}}>we are happy to welcome you for this InterviewXp</p>
            </div>
          </div>

          <div className="register-container">
            <div className="register-box">
              <div style={{display:"flex",gap:"10%"}}> <img src={logImg} alt="" style={{width:"15%",height:"15%"}}/>
              <h2 style={{fontFamily:"Times"}}> User Login</h2></div>
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
                Already have an account❓ <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
    </>
  );
}

export default Register;
