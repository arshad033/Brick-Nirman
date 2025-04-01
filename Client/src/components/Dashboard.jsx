import { useState } from "react";
import { FaHome, FaUsers, FaFolder, FaCalendar, FaFile, FaChartBar, FaCog, FaBars } from "react-icons/fa";
import { FiSearch, FiBell } from "react-icons/fi";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-gray-900 text-white flex flex-col p-5 overflow-hidden transition-all duration-300 fixed md:relative h-full`}
      >
        <div className="flex items-center space-x-2 pb-5">
          <div className="text-purple-400 text-2xl font-bold">\u223F</div>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li className="bg-gray-800 p-3 rounded-md flex items-center space-x-3">
              <FaHome /> <span>Dashboard</span>
            </li>
            <li className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md">
              <FaUsers /> <span>Team</span>
            </li>
            <li className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md">
              <FaFolder /> <span>Projects</span>
            </li>
            <li className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md">
              <FaCalendar /> <span>Calendar</span>
            </li>
            <li className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md">
              <FaFile /> <span>Documents</span>
            </li>
            <li className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md">
              <FaChartBar /> <span>Reports</span>
            </li>
          </ul>
        </nav>
        <div>
          <h3 className="text-gray-400 text-sm pb-2">Your teams</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-800 rounded-md">Heroicons</li>
            <li className="p-2 bg-gray-800 rounded-md">Tailwind Labs</li>
            <li className="p-2 bg-gray-800 rounded-md">Workcation</li>
          </ul>
        </div>
        <div className="mt-auto pt-5">
          <div className="p-3 flex items-center space-x-3 hover:bg-gray-800 rounded-md">
            <FaCog /> <span>Settings</span>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 ml-auto transition-all duration-300 w-full md:w-auto">
        <header className="flex items-center justify-between pb-5">
          <button
            className="text-gray-600 text-2xl md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
          <div className="relative w-full max-w-xs">
            <FiSearch className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-gray-600 text-xl" />
            <div className="flex items-center space-x-2">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">Tom Cook</span>
            </div>
          </div>
        </header>
        <div className="border border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center bg-gray-50">
          Content Area
        </div>
      </div>
    </div>
  );
}
