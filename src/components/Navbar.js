import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <nav className="navbar">
      <h1 className="logo">KuruKuru Petto Shoppu</h1>
      <ul className="nav-links">
        <li>
          <a
            href="/"
            className={activePage === "home" ? "home-active" : ""}
            onClick={() => setActivePage("home")}
          >
            HOME
          </a>
        </li>
        <li>
          <a
            href="/collections"
            className={`${activePage === "collections" ? "collections-active" : "collections-inactive"}`}
            onClick={() => setActivePage("collections")}
          >
            COLLECTIONS
          </a>
        </li>
      </ul>
      <div className="nav-right">
        <button className="login">Log in</button>
        <button className="signup">Sign up</button>
      </div>
    </nav>
  );
};

export default Navbar;
