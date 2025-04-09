import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find(
        (i) => i.name === item.name && i.color === item.color
      );
      if (exists) {
        return prevItems.map((i) =>
          i.name === item.name && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevItems, item];
      }
    });
    alert(`${item.name} has been added to the cart!`);
  };

  const removeFromCart = (name, color) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.name === name && item.color === color))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
