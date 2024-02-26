import React from "react";
import axios from "axios";
import { useAdminStore } from "../store";
import { useEffect, useRef, useState } from "react";

function AdminPolicyCard({ pid }) {
  const server = process.env.REACT_APP_SERVER_URL;
  const globalPolicies = useAdminStore((state) => state.Policies);
  const modifyPolicies = useAdminStore((state) => state.modifyPolicies);
  const Policy = globalPolicies.filter((p) => p.PID === pid)[0];
  const { Claims, PID, EID, StartDate, EndDate, PAmount, PBalance, Status } =
    Policy;

  const [toggleUpdateButton, setToggleUpdateButton] = useState(false);
  const [PolicyStatus, setPolicyStatus] = useState(Status);

  const createPolicyRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the CreatePolicy component
      if (
        createPolicyRef.current &&
        !createPolicyRef.current.contains(event.target)
      ) {
        setToggleUpdateButton(false);
        setPolicyStatus(Status);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Detach the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleStatusChange = (e) => {
    setPolicyStatus(e.target.value);
  };

  const handleUpdate = async () => {
    // Your logic for the update action
    try {
      const res = await axios.patch(server + "/policies/update?type=admin", {
        PID: pid,
        Status: PolicyStatus,
      });

      const updatedPolicy = res.data.updatedPolicy;
      console.log(updatedPolicy);
      modifyPolicies(updatedPolicy);
    } catch (error) {
      console.log(error);
    }
    //
    setToggleUpdateButton(false);
    console.log("Update clicked");
  };

  const handleCancel = () => {
    // Your logic for the cancel action
    setToggleUpdateButton(false);
  };

  return (
    <div className="w-1/2 lg:w-1/3 md:w-1/3 bg-white px-4 m-3 lg:p-5 rounded-md shadow-md transform hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
      <h4 className="text-blue-900 font-bold text-xl p-3">Policy Details</h4>
      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="PID"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Policy ID:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{PID}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="StartDate"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Start Date:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">
          {StartDate.split("T")[0]}
        </p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="EndDate"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          End Date:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">
          {EndDate.split("T")[0]}
        </p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="PolicyAmount"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Policy Amount:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{PAmount}</p>
      </div>

      <div className="mb-2 lg:mb-4">
        <label
          htmlFor="PBalance"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Policy Balance:
        </label>
        <p className="text-gray-800 text-xs lg:text-sm">{PBalance}</p>
      </div>

      <div ref={createPolicyRef} className="mb-2 lg:mb-4">
        <label
          htmlFor="Status"
          className="block text-gray-700 text-xs lg:text-sm font-bold mb-1 lg:mb-2"
        >
          Status:
        </label>
        {toggleUpdateButton === false ? (
          <p
            onClick={() => {
              if (Status === "Under Review") {
                setToggleUpdateButton(true);
              }
            }}
            className="text-gray-800 text-xs lg:text-sm hover:cursor-pointer mb-16"
          >
            {Status}
          </p>
        ) : (
          <div>
            <div className="flex items-center mb-2">
              <select
                value={PolicyStatus}
                onChange={(e) => {
                  handleStatusChange(e);
                }}
                className="bg-gray-100 p-1 rounded-md"
              >
                <option value="Under Review">Under Review</option>
                <option value="Accept">Accept</option>
                <option value="Decline">Decline</option>
              </select>
            </div>

            <button
              onClick={() => {
                handleCancel();
              }}
              className="bg-orange-200 mr-1 text-gray-900 px-2 py-1 rounded-md transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleUpdate();
              }}
              className="bg-blue-500 mx-1 text-gray-900 px-2 py-1 rounded-md transition-all mr-2"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPolicyCard;
