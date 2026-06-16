import "../style/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({
  search,
  setsearch,
  category,
  setCategory,
  sortOrder,
  setsortOrder,
  cartCount,
}) {

    const navigate = useNavigate();
  return (
    <nav className="navbar">
      <h2>ShopEasy</h2>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Category</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewellery</option>
      </select>

      <select value={sortOrder} onChange={(e) => setsortOrder(e.target.value)}>
        <option value="">Sort Price</option>
        <option value="low-high">Low To High</option>
        <option value="high-low">High To Low</option>
      </select>

      <h3 className="cart" onClick={()=>navigate("/cart")}>🛒 Cart ({cartCount})</h3>
    </nav>
  );
}

export default Navbar;
