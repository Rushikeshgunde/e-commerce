// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './context/Cartcontext.jsx'
import {WishlistProvider } from './context/WishlistContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <WishlistProvider>
  <CartProvider>
    <App />
  </CartProvider>,
  </WishlistProvider>
  </ThemeProvider>
)
