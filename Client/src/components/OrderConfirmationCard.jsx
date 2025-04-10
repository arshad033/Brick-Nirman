import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmationCard = ({ orderId, totalAmount, deliveryAddress }) => {
  return (
    <div className="max-w-md mx-auto mt-16 bg-gray-800 text-white p-8 rounded-2xl shadow-xl border border-gray-700">
      {/* Big Check Icon */}
      <div className="flex justify-center mb-6">
        <FaCheckCircle className="text-green-400 text-6xl animate-pulse" />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-4 text-green-400">
        Order Confirmed!
      </h2>
      <p className="text-center text-gray-300 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {/* Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationCard;
