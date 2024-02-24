import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store";

const SimpleNavbar = () => {
  const user = useUserStore((state) => state.userDetails);
  const name = user.Name;
  const modified_name =
    name.charAt(0).toUpperCase() + name.split(" ")[0].substring(1);
  const navigate = useNavigate();

  const [isNameDropdownOpen, setNameDropdownOpen] = useState(false);
  const nameDropdownRef = useRef(null);

  const clearUser = useUserStore((state) => state.clearUser);

  const toggleNameDropdown = () => {
    setNameDropdownOpen(!isNameDropdownOpen);
  };

  const closeNameDropdown = (e) => {
    if (
      nameDropdownRef.current &&
      !nameDropdownRef.current.contains(e.target)
    ) {
      setNameDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeNameDropdown);

    return () => {
      document.removeEventListener("mousedown", closeNameDropdown);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/" className="text-white text-xl font-bold">
            HCMS
          </Link>
        </div>

        {/* Name with Dropdown */}
        <div className="relative" ref={nameDropdownRef}>
          <span
            className="text-white cursor-pointer"
            onClick={toggleNameDropdown}
          >
            <span className="font-extrabold text-2xl">
              {modified_name.substring(0, 1)}
            </span>
            <span>{modified_name.substring(1)}</span>
            <span className="text-lg">&#8629;</span>
          </span>

          {isNameDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-700 p-2 rounded shadow">
              <button
                onClick={() => {
                  // Perform logout action here
                  clearUser();
                  navigate("/");
                }}
                className="block text-white hover:bg-gray-600 py-1 px-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
