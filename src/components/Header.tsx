import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNavbar: React.FC = () => {
  return (
    <header className="bg-pink-400 text-white py-4 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center px-4 relative">
      
        <div className="text-2xl font-bold absolute left-4">
          Chibi Blog
        </div>

       
        <ul className="flex space-x-4 justify-center w-full">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-gray-300 underline" : "hover:text-gray-400"
              }
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "text-gray-300 underline" : "hover:text-gray-400"
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-post"
              className={({ isActive }) =>
                isActive ? "text-gray-300 underline" : "hover:text-gray-400"
              }
            >
              Create Post
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNavbar;
