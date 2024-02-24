import React from "react";
import { useUserStore } from "../store";

const UserProfileCard = () => {
  const userData = useUserStore((state) => state.userDetails);
  const calculateAge = (dob) => {
    // Logic to calculate age based on DOB
    // Assuming dob is in the format 'YYYY-MM-DD'
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age based on the birthdate in the current year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 lg:p-8 rounded-md shadow-md transform hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
      <h1 className="text-blue-900 font-bold text-3xl p-3">User Details</h1>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="UID"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          AAdhar Number:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{userData.UID}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="Name"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Name:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{userData.Name}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="Email"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Email:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{userData.Email}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="HealthCondition"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Health Condition:
        </label>
        <div className="relative">
          <div
            className="h-1 lg:h-2 bg-blue-200 rounded-md overflow-hidden"
            style={{ width: `${(userData.HealthCondition / 10) * 100}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-800 text-xs lg:text-sm">
              {userData.HealthCondition}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="DOB"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          DOB:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{userData.DOBdate}</p>
      </div>

      <div>
        <label
          htmlFor="Age"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Age:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">
          {calculateAge(userData.DOB)}
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
