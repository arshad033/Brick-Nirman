/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../utils/HandleAPIs";
import SupplierCard from "../components/SupplierCard";
import HomeSlider from "../components/HomeSlider";
import { getAllSuppliers } from "../utils/HandleSupplier";

function Home() {
  const { product, setProduct, suppliers, setSuppliers } =
    useContext(AppContext);
  const navigate = useNavigate();
  // console.log(suppliers);

  const handleViewMore = (val) => {
    if (val === "supplier") {
      navigate("/suppliers");
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    fetchProducts(setProduct);
    getAllSuppliers(setSuppliers);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-screen overflow-x-hidden text-white">
        <div className="w-[99%] h-[40rem] mt-2 rounded-lg">
          <HomeSlider />
        </div>
        <section className="w-full bg-gray-800 text-white py-16 text-center">
          <h2 className="text-3xl font-semibold">Welcome to Brick Nirman!</h2>
          <p className="max-w-2xl text-xl mx-auto mt-4 text-gray-300">
            If you are one of those who want some creative and innovative things
            in the interior or exterior parts of your project, then you are in
            the right place! With decades of experience and close working with
            architects, we have developed bricks that provide the right balance
            between sophisticated looks and long-term sustainability results.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-gray-600 pt-10">
            <div>
              <p className="text-3xl font-bold">25000+</p>
              <p className="text-gray-400">Projects Served</p>
            </div>
            <div>
              <p className="text-3xl font-bold">210+</p>
              <p className="text-gray-400">Variants</p>
            </div>
            <div>
              <p className="text-3xl font-bold">35</p>
              <p className="text-gray-400">Years of Brick Excellence</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1+</p>
              <p className="text-gray-400">Countries Reached</p>
            </div>
          </div>
        </section>
        <div className="py-10">
          <div className="">
            <div className="flex justify-between px-12">
              <h1 className="text-2xl font-bold">Best Selling</h1>
              <button
                onClick={() => handleViewMore(product)}
                className="text-md underline text-blue-500 cursor-pointer"
              >
                View More{" "}
              </button>
            </div>
            <div className=" flex items-center justify-center flex-wrap gap-5 mt-5">
              {product?.slice(7).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="">
            <div className="flex justify-between px-12">
              <h1 className="text-2xl font-bold">New Product</h1>
              <button
                onClick={() => handleViewMore()}
                className="text-md underline text-blue-500 cursor-pointer"
              >
                View More{" "}
              </button>
            </div>
            <div className=" flex items-center justify-center flex-wrap gap-5 mt-5">
              {product?.slice(-8).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="">
            <div className="flex justify-between px-12">
              <h1 className="text-2xl font-bold">Top Suppliers</h1>
              <button
                onClick={() => handleViewMore("supplier")}
                className="text-md underline text-blue-500 cursor-pointer"
              >
                View More{" "}
              </button>
            </div>
            <div className=" flex items-center justify-center flex-wrap gap-5 mt-10">
              {suppliers?.map((supplier, index) => (
                <SupplierCard key={index} supplier={supplier} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
