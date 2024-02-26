import React, { useState } from "react";
import axios from "axios";
import { useUserStore } from "../store";

const Claim = ({ ClaimData, PBalance, PID }) => {
  const server = process.env.REACT_APP_SERVER_URL;
  const removeClaim = useUserStore((state) => state.removeClaim);
  const handleDelete = async (event) => {
    event.preventDefault();
    if (ClaimData.Status !== "Under Review") {
      return;
    } else {
      try {
        // deletedClaim
        const res = await axios.delete(
          `${server}/claims/delete?type=customer&CID=${ClaimData.CID}&PID=${PID}`
        );
        if (res.status !== 200) {
          alert(JSON.stringify(res.data.msg));
          return;
        }
        const deletedClaim = res.data.deletedClaim;
        removeClaim(deletedClaim, PID);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="lg:w-full w-2/5 bg-gray-100 p-4 m-3 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out flex flex-col lg:flex-row">
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        <p className="text-lg font-bold mb-2">Claim ID: {ClaimData.CID}</p>
        <p className="text-base mb-2">Claim Amount: {ClaimData.CAmt}</p>
        <p className="text-base">Status: {ClaimData.Status}</p>
      </div>

      <div className="flex items-center lg:justify-end space-x-4">
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition-all">
          Update
        </button> */}
        <button
          style={{
            display: ClaimData.Status === "Under Review" ? "inline" : "none",
          }}
          onClick={(e) => handleDelete(e)}
          className="bg-red-500 text-white px-4 py-2 rounded-md transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Claim;
