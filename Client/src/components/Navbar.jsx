import { IoMdMenu } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setIsSidebarOpen, setIsLoginOpen, setIsRegisterOpen }) {
    
  const navigate = useNavigate()
  const handleLoginButton = (event) => {
        event.stopPropagation()
        setIsLoginOpen(true);
      };
    const handleRegisterButton = (event) => {
        event.stopPropagation()
        setIsRegisterOpen(true);
      };
      const handleNav = (item) => {
        if(item === "Home"){
            navigate('/')
        }
        else if(item === "About Us"){
            navigate('/about-us')
        }
        else if(item === "Contact Us"){
            navigate('/contact-us')
        }
        
      }
  return (
    <header className="max-sm:w-[106%] w-full h-[5rem] bg-gray-900 flex items-center justify-between px-4 max-sm:pr-6 top-0 fixed z-30">
      <div className="flex items-center space-x-2">
        <div onClick={() => setIsSidebarOpen(true)} className="text-3xl font-bold cursor-pointer">
          <IoMdMenu />
        </div>
      </div>
      <div className="max-sm:hidden relative w-[30%]">
        <FiSearch className="absolute top-3 left-3 text-gray-500" />
        <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none w-full" />
      </div>
      <div className="max-lg:hidden w-[20%] flex items-center justify-between">
     { [
        "Home",
        "About Us",
        "Contact Us"
      ].map((item, index)=> <a onClick={()=>handleNav(item)} href="#" className="cursor-pointer" key={index} >{item}</a>) 
     }
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-4">
          <button className="px-5 py-1 border border-gray-400 hover:bg-gray-950 cursor-pointer rounded-lg transition" onClick={handleLoginButton}>
            Login
          </button>
          <button className="px-5 py-1 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition" onClick={handleRegisterButton}>
            Register
          </button>
        </div>
        <div className="max-sm:hidden lg:hidden max-sm:pr-2 flex items-center space-x-2">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-8 h-8 rounded-full" />
          <span>Tom Cook</span>
        </div>
      </div>
    </header>
  );
}