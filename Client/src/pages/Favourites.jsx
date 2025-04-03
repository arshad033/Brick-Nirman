import React, { useContext } from "react";
import SupplierCard from "../components/SupplierCard";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

function Favourites() {
    const {product}= useContext(AppContext)
  return (
    <>
        <div className=" bg-gradient-to-br from-gray-800 to-gray-900 py-10 px-4">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-white">Supplier Directory</h1>
                <p className="text-blue-300 mt-3">Explore our trusted suppliers</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {product?.map((product,index)=><ProductCard key={index} product={product} />)}
            </div>
        </div>
    </>

  );
}

export default Favourites;
