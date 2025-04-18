import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import defaultAvatar from "../assets/avatar.jpeg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    const userData = {
      name: "Saina Maharjan",
      email,
      profilePicture: defaultAvatar, 
    };

    login(userData); 
    console.log("User logged in:", userData);
    
    navigate("/profile");
  };

  return (
    <div className="login-container">
      <div className="login-box">
       <h3 className="login-title">Log In</h3>
        <form onSubmit={handleLogin}>
          <label>EMAIL ADDRESS</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="email-info">We’ll never share your e-mail with anyone :)</p>
          <label>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-container">
            <button type="submit" className="submit-btn">Log In</button>
            <button type="button" className="new-user-btn" onClick={() => navigate("/signup")}>
              New User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
