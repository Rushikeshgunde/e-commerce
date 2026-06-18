import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { WishlistContext } from "../context/WishlistContext";
import "../style/Productcard.css";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isWished = wishlist.some(
    (item) => (item.id || item._id) === (product.id || product._id),
  );

  const handleWishlist = () => {
    const alreadyWished = wishlist.some((item) => item.id === product.id);
    toggleWishlist(product);

    toast.success(
      alreadyWished ? "Removed from wishlist 💔" : "Added to wishlist ❤️",
    );
  };

  const handleDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const { cartItems, setCartItems } = useContext(CartContext);

  const handleCart = () => {
    const cart = [...cartItems];

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      toast.warning("Product already exists in cart!");
      return;
    }
    cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));

    setCartItems(cart);

    toast.success("🛒Product added to cart!");
  };

  return (
    <div className="card">
      <div className="wishlist-area">
        <button
          className={`heart-btn ${isWished ? "active" : ""}`}
          onClick={handleWishlist}
        >
          {isWished ? "❤️" : "🤍"}
        </button>
      </div>

      <img src={product.image} alt={product.title} onClick={handleDetails} />

      <h3 className="product-title" onClick={handleDetails}>{product.title}</h3>

      {/* <p className="category">{product.category}</p> */}

      <div className="rating">⭐ {product.rating?.rate}</div>

      <p className="price">₹ {product.price}</p>

      <button className="cart-btn" onClick={handleCart}>
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;
