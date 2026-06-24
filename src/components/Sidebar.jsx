import "../style/Sidebar.css";

function Sidebar({
  maxPrice,
  setMaxPrice,
  selectedBrands,
  setSelectedBrands,
  rating,
  setRating,
  totalProducts,
  filteredCount,
}) {
  const brands = ["Electronics", "Jewelery", "Men", "Women"];
  // const [priceCategory, setPriceCategory] = useState("all");

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="sidebar">
      <h3>Categories</h3>

      <div className="filter-section">
        {/* <h4>Brands</h4> */}

        {brands.map((brand) => (
          <label key={brand} className="brand-item">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />

        <p>₹ {maxPrice}</p>
      </div>
      {/* ----------------------------------------------------------------- */}
      {(selectedBrands.length > 0 || rating > 0 || maxPrice < 1000) && (
        <div className="active-filters">
          <h4>Active Filters</h4>

          {selectedBrands.map((brand) => (
            <p key={brand}>✓ {brand}</p>
          ))}

          {rating > 0 && <p>✓ {rating}★ & Above</p>}

          {maxPrice < 1000 && <p>✓ Under ₹{maxPrice}</p>}
        </div>
      )}
      {/* ----------------------------------------------------------------- */}
      {/* <div className="stats-box">
        <h4>Statistics</h4>

        <p>Total: {totalProducts}</p>
        <p>Showing: {filteredCount}</p>
      </div> */}
      {/* ----------------------------------------------------------------- */}

      <h3>⭐ Rating</h3>

      <label
        className={rating === 0 ? "rating-item active-rating" : "rating-item"}
      >
        <input
          type="radio"
          name="rating"
          checked={rating === 0}
          onChange={() => setRating(0)}
        />
        All Ratings
      </label>

      <label
        className={rating === 4 ? "rating-item active-rating" : "rating-item"}
      >
        <input
          type="radio"
          name="rating"
          checked={rating === 4}
          onChange={() => setRating(4)}
        />
        4★ & Above
      </label>

      <label
        className={rating === 3 ? "rating-item active-rating" : "rating-item"}
      >
        <input
          type="radio"
          name="rating"
          checked={rating === 3}
          onChange={() => setRating(3)}
        />
        3★ & Above
      </label>

      <label
        className={rating === 2 ? "rating-item active-rating" : "rating-item"}
      >
        <input
          type="radio"
          name="rating"
          checked={rating === 2}
          onChange={() => setRating(2)}
        />
        2★ & Above
      </label>

      <div className="product-count">
        Products Found:
        {totalProducts}
      </div>

      {/* <button
        className="reset-btn"
        onClick={() => {
          setSelectedBrands([]);
          setMaxPrice(1000);
          setRating(0);
        }}
      >
        Reset Filters
      </button> */}

      {/* ----------------------------------------------------------------- */}
    </div>
  );
}

export default Sidebar;
