import React from "react";
import { useUserStore } from "../store";
import axios from "axios";
import { useState, useEffect } from "react";
import isEqual from "lodash/isEqual";
import Claim from "./Claim";

function UserClaims({ policyData }) {
  const server = process.env.REACT_APP_SERVER_URL;
  const setClaims = useUserStore((state) => state.setClaims);
  const globalClaims = useUserStore((state) => state.Claims);
  const [localClaims, setLocalClaims] = useState(
    globalClaims.filter((c) => c.PID == policyData.PID)
  );

  const getClaims = async () => {
    try {
      const res = await axios.get(
        `${server}/claims/showAllforPolicy?type=customer&PID=${policyData.PID}`
      );
      const claims = res.data.claims;
      if (!isEqual(globalClaims, claims)) {
        setClaims(claims);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClaims();
  }, []);
  useEffect(() => {
    setLocalClaims(globalClaims.filter((c) => c.PID == policyData.PID));
  }, [globalClaims]);
  return (
    <>
      <h5 className="text-blue-900 font-bold text-md p-3">
        Total Claims: {globalClaims.length}
      </h5>
      <div className="flex lg:flex-col flex-row flex-wrap justify-evenly items-start">
        {localClaims.map((claim, id) => (
          <Claim ClaimData={claim} policyData={policyData} />
        ))}
      </div>
    </>
  );
}

export default UserClaims;
