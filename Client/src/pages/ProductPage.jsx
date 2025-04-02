import React, { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const { product } = useContext(AppContext);

  const filteredProducts = product
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "Newest"
        ? new Date(b.dateAdded) - new Date(a.dateAdded)
        : new Date(a.dateAdded) - new Date(b.dateAdded)
    );

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Page</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-full max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg border-2 border-gray-600 focus:border-blue-500 bg-gray-800 text-white w-full sm:w-2/3 md:w-1/3"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 rounded-lg border-2 border-gray-600 bg-gray-800 text-white w-full sm:w-1/3 md:w-1/6"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
