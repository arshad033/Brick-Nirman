import { Star } from "lucide-react";
import { useState } from "react";
function ProductCard({ product }) {
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

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-[20rem] h-[22rem] bg-white rounded-2xl border-1 border-gray-700 shadow-lg overflow-hidden"
    >
      <div
        className={`${
          hover ? `scale-[0.95] ` : `scale-[0.8]`
        } w-full h-[63%] flex justify-center items-center  transition-all duration-500`}
      >
        <img
          src={product.image} // Replace with actual product image URL
          alt={product.name}
          className="w-[80%] h-full object-cover rounded-lg"
        />
      </div>
      <div className="p-2">
        <div className=" flex items-center justify-between py-1">
          <h2 className="text-black text-xl font-bold">{product.name}</h2>
          <span className="text-black text-lg font-semibold pr-2">
            Size: {product.size}
          </span>
        </div>
        <div className=" flex items-center justify-between py-1">
          <span className="text-black text-lg font-semibold">
            Rs.{product.price}
          </span>
          <div className="flex items-center ">
            {renderRatingStars(product.rating)}
            <span className="ml-2 text-white text-sm">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
