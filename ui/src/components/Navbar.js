// Navbar.js

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLinksDropdownOpen, setLinksDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setAuthDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleLinksDropdown = () => {
    setLinksDropdownOpen(!isLinksDropdownOpen);
    // Close the auth dropdown when links dropdown is opened
    setAuthDropdownOpen(false);
  };

  const toggleAuthDropdown = () => {
    setAuthDropdownOpen(!isAuthDropdownOpen);
    // Close the links dropdown when auth dropdown is opened
    setLinksDropdownOpen(false);
  };

  const closeDropdowns = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setLinksDropdownOpen(false);
      setAuthDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdowns);

    return () => {
      document.removeEventListener("mousedown", closeDropdowns);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Responsive Button for Links */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleLinksDropdown}>
            Menu
          </button>

          {isLinksDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-700 p-2 rounded shadow">
              <NavLink
                to="/products"
                className="block text-white hover:bg-gray-600 py-1 px-2"
                activeclassname="font-bold"
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className="block text-white hover:bg-gray-600 py-1 px-2"
                activeclassname="font-bold"
              >
                About us
              </NavLink>
              <NavLink
                to="/contact"
                className="block text-white hover:bg-gray-600 py-1 px-2"
                activeclassname="font-bold"
              >
                Contact us
              </NavLink>
            </div>
          )}
        </div>

        {/* Logo */}
        <div>
          <Link to="/" className="text-white text-xl font-bold">
            HCMS
          </Link>
        </div>

        {/* Responsive Button for Auth */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleAuthDropdown}>
            Login/Register
          </button>

          {isAuthDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-700 p-2 rounded shadow">
              <button
                onClick={() => navigate("/user/login")}
                className="block text-white hover:bg-gray-600 py-1 px-2"
              >
                User
              </button>
              <button
                onClick={() => navigate("/admin/login")}
                className="block text-white hover:bg-gray-600 py-1 px-2"
              >
                Admin
              </button>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-5">
          <NavLink
            to="/products"
            className="text-white"
            activeclassname="border-b-2 border-white"
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className="text-white"
            activeclassname="border-b-2 border-white"
          >
            About us
          </NavLink>
          <NavLink
            to="/contact"
            className="text-white"
            activeclassname="border-b-2 border-white"
          >
            Contact us
          </NavLink>
        </div>

        {/* Login/Register Button with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="hidden md:block text-white"
            onClick={toggleAuthDropdown}
          >
            Login/Register
          </button>

          {isAuthDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-700 p-2 rounded shadow">
              <button
                onClick={() => navigate("/user/login")}
                className="block text-white hover:bg-gray-600 py-1 px-2"
              >
                User
              </button>
              <button
                onClick={() => navigate("/admin/login")}
                className="block text-white hover:bg-gray-600 py-1 px-2"
              >
                Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
