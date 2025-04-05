import { Heart } from "lucide-react";
import { useState } from "react";
import { RemoveFavProducts, AddFavProducts } from "../utils/HandleProductAPIs";

function FavouriteCard({ product }) {
  const [isFavorited, setIsFavorited] = useState(true); // default to true since it's on favorites page

  const toggleFavorite = () => {
    isFavorited
      ? RemoveFavProducts(product.productId._id)
      : AddFavProducts(product.productId._id);
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      className={`w-full max-w-3xl h-[10rem] border-gray-600 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl border shadow-md flex items-center p-4 space-x-4 transition-transform hover:scale-[1.01]`}
    >
      <div className="w-24 h-24 flex-shrink-0 relative">
        <img
          src={product.productId.image}
          alt={product.productId.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          onClick={() => {
            toggleFavorite();
          }}
          className="absolute top-1 right-1 bg-white/10 hover:bg-white/20 p-1 rounded-full"
        >
          <Heart
            size={20}
            className={
              isFavorited
                ? "text-red-500 fill-red-500"
                : "text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]"
            }
          />
        </button>
      </div>

      <div className="flex flex-col justify-between w-full h-full py-1">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-orange-300">
            {product.productId.name}
          </h2>
          <span className="text-sm font-semibold text-gray-300">
            Size: {product.productId.size}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-base font-semibold text-white">
            Rs. {product.productId.price}
          </span>
        </div>

        <div className="flex justify-end mt-auto">
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavouriteCard;
