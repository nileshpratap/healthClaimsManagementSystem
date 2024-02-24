import React from "react";

const PolicyCard = ({ policyData }) => {
  const calculateDuration = (start, end) => {
    // Logic to calculate the duration between start and end dates
    // You can customize this based on your specific requirements
    return "Custom Duration";
  };

  return (
    <div className="max-w-sm bg-white p-4 m-3 lg:p-8 rounded-md shadow-md transform hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="PID"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Policy ID:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{policyData.PID}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="StartDate"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Start Date:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">
          {policyData.StartDate}
        </p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="EndDate"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          End Date:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{policyData.EndDate}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="PolicyAmount"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Policy Amount:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">
          {policyData.PolicyAmount}
        </p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="PBalance"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Policy Balance:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">
          {policyData.PBalance}
        </p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="Status"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Status:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{policyData.Status}</p>
      </div>
    </div>
  );
};

export default PolicyCard;
