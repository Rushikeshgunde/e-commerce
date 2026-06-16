import { useNavigate } from "react-router-dom";
import "../style/Productcard.css"

function ProductCard({ product,setCartCount }) {
    const navigate = useNavigate();

    const hnadleDetails=()=>{
        navigate(`/product/${product.id}`);
    };

   

  const handleCart = () => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existingItem =
      cart.find(
        (item) =>
          item.id === product.id
      );

    if (existingItem) {
      alert("Already Added");
      return;
    }else{
        alert("Product added to cart successfully!")
    }

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    setCartCount(cart.length);
  };





  return (
    <div className="card">
      <img src={product.image} alt={product.title} onClick={hnadleDetails} />

      <h3 onClick={hnadleDetails}>{product.title}</h3>
      <p>₹ {product.price}</p>

      <button className="cart-btn" onClick={handleCart}>Add to cart</button>
    </div>
  );
}


export default ProductCard;
