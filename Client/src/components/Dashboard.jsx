import { useState } from "react";
import { FaHome, FaUsers, FaFolder, FaCalendar, FaFile, FaChartBar, FaCog, FaBars, FaHeart } from "react-icons/fa";
import { FiSearch, FiBell } from "react-icons/fi";
import HomeSlider from "./HomeSlider";
import { IoMdMenu, IoCloseSharp, logo, FaCartShopping } from "../assets/assets.js";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sideNavSelect, setSideNavSelect] = useState("Home");
 const handleSideNav = (value)=>{
    setSideNavSelect(value)
 
 }
  return (
    <div className="w-full">
      {/* Sidebar */}
     {
            <aside className={`${isSidebarOpen ? `left-0` :`-left-[100%]`} bg-gray-900 w-[16rem] py-5 text-white flex flex-col overflow-hidden transition-all duration-500 fixed h-full z-20`}>
                <div className="flex items-center justify-between px-5">
                   <div className="w-[40%] h-[3rem]"> <img className="w-full h-full scale-[1.5] object-cover" src={logo} alt="" /></div>
                   <div onClick={()=>setIsSidebarOpen(false)} className="text-3xl font-bold cursor-pointer"><IoCloseSharp/></div>
                </div>
                <nav className="flex-1 p-5">
                <ul className="space-y-2">
                    <li  onClick={()=>handleSideNav("Home")} className={`${sideNavSelect == "Home" && "bg-gray-800"} hover:bg-gray-800 p-3 rounded-md flex items-center space-x-3`}>
                    <FaHome /> <span>Home</span>
                    </li>
                    <li onClick={()=>handleSideNav("Supplier")} className={`${sideNavSelect == "Supplier" && "bg-gray-800"} p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md`}>
                    <FaUsers /> <span>Supplier</span>
                    </li>
                    <li onClick={()=>handleSideNav("Favorites")} className={`${sideNavSelect == "Favorites" && "bg-gray-800"} p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md`}>
                    <FaHeart /> <span>Favorites</span>
                    </li>
                    <li onClick={()=>handleSideNav("Carts")} className={`${sideNavSelect == "Carts" && "bg-gray-800"} p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md`}>
                    <FaCartShopping /> <span>Carts</span>
                    </li>
                    <li onClick={()=>handleSideNav("Orders")} className={`${sideNavSelect == "Orders" && "bg-gray-800"} p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md`}>
                    <FaFile /> <span>Orders</span>
                    </li>
                </ul>
                </nav>
                <div className="w-full border-t-[1px] px-5 border-gray-700">
                    <div className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md">
                       <span>Lagout</span>
                    </div>
                </div>
            </aside>
     }
      
      {/* Main Content */}
      <div className="max-w-screen text-white z-10">
        <header className="w-full h-[5rem] flex items-center justify-between px-4 pr-6">
          <div className="flex items-center space-x-2 ">
            <div onClick={()=>setIsSidebarOpen(true)}  className="text-3xl font-bold cursor-pointer"><IoMdMenu/></div>
          </div>
          
          <div className="relative w-[30%]">
            <FiSearch className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none w-full"
            />
          </div>
          <div className="w-[20%] flex items-center justify-between ">
            <a href="">Home</a>
            <a href="">About Us</a>
            <a href="">Contact Us</a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
                <button className="px-5 py-1 border border-gray-400 hover:bg-gray-950 cursor-pointer rounded-lg transition">
                    Login
                </button>
                <button className="px-5 py-1 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition">
                    Register
                </button>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="">Tom Cook</span>
            </div>
          </div>
        </header>
        <div className="w-[99%] h-[40rem] mt-2 rounded-lg ">
          <HomeSlider/>
        </div>
      </div>
    </div>
  );
}
