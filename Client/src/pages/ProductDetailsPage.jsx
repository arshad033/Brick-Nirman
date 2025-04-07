import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { fetchProductDetails, fetchProductsBySupplierId } from "../utils/HandleProductAPIs";
import { getSupplierById } from "../utils/HandleSupplier";

function ProductDetailsPage() {
  const { id } = useParams(); // ✅ useParams inside the component
  const navigate = useNavigate(); // ✅ navigate for going back
  const { productById, setProductById , setSuppliers,setSupplierProducts} = useContext(AppContext);
 
  const handleProfile = () => {
    getSupplierById(productById?.supplier?.supplierId,setSuppliers);
    fetchProductsBySupplierId(productById?.supplier?.supplierId, setSupplierProducts);
    navigate(`/supplier-profile/${productById?.supplier?.supplierId}`)
  }
  console.log("this is the productById details page: ", productById?.product);
  console.log(productById);
 
  useEffect(() => {
    fetchProductDetails(id, setProductById);
  }, [id, setProductById]);


  if (!productById) {
    return (
      <div className="text-center text-white mt-10">
        Product data not found. Please go back and try again.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="w-full md:w-[40%]">
          <img
            src={productById?.product.image}
            alt={productById?.product.name}
            className="w-full h-[400px] object-cover rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-[60%] flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-orange-400">
            {productById?.product.name}
          </h1>
          <p className="text-lg text-gray-300">{productById?.product.description}</p>

          <div className="grid grid-cols-2 gap-y-2 text-gray-400">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {productById?.product.category}
            </p>
            <p>
              <span className="font-semibold">Grade:</span> {productById?.product.grade}
            </p>
            <p>
              <span className="font-semibold">Size:</span> {productById?.product.size}
            </p>
            <p>
              <span className="font-semibold">Supplier:</span>{" "}
              {productById?.supplier?.name}
            </p>
            <p>
              <span className="font-semibold">Available:</span>{" "}
              {productById?.product.quantityAvailable}
            </p>
          </div>

          <p className="text-2xl font-bold text-green-400 mt-4">
            ₹ {productById?.product.price}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-md transition">
              Buy Now
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-6 py-3 rounded-md transition"
              onClick={() =>
                handleProfile()
              }
            >
              View Supplier Profile
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-gray-200 underline"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
