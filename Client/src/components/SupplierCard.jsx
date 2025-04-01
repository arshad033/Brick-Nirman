import React from "react";
import { Star } from "lucide-react";

const SupplierCard = () => {
  const supplier = {
    name: "TechSupply Solutions",
    rating: 4.5,
    joinedDate: "March 15, 2023",
    serviceArea: "North America, Europe",
    email: "contact@techsupplysolutions.com",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0JxIRhcbqNMoP0-muq2qizRxRVWRQ1j7gA&s",
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="text-yellow-400 w-5 h-5" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative w-5 h-5">
          <Star className="text-gray-400 w-5 h-5 absolute" />
          <div className="absolute overflow-hidden w-1/2 h-5">
            <Star className="text-yellow-400 w-5 h-5" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-400 w-5 h-5" />);
    }

    return stars;
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl shadow-xl p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={supplier.profilePic}
          alt={`${supplier.name} profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">
            {supplier.name}
          </h2>
          <div className="flex items-center mb-4">
            {renderRatingStars(supplier.rating)}
            <span className="ml-2 text-white text-sm">{supplier.rating}</span>
          </div>
          <div className="space-y-2 text-gray-300">
            <div>
              <strong>Joined:</strong> {supplier.joinedDate}
            </div>
            <div>
              <strong>Service Area:</strong> {supplier.serviceArea}
            </div>
            <div>
              <strong>Contact:</strong>{" "}
              <a
                href={`mailto:${supplier.email}`}
                className="text-blue-400 hover:underline"
              >
                {supplier.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-transform transform hover:scale-105">
          View Products
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;
