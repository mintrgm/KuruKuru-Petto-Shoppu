import React from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useAuth } from "../App";
import deleteIcon from "../assets/delete.png";

const Cart = ({ visible, onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = (name, color) => {
    removeFromCart(name, color);
  };

  const handleCheckout = () => {
    navigate("/payment");
    onClose();
  };

  if (!visible || !user) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-box">
        <span className="close-btn" onClick={onClose}>✕</span>
        <h2 className="cart-title">KuruKuru Basket</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Color</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>
                  <select defaultValue={item.quantity}>
                    {[1, 2, 3].map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select defaultValue={item.color}>
                    {["Black", "White", "Brown"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </td>
                <td>Rs. {item.price}/-</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(item.name, item.color)}>
                    <img src={deleteIcon} alt="delete" className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="total-price">
          TOTAL PRICE: Rs. {cartItems.reduce((total, item) => total + item.price, 0)}/-
        </p>
        <button className="checkout-btn" onClick={handleCheckout}>Check out</button>
      </div>
    </div>
  );
};

export default Cart;
