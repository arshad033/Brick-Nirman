import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import HomeSlider from "./HomeSlider";
import Login from "./Login";
import UserRegistration from "./UserRegistration";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sideNavSelect, setSideNavSelect] = useState("Home");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSideNav = (value) => {
    setSideNavSelect(value);
  };
  const [PopUp, setPopUp] = useState(true);
  const handlePopUp = (event) => {
    event.stopPropagation();
    setPopUp(false);
  };

  useEffect(() => {
    document.body.style.overflow =
      isLoginOpen || isRegisterOpen ? "hidden" : "auto";
    if (isLoginOpen || isRegisterOpen) {
      if (isLoginOpen || isRegisterOpen) {
        document.body.addEventListener("click", function () {
          event.stopPropagation();
          setIsLoginOpen(false);
          setIsRegisterOpen(false);
        });
      }
    }
  }, [isLoginOpen, isRegisterOpen]);

  return (
    <div className="w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sideNavSelect={sideNavSelect}
        handleSideNav={handleSideNav}
      />
      <div className="max-w-screen text-white z-10">
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          setIsRegisterOpen={setIsRegisterOpen}
          setIsLoginOpen={setIsLoginOpen}
        />
      </div>
      {isLoginOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#22222282] flex justify-center items-center z-50">
          <div
            onClick={handlePopUp}
            className="bg-gray-800 shadow-lg relative w-[80%] max-w-md rounded-2xl"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900 text-xl z-40"
              onClick={() => setIsLoginOpen(false)}
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}
      {isRegisterOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#22222282] flex justify-center items-center z-50`}
        >
          <div
            onClick={handlePopUp}
            className="bg-gray-800 shadow-lg relative w-[80%] max-w-md rounded-2xl"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900 text-xl z-40"
              onClick={() => setIsRegisterOpen(false)}
            >
              ✖
            </button>
            <UserRegistration />
          </div>
        </div>
      )}
    </div>
  );
}
