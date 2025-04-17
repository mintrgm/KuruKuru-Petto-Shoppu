import React, { useMemo } from "react";
import "./PaymentPage.css";
import { useLocation } from "react-router-dom";
import { useCart } from "../CartContext";
import { useAuth } from "../App";

const PaymentPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { cartItems } = useCart();

  const directItem = location.state?.directPurchase;

  const itemsToDisplay = useMemo(() => {
    return directItem ? [directItem] : cartItems;
  }, [directItem, cartItems]);

  const total = itemsToDisplay.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const deliveryFee = 100;
  const grandTotal = total + deliveryFee;

  return (
    <div className="payment-container">
      <h1 className="level-title">LEVEL 3D</h1>

      <div className="step-tracker">
        <span className="step active">01 Shipping</span>
        <span className="step">02 Payment</span>
        <span className="step">03 Confirmation</span>
      </div>

      {/* SHIPPING ADDRESS */}
      <div className="shipping-box">
        <h3>Shipping Address</h3>
        <p>{user?.name || "N/A"} | {user?.phone || "N/A"}</p>
        <p>{user?.address || "Please update profile address"}</p>
      </div>

      {/* PRODUCTS */}
      <div className="products-box">
        <h3>Products</h3>
        {itemsToDisplay.map((item, i) => (
          <div key={i} className="product-item">
            <img src={item.img} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p>Qty: {item.quantity || 1}</p>
              <p>Color: {item.color}</p>
              <p>Rs. {item.price}</p>
            </div>
          </div>
        ))}
        <p className="total-price">Total Price: Rs. {total}/-</p>
      </div>

      {/* INVOICE */}
      <div className="invoice-box">
        <h3>Invoice</h3>
        <p>Items Total: Rs. {total}</p>
        <p>Delivery Fee: Rs. {deliveryFee}</p>
        <h4>Grand Total: <span className="total">Rs. {grandTotal}</span></h4>
        <button className="proceed-btn">Proceed to Pay</button>
      </div>
    </div>
  );
};

export default PaymentPage;
