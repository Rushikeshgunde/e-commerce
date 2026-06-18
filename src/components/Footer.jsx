import "../style/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3>ShopEasy</h3>

      <p>
        Your one-stop destination for online shopping.
      </p>

      <div className="footer-links">
        <span>Home</span>
        <span>Products</span>
        <span>Wishlist</span>
        <span>Cart</span>
      </div>
    </footer>
  );
}

export default Footer;