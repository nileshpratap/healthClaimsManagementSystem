// CreatePolicy.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUserStore } from "../store";
import { isNumber } from "lodash";

const CreateClaim = ({ policyData }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const createPolicyRef = useRef();

  const server = process.env.REACT_APP_SERVER_URL;

  const addClaim = useUserStore((state) => state.addClaim);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the CreatePolicy component
      if (
        createPolicyRef.current &&
        !createPolicyRef.current.contains(event.target)
      ) {
        setIsFormVisible(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Detach the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const [formData, setFormData] = useState({
    ClaimAmount: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: +value,
    }));
  };
  // extract store function addPolicy
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.ClaimAmount ||
      !isNumber(formData.ClaimAmount) ||
      formData.ClaimAmount < 0 ||
      formData.ClaimAmount > policyData.PBalance
    ) {
      alert("Please enter valid Claim Amount");
    }

    try {
      console.log(server);
      const res = await axios.post(server + "/claims/create?type=customer", {
        PID: policyData.PID,
        CAmt: formData.ClaimAmount,
      });

      if (res.status !== 200) {
        alert(JSON.stringify(res.data.msg));
        toggleFormVisibility();
        return;
      }

      const resClaim = res.data.createdClaim;

      addClaim(resClaim, policyData);

      toggleFormVisibility(); // Assuming you have a function to toggle form visibility
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={createPolicyRef}
      className="bg-blue-100 text-gray-800 p-4 rounded-md transition"
    >
      <div className="cursor-pointer">
        {isFormVisible ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="ClaimAmount"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Claim Amount {`(Should be less tha ${policyData.PBalance})`}
              </label>
              <input
                type="number"
                id="ClaimAmount"
                name="ClaimAmount"
                value={formData.ClaimAmount}
                onChange={handleChange}
                min="1"
                max={policyData.PBalance}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md transition-all"
                onClick={() => {
                  setFormData({
                    startDate: new Date().toISOString().split("T")[0],
                    duration: 1,
                    ClaimAmount: 1,
                  });
                  toggleFormVisibility();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded-md transition-all"
              >
                Submit Policy
              </button>
            </div>
          </form>
        ) : (
          // Form is not visible
          <div onClick={toggleFormVisibility}>
            <h1 className="text-2xl font-bold mb-4 transition-opacity">
              Apply for a new Claim
            </h1>
            <div className="bg-gray-700 h-2 w-16 mb-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateClaim;
