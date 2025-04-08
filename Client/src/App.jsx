import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SupplierPage from "./pages/SupplierPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Order from "./pages/Order.jsx";
import Checkout from "./pages/Checkout.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Favourites from "./pages/Favourites.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Cart from "./pages/Cart.jsx";
import SupplierProfile from "./pages/SupplierProfile";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";

function App() {
  return (
    <div className="overflow-x-hidden bg-gray-900">
      <Dashboard />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suppliers" element={<SupplierPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/buy-checkout" element={<Checkout />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/supplier-profile/:id" element={<SupplierProfile />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <div className="pt-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
