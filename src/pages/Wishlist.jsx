import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/Cartcontext";
import { toast } from "react-toastify";
import "../style/wishlist.css";
import Navbar from "../components/Navbar";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      toast.warning("Product already exists in cart!");
      return;
    }

    const updatedCart = [...cartItems, { ...product, quantity: 1 }];

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("🛒Product added to cart!");
  };
  // ---------------------------------------------------------------------------
  const handleRemove = (product) => {
    toggleWishlist(product);
    toast.success("Removed from wishlist 💔");
  };

  return (

    <>
      <Navbar/>
    <div className="wishlist-container">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <h2>No items in wishlist 😔</h2>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.image} alt={item.title} />

              <h3>{item.title}</h3>

              <p>₹ {item.price}</p>

              <button onClick={() => handleRemove(item)}>Remove ❤️</button>
              <button
                className="cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Wishlist;
