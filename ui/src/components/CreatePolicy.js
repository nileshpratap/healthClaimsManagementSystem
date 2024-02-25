// CreatePolicy.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUserStore } from "../store";

const CreatePolicy = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const createPolicyRef = useRef();

  const server = process.env.REACT_APP_SERVER_URL;

  const addPolicy = useUserStore((state) => state.addPolicy);

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
    startDate: new Date().toISOString().split("T")[0],
    duration: 1,
    premiumAmount: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "duration" ? parseInt(value, 10) : value,
    }));
  };
  // extract store function addPolicy
  const handleSubmit = async (event) => {
    event.preventDefault();
    const startDateString = new Date(formData.startDate).toISOString();
    const endDateString = new Date(
      new Date(formData.startDate).getTime() +
        +formData.duration * 30 * 24 * 60 * 60 * 1000
    ).toISOString();
    if (!formData.startDate || !formData.duration || !formData.premiumAmount) {
      alert("Please fill in all fields");
    }

    try {
      const res = await axios.post(server + "/policies/create?type=customer", {
        StartDate: startDateString,
        EndDate: endDateString,
        PAmount: +formData.premiumAmount,
      });

      if (res.status !== 200) {
        alert(JSON.stringify(res.data.msg));
        toggleFormVisibility();
        return;
      }

      const resPolicy = res.data.createdPolicy;

      addPolicy(resPolicy);

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
                htmlFor="startDate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Duration (in months):
              </label>
              <span className="ml-auto">{formData.duration}</span>
              <input
                type="range"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                max="36"
                className="w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="premiumAmount"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Premium Amount (per month)
              </label>
              <input
                type="number"
                id="premiumAmount"
                name="premiumAmount"
                value={formData.premiumAmount}
                onChange={handleChange}
                min="1"
                max="500000"
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
                    premiumAmount: 1,
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
              Apply for a new Policy
            </h1>
            <div className="bg-gray-700 h-2 w-16 mb-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePolicy;
