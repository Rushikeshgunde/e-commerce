import { useState, useEffect } from "react";
import "../style/cart.css";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
    
  }, []);

  // Remove Product
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  // --------------------------------------------------------------------------------
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );
    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          }
        : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  // --------------------------------------------------------------------------------

  // Total Price
  const totalPrice = cartItems.reduce((total, item) => total + item.price*item.quantity, 0);

  return (
<>
    <Navbar/>


    <div className="cart-container">
      <h1 className="cart-title">🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to continue shopping.</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-details">
                <h3>{item.title}</h3>

                <p className="cart-price">₹ {item.price}</p>
                <div className="quantity-box">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <p>Subtotal: ₹ {(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2 className="total-price">Total: ₹ {totalPrice.toFixed(2)}</h2>

            <button className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Cart;
