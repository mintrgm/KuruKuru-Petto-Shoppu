import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../App";
import "./Navbar.css";
import cartIcon from "../assets/cart.png";
import defaultAvatar from "../assets/avatar.jpeg";

const Navbar = ({ setShowCart }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowCart(true);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">KuruKuru Petto Shoppu</h1>
      <ul className="nav-links">
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "nav-active" : "nav-inactive"}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/collections"
            className={location.pathname === "/collections" ? "nav-active" : "nav-inactive"}
          >
            COLLECTIONS
          </Link>
        </li>
      </ul>
      <div className="nav-right">
        {user ? (
          <>
            <img
              src={cartIcon}
              alt="Cart"
              className="cart-icon"
              onClick={handleCartClick}
              style={{ cursor: "pointer" }}
            />
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
