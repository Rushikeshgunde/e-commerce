import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on first load
  useEffect(() => {
    const storedData = localStorage.getItem("wishlist");
    if (storedData) {
      setWishlist(JSON.parse(storedData));
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ADD
  // const toggleWishlist  = (product) => {
  //   setWishlist((prev) => {
  //     const exists = prev.find((item) => item.id === product.id);

  //     if (exists) return prev;

  //     return [...prev, product];
  //   });
  // };

  const toggleWishlist = (product) => {
  const id = product.id || product._id;

  setWishlist((prev) => {
    const exists = prev.some(
      (item) => (item.id || item._id) === id
    );

    if (exists) {
      return prev.filter(
        (item) => (item.id || item._id) !== id
      );
    } else {
      return [...prev, product];
    }
  });
};

  // REMOVE
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // CLEAR (optional)
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist , removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
