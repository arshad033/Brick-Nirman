import React from "react";
import SupplierCard from "../components/SupplierCard";

function SupplierPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-white">Supplier Directory</h1>
        <p className="text-blue-300 mt-3">Explore our trusted suppliers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <SupplierCard />
        <SupplierCard />
        <SupplierCard />
        <SupplierCard />
        <SupplierCard />
        <SupplierCard />
      </div>
    </div>
  );
}

export default SupplierPage;
