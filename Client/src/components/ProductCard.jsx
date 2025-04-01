 function ProductCard({ product }) {
    return (
          <div className="max-w-sm bg-white rounded-2xl border-1 border-gray-700 shadow-lg overflow-hidden">
           
           <div className="w-full flex justify-center items-center">
            
            <img
                src={product.image} // Replace with actual product image URL
                alt={product.name}
                className="w-[80%] h-64 object-cover"
              />
            </div> 
            <div className="p-5 border-t-[1px]">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <div className="flex items-center justify-between mt-4">
                <span className="text-red-600 text-lg font-bold">${product.price}</span>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      };
      
 export default ProductCard;
      