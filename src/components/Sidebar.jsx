import "../style/Sidebar.css";

function Sidebar({ maxPrice, setMaxPrice, selectedBrands,setSelectedBrands, }) {
  const brands = ["Electronics", "Jewelery", "Men", "Women"];

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
              onChange={() =>
                handleBrandChange(brand)
              }
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
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
        />

        <p>₹ {maxPrice}</p>
      </div>

      

    </div>
  );
}

export default Sidebar;
