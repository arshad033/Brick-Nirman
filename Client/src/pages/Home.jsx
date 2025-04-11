/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import SupplierCard from "../components/SupplierCard";
import HomeSlider from "../components/HomeSlider";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../utils/HandleAPIs";
import { getAllSuppliers } from "../utils/HandleSupplier";

function Section({ title, onViewMore, children }) {
  return (
    <div className="py-10">
      <div className="">
        <div className="flex justify-between px-6 md:px-12">
          <h1 className="text-2xl font-bold">{title}</h1>
          <button
            onClick={onViewMore}
            aria-label={`View more ${title}`}
            className="text-md underline text-blue-500 cursor-pointer"
          >
            View More
          </button>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-5 mt-5">
          {children}
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { product, setProduct, suppliers, setSuppliers } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleViewMore = (val) => {
    if (val === "supplier") {
      navigate("/suppliers");
    } else {
      navigate("/products");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, supplierData] = await Promise.all([
          fetchProducts(),
          getAllSuppliers(),
        ]);
        setProduct(productData);
        setSuppliers(supplierData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full overflow-x-hidden text-white">
      <div className="w-full max-w-screen-xl h-[40rem] mt-2 rounded-lg mx-auto">
        <HomeSlider />
      </div>

      <section className="w-full bg-gray-800 text-white py-16 text-center">
        <h2 className="text-3xl font-semibold">Welcome to Brick Nirman!</h2>
        <p className="max-w-2xl text-xl mx-auto mt-4 text-gray-300">
          If you are one of those who want some creative and innovative things
          in the interior or exterior parts of your project, then you are in the
          right place! With decades of experience and close working with
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

      <Section
        title="Best Selling"
        onViewMore={() => handleViewMore("product")}
      >
        {product?.map((p) => (
          <ProductCard key={p._id || p.id} product={p} />
        ))}
      </Section>

      <Section title="New Product" onViewMore={() => handleViewMore("product")}>
        {product?.slice(-8).map((p) => (
          <ProductCard key={p._id || p.id} product={p} />
        ))}
      </Section>

      <Section
        title="Top Suppliers"
        onViewMore={() => handleViewMore("supplier")}
      >
        {suppliers?.map((s) => (
          <SupplierCard key={s._id || s.id} supplier={s} />
        ))}
      </Section>
    </div>
  );
}

export default Home;
