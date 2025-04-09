import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up with", name, email, password, profilePic);
    navigate("/login"); 
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label className="signup-label">NAME</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="signup-label">EMAIL ADDRESS</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="signup-label">PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Profile Picture Upload */}
          <div className="profile-pic-upload">
            <div className="profile-pic-preview">
              {profilePic ? (
                <img src={URL.createObjectURL(profilePic)} alt="Preview" />
              ) : (
                <div className="empty-circle" />
              )}
            </div>
            
            {/* Hidden file input + custom label button */}
            <input
              type="file"
              accept="image/*"
              id="profilePicUpload"
              onChange={(e) => setProfilePic(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="profilePicUpload" className="custom-upload-btn">
              Upload Photo
            </label>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
