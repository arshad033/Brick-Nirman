import { Star } from "lucide-react";
import { Heart } from "lucide-react";
import { useState } from "react";
import {
  RemoveFavProducts,
  AddFavProducts,
  checkFav,
} from "../utils/HandleProductAPIs";
import { useEffect } from "react";

function ProductCard({ product }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [hover, setHover] = useState(false);
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
  useEffect(() => {
    checkFav(product._id, setIsFavorited);
  }, [setIsFavorited]);
  const toggleFavorite = () => {
    console.log("clicked");
    isFavorited ? RemoveFavProducts(product._id) : AddFavProducts(product._id);
    setIsFavorited(!isFavorited);
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-[20rem] h-[22rem] bg-gray-800 rounded-2xl border border-gray-500 shadow-lg overflow-hidden p-4"
    >
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 p-1.5 rounded-full z-10"
      >
        <Heart
          size={22}
          className={
            isFavorited
              ? "text-red-500 fill-red-500"
              : "text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
          }
        />
      </button>

      <div
        className={`${
          hover ? `scale-[1]` : `scale-[0.85]`
        } w-full h-[63%] flex justify-center items-center transition-all duration-500`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-[80%] h-full object-cover rounded-lg"
        />
      </div>

      <div className="p-2">
        <div className="flex items-center justify-between py-1">
          <h2 className="text-xl font-bold text-orange-300">{product.name}</h2>
          <span className="text-lg font-semibold pr-2">
            Size: {product.size}
          </span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-lg font-semibold">Rs.{product.price}</span>
          <div className="flex items-center ">
            {renderRatingStars(product.rating)}
            <span className="ml-2 text-white text-sm">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
