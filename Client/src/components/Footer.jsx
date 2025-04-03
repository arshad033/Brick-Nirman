import { FaFacebookF, FaGooglePlay, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosAppstore, logo } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 p-6 sm:p-10 pb-8">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between pb-6 gap-6">
        {/* Logo & Description */}
        <div className="md:w-[40%] text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-x-4">
            <div className="w-[8rem] h-[4rem]">
              <img className="w-full h-full object-cover" src={logo} alt="Brick Nirman" />
            </div>
            <h2 className="text-white font-bold text-xl mt-2 md:mt-0">
              BRICK <span className="text-red-500">NIRMAN</span>
            </h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Ready Brick, a leading online eCommerce platform in Uttar Pradesh, India, sells high-quality brick products at a competitive market price. This platform is meant for end customers to purchase, as well as for brick manufacturing retailers who would like to sell their quality products using our eCommerce platform.
          </p>
        </div>

        {/* Social & Mobile Apps */}
        <div className="md:w-[30%] text-center md:text-left">
          <h3 className="text-white font-semibold">FOLLOW US</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-3">
            <FaFacebookF className="text-blue-500 text-2xl" />
            <FaInstagram className="text-pink-500 text-2xl" />
            <FaYoutube className="text-red-500 text-2xl" />
          </div>
          <h3 className="text-white font-semibold mt-6">MOBILE APPS</h3>
          <div className="flex flex-wrap justify-center md:justify-start items-center space-x-4 mt-3">
            <div className="flex items-center space-x-2">
              <FaGooglePlay className="text-blue-500 text-2xl" />
              <span>Google Play</span>
            </div>
            <div className="flex items-center space-x-2">
              <IoIosAppstore className="text-pink-500 text-2xl" />
              <span>App Store</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 w-[90%] mx-auto mt-6 pt-4 border-t border-gray-700 text-center md:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold">QUICK LINK</h3>
          <ul className="mt-3 space-y-3">
            <li>Home</li>
            <li>Sellers</li>
            <li>Cart</li>
            <li>Favorites</li>
            <li>All Products</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold">CONTACTS</h3>
          <p className="font-bold mt-3">Address</p>
          <p>Uttar Pradesh</p>
          <p className="font-bold mt-3">Phone</p>
          <p>+91 73059 40607</p>
          <p className="font-bold mt-3">Email</p>
          <p>customer@bricknirman.in</p>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-white font-semibold">MY ACCOUNT</h3>
          <ul className="mt-3 space-y-3">
            <li>Login</li>
            <li>Order History</li>
            <li>My Wishlist</li>
            <li>Track Order</li>
          </ul>
        </div>

        {/* Seller Zone */}
        <div>
          <h3 className="text-white font-semibold">SELLER ZONE</h3>
          <ul className="mt-3 space-y-3">
            <li>
              Become A Seller <span className="text-yellow-500 font-bold">Apply Now</span>
            </li>
            <li>Login to Seller Panel</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center border-t border-gray-700 pt-5 text-sm">
        © 2024 Copyright Amiecart Technologies. All Rights Reserved.
      </div>
    </footer>
  );
}