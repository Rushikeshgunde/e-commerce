
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart.jsx";




function App() {
 

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/product/:id' element={<ProductDetails/>} />
    <Route path="/cart" element={<Cart/>} />
    </Routes>

    </BrowserRouter>
  )
}

export default App;
