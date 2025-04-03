import React from "react";
import { AppContext } from "./context/AppContext";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import UserRegistration from "./components/UserRegistration";
import SupplierRegistration from "./components/SupplierRegistration";
import SupplierCard from "./components/SupplierCard";
import SupplierPage from "./pages/SupplierPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="overflow-x-hidden bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
