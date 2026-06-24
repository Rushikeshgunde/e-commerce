import "../style/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { WishlistContext } from "../context/WishlistContext";
import { ThemeContext } from "../context/ThemeContext";

function Navbar({
  search,
  setsearch,
  category,
  setCategory,
  // sortOrder,
  // setsortOrder,
  // cartCount,
}) {
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const navigate = useNavigate();
  return (
    <nav className="navbar">
      {/* <h2>ShopEasy</h2> */}
       <div class="logo">Shop<span>X</span></div>

    <div className="search-input">
      <input
      className="search-input"
      type="text"
      placeholder="Search Product..."
      value={search}
      onChange={(e) => setsearch(e.target.value)}
      />
      </div>


      <div className="nav-right">

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="wishlist-icon" onClick={() => navigate("/wishlist")}>
        ❤️
        {wishlist.length > 0 && (
          <span className="badge">{wishlist.length}</span>
        )}
      </div>

      <h3 className="cart" onClick={() => navigate("/cart")}>
        🛒 Cart ({cartItems.length})
      </h3>
  </div>
    </nav>
  );
}

export default Navbar;
