import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;