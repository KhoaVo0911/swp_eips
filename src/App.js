import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Product from "./pages/Product";
import ShopOrder from './pages/ShopOrder';
import Settings from './pages/Setting';
import ComboProduct from './product/ComboProduct';
import CreateProduct from './product/CreateProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/ShopOrder" element={<ShopOrder />} />
        <Route path="/Setting" element={<Settings />} />
        <Route path="/comboproduct" element={<ComboProduct />} />
        <Route path="/createproduct" element={<CreateProduct />} />

      </Routes>
    </Router>
  );
}

export default App;
