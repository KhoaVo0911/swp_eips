import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Product from "./pages/Product";
import ShopOrder from './pages/ShopOrder';
import Settings from './pages/Setting';
import './index.css';
import Admin from "./admin/Admin";
import EventAdmin from "./admin/EventAdmin";
import ShopAdmin from "./admin/ShopAdmin";
import AccountAdmin from "./admin/AccountAdmin";
import SettingAdmin from "./admin/SettingAdmin";
import Cart from "./pages/Cart";
import SettingCashier from "./cashier/SettingCashier";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/ShopOrder" element={<ShopOrder />} />
        <Route path="/Setting" element={<Settings />} />
        <Route path="/SettingAdmin" element={<SettingAdmin />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/EventAdmin" element={<EventAdmin />} >
          <Route path=":id"></Route>
        </Route>
        <Route path="/ShopAdmin" element={<ShopAdmin />} >
          <Route path=":id"></Route>
        </Route>
        <Route path="/AccountAdmin" element={<AccountAdmin />} />
        <Route path="/SettingCashier" element={<SettingCashier />} />

      </Routes>
    </Router>
  );
}

export default App;
