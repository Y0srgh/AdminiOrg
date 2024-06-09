import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaCog, FaBuilding, FaUserFriends, FaTasks, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { FiClipboard } from 'react-icons/fi';
import { PiPasswordDuotone } from "react-icons/pi";

const Sidebar = () => {
  const role = localStorage.getItem('userRole');
  if (!role) {
    localStorage.clear();
    window.location.href = "/login";
  }
  console.log("role mel sidebar", role);
  return (
    <div className=" sidebar bg-gray-800 text-white h-full w-49 flex-none flex flex-col top-0 left-0">
      <div className="p-12 "> {/* Sidebar header */}
        <h2 className="text-xl font-bold">AdminiOrga</h2>
      </div>
      <ul className="flex-1">
        {(role === "admin") && (<><li>
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
          </li> <li>
            <Link to="/hr/demandes" className="flex items-center mb-5 p-4 hover:bg-gray-700">
              <FaClipboardList className="mr-2" />
              HR Requests
            </Link>
          </li></>)}

        {(role === "employé" || role === "depChief") && (<>
        <li>
          <Link to="/employee/demandes" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaTasks className="mr-2" />
            Vos demandes
          </Link>
        </li>
        <li>
          <Link to="/employee/modifier-mot-de-passe" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <PiPasswordDuotone className="mr-2" />
            Mise à jour
          </Link>
        </li>
        </>)}


        {role === "depChief" && (<>
          <li>
            <Link to="/chef_depart/demandes" className="flex items-center mb-5 p-4 hover:bg-gray-700">
              <FiClipboard className="mr-2" />
              Department Chief Requests
            </Link>
          </li></>)}

        <li>
          <Link to="/logout" className="flex items-center mb-5 p-4 hover:bg-gray-700">
            <FaSignOutAlt className="mr-2" />
            Se deconnecter
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
