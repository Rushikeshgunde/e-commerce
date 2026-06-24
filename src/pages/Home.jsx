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
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10; // 5 columns x 2 rows

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, maxPrice, selectedBrands, rating]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRating = product.rating.rate >= rating;

    const matchesCategory =
      category === "all" || product.category === category;

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

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesBrand &&
      matchesRating
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (sortOrder === "low-high") {
    currentProducts.sort((a, b) => a.price - b.price);
  }
  if (sortOrder === "high-low") {
    currentProducts.sort((a, b) => b.price - a.price);
  }

  // Loading state
  if (loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar
        search={search}
        setsearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setsortOrder={setSortOrder}
      />

      <div className="shop-layout">
        <Sidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          rating={rating}
          setRating={setRating}
          totalProducts={products.length}
          filteredCount={filteredProducts.length}
        />

        <div className="main-content">
          <div className="products-container">
            {currentProducts.length > 0 ? (
              currentProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
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
    </div>
  );
}

export default Home;