/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { apiUrl } from '../utils/constant';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Home() {
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/get-all-products`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setProduct(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const { product, setProduct } = useContext(AppContext);
  console.log(product);
  const navigate = useNavigate()
  const handleViewMore = () => {
    navigate('/products')
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <>       
        <div className="w-screen overflow-x-hidden text-white">
          <Dashboard/>
          <section className="w-full bg-gray-800 text-white py-16 text-center">
            <h2 className="text-3xl font-semibold">Welcome to Jay Jalaram Brick Works!</h2>
            <p className="max-w-2xl text-xl mx-auto mt-4 text-gray-300">
              If you are one of those who want some creative and innovative things in the
              interior or exterior parts of your project, then you are in the right place!
              With decades of experience and close working with architects, we have
              developed bricks that provide the right balance between sophisticated looks
              and long-term sustainability results.
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
                <p className="text-3xl font-bold">46+</p>
                <p className="text-gray-400">Countries Reached</p>
              </div>
            </div>
          </section>
          <div className="py-10">
            <div className="">
              <div className="flex justify-between px-12">
                <h1 className="text-2xl font-bold">Best Selling</h1>
                <button className="text-md underline text-blue-500 cursor-pointer">View More </button>
              </div>
              <div className=" flex items-center justify-center flex-wrap gap-5 mt-5">
                {product?.map((product,index) => (
                  <ProductCard key={index} product={product} />)
                  )
                }
              </div>
            </div>
          </div>
          <div className="py-10">
            <div className="">
              <div className="flex justify-between px-12">
                <h1 className="text-2xl font-bold">New Product</h1>
                <button onClick={()=>handleViewMore()} className="text-md underline text-blue-500 cursor-pointer">View More </button>
              </div>
              <div className=" flex items-center justify-center flex-wrap gap-5 mt-5">
                {product?.map((product,index) => (
                  <ProductCard key={index} product={product} />)
                  )
                }
              </div>
            </div>
          </div>
          <div className="py-10">
            <Footer/>
          </div>
        </div>
    </>
  )
}

export default Home