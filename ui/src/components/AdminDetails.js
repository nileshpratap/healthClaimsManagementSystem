import React from "react";
import { useAdminStore } from "../store";

function AdminDetails() {
  const adminData = useAdminStore((state) => state);
  return (
    <div className="max-w-md mx-auto bg-white p-4 lg:p-8 rounded-md shadow-md transform hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
      <h3 className="text-blue-900 font-bold text-xl p-3">Admin Profile</h3>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="UID"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          EID:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{adminData.EID}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="Name"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Name:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{adminData.Name}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="Email"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Email:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{adminData.Email}</p>
      </div>
    </div>
  );
}

export default AdminDetails;
