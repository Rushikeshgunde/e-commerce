import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import "../style/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartCount(cart.length);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    const matchesPrice = product.price <= maxPrice;

    let matchesBrand = true;

    if (selectedBrands.length > 0) {
      matchesBrand = selectedBrands.some((brand) => {
        if (brand === "Electronics" && product.category === "electronics")
          return true;

        if (brand === "Jewelery" && product.category === "jewelery")
          return true;

        if (brand === "Men" && product.category === "men's clothing")
          return true;

        if (brand === "Women" && product.category === "women's clothing")
          return true;

        return false;
      });
    }

    return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
  });

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (sortOrder === "low-high") {
    currentProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high-low") {
    currentProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Navbar
        search={search}
        setsearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setsortOrder={setSortOrder}
        cartCount={cartCount}
      />

      <div className="shop-layout">
        <Sidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
        />

        <div className="main-content">
          <h1 className="page-title">All Products</h1>

          <div className="products-container">
            {currentProducts.length > 0 ? (
              currentProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  setCartCount={setCartCount}
                />
              ))
            ) : (
              <div className="no-product">
                <h2>No Products Found</h2>
                <p>Try a different search keyword.</p>
              </div>
            )}
          </div>

          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
