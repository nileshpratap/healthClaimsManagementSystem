import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/" className="text-white text-xl font-bold">
              HCMS
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-gray-700 mb-4">Oops! Page not found.</p>
          <p className="text-gray-500 mb-8">
            The page you are looking for might be in another dimension.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            onClick={() => navigate("/")}
          >
            Go to our Home Page
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
