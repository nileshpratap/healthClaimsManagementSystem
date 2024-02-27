import React, { useState } from "react";
import axios from "axios";
import { useAdminStore } from "../store";
import { useEffect, useRef } from "react";
import { isNumber } from "lodash";

const AdminClaim = ({ ClaimData, policyData }) => {
  const { PBalance, PID } = policyData;
  const server = process.env.REACT_APP_SERVER_URL;
  const [localClaim, setLocalClaim] = useState(ClaimData);
  const updateClaim = useAdminStore((state) => state.updateClaim);

  const handleUpdateClaim = async (event, requestedStatus) => {
    event.preventDefault();
    if (ClaimData.Status !== "Under Review") {
      return;
    } else {
      try {
        const res = await axios.patch(server + "/claims/update?type=admin", {
          PID,
          CID: ClaimData.CID,
          Status: requestedStatus,
        });
        if (res.status === 200) {
          const { updatedClaim, updatedPolicy } = res.data;
          if (updateClaim.Status === "Approved") {
            updateClaim(updatedClaim, updatedPolicy);
          } else {
          }
          setLocalClaim(updatedClaim);
        } else {
          alert(res.data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {}, [localClaim]);

  return (
    <div className="lg:w-full w-2/5 bg-gray-100 p-4 m-3 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out flex flex-col lg:flex-row">
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        <p className="text-lg font-bold mb-2">Claim ID: {localClaim.CID}</p>

        <p className="text-base mb-2">Claim Amount: {localClaim.CAmt}</p>

        <p className="text-base">Status: {localClaim.Status}</p>
      </div>

      <div className="flex items-center lg:justify-end space-x-4">
        <button
          style={{
            display: localClaim.Status === "Under Review" ? "inline" : "none",
          }}
          onClick={(e) => handleUpdateClaim(e, "Decline")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md transition-all"
        >
          Decline
        </button>
        <button
          style={{
            display: localClaim.Status === "Under Review" ? "inline" : "none",
          }}
          onClick={(e) => handleUpdateClaim(e, "Approve")}
          className="bg-red-500 text-white px-4 py-2 rounded-md transition-all"
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default AdminClaim;
