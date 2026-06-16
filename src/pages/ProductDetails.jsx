import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/Productdetails.css";
import "../App.css"
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setproduct] = useState(null);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(
  (JSON.parse(localStorage.getItem("cart")) || [])
    .length
);



  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setproduct(data);
      });
  }, [id]);

  if (!product) {
    return <h3>loading...</h3>;
  }

  // ---------------------------------------------------------------------------
  const handleCart = () => {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    alert("Product is already in your cart!");
    return;
  }

  cart.push(product);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  setCartCount(cart.length)

  alert("🛒 Product added to cart successfully!");
};
  // ---------------------------------------------------------------------------

  return (
    <>
    <Navbar  cartCount={cartCount}/>
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
          <p>{product.description} </p>
          <h4>Category:{product.category} </h4>
          <h4>Rating: ⭐ {product.rating?.rate}</h4>
          <h4>Reviews: {product.rating?.count}</h4>
          <button onClick={handleCart}>Add To Cart</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
