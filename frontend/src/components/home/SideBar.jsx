import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaCog, FaBuilding, FaUserFriends, FaTasks, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-full w-50 flex-none flex flex-col">
      <div className="p-12 "> {/* Sidebar header */}
        <h2 className="text-xl font-bold">AdminiOrga</h2>
      </div>
      <ul className="flex-1">
        <li>
          <Link to="/role" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaUserAlt className="mr-2" />
            Roles
          </Link>
        </li>
        <li>
          <Link to="/function" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaCog className="mr-2" />
            Functions
          </Link>
        </li>
        <li>
          <Link to="/department" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaBuilding className="mr-2" />
            Departments
          </Link>
        </li>
        <li>
          <Link to="/employee" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaUserFriends className="mr-2" />
            Employees
          </Link>
        </li>
        <li>
          <Link to="/employee/demandes" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaTasks className="mr-2" />
            Employee Requests
          </Link>
        </li>
        <li>
          <Link to="/hr/demandes" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaClipboardList className="mr-2" />
            HR Requests
          </Link>
        </li>
        <li>
          <Link to="/chef_depart/demandes" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaSignOutAlt className="mr-2" />
            Department Chief Requests
          </Link>
        </li>
        <li>
          <Link to="/chef_depart/demandes" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaSignOutAlt className="mr-2" />
            Se deconnecter
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
