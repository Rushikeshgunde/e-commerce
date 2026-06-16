import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "../style/home.css";

function Home() {
  const [products, setproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setsortOrder]=useState("");
  const [cartCount, setcartCount]=useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setproducts(data);
      });
  }, []);

  useEffect(()=>{

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  setcartCount(cart.length);

},[]);

  const sortedProducts = products.filter((product) =>{
    const matchesSearch=
    product.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
      category === "all" ||
      product.category === category;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
  );

  if (sortOrder === "low-high") {
  sortedProducts.sort(
    (a, b) => a.price - b.price
  );
}

if (sortOrder === "high-low") {
  sortedProducts.sort(
    (a, b) => b.price - a.price
  );
}
 

  return (
    <>
      <Navbar 
      search={search}
      setsearch={setsearch} 
      category={category}
      setCategory={setCategory}
      sortOrder={sortOrder}
      setsortOrder={setsortOrder}
      cartCount={cartCount}
      />

      <h1>All Products</h1>

      <div className="products-container">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item) => (
            <ProductCard
             key={item.id} 
             product={item} 
             setCartCount={setcartCount}
             />
          ))
        ) : (
          <div className="no-product">
            <h2>No Products Found</h2>
            <p>Try a different search keyword.</p>
          </div>
        )}
      </div>
    </>
  );
}
export default Home;
