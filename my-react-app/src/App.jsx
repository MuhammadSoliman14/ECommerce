import Navbar from "./components/Navbar"
import Categories from "./components/Categories"
import Products from "./components/Products";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}>
        </Route>
        <Route path="/products " element={<ProductList/>}>
          
        </Route>
        <Route path="/products:id" element={<Product/>}  >
          
        </Route>
        <Route path="/cart" element={<Cart/>}>
          
        </Route>
        <Route path="/login" element={<Login/>} >
          
        </Route>
        <Route path="/register" element= {<Register/>} >
        </Route>
      </Routes>
    </Router>
  )
};

export default App;