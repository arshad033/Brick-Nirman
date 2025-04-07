import React, { useContext, useEffect, useRef, useCallback } from "react";
import { Pencil, BadgeCheck } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { getSupplierById, updateSupplier } from "../utils/HandleSupplier";
import { fetchProductsBySupplierId } from "../utils/HandleProductAPIs";

const SupplierProfile = () => {
  const {
    supplierProducts,
    suppliers,
    setSuppliers,
    setCheckSuppliers,
    setSupplierProducts,
  } = useContext(AppContext);

  const { id } = useParams();
  const fileInputRef = useRef(null);

  // ✅ Fetch supplier only when ID changes
  useEffect(() => {
    getSupplierById(id, setSuppliers, setCheckSuppliers);
  }, [id, setCheckSuppliers, setSuppliers]);

  // ✅ Fetch products only when ID changes
  useEffect(() => {
    fetchProductsBySupplierId(id, setSupplierProducts);
  }, [id, setSupplierProducts]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        updateSupplier({ image: file }, setSuppliers);
        e.target.value = null; // 🔁 Reset input after selection
      }
    },
    [setSuppliers]
  );
  

  return (
    <div className="w-screen p-4 text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <img
            src={
              suppliers?.[0]?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Supplier Profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <h1>{suppliers?.[0]?.name}</h1>
              {suppliers?.[0]?.verified ? (
                <BadgeCheck className="text-blue-500 w-5 h-5" />
              ) : (
                <span className="text-xs text-gray-500">
                  ⚠️ Not Verified
                </span>
              )}
            </div>
            <p className="text-gray-200">📞 {suppliers?.[0]?.phone}</p>
            <p className="text-gray-200">✉️ {suppliers?.[0]?.email}</p>
            <p className="text-gray-200">
              <b>Survice Area : </b>
              {suppliers?.[0]?.serviceArea?.map((area, index) => (
                <span key={index}>{area + ", "}</span>
              ))}
            </p>
            <p className="text-gray-200">
              <b>Address : </b>
              {suppliers?.[0]?.address?.zip}, {suppliers?.[0]?.address?.street},{" "}
              {suppliers?.[0]?.address?.city}, {suppliers?.[0]?.address?.state},{" "}
              {suppliers?.[0]?.address?.country}
            </p>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="flex items-center gap-2 text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm"
        >
          <Pencil className="w-4 h-4" /> Edit Profile
        </button>

        {/* Hidden input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* Posts Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Posts</h2>
        <div className="flex flex-wrap max-lg:justify-center gap-4">
          {supplierProducts?.map((post, index) => (
            <ProductCard key={index} product={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
