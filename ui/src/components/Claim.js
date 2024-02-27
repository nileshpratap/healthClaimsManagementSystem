import React, { useState } from "react";
import axios from "axios";
import { useUserStore } from "../store";
import { useEffect, useRef } from "react";
import { isNumber } from "lodash";

const Claim = ({ ClaimData, policyData }) => {
  const { PBalance, PID } = policyData;
  const [updatedClaimAmt, setUpdatedClaimAmt] = useState(ClaimData.CAmt);
  const [ClaimAmt, setClaimAmt] = useState(ClaimData.CAmt);
  const [toggleUpdateButton, setToggleUpdateButton] = useState(false);
  const server = process.env.REACT_APP_SERVER_URL;
  const removeClaim = useUserStore((state) => state.removeClaim);

  const updateClaim = useUserStore((state) => state.updateClaim);

  const createPolicyRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the CreatePolicy component
      if (
        createPolicyRef.current &&
        !createPolicyRef.current.contains(event.target)
      ) {
        setToggleUpdateButton(false);
        setUpdatedClaimAmt(ClaimData.CAmt);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Detach the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleUpdateClaimAmtSubmit = async (event) => {
    event.preventDefault();
    if (
      !isNumber(updatedClaimAmt) ||
      updatedClaimAmt < 0 ||
      updatedClaimAmt > PBalance
    ) {
      alert(
        "Requested Amount for change is not valid, please enter a valid Amount"
      );
    }

    try {
      const res = await axios.patch(server + "/claims/update?type=customer", {
        PID,
        CID: ClaimData.CID,
        CAmt: updatedClaimAmt,
      });
      const { updatedClaim } = res.data;
      updateClaim(updatedClaim);
      setToggleUpdateButton(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleupdatedClaimAmtChange = (event) => {
    setUpdatedClaimAmt(+event.target.value);
  };
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
    <div
      ref={createPolicyRef}
      className="lg:w-full w-2/5 bg-gray-100 p-4 m-3 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out flex flex-col lg:flex-row"
    >
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        <p className="text-lg font-bold mb-2">Claim ID: {ClaimData.CID}</p>
        {toggleUpdateButton === false ? (
          <p className="text-base mb-2">Claim Amount: {ClaimData.CAmt}</p>
        ) : (
          <div className="flex lg:flex-row flex-col">
            <input
              type="number"
              className="lg:mr-3 lg:w-1/4 w-full py-1 px-2 m-1 border-gray-300 rounded-md"
              id="ClaimAmount"
              name="ClaimAmount"
              value={updatedClaimAmt}
              onChange={handleupdatedClaimAmtChange}
              placeholder="Enter Claim Amount"
              min="1"
              max={PBalance}
            />
            <div className="flex justify-center content-center">
              <button
                className="bg-blue-100 text-base text-gray-700 py-1 px-2 m-1 rounded-md transition-all"
                onClick={() => {
                  setToggleUpdateButton(false);
                  setUpdatedClaimAmt(ClaimData.CAmt);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-100 text-base text-gray-700 py-1 px-2 m-1 rounded-md transition-all"
                onClick={(e) => {
                  handleUpdateClaimAmtSubmit(e);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        <p className="text-base">Status: {ClaimData.Status}</p>
      </div>

      <div className="flex items-center lg:justify-end space-x-4">
        <button
          style={{
            display: ClaimData.Status === "Under Review" ? "inline" : "none",
          }}
          onClick={() => {
            setToggleUpdateButton(true);
            setClaimAmt();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md transition-all"
        >
          Update
        </button>
        <button
          style={{
            display: ClaimData.Status === "Under Review" ? "inline" : "none",
          }}
          onClick={(e) => handleDelete(e)}
          className="bg-red-500 text-white px-4 py-2 rounded-md transition-all"
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default Claim;
