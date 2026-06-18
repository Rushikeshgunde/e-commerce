import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cartcontext";
import Navbar from "../components/Navbar";
import "../style/Productdetails.css";
import "../App.css";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { WishlistContext } from "../context/WishlistContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setloading] = useState(true);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isWished = wishlist.some((item) => item.id === product?.id);

  const handleWishlist = () => {
    toggleWishlist(product);

    toast.success(
      isWished ? "Removed from wishlist 💔" : "Added to wishlist ❤️",
    );
  };

  // ---------------------------------------------------------------------------

  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [id]);

  const handleCart = () => {
    const cart = [...cartItems];

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      toast.warning("Product already exists in cart!");
      return;
    }

    const newCart = [
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(newCart));

    setCartItems(newCart);

    toast.success("🛒Product added to cart!");
  };

  if (loading || !product) return <Spinner />;

  return (
    <>
      <Navbar />

      <button className="backbutton" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="details">
        <div className="left">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="right">
          <h1>{product.title}</h1>

          <h2>₹ {product.price}</h2>

          <p>{product.description}</p>

          <h4>Category: {product.category}</h4>

          <h4>Rating: ⭐ {product.rating?.rate}</h4>

          <h4>Reviews: {product.rating?.count}</h4>

          <button onClick={handleCart}>Add To Cart</button>
          <button onClick={handleWishlist}>
            {isWished ? "❤️ Remove Wishlist" : "🤍 Add Wishlist"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
