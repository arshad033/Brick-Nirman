import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SupplierPage from "./pages/SupplierPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Order from "./pages/Order.jsx";
import Checkout from "./pages/Checkout.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
    return (
        <div className="overflow-x-hidden bg-gray-900">
            <Dashboard/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/suppliers" element={<SupplierPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/buy-checkout" element={<Checkout />} />
            </Routes>
            <div className="py-10">
              <Footer/>
            </div>
        </div>
    );
}

export default App;
