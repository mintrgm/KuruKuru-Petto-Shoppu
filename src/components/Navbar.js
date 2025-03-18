import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";
import "./Navbar.css";
import cartIcon from "../assets/cart.png"; 
import defaultAvatar from "../assets/avatar.jpeg"; 

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="logo">KuruKuru Petto Shoppu</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/collections">COLLECTIONS</Link>
        </li>
      </ul>
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/cart">
              <img src={cartIcon} alt="Cart" className="cart-icon" />
            </Link>
            <Link to="/profile">
              <img
                src={user.profilePicture || defaultAvatar}
                alt="Profile"
                className="profile-pic"
              />
            </Link>
            <button className="logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="signup">Sign up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
