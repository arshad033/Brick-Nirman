import React from "react";

const AboutUs = () => {
  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
          {/* Text Content */}
          <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
            {/* Heading and Paragraph */}
            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
              <h2 className="text-white text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                Delivering Quality Bricks through Verified Suppliers
              </h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                At Brick Nirman, we are committed to providing top-quality
                bricks from our network of verified suppliers. Our platform
                ensures reliable sourcing and seamless purchasing, making it
                easier for businesses and individuals to get the best materials
                for their construction needs.
              </p>
            </div>

            {/* Button */}
            <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] justify-center items-center flex">
              <span className="px-1.5 text-white text-sm font-medium leading-6">
                Get Started
              </span>
            </button>
          </div>

          {/* Image */}
          <img
            className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
            src="https://benjamin-allen.co.uk/wp-content/uploads/2023/12/Brick-built-house-AS-502792533.jpg"
            alt="About Us"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
