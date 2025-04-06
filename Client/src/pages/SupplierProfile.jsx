import React, { useContext } from "react";
import { Pencil, BadgeCheck } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const SupplierProfile = () => {
  const supplier = {
    name: "BrickMaster Co.",
    isVerified: true,
    address: "123 Brick Lane, New York, NY",
    rating: 4.7,
    contact: "+1 555-123-4567",
    email: "support@brickmaster.com",
    profileImage: "https://i.pravatar.cc/150?img=12", // placeholder
  };
  const {product}=useContext(AppContext)

  return (
    <div className="w-screen  p-4 text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <img
            src={supplier.profileImage}
            alt="Supplier Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <h1>{supplier.name}</h1>
              {supplier.isVerified && (
                <BadgeCheck className="text-blue-500 w-5 h-5" />
              )}
            </div>
            <p className="text-gray-200">{supplier.address}</p>
            <p className="text-gray-200">📞 {supplier.contact}</p>
            <p className="text-gray-200">✉️ {supplier.email}</p>
            <p className="text-yellow-500">⭐ {supplier.rating} / 5</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm">
          <Pencil className="w-4 h-4 " /> Edit Profile
        </button>
      </div>

      {/* Posts Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Posts</h2>
        <div className="flex flex-wrap max-lg:justify-center gap-4">
          {product?.map((post, index) => (
            <ProductCard key={index} product={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
