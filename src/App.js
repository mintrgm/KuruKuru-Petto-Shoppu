import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Collections from "./components/Collections";
import AxolotlDetail from "./components/AxolotlDetail";
import BlogsEvents from "./components/BlogsEvents";
import Cart from "./components/Cart";
import PaymentPage from "./components/PaymentPage";
import { CartProvider } from "./CartContext";

// Create Auth Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [showCart, setShowCart] = useState(false); 
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartProvider>
        <Router>
          <Navbar setShowCart={setShowCart} />
          <Cart visible={showCart} onClose={() => setShowCart(false)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/product/axolotl" element={<AxolotlDetail />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/profile" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/blogs-events" element={<BlogsEvents />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
